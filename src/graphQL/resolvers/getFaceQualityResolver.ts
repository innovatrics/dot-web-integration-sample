import { checkQualityApi } from '../../api/faceOperationsApi';
import { FaceQualityResponse } from '../../types/graphqlTypes';

export const getFaceQualityResolver = async (faceApiLink: string): Promise<FaceQualityResponse> => {
  const response = await checkQualityApi(faceApiLink);

  return {
    ...response,
    links: {
      self: faceApiLink,
    },
  };
};
