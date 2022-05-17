import { AlkemioClient, Organization } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Challenge } from '../models';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import { assignOrgsAsLead, assignOrgsAsMember } from '../utils';

export class ChallengePopulator extends AbstractPopulator {
  private organizations: Organization[] = [];

  constructor(
    client: AlkemioClient,
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

    this.organizations = ((await this.client.organizations()) ||
      []) as Organization[];

    // Iterate over the rows
    for (const challengeData of challengesData) {
      if (!challengeData.displayName) {
        // End of valid challenges
        break;
      }

      // start processing
      this.logger.info(`Processing challenge: ${challengeData.nameID}....`);
      const challengeProfileID = '===> challengeCreation - FULL';
      this.profiler.profile(challengeProfileID);

      const existingChallenge = await this.client.challengeByNameID(
        this.hubID,
        challengeData.nameID
      );

      if (existingChallenge) {
        this.logger.info(
          `Challenge ${challengeData.displayName} already exists! Updating`
        );
        await this.updateChallengeContext(existingChallenge.id, challengeData);
      } else {
        await this.createChallenge(challengeData);
      }
      this.profiler.profile(challengeProfileID);
    }
  }

  async createChallenge(challengeData: Challenge) {
    try {
      const createdChallenge = await this.client.createChallenge({
        hubID: this.hubID,
        displayName: challengeData.displayName,
        nameID: challengeData.nameID,
        context: {
          tagline: challengeData.tagline,
          background: challengeData.background,
          vision: challengeData.vision,
          impact: challengeData.impact,
          who: challengeData.who,
          location: {
            country: challengeData.country,
            city: challengeData.city,
          },
          references: this.getReferences(challengeData),
        },
        tags: challengeData.tags || [],
      });
      this.logger.info(`....created: ${challengeData.displayName}`);

      if (createdChallenge?.community?.id) {
        await assignOrgsAsLead(
          this.client,
          this.logger,
          createdChallenge.community.id,
          challengeData.leadingOrganizations
        );

        await assignOrgsAsMember(
          this.client,
          this.logger,
          createdChallenge.community.id,
          challengeData.memberOrganizations
        );
      }

      const visuals = createdChallenge?.context?.visuals || [];
      await this.client.updateVisualsOnContext(
        visuals,
        challengeData.visualBanner,
        challengeData.visualBackground,
        challengeData.visualAvatar
      );
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

  // Load users from a particular googlesheet
  async updateChallengeContext(challengeId: string, challengeData: Challenge) {
    try {
      const updatedChallenge = await this.client.updateChallenge({
        ID: challengeId,
        displayName: challengeData.displayName,
        context: {
          tagline: challengeData.tagline,
          background: challengeData.background,
          vision: challengeData.vision,
          impact: challengeData.impact,
          who: challengeData.who,
          location: {
            country: challengeData.country,
            city: challengeData.city,
          },
        },
        tags: challengeData.tags || [],
      });
      const visuals = updatedChallenge?.context?.visuals || [];
      await this.client.updateVisualsOnContext(
        visuals,
        challengeData.visualBanner,
        challengeData.visualBackground,
        challengeData.visualAvatar
      );
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

  private getReferences(challenge: Challenge) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      challenge.refVideo,
      'Video explainer for the challenge'
    );
    references.addReference(
      'jitsi',
      challenge.refJitsi,
      'Jitsi meeting space for the challenge'
    );
    return references.getReferences();
  }
}
