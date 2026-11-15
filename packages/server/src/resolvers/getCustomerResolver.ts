import { getCustomerApi } from '../api/customersApi.ts';
import { mapToArray } from '../api/utils/index.ts';

export const getCustomerResolver = async (customerId: string) => {
  const response = await getCustomerApi(customerId);

  response.customer?.document;

  const customer = {
    ...response.customer,
    document: {
      ...response.customer?.document,
      additionalTexts: mapToArray(response.customer?.document?.additionalTexts),
      pageTypes: response.customer?.document?.pageTypes || [],
      type: {
        ...response.customer?.document?.type,
      },
    },
  };

  return {
    customer,
  };
};
