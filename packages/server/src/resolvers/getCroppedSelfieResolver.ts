import { getCroppedSelfieApi } from '../api/customersSelfieApi.ts';
import type { ImageDimensions } from '../types/index.ts';

export const getCroppedSelfieResolver = async (faceId: string, dimensions?: ImageDimensions) => {
  const response = await getCroppedSelfieApi(faceId, dimensions);

  return { selfie: `data:image/png;base64,${response.data}` };
};
