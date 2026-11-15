import { evaluateCustomerLivenessApi } from '../api/customersLivenessApi.ts';
import type { LivenessType } from '../types/index.ts';

export const evaluateCustomerLivenessResolver = async (type: LivenessType, customerId: string) => {
  const response = await evaluateCustomerLivenessApi(customerId, { type });

  return {
    liveness: response,
  };
};
