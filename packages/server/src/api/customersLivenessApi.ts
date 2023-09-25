import type { EvaluateCustomerLivenessRestRequest } from '../types/restRequestTypes';
import type {
  CreateCustomerLivenessRestResponse,
  CreateLivenessRecordsRestResponse,
  EvaluateCustomerLivenessRestResponse,
} from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';
import { convertBase64ToByteArray } from './utils';

export const createCustomerLivenessApi = async (
  customerApiLink: string,
): Promise<CreateCustomerLivenessRestResponse> => {
  const apiPath = `${customerApiLink}/liveness`;
  const response = await serverConnection.put<CreateCustomerLivenessRestResponse>(apiPath);

  return response.data;
};

export const evaluateCustomerLivenessApi = async (
  customerApiLink: string,
  request: EvaluateCustomerLivenessRestRequest,
): Promise<EvaluateCustomerLivenessRestResponse> => {
  const apiPath = `${customerApiLink}/liveness/evaluation`;
  const response = await serverConnection.post<EvaluateCustomerLivenessRestResponse>(apiPath, request);

  return response.data;
};

export const createLivenessRecordsApi = async (
  customerApiLink: string,
  content: string,
): Promise<CreateLivenessRecordsRestResponse> => {
  const apiPath = `${customerApiLink}/liveness/records`;
  const messageByteArray = convertBase64ToByteArray(content);

  const response = await serverConnection.post<CreateLivenessRecordsRestResponse>(apiPath, messageByteArray, {
    headers: { 'Content-Type': 'application/octet-stream' },
  });

  return response.data;
};
