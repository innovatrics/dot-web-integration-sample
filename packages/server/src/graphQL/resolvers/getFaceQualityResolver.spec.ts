import { expect } from 'vitest';

import getFaceQualityResponse from '../../api/mocks/data/getFaceQualityResponse.json' with { type: 'json' };
import { faceApiLink, faceApiLinkError, faceLinks } from '../../test/index.js';

import resolvers from './index.js';

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
