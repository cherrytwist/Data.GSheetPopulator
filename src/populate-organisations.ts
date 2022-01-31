import { createLogger, createProfiler } from './utils/create-logger';
import { OrganizationPopulator } from './populators';
import * as dotenv from 'dotenv';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';

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

  // Loading data from google sheets
  const populator = new OrganizationPopulator(
    alkemioClient,
    data,
    logger,
    profiler
  );
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
