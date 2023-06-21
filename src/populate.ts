import { createLogger, createProfiler } from './utils/create-logger';
import { Populator } from './populators';
import * as dotenv from 'dotenv';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';
import { AlkemioPopulatorClient } from './client/AlkemioPopulatorClient';
import { createConfigUsingEnvVars } from './utils/create-config-using-envvars';

const main = async () => {
  dotenv.config();
  const allowSpaceCreation = process.env.ALLOW_HUB_CREATION === 'true';
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

  // Loading data from google sheets
  const populator = new Populator(
    alkemioPopulatorClient,
    data,
    logger,
    profiler,
    allowSpaceCreation
  );
  const spaceID = populator.getSpaceID();
  const exists = await alkemioPopulatorClient.alkemioLibClient.spaceExists(
    spaceID
  );
  if (!exists && !allowSpaceCreation) {
    logger.error(
      `Space does not exist: '${spaceID}', please ensure it is created.`
    );
    return;
  }

  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
