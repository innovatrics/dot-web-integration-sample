import type { CreateMagnifeyeLivenessSelfieResponse } from '../../types/graphqlTypes';

import { createCustomerLivenessApi } from '../../api/customersLivenessApi';
import { createMagnifeyeLivenessSelfiesApi } from '../../api/magnifeyeLivenessApi';
import createCustomer from '../../api/utils/createCustomer';

export const createMagnifeyeLivenessResolver = async (
  magnifeyeSelfies: string,
  customerApiLink?: string,
  isLivenessCreated?: boolean,
): Promise<CreateMagnifeyeLivenessSelfieResponse> => {
  const customer = await createCustomer(customerApiLink);

  if (!isLivenessCreated) {
    await createCustomerLivenessApi(customer);
  }

  const response = await createMagnifeyeLivenessSelfiesApi(customer, magnifeyeSelfies);
  const { errorCode, links, selfie } = response;

  return {
    errorCode,
    links: { selfie: links?.selfie },
    selfie: { detection: selfie?.detection },
    customerLinks: { customer },
  };
};
