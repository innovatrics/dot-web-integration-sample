import { initContactFormaMocks } from '../api/mocks/contactFormMockAdapter.js';
import { initRecaptchaMocks } from '../api/mocks/recaptchaMockAdapter.js';
import { initServerMocks } from '../api/mocks/serverMockAdapter.js';
import { contactFormConnection, disClient, googleRecaptchaConnection } from '../api/rest/serverConnection.js';

export const serverConnectionMock = initServerMocks(disClient.instance);
export const recaptchaConnectionMock = initRecaptchaMocks(googleRecaptchaConnection);
export const contactFormConnectionMock = initContactFormaMocks(contactFormConnection);

export const faceApiLink = '/api/v1/faces/123';
export const faceApiLinkError = `${faceApiLink}error`;
export const customerApiLink = '/api/v1/customers/123';
export const customerApiLinkError = `${customerApiLink}error`;
export const customerLinks = { links: { customer: customerApiLink } };
export const faceLinks = { links: { self: faceApiLink } };

export const createLinks = (selfPath: string) => {
  return { links: { customer: customerApiLink, self: `${customerApiLink}${selfPath}` } };
};
