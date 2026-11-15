import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ThirdPartySource } from '../../../errors/index.ts';
import { appLogger } from '../../../logger.ts';
import { isTestRunning } from '../../utils/index.ts';
import { onRejected } from './common.ts';

/**
 * Truncates base64 strings, large arrays, and binary data for logging purposes
 */
export function sanitizeForLogging(data: unknown, maxLength = 100): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle Buffer or Uint8Array directly
  if (Buffer.isBuffer(data) || data instanceof Uint8Array) {
    return `[Binary data: ${data.length} bytes]`;
  }

  if (typeof data === 'string') {
    // Check if it's a base64 string (data URI or raw base64)
    if (data.startsWith('data:') || /^[A-Za-z0-9+/=]{100,}$/.test(data)) {
      return `[BASE64 ${data.length} chars]`;
    }
    if (data.length > maxLength) {
      return `${data.substring(0, maxLength)}... [${data.length} chars total]`;
    }
    return data;
  }

  if (Array.isArray(data)) {
    if (data.length > 100) {
      return `[Array with ${data.length} items]`;
    }
    return data.map((item) => sanitizeForLogging(item, maxLength));
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data as Record<string, unknown>);

    // Detect objects that look like binary data (many numeric keys with numeric values)
    // This handles serialized Buffer/Uint8Array like {"0": 255, "1": 128, ...}
    if (keys.length > 100) {
      const isLikelyBinaryData = keys.slice(0, 10).every((key) => /^\d+$/.test(key));
      if (isLikelyBinaryData) {
        return `[Binary-like object: ${keys.length} entries]`;
      }
      return `[Large object: ${keys.length} keys]`;
    }

    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      // Skip sensitive fields
      if (['authorization', 'password', 'secret', 'token'].includes(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeForLogging(value, maxLength);
      }
    }
    return sanitized;
  }

  return data;
}

/**
 * Logs outgoing request details in debug mode
 */
export const onRequestFulfilled =
  (source: ThirdPartySource) =>
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (!isTestRunning()) {
      appLogger.debug(`[${source}] Request: ${config.method?.toUpperCase()} ${config.url}`, {
        source,
        method: config.method?.toUpperCase(),
        url: config.url,
        payload: config.data,
      });
    }

    return config;
  };

/**
 * Handles errors from DIS API calls
 * @param error - AxiosError<{ errorMessage?: string; errorCode?: string }>
 */
export const onDisConnectionRejected = (error: AxiosError<{ errorCode?: string; errorMessage?: string }>) => {
  onRejected(error, 'DIS');
};

/**
 * Logs response details in debug mode and returns the response
 */
export const onResponseFulfilled =
  (source: ThirdPartySource) =>
  (response: AxiosResponse): AxiosResponse => {
    if (!isTestRunning()) {
      const { config, status, data } = response;

      appLogger.debug(`[${source}] Response: ${config.method?.toUpperCase()} ${config.url} -> ${status}`, {
        source,
        method: config.method?.toUpperCase(),
        url: config.url,
        status,
        data,
      });
    }

    return response;
  };
