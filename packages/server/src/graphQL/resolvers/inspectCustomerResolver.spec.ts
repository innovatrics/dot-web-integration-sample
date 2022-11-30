import resolvers from '.';
import inspectCustomerResponse from '../../api/mocks/data/inspectCustomerResponse.json';
import { customerApiLink, customerLinks, customerApiLinkError } from '../../test';

describe('#inspectCustomer', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Query.inspectCustomer(null, { customerApiLink });

    await expect(result).resolves.toEqual({ ...inspectCustomerResponse, ...customerLinks });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.inspectCustomer(null, { customerApiLink: customerApiLinkError });

    await expect(result).rejects.toThrow();
  });
});
