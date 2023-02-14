import type { ContactFormRestRequest } from '../types/restRequestTypes';

import env from '../dotenv';

import { contactFormConnection, googleRecaptchaConnection } from './rest/serverConnection';
import { convertJsonToUrlencoded } from './utils';

const validateRecaptcha = async (recaptchaToken: string) => {
  const body = {
    secret: env.GOOGLE_RECAPTCHA_SECRET,
    response: recaptchaToken,
  };

  await googleRecaptchaConnection.request({ method: 'POST', data: convertJsonToUrlencoded(body) });
};

export const postContactForm = async (contactFormData: ContactFormRestRequest, recaptchaToken: string) => {
  await validateRecaptcha(recaptchaToken);

  const { checked, company, email, message, name } = contactFormData;

  const body = {
    'contact-form-name': name.trim(),
    'contact-form-company': company.trim(),
    'contact-form-mail': email.trim(),
    'contact-form-text': message.trim(),
    // "contact form 7" accepts "1" - true; "0" -false
    'acceptance-472': checked ? '1' : '0',
    'contact-form-lead-source-detail': 'DOT OCR demo',
    'contact-form-products': 'DOT',
  };

  await contactFormConnection.request({ method: 'POST', data: convertJsonToUrlencoded(body) });
};
