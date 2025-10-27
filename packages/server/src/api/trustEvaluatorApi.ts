import type { PutTrustEvaluationRequest } from '../types/restRequestTypes.js';

import { disClient } from './rest/serverConnection.js';
import { getLastURLSegment } from './utils/getLastURLSegment.js';

export async function evaluateTrustFactors(customerApiLink: string, payload: PutTrustEvaluationRequest) {
  const customerId = getLastURLSegment(customerApiLink);

  const response = await disClient.api.evaluateTrustFactors(customerId, payload);

  return response.data;
}
