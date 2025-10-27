import type { DetectFaceResponse, MutationCreateFaceArgs } from '../../types/graphqlTypes.js';
import type { DetectFaceRestRequest } from '../../types/restRequestTypes.js';

import { createFaceApi } from '../../api/faceOperationsApi.js';
import { createImage } from '../../api/utils/index.js';

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
