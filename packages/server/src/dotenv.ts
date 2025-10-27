import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({
  path: path.join(__dirname, '../../..', '.env'),
});

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  SERVER_PORT: z.coerce.number().int().min(0).max(65535),
  MOCKS_ENABLED: z.coerce.boolean().default(false),
  DOCUMENT_IDENTITY_SERVICE_URL: z.string(),
  DOCUMENT_IDENTITY_SERVICE_TOKEN_URL: z.string(),
  DOCUMENT_IDENTITY_SERVICE_CLIENT_ID: z.string(),
  DOCUMENT_IDENTITY_SERVICE_CLIENT_SECRET: z.string(),
  DOCUMENT_IDENTITY_SERVICE_AUDIENCE: z.string(),
  CONTACT_FORM_URL: z.string().optional(),
  GOOGLE_RECAPTCHA_SITE_VERIFY_URL: z.string().optional(),
  GOOGLE_RECAPTCHA_SECRET: z.string().optional(),
  AUTH_TOKEN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export default (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
