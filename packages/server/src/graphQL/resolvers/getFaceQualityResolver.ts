import type { FaceQualityResponse } from '../../types/graphqlTypes.js';

import { checkQualityApi } from '../../api/faceOperationsApi.js';

export const getFaceQualityResolver = async (faceApiLink: string): Promise<FaceQualityResponse> => {
  const response = await checkQualityApi(faceApiLink);

  return {
    ...response,
    links: {
      self: faceApiLink,
    },
  };
};
