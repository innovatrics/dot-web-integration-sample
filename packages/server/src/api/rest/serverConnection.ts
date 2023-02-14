import axios from 'axios';

import env from '../../dotenv';

import { onContactFormConnectionFulfilled, onContactFormConnectionRejected } from './interceptors/contactForm';
import { onRecaptchaConnectionFulfilled, onRecaptchaConnectionRejected } from './interceptors/recaptcha';
import { onServerConnectionFulfilled, onServerConnectionRejected } from './interceptors/server';

const serverConnection = axios.create({
  baseURL: env.DOCUMENT_IDENTITY_SERVICE,
  maxBodyLength: 20000000,
  headers: {
    Authorization: `Bearer ${env.AUTH_TOKEN}`,
  },
});

const contactFormConnection = axios.create({
  baseURL: env.CONTACT_FORM_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
});

const googleRecaptchaConnection = axios.create({
  baseURL: env.GOOGLE_RECAPTCHA_SITE_VERIFY_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
});

serverConnection.interceptors.response.use(onServerConnectionFulfilled, onServerConnectionRejected);
contactFormConnection.interceptors.response.use(onContactFormConnectionFulfilled, onContactFormConnectionRejected);
googleRecaptchaConnection.interceptors.response.use(onRecaptchaConnectionFulfilled, onRecaptchaConnectionRejected);

export { serverConnection, contactFormConnection, googleRecaptchaConnection };
