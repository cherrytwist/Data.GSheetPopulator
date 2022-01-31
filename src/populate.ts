import { createLogger, createProfiler } from './utils/create-logger';
import { Populator } from './populators';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';
import { createDataAdapterUsingEnvVars } from './utils/create-data-adapter-using-envvars';

const main = async () => {
  dotenv.config();
  const allowHubCreation = process.env.ALLOW_HUB_CREATION === 'true';
  const logger = createLogger();
  const profiler = createProfiler();

  const alkemioClient = await createClientUsingEnvVars();
  logger.info(
    `Alkemio server: ${alkemioClient.config.apiEndpointPrivateGraphql}`
  );
  //await ctClient.validateConnection();

  const data = await createDataAdapterUsingEnvVars();
  logger.info(`Alkemio data template: ${data.filename}`);

  // Loading data from google sheets
  const populator = new Populator(
    alkemioClient,
    data,
    logger,
    profiler,
    allowHubCreation
  );
  const hubID = populator.getHubID();
  const exists = await alkemioClient.hubExists(hubID);
  if (!exists && !allowHubCreation) {
    logger.error(
      `Hub does not exist: '${hubID}', please ensure it is created.`
    );
    return;
  }

  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
