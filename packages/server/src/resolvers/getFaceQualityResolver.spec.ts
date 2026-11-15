import getFaceQualityResponse from '../api/mocks/data/getFaceQualityResponse.json';
import { faceApiLink, faceApiLinkError, faceLinks } from '../test/index.ts';

import { getFaceQualityResolver } from './getFaceQualityResolver.ts';

describe('#faceQuality', () => {
  it('should get correct response when faceApiLink is present', async () => {
    const result = getFaceQualityResolver(faceApiLink);

    await expect(result).resolves.toEqual({ ...getFaceQualityResponse, ...faceLinks });
  });

  it('should throw error when faceApiLink is invalid', async () => {
    const result = getFaceQualityResolver(faceApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
