import { CherrytwistClient, ReferenceInput, UserInput } from 'cherrytwist-lib';
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
    // Load users from a particular googlesheet
    this.logger.info('Processing users');

    const users = this.data.users();

    if (users.length === 0) {
      this.logger.warn('No users to import!');
      return;
    }

    let count = 0;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      // start processing
      this.logger.info(`Processing user: ${user.name} ...`);
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
                tags: [user.organisation],
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

        // Add the user to the challenge user group if applicable
        await this.addUserToChallenges(user);

        // Add the user to groups
        await this.addUserToGroups(
          createdUser.id,
          createdUser.name,
          user.groups
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
    for (let i = 0; i < user.challenges.length; i++) {
      const challenge = user.challenges[i];
      if (challenge) {
        await this.client.addUserToChallengeByEmail(user.email, challenge);
      }
    }
  }

  async addUserToGroups(userID: string, userName: string, groups: string[]) {
    for (let i = 0; i < groups.length; i++) {
      const groupName = groups[i];

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
}
