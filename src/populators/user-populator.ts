import {
  CherrytwistClient,
  ReferenceInput,
  UserInput,
  Opportunity,
} from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Tagsets } from '../constants/enums';
import { User } from '../models';
import { AbstractPopulator } from './abstract-populator';

export class UserPopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing users');

    const users = this.data.users();

    if (users.length === 0) {
      this.logger.warn('No users to import!');
      return;
    }

    const opportunities =
      ((await this.client.opportunities()) as Opportunity[]) || [];
    let count = 0;
    for (const user of users) {
      // start processing
      this.logger.info(`[${count}] - Processing user: ${user.name} ...`);
      const userProfileID = '===> userCreation - FULL';
      this.profiler.profile(userProfileID);

      try {
        // Add the user
        this.profiler.profile('userCreation');
        const references: ReferenceInput[] = [];

        if (user.linkedin) {
          references.push({
            name: 'LinkedIn',
            uri: user.linkedin,
            description: 'LinkedIn profile',
          });
        }

        if (user.twitter) {
          references.push({
            name: 'Twitter',
            uri: user.twitter,
            description: 'Twitter profile',
          });
        }

        const userData: UserInput = {
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          email: user.email,
          city: user.city,
          country: user.country,
          phone: user.phone,
          profileData: {
            avatar: user.avatar,
            description: user.bio,
            referencesData: references,
            tagsetsData: [
              {
                name: Tagsets.SKILLS,
                tags: user.skills,
              },
              {
                name: Tagsets.KEYWORDS,
                tags: user.keywords,
              },
              {
                name: Tagsets.ORGANISATION,
                tags: [user.organization],
              },
              {
                name: Tagsets.ORGANISATION_ROLES,
                tags: [user.jobTitle],
              },
            ],
          },
        };

        const createdUser = await this.client.createUser(userData);

        if (!createdUser) {
          this.logger.error(`Error creating user: ${userData.name}`);
          return;
        }

        this.profiler.profile('userCreation');
        const userProfileID = createdUser.profile?.id || '';

        this.logger.info(`... created user: ${createdUser.name}`);

        // add the user to the ecoverse
        await this.client.addUserToEcoverse(createdUser.id);

        // Add the user to the challenge user group if applicable
        await this.addUserToChallenges(user);

        // Add the user to groups
        await this.addUserToGroups(
          createdUser.id,
          createdUser.name,
          user.groups
        );
        await this.addUserToOpportunities(
          createdUser.id,
          createdUser.name,
          user.opportunities,
          opportunities
        );

        count++;
        //if (count >20) break;
        this.profiler.profile(userProfileID);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Could not create user: ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create user: ${e}`);
        }
      }
    }
    this.logger.info(`Iterated over ${count} user entries`);
  }

  async addUserToChallenges(user: User) {
    const userInfo = await this.client.user(user.email);
    if (!userInfo) throw new Error(`Unable to locate user: ${user.email}`);
    for (const challenge of user.challenges) {
      if (challenge) {
        await this.client.addUserToChallenge(challenge, `${userInfo.id}`);
      }
    }
  }

  async addUserToGroups(userID: string, userName: string, groups: string[]) {
    for (const groupName of groups) {
      const group = await this.client.groupByName(groupName);
      // Add the user into the team members group
      if (!group) {
        this.logger.warn(
          `Unable to find group (${groupName}) for user (${userName})`
        );
        return false;
      } else {
        await this.client.addUserToGroup(userID, group.id);
        this.logger.info(`... added user to group: ${groupName}`);
      }
      return true;
    }
  }

  async addUserToOpportunities(
    userID: string,
    userName: string,
    userOpportunities: string[],
    opportunities: Opportunity[]
  ) {
    for (const opportunity of userOpportunities) {
      const opportunityId = opportunities.find(x => x.name === opportunity)?.id;
      if (!opportunityId) {
        this.logger.error(
          `Can not add user ${userName} to opportunity ${opportunity}, because the opportunity is missing.`
        );
        return;
      }

      try {
        await this.client.addUserToOpportunity(userID, opportunityId);
        this.logger.info(`... added user to opportunity: ${opportunity}`);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Can not add user ${userName} to opportunity ${opportunity}: ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Can not add user ${userName} to opportunity ${opportunity}: ${e}`
          );
        }
      }
    }
  }
}
