import type { MutationCreateDocumentPageWithContentArgs } from '../../types/graphqlTypes';
import type { CreateCustomerDocumentRestRequest } from '../../types/restRequestTypes';

import { createDocumentApi } from '../customersDocumentApi';

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
