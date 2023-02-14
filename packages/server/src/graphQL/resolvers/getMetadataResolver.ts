import type { GetMetadataResponse } from '../../types/graphqlTypes';

import { getMetadataApi } from '../../api/getMetadataApi';
import { mapToArray } from '../../api/utils';

export const getMetadataResolver = async (): Promise<GetMetadataResponse> => {
  const response = await getMetadataApi();

  const res = {
    documents: response.documents.map((document) => {
      return {
        ...document,
        pages: mapToArray(document.pages).map((page) => {
          return {
            ...page,
            visualZone: mapToArray(page.visualZone),
          };
        }),
      };
    }),
  };

  return res;
};
