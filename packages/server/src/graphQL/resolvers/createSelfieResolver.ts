import type { DetectSelfieResponse } from '../../types/graphqlTypes.js';
import type { DetectSelfieRestRequest } from '../../types/restRequestTypes.js';

import { createCustomerSelfieApi } from '../../api/customersSelfieApi.js';
import createCustomer from '../../api/utils/createCustomer.js';
import { createImage } from '../../api/utils/index.js';

export const createSelfieResolver = async (
  image?: string,
  customerApiLink?: string,
  selfieLink?: string,
): Promise<DetectSelfieResponse> => {
  const customer = await createCustomer(customerApiLink);

  const request: DetectSelfieRestRequest = {};

  if (image && selfieLink) {
    throw new Error('Only one of "image" or "selfieLink" arguments must be provided.');
  }

  if (!image && !selfieLink) {
    throw new Error('One of "image" or "selfieLink" argument must be provided.');
  }

  if (image) {
    request.image = createImage(image);
  }

  if (selfieLink) {
    request.selfieOrigin = { link: selfieLink };
  }

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
