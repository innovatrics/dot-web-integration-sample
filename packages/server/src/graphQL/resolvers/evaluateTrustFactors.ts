import type { EvaluateTrustFactorsResponse } from '../../types/graphqlTypes';
import type { TrustFactorDefinition } from '../../types/restRequestTypes';

import { evaluateTrustFactors } from '../../api/trustEvaluatorApi';
import {
  baseTrustFactorDefinitions,
  magnifeyeLivenessTrustFactorDefinitions,
  passiveLivenessTrustFactorDefinitions,
  smileLivenessTrustFactorDefinitions,
} from '../../trust-factors/definitions';
import { LivenessType } from '../../types/graphqlTypes';

function getLivenessTrustFactors(livenessType: LivenessType): Array<TrustFactorDefinition> {
  switch (livenessType) {
    case LivenessType.MAGNIFEYE:
      return magnifeyeLivenessTrustFactorDefinitions;
    case LivenessType.SMILE:
      return smileLivenessTrustFactorDefinitions;
    case LivenessType.PASSIVE:
    default:
      return passiveLivenessTrustFactorDefinitions;
  }
}

export async function evaluateTrustFactorsResolver(
  customerApiLink: string,
  livenessType: LivenessType,
): Promise<EvaluateTrustFactorsResponse> {
  const livenessTrustFactors = getLivenessTrustFactors(livenessType);
  const payload = {
    trustFactorDefinitions: [...baseTrustFactorDefinitions, ...livenessTrustFactors],
  };

  const response = await evaluateTrustFactors(customerApiLink, payload);

  return response;
}
