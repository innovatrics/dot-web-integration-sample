import resolvers from '.';
import { customerApiLink, customerApiLinkError } from '../../test';

describe('#deleteCustomer', () => {
  it('should delete customer correctly', async () => {
    const result = resolvers.Mutation.deleteCustomer(null, { customerApiLink });

    return result.should.eventually.be.fulfilled;
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.deleteCustomer(null, { customerApiLink: customerApiLinkError });

    return result.should.eventually.be.rejected;
  });
});
