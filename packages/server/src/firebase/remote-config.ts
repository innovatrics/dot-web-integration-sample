import type { TrustFactorEvaluationDefinitionDTO } from '@innovatrics/dis-client-sdk';
import { getRemoteConfig } from 'firebase-admin/remote-config';
import { appLogger } from '../logger.ts';
import { getFirebaseApp } from './app.ts';
import defaultConfig from './default-config.json' with { type: 'json' };

type TfConfig = {
  [key: string]: {
    defaultValue: {
      value: unknown;
    };
  };
};

type TrustFactorDefinitions = Record<string, Array<TrustFactorEvaluationDefinitionDTO>>;

export async function getClientRemoteConfig() {
  const app = getFirebaseApp();

  try {
    const rc = getRemoteConfig(app);
    const template = await rc.getTemplate();
    return template.parameters;
  } catch (error) {
    appLogger.warn('Error getting remote config template:', error as Record<string, unknown>);
    return null;
  }
}

export async function getTrustFactorDefinitions<K extends readonly string[]>(keys: K): Promise<TrustFactorDefinitions> {
  const config = (await getClientRemoteConfig()) ?? defaultConfig;

  const trustFactorDefinitions = keys.reduce<TrustFactorDefinitions>((acc, key) => {
    if (!(key in config)) {
      appLogger.error(`Trust factor definition key ${key} not found in remote config or default config`);
      throw new Error(`Invalid definition: ${key}`);
    }

    const value = (config[key as keyof typeof config] as TfConfig[typeof key]).defaultValue.value;

    acc[key as K[number]] = typeof value === 'string' ? JSON.parse(value) : value;
    return acc;
  }, {} as TrustFactorDefinitions);

  return trustFactorDefinitions;
}
