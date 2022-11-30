import resolvers from '.';
import getFaceQualityResponse from '../../api/mocks/data/getFaceQualityResponse.json';
import { faceApiLink, faceLinks, faceApiLinkError } from '../../test';

describe('#faceQuality', () => {
  it('should get correct response when faceApiLink is present', async () => {
    const result = resolvers.Query.faceQuality(null, { faceApiLink });

    await expect(result).resolves.toEqual({ ...getFaceQualityResponse, ...faceLinks });
  });

  it('should throw error when faceApiLink is invalid', async () => {
    const result = resolvers.Query.faceQuality(null, { faceApiLink: faceApiLinkError });

    await expect(result).rejects.toThrow();
  });
});
