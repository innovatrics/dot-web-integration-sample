import type { InspectDocumentResponse } from '../../types/graphqlTypes';

import { inspectDocumentApi } from '../../api/customersDocumentApi';
import { mapToArray } from '../../api/utils';

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
