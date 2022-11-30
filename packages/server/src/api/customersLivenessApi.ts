import {
  CreateCustomerLivenessSelfieRestRequest,
  EvaluateCustomerLivenessRestRequest,
} from '../types/restRequestTypes';
import {
  CreateCustomerLivenessRestResponse,
  CreateCustomerLivenessSelfieRestResponse,
  EvaluateCustomerLivenessRestResponse,
} from '../types/restResponseTypes';
import { serverConnection } from './rest/serverConnection';

export const createCustomerLivenessApi = async (
  customerApiLink: string,
): Promise<CreateCustomerLivenessRestResponse> => {
  const apiPath = `${customerApiLink}/liveness`;
  const response = await serverConnection.put<CreateCustomerLivenessRestResponse>(apiPath);

  return response.data;
};

export const createCustomerLivenessSelfieApi = async (
  customerApiLink: string,
  request: CreateCustomerLivenessSelfieRestRequest,
): Promise<CreateCustomerLivenessSelfieRestResponse> => {
  const apiPath = `${customerApiLink}/liveness/selfies`;
  const response = await serverConnection.post<CreateCustomerLivenessSelfieRestResponse>(apiPath, request);

  return response.data;
};

export const evaluateCustomerLivenessApi = async (
  customerApiLink: string,
  request: EvaluateCustomerLivenessRestRequest,
): Promise<EvaluateCustomerLivenessRestResponse> => {
  const apiPath = `${customerApiLink}/liveness/evaluation`;
  const response = await serverConnection.post<EvaluateCustomerLivenessRestResponse>(apiPath, request);

  return response.data;
};
