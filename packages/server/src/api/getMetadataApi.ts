import type { MetadataRestResponse } from '../types/restResponseTypes';

import { serverConnection } from './rest/serverConnection';

export const getMetadataApi = async (): Promise<MetadataRestResponse> => {
  const apiPath = `/api/v1/metadata`;
  const response = await serverConnection.get<MetadataRestResponse>(apiPath);

  return response.data;
};
