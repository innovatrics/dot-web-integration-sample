import { initMocks } from '../api/mocks/mockAdapter';
import serverConnection from '../api/rest/serverConnection';

export const mock = initMocks(serverConnection);

export const faceApiLink = '/api/v1/faces/123';
export const faceApiLinkError = `${faceApiLink}error`;
export const customerApiLink = '/api/v1/customers/123';
export const customerApiLinkError = `${customerApiLink}error`;
export const customerLinks = { links: { customer: customerApiLink } };
export const faceLinks = { links: { self: faceApiLink } };

export const createLinks = (selfPath: string) => {
  return { links: { customer: customerApiLink, self: `${customerApiLink}${selfPath}` } };
};
