import type { MutationCreateDocumentPageWithContentArgs } from '../../types/graphqlTypes.js';
import type { CreateCustomerDocumentRestRequest } from '../../types/restRequestTypes.js';

import { createDocumentApi } from '../customersDocumentApi.js';

export async function createDocument(
  customer: string,
  { documentAdvice, sources }: Pick<MutationCreateDocumentPageWithContentArgs, 'documentAdvice' | 'sources'>,
) {
  const createDocumentRequest: CreateCustomerDocumentRestRequest = {};

  if (documentAdvice) {
    createDocumentRequest.advice = documentAdvice;
  }

  if (sources) {
    createDocumentRequest.sources = sources;
  }

  await createDocumentApi(customer, createDocumentRequest);
}
