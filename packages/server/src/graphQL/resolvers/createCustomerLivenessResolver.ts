import type { CreateCustomerLivenessSelfieResponse } from '../../types/graphqlTypes';
import type { CreateCustomerLivenessSelfieRestRequest } from '../../types/restRequestTypes';

import { createCustomerLivenessApi, createCustomerLivenessSelfieApi } from '../../api/customersLivenessApi';
import { createImage } from '../../api/utils';
import createCustomer from '../../api/utils/createCustomer';
import { AssertionType } from '../../types/graphqlTypes';

export const createCustomerLivenessResolver = async (
  image?: string,
  assertionType?: `${AssertionType}`,
  isLivenessCreated?: boolean,
  customerApiLink?: string,
  selfieLink?: string,
): Promise<CreateCustomerLivenessSelfieResponse> => {
  const customer = await createCustomer(customerApiLink);

  if (!isLivenessCreated) {
    await createCustomerLivenessApi(customer);
  }

  const createCustomerLivenessSelfieRequest: CreateCustomerLivenessSelfieRestRequest = {
    assertion: AssertionType[assertionType || AssertionType.NONE],
  };

  if (image && selfieLink) {
    throw new Error('Only one of "image" or "selfieLink" arguments must be provided.');
  }

  if (!image && !selfieLink) {
    throw new Error('One of "image" or "selfieLink" argument must be provided.');
  }

  if (image) {
    createCustomerLivenessSelfieRequest.image = createImage(image);
  }

  if (selfieLink) {
    createCustomerLivenessSelfieRequest.selfieOrigin = { link: selfieLink };
  }

  const response = await createCustomerLivenessSelfieApi(customer, createCustomerLivenessSelfieRequest);

  return {
    errorCode: response.errorCode,
    links: {
      customer,
    },
  };
};
