import type { CreateMagnifeyeLivenessSelfieRestResponse } from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';
import { convertBase64ToByteArray } from './utils';

export const createMagnifeyeLivenessSelfiesApi = async (
  customerApiLink: string,
  magnifeyeMessage: string,
): Promise<CreateMagnifeyeLivenessSelfieRestResponse> => {
  const apiPath = `${customerApiLink}/liveness/records`;
  const magnifeyeMessageByteArray = convertBase64ToByteArray(magnifeyeMessage);

  const response = await serverConnection.post<CreateMagnifeyeLivenessSelfieRestResponse>(
    apiPath,
    magnifeyeMessageByteArray,
    {
      headers: { 'Content-Type': 'application/octet-stream' },
    },
  );

  return response.data;
};
