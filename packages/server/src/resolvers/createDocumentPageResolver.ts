import type { CreateDocumentPageRequest } from '@innovatrics/dis-client-sdk';
import { createDocumentPageApi, createDocumentPageOctetStreamApi } from '../api/customersDocumentApi.ts';
import { createCustomer } from '../api/utils/customer.ts';
import { createDocument } from '../api/utils/document.ts';
import { createImage } from '../api/utils/index.ts';
import type { CreateDocumentPageWithContentProps, CreateDocumentPageWithImageProps } from '../types/index.ts';

export async function createDocumentWithContentResolver({
  content,
  customerApiLink,
  isDocumentCreated,
  ...args
}: CreateDocumentPageWithContentProps) {
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
}: CreateDocumentPageWithImageProps) {
  const customer = await createCustomer(customerApiLink);

  if (!isDocumentCreated) {
    await createDocument(customer, args);
  }

  const createDocumentPageRequest: CreateDocumentPageRequest = {
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
