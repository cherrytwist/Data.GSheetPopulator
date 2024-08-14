import { CreateReferenceInput, CreateUserInput } from '@alkemio/client-lib';
import { UpdateProfileDirectInput } from '@alkemio/client-lib/dist/generated/graphql';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { Tagsets } from '../constants/enums';
import { AbstractPopulator } from './abstract-populator';

export class UserPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioPopulatorClient,
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
          await this.client.alkemioLibClient.updateProfile(
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
          await this.client.alkemioLibClient.addUserToSpace(
            this.spaceID,
            userData.nameID
          );
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

  async populateUserRoles() {
    this.logger.info('Processing users for roles');

    const usersData = this.data.users();

    if (usersData.length === 0) {
      this.logger.warn('No users to import!');
      return;
    }

    const organizations = await this.client.alkemioLibClient.organizations();

    let count = 0;
    for (const userData of usersData) {
      // start processing
      this.logger.info(`[${count}] - Processing user: ${userData.nameID} ...`);

      const existingUser = await this.client.user(userData.nameID);
      if (!existingUser) {
        this.logger.warn(
          `User not found to populate roles: ${userData.nameID}`
        );
        continue;
      }
      const organization = organizations.find(
        org => org.nameID === userData.organization
      );
      if (!organization) {
        this.logger.warn(
          `Organization not found to populate roles: ${userData.organization}`
        );
        continue;
      }

      try {
        await this.client.alkemioLibClient.addUserToOrganization(
          existingUser.id,
          organization.id
        );
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Could not update user memberships: ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not update user memberships: ${e}`);
        }
      }
      count++;
    }
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
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      profileData: {
        displayName: userData.displayName,
        tagline: userData.jobTitle,
        description: userData.bio,
        referencesData: references,
        location: {
          country: userData.country,
          city: userData.city,
        },
      },
    };

    const createdUser = await this.client.sdkClient.createUser({
      userData: userInputData,
    });

    if (!createdUser) {
      this.logger.error(`Error creating user: ${userData.nameID}`);
      return;
    }

    this.profiler.profile('userCreation');
    const userProfile = createdUser.data.createUser.profile;

    const visualID = userProfile.visual?.id || '';
    await this.client.alkemioLibClient.updateVisual(visualID, userData.avatar);
    const skillsTagset = userProfile.tagsets?.find(
      t => t.name === Tagsets.SKILLS.toLowerCase()
    );
    const keywordsTagset = userProfile.tagsets?.find(
      t => t.name === Tagsets.KEYWORDS.toLowerCase()
    );
    if (!skillsTagset || !keywordsTagset) {
      this.logger.warn(
        `Unable to find tagsets on user: ${JSON.stringify(userProfile)}`
      );
      return false;
    }

    // Update the tagsets data
    const updateProfileInput: UpdateProfileDirectInput = {
      profileID: userProfile.id,
      tagsets: [
        {
          ID: skillsTagset?.id,
          tags: userData.skills as string[],
        },
        {
          ID: keywordsTagset?.id,
          tags: userData.keywords as string[],
        },
      ],
    };
    await this.client.sdkClient.updateProfile({
      profileData: updateProfileInput,
    });

    this.logger.info(`... created user: ${createdUser.data.createUser.nameID}`);

    this.profiler.profile(userProfile.id);
  }
}
