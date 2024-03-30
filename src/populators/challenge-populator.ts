import {
  Organization,
  UpdateChallengeInput,
  UpdateTagsetInput,
} from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Challenge } from '../inputModels';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import {
  assignOrgsAsLead,
  assignOrgsAsMember,
  assignUserAsLead,
  contributorsToAdd,
} from '../utils';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';

export class ChallengePopulator extends AbstractPopulator {
  private organizations: Organization[] = [];

  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing challenges');
    const challengesData = this.data.challenges();

    if (challengesData.length === 0) {
      this.logger.warn('No challenges to import!');
      return;
    }

    this.organizations =
      ((await this.client.alkemioLibClient.organizations()) ||
        []) as Organization[];

    // Iterate over the rows
    for (const challengeData of challengesData) {
      if (!challengeData.displayName) {
        // End of valid challenges
        break;
      }

      if (!challengeData.process) {
        // Do not process this challenge
        break;
      }

      // start processing
      this.logger.info(`Processing challenge: ${challengeData.nameID}....`);
      const challengeProfileID = '===> challengeCreation - FULL';
      this.profiler.profile(challengeProfileID);

      const existingChallenge = await this.client.challengeByNameID(
        this.spaceID,
        challengeData.nameID
      );

      if (existingChallenge) {
        this.logger.info(
          `Challenge ${challengeData.displayName} already exists! Updating`
        );
        await this.updateChallengeContext(existingChallenge, challengeData);
      } else {
        await this.createChallenge(challengeData);
      }
      this.profiler.profile(challengeProfileID);
    }
  }

  async createChallenge(challengeData: Challenge) {
    try {
      const spaceInfo = await this.client.alkemioLibClient.spaceInfo(
        this.spaceID
      );
      const libraryTemplates: { id: string }[] =
        spaceInfo?.account.library?.innovationFlowTemplates || [];
      if (libraryTemplates.length === 0) {
        throw new Error(
          `No challenge innovation flow template found in space ${this.spaceID}`
        );
      }
      const innovationFlowTemplate = libraryTemplates[0];

      const createdChallenge =
        await this.client.alkemioLibClient.createChallenge({
          spaceID: this.spaceID,
          nameID: challengeData.nameID,
          profileData: {
            displayName: challengeData.displayName,
            tagline: challengeData.tagline,
            description: challengeData.background,
            location: {
              country: challengeData.country,
              city: challengeData.city,
            },
            referencesData: this.getReferences(challengeData),
          },
          context: {
            vision: challengeData.vision,
            impact: challengeData.impact,
            who: challengeData.who,
          },
          tags: challengeData.tags || [],
          collaborationData: {
            innovationFlowTemplateID: innovationFlowTemplate.id,
          },
        });
      this.logger.info(`....created: ${challengeData.displayName}`);

      const visuals = createdChallenge?.profile?.visuals || [];
      await this.client.updateVisualsOnJourneyProfile(
        visuals,
        challengeData.visualBanner,
        challengeData.visualBackground,
        challengeData.visualAvatar
      );

      if (!createdChallenge) {
        throw new Error(
          `Challenge ${challengeData.nameID} was not initialized!`
        );
      }

      for (const user of challengeData.memberUsers) {
        this.logger.info(`...adding user to Challenge: ${user}`);
        await this.addUserToChallenge(user, challengeData.nameID);
      }
      await this.populateCommunityRoles(createdChallenge?.id, challengeData);
    } catch (e: any) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to create challenge (${challengeData.displayName}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to create challenge (${challengeData.displayName}): ${e.message}`
        );
      }
    }
  }

  async populateCommunityRoles(challengeID: string, challengeData: Challenge) {
    const challenge = await this.client.alkemioLibClient.challengeByNameID(
      this.spaceID,
      challengeID
    );

    const communityID = challenge?.community?.id;
    if (!communityID) {
      throw new Error(
        `Challenge ${challenge?.profile.displayName} doesn't have a community with ID ${communityID}`
      );
    }

    const existingLeadOrgs = challenge?.community?.leadOrganizations?.map(
      org => org.nameID
    );
    const leadOrgsToAdd = contributorsToAdd(
      existingLeadOrgs,
      challengeData.leadOrganizations
    );
    await assignOrgsAsLead(
      this.client,
      this.logger,
      communityID,
      leadOrgsToAdd
    );

    const existingMemberOrgs = challenge?.community?.memberOrganizations?.map(
      org => org.nameID
    );
    const memberOrgsToAdd = contributorsToAdd(
      existingMemberOrgs,
      challengeData.memberOrganizations
    );
    await assignOrgsAsMember(
      this.client,
      this.logger,
      communityID,
      memberOrgsToAdd
    );

    const existingLeadUsers = challenge?.community?.leadUsers?.map(
      user => user.nameID
    );
    const leadUsersToAdd = contributorsToAdd(
      existingLeadUsers,
      challengeData.leadUsers
    );
    await assignUserAsLead(
      this.client,
      this.logger,
      communityID,
      leadUsersToAdd
    );
  }

  // Load users from a particular googlesheet
  async updateChallengeContext(challenge: any, challengeData: Challenge) {
    try {
      const tagsetUpdateInput: UpdateTagsetInput[] = [
        {
          ID: challenge.profile.tagset.id,
          tags: challengeData.tags || [],
        },
      ];
      const updateChallengeInput: UpdateChallengeInput = {
        ID: challenge.id,
        profileData: {
          displayName: challengeData.displayName,
          tagline: challengeData.tagline,
          description: challengeData.background,
          location: {
            country: challengeData.country,
            city: challengeData.city,
          },
          tagsets: tagsetUpdateInput,
        },
        context: {
          vision: challengeData.vision,
          impact: challengeData.impact,
          who: challengeData.who,
        },
      };
      const updatedChallenge =
        await this.client.alkemioLibClient.updateChallenge(
          updateChallengeInput
        );
      const visuals = updatedChallenge?.profile?.visuals || [];
      await this.client.updateVisualsOnJourneyProfile(
        visuals,
        challengeData.visualBanner,
        challengeData.visualBackground,
        challengeData.visualAvatar
      );

      for (const user of challengeData.memberUsers) {
        this.logger.info(`...adding user to Challenge: ${user}`);
        await this.addUserToChallenge(user, challengeData.nameID);
      }
      await this.populateCommunityRoles(challenge.id, challengeData);

      this.logger.info(`....updated: ${challengeData.displayName}`);
    } catch (e: any) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to update challenge (${challengeData.displayName}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to update challenge (${challengeData.displayName}): ${e.message}`
        );
      }
    }
  }

  private getReferences(challengeData: Challenge) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      challengeData.refVideo,
      'Video explainer for the challenge'
    );
    references.addReference(
      'jitsi',
      challengeData.refJitsi,
      'Jitsi meeting space for the challenge'
    );
    references.addReference(
      challengeData.ref1Name,
      challengeData.ref1Value,
      challengeData.ref1Description
    );
    return references.getReferences();
  }

  private async addUserToChallenge(
    userNameId: string,
    challengeNameID: string
  ) {
    const userInfo = await this.client.alkemioLibClient.user(userNameId);
    if (!userInfo) throw new Error(`Unable to locate user: ${userNameId}`);
    await this.client.alkemioLibClient.addUserToChallenge(
      this.spaceID,
      challengeNameID,
      userInfo.nameID
    );
  }
}
