import { createLogger, createProfiler } from './utils/create-logger';
import { Populator } from './populators';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';

const main = async () => {
  dotenv.config();
  const logger = createLogger();
  const profiler = createProfiler();

  const ctClient = await createClientUsingEnvVars();
  logger.info(`Cherrytwist server: ${ctClient.config.graphqlEndpoint}`);
  await ctClient.validateConnection();

  const data = await createDataAdapterUsingEnvVars();
  logger.info(`Cherrytwist data template: ${data.filename}`);

  // Loading data from google sheets
  const populator = new Populator(ctClient, data, logger, profiler);
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
