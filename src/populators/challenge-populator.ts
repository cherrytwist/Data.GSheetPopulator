import { CherrytwistClient, Organisation } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Challenge } from '../models';
import { AbstractPopulator } from './abstract-populator';

export class ChallengePopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  private organisations: Organisation[] = [];

  constructor(
    client: CherrytwistClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing challenges');
    const challenges = this.data.challenges();

    if (challenges.length === 0) {
      this.logger.warn('No challenges to import!');
      return;
    }

    const existingChallenges = await this.client.challenges();
    this.organisations = ((await this.client.organisations()) ||
      []) as Organisation[];

    // Iterate over the rows
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

      this.logger.info(`....created: ${challenge.name}`);
      await this.updateLeadingOrg(challenge);
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
      this.logger.info(`....updated: ${challenge.name}`);
      await this.updateLeadingOrg(challenge);
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

  private async updateLeadingOrg(challenge: Challenge) {
    this.logger.info(
      `Updating challenge leading organisations for : ${challenge.name}`
    );

    const organisationIDs = this.organisations.filter(o =>
      challenge.leadingOrganisations.some(lo => lo === o.name)
    );

    for (let i = 0; i < organisationIDs.length; i++) {
      const id = organisationIDs[i].id;
      try {
        await this.client.addChallengeLead(challenge.name, id);
        this.logger.info(
          `Added organisation as lead to challenge: ${challenge.name}`
        );
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to update leading organisation for challenge (${challenge.name}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to update leading organisation for challenge (${challenge.name}): ${e.message}`
          );
        }
      } finally {
        this.logger.info(`... updated ${challenge.name}`);
      }
    }
  }
}
