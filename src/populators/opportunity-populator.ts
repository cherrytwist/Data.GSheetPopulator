import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Opportunity } from '../models';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import {
  assignOrgsAsLead,
  assignOrgsAsMember,
  assignUserAsLead,
} from '../utils';

export class OpportunityPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioClient,
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

      const existingOpportunity = await this.client.opportunityByNameID(
        this.hubID,
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
    // First need to get the id for the challenge
    const challenge = await this.client.challengeByNameID(
      this.hubID,
      opportunityData.challenge
    );
    if (!challenge) {
      this.logger.error(
        `Could not create opportunity as could not find challenge with nameID: ${opportunityData.nameID}`
      );
      return;
    }
    const createdOpportunity = await this.client.createOpportunity({
      challengeID: challenge.id,
      displayName: opportunityData.displayName,
      nameID: opportunityData.nameID,
      context: {
        background: opportunityData.background,
        impact: opportunityData.impact,
        who: opportunityData.who,
        vision: opportunityData.vision,
        tagline: opportunityData.tagline,
        references: this.getReferences(opportunityData),
        location: {
          country: opportunityData.country,
          city: opportunityData.city,
        },
      },
      tags: opportunityData.tags || [],
    });

    if (createdOpportunity?.community?.id) {
      await assignOrgsAsLead(
        this.client,
        this.logger,
        createdOpportunity.community.id,
        opportunityData.leadingOrganizations
      );

      await assignOrgsAsMember(
        this.client,
        this.logger,
        createdOpportunity.community.id,
        opportunityData.memberOrganizations
      );

      await assignUserAsLead(
        this.client,
        this.logger,
        createdOpportunity.community.id,
        opportunityData.leadUsers
      );
    }

    const visuals = createdOpportunity?.context?.visuals || [];
    await this.client.updateVisualsOnContext(
      visuals,
      opportunityData.visualBanner,
      opportunityData.visualBackground,
      opportunityData.visualAvatar
    );
    this.logger.info(`...added opportunity: ${opportunityData.displayName}`);
  }

  private getReferences(opportunityData: Opportunity) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      opportunityData.refVideo,
      'Video explainer for the opportunity'
    );
    references.addReference(
      'jitsi',
      opportunityData.refJitsi,
      'Jitsi meeting space for the opportunity'
    );
    return references.getReferences();
  }

  async updateOpportunity(
    opportunityData: Opportunity,
    existingOpportunity: any
  ) {
    const updatedOpportunity = await this.client.updateOpportunity({
      ID: existingOpportunity.id,
      displayName: opportunityData.displayName,
      context: {
        background: opportunityData.background,
        impact: opportunityData.impact,
        who: opportunityData.who,
        vision: opportunityData.vision,
        tagline: opportunityData.tagline,
        location: {
          country: opportunityData.country,
          city: opportunityData.city,
        },
      },
      tags: opportunityData.tags || [],
    });

    const visuals = updatedOpportunity?.context?.visuals || [];
    await this.client.updateVisualsOnContext(
      visuals,
      opportunityData.visualBanner,
      opportunityData.visualBackground,
      opportunityData.visualAvatar
    );

    if (updatedOpportunity?.community?.id) {
      await assignOrgsAsLead(
        this.client,
        this.logger,
        updatedOpportunity.community.id,
        opportunityData.leadingOrganizations
      );

      await assignOrgsAsMember(
        this.client,
        this.logger,
        updatedOpportunity.community.id,
        opportunityData.memberOrganizations
      );

      await assignUserAsLead(
        this.client,
        this.logger,
        updatedOpportunity.community.id,
        opportunityData.leadUsers
      );
    }

    this.logger.info(`...updated opportunity: ${opportunityData.displayName}`);
  }
}
