import type { DocumentMetadataResponse } from '@innovatrics/dis-client-sdk';

import { disClient } from './connection/serverConnection.ts';

export const getMetadataApi = async (): Promise<DocumentMetadataResponse> => {
  const response = await disClient.api.metadata();

  return response.data;
};
