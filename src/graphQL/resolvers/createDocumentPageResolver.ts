import { createDocumentApi, createDocumentPageApi } from '../../api/customersDocumentApi';
import { createImage } from '../../api/utils';
import createCustomer from '../../api/utils/createCustomer';
import { CreateDocumentPageResponse, DocumentAdvice, Source } from '../../types/graphqlTypes';
import { CreateCustomerDocumentRestRequest, CreateDocumentPageRestRequest } from '../../types/restRequestTypes';

export const createDocumentPageResolver = async (
  image: string,
  isDocumentCreated: boolean,
  pageType?: string,
  documentAdvice?: DocumentAdvice,
  customerApiLink?: string,
  sources?: Source[],
): Promise<CreateDocumentPageResponse> => {
  const customer = await createCustomer(customerApiLink);

  if (!isDocumentCreated) {
    const createDocumentRequest: CreateCustomerDocumentRestRequest = {};

    if (documentAdvice) {
      createDocumentRequest.advice = documentAdvice;
    }

    if (sources) {
      createDocumentRequest.sources = sources;
    }

    await createDocumentApi(customer, createDocumentRequest);
  }

  const createDocumentPageRequest: CreateDocumentPageRestRequest = {
    image: createImage(image),
  };

  if (pageType) {
    createDocumentPageRequest.advice = {
      classification: {
        pageTypes: [pageType],
      },
    };
  }

  const response = await createDocumentPageApi(customer, createDocumentPageRequest);

  return {
    ...response,
    links: {
      customer,
    },
  };
};
