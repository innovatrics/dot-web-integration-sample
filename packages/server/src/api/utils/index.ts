import type { Image } from '../../types/index.ts';
import RequiredError from '../error/RequiredError.ts';

export const getLastURLSegment = (link: string): string => {
  const id = link.split('/').pop();

  if (!id) {
    throw new Error('Missing id');
  }

  return id;
};

export const isStringUrl = (string: string): boolean => {
  try {
    return Boolean(new URL(string));
  } catch (_) {
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

export const normalizeStringInput = (value: unknown): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return typeof value === 'string' ? value : undefined;
};

export const ensureString = (value: unknown, field: string): string => {
  const normalized = normalizeStringInput(value);

  if (!normalized) {
    throw new RequiredError(field, `${field} is required`);
  }

  return normalized;
};

export const ensureQueryParamsId = (params: Record<string, unknown>, prefix?: string): string => {
  const { id } = params;

  if (!id) {
    throw new RequiredError('ID', `${prefix}Id is required`);
  }

  return id as string;
};
