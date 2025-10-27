import type { InspectDocumentResponse } from '../../types/graphqlTypes.js';

import { inspectDocumentApi } from '../../api/customersDocumentApi.js';
import { mapToArray } from '../../api/utils/index.js';

export const inspectDocumentResolver = async (customerApiLink: string): Promise<InspectDocumentResponse> => {
  const response = await inspectDocumentApi(customerApiLink);

  return {
    ...response,
    pageTampering: mapToArray(response.pageTampering),
    links: {
      customer: customerApiLink,
    },
  };
};
