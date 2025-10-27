import type { EvaluateCustomerDeepfakeResponse } from '../../types/graphqlTypes.js';
import type { EvaluateExtendedLivenessRequest } from '@innovatrics/dis-client-sdk';

import { evaluateCustomerDeepfakeApi } from '../../api/customersLivenessApi.js';
import { LivenessType } from '../../types/graphqlTypes.js';

export const evaluateCustomerDeepfakeResolver = async (
  type: `${LivenessType}`,
  customerApiLink: string,
): Promise<EvaluateCustomerDeepfakeResponse> => {
  if (type === LivenessType.MULTI_RANGE) {
    return {
      deepfakeDetection: {},
      links: { customer: customerApiLink },
    };
  }

  const request: EvaluateExtendedLivenessRequest = {
    type: 'DEEPFAKE',
    livenessResources: [type],
  };

  const response = await evaluateCustomerDeepfakeApi(customerApiLink, request);

  return {
    deepfakeDetection: response,
    links: {
      customer: customerApiLink,
    },
  };
};
