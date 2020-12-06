import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';
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
            references: [
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
            ],
          },
        });
      } catch (e) {
        this.logger.error(
          `Unable to load challenge (${challenge.name}): ${e.message}`
        );
      }
    }
  }

  // Load users from a particular googlesheet
  async updateChallengeContext() {
    this.logger.info('Process challenges (update context)');

    // First get all the users
    const existingChallenges = await this.client.challenges();
    if (!existingChallenges) {
      this.logger.error('Unable to load challenges data');
      throw new Error('Unable to load challenges data');
    }

    const challenges = this.data.challenges();
    // Iterate over the rows
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];

      if (!challenge.name) {
        // End of valid challenges
        break;
      }

      // start processing
      this.logger.info(`Processing challenge: ${challenge.name}....`);

      // Find a matching organisation
      const existingChallenge = existingChallenges.find(
        c => c.name === challenge.name
      );

      if (!existingChallenge) {
        this.logger.error(
          `Unable to locate challenge on server with name: ${challenge.name}`
        );
        // continue with the next challenge
        continue;
      }
      try {
        const challengeID = existingChallenge.id;
        await this.client.updateChallenge(challengeID, {
          context: {
            tagline: challenge.tagline,
            background: challenge.background,
            vision: challenge.vision,
            impact: challenge.impact,
            who: challenge.who,
            references: [
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
            ],
          },
        });
        this.logger.info(`....updated: ${challenge.name}...`);
      } catch (e) {
        this.logger.error(
          `Unable to update challenge (${challenge.name}): ${e.message}`
        );
      }
    }
  }
}
