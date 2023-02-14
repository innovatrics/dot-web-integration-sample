import base64TestString from './data/base64TestString';
import imageBase64TestString from './data/imageBase64TestString';
import nestableOutputArray from './data/nestableOutputArray';
import nestedInputMap from './data/nestedInputMap';
import nestedOutputArray from './data/nestedOutputArray';
import objectInputMap from './data/objectInputMap';
import objectOutputArray from './data/objectOutputArray';
import { convertJsonToUrlencoded, createImage, isStoreEndpoint, isStringUrl, mapToArray } from './index';

describe('#Utils', () => {
  describe('createImage', () => {
    describe('should return object with data field filled for non-URL', () => {
      it('regular string', () => {
        const imageString = 'alphabet';

        expect(createImage(imageString)).toHaveProperty('data', imageString);
      });

      it('base64 string', () => {
        const imageString = imageBase64TestString;

        expect(createImage(imageString)).toHaveProperty('data', imageString);
      });
    });

    describe('should return object with url field filled for URLs', () => {
      it('regular url', () => {
        const urlString = 'https://dot-stg.innovatrics.com';

        expect(createImage(urlString)).toHaveProperty('url', urlString);
      });

      it('url with query parameters', () => {
        const urlString = 'https://dot-stg.innovatrics.com/identity/customer?id=47';

        expect(createImage(urlString)).toHaveProperty('url', urlString);
      });
    });
  });

  describe('isStringUrl', () => {
    describe('should return true for valid URLs', () => {
      it('IP address url', () => {
        const urlString = 'https://1.2.3.4';

        expect(isStringUrl(urlString)).toBe(true);
      });

      it('localhost url', () => {
        const urlString = 'http://localhost';

        expect(isStringUrl(urlString)).toBe(true);
      });

      it('regular domain url', () => {
        const urlString = 'https://innovatrics.com';

        expect(isStringUrl(urlString)).toBe(true);
      });

      it('url with subdomain', () => {
        const urlString = 'https://dot-stg.innovatrics.com';

        expect(isStringUrl(urlString)).toBe(true);
      });

      it('url with path after domain', () => {
        const urlString = 'https://dot-stg.innovatrics.com/identity/customer';

        expect(isStringUrl(urlString)).toBe(true);
      });

      it('url with query parameters', () => {
        const urlString = 'https://dot-stg.innovatrics.com/identity/customer?id=47';

        expect(isStringUrl(urlString)).toBe(true);
      });
    });

    describe('should return false for non-URL strings', () => {
      it('url with a typo', () => {
        const notUrlString = 'https://1 2.3.4';

        expect(isStringUrl(notUrlString)).toBe(false);
      });

      it('regular string', () => {
        const notUrlString = 'alphabet';

        expect(isStringUrl(notUrlString)).toBe(false);
      });

      it('base64 string', () => {
        const notUrlString = base64TestString;

        expect(isStringUrl(notUrlString)).toBe(false);
      });
    });
  });

  describe('mapToArray', () => {
    it('should handle empty input', () => {
      expect(mapToArray()).toEqual([]);
    });

    it('should convert map of objects', () => {
      expect(mapToArray(objectInputMap)).toEqual(objectOutputArray);
    });

    it('should convert nested map', () => {
      expect(mapToArray(nestedInputMap)).toEqual(nestedOutputArray);
    });

    it('should be nestable itself', () => {
      const res = mapToArray(nestedInputMap).map((a) => {
        return {
          ...a,
          a: mapToArray(a.a),
        };
      });

      expect(res).toEqual(nestableOutputArray);
    });
  });

  describe('isStoreEndpoint', () => {
    const customerId = '604ae77d-d121-4f13-9c68-d507582c2843';

    it('should return true, when url ends with /store', () => {
      expect(isStoreEndpoint(`/api/v1/customers/${customerId}/store`)).toBe(true);
    });

    it('should return true, when url is correct and /store is in path', () => {
      expect(isStoreEndpoint(`/api/v1/customers/${customerId}/store/something`)).toBe(true);
    });

    it('should return false, when url is not in customer onboarding collection ', () => {
      expect(isStoreEndpoint(`/something/${customerId}/store/something`)).toBe(false);
    });
  });

  describe('convertJsonToUrlencoded', () => {
    const values = {
      'contact-form-name': 'Tester',
      'contact-form-company': 'Innovatrics',
      'contact-form-mail': 'tester@innovatrics.com',
      'contact-form-text': 'One handy unit test',
      'acceptance-472': '1',
      'contact-form-lead-source-detail': 'DOT OCR demo',
      'contact-form-products': 'DOT',
    };

    it('should return valid encoded string when valid object is provided', () => {
      const validResult =
        'contact-form-name=Tester&contact-form-company=Innovatrics&contact-form-mail=tester%40innovatrics.com&contact-form-text=One%20handy%20unit%20test&acceptance-472=1&contact-form-lead-source-detail=DOT%20OCR%20demo&contact-form-products=DOT';

      expect(convertJsonToUrlencoded(values)).toEqual(validResult);
    });
  });
});
