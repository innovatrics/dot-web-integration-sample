import { expect } from 'vitest';

import { customerApiLink } from '../../test/index.js';
import { LivenessType } from '../../types/graphqlTypes.js';

import resolvers from './index.js';

describe('#evaluateTrustFactors', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.evaluateTrustFactors(null, {
      livenessType: LivenessType.PASSIVE,
      customerApiLink,
    });

    const expected = {
      trustEvaluation: {
        result: 'ACCEPT',
        trustFactorEvaluationResults: [
          {
            trustFactorName: 'passive_liveness',
            result: 'ACCEPT',
          },
        ],
        warnings: [
          {
            warning: 'UNKNOWN_TRUST_FACTOR_DEFINITION',
            trustFactorName: 'some_unknown_trust_factor',
          },
        ],
        errors: [
          {
            error: 'INVALID_TRUST_FACTOR_DEFINITION',
            trustFactorName: 'some_invalid_trust_factor',
          },
        ],
      },
      links: {
        selfie: '/api/v1/customers/{customerUuid}/selfie',
      },
    };

    await expect(result).resolves.toEqual(expected);
  });
});
