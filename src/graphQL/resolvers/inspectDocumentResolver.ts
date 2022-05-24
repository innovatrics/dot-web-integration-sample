import { inspectDocumentApi } from '../../api/customersDocumentApi';
import { mapToArray } from '../../api/utils';
import { InspectDocumentResponse } from '../../types/graphqlTypes';

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
