import { CherrytwistClient } from 'cherrytwist-lib';
import { EnvironmentFactory } from 'src/utils/EnvironmentFactory';
import { createLogger } from '../utils/create-logger';

const main = async () => {
  const logger = createLogger();
  const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: config.server,
  });

  logger.info(`Cherrytwist server: ${config}`);

  await ctClient.testConnection();
};

main().catch(error => console.error(error));
