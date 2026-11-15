import type { CreateFaceRequest, CreateFaceResponse, FaceQualityResponse } from '@innovatrics/dis-client-sdk';

import { disClient } from './connection/serverConnection.ts';
import { getLastURLSegment } from './utils/index.ts';

export const detectFaceApi = async (request: CreateFaceRequest): Promise<CreateFaceResponse> => {
  const response = await disClient.api.detectFace(request);

  return response.data;
};

export const checkQualityApi = async (faceApiLink: string): Promise<FaceQualityResponse> => {
  const customerId = getLastURLSegment(faceApiLink);
  const response = await disClient.api.checkQuality(customerId);

  return response.data;
};

export const evaluateAspectsApi = async (faceId: string) => {
  const response = await disClient.api.evaluateAspects(faceId);

  return response.data;
};

export const cropApi = async (faceId: string) => {
  const response = await disClient.api.doCrop(faceId);

  return response.data;
};
