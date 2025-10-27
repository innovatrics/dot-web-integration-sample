import type { EvaluateCustomerLivenessResponse } from '../../types/graphqlTypes.js';
import type { EvaluateCustomerLivenessRestRequest } from '../../types/restRequestTypes.js';

import { evaluateCustomerLivenessApi } from '../../api/customersLivenessApi.js';
import { EvaluateLivenessType } from '../../types/graphqlTypes.js';

export const evaluateCustomerLivenessResolver = async (
  type: `${EvaluateLivenessType}`,
  customerApiLink: string,
): Promise<EvaluateCustomerLivenessResponse> => {
  const request: EvaluateCustomerLivenessRestRequest = {
    type: EvaluateLivenessType[type],
  };

  const response = await evaluateCustomerLivenessApi(customerApiLink, request);

  return {
    liveness: response,
    links: {
      customer: customerApiLink,
    },
  };
};
