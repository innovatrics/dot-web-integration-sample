import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({
  path: path.join(__dirname, '../../..', '.env'),
});

const envSchema = z.object({
  ALLOWED_ORIGINS: z
    .string()
    .transform((val) => {
      // Handle JSON-style input: '["a","b"]'
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // fall back to comma-separated string
      }

      // Handle comma-separated: "a,b,c"
      return val
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
    })
    .pipe(z.array(z.string()))
    .default([]),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_ENDPOINT_URL: z.url().optional(),
  AWS_REGION: z.string().nonempty('AWS_REGION must be set'),

  AWS_S3_BUCKET_NAME: z.string().nonempty('AWS_S3_BUCKET_NAME must be set'),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),

  DIS_AUDIENCE: z.string(),
  DIS_AUTH_TOKEN: z.string().optional(),
  DIS_CLIENT_ID: z.string(),
  DIS_CLIENT_SECRET: z.string(),
  DIS_TOKEN_URL: z.string(),
  DIS_URL: z.string(),

  MOCKS_ENABLED: z.coerce.boolean().default(false),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  SERVER_PORT: z.coerce.number().int().min(0).max(65535),

  FIREBASE_SERVICE_ACCOUNT_BASE64: z.string().describe('Base64-encoded Firebase service account JSON'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

export const ENV: Env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
