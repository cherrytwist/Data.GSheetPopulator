import { AlkemioClient, Organisation } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Challenge } from '../models';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';

export class ChallengePopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  private organisations: Organisation[] = [];

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

    this.organisations = ((await this.client.organisations()) ||
      []) as Organisation[];

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
        this.ecoverseID,
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
      await this.client.createChallenge({
        parentID: this.ecoverseID,
        displayName: challengeData.displayName,
        nameID: challengeData.nameID,
        context: {
          tagline: challengeData.tagline,
          background: challengeData.background,
          vision: challengeData.vision,
          impact: challengeData.impact,
          who: challengeData.who,
          visual: {
            avatar: challengeData.visualAvatar,
            background: challengeData.visualBackground,
            banner: challengeData.visualBanner,
          },
          references: this.getReferences(challengeData),
        },
        tags: challengeData.tags || [],
        leadOrganisations: challengeData.leadingOrganisations,
      });

      this.logger.info(`....created: ${challengeData.displayName}`);
    } catch (e) {
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
      await this.client.updateChallenge({
        ID: challengeId,
        context: {
          tagline: challengeData.tagline,
          background: challengeData.background,
          vision: challengeData.vision,
          impact: challengeData.impact,
          who: challengeData.who,
          visual: {
            avatar: challengeData.visualAvatar,
            background: challengeData.visualBackground,
            banner: challengeData.visualBanner,
          },
        },
        tags: challengeData.tags || [],
        leadOrganisations: challengeData.leadingOrganisations,
      });
      this.logger.info(`....updated: ${challengeData.displayName}`);
    } catch (e) {
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
