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

    for (const opportunityData of opportunities) {
      if (!opportunityData.displayName) {
        // End of valid opportunities
        break;
      }

      // start processing
      this.logger.info(
        `Processing opportunity: ${opportunityData.displayName}....`
      );
      const opportunityProfileID = '===> opportunityCreation - FULL';
      this.profiler.profile(opportunityProfileID);

      if (!opportunityData.challenge) {
        this.logger.warn(
          `Skipping opportunity '${opportunityData.displayName}'. Missing challenge '${opportunityData.challenge}'!`
        );
        continue;
      }

      if (!opportunityData.ecoverseID) {
        this.logger.warn(
          `Skipping opportunity (${opportunityData.nameID}): no ecoverseID specified`
        );
        return;
      }

      const existingOpportunity = await this.client.opportunityByNameID(
        opportunityData.ecoverseID,
        opportunityData.nameID
      );

      try {
        if (existingOpportunity) {
          this.logger.info(
            `Opportunity ${opportunityData.displayName} already exists! Updating`
          );
          await this.updateOpportunity(opportunityData, existingOpportunity);
        } else {
          await this.createOpportunity(opportunityData);
        }
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create/update opportunity (${opportunityData.displayName}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create/update opportunity: ${e}`);
        }
      } finally {
        this.profiler.profile(opportunityProfileID);
      }
    }
  }

  async createOpportunity(opportunityData: Opportunity) {
    await this.client.createOpportunity({
      challengeID: opportunityData.challenge,
      displayName: opportunityData.displayName,
      nameID: opportunityData.nameID,
      context: {
        background: opportunityData.background,
        impact: opportunityData.impact,
        who: opportunityData.who,
        vision: opportunityData.vision,
        tagline: opportunityData.tagline,
        references: this.getReferences(opportunityData),
      },
    });

    this.logger.info(`...added opportunity: ${opportunityData.displayName}`);
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
    await this.client.updateOpportunity({
      ID: existingOpportunity.id,
      displayName: opportunityData.displayName,
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

    this.logger.info(`...updated opportunity: ${opportunityData.displayName}`);
  }
}
