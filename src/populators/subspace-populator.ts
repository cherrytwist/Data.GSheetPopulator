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
    this.logger.info('Processing spaces');
    const spacesData = this.data.subspaces();

    if (spacesData.length === 0) {
      this.logger.warn('No spaces to import!');
      return;
    }

    this.organizations =
      ((await this.client.alkemioLibClient.organizations()) ||
        []) as Organization[];

    // Iterate over the rows
    for (const subspaceData of spacesData) {
      if (!subspaceData.displayName) {
        // End of valid spaces
        break;
      }

      if (!subspaceData.process) {
        // Do not process this space
        break;
      }

      // start processing
      this.logger.info(`Processing space: ${subspaceData.nameID}....`);
      const spaceProfileID = '===> spaceCreation - FULL';
      this.profiler.profile(spaceProfileID);

      const existingSpace = await this.client.subspaceByNameID(
        this.spaceID,
        subspaceData.nameID
      );

      if (existingSpace) {
        this.logger.info(
          `Space ${subspaceData.displayName} already exists! Updating`
        );
        await this.updateSpaceContext(existingSpace, subspaceData);
      } else {
        await this.createSubspace(subspaceData);
      }
      this.profiler.profile(spaceProfileID);
    }
  }

  async createSubspace(spaceData: Subspace) {
    try {
      const spaceInfo = await this.client.alkemioLibClient.spaceInfo(
        this.spaceID
      );
      const libraryTemplates: { id: string }[] =
        spaceInfo?.account.library?.innovationFlowTemplates || [];
      if (libraryTemplates.length === 0) {
        throw new Error(
          `No space innovation flow template found in space ${this.spaceID}`
        );
      }
      const innovationFlowTemplate = libraryTemplates[0];

      const createdSpace = await this.client.alkemioLibClient.createSubspace({
        spaceID: this.spaceID,
        nameID: spaceData.nameID,
        profileData: {
          displayName: spaceData.displayName,
          tagline: spaceData.tagline,
          description: spaceData.background,
          location: {
            country: spaceData.country,
            city: spaceData.city,
          },
          referencesData: this.getReferences(spaceData),
        },
        context: {
          vision: spaceData.vision,
          impact: spaceData.impact,
          who: spaceData.who,
        },
        tags: spaceData.tags || [],
        collaborationData: {
          innovationFlowTemplateID: innovationFlowTemplate.id,
        },
      });
      this.logger.info(`....created: ${spaceData.displayName}`);

      const visuals = createdSpace?.profile?.visuals || [];
      await this.client.updateVisualsOnJourneyProfile(
        visuals,
        spaceData.visualBanner,
        spaceData.visualBackground,
        spaceData.visualAvatar
      );

      if (!createdSpace) {
        throw new Error(`Space ${spaceData.nameID} was not initialized!`);
      }

      await this.populateMembers(spaceData.nameID, spaceData);
      await this.populateCommunityRoles(createdSpace?.id, spaceData);
    } catch (e: any) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to create space (${spaceData.displayName}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to create space (${spaceData.displayName}): ${e.message}`
        );
      }
    }
  }

  async populateMembers(subspaceNameID: string, spaceData: Subspace) {
    const spaceCommunityDetails =
      await this.client.sdkClient.subspaceProfileCommunity({
        spaceID: this.spaceID,
        subspaceID: subspaceNameID,
      });
    const community = spaceCommunityDetails?.data.space.subspace.community;
    if (!community) {
      throw new Error(`Space ${spaceData.displayName} has no community`);
    }
    const spaceMembers = community?.memberUsers || [];
    for (const user of spaceData.memberUsers) {
      this.logger.info(`...adding user to Space: ${user}`);
      const existingMember = spaceMembers.find(
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

  async populateCommunityRoles(spaceID: string, spaceData: Subspace) {
    const space = await this.client.alkemioLibClient.subspaceByNameID(
      this.spaceID,
      spaceID
    );

    const communityID = space?.community?.id;
    if (!communityID) {
      throw new Error(
        `Space ${space?.profile.displayName} doesn't have a community with ID ${communityID}`
      );
    }

    const existingLeadOrgs = space?.community?.leadOrganizations?.map(
      org => org.nameID
    );
    const leadOrgsToAdd = contributorsToAdd(
      existingLeadOrgs,
      spaceData.leadOrganizations
    );
    await assignOrgsAsLead(
      this.client,
      this.logger,
      communityID,
      leadOrgsToAdd
    );

    const existingMemberOrgs = space?.community?.memberOrganizations?.map(
      org => org.nameID
    );
    const memberOrgsToAdd = contributorsToAdd(
      existingMemberOrgs,
      spaceData.memberOrganizations
    );
    await assignOrgsAsMember(
      this.client,
      this.logger,
      communityID,
      memberOrgsToAdd
    );

    const existingLeadUsers = space?.community?.leadUsers?.map(
      user => user.nameID
    );
    const leadUsersToAdd = contributorsToAdd(
      existingLeadUsers,
      spaceData.leadUsers
    );
    await assignUserAsLead(
      this.client,
      this.logger,
      communityID,
      leadUsersToAdd
    );
  }

  // Load users from a particular googlesheet
  async updateSpaceContext(space: any, spaceData: Subspace) {
    try {
      const tagsetUpdateInput: UpdateTagsetInput[] = [
        {
          ID: space.profile.tagset.id,
          tags: spaceData.tags || [],
        },
      ];
      const updateSpaceInput: UpdateSpaceInput = {
        ID: space.id,
        profileData: {
          displayName: spaceData.displayName,
          tagline: spaceData.tagline,
          description: spaceData.background,
          location: {
            country: spaceData.country,
            city: spaceData.city,
          },
          tagsets: tagsetUpdateInput,
        },
        context: {
          vision: spaceData.vision,
          impact: spaceData.impact,
          who: spaceData.who,
        },
      };
      const updatedSpace = await this.client.alkemioLibClient.updateSpace(
        updateSpaceInput
      );

      const visuals = updatedSpace?.profile?.visuals || [];
      await this.client.updateVisualsOnJourneyProfile(
        visuals,
        spaceData.visualBanner,
        spaceData.visualBackground,
        spaceData.visualAvatar
      );

      await this.populateMembers(spaceData.nameID, spaceData);
      await this.populateCommunityRoles(space.id, spaceData);

      this.logger.info(`....updated: ${spaceData.displayName}`);
    } catch (e: any) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to update space (${spaceData.displayName}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to update space (${spaceData.displayName}): ${e.message}`
        );
      }
    }
  }

  private getReferences(subspaceData: Subspace) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      subspaceData.refVideo,
      'Video explainer for the space'
    );
    references.addReference(
      'jitsi',
      subspaceData.refJitsi,
      'Jitsi meeting space for the space'
    );
    references.addReference(
      subspaceData.ref1Name,
      subspaceData.ref1Value,
      subspaceData.ref1Description
    );
    return references.getReferences();
  }
}
