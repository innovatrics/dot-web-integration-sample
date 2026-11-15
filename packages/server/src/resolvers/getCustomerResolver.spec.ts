import getCustomerResponse from '../api/mocks/data/getCustomerResponse.json';
import { customerApiLinkError, customerId } from '../test/index.ts';

import { getCustomerResolver } from './getCustomerResolver.ts';

describe('#customer', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = getCustomerResolver(customerId);
    const expectedResult = {
      customer: {
        ...getCustomerResponse.customer,
        document: {
          ...getCustomerResponse.customer.document,
          additionalTexts: [],
          type: {
            country: 'ino',
            edition: '2020',
            machineReadableTravelDocument: 'td1',
            type: 'identity-card',
          },
        },
      },
    };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = getCustomerResolver(customerApiLinkError);

    await expect(result).rejects.toThrow();
  });
});
