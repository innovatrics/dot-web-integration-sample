import type { EvaluateCustomerLivenessRestRequest } from '../types/restRequestTypes.js';
import type {
  CreateCustomerLivenessRestResponse,
  EvaluateCustomerDeepfakeRestResponse,
} from '../types/restResponseTypes.js';
import type {
  CreateCustomerLivenessRecordResponse,
  EvaluateCustomerLivenessResponse,
  EvaluateExtendedLivenessRequest,
  LivenessChallengeRequest,
  LivenessChallengeResponse,
} from '@innovatrics/dis-client-sdk';

import { disClient } from './rest/serverConnection.js';
import { getLastURLSegment } from './utils/getLastURLSegment.js';

export const createCustomerLivenessApi = async (
  customerApiLink: string,
): Promise<CreateCustomerLivenessRestResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createLiveness(customerId);

  return response.data;
};

export const evaluateCustomerLivenessApi = async (
  customerApiLink: string,
  request: EvaluateCustomerLivenessRestRequest,
): Promise<EvaluateCustomerLivenessResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.evaluateLiveness(customerId, request);

  return response.data;
};

export const evaluateCustomerDeepfakeApi = async (
  customerApiLink: string,
  payload: EvaluateExtendedLivenessRequest,
): Promise<EvaluateCustomerDeepfakeRestResponse> => {
  const customerId = getLastURLSegment(customerApiLink);

  const response = await disClient.api.evaluateExtendedLiveness(customerId, payload);

  return response.data;
};

export const createLivenessRecordsApi = async (
  customerApiLink: string,
  content: string,
): Promise<CreateCustomerLivenessRecordResponse> => {
  const customerId = getLastURLSegment(customerApiLink);

  const buffer = Buffer.from(content, 'base64');
  const file = new File([buffer], 'image', { type: 'application/octet-stream' });

  const response = await disClient.api.createLivenessRecord(customerId, file);

  return response.data;
};

export const createLivenessRecordsChallengeApi = async (
  customerId: string,
  livenessType: LivenessChallengeRequest['type'],
): Promise<LivenessChallengeResponse> => {
  const response = await disClient.api.createLivenessRecordChallenge(customerId, { type: livenessType });

  return response.data;
};
