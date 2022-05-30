import { evaluateCustomerLivenessApi } from '../../api/customersLivenessApi';
import { EvaluateCustomerLivenessResponse, EvaluateLivenessType } from '../../types/graphqlTypes';
import { EvaluateCustomerLivenessRestRequest } from '../../types/restRequestTypes';

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
