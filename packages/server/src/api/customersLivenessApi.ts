import type {
  CreateCustomerLivenessRecordResponse,
  CreateCustomerLivenessResponse,
  EvaluateCustomerLivenessRequest,
  EvaluateCustomerLivenessResponse,
  EvaluateExtendedLivenessRequest,
  EvaluateExtendedLivenessResponse,
  LivenessChallengeRequest,
} from '@innovatrics/dis-client-sdk';

import { disClient } from './connection/serverConnection.ts';
import { getLastURLSegment } from './utils/index.ts';

export const createCustomerLivenessApi = async (customerApiLink: string): Promise<CreateCustomerLivenessResponse> => {
  const customerId = getLastURLSegment(customerApiLink);
  const response = await disClient.api.createLiveness(customerId);

  return response.data;
};

export const evaluateCustomerLivenessApi = async (
  customerId: string,
  request: EvaluateCustomerLivenessRequest,
): Promise<EvaluateCustomerLivenessResponse> => {
  const response = await disClient.api.evaluateLiveness(customerId, request);

  return response.data;
};

export const evaluateCustomerDeepfakeApi = async (
  customerId: string,
  livenessResources: EvaluateExtendedLivenessRequest['livenessResources'],
): Promise<EvaluateExtendedLivenessResponse> => {
  const payload: EvaluateExtendedLivenessRequest = {
    livenessResources,
    type: 'DEEPFAKE',
  } as const;

  const response = await disClient.api.evaluateExtendedLiveness(customerId, payload);

  return response.data;
};

export const createLivenessRecordsApi = async (
  customerId: string,
  content: string,
): Promise<CreateCustomerLivenessRecordResponse> => {
  const buffer = Buffer.from(content, 'base64');
  const file = new File([buffer], 'image', { type: 'application/octet-stream' });

  const response = await disClient.api.createLivenessRecord(customerId, file);

  return response.data;
};

export const createLivenessRecordsChallengeApi = async (
  customerId: string,
  livenessType: LivenessChallengeRequest['type'],
) => {
  const response = await disClient.api.createLivenessRecordChallenge(customerId, { type: livenessType });

  return response.data;
};
