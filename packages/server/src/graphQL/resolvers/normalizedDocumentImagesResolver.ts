import type { CustomerDocumentPages, ImageDimensions } from '../../types/graphqlTypes';

import { getNormalizedImage } from '../../api/customersDocumentApi';

type NormalizedDocumentImagesResponse = Omit<CustomerDocumentPages, '__typename'>;

export const normalizedDocumentImagesResolver = async (
  pages?: CustomerDocumentPages,
  dimensions?: ImageDimensions,
): Promise<CustomerDocumentPages> => {
  const normalizedDocumentImagesResponse: NormalizedDocumentImagesResponse = {};

  if (!pages) {
    return {};
  }

  const imageRequestPromises = Object.entries(pages).map(async ([key, value]) => {
    if (value) {
      const k = key as keyof NormalizedDocumentImagesResponse;
      const response = await getNormalizedImage(value, dimensions);

      normalizedDocumentImagesResponse[k] = `data:image/png;base64,${response.data}`;
    }
  });

  await Promise.all(imageRequestPromises);

  return normalizedDocumentImagesResponse;
};
