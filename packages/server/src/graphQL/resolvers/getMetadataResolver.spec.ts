import resolvers from '.';
import getMetadataFeResponse from '../../api/mocks/data/getMetadataFeResponse.json';

describe('#metadata', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.metadata(null);

    return result.should.eventually.be.deep.equal(getMetadataFeResponse);
  });
});
