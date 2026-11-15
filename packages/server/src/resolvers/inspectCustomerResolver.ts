import { inspectCustomerApi } from '../api/customersApi.ts';
import type { InspectCustomerResponse } from '../types/index.ts';

export const inspectCustomerResolver = async (customerId: string): Promise<InspectCustomerResponse> => {
  const response = await inspectCustomerApi(customerId);

  response.links?.documentInspection;
  return {
    ...response,
    links: {
      ...response.links,
      customer: customerId,
    },
  };
};
