import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import MockAdapter from 'axios-mock-adapter';
import { disClient } from '../api/connection/serverConnection.ts';
import { createApp } from '../app.ts';

vi.mock('../storage/file.ts', () => ({
  deleteOldFiles: vi.fn(async () => []),
  readFile: vi.fn(async () => Buffer.from('png')),
  storeFile: vi.fn(async (_content: unknown, filename: string) => filename),
}));

vi.mock('../storage/s3.ts', () => ({
  createS3Client: vi.fn(() => ({ bucketName: 'test-bucket', client: {} })),
  uploadFile: vi.fn(async (_client: unknown, _bucket: string, { key }: { key: string }) => ({ key })),
}));

const VALID_IMAGE = Buffer.from('a face image').toString('base64');
const INTERNAL_DIS_MESSAGE = 'connect ECONNREFUSED 10.1.2.3:8080 internal-dis.svc';

let server: Server;
let baseUrl: string;
let disMock: MockAdapter;

const disCallCount = () => Object.values(disMock.history).flat().length;

const post = (route: string, body: unknown, contentType = 'application/json') =>
  fetch(`${baseUrl}/api/v1${route}`, {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: { 'Content-Type': contentType },
    method: 'POST',
  });

const expectNoInternals = (text: string) => {
  expect(text).not.toMatch(/stack|\bat .+:\d+:\d+|ECONNREFUSED|originalError|operation/i);
};

const expectRejected = async (response: Response, status = 400) => {
  const text = await response.text();

  expect(response.status).toBe(status);
  expect(JSON.parse(text)).toEqual({ message: expect.any(String) });
  expectNoInternals(text);
  expect(disCallCount()).toBe(0);
};

beforeAll(async () => {
  server = createApp().listen(0);
  await new Promise<void>((resolve) => server.once('listening', () => resolve()));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

beforeEach(() => {
  disMock = new MockAdapter(disClient.instance);
  disMock.onPost('/api/v1/faces').reply(200, { id: 'face-1' });
  disMock.onGet('/api/v1/faces/face-1/aspects').reply(200, { age: 31 });
  disMock.onGet('/api/v1/faces/face-1/crop').reply(200, { data: 'cropped' });
  disMock.onGet('/api/v1/faces/123/crop').reply(200, { data: 'cropped' });
  disMock.onPost('/api/v1/customers').reply(200, { links: { self: '/api/v1/customers/123' } });
  disMock.onPut('/api/v1/customers/123/liveness').reply(200, {});
  disMock.onPut('/api/v1/customers/123/liveness/records/challenge').reply(200, { details: {} });
  disMock.onAny().reply(500, { errorMessage: INTERNAL_DIS_MESSAGE });
});

afterEach(() => {
  disMock.restore();
});

describe('POST /registerFace', () => {
  it.each([
    ['an empty object', {}],
    ['a missing image', { detection: { mode: 'FREE' } }],
    ['an empty image', { image: '' }],
    ['a non-string image', { image: 123 }],
    ['a non-base64 image', { image: 'not base64 !!' }],
    ['an array body', [VALID_IMAGE]],
  ])('rejects %s without calling DIS', async (_label, body) => {
    await expectRejected(await post('/registerFace', body));
  });

  it('rejects a non-JSON body without calling DIS', async () => {
    await expectRejected(await post('/registerFace', '{"image": '));
  });

  it('registers a valid face as before', async () => {
    const response = await post('/registerFace', { detection: { mode: 'FREE' }, image: VALID_IMAGE });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      aspects: { age: 31 },
      croppedSelfie: { data: 'cropped' },
      sessionId: expect.any(String),
    });
    expect(disMock.history.post).toHaveLength(1);
  });

  it('answers a DIS failure with a generic 500 and no internals', async () => {
    disMock.reset();
    disMock.onAny().reply(500, { errorMessage: INTERNAL_DIS_MESSAGE });

    const response = await post('/registerFace', { image: VALID_IMAGE });
    const text = await response.text();

    expect(response.status).toBe(500);
    expect(JSON.parse(text)).toEqual({ message: expect.any(String) });
    expectNoInternals(text);
  });

  it('answers an unreachable DIS with a generic 500 and no internals', async () => {
    disMock.reset();
    disMock.onAny().networkError();

    const response = await post('/registerFace', { image: VALID_IMAGE });
    const text = await response.text();

    expect(response.status).toBe(500);
    expectNoInternals(text);
    expect(text).not.toContain('Network Error');
  });
});

describe('POST /ageFeedback', () => {
  const SESSION_ID = '0b7c2a4e-1f3d-4c5b-9a8e-6d7f8e9a0b1c';

  it.each([
    ['an empty object', {}],
    ['a missing id', { age: 30 }],
    ['a missing age', { id: SESSION_ID }],
    ['a non-uuid id', { age: 30, id: '../../etc/passwd' }],
    ['a string age', { age: '30', id: SESSION_ID }],
    ['a zero age', { age: 0, id: SESSION_ID }],
    ['a fractional age', { age: 30.5, id: SESSION_ID }],
    ['an absurd age', { age: 1000, id: SESSION_ID }],
  ])('rejects %s', async (_label, body) => {
    await expectRejected(await post('/ageFeedback', body));
  });

  it('rejects a non-JSON body', async () => {
    await expectRejected(await post('/ageFeedback', 'age=30'));
  });

  it('answers an unknown session with 404 and no internals', async () => {
    await expectRejected(await post('/ageFeedback', { age: 30, id: SESSION_ID }), 404);
  });

  it('stores feedback for a registered session as before', async () => {
    const registered = await (await post('/registerFace', { image: VALID_IMAGE })).json();

    const response = await post('/ageFeedback', { age: 30, id: registered.sessionId });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      key: expect.stringMatching(new RegExp(`_31_30_${registered.sessionId}\\.png$`)),
      message: 'Age feedback processed!',
    });
  });
});

describe('DIS proxy POST routes', () => {
  it.each([
    ['/documents/normalized-images', {}],
    ['/documents/normalized-images', { pages: 'front' }],
    ['/documents/normalized-images', { dimensions: { width: 'wide' }, pages: { front: '/p' } }],
    ['/documents/cropped-images', {}],
    ['/documents/cropped-images', { imageLinks: { portrait: { link: 42 } } }],
    ['/document/page/content', {}],
    ['/document/page/content', { content: 'abc' }],
    ['/document/page/content', { content: 'abc', customerApiLink: 7, isDocumentCreated: false }],
    ['/document/page/content', { content: 'abc', isDocumentCreated: false, sources: ['NOPE'] }],
    ['/document/page/image', {}],
    ['/document/page/image', { image: 'abc', isDocumentCreated: 'no' }],
    ['/document/page/image', { image: 'abc', isDocumentCreated: true, pageType: '' }],
    ['/customers/123/selfie', {}],
    ['/customers/123/selfie', { image: 'abc', selfieLink: '/x' }],
    ['/customers/123/liveness-records', {}],
    ['/customers/123/liveness-records', { content: 'abc', isLivenessCreated: 'yes' }],
    ['/customers/123/liveness/records/challenge', {}],
    ['/customers/123/liveness/records/challenge', { type: 'NOT_A_LIVENESS' }],
    ['/customers/123/liveness/evaluation', {}],
    ['/customers/123/trust-evaluation/evaluate', { livenessType: 'NOPE' }],
    ['/face', {}],
    ['/face', { detection: 'FREE', image: 'abc' }],
    ['/faces/123/crop', { dimensions: { height: -1 } }],
  ])('%s rejects %j without calling DIS', async (route, body) => {
    await expectRejected(await post(route, body));
  });

  it.each([
    '/documents/normalized-images',
    '/document/page/content',
    '/customers/123/liveness/records/challenge',
    '/face',
  ])('%s rejects a non-JSON body without calling DIS', async (route) => {
    await expectRejected(await post(route, '{not json'));
  });

  it('rejects an oversized body with 413 and no internals', async () => {
    const response = await post('/face', { image: 'a'.repeat(21 * 1024 * 1024) });

    expect(response.status).toBe(413);
    expectNoInternals(await response.text());
    expect(disCallCount()).toBe(0);
  });

  it('still creates a face from a valid request', async () => {
    const response = await post('/face', { detection: { mode: 'FREE' }, image: VALID_IMAGE });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id: 'face-1' });
  });

  it('still creates a liveness challenge from a valid request', async () => {
    const response = await post('/customers/123/liveness/records/challenge', { type: 'MULTI_RANGE_LIVENESS' });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ details: {} });
  });

  it('still crops a selfie with and without dimensions', async () => {
    const withDimensions = await post('/faces/123/crop', { dimensions: { width: 450 } });
    const without = await post('/faces/123/crop', {});

    expect(withDimensions.status).toBe(200);
    expect(without.status).toBe(200);
    expect(await without.json()).toEqual({ selfie: 'data:image/png;base64,cropped' });
    expect(disMock.history.get.map((request) => request.params?.width)).toEqual([450, undefined]);
  });

  it('answers a DIS 5xx on a proxy route with a generic upstream error', async () => {
    disMock.reset();
    disMock.onAny().reply(503, { errorMessage: INTERNAL_DIS_MESSAGE });

    const response = await post('/face', { image: VALID_IMAGE });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: 'Upstream service error', source: 'DIS', status: 500 });
  });

  it('passes a DIS 4xx business message through unchanged', async () => {
    disMock.reset();
    disMock.onAny().reply(400, { errorCode: 'INVALID_DATA', errorMessage: 'Image is not valid' });

    const response = await post('/face', { image: VALID_IMAGE });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: 'Image is not valid', source: 'DIS', status: 400 });
  });
});
