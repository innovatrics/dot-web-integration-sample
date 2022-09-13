import resolvers from '.';
import { customerApiLink, mock } from '../../test';
import { StoreCustomerOnboardingStatus } from '../../types/graphqlTypes';

describe('#storeCustomer', () => {
  it('should get correct response"', async () => {
    const result = resolvers.Query.storeCustomer(null, {
      customerApiLink,
      onboardingStatus: StoreCustomerOnboardingStatus.FINISHED,
    });

    return result.should.eventually.be.fulfilled;
  });

  it('should have property "apiError"', async () => {
    const apiError = {
      timestamp: 1649062046358,
      status: 404,
      error: 'Not Found',
      path: '/api/v1/customers/123/document/store',
    };

    mock.onPost(`${customerApiLink}/store`).reply(() => [404, apiError]);

    const result = resolvers.Query.storeCustomer(null, {
      customerApiLink,
      onboardingStatus: StoreCustomerOnboardingStatus.FINISHED,
    });

    return result.should.eventually.have.property('apiError').to.be.deep.equal(apiError);
  });
});
