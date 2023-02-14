import type { FaceDetectionProperties } from '../../types/graphqlTypes';

import createFaceResponse from '../../api/mocks/data/createFaceResponse.json';
import { faceLinks } from '../../test';
import { FaceDetectionPropertiesMode } from '../../types/graphqlTypes';

import resolvers from '.';

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
