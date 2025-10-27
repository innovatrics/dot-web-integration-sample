import type { GetAppInfoResponse } from '../../types/graphqlTypes.js';

import { getAppInfoApi } from '../../api/getAppInfoApi.js';

export const getAppInfoResolver = async (): Promise<GetAppInfoResponse> => {
  const appInfoResponse = await getAppInfoApi();

  const { build, iface, sam } = appInfoResponse;

  const response = {
    disVersion: build.version,
    samVersion: sam.version,
    iFaceVersion: iface.version,
  };

  return response;
};
