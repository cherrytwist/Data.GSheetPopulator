import { CherrytwistClient, Organisation } from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Challenge } from '../models';
import { ReferencesCreator } from '../utils/references-creator';
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
    for (const challenge of challenges) {
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
        parentID: 1, // TODO: Change it with the ID of the Ecoverse when multi ecoverse feature is finished
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
      await this.client.updateChallenge({
        ID: challengeId,
        context: {
          tagline: challenge.tagline,
          background: challenge.background,
          vision: challenge.vision,
          impact: challenge.impact,
          who: challenge.who,
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
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      challenge.video,
      'Video explainer for the challenge'
    );
    references.addReference(
      'visual',
      challenge.image,
      'Banner for the challenge'
    );
    references.addReference(
      'visual2',
      challenge.visual,
      'Visual for the challenge'
    );
    references.addReference(
      'jitsi',
      challenge.jitsi,
      'Jitsi meeting space for the challenge'
    );
    return references.getReferences();
  }

  private async updateLeadingOrg(challenge: Challenge) {
    this.logger.info(
      `Updating challenge leading organisations for : ${challenge.name}`
    );

    const organisationIDs = this.organisations.filter(o =>
      challenge.leadingOrganisations.some(
        lo => lo.toLowerCase() === o.textID.toLowerCase()
      )
    );

    for (const { id } of organisationIDs) {
      try {
        await this.client.addChallengeLead(challenge.textId, id);
        this.logger.info(
          `Added organisation (${id}) as lead to challenge: ${challenge.textId}`
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
