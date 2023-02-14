import type { GetAppInfoRestResponse } from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';

export const getAppInfoApi = async (): Promise<GetAppInfoRestResponse> => {
  const apiPath = `/api/v1/info`;
  const response = await serverConnection.get<GetAppInfoRestResponse>(apiPath);

  return response.data;
};
