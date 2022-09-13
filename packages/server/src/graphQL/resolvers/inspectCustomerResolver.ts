import { inspectCustomerApi } from '../../api/customersApi';
import { InspectCustomerResponse } from '../../types/graphqlTypes';

export const inspectCustomerResolver = async (customerApiLink: string): Promise<InspectCustomerResponse> => {
  const response = await inspectCustomerApi(customerApiLink);

  return {
    ...response,
    links: {
      ...response.links,
      customer: customerApiLink,
    },
  };
};
