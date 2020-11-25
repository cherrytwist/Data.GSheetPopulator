import { CherrytwistClient, EnvironmentFactory } from "cherrytwist-lib";
import { PopulatorGSheet, GSheetParams } from "../PopulatorGSheet";

const main = async () => {
  const config = EnvironmentFactory.getEnvironmentConfig();
  const ctClient = new CherrytwistClient(config);
  ctClient.logger.info(`Cherrytwist server: ${config}`);

  // Setup for authenitcating to the CT server
  ctClient.loadAdminToken();

  const params = new GSheetParams();
  params.google_credentials_file = config.google_credentials;
  params.google_token_file = config.google_token;
  params.gsheetID = config.gsheet;

  // Loading data from google sheets
  const gsheetPopulator = new PopulatorGSheet(ctClient, params);

  ////////// Now connect to google  /////////////////////////
  const sheetsObj = await gsheetPopulator.gsheetConnector.getSheetsObj();
  if (sheetsObj) {
    ctClient.logger.info(`[GSheet] Authentication succussful...`);
  }

  await gsheetPopulator.loadChallenges("Challenges");
  await gsheetPopulator.loadTeams("Teams");

  // Obtain the identifiers for the groups + challenges as needed for users + orgs
  await ctClient.ecoverseInfo.initialise(ctClient);
  await gsheetPopulator.loadOrganisations("Organisations");
  await gsheetPopulator.loadUsers("Users");
};

try {
  main();
} catch (error) {
  console.error(error);
}
