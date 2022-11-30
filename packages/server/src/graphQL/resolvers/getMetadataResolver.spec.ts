import resolvers from '.';
import getMetadataFeResponse from '../../api/mocks/data/getMetadataFeResponse.json';

describe('#metadata', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.metadata(null);

    await expect(result).resolves.toEqual(getMetadataFeResponse);
  });
});
