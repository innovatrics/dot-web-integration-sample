import resolvers from '.';
import getCustomerResponse from '../../api/mocks/data/getCustomerResponse.json';
import { customerApiLink, customerLinks, customerApiLinkError } from '../../test';
import { Customer, TravelDocumentType } from '../../types/graphqlTypes';

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

    return result.should.eventually.be.deep.equal(expectedResult);
  });

  it('should throw error when customerApiLink is invalid', async () => {
    const result = resolvers.Query.customer(null, { customerApiLink: customerApiLinkError });

    return result.should.eventually.be.rejectedWith('Some error.');
  });
});
