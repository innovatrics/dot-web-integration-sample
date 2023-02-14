import type { DetectFaceRestRequest } from '../types/restRequestTypes';
import type { DetectFaceRestResponse, FaceQualityRestResponse } from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';

export const createFaceApi = async (request: DetectFaceRestRequest): Promise<DetectFaceRestResponse> => {
  const apiPath = `/api/v1/faces`;
  const response = await serverConnection.post<DetectFaceRestResponse>(apiPath, request);

  return response.data;
};

export const checkQualityApi = async (faceApiLink: string): Promise<FaceQualityRestResponse> => {
  const apiPath = `${faceApiLink}/quality`;
  const response = await serverConnection.get<FaceQualityRestResponse>(apiPath);

  return response.data;
};
