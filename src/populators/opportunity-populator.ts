import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Opportunity } from '../models';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import {
  assignOrgsAsLead,
  assignOrgsAsMember,
  assignUserAsLead,
  contributorsToAdd,
} from '../utils';
import { AlkemioClient, LifecycleType } from '@alkemio/client-lib';

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
      } catch (e: any) {
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
    const hubInfo = await this.client.hubInfo(this.hubID);
    const innovationFlowTemplate = hubInfo?.templates?.lifecycleTemplates?.filter(
      x => x.type === LifecycleType.Opportunity
    )[0];

    if (!innovationFlowTemplate)
      throw new Error(
        `No opportunity innovation flow template found in hub ${this.hubID}`
      );

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
      innovationFlowTemplateID: innovationFlowTemplate.id,
    });

    if (!createdOpportunity) {
      throw new Error(
        `Opportunity ${opportunityData.nameID} was not initialized!`
      );
    }

    for (const user of opportunityData.memberUsers) {
      await this.addUserToOpportunity(user, opportunityData.nameID);
    }
    await this.populateCommunityRoles(createdOpportunity?.id, opportunityData);

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
    references.addReference(
      opportunityData.ref1Name,
      opportunityData.ref1Value,
      opportunityData.ref1Description
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

    if (!updatedOpportunity) {
      throw new Error(
        `Opportunity ${opportunityData.nameID} was not initialized!`
      );
    }

    for (const user of opportunityData.memberUsers) {
      await this.addUserToOpportunity(user, opportunityData.nameID);
    }
    await this.populateCommunityRoles(updatedOpportunity?.id, opportunityData);

    this.logger.info(`...updated opportunity: ${opportunityData.displayName}`);
  }

  async populateCommunityRoles(
    opportunityID: string,
    opportunityData: Opportunity
  ) {
    const opportunity = await this.client.opportunityByNameID(
      this.hubID,
      opportunityID
    );

    const communityID = opportunity?.community?.id;
    if (!communityID) {
      throw new Error(
        `Opportunity ${opportunity?.displayName} doesn't have a community with ID ${communityID}`
      );
    }

    const existingLeadOrgs = opportunity?.community?.leadOrganizations?.map(
      org => org.nameID
    );
    const leadOrgsToAdd = contributorsToAdd(
      existingLeadOrgs,
      opportunityData.leadOrganizations
    );
    await assignOrgsAsLead(
      this.client,
      this.logger,
      communityID,
      leadOrgsToAdd
    );

    const existingMemberOrgs = opportunity?.community?.memberOrganizations?.map(
      org => org.nameID
    );
    const memberOrgsToAdd = contributorsToAdd(
      existingMemberOrgs,
      opportunityData.memberOrganizations
    );
    await assignOrgsAsMember(
      this.client,
      this.logger,
      communityID,
      memberOrgsToAdd
    );

    const existingLeadUsers = opportunity?.community?.leadUsers?.map(
      user => user.nameID
    );
    const leadUsersToAdd = contributorsToAdd(
      existingLeadUsers,
      opportunityData.leadUsers
    );
    await assignUserAsLead(
      this.client,
      this.logger,
      communityID,
      leadUsersToAdd
    );
  }

  private async addUserToOpportunity(
    userNameId: string,
    opportunityNameID: string
  ) {
    const userInfo = await this.client.user(userNameId);
    if (!userInfo) throw new Error(`Unable to locate user: ${userNameId}`);
    await this.client.addUserToOpportunity(
      this.hubID,
      opportunityNameID,
      userInfo.nameID
    );
  }
}
