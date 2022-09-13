import { createFaceApi } from '../../api/faceOperationsApi';
import { createImage } from '../../api/utils';
import { DetectFaceResponse, FaceDetectionProperties } from '../../types/graphqlTypes';
import { DetectFaceRestRequest } from '../../types/restRequestTypes';

export const createFaceResolver = async (
  image: string,
  detection?: FaceDetectionProperties,
): Promise<DetectFaceResponse> => {
  const request: DetectFaceRestRequest = {
    image: createImage(image),
  };

  if (detection) {
    const { mode, ...rest } = detection;

    request.detection = {
      ...rest,
    };

    if (mode) {
      request.detection.mode = mode;
    }
  }

  const response = await createFaceApi(request);

  return { ...response };
};
