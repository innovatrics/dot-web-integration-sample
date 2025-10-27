import type { GetAppInfoRestResponse } from '../types/restResponseTypes.js';

import { disClient } from './rest/serverConnection.js';

export const getAppInfoApi = async (): Promise<GetAppInfoRestResponse> => {
  const response = await disClient.api.info();

  return response.data;
};
