import { getCroppedSelfieApi } from '../../api/customersSelfieApi';
import { CroppedSelfieResponse, ImageDimensions } from '../../types/graphqlTypes';

export const getCroppedSelfieResolver = async (
  faceApiLink: string,
  dimensions?: ImageDimensions,
): Promise<CroppedSelfieResponse> => {
  const response = await getCroppedSelfieApi(faceApiLink, dimensions);

  return { selfie: `data:image/png;base64,${response.data}` };
};
