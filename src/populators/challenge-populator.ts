import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';
import { Challenge } from '../models';
import { AbstractPopulator } from './abstract-populator';

export class ChallengePopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: DataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing challenges');
    const existingChallenges = await this.client.challenges();
    // Iterate over the rows
    const challenges = this.data.challenges();
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];

      if (!challenge.name) {
        // End of valid challenges
        break;
      }

      // start processing
      this.logger.info(`Processing challenge: ${challenge.name}....`);
      const challengeProfileID = '===> challengeCreation - FULL';
      this.profiler.profile(challengeProfileID);

      const existingChallenge = existingChallenges?.find(
        x => x.name === challenge.name
      );
      if (existingChallenge) {
        this.logger.info(
          `Challenge ${challenge.name} already exists! Updating`
        );
        await this.updateChallengeContext(existingChallenge.id, challenge);
      } else {
        await this.createChallenge(challenge);
      }
      this.profiler.profile(challengeProfileID);
    }
  }

  async createChallenge(challenge: Challenge) {
    try {
      await this.client.createChallenge({
        name: challenge.name,
        textID: challenge.textId,
        state: 'Defined',
        context: {
          tagline: challenge.tagline,
          background: challenge.background,
          vision: challenge.vision,
          impact: challenge.impact,
          who: challenge.who,
          references: this.getReferences(challenge),
        },
      });
    } catch (e) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to create challenge (${challenge.name}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to create challenge (${challenge.name}): ${e.message}`
        );
      }
    }
  }

  // Load users from a particular googlesheet
  async updateChallengeContext(challengeId: string, challenge: Challenge) {
    try {
      await this.client.updateChallenge(challengeId, {
        context: {
          tagline: challenge.tagline,
          background: challenge.background,
          vision: challenge.vision,
          impact: challenge.impact,
          who: challenge.who,
          references: this.getReferences(challenge),
        },
      });
      this.logger.info(`....updated: ${challenge.name}...`);
    } catch (e) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to update challenge (${challenge.name}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to update challenge (${challenge.name}): ${e.message}`
        );
      }
    }
  }

  private getReferences(challenge: Challenge) {
    return [
      {
        name: 'video',
        uri: challenge.video,
        description: 'Video explainer for the challenge',
      },
      {
        name: 'visual',
        uri: challenge.image,
        description: 'Banner for the challenge',
      },
      {
        name: 'visual2',
        uri: challenge.visual,
        description: 'Visual for the challenge',
      },
    ];
  }
}
