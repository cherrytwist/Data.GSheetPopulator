import {
  Organization,
  UpdateSpaceInput,
  UpdateTagsetInput,
} from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Subspace } from '../inputModels';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import {
  assignOrgsAsLead,
  assignOrgsAsMember,
  assignUserAsLead,
  contributorsToAdd,
} from '../utils';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';

export class SubspacePopulator extends AbstractPopulator {
  private organizations: Organization[] = [];

  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing subspaces');
    const subspacesData = this.data.subspaces();

    if (subspacesData.length === 0) {
      this.logger.warn('No subspaces to import!');
      return;
    }

    this.organizations =
      ((await this.client.alkemioLibClient.organizations()) ||
        []) as Organization[];

    // Iterate over the rows
    for (const subspaceData of subspacesData) {
      if (!subspaceData.displayName) {
        // End of valid subspaces
        break;
      }

      if (!subspaceData.process) {
        // Do not process this subspace
        break;
      }

      // start processing
      this.logger.info(`Processing subspace: ${subspaceData.nameID}....`);
      const subspaceProfileID = '===> subspaceCreation - FULL';
      this.profiler.profile(subspaceProfileID);

      const existingSpace = await this.client.subspaceByNameID(
        this.spaceID,
        subspaceData.nameID
      );

      if (existingSpace) {
        this.logger.info(
          `Subspace ${subspaceData.displayName} already exists! Updating`
        );
        await this.updateSubspaceContext(existingSpace, subspaceData);
      } else {
        await this.createSubspace(subspaceData);
      }
      this.profiler.profile(subspaceProfileID);
    }
  }

  async createSubspace(subspaceData: Subspace) {
    try {
      const spaceInfo = await this.client.alkemioLibClient.spaceInfo(
        this.spaceID
      );
      const libraryTemplates: { id: string }[] =
        spaceInfo?.account.library?.innovationFlowTemplates || [];
      if (libraryTemplates.length === 0) {
        throw new Error(
          `No innovation flow template found in subspace ${this.spaceID}`
        );
      }
      const innovationFlowTemplate = libraryTemplates[0];

      const createdSpace = await this.client.alkemioLibClient.createSubspace({
        spaceID: this.spaceID,
        nameID: subspaceData.nameID,
        profileData: {
          displayName: subspaceData.displayName,
          tagline: subspaceData.tagline,
          description: subspaceData.background,
          location: {
            country: subspaceData.country,
            city: subspaceData.city,
          },
          referencesData: this.getReferences(subspaceData),
        },
        context: {
          vision: subspaceData.vision,
          impact: subspaceData.impact,
          who: subspaceData.who,
        },
        tags: subspaceData.tags || [],
        collaborationData: {
          innovationFlowTemplateID: innovationFlowTemplate.id,
        },
      });
      this.logger.info(`....created: ${subspaceData.displayName}`);

      const visuals = createdSpace?.profile?.visuals || [];
      await this.client.updateVisualsOnJourneyProfile(
        visuals,
        subspaceData.visualBanner,
        subspaceData.visualBackground,
        subspaceData.visualAvatar
      );

      if (!createdSpace) {
        throw new Error(`Space ${subspaceData.nameID} was not initialized!`);
      }

      await this.populateMembers(subspaceData.nameID, subspaceData);
      await this.populateCommunityRoles(createdSpace?.id, subspaceData);
    } catch (e: any) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to create subspace (${subspaceData.displayName}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to create subspace (${subspaceData.displayName}): ${e.message}`
        );
      }
    }
  }

  async populateMembers(subspaceNameID: string, subspaceData: Subspace) {
    const subspaceCommunityDetails =
      await this.client.sdkClient.subspaceProfileCommunity({
        spaceID: this.spaceID,
        subspaceID: subspaceNameID,
      });
    const community = subspaceCommunityDetails?.data.space.subspace.community;
    const subspaceMembers = community?.memberUsers || [];
    for (const user of subspaceData.memberUsers) {
      this.logger.info(`...adding user to Subspace: ${user}`);
      const existingMember = subspaceMembers.find(
        member => member.nameID === user.toLowerCase()
      );
      if (!existingMember) {
        const userInfo = await this.client.alkemioLibClient.user(user);
        if (!userInfo) throw new Error(`Unable to locate user: ${user}`);
        await this.client.alkemioLibClient.addUserToCommunity(
          userInfo.nameID,
          community.id
        );
      }
    }
  }

  async populateCommunityRoles(subspaceID: string, subspaceData: Subspace) {
    const subspace = await this.client.alkemioLibClient.subspaceByNameID(
      this.spaceID,
      subspaceID
    );

    const communityID = subspace?.community?.id;
    if (!communityID) {
      throw new Error(
        `Space ${subspace?.profile.displayName} doesn't have a community with ID ${communityID}`
      );
    }

    const existingLeadOrgs = subspace?.community?.leadOrganizations?.map(
      org => org.nameID
    );
    const leadOrgsToAdd = contributorsToAdd(
      existingLeadOrgs,
      subspaceData.leadOrganizations
    );
    await assignOrgsAsLead(
      this.client,
      this.logger,
      communityID,
      leadOrgsToAdd
    );

    const existingMemberOrgs = subspace?.community?.memberOrganizations?.map(
      org => org.nameID
    );
    const memberOrgsToAdd = contributorsToAdd(
      existingMemberOrgs,
      subspaceData.memberOrganizations
    );
    await assignOrgsAsMember(
      this.client,
      this.logger,
      communityID,
      memberOrgsToAdd
    );

    const existingLeadUsers = subspace?.community?.leadUsers?.map(
      user => user.nameID
    );
    const leadUsersToAdd = contributorsToAdd(
      existingLeadUsers,
      subspaceData.leadUsers
    );
    await assignUserAsLead(
      this.client,
      this.logger,
      communityID,
      leadUsersToAdd
    );
  }

  // Load users from a particular googlesheet
  async updateSubspaceContext(subspace: any, subspaceData: Subspace) {
    try {
      const tagsetUpdateInput: UpdateTagsetInput[] = [
        {
          ID: subspace.profile.tagset.id,
          tags: subspaceData.tags || [],
        },
      ];
      const updateSpaceInput: UpdateSpaceInput = {
        ID: subspace.id,
        profileData: {
          displayName: subspaceData.displayName,
          tagline: subspaceData.tagline,
          description: subspaceData.background,
          location: {
            country: subspaceData.country,
            city: subspaceData.city,
          },
          tagsets: tagsetUpdateInput,
        },
        context: {
          vision: subspaceData.vision,
          impact: subspaceData.impact,
          who: subspaceData.who,
        },
      };
      const updatedSpace = await this.client.alkemioLibClient.updateSpace(
        updateSpaceInput
      );

      const visuals = updatedSpace?.profile?.visuals || [];
      await this.client.updateVisualsOnJourneyProfile(
        visuals,
        subspaceData.visualBanner,
        subspaceData.visualBackground,
        subspaceData.visualAvatar
      );

      await this.populateMembers(subspaceData.nameID, subspaceData);
      await this.populateCommunityRoles(subspace.id, subspaceData);

      this.logger.info(`....updated: ${subspaceData.displayName}`);
    } catch (e: any) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to update subspace (${subspaceData.displayName}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to update subspace (${subspaceData.displayName}): ${e.message}`
        );
      }
    }
  }

  private getReferences(subspaceData: Subspace) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      subspaceData.refVideo,
      'Video explainer for the subspace'
    );
    references.addReference(
      'jitsi',
      subspaceData.refJitsi,
      'Jitsi meeting subspace for the subspace'
    );
    references.addReference(
      subspaceData.ref1Name,
      subspaceData.ref1Value,
      subspaceData.ref1Description
    );
    return references.getReferences();
  }
}
