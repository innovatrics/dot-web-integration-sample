import type { CreateFaceRequest } from '@innovatrics/dis-client-sdk';
import { detectFaceApi } from '../api/faceOperationsApi.ts';
import { createImage } from '../api/utils/index.ts';
import type { DetectFaceRestRequest } from '../types/index.ts';

export const createFaceResolver = async ({
  detection,
  image,
}: {
  detection?: CreateFaceRequest['detection'];
  image: string;
}) => {
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

  const response = await detectFaceApi(request);

  return { ...response };
};
