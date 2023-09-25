import type { CreateLivenessRecordsResponse } from '../../types/graphqlTypes';

import { createCustomerLivenessApi, createLivenessRecordsApi } from '../../api/customersLivenessApi';
import createCustomer from '../../api/utils/createCustomer';

export const createLivenessRecordsResolver = async (
  content: string,
  customerApiLink?: string,
  isLivenessCreated?: boolean,
): Promise<CreateLivenessRecordsResponse> => {
  const customer = await createCustomer(customerApiLink);

  if (!isLivenessCreated) {
    await createCustomerLivenessApi(customer);
  }

  const { errorCode, links, selfie } = await createLivenessRecordsApi(customer, content);

  return {
    errorCode,
    links: { selfie: links?.selfie },
    selfie: { detection: selfie?.detection },
    customerLinks: { customer },
  };
};
