import { createCustomerApi } from '../customersApi.ts';

export const createCustomer = async (customerApiLink?: string): Promise<string> => {
  if (!customerApiLink) {
    const res = await createCustomerApi();
    const customer = res.links.self;

    return customer;
  }

  return customerApiLink;
};
