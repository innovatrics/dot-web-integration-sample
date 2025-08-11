import type { EvaluateCustomerDeepfakeResponse, LivenessType } from '../../types/graphqlTypes';
import type { EvaluateCustomerDeepfakeRestRequest } from '../../types/restRequestTypes';

import { evaluateCustomerDeepfakeApi } from '../../api/customersLivenessApi';

export const evaluateCustomerDeepfakeResolver = async (
  type: `${LivenessType}`,
  customerApiLink: string,
): Promise<EvaluateCustomerDeepfakeResponse> => {
  const request: EvaluateCustomerDeepfakeRestRequest = {
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
