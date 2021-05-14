import { CherrytwistClient } from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Opportunity } from '../models';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';

export class OpportunityPopulator extends AbstractPopulator {
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
    this.logger.info('Processing opportunities');

    const opportunities = this.data.opportunities();

    if (opportunities.length === 0) {
      this.logger.warn('No opportunities to import!');
      return;
    }

    const existingOpportunities = await this.client.opportunities();

    for (const opportunityData of opportunities) {
      if (!opportunityData.name) {
        // End of valid opportunities
        break;
      }

      // start processing
      this.logger.info(`Processing opportunity: ${opportunityData.name}....`);
      const opportunityProfileID = '===> opportunityCreation - FULL';
      this.profiler.profile(opportunityProfileID);

      if (!opportunityData.challenge) {
        this.logger.warn(
          `Skipping opportunity '${opportunityData.name}'. Missing challenge '${opportunityData.challenge}'!`
        );
        continue;
      }

      const existingOpportunity = existingOpportunities?.find(
        x => x.textID === opportunityData.textId
      );

      try {
        if (existingOpportunity) {
          this.logger.info(
            `Opportunity ${opportunityData.name} already exists! Updating`
          );
          await this.updateOpportunity(opportunityData, existingOpportunity);
        } else {
          await this.createOpportunity(opportunityData);
        }
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create opportunity (${opportunityData.name}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create opportunity: ${e}`);
        }
      } finally {
        this.profiler.profile(opportunityProfileID);
      }
    }
  }

  async createOpportunity(opportunityData: Opportunity) {
    await this.client.createChildChallenge({
      parentID: opportunityData.challenge,
      name: opportunityData.name,
      textID: opportunityData.textId,
      context: {
        background: opportunityData.background,
        impact: opportunityData.impact,
        who: opportunityData.who,
        vision: opportunityData.vision,
        tagline: opportunityData.tagline,
        references: this.getReferences(opportunityData),
      },
    });

    this.logger.info(`...added opportunity: ${opportunityData.name}`);
  }

  private getReferences(opportunityData: Opportunity) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      opportunityData.video,
      'Video explainer for the opportunity'
    );
    references.addReference(
      'visual',
      opportunityData.image,
      'Banner for the opportunity'
    );
    references.addReference(
      'jitsi',
      opportunityData.jitsi,
      'Jitsi meeting space for the opportunity'
    );
    return references.getReferences();
  }

  async updateOpportunity(
    opportunityData: Opportunity,
    existingOpportunity: any
  ) {
    await this.client.updateChallenge({
      ID: existingOpportunity.id,
      name: opportunityData.name,
      context: {
        background: opportunityData.background,
        impact: opportunityData.impact,
        who: opportunityData.who,
        vision: opportunityData.vision,
        tagline: opportunityData.tagline,
        // createReferences: [
        //   {
        //     name: 'video',
        //     uri: opportunityData.video,
        //     description: 'Video explainer for the opportunity',
        //   },
        //   {
        //     name: 'poster',
        //     uri: opportunityData.image,
        //     description: 'Banner for the opportunity',
        //   },
        // ],
      },
    });

    this.logger.info(`...updated opportunity: ${opportunityData.name}`);
  }
}
