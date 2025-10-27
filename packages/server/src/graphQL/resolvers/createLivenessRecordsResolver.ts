import type { CreateLivenessRecordsResponse } from '../../types/graphqlTypes.js';

import { createCustomerLivenessApi, createLivenessRecordsApi } from '../../api/customersLivenessApi.js';
import createCustomer from '../../api/utils/createCustomer.js';

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
