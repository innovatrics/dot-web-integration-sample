import type { CroppedSelfieResponse, ImageDimensions } from '../../types/graphqlTypes';

import { getCroppedSelfieApi } from '../../api/customersSelfieApi';

export const getCroppedSelfieResolver = async (
  faceApiLink: string,
  dimensions?: ImageDimensions,
): Promise<CroppedSelfieResponse> => {
  const response = await getCroppedSelfieApi(faceApiLink, dimensions);

  return { selfie: `data:image/png;base64,${response.data}` };
};
