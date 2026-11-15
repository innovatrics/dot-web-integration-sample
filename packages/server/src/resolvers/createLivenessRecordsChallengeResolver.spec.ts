import { expect } from 'vitest';

import createMultiRangeLivenessChallengeResponse from '../api/mocks/data/createMultiRangeLivenessChallengeResponse.json' with {
  type: 'json',
};
import { customerApiLinkError, customerId } from '../test';
import { Liveness } from '../types';
import { createLivenessRecordsChallengeResolver } from './createLivenessRecordsChallengeResolver';

describe('#createMultiRangeLivenessChallenge', () => {
  it('should get correct response when multirange message is present', async () => {
    const result = createLivenessRecordsChallengeResolver(Liveness.MULTI_RANGE_LIVENESS, customerId);

    await expect(result).resolves.toEqual(createMultiRangeLivenessChallengeResponse);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = createLivenessRecordsChallengeResolver(Liveness.MULTI_RANGE_LIVENESS, customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
