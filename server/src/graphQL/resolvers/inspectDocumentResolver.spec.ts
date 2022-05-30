import resolvers from '.';
import inspectDocumentFeResponse from '../../api/mocks/data/inspectDocumentFeResponse.json';
import { customerApiLink, customerApiLinkError } from '../../test';

describe('#inspectDocument', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Query.inspectDocument(null, { customerApiLink });

    return result.should.eventually.be.deep.equal(inspectDocumentFeResponse);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.inspectDocument(null, { customerApiLink: customerApiLinkError });

    return result.should.eventually.be.rejectedWith('Some error.');
  });
});
