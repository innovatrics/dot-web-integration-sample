import { expect } from 'vitest';

import getMetadataFeResponse from '../../api/mocks/data/getMetadataFeResponse.json' with { type: 'json' };

import resolvers from './index.js';

describe('#metadata', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.metadata(null);

    await expect(result).resolves.toEqual(getMetadataFeResponse);
  });
});
