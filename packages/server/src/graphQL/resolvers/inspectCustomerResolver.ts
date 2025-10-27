import type { InspectCustomerResponse } from '../../types/graphqlTypes.js';

import { inspectCustomerApi } from '../../api/customersApi.js';

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
