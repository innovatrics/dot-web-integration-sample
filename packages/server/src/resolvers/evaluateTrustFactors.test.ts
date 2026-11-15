import { customerId } from '../test/index.ts';
import { Liveness } from '../types/index.ts';

import { evaluateTrustFactorsResolver } from './evaluateTrustFactors.ts';

describe('#evaluateTrustFactors', () => {
  it('should get correct response', async () => {
    const result = evaluateTrustFactorsResolver(customerId, Liveness.PASSIVE_LIVENESS);

    const expected = {
      links: {
        selfie: '/api/v1/customers/{customerUuid}/selfie',
      },
      trustEvaluation: {
        errors: [
          {
            error: 'INVALID_TRUST_FACTOR_DEFINITION',
            trustFactorName: 'some_invalid_trust_factor',
          },
        ],
        result: 'ACCEPT',
        trustFactorEvaluationResults: [
          {
            result: 'ACCEPT',
            trustFactorName: 'passive_liveness',
          },
        ],
        warnings: [
          {
            trustFactorName: 'some_unknown_trust_factor',
            warning: 'UNKNOWN_TRUST_FACTOR_DEFINITION',
          },
        ],
      },
    };

    await expect(result).resolves.toEqual(expected);
  });
});
