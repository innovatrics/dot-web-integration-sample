import { createCustomerSelfieApi } from '../../api/customersSelfieApi';
import { createImage } from '../../api/utils';
import createCustomer from '../../api/utils/createCustomer';
import { DetectSelfieResponse } from '../../types/graphqlTypes';
import { DetectSelfieRestRequest } from '../../types/restRequestTypes';

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
