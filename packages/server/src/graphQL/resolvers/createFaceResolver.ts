import type { DetectFaceResponse, MutationCreateFaceArgs } from '../../types/graphqlTypes';
import type { DetectFaceRestRequest } from '../../types/restRequestTypes';

import { createFaceApi } from '../../api/faceOperationsApi';
import { createImage } from '../../api/utils';

export const createFaceResolver = async ({ detection, image }: MutationCreateFaceArgs): Promise<DetectFaceResponse> => {
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
