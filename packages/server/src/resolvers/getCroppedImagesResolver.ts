import { getCroppedImage } from '../api/customersDocumentApi.ts';
import { ProcessingError, ThirdPartyApiError } from '../errors/index.ts';
import type { CroppedImageLinks } from '../types/index.ts';

export const getCroppedImagesResolver = async (imageLinks: CroppedImageLinks) => {
  try {
    const arrayOfPromises = Object.entries(imageLinks).map(async ([imageKey, imageLink]) => {
      const response = await getCroppedImage(imageLink.link, imageLink.dimensions);

      // Create array of tuples, for Object.fromEntries
      return [imageKey, `data:image/png;base64,${response.data}`];
    });

    const tuplesWithCroppedImages = await Promise.all(arrayOfPromises);
    const croppedImages = Object.fromEntries(tuplesWithCroppedImages);

    return croppedImages;
  } catch (error) {
    // Re-throw ThirdPartyApiError as-is
    if (error instanceof ThirdPartyApiError) {
      throw error;
    }
    throw new ProcessingError({
      message: 'Failed to process cropped images',
      operation: 'getCroppedImagesResolver:processImages',
      originalError: error instanceof Error ? error : undefined,
    });
  }
};
