import { createLogger, createProfiler } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { ContextPopulator } from './populators/context-populator';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';

const main = async () => {
  dotenv.config();
  const logger = createLogger();
  const profiler = createProfiler();

  const ctClient = await createClientUsingEnvVars();
  logger.info(`Alkemio server: ${ctClient.config.graphqlEndpoint}`);
  await ctClient.validateConnection();

  const data = await createDataAdapterUsingEnvVars();
  logger.info(`Alkemio data template: ${data.filename}`);

  const populator = new ContextPopulator(ctClient, data, logger, profiler);
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
