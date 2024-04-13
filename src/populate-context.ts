import { createLogger, createProfiler } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { SpacesPopulator } from './populators/spaces-populator';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';
import { createConfigUsingEnvVars } from './utils/create-config-using-envvars';
import { AlkemioPopulatorClient } from './client/AlkemioPopulatorClient';

const main = async () => {
  dotenv.config();
  const logger = createLogger();
  const profiler = createProfiler();

  const config = createConfigUsingEnvVars();
  const alkemioPopulatorClient = new AlkemioPopulatorClient(config, logger);
  await alkemioPopulatorClient.initialise();
  logger.info(
    `Alkemio server: ${alkemioPopulatorClient.config.apiEndpointPrivateGraphql}`
  );
  await alkemioPopulatorClient.validateConnection();

  const data = await createDataAdapterUsingEnvVars();
  logger.info(`Alkemio data template: ${data.filename}`);

  const populator = new SpacesPopulator(
    alkemioPopulatorClient,
    data,
    logger,
    profiler
  );
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
