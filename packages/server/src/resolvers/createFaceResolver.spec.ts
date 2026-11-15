import type { FaceDetectionProperties } from '@innovatrics/dis-client-sdk';

import createFaceResponse from '../api/mocks/data/createFaceResponse.json';
import { faceLinks } from '../test/index.ts';

import { createFaceResolver } from './createFaceResolver.ts';

describe('#createFace', () => {
  it('should get correct response when FaceDetectionProperties is not set', async () => {
    const result = createFaceResolver({ image: 'image.jpg' });

    await expect(result).resolves.toEqual({ ...createFaceResponse, ...faceLinks });
  });

  it('should get correct response when FaceDetectionProperties is set', async () => {
    const detection: FaceDetectionProperties = {
      faceSizeRatio: undefined,
      mode: 'STRICT',
    };

    const result = createFaceResolver({
      detection,
      image: 'image.jpg',
    });

    await expect(result).resolves.toEqual({ ...createFaceResponse, ...faceLinks });
  });
});
