import { deleteCustomerApi } from '../../api/customersApi.js';

export const deleteCustomerResolver = async (customerApiLink: string): Promise<void> => {
  await deleteCustomerApi(customerApiLink);
};
