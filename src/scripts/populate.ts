import { CherrytwistClient } from 'cherrytwist-lib';
import { PopulatorGSheet, GSheetParams } from '../PopulatorGSheet';
import environment from '../environments.json';
import winston from 'winston';

const main = async () => {
  const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  );
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({ level: 'info', format: logFormat }),
      new winston.transports.File({
        filename: 'population-info.log',
        level: 'warn',
      }),
      new winston.transports.File({
        filename: 'population-warnings.log',
        level: 'warn',
      }),
    ],
  });

  const profiler = winston.createLogger({
    transports: [
      new winston.transports.Console({ level: 'info', format: logFormat }),
      new winston.transports.File({
        filename: 'profile-info.log',
        level: 'silly',
      }),
    ],
  });

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
  const gsheetPopulator = new PopulatorGSheet(ctClient, params, logger, profiler);

  ////////// Now connect to google  /////////////////////////
    const sheetsObj = await gsheetPopulator.gsheetConnector.getSheetsObj();
  if (sheetsObj) {
    logger.info(`[GSheet] Authentication succussful...`);
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
