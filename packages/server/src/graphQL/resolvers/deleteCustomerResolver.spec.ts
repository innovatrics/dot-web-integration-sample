import { expect } from 'vitest';

import { customerApiLink, customerApiLinkError } from '../../test/index.js';

import resolvers from './index.js';

describe('#deleteCustomer', () => {
  it('should delete customer correctly', async () => {
    const result = resolvers.Mutation.deleteCustomer(null, { customerApiLink });

    await expect(result).resolves.toBeUndefined();
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.deleteCustomer(null, { customerApiLink: customerApiLinkError });

    await expect(result).rejects.toThrow();
  });
});
