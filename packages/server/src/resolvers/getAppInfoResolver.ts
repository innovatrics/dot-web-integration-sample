import { getAppInfoApi } from '../api/getAppInfoApi.ts';

export const getAppInfoResolver = async (): Promise<{
  disVersion: string;
  iFaceVersion: string;
  samVersion: string;
}> => {
  const appInfoResponse = await getAppInfoApi();

  const { build, iface, sam } = appInfoResponse;

  const response = {
    disVersion: build.version,
    iFaceVersion: iface.version,
    samVersion: sam.version,
  };

  return response;
};
