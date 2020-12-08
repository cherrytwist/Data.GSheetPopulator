import dotenv from 'dotenv';

import environments from '../environments.json';
export interface EnvironmentConfig {
  name: string;
  server: string;
  file: string;
  admin_token: string;
}

export class EnvironmentFactory {
  constructor() {
    dotenv.config();
  }

  static getEnvironmentConfig(): EnvironmentConfig {
    const environmentVar = process.env.CT_ENVIRONMENT;
    if (!environmentVar)
      throw new Error('CT_ENVIRONMENT enironment variable not set');

    // get the server endpoint
    const environment = this.getEnvironment(environments, environmentVar);

    return environment;
  }

  static getEnvironment(environments: any, env: string): EnvironmentConfig {
    const targetEnv = environments[env];
    if (targetEnv) return targetEnv as EnvironmentConfig;

    throw new Error('Not supported environment encountered');
  }
}
