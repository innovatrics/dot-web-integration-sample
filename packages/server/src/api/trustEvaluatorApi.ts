import type { EvaluateTrustFactorsResponse } from '../types/graphqlTypes';
import type { PutTrustEvaluationRequest } from '../types/restRequestTypes';

import { serverConnection } from './rest/serverConnection';

export async function evaluateTrustFactors(customerApiLink: string, payload: PutTrustEvaluationRequest) {
  const apiPath = `${customerApiLink}/trust-evaluation/evaluate`;
  const response = await serverConnection.put<EvaluateTrustFactorsResponse>(apiPath, payload);

  return response.data;
}
