import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { ReferencesCreator } from '../utils/references-creator';
import { AbstractPopulator } from './abstract-populator';
import {
  assignOrgsAsLead,
  assignOrgsAsMember,
  assignUserAsLead,
  contributorsToAdd,
} from '../utils';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { Subsubspace } from '../inputModels';
import { UpdateSpaceInput } from '@alkemio/client-lib';
import { SpaceProfileCommunity } from '../apiModels/spaceProfileCommunity';

export class SubsubspacePopulator extends AbstractPopulator {
  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing subsubspaces');

    const subsubspacesData = this.data.subsubspaces();

    if (subsubspacesData.length === 0) {
      this.logger.warn('No subsubspaces to import!');
      return;
    }

    for (const subsubspaceData of subsubspacesData) {
      if (!subsubspaceData.displayName) {
        // End of valid opportunities
        break;
      }

      // start processing
      this.logger.info(
        `Processing subsubspace: ${subsubspaceData.displayName}....`
      );
      const subsubspaceProfileID = '===> subsubspaceCreation - FULL';
      this.profiler.profile(subsubspaceProfileID);

      if (!subsubspaceData.parentSpace) {
        this.logger.warn(
          `Skipping subsubspace '${subsubspaceData.displayName}'. Missing subspace '${subsubspaceData.parentSpace}'!`
        );
        continue;
      }

      const existingSubsubspace = await this.client.subsubspaceByNameID(
        this.spaceID,
        subsubspaceData.nameID
      );

      try {
        if (existingSubsubspace) {
          this.logger.info(
            `Subsubspace ${subsubspaceData.displayName} already exists! Updating`
          );
          await this.updateSubsubspace(subsubspaceData, existingSubsubspace);
        } else {
          await this.createSubsubspace(subsubspaceData);
        }
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create/update subsubspace (${subsubspaceData.displayName}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create/update subsubspace: ${e}`);
        }
      } finally {
        this.profiler.profile(subsubspaceProfileID);
      }
    }
  }

  async createSubsubspace(subsubspaceData: Subsubspace) {
    // First need to get the id for the subspace
    const subspace = await this.client.alkemioLibClient.subspaceByNameID(
      this.spaceID,
      subsubspaceData.parentSpace
    );
    if (!subspace) {
      this.logger.error(
        `Could not create subsubspace as could not find subspace with nameID: ${subsubspaceData.nameID}`
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
        `No subspace innovation flow template found in space ${this.spaceID}`
      );
    }
    const innovationFlowTemplate = libraryTemplates[0];

    if (!innovationFlowTemplate)
      throw new Error(
        `No subsubspace innovation flow template found in space ${this.spaceID}`
      );

    const createdSubsubspace =
      await this.client.alkemioLibClient.createSubspace({
        spaceID: subspace.id,
        nameID: subsubspaceData.nameID,
        profileData: {
          displayName: subsubspaceData.displayName,
          description: subsubspaceData.background,
          tagline: subsubspaceData.tagline,
          referencesData: this.getReferences(subsubspaceData),
          location: {
            country: subsubspaceData.country,
            city: subsubspaceData.city,
          },
        },
        context: {
          impact: subsubspaceData.impact,
          who: subsubspaceData.who,
          vision: subsubspaceData.vision,
        },
        tags: subsubspaceData.tags || [],
        collaborationData: {
          innovationFlowTemplateID: innovationFlowTemplate.id,
        },
      });

    if (!createdSubsubspace) {
      throw new Error(
        `Subsubspace ${subsubspaceData.nameID} was not initialized!`
      );
    }

    const subsubspaceWithCommunity = await this.client.subspaceByNameID(
      this.spaceID,
      subsubspaceData.nameID
    );
    if (!subsubspaceWithCommunity) {
      throw new Error(`Subsubspace ${subsubspaceData.nameID} was not found!`);
    }
    await this.populateMembers(subsubspaceWithCommunity, subsubspaceData);
    await this.populateCommunityRoles(
      subsubspaceWithCommunity,
      subsubspaceData
    );

    const visuals = createdSubsubspace?.profile?.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
      visuals,
      subsubspaceData.visualBanner,
      subsubspaceData.visualBackground,
      subsubspaceData.visualAvatar
    );
    this.logger.info(`...added subsubspace: ${subsubspaceData.displayName}`);
  }

  private getReferences(subsubspaceData: Subsubspace) {
    const references = new ReferencesCreator();
    references.addReference(
      'video',
      subsubspaceData.refVideo,
      'Video explainer for the subsubspace'
    );
    references.addReference(
      'jitsi',
      subsubspaceData.refJitsi,
      'Jitsi meeting space for the subsubspace'
    );
    references.addReference(
      subsubspaceData.ref1Name,
      subsubspaceData.ref1Value,
      subsubspaceData.ref1Description
    );
    return references.getReferences();
  }

  async updateSubsubspace(
    subsubspaceData: Subsubspace,
    existingSubsubspace: any
  ) {
    const updateData: UpdateSpaceInput = {
      ID: existingSubsubspace.id,
      profileData: {
        displayName: subsubspaceData.displayName,
        description: subsubspaceData.background,
        tagline: subsubspaceData.tagline,
        location: {
          country: subsubspaceData.country,
          city: subsubspaceData.city,
        },
        tagsets: [
          {
            ID: existingSubsubspace.profile.tagset.id,
            tags: subsubspaceData.tags || [],
          },
        ],
      },
      context: {
        impact: subsubspaceData.impact,
        who: subsubspaceData.who,
        vision: subsubspaceData.vision,
      },
    };

    const updatedSubsubspace = await this.client.alkemioLibClient.updateSpace(
      updateData
    );

    const visuals = updatedSubsubspace?.profile.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
      visuals,
      subsubspaceData.visualBanner,
      subsubspaceData.visualBackground,
      subsubspaceData.visualAvatar
    );

    if (!updatedSubsubspace) {
      throw new Error(
        `Subsubspace ${subsubspaceData.nameID} was not initialized!`
      );
    }

    const subsubspaceWithCommunity = await this.client.subspaceByNameID(
      this.spaceID,
      subsubspaceData.nameID
    );

    if (!subsubspaceWithCommunity) {
      throw new Error(`Subsubspace ${subsubspaceData.nameID} was not found!`);
    }

    await this.populateMembers(subsubspaceWithCommunity, subsubspaceData);
    await this.populateCommunityRoles(
      subsubspaceWithCommunity,
      subsubspaceData
    );

    this.logger.info(`...updated subsubspace: ${subsubspaceData.displayName}`);
  }

  async populateMembers(
    subsubspace: SpaceProfileCommunity,
    subsubspaceData: Subsubspace
  ) {
    const community = subsubspace.community;
    if (!community) {
      throw new Error(
        `Subsubspace ${subsubspaceData.displayName} has no community`
      );
    }
    const subspaceMembers = community?.memberUsers || [];
    for (const user of subsubspaceData.memberUsers) {
      this.logger.info(`...adding user to Subsubspace: ${user}`);
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

  async populateCommunityRoles(
    subsubspace: SpaceProfileCommunity,
    subsubspaceData: Subsubspace
  ) {
    const communityID = subsubspace.community.id;
    const existingLeadOrgs = subsubspace?.community?.leadOrganizations?.map(
      org => org.nameID
    );
    const leadOrgsToAdd = contributorsToAdd(
      existingLeadOrgs,
      subsubspaceData.leadOrganizations
    );
    await assignOrgsAsLead(
      this.client,
      this.logger,
      communityID,
      leadOrgsToAdd
    );

    const existingMemberOrgs = subsubspace?.community?.memberOrganizations?.map(
      org => org.nameID
    );
    const memberOrgsToAdd = contributorsToAdd(
      existingMemberOrgs,
      subsubspaceData.memberOrganizations
    );
    await assignOrgsAsMember(
      this.client,
      this.logger,
      communityID,
      memberOrgsToAdd
    );

    const existingLeadUsers = subsubspace?.community?.leadUsers?.map(
      user => user.nameID
    );
    const leadUsersToAdd = contributorsToAdd(
      existingLeadUsers,
      subsubspaceData.leadUsers
    );
    await assignUserAsLead(
      this.client,
      this.logger,
      communityID,
      leadUsersToAdd
    );
  }
}
