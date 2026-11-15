import evaluateCustomerLivenessResponse from '../api/mocks/data/evaluateCustomerLivenessResponse.json';
import { customerApiLinkError, customerId } from '../test/index.ts';
import { Liveness } from '../types/index.ts';

import { evaluateCustomerLivenessResolver } from './evaluateCustomerLivenessResolver.ts';

describe('#evaluateCustomerLiveness', () => {
  it('should get correct response', async () => {
    const result = evaluateCustomerLivenessResolver(Liveness.EYE_GAZE_LIVENESS, customerId);

    const expectedResult = { liveness: { ...evaluateCustomerLivenessResponse } };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = evaluateCustomerLivenessResolver(Liveness.EYE_GAZE_LIVENESS, customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
