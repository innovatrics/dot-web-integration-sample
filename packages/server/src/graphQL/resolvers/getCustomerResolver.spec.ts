import type { Customer } from '../../types/graphqlTypes';

import getCustomerResponse from '../../api/mocks/data/getCustomerResponse.json';
import { customerApiLink, customerApiLinkError, customerLinks } from '../../test';
import { TravelDocumentType } from '../../types/graphqlTypes';

import resolvers from '.';

describe('#customer', () => {
  it('should get correct response when customerApiLink is present', async () => {
    const result = resolvers.Query.customer(null, { customerApiLink });
    const expectedResult: { customer: Customer } = {
      customer: {
        ...getCustomerResponse.customer,
        document: {
          ...getCustomerResponse.customer.document,
          parsedType: {
            country: 'Innovatrics',
            edition: '2020',
            machineReadableTravelDocument: TravelDocumentType.TD1,
            type: 'National ID',
            isDocumentSupported: true,
          },
        },
      },
      ...customerLinks,
    };

    await expect(result).resolves.toEqual(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.customer(null, { customerApiLink: customerApiLinkError });

    await expect(result).rejects.toThrow();
  });
});
