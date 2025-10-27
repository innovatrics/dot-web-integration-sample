import { expect } from 'vitest';

import evaluateCustomerLivenessResponse from '../../api/mocks/data/evaluateCustomerLivenessResponse.json' with { type: 'json' };
import { customerApiLink, customerApiLinkError, customerLinks } from '../../test/index.js';
import { EvaluateLivenessType } from '../../types/graphqlTypes.js';

import resolvers from './index.js';

describe('#evaluateCustomerLiveness', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.evaluateCustomerLiveness(null, {
      type: EvaluateLivenessType.EYE_GAZE_LIVENESS,
      customerApiLink,
    });

    const expectedResult = { ...customerLinks, liveness: { ...evaluateCustomerLivenessResponse } };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.evaluateCustomerLiveness(null, {
      type: EvaluateLivenessType.EYE_GAZE_LIVENESS,
      customerApiLink: customerApiLinkError,
    });

    await expect(result).rejects.toThrow();
  });
});
