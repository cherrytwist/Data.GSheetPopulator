import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Opportunity } from '../inputModels';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import {
  assignOrgsAsLead,
  assignOrgsAsMember,
  assignUserAsLead,
  contributorsToAdd,
} from '../utils';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { UpdateOpportunityInput } from '@alkemio/client-lib';

export class OpportunityPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioPopulatorClient,
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

      const existingOpportunity = await this.client.getOpportunityByNameID(
        this.spaceID,
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
    const challenge = await this.client.alkemioLibClient.challengeByNameID(
      this.spaceID,
      opportunityData.challenge
    );
    if (!challenge) {
      this.logger.error(
        `Could not create opportunity as could not find challenge with nameID: ${opportunityData.nameID}`
      );
      return;
    }
    const spaceInfo = await this.client.alkemioLibClient.spaceInfo(
      this.spaceID
    );
    const libraryTemplates: { id: string }[] =
      spaceInfo?.account.library?.innovationFlowTemplates || [];
    if (libraryTemplates.length === 0) {
      throw new Error(
        `No challenge innovation flow template found in space ${this.spaceID}`
      );
    }
    const innovationFlowTemplate = libraryTemplates[0];

    if (!innovationFlowTemplate)
      throw new Error(
        `No opportunity innovation flow template found in space ${this.spaceID}`
      );

    const createdOpportunity =
      await this.client.alkemioLibClient.createOpportunity({
        challengeID: challenge.id,
        nameID: opportunityData.nameID,
        profileData: {
          displayName: opportunityData.displayName,
          description: opportunityData.background,
          tagline: opportunityData.tagline,
          referencesData: this.getReferences(opportunityData),
          location: {
            country: opportunityData.country,
            city: opportunityData.city,
          },
        },
        context: {
          impact: opportunityData.impact,
          who: opportunityData.who,
          vision: opportunityData.vision,
        },
        tags: opportunityData.tags || [],
        collaborationData: {
          innovationFlowTemplateID: innovationFlowTemplate.id,
        },
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

    const visuals = createdOpportunity?.profile?.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
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
    const updateData: UpdateOpportunityInput = {
      ID: existingOpportunity.id,
      profileData: {
        displayName: opportunityData.displayName,
        description: opportunityData.background,
        tagline: opportunityData.tagline,
        location: {
          country: opportunityData.country,
          city: opportunityData.city,
        },
        tagsets: [
          {
            ID: existingOpportunity.profile.tagset.id,
            tags: opportunityData.tags || [],
          },
        ],
      },
      context: {
        impact: opportunityData.impact,
        who: opportunityData.who,
        vision: opportunityData.vision,
      },
    };

    const updatedOpportunity =
      await this.client.alkemioLibClient.updateOpportunity(updateData);

    const visuals = updatedOpportunity?.profile.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
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
    const opportunity = await this.client.getOpportunityByNameIdOrFail(
      this.spaceID,
      opportunityID
    );

    const communityID = opportunity?.community?.id;
    if (!communityID) {
      throw new Error(
        `Opportunity ${opportunity?.profile.displayName} doesn't have a community with ID ${communityID}`
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
    const userInfo = await this.client.alkemioLibClient.user(userNameId);
    if (!userInfo) throw new Error(`Unable to locate user: ${userNameId}`);
    const opportunity = await this.client.getOpportunityByNameIdOrFail(
      this.spaceID,
      opportunityNameID
    );
    await this.client.alkemioLibClient.addUserToCommunity(
      userInfo.id,
      opportunity.community.id
    );
  }
}
