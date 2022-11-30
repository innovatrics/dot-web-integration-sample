import { postContactForm } from '../../api/contactFormApi';
import { ContactFormRequest } from '../../types/graphqlTypes';
import { ContactFormRestRequest } from '../../types/restRequestTypes';

export const postContactFormResolver = async (contactFormData: ContactFormRequest, recaptchaToken: string) => {
  const contactFormRestRequest: ContactFormRestRequest = {
    ...contactFormData,
  };

  await postContactForm(contactFormRestRequest, recaptchaToken);
};
