import type { StoreCustomerRequest } from '../types/restRequestTypes';
import type {
  CreateCustomerRestResponse,
  GetCustomerRestResponse,
  InspectCustomerRestResponse,
  StoreCustomerRestResponse,
} from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';

export const createCustomerApi = async (): Promise<CreateCustomerRestResponse> => {
  const apiPath = `/api/v1/customers`;
  const response = await serverConnection.post<CreateCustomerRestResponse>(apiPath);

  return response.data;
};

export const getCustomerApi = async (customerApiLink: string): Promise<GetCustomerRestResponse> => {
  const response = await serverConnection.get<GetCustomerRestResponse>(customerApiLink);

  return response.data;
};

export const inspectCustomerApi = async (customerApiLink: string): Promise<InspectCustomerRestResponse> => {
  const apiPath = `${customerApiLink}/inspect`;
  const response = await serverConnection.post<InspectCustomerRestResponse>(apiPath);

  return response.data;
};

export const deleteCustomerApi = async (customerApiLink: string): Promise<void> => {
  await serverConnection.delete(customerApiLink);
};

export const storeCustomerApi = async (
  customerApiLink: string,
  request: StoreCustomerRequest,
): Promise<StoreCustomerRestResponse> => {
  const apiPath = `${customerApiLink}/store`;

  const response = await serverConnection.post<StoreCustomerRestResponse>(apiPath, request);

  return response.data;
};
