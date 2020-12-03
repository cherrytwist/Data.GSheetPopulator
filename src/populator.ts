import { CherrytwistClient } from 'cherrytwist-lib';
import { GSheetsConnector } from './gsheet/GSheetsConnector';
import { OrganisationsSheetPopulator } from './gsheet/OrganisationsSheetPopulator';
import { ChallengesSheetPopulator } from './gsheet/ChallengesSheetPopulator';
import { UsersSheetPopulator } from './gsheet/UsersSheetPopulator';
import { Logger } from 'winston';

export class GSheetParams {
  gsheetID = '';
  google_credentials_file = '';
  google_token_file = '';
}

export class PopulatorGSheet {
  // The ctClient to use to interact with the server
  ctClient: CherrytwistClient;

  logger: Logger;
  profiler: Logger;

  gsheetConnector: GSheetsConnector;

  usersSheetPopulator: UsersSheetPopulator;
  orgSheetPopulator: OrganisationsSheetPopulator;
  challengesSheetPopulator: ChallengesSheetPopulator;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    ctClient: CherrytwistClient,
    gsheetParams: GSheetParams,
    logger: Logger,
    profiler: Logger
  ) {
    this.ctClient = ctClient;
    this.logger = logger;
    this.profiler = profiler;

    this.gsheetConnector = new GSheetsConnector(
      gsheetParams.google_credentials_file,
      gsheetParams.google_token_file,
      gsheetParams.gsheetID
    );

    // Get the actual sheet populator
    this.usersSheetPopulator = new UsersSheetPopulator(
      this.ctClient,
      logger,
      profiler
    );
    this.orgSheetPopulator = new OrganisationsSheetPopulator(
      this.ctClient,
      logger,
      profiler
    );
    this.challengesSheetPopulator = new ChallengesSheetPopulator(
      this.ctClient,
      logger,
      profiler
    );
  }

  async loadChallenges(sheetName: string) {
    return this.challengesSheetPopulator.loadChallengesFromSheet(
      sheetName,
      this.gsheetConnector
    );
  }

  async loadUsers(sheetName: string) {
    return this.usersSheetPopulator.loadUsersFromSheet(
      sheetName,
      this.gsheetConnector
    );
  }

  async loadOrganisations(sheetName: string) {
    return this.orgSheetPopulator.loadOrganisationsFromSheet(
      sheetName,
      this.gsheetConnector
    );
  }

  // Load users from a particular googlesheet
  async loadTeams(sheetName: string) {
    const sheetRange = `${sheetName}!A1:Z1200`;
    const teamsGSheet = await this.gsheetConnector.getObjectArray(sheetRange);
    this.logger.info(
      '==================================================================='
    );
    this.logger.info(
      `====== Obtained gsheet ${sheetRange}  with ${teamsGSheet.length} rows`
    );

    // Iterate over the rows
    for (const teamRow of teamsGSheet) {
      const teamName = teamRow['NAME'];
      if (!teamRow) {
        // End of valid teams
        break;
      }
      // const challengeName = teamRow['CHALLENGE'];
      // todo: tag the team with the challenge name

      // start processing
      this.logger.info(`Processing team: ${teamName}....`);
      // const teamProfileID = '===> teamCreation - FULL';

      try {
        const group = await this.ctClient.createEcoverseGroup(teamName);
        const tagsetId =
          group?.profile?.tagsets && group?.profile?.tagsets[0].id;
        if (tagsetId) {
          await this.ctClient.addTagToTagset(tagsetId, 'Team');
        }
        // Add the "Team" tag to the group
      } catch (e) {
        throw e;
      }
    }
  }
}
