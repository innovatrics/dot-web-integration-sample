import type { TrustEvaluationRequest } from '@innovatrics/dis-client-sdk';

import { disClient } from './connection/serverConnection.ts';

export async function evaluateTrustFactors(customerId: string, payload: TrustEvaluationRequest) {
  const response = await disClient.api.evaluateTrustFactors(customerId, payload);

  return response.data;
}
