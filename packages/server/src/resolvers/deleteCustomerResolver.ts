import { deleteCustomerApi } from '../api/customersApi.ts';

export const deleteCustomerResolver = async (customerId: string): Promise<void> => {
  await deleteCustomerApi(customerId);
};
