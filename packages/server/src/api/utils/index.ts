import type { Image } from '../../types/restRequestTypes';

export const isStringUrl = (string: string): boolean => {
  try {
    return Boolean(new URL(string));
  } catch (e) {
    return false;
  }
};

export const createImage = (imageSource: string): Image => {
  const image: Image = {};

  if (isStringUrl(imageSource)) {
    image.url = imageSource;
  } else {
    image.data = imageSource;
  }

  return image;
};

export const mapToArray = <T>(inputMap: { [key: string]: T } = {}): Array<T & { name: string }> => {
  // value: [0:string, 1:T]
  return Object.entries(inputMap).map((value) => {
    return {
      name: value[0], // key: string
      ...value[1], // value: T
    };
  });
};

export const isStoreEndpoint = (url: string) => {
  return /.*\/customers\/[a-zA-Z0-9-]*\/store/.test(url);
};

/**
 * Check if code is being run with test
 */
export const isTestRunning = () => {
  return process.env.npm_lifecycle_event === 'test';
};

/**
 * It takes an object and returns a string that is the object's key-value pairs in URL-encoded format
 * @param obj - The object to be converted to a URL-encoded string.
 * @returns A string
 */
export const convertJsonToUrlencoded = (obj: Record<string, string | undefined>) => {
  const str: string[] = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return str.join('&');
};

export const convertBase64ToByteArray = (base64String: string) => {
  const buffer = Buffer.from(base64String, 'base64');
  const byteArray = new Uint8Array(buffer);

  return byteArray;
};
