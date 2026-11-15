import { customerApiLinkError, customerId } from '../test/index.ts';

import { deleteCustomerResolver } from './deleteCustomerResolver.ts';

describe('#deleteCustomer', () => {
  it('should delete customer correctly', async () => {
    const result = deleteCustomerResolver(customerId);

    await expect(result).resolves.toBeUndefined();
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = deleteCustomerResolver(customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
