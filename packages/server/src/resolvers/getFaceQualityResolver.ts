import { checkQualityApi } from '../api/faceOperationsApi.ts';

export const getFaceQualityResolver = async (faceApiLink: string) => {
  const response = await checkQualityApi(faceApiLink);

  return {
    ...response,
    links: {
      self: faceApiLink,
    },
  };
};
