import { createLogger, createProfiler } from './utils/create-logger';
import { Populator } from './populators';
import { XLSXAdapter } from './adapters/xlsx';
import path from 'path';
import * as dotenv from 'dotenv';
import { CherrytwistClient } from '@cherrytwist/client-lib';
import { ContextPopulator } from './populators/context-populator';

const main = async () => {
  dotenv.config();
  const logger = createLogger();
  const profiler = createProfiler();

  const server = process.env.CT_SERVER || 'http://localhost:4000/graphql';
  const dataTemplate =
    process.env.CT_DATA_TEMPLATE || 'cherrytwist-data-template.ods';
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: server,
  });

  logger.info(`Cherrytwist server: ${server}`);
  logger.info(`Cherrytwist data template: ${dataTemplate}`);

  await ctClient.validateConnection();

  const data = new XLSXAdapter(path.join(__dirname, '..', dataTemplate));
  // Loading data from google sheets
  const populator = new ContextPopulator(ctClient, data, logger, profiler);
  await populator.populate();
};

main().catch(error => {
  console.error(error);
});
