import getMetadataResponse from '../api/mocks/data/getMetadataResponse.json';

import { getMetadataResolver } from './getMetadataResolver.ts';

describe('#metadata', () => {
  it('should get correct response', async () => {
    const result = getMetadataResolver();
    await expect(result).resolves.toEqual(getMetadataResponse);
  });
});
