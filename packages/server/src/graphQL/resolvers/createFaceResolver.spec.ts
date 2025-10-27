import type { FaceDetectionProperties } from '../../types/graphqlTypes.js';

import { expect } from 'vitest';

import createFaceResponse from '../../api/mocks/data/createFaceResponse.json' with { type: 'json' };
import { faceLinks } from '../../test/index.js';
import { FaceDetectionPropertiesMode } from '../../types/graphqlTypes.js';

import resolvers from './index.js';

describe('#createFace', () => {
  it('should get correct response when FaceDetectionProperties is not set', async () => {
    const result = resolvers.Mutation.createFace(null, { image: 'image.jpg' });

    await expect(result).resolves.toEqual({ ...createFaceResponse, ...faceLinks });
  });

  it('should get correct response when FaceDetectionProperties is set', async () => {
    const detection: FaceDetectionProperties = {
      mode: FaceDetectionPropertiesMode.STRICT,
      faceSizeRatio: undefined,
    };

    const result = resolvers.Mutation.createFace(null, {
      image: 'image.jpg',
      detection,
    });

    await expect(result).resolves.toEqual({ ...createFaceResponse, ...faceLinks });
  });
});
