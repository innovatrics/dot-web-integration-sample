import type { DetectSelfieRestRequest, ImageDimensionsRestRequest } from '../types/restRequestTypes.js';
import type { CroppedSelfieImageRestResponse, DetectSelfieRestResponse } from '../types/restResponseTypes.js';

import { disClient } from './rest/serverConnection.js';
import { getLastURLSegment } from './utils/getLastURLSegment.js';

export const createCustomerSelfieApi = async (
  customerApiLink: string,
  request: DetectSelfieRestRequest,
): Promise<DetectSelfieRestResponse> => {
  const apiPath = `${customerApiLink}/selfie`;

  const response = await disClient.request<DetectSelfieRestResponse>({
    method: 'PUT',
    path: apiPath,
    secure: true,
    body: request,
  });

  return response.data;
};

export const getCroppedSelfieApi = async (
  faceApiLink: string,
  dimensions?: ImageDimensionsRestRequest,
): Promise<CroppedSelfieImageRestResponse> => {
  const customerId = getLastURLSegment(faceApiLink);

  const response = await disClient.api.doCrop(customerId, {
    ...dimensions,
  });

  return response.data;
};
