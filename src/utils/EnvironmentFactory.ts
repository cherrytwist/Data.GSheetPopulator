import { readFileSync } from 'fs';
import dotenv from 'dotenv';

export interface EnvironmentConfig {
  name: string;
  server: string;
  gsheet: string;
  users_sheet: string;
  admin_token: string;
  populate_structure: boolean;
  google_credentials: string;
  google_token: string;
}

export class EnvironmentFactory {
  constructor() {
    dotenv.config();
  }

  static getEnvironmentConfig(): EnvironmentConfig {
    const environmentsFile = process.env.CT_ENVIRONMENT_DEFINITIONS;
    if (!environmentsFile)
      throw new Error('CT_ENVIRONMENT_DEFINTIONS enironment variable not set');

    const environmentVar = process.env.CT_ENVIRONMENT;
    if (!environmentVar)
      throw new Error('CT_ENVIRONMENT enironment variable not set');

    // get the server endpoint
    const environmentsStr = readFileSync(environmentsFile).toString();
    const environmentsJson = JSON.parse(environmentsStr);
    const environment = this.getEnvironment(environmentsJson, environmentVar);

    return environment;
  }

  static getEnvironment(environments: any, env: string): EnvironmentConfig {
    const targetEnv = environments[env];
    if (targetEnv) return targetEnv as EnvironmentConfig;

    throw new Error('Not supported environment encountered');
  }
}
