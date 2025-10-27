import type { TrustFactorDefinition } from '../../types/restRequestTypes.js';
import type { TrustEvaluationResponse } from '@innovatrics/dis-client-sdk';

import { evaluateTrustFactors } from '../../api/trustEvaluatorApi.js';
import {
  baseTrustFactorDefinitions,
  magnifeyeLivenessTrustFactorDefinitions,
  passiveLivenessTrustFactorDefinitions,
  smileLivenessTrustFactorDefinitions,
} from '../../trust-factors/definitions.js';
import { LivenessType } from '../../types/graphqlTypes.js';

function getLivenessTrustFactors(livenessType: LivenessType): Array<TrustFactorDefinition> {
  switch (livenessType) {
    case LivenessType.MAGNIFEYE:
      return magnifeyeLivenessTrustFactorDefinitions;
    case LivenessType.SMILE:
      return smileLivenessTrustFactorDefinitions;
    case LivenessType.MULTI_RANGE:
      return [];
    case LivenessType.PASSIVE:
    default:
      return passiveLivenessTrustFactorDefinitions;
  }
}

export async function evaluateTrustFactorsResolver(
  customerApiLink: string,
  livenessType: LivenessType,
): Promise<TrustEvaluationResponse> {
  const livenessTrustFactors = getLivenessTrustFactors(livenessType);
  const payload = {
    trustFactorDefinitions: [...baseTrustFactorDefinitions, ...livenessTrustFactors],
  };

  const response = await evaluateTrustFactors(customerApiLink, payload);

  return response;
}
