import { createCustomerLivenessApi, createCustomerLivenessSelfieApi } from '../../api/customersLivenessApi';
import { createImage } from '../../api/utils';
import createCustomer from '../../api/utils/createCustomer';
import { AssertionType, CreateCustomerLivenessSelfieResponse } from '../../types/graphqlTypes';
import { CreateCustomerLivenessSelfieRestRequest } from '../../types/restRequestTypes';

export const createCustomerLivenessResolver = async (
  image?: string,
  assertionType?: `${AssertionType}`,
  isDocumentCreated?: boolean,
  customerApiLink?: string,
  selfieLink?: string,
): Promise<CreateCustomerLivenessSelfieResponse> => {
  const customer = await createCustomer(customerApiLink);

  if (!isDocumentCreated) {
    await createCustomerLivenessApi(customer);
  }

  const createCustomerLivenessSelfieRequest: CreateCustomerLivenessSelfieRestRequest = {
    assertion: AssertionType[assertionType || AssertionType.NONE],
  };

  if (image) {
    createCustomerLivenessSelfieRequest.image = createImage(image);
  } else if (selfieLink) {
    createCustomerLivenessSelfieRequest.selfieOrigin = { link: selfieLink };
  } else {
    throw new Error('One of "image" or "selfieLink" argument must be provided.');
  }

  const response = await createCustomerLivenessSelfieApi(customer, createCustomerLivenessSelfieRequest);

  return {
    errorCode: response.errorCode,
    links: {
      customer,
    },
  };
};
