import type { MetadataRestResponse } from '../types/restResponseTypes.js';

import { disClient } from './rest/serverConnection.js';

export const getMetadataApi = async (): Promise<MetadataRestResponse> => {
  const response = await disClient.api.metadata();

  return response.data;
};
