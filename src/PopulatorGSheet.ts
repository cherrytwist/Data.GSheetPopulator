import { CherrytwistClient } from "cherrytwist-lib";
import { GSheetsConnector } from "./gsheet/GSheetsConnector";
import { OrganisationsSheetPopulator } from "./gsheet/OrganisationsSheetPopulator";
import { ChallengesSheetPopulator } from "./gsheet/ChallengesSheetPopulator";
import { UsersSheetPopulator } from "./gsheet/UsersSheetPopulator";


export class GSheetParams {
  gsheetID = '';
  google_credentials_file = '';
  google_token_file = '';
}

export class PopulatorGSheet {

  // The ctClient to use to interact with the server
  ctClient: CherrytwistClient;

  logger;

  gsheetConnector: GSheetsConnector;

  usersSheetPopulator: UsersSheetPopulator;
  orgSheetPopulator: OrganisationsSheetPopulator;
  challengesSheetPopulator: ChallengesSheetPopulator;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(ctClient: CherrytwistClient, gsheetParams: GSheetParams) {
    this.ctClient = ctClient;
    this.logger = ctClient.logger;

    this.gsheetConnector = new GSheetsConnector(
      gsheetParams.google_credentials_file,
      gsheetParams.google_token_file,
      gsheetParams.gsheetID
    );

      

  // Get the actual sheet populator
  this.usersSheetPopulator = new UsersSheetPopulator(this.ctClient);
  this.orgSheetPopulator = new OrganisationsSheetPopulator(this.ctClient);
  this.challengesSheetPopulator = new ChallengesSheetPopulator(this.ctClient);
  }

  async loadChallenges(
    sheetName: string
  ) {
    return this.challengesSheetPopulator.loadChallengesFromSheet(sheetName, this.gsheetConnector);
  }

  async loadUsers(
    sheetName: string
  ) {
    return this.usersSheetPopulator.loadUsersFromSheet(sheetName, this.gsheetConnector);
  }

  async loadOrganisations(
    sheetName: string
  ) {
    return this.orgSheetPopulator.loadOrganisationsFromSheet(sheetName, this.gsheetConnector);
  }

  // Load users from a particular googlesheet
async loadTeams(
  sheetName: string
) {
  const sheetRange = `${sheetName}!A1:Z1200`;
  const teamsGSheet = await this.gsheetConnector.getObjectArray(sheetRange);
  this.logger.info(
    `===================================================================`
  );
  this.logger.info(
    `====== Obtained gsheet ${sheetRange}  with ${teamsGSheet.length} rows`
  );

  // Iterate over the rows
  for (let teamRow of teamsGSheet) {
    const teamName = teamRow["NAME"];
    if (!teamRow) {
      // End of valid teams
      break;
    }
    const challengeName = teamRow["CHALLENGE"];
    // todo: tag the team with the challenge name

    // start processing
    this.logger.info(`Processing team: ${teamName}....`);
    const teamProfileID = "===> teamCreation - FULL";

    try {
      const group = await this.ctClient.createEcoverseGroup(teamName);

      // Add the "Team" tag to the group
      await this.ctClient.addTagToTagset(
        group.createGroupOnEcoverse.profile.tagsets[0].id,
        "Team"
      );
    } catch (e) {
      throw e;
    }
  }
}
  
}


