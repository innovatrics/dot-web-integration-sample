import inspectCustomerResponse from '../api/mocks/data/inspectCustomerResponse.json';
import { customerApiLinkError, customerId, customerLinks } from '../test/index.ts';

import { inspectCustomerResolver } from './inspectCustomerResolver.ts';

describe('#inspectCustomer', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = inspectCustomerResolver(customerId);

    await expect(result).resolves.toEqual({ ...inspectCustomerResponse, ...customerLinks });
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = inspectCustomerResolver(customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
