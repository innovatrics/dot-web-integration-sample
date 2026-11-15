import { type App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { ENV } from '../dotenv.ts';

const FIREBASE_APP_NAME = 'innovatrics-dot';

export function getFirebaseApp(name = FIREBASE_APP_NAME): App {
  if (getApps().length) {
    return getApp(name);
  }

  const json = JSON.parse(Buffer.from(ENV.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8'));

  return initializeApp(
    {
      credential: cert(json),
      projectId: json.project_id,
    },
    name,
  );
}
