import { inspectDocumentApi } from '../api/customersDocumentApi.ts';
import type { InspectDocumentResponse } from '../types/index.ts';

export const inspectDocumentResolver = async (customerId: string): Promise<InspectDocumentResponse> => {
  const response = await inspectDocumentApi(customerId);

  return {
    ...response,
    links: {
      customer: customerId,
    },
    pageTampering: response.pageTampering,
  };
};
