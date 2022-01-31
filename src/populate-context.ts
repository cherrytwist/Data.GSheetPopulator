import { createLogger, createProfiler } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { ContextPopulator } from './populators/context-populator';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';

const main = async () => {
  dotenv.config();
  const logger = createLogger();
  const profiler = createProfiler();

  const alkemioClient = await createClientUsingEnvVars();
  logger.info(
    `Alkemio server: ${alkemioClient.config.apiEndpointPrivateGraphql}`
  );
  await alkemioClient.validateConnection();

  const data = await createDataAdapterUsingEnvVars();
  logger.info(`Alkemio data template: ${data.filename}`);

  const populator = new ContextPopulator(alkemioClient, data, logger, profiler);
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
