import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';
import { AbstractPopulator } from './abstract-populator';

export class OpportunityPopulator extends AbstractPopulator {
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
    this.logger.info('Processing opportunities');

    const challenges = await this.client.challenges();
    if (!challenges) {
      this.logger.error('Can not process opportunites. Missing challenges');
      return;
    }
    // Iterate over the rows
    const opportunities = this.data.opportunities();
    for (let i = 0; i < opportunities.length; i++) {
      const opportunity = opportunities[i];
      if (!opportunity.name) {
        // End of valid organisations
        break;
      }

      // start processing
      this.logger.info(`Processing group: ${opportunity.name}....`);
      const organisationProfileID = '===> groupCreation - FULL';
      this.profiler.profile(organisationProfileID);

      const challenge = challenges.find(
        c => c.name.toLowerCase() === opportunity.challenge.toLowerCase()
      );

      if (!challenge) {
        this.logger.warn(
          `Skipping opportunity '${opportunity.name}'. Missing challenge '${opportunity.challenge}'!`
        );
        continue;
      }

      try {
        await this.client.createOpportunity(Number(challenge.id), {
          name: opportunity.name,
          textID: opportunity.textId,
          state: 'Defined',
          context: {
            background: opportunity.background,
            impact: opportunity.impact,
            who: opportunity.who,
            vision: opportunity.vision,
            tagline: opportunity.tagline,
            references: [
              {
                name: 'video',
                uri: opportunity.video,
                description: 'Video explainer for the opportunity',
              },
              {
                name: 'visual',
                uri: opportunity.image,
                description: 'Banner for the opportunity',
              },
            ],
          },
        });

        this.logger.info(`Added group: ${opportunity.name}`);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create opportunity (${opportunity.name}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create opportunity: ${e}`);
        }
      }
    }
  }
}
