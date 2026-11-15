import type { CreateCustomerResponse, CustomerInspectResponse, GetCustomerResponse } from '@innovatrics/dis-client-sdk';

import { disClient } from './connection/serverConnection.ts';

export const createCustomerApi = async (): Promise<CreateCustomerResponse> => {
  const response = await disClient.api.createCustomer();

  return response.data;
};

export const getCustomerApi = async (customerId: string): Promise<GetCustomerResponse> => {
  const response = await disClient.api.getCustomer(customerId);

  return response.data;
};

export const inspectCustomerApi = async (customerId: string): Promise<CustomerInspectResponse> => {
  const response = await disClient.api.inspect(customerId);

  return response.data;
};

export const deleteCustomerApi = async (customerId: string): Promise<void> => {
  await disClient.api.deleteCustomer(customerId);
};
