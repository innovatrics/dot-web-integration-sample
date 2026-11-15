import type { TrustEvaluationResponse, TrustFactorEvaluationDefinitionDTO } from '@innovatrics/dis-client-sdk';

import { evaluateTrustFactors } from '../api/trustEvaluatorApi.ts';
import { ProcessingError } from '../errors/index.ts';
import { getTrustFactorDefinitions } from '../firebase/remote-config.ts';
import { appLogger } from '../logger.ts';
import { Liveness, type LivenessType } from '../types/index.ts';

const keys = [
  'tf_definitions_magnifeye_liveness',
  'tf_definitions_smile_liveness',
  'tf_definitions_passive_liveness',
  'tf_definitions_multi_range_liveness',
  'tf_definitions_base',
] as const;

function getLivenessTrustFactors(
  livenessType: LivenessType,
  tfDefinitions: Record<string, Array<TrustFactorEvaluationDefinitionDTO>>,
): Array<TrustFactorEvaluationDefinitionDTO> {
  switch (livenessType) {
    case Liveness.MAGNIFEYE_LIVENESS:
      return tfDefinitions.tf_definitions_magnifeye_liveness;
    case Liveness.SMILE_LIVENESS:
      return tfDefinitions.tf_definitions_smile_liveness;
    case Liveness.MULTI_RANGE_LIVENESS:
      return tfDefinitions.tf_definitions_multi_range_liveness;
    default:
      return tfDefinitions.tf_definitions_passive_liveness;
  }
}

export async function evaluateTrustFactorsResolver(
  customerId: string,
  livenessType: LivenessType,
): Promise<TrustEvaluationResponse> {
  let tfDefinitions: Record<string, Array<TrustFactorEvaluationDefinitionDTO>>;

  try {
    tfDefinitions = await getTrustFactorDefinitions(keys);
  } catch (error) {
    throw new ProcessingError({
      message: 'Failed to fetch trust factor definitions from remote config',
      operation: 'evaluateTrustFactorsResolver:getTrustFactorDefinitions',
      originalError: error instanceof Error ? error : undefined,
    });
  }

  const livenessTrustFactors = getLivenessTrustFactors(livenessType, tfDefinitions);

  appLogger.debug(`Liveness trust factor definitions: ${JSON.stringify(livenessTrustFactors)}`);

  const payload = {
    trustFactorDefinitions: [...tfDefinitions.tf_definitions_base, ...livenessTrustFactors],
  };

  const response = await evaluateTrustFactors(customerId, payload);

  return response;
}
