import { expect } from 'vitest';

import evaluateCustomerDeepfakeResponse from '../../api/mocks/data/evaluateCustomerDeepfakeResponse.json' with { type: 'json' };
import { customerApiLink, customerApiLinkError, customerLinks } from '../../test/index.js';
import { LivenessType } from '../../types/graphqlTypes.js';

import resolvers from './index.js';

describe('#evaluateCustomerDeepfake', () => {
  it('should get correct response', async () => {
    const result = resolvers.Query.evaluateCustomerDeepfake(null, {
      type: LivenessType.PASSIVE,
      customerApiLink,
    });

    const expectedResult = {
      deepfakeDetection: { ...evaluateCustomerDeepfakeResponse },
      ...customerLinks,
    };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.evaluateCustomerDeepfake(null, {
      type: LivenessType.PASSIVE,
      customerApiLink: customerApiLinkError,
    });

    await expect(result).rejects.toThrow();
  });
});
