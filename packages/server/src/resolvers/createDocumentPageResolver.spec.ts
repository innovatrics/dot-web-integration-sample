import createDocumentPageResponse from '../api/mocks/data/createDocumentPageResponse.json';
import createDocumentPageResponseWithWarning from '../api/mocks/data/createDocumentPageResponseWithWarning.json';
import { customerApiLink, customerApiLinkError, serverConnectionMock } from '../test/index.ts';

import {
  createDocumentPageWithImageResolver,
  createDocumentWithContentResolver,
} from './createDocumentPageResolver.ts';

const customerLinks = { links: { customer: customerApiLink } };

describe('#createDocumentPageResolver', () => {
  describe('createDocumentPageWithContent', () => {
    it('should get correct response when document is not created', async () => {
      const result = createDocumentWithContentResolver({
        content: 'message',
        customerApiLink,
        isDocumentCreated: false,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when document is created', async () => {
      const result = createDocumentWithContentResolver({
        content: 'message',
        customerApiLink,
        isDocumentCreated: true,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when advice is present', async () => {
      const documentAdvice = {
        classification: {
          countries: ['INO'],
          editions: [],
          machineReadableTravelDocuments: [],
          types: [],
        },
      };

      const result = createDocumentWithContentResolver({
        content: 'message',
        customerApiLink,
        documentAdvice,
        isDocumentCreated: false,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should throw error when customerApiLink is invalid', async () => {
      const result = createDocumentWithContentResolver({
        content: 'message',
        customerApiLink: customerApiLinkError,
        isDocumentCreated: true,
      });

      await expect(result).rejects.toThrow();
    });

    it('should map warnings from api response correctly', async () => {
      serverConnectionMock
        .onPut(`${customerApiLink}/document/pages`)
        .reply(() => [200, createDocumentPageResponseWithWarning]);

      const result = createDocumentWithContentResolver({
        content: 'message',
        customerApiLink,
        isDocumentCreated: false,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponseWithWarning, ...customerLinks });
    });
  });

  describe('#createDocumentPageWithImage', () => {
    beforeAll(() => {
      serverConnectionMock.onPut(`${customerApiLink}/document/pages`).reply(() => [200, createDocumentPageResponse]);
    });

    it('should get correct response when document is not created', async () => {
      const result = createDocumentPageWithImageResolver({
        customerApiLink,
        image: 'image.jpg',
        isDocumentCreated: false,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when document is created', async () => {
      const result = createDocumentPageWithImageResolver({
        customerApiLink,
        image: 'image.jpg',
        isDocumentCreated: true,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should get correct response when advice is present', async () => {
      const documentAdvice = {
        classification: {
          countries: ['INO'],
          editions: [],
          machineReadableTravelDocuments: [],
          types: [],
        },
      };

      const result = createDocumentPageWithImageResolver({
        customerApiLink,
        documentAdvice,
        image: 'image.jpg',
        isDocumentCreated: false,
      });

      await expect(result).resolves.toEqual({ ...createDocumentPageResponse, ...customerLinks });
    });

    it('should throw error when customerApiLink is invalid', async () => {
      const result = createDocumentPageWithImageResolver({
        customerApiLink: customerApiLinkError,
        image: 'image.jpg',
        isDocumentCreated: true,
      });

      await expect(result).rejects.toThrow();
    });
  });
});
