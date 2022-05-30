import resolvers from '.';
import createFaceResponse from '../../api/mocks/data/createFaceResponse.json';
import { faceLinks } from '../../test';
import { FaceDetectionProperties, FaceDetectionPropertiesMode } from '../../types/graphqlTypes';

describe('#createFace', () => {
  it('should get correct response when FaceDetectionProperties is not set', async () => {
    const result = resolvers.Mutation.createFace(null, { image: 'image.jpg' });

    return result.should.eventually.be.deep.equal({ ...createFaceResponse, ...faceLinks });
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

    return result.should.eventually.be.deep.equal({ ...createFaceResponse, ...faceLinks });
  });
});
