import { deleteCustomerApi } from '../../api/customersApi';

export const deleteCustomerResolver = async (customerApiLink: string): Promise<void> => {
  await deleteCustomerApi(customerApiLink);
};
