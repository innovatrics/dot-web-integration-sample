import { disClient } from '../api/connection/serverConnection.ts';
import { initServerMocks } from '../api/mocks/serverMockAdapter.ts';

export const serverConnectionMock = initServerMocks(disClient.instance);

export const customerId = '123';
export const faceApiLink = `/api/v1/faces/${customerId}`;
export const faceApiLinkError = `${faceApiLink}error`;
export const customerApiLink = `/api/v1/customers/${customerId}`;
export const customerApiLinkError = `${customerApiLink}error`;
export const customerLinks = { links: { customer: customerId } };
export const faceLinks = { links: { self: faceApiLink } };

export const createLinks = (selfPath: string) => {
  return { links: { customer: customerApiLink, self: `${customerApiLink}${selfPath}` } };
};
