import type { DetectSelfieResponse } from '../../types/graphqlTypes';
import type { DetectSelfieRestRequest } from '../../types/restRequestTypes';

import { createCustomerSelfieApi } from '../../api/customersSelfieApi';
import { createImage } from '../../api/utils';
import createCustomer from '../../api/utils/createCustomer';

export const createSelfieResolver = async (image: string, customerApiLink?: string): Promise<DetectSelfieResponse> => {
  const customer = await createCustomer(customerApiLink);
  const request: DetectSelfieRestRequest = {
    image: createImage(image),
  };

  const response = await createCustomerSelfieApi(customer, request);
  const { links, ...rest } = response;

  return {
    ...rest,
    links: {
      self: links?.self || '',
      customer,
    },
  };
};
