import { Api } from '@innovatrics/dis-client-sdk';
import axios from 'axios';

import env from '../../dotenv.js';

import { onContactFormConnectionFulfilled, onContactFormConnectionRejected } from './interceptors/contactForm.js';
import { onRecaptchaConnectionFulfilled, onRecaptchaConnectionRejected } from './interceptors/recaptcha.js';
import { onServerConnectionFulfilled, onServerConnectionRejected } from './interceptors/server.js';

const disClient = new Api({
  baseURL: env.DOCUMENT_IDENTITY_SERVICE_URL,
  ...(env.NODE_ENV === 'development'
    ? {
        headers: {
          Authorization: `Bearer ${env.AUTH_TOKEN}`,
        },
        auth: {
          authType: 'none',
        },
      }
    : {
        auth: {
          authType: 'oauth2',
          tokenUrl: env.DOCUMENT_IDENTITY_SERVICE_TOKEN_URL,
          clientId: env.DOCUMENT_IDENTITY_SERVICE_CLIENT_ID,
          clientSecret: env.DOCUMENT_IDENTITY_SERVICE_CLIENT_SECRET,
          audience: env.DOCUMENT_IDENTITY_SERVICE_AUDIENCE,
          sendClientInBody: true,
        },
      }),

  secure: true,
});

const contactFormConnection = axios.create({
  baseURL: env.CONTACT_FORM_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
});

const googleRecaptchaConnection = axios.create({
  baseURL: env.GOOGLE_RECAPTCHA_SITE_VERIFY_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
});

disClient.instance.interceptors.response.use(onServerConnectionFulfilled, onServerConnectionRejected);
contactFormConnection.interceptors.response.use(onContactFormConnectionFulfilled, onContactFormConnectionRejected);
googleRecaptchaConnection.interceptors.response.use(onRecaptchaConnectionFulfilled, onRecaptchaConnectionRejected);

export { disClient, contactFormConnection, googleRecaptchaConnection };
