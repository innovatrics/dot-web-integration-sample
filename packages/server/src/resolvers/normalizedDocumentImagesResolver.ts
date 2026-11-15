import { getNormalizedImage } from '../api/customersDocumentApi.ts';
import { ProcessingError, ThirdPartyApiError } from '../errors/index.ts';
import type { CustomerDocumentPages, ImageDimensions } from '../types/index.ts';

type NormalizedDocumentImagesResponse = Omit<CustomerDocumentPages, '__typename'>;

export const normalizedDocumentImagesResolver = async (
  pages?: CustomerDocumentPages,
  dimensions?: ImageDimensions,
): Promise<CustomerDocumentPages> => {
  const normalizedDocumentImagesResponse: NormalizedDocumentImagesResponse = {};

  if (!pages) {
    return {};
  }

  try {
    const imageRequestPromises = Object.entries(pages).map(async ([key, value]) => {
      if (value) {
        const k = key as keyof NormalizedDocumentImagesResponse;
        const response = await getNormalizedImage(value, dimensions);

        normalizedDocumentImagesResponse[k] = `data:image/png;base64,${response.data}`;
      }
    });

    await Promise.all(imageRequestPromises);
  } catch (error) {
    // Re-throw ThirdPartyApiError as-is
    if (error instanceof ThirdPartyApiError) {
      throw error;
    }
    throw new ProcessingError({
      message: 'Failed to process normalized document images',
      operation: 'normalizedDocumentImagesResolver:processImages',
      originalError: error instanceof Error ? error : undefined,
    });
  }

  return normalizedDocumentImagesResponse;
};
