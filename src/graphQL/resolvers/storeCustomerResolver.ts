import { storeCustomerApi } from '../../api/customersApi';
import { StoreCustomerOnboardingStatus, StoreCustomerResponse } from '../../types/graphqlTypes';

export const storeCustomerResolver = async (
  customerApiLink: string,
  onboardingStatus: StoreCustomerOnboardingStatus,
): Promise<StoreCustomerResponse> => {
  const request = { onboardingStatus };

  const response = await storeCustomerApi(customerApiLink, request);

  return { apiError: response };
};
