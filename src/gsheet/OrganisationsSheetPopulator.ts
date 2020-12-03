import { GSheetsConnector } from './GSheetsConnector';
import { CherrytwistClient, Organisation } from 'cherrytwist-lib';
import { Logger } from 'winston';

enum Columns {
  NAME = 'NAME',
  TEXT_ID = 'TEXT_ID',
  LOGO = 'LOGO',
  LEADING = 'LEADING',
  DESCRIPTION = 'DESCRIPTION',
  KEYWORDS = 'KEYWORDS',
}

// enum Tagsets {
//   KEYWORDS = 'Keywords',
// }

export class OrganisationsSheetPopulator {
  // The populator to use to interact with the server
  ctClient: CherrytwistClient;

  logger;
  profiler;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(ctClient: CherrytwistClient, logger: Logger, profiler: Logger) {
    this.ctClient = ctClient;
    this.logger = logger;
    this.profiler = profiler;
  }

  // Load users from a particular googlesheet
  async loadOrganisationsFromSheet(
    sheetName: string,
    sheetsConnector: GSheetsConnector
  ) {
    const sheetRange = `${sheetName}!A1:Z1200`;
    const organisationsGSheet = await sheetsConnector.getObjectArray(
      sheetRange
    );
    this.logger.info(
      '==================================================================='
    );
    this.logger.info(
      `====== Obtained gsheet ${sheetRange}  with ${organisationsGSheet.length} rows`
    );

    // Iterate over the rows
    for (const organisationRow of organisationsGSheet) {
      const organisationName = organisationRow['NAME'];
      if (!organisationName) {
        // End of valid organisations
        break;
      }

      // start processing
      this.logger.info(`Processing organisation: ${organisationName}....`);
      const organisationProfileID = '===> organisationCreation - FULL';
      this.profiler.profile(organisationProfileID);

      try {
        const organisation = await this.ctClient.createOrganisation(
          organisationName
        );

        const profileID = organisation?.profile.id;

        if (profileID) {
          await this.ctClient.createTagset(
            profileID,
            'Keywords',
            organisationRow[Columns.KEYWORDS]
          );
          await this.ctClient.updateProfile(
            profileID,
            organisationRow[Columns.DESCRIPTION],
            organisationRow[Columns.LOGO]
          );
        }
        const organisationID = organisation?.id;

        if (organisationID) {
          const challengesStr = organisationRow[Columns.LEADING];
          if (challengesStr) {
            const challengesArr = challengesStr.split(',');
            for (let i = 0; i < challengesArr.length; i++) {
              const challengeName = challengesArr[i].trim();
              await this.ctClient.addChallengeLead(
                challengeName,
                organisationID
              );
              this.logger.verbose(
                `Added organisation as lead to challenge: ${challengesArr[0]}`
              );
            }
          }
        }
      } catch (e) {
        this.logger.error(
          `Unable to create organisation (${organisationName}): ${e.message}`
        );
      }
    }
  }

  // Load users from a particular googlesheet
  async updateOrganisationsFromSheet(
    sheetName: string,
    sheetsConnector: GSheetsConnector
  ) {
    const sheetRange = `${sheetName}!A1:Z1200`;
    const organisationsGSheet = await sheetsConnector.getObjectArray(
      sheetRange
    );
    this.logger.info(
      '==================================================================='
    );
    this.logger.info(
      `====== Obtained gsheet ${sheetRange}  with ${organisationsGSheet.length} rows`
    );

    // First get all the organisations
    let organisationsJson: Organisation[] = [];
    try {
      const organisations = await this.ctClient.organisations();
      if (organisations) organisationsJson = organisations;
    } catch (e) {
      this.logger.error(`Unable to load organisations data: ${e}`);
    }

    if (!organisationsJson)
      throw new Error('Unable to load organisaitons data');

    // Iterate over the rows
    for (const organisationRow of organisationsGSheet) {
      const organisationName = organisationRow['NAME'];
      if (!organisationName) {
        // End of valid organisations
        break;
      }

      // start processing
      this.logger.info(`Processing organisation: ${organisationName}....`);

      // Find a matching organisation
      const organisationJson = organisationsJson.find(
        (organisation: { name: any }) =>
          organisation.name === organisationRow[Columns.NAME]
      );
      if (!organisationJson)
        throw new Error(
          `Unable to load organisaiton with name: ${
            organisationRow[Columns.NAME]
          }`
        );
      try {
        const profileID = organisationJson.profile.id;
        if (profileID) {
          await this.ctClient.updateProfile(
            profileID,
            organisationRow[Columns.DESCRIPTION],
            organisationRow[Columns.LOGO]
          );
          this.logger.info(`....updated: ${organisationName}....`);
        }
      } catch (e) {
        this.logger.error(
          `Unable to create organisation (${organisationName}): ${e.message}`
        );
      }
    }
  }
}
