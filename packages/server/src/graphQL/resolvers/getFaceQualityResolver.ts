import type { FaceQualityResponse } from '../../types/graphqlTypes';

import { checkQualityApi } from '../../api/faceOperationsApi';

export const getFaceQualityResolver = async (faceApiLink: string): Promise<FaceQualityResponse> => {
  const response = await checkQualityApi(faceApiLink);

  return {
    ...response,
    links: {
      self: faceApiLink,
    },
  };
};
