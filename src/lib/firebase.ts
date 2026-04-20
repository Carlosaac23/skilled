import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDataConnect } from 'firebase/data-connect';

import { connectorConfig } from '@/dataconnect-generated';

const requiredEnvKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
];

for (const key of requiredEnvKeys) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required Firebase env var: ${key}`);
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const dataConnect = getDataConnect(firebaseApp, connectorConfig);
