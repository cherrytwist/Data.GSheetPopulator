import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { GSheetsConnector } from './GSheetsConnector';

enum Columns {
  ROLE = 'ROLE',
  EMAIL = 'EMAIL',
  NAME = 'NAME',
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  PHONE = 'PHONE',
  CITY = 'CITY',
  COUNTRY = 'COUNTRY',
  GENDER = 'GENDER',
  ORGANISATION = 'ORGANISATION',
  ORGANISATION_ROLE = 'JOB_TITLE',
  BIO = 'BIO',
  FAV_FOOD = 'FAV_FOOD',
  FAV_BEVERAGE = 'FAV_BEVERAGE',
  SKILLS = 'SKILLS',
  KEYWORDS = 'KEYWORDS',
  TEAM = 'TEAM',
  CHALLENGE = 'CHALLENGE',
  AVATAR = 'AVATAR',
  LINKEDIN = 'LINKEDIN',
  TWITTER = 'TWITTER',
}

enum Tagsets {
  SKILLS = 'Skills',
  KEYWORDS = 'Keywords',
  FAV_FOOD = 'FavouriteFood',
  FAV_BEVERAGE = 'FavouriteBeverage',
  ORGANISATION = 'Organisations',
  ORGANISATION_ROLES = 'OrganisationRoles',
}

enum Groups {
  TEAM_LEADS = 'Team Leads',
  TEAM_MEMBERS = 'Team Members',
  JEDIS = 'Jedis',
  STAKEHOLDERS = 'Stakeholders',
  CHALLENGE_LEADS = 'Challenge Leads',
}

export class UsersSheetPopulator {
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
  async loadUsersFromSheet(
    sheetName: string,
    sheetsConnector: GSheetsConnector
  ) {
    const sheetRange = `${sheetName}!A1:Z1200`;
    const teamsGSheet = await sheetsConnector.getObjectArray(sheetRange);
    this.logger.info(
      '==================================================================='
    );
    this.logger.info(
      `====== Obtained gsheet ${sheetRange}  with ${teamsGSheet.length} rows`
    );

    // Iterate over the rows
    let count = 0;
    for (const userRow of teamsGSheet) {
      const firstName = userRow[Columns.FIRST_NAME];
      if (!firstName) {
        // End of valid users
        break;
      }

      // start processing
      this.logger.info(`Processing user: ${firstName}....`);
      const userProfileID = '===> userCreation - FULL';
      this.profiler.profile(userProfileID);

      try {
        // Add the user

        this.profiler.profile('userCreation');
        const userData = {
          name: `${userRow[Columns.FIRST_NAME]} ${userRow[Columns.LAST_NAME]}`,
          firstName: `${userRow[Columns.FIRST_NAME]}`,
          lastName: `${userRow[Columns.LAST_NAME]}`,
          gender: `${userRow[Columns.GENDER]}`,
          email: `${userRow[Columns.EMAIL]}`,
          city: `${userRow[Columns.CITY]}`,
          country: `${userRow[Columns.COUNTRY]}`,
          phone: `${userRow[Columns.PHONE]}`,
        };
        const createdUser = await this.ctClient.createUser(userData);

        if (!createdUser) {
          this.logger.error(`Error creating user: ${userData.name}`);
          continue;
        }
        this.profiler.profile('userCreation');
        const userID = createdUser.id;
        const userProfileID = createdUser.profile?.id || '';

        this.logger.info(`....created user: ${userID}`);

        // Add in the linkedin reference
        this.profiler.profile('userReference');
        if (userRow[Columns.LINKEDIN])
          await this.ctClient.addReference(
            userProfileID,
            'LinkedIn',
            `${userRow[Columns.LINKEDIN]}`,
            'LinkedIn profile'
          );
        if (userRow[Columns.TWITTER])
          await this.ctClient.addReference(
            'Twitter',
            `${userRow[Columns.TWITTER]}`,
            'Twitter profile',
            userProfileID
          );
        this.profiler.profile('userReference');

        // Add the user to the challenge user group if applicable
        const challengeName = userRow[Columns.CHALLENGE];
        if (challengeName) {
          this.profiler.profile('userChallenge');
          await this.ctClient.addUserToChallenge(challengeName, userID);
          this.profiler.profile('userChallenge');
        }

        // Add the user to the Teams Captains group if applicable
        const role = userRow[Columns.ROLE];
        if (role === 'Team members') {
          await this.addUserToRole(Groups.TEAM_MEMBERS, firstName, userID);
        } else if (role === 'Team lead') {
          await this.addUserToRole(Groups.TEAM_LEADS, firstName, userID);
        } else if (role === 'Challenge members') {
          // Todo - put the user in the right challenge
        } else if (role === 'Challenge lead') {
          // Todo - put the user in the right challenge
          await this.addUserToRole(Groups.CHALLENGE_LEADS, firstName, userID);
        } else if (role === 'Stakeholder') {
          await this.addUserToRole(Groups.STAKEHOLDERS, firstName, userID);
        } else if (role === 'Jedi') {
          await this.addUserToRole(Groups.JEDIS, firstName, userID);
        } else if (role === 'Users') {
          // Nothing to do, by being created already added to members i.e. user
        } else {
          this.logger.warn(`Unable to identify role ${role}`);
        }

        // Add the user to the right team group if applicable
        const teamName = userRow[Columns.TEAM];
        if (teamName) {
          // get the group id
          const group = await this.ctClient.groupByName(teamName);

          if (!group) {
            this.logger.warn(
              `Unable to identify team (${teamName}) for user (${firstName})`
            );
          } else {
            this.profiler.profile('userTeam');
            await this.ctClient.addUserToGroup(userProfileID, group.id);
            this.profiler.profile('userTeam');
            this.logger.info(
              `...adding user (${firstName}) to the specified team (${teamName}) succeeded`
            );
          }
        }

        // update the avatar + bio
        await this.ctClient.updateUserProfile(
          userRow[Columns.EMAIL],
          userRow[Columns.BIO],
          userRow[Columns.AVATAR]
        );

        // Add in the tagsets
        await this.ctClient.createTagset(
          userProfileID,
          Tagsets.SKILLS,
          userRow[Columns.SKILLS]
        );
        await this.ctClient.createTagset(
          userProfileID,
          Tagsets.FAV_BEVERAGE,
          userRow[Columns.FAV_BEVERAGE]
        );
        await this.ctClient.createTagset(
          userProfileID,
          Tagsets.FAV_FOOD,
          userRow[Columns.FAV_FOOD]
        );
        await this.ctClient.createTagset(
          userProfileID,
          Tagsets.KEYWORDS,
          userRow[Columns.KEYWORDS]
        );
        await this.ctClient.createTagset(
          userProfileID,
          Tagsets.ORGANISATION,
          userRow[Columns.ORGANISATION]
        );
        await this.ctClient.createTagset(
          userProfileID,
          Tagsets.ORGANISATION_ROLES,
          userRow[Columns.ORGANISATION_ROLE]
        );

        count++;
        //if (count >20) break;
        this.profiler.profile(userProfileID);
      } catch (e) {
        debugger;
        if (e.response && e.response.errors) {
          this.logger.error(
            `Could not create user: ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create user: ${e}`);
        }

        if (count > 16) break;
      }
    }
    this.logger.info(`Iterated over ${count} user entries`);
  }

  async addUserToRole(
    groupName: string,
    username: string,
    userID: string
  ): Promise<boolean> {
    const group = await this.ctClient.groupByName(groupName);
    // Add the user into the team members group
    if (!group) {
      this.logger.warn(
        `Unable to identify team (${groupName}) for user (${username})`
      );
      return false;
    } else {
      await this.ctClient.addUserToGroup(userID, group.id);
      this.logger.info(`....added user to group: ${groupName}`);
    }
    return true;
  }
}
