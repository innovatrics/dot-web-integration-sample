import { expect } from 'vitest';

import createMultiRangeLivenessChallengeResponse from '../../api/mocks/data/createMultiRangeLivenessChallengeResponse.json' with { type: 'json' };
import { customerApiLink, customerApiLinkError } from '../../test/index.js';

import resolvers from './index.js';

describe('#createMultiRangeLivenessChallenge', () => {
  it('should get correct response when multirange message is present', async () => {
    const result = resolvers.Mutation.createLivenessRecordsChallenge(null, { livenessType: 'MULTI_RANGE_LIVENESS' });

    result.then((res) => console.log('result', res));
    await expect(result).resolves.toEqual(createMultiRangeLivenessChallengeResponse);
  });

  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Mutation.createLivenessRecordsChallenge(null, {
      livenessType: 'MULTI_RANGE_LIVENESS',
      customerApiLink,
    });

    await expect(result).resolves.toEqual(createMultiRangeLivenessChallengeResponse);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Mutation.createLivenessRecordsChallenge(null, {
      livenessType: 'MULTI_RANGE_LIVENESS',
      customerApiLink: customerApiLinkError,
    });

    await expect(result).rejects.toThrow();
  });
});
