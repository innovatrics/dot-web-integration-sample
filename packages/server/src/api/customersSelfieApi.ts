import type { DetectSelfieRestRequest, ImageDimensionsRestRequest } from '../types/restRequestTypes';
import type { CroppedSelfieImageRestResponse, DetectSelfieRestResponse } from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';

export const createCustomerSelfieApi = async (
  customerApiLink: string,
  request: DetectSelfieRestRequest,
): Promise<DetectSelfieRestResponse> => {
  const apiPath = `${customerApiLink}/selfie`;
  const response = await serverConnection.put<DetectSelfieRestResponse>(apiPath, request);

  return response.data;
};

export const getCroppedSelfieApi = async (
  faceApiLink: string,
  dimensions?: ImageDimensionsRestRequest,
): Promise<CroppedSelfieImageRestResponse> => {
  const apiPath = `${faceApiLink}/crop`;
  const response = await serverConnection.get<CroppedSelfieImageRestResponse>(apiPath, {
    params: { ...dimensions },
  });

  return response.data;
};
