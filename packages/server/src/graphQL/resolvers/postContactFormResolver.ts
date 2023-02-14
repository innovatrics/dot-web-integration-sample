import type { ContactFormRequest } from '../../types/graphqlTypes';
import type { ContactFormRestRequest } from '../../types/restRequestTypes';

import { postContactForm } from '../../api/contactFormApi';

export const postContactFormResolver = async (contactFormData: ContactFormRequest, recaptchaToken: string) => {
  const contactFormRestRequest: ContactFormRestRequest = {
    ...contactFormData,
  };

  await postContactForm(contactFormRestRequest, recaptchaToken);
};
