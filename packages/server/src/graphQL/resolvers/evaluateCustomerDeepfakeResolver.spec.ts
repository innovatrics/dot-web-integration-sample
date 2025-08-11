import evaluateCustomerDeepfakeResponse from '../../api/mocks/data/evaluateCustomerDeepfakeResponse.json';
import { customerApiLink, customerApiLinkError, customerLinks } from '../../test';
import { LivenessType } from '../../types/graphqlTypes';

import resolvers from '.';

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
