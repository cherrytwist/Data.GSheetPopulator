import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from './adapters/adapter';
import { ChallengePopulator } from './populators/challenge-populator';
import { EcoversePopulator } from './populators/ecoverse-populator';
import { GroupPopulator } from './populators/group-populator';
import { OpportunityPopulator } from './populators/opportunity-populator';
import { OrganisationPopulator } from './populators/organisation-populator';
import { UserPopulator } from './populators/user-populator';

export class GSheetParams {
  gsheetID = '';
  google_credentials_file = '';
  google_token_file = '';
}

export class Populator {
  // The ctClient to use to interact with the server
  client: CherrytwistClient;
  data: DataAdapter;
  logger: Logger;
  profiler: Logger;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: DataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    this.client = client;
    this.data = data;
    this.logger = logger;
    this.profiler = profiler;
  }

  async populate() {
    if (!this.data) throw new Error('No data to populate');
    const groupPopulator = new GroupPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const userPopulator = new UserPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const challengePopulator = new ChallengePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const organisationPopulator = new OrganisationPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const opportunityPopulator = new OpportunityPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const ecoversePopulator = new EcoversePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    await ecoversePopulator.populate();
    await groupPopulator.populate();
    await userPopulator.populate();
    await organisationPopulator.populate();
    await challengePopulator.populate();
    await challengePopulator.populate();
    await opportunityPopulator.populate();
  }

  // async loadChallenges(sheetName: string) {
  //   return this.challengesSheetPopulator.loadChallengesFromSheet(
  //     sheetName,
  //     this.gsheetConnector
  //   );
  // }

  // async loadUsers(sheetName: string) {
  //   return this.usersSheetPopulator.loadUsersFromSheet(
  //     sheetName,
  //     this.gsheetConnector
  //   );
  // }

  // async loadOrganisations(sheetName: string) {
  //   return this.orgSheetPopulator.loadOrganisationsFromSheet(
  //     sheetName,
  //     this.gsheetConnector
  //   );
  // }

  // Load users from a particular googlesheet
  // async loadTeams(sheetName: string) {
  //   const sheetRange = `${sheetName}!A1:Z1200`;
  //   const teamsGSheet = await this.gsheetConnector.getObjectArray(sheetRange);
  //   this.logger.info(
  //     '==================================================================='
  //   );
  //   this.logger.info(
  //     `====== Obtained gsheet ${sheetRange}  with ${teamsGSheet.length} rows`
  //   );

  //   // Iterate over the rows
  //   for (const teamRow of teamsGSheet) {
  //     const teamName = teamRow['NAME'];
  //     if (!teamRow) {
  //       // End of valid teams
  //       break;
  //     }
  //     // const challengeName = teamRow['CHALLENGE'];
  //     // todo: tag the team with the challenge name

  //     // start processing
  //     this.logger.info(`Processing team: ${teamName}....`);
  //     // const teamProfileID = '===> teamCreation - FULL';

  //     try {
  //       const group = await this.client.createEcoverseGroup(teamName);
  //       const tagsetId =
  //         group?.profile?.tagsets && group?.profile?.tagsets[0].id;
  //       if (tagsetId) {
  //         await this.client.addTagToTagset(tagsetId, 'Team');
  //       }
  //       // Add the "Team" tag to the group
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  // }
}
