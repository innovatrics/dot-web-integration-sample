import type { CreateCustomerResponse, CustomerInspectResponse, GetCustomerResponse } from '@innovatrics/dis-client-sdk';

import { disClient } from './rest/serverConnection.js';
import { getLastURLSegment } from './utils/getLastURLSegment.js';

export const createCustomerApi = async (): Promise<CreateCustomerResponse> => {
  const response = await disClient.api.createCustomer();

  return response.data;
};

export const getCustomerApi = async (customerApiLink: string): Promise<GetCustomerResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.getCustomer(customerId);

  return response.data;
};

export const inspectCustomerApi = async (customerApiLink: string): Promise<CustomerInspectResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.inspect(customerId);

  return response.data;
};

export const deleteCustomerApi = async (customerApiLink: string): Promise<void> => {
  const customerId = getLastURLSegment(customerApiLink);

  await disClient.api.deleteCustomer(customerId);
};
