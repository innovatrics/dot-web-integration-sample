import type { DetectFaceRestRequest } from '../types/restRequestTypes.js';
import type { CreateFaceResponse, FaceQualityResponse } from '@innovatrics/dis-client-sdk';

import { disClient } from './rest/serverConnection.js';
import { getLastURLSegment } from './utils/getLastURLSegment.js';

export const createFaceApi = async (request: DetectFaceRestRequest): Promise<CreateFaceResponse> => {
  const response = await disClient.api.detectFace(request);

  return response.data;
};

export const checkQualityApi = async (faceApiLink: string): Promise<FaceQualityResponse> => {
  const customerId = getLastURLSegment(faceApiLink);
  const response = await disClient.api.checkQuality(customerId);

  return response.data;
};
