import type { CroppedImageLinks, CroppedImagesResponse } from '../../types/graphqlTypes';

import { getCroppedImage } from '../../api/customersDocumentApi';

export const getCroppedImagesResolver = async (imageLinks: CroppedImageLinks): Promise<CroppedImagesResponse> => {
  const arrayOfPromises = Object.entries(imageLinks).map(async ([imageKey, imageLink]) => {
    const response = await getCroppedImage(imageLink.link, imageLink.dimensions);

    // Create array of tuples, for Object.fromEntries
    return [imageKey, `data:image/png;base64,${response.data}`];
  });

  const tuplesWithCroppedImages = await Promise.all(arrayOfPromises);
  const croppedImages = Object.fromEntries(tuplesWithCroppedImages) as CroppedImagesResponse;

  return croppedImages;
};
