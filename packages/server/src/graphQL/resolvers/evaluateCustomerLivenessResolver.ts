import type { EvaluateCustomerLivenessResponse } from '../../types/graphqlTypes';
import type { EvaluateCustomerLivenessRestRequest } from '../../types/restRequestTypes';

import { evaluateCustomerLivenessApi } from '../../api/customersLivenessApi';
import { EvaluateLivenessType } from '../../types/graphqlTypes';

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
