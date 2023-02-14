import type { Customer, GetCustomerResponse } from '../../types/graphqlTypes';

import { getCustomerApi } from '../../api/customersApi';
import { mapToArray } from '../../api/utils';
import { getDocumentTypeDetails } from '../../api/utils/createCustomer';

export const getCustomerResolver = async (customerApiLink: string): Promise<GetCustomerResponse> => {
  const response = await getCustomerApi(customerApiLink);

  const customer: Customer = {
    ...response.customer,
    document: {
      ...response.customer?.document,
      pageTypes: response.customer?.document?.pageTypes || [],
      additionalTexts: mapToArray(response.customer?.document?.additionalTexts),
      type: {
        ...response.customer?.document?.type,
      },
      parsedType: {
        ...getDocumentTypeDetails(response.customer?.document),
      },
    },
  };

  return {
    customer,
    links: {
      customer: customerApiLink,
    },
  };
};
