import { CherrytwistClient } from 'cherrytwist-lib';
import { createLogger, createProfiler } from '../utils/create-logger';
import environment from '../environments.json';
import { GSheetParams, PopulatorGSheet } from '../PopulatorGSheet';

const main = async () => {
  const logger = createLogger();
  const profiler = createProfiler();

  const config = environment['local'];
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: config.server,
  });

  logger.info(`Cherrytwist server: ${config}`);

  const params = new GSheetParams();
  params.google_credentials_file = config.google_credentials;
  params.google_token_file = config.google_token;
  params.gsheetID = config.gsheet;

  // Loading data from google sheets
  const gsheetPopulator = new PopulatorGSheet(
    ctClient,
    params,
    logger,
    profiler
  );

  ////////// Now connect to google  /////////////////////////
  const sheetsObj = await gsheetPopulator.gsheetConnector.getSheetsObj();
  if (sheetsObj) {
    logger.info('[GSheet] Authentication succussful...');
  }

  await gsheetPopulator.loadChallenges('Challenges');
  await gsheetPopulator.loadTeams('Teams');

  // Obtain the identifiers for the groups + challenges as needed for users + orgs
  await gsheetPopulator.loadOrganisations('Organisations');
  await gsheetPopulator.loadUsers('Users');
};

try {
  main();
} catch (error) {
  console.error(error);
}
