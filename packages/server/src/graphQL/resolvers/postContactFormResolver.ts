import type { ContactFormRequest } from '../../types/graphqlTypes.js';
import type { ContactFormRestRequest } from '../../types/restRequestTypes.js';

import { postContactForm } from '../../api/contactFormApi.js';

export const postContactFormResolver = async (contactFormData: ContactFormRequest, recaptchaToken: string) => {
  const contactFormRestRequest: ContactFormRestRequest = {
    ...contactFormData,
  };

  await postContactForm(contactFormRestRequest, recaptchaToken);
};
