import { CherrytwistClient } from 'cherrytwist-lib';
import { createLogger } from 'src/utils/create-logger';
import { EnvironmentFactory } from 'src/utils/EnvironmentFactory';

const main = async () => {
  const logger = createLogger();
  const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: config.server,
  });

  logger.info(`Cherrytwist server: ${config}`);

  await ctClient.testConnection();
};

try {
  main();
} catch (error) {
  console.error(error);
}
