import { createCustomerLivenessApi, createLivenessRecordsApi } from '../api/customersLivenessApi.ts';
import { createCustomer } from '../api/utils/customer.ts';

export const createLivenessRecordsResolver = async (
  content: string,
  customerId: string,
  isLivenessCreated?: boolean,
) => {
  const customer = await createCustomer(customerId);

  if (!isLivenessCreated) {
    await createCustomerLivenessApi(customer);
  }

  const { errorCode, links, selfie } = await createLivenessRecordsApi(customer, content);

  return {
    customerLinks: { customer },
    errorCode,
    links: { selfie: links?.selfie },
    selfie: { detection: selfie?.detection },
  };
};
