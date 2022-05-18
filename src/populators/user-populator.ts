import {
  AlkemioClient,
  CreateReferenceInput,
  CreateUserInput,
} from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Tagsets } from '../constants/enums';
import { User } from '../models';
import { AbstractPopulator } from './abstract-populator';

export class UserPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing users');

    const usersData = this.data.users();

    if (usersData.length === 0) {
      this.logger.warn('No users to import!');
      return;
    }

    let count = 0;
    for (const userData of usersData) {
      // start processing
      this.logger.info(`[${count}] - Processing user: ${userData.nameID} ...`);
      const userProfileID = '===> userCreation - FULL';
      this.profiler.profile(userProfileID);

      const existingUser = await this.client.user(userData.nameID);
      if (existingUser) {
        if (existingUser?.profile?.id) {
          this.logger.info(
            `[${count}] User already exists: ${userData.nameID}; updating profile instead`
          );
          await this.client.updateProfile(
            existingUser.profile.id,
            undefined,
            userData.country,
            userData.city
          );
        }
      } else {
        this.logger.info(`[${count}] User does not exist: ${userData.nameID}`);
        try {
          await this.createUser(userData);
        } catch (e: any) {
          if (e.response && e.response.errors) {
            this.logger.error(
              `Could not create user: ${e.response.errors[0].message}`
            );
          } else {
            this.logger.error(`Could not create user: ${e}`);
          }
          throw e;
        }
      }
      count++;
    }
    this.logger.info(`Iterated over ${count} user entries`);
  }

  async createUser(userData: any) {
    // Add the user
    this.profiler.profile('userCreation');
    const references: CreateReferenceInput[] = [];

    if (userData.linkedin) {
      references.push({
        name: 'LinkedIn',
        uri: userData.linkedin,
        description: 'LinkedIn profile',
      });
    }

    if (userData.twitter) {
      references.push({
        name: 'Twitter',
        uri: userData.twitter,
        description: 'Twitter profile',
      });
    }

    const userInputData: CreateUserInput = {
      nameID: userData.nameID,
      displayName: userData.displayName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      email: userData.email,
      city: userData.city,
      country: userData.country,
      phone: userData.phone,
      profileData: {
        description: userData.bio,
        referencesData: references,
        location: {
          country: userData.country,
          city: userData.city,
        },
        tagsetsData: [
          {
            name: Tagsets.SKILLS,
            tags: userData.skills,
          },
          {
            name: Tagsets.KEYWORDS,
            tags: userData.keywords,
          },
          {
            name: Tagsets.ORGANIZATION_ROLES,
            tags: [userData.jobTitle],
          },
        ],
      },
    };

    const createdUser = await this.client.createUser(userInputData);

    if (!createdUser) {
      this.logger.error(`Error creating user: ${userData.nameID}`);
      return;
    }

    this.profiler.profile('userCreation');
    const userProfileID = createdUser.profile?.id || '';

    const visualID = createdUser.profile?.avatar?.id || '';
    await this.client.updateVisual(visualID, userData.avatar);

    this.logger.info(`... created user: ${createdUser.nameID}`);

    // add the user to the Hub
    await this.client.addUserToHub(this.hubID, createdUser.id);

    await this.client.addUserToOrganization(
      createdUser.id,
      userData.organization
    );

    // Add the user to the challenge user group if applicable
    await this.addUserToChallenges(userData);

    // Add the user to groups
    await this.addUserToGroups(createdUser.nameID, userData.groups);
    await this.addUserToOpportunities(
      createdUser.nameID,
      userData.opportunities
    );
    this.profiler.profile(userProfileID);
  }

  async addUserToChallenges(user: User) {
    const userInfo = await this.client.user(user.email);
    if (!userInfo) throw new Error(`Unable to locate user: ${user.email}`);
    for (const challenge of user.challenges) {
      if (challenge) {
        await this.client.addUserToChallenge(
          this.hubID,
          challenge,
          userInfo.nameID
        );
      }
    }
  }

  async addUserToGroups(userID: string, groups: string[]) {
    for (const groupName of groups) {
      const group = await this.client.groupByName(this.hubID, groupName);
      // Add the user into the team members group
      if (!group) {
        this.logger.warn(
          `Unable to find group (${groupName}) for user (${userID})`
        );
        return false;
      } else {
        await this.client.addUserToGroup(userID, group.id);
        this.logger.info(`... added user to group: ${groupName}`);
      }
      return true;
    }
  }

  async addUserToOpportunities(userID: string, userOpportunities: string[]) {
    for (const opportunity of userOpportunities) {
      try {
        await this.client.addUserToOpportunity(this.hubID, opportunity, userID);
        this.logger.info(`... added user to opportunity: ${opportunity}`);
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Can not add user ${userID} to opportunity ${opportunity}: ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Can not add user ${userID} to opportunity ${opportunity}: ${e}`
          );
        }
      }
    }
  }
}
