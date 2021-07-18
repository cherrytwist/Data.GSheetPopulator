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
  logger.info(`Alkemio server: ${ctClient.config.graphqlEndpoint}`);
  await ctClient.validateConnection();

  const data = await createDataAdapterUsingEnvVars();
  logger.info(`Alkemio data template: ${data.filename}`);

  // Loading data from google sheets
  const populator = new Populator(ctClient, data, logger, profiler);
  const ecoverseID = populator.getEcoverseID();
  const exists = await ctClient.ecoverseExists(ecoverseID);
  if (!exists) {
    logger.error(
      `Ecoverse does not exist: '${ecoverseID}', please ensure it is created.`
    );
    return;
  }

  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
