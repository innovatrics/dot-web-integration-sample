import { getAppInfoApi } from '../../api/getAppInfoApi';
import { GetAppInfoResponse } from '../../types/graphqlTypes';

export const getAppInfoResolver = async (): Promise<GetAppInfoResponse> => {
  const appInfoResponse = await getAppInfoApi();

  const { build, sam, iface } = appInfoResponse;

  const response = {
    disVersion: build.version,
    samVersion: sam.version,
    iFaceVersion: iface.version,
  };

  return response;
};
