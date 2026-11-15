import { disClient } from './connection/serverConnection.ts';

export const getAppInfoApi = async () => {
  const response = await disClient.api.info();

  return response.data;
};
