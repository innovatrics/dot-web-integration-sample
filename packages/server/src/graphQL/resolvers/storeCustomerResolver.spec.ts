import { customerApiLink, serverConnectionMock } from '../../test';
import { StoreCustomerOnboardingStatus } from '../../types/graphqlTypes';

import resolvers from '.';

describe('#storeCustomer', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.storeCustomer(null, {
      customerApiLink,
      onboardingStatus: StoreCustomerOnboardingStatus.FINISHED,
    });

    await expect(result).resolves.toBeDefined();
  });

  it('should have property "apiError"', async () => {
    const apiError = {
      timestamp: 1649062046358,
      status: 404,
      error: 'Not Found',
      path: '/api/v1/customers/123/document/store',
    };

    serverConnectionMock.onPost(`${customerApiLink}/store`).reply(() => [404, apiError]);

    const result = resolvers.Query.storeCustomer(null, {
      customerApiLink,
      onboardingStatus: StoreCustomerOnboardingStatus.FINISHED,
    });

    await expect(result).rejects.toThrow();
  });
});
