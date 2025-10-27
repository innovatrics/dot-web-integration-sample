import type {
  CreateDocumentPageResponse,
  MutationCreateDocumentPageWithContentArgs,
  MutationCreateDocumentPageWithImageArgs,
} from '../../types/graphqlTypes.js';
import type { CreateDocumentPageRestRequest } from '../../types/restRequestTypes.js';

import { createDocumentPageApi, createDocumentPageOctetStreamApi } from '../../api/customersDocumentApi.js';
import createCustomer from '../../api/utils/createCustomer.js';
import { createDocument } from '../../api/utils/createDocument.js';
import { createImage } from '../../api/utils/index.js';

export async function createDocumentWithContentResolver({
  content,
  customerApiLink,
  isDocumentCreated,
  ...args
}: MutationCreateDocumentPageWithContentArgs): Promise<CreateDocumentPageResponse> {
  const customer = await createCustomer(customerApiLink);

  if (!isDocumentCreated) {
    await createDocument(customer, args);
  }

  const response = await createDocumentPageOctetStreamApi(customer, content);

  return {
    ...response,
    links: {
      customer,
    },
  };
}

export async function createDocumentPageWithImageResolver({
  customerApiLink,
  image,
  isDocumentCreated,
  pageType,
  ...args
}: MutationCreateDocumentPageWithImageArgs): Promise<CreateDocumentPageResponse> {
  const customer = await createCustomer(customerApiLink);

  if (!isDocumentCreated) {
    await createDocument(customer, args);
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
}
