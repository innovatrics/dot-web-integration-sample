import type { StoreCustomerOnboardingStatus, StoreCustomerResponse } from '../../types/graphqlTypes';

import { storeCustomerApi } from '../../api/customersApi';

export const storeCustomerResolver = async (
  customerApiLink: string,
  onboardingStatus: StoreCustomerOnboardingStatus,
): Promise<StoreCustomerResponse> => {
  const request = { onboardingStatus };

  const response = await storeCustomerApi(customerApiLink, request);

  return { apiError: response };
};
