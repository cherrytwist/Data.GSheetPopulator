import { CherrytwistClient } from 'cherrytwist-lib';
import { createLogger, createProfiler } from './utils/create-logger';
import environment from './environments.json';
import { Populator } from './populators';
import { XLSXAdapter } from './adapters/xlsx';
import path from 'path';

const main = async () => {
  const logger = createLogger();
  const profiler = createProfiler();

  const config = environment['local'];
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: config.server,
  });

  logger.info(`Cherrytwist server: ${config}`);

  const data = new XLSXAdapter(path.join(__dirname, '..', 'cherrytwist-data-template.ods'));
  // Loading data from google sheets
  const populator = new Populator(ctClient, data, logger, profiler);
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
