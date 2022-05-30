import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import base64TestString from './data/base64TestString';
import imageBase64TestString from './data/imageBase64TestString';
import nestableOutputArray from './data/nestableOutputArray';
import nestedInputMap from './data/nestedInputMap';
import nestedOutputArray from './data/nestedOutputArray';
import objectInputMap from './data/objectInputMap';
import objectOutputArray from './data/objectOutputArray';
import { isStringUrl, createImage, mapToArray, isStoreEndpoint } from './index';

chai.use(chaiAsPromised).should();
describe('#Utils', () => {
  describe('createImage', () => {
    describe('should return object with data field filled for non-URL', () => {
      it('regular string', () => {
        const imageString = 'alphabet';

        createImage(imageString).should.have.property('data').that.equals(imageString);
      });

      it('base64 string', () => {
        const imageString = imageBase64TestString;

        createImage(imageString).should.have.property('data').that.equals(imageString);
      });
    });

    describe('should return object with url field filled for URLs', () => {
      it('regular url', () => {
        const urlString = 'https://dot-stg.innovatrics.com';

        createImage(urlString).should.have.property('url').that.equals(urlString);
      });

      it('url with query parameters', () => {
        const urlString = 'https://dot-stg.innovatrics.com/identity/customer?id=47';

        createImage(urlString).should.have.property('url').that.equals(urlString);
      });
    });
  });

  describe('isStringUrl', () => {
    describe('should return true for valid URLs', () => {
      it('IP address url', () => {
        const urlString = 'https://1.2.3.4';

        isStringUrl(urlString).should.be.equal(true);
      });

      it('localhost url', () => {
        const urlString = 'http://localhost';

        isStringUrl(urlString).should.be.equal(true);
      });

      it('ergular domain url', () => {
        const urlString = 'https://innovatrics.com';

        isStringUrl(urlString).should.be.equal(true);
      });

      it('url with subdomain', () => {
        const urlString = 'https://dot-stg.innovatrics.com';

        isStringUrl(urlString).should.be.equal(true);
      });

      it('url with path after domain', () => {
        const urlString = 'https://dot-stg.innovatrics.com/identity/customer';

        isStringUrl(urlString).should.be.equal(true);
      });

      it('url with query parameters', () => {
        const urlString = 'https://dot-stg.innovatrics.com/identity/customer?id=47';

        isStringUrl(urlString).should.be.equal(true);
      });
    });

    describe('should return false for non-URL strings', () => {
      it('url with a typo', () => {
        const notUrlString = 'https://1 2.3.4';

        isStringUrl(notUrlString).should.be.equal(false);
      });

      it('regular string', () => {
        const notUrlString = 'alphabet';

        isStringUrl(notUrlString).should.be.equal(false);
      });

      it('base64 string', () => {
        const notUrlString = base64TestString;

        isStringUrl(notUrlString).should.be.equal(false);
      });
    });
  });

  describe('mapToArray', () => {
    it('should handle empty input', () => {
      mapToArray().should.deep.equal([]);
    });

    it('should convert map of objects', () => {
      mapToArray(objectInputMap).should.deep.equal(objectOutputArray);
    });

    it('should convert nested map', () => {
      mapToArray(nestedInputMap).should.deep.equal(nestedOutputArray);
    });

    it('should be nestable itself', () => {
      const res = mapToArray(nestedInputMap).map((a) => {
        return {
          ...a,
          a: mapToArray(a.a),
        };
      });

      res.should.deep.equal(nestableOutputArray);
    });
  });

  describe('isStoreEndpoint', () => {
    const customerId = '604ae77d-d121-4f13-9c68-d507582c2843';

    it('should return true, when url ends with /store', () => {
      isStoreEndpoint(`/api/v1/customers/${customerId}/store`).should.be.equal(true);
    });

    it('should return true, when url is correct and /store is in path', () => {
      isStoreEndpoint(`/api/v1/customers/${customerId}/store/something`).should.be.equal(true);
    });

    it('should return false, when url is not in customer onboarding collection ', () => {
      isStoreEndpoint(`/something/${customerId}/store/something`).should.be.equal(false);
    });
  });
});
