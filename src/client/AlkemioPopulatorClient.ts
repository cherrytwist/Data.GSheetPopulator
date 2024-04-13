/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request';
import {
  Sdk,
  getSdk,
  CreateCalloutOnCollaborationInput,
  CalloutState,
  CalloutType,
  CalloutVisibility,
  UpdateCalloutVisibilityInput,
  UpdateCalloutInput,
  UpdatePostInput,
} from '../generated/graphql';
import { Logger } from 'winston';
import {
  AlkemioClient,
  AlkemioClientConfig,
  CommunityRole,
} from '@alkemio/client-lib';
import { SpaceProfile } from '../apiModels/spaceProfile';
import { SpaceProfileCommunity } from '../apiModels/spaceProfileCommunity';
import { SpaceCollaboration } from '../apiModels/spaceCollaboration';

export class AlkemioPopulatorClient {
  public config!: AlkemioClientConfig;
  public sdkClient!: Sdk;
  public alkemioLibClient!: AlkemioClient;
  private logger: Logger;
  private subsubspacesCache: Map<string, any> = new Map();

  constructor(config: AlkemioClientConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
    this.logger.info(`Alkemio server: ${config.apiEndpointPrivateGraphql}`);
  }

  async initialise() {
    try {
      this.alkemioLibClient = new AlkemioClient(this.config);
      await this.alkemioLibClient.enableAuthentication();
      const apiToken = this.alkemioLibClient.apiToken;

      this.logger.info(`API token: ${apiToken}`);
      const client = new GraphQLClient(this.config.apiEndpointPrivateGraphql, {
        headers: {
          authorization: `Bearer ${apiToken}`,
        },
      });
      this.sdkClient = getSdk(client);
    } catch (error) {
      throw new Error(`Unable to create client for Alkemio endpoint: ${error}`);
    }
  }

  async logUser() {
    const userResponse = await this.sdkClient.me();
    this.logger.info(
      `Authenticated user: '${userResponse.data.me.user?.profile.displayName}'`
    );
  }

  async validateConnection() {
    return await this.alkemioLibClient.validateConnection();
  }

  async spaceCallouts(spaceID: string) {
    const spaceResponse = await this.sdkClient.spaceCollaboration({
      id: spaceID,
    });
    return spaceResponse.data.space;
  }

  async subspaceCallouts(
    spaceID: string,
    subspaceID: string
  ): Promise<SpaceCollaboration> {
    const spaceResponse = await this.sdkClient.subspaceCollaboration({
      spaceID,
      subspaceID,
    });
    const subspaceResult = spaceResponse.data.space.subspace;
    const spaceCollaboration: SpaceCollaboration = {
      collaboration: {
        id: subspaceResult.collaboration?.id || '',
        callouts: subspaceResult.collaboration.callouts,
      },
    };
    if (!spaceCollaboration) {
      throw new Error(
        `Subspace ${subspaceID} in space ${spaceID} has no collaboration`
      );
    }
    return spaceCollaboration;
  }

  async assignCommunityRoleToUser(
    userID: string,
    communityID: string,
    role: CommunityRole
  ) {
    const { data } = await this.sdkClient.assignCommunityRoleToUser({
      input: {
        role: role,
        userID: userID,
        communityID: communityID,
      },
    });

    return data?.assignCommunityRoleToUser;
  }

  async assignCommunityRoleToOrg(
    organizationID: string,
    communityID: string,
    role: CommunityRole
  ) {
    const { data } = await this.sdkClient.assignCommunityRoleToOrganization({
      input: {
        role: role,
        organizationID: organizationID,
        communityID: communityID,
      },
    });

    return data?.assignCommunityRoleToOrganization;
  }

  async getSubsubspaceByNameIdOrFail(
    spaceID: string,
    opportunityNameID: string
  ): Promise<SpaceProfile> {
    const subsubspace = await this.subsubspaceByNameID(
      spaceID,
      opportunityNameID
    );
    if (!subsubspace) {
      throw new Error(`Subsubspace ${opportunityNameID} not found`);
    }
    return subsubspace;
  }

  async subsubspaceByNameID(
    spaceID: string,
    subsubspaceNameID: string
  ): Promise<SpaceProfileCommunity | undefined> {
    let cachedOpportunity = this.subsubspacesCache.get(subsubspaceNameID);
    if (!cachedOpportunity) {
      const response = await this.sdkClient.subsubspacesInSpace({
        spaceID,
      });
      const subspaces = response.data.space.subspaces || [];
      for (const subspace of subspaces) {
        const subsubspaces = subspace.subspaces || [];
        for (const subsubspace of subsubspaces) {
          const key = subsubspace.nameID;
          this.subsubspacesCache.set(key, subsubspace);
        }
      }
      cachedOpportunity = this.subsubspacesCache.get(subsubspaceNameID);
    }

    if (!cachedOpportunity) {
      return undefined;
    }

    return cachedOpportunity;
  }

  async createCalloutOnCollaboration(
    collaborationID: string,
    displayName: string,
    nameID: string,
    description: string,
    type: CalloutType,
    state: CalloutState
  ) {
    const calloutData: CreateCalloutOnCollaborationInput = {
      nameID,
      collaborationID,
      type,
      framing: {
        profile: {
          displayName,
          description,
        },
      },
      contributionPolicy: {
        state,
      },
      contributionDefaults: {
        postDescription: 'test',
      },
    };
    const { data } = await this.sdkClient.createCalloutOnCollaboration({
      data: calloutData,
    });

    return data?.createCalloutOnCollaboration;
  }

  async updateCalloutVisibility(
    calloutID: string,
    visibility: CalloutVisibility
  ) {
    const calloutData: UpdateCalloutVisibilityInput = {
      calloutID,
      visibility,
    };
    const { data } = await this.sdkClient.updateCalloutVisibility({
      calloutData: calloutData,
    });
    return data.updateCalloutVisibility;
  }

  async updateCallout(
    calloutID: string,
    description: string,
    displayName: string
  ) {
    const calloutData: UpdateCalloutInput = {
      ID: calloutID,
      framing: {
        profile: {
          description,
          displayName,
        },
      },
    };
    const { data } = await this.sdkClient.updateCallout({
      calloutData: calloutData,
    });
    return data.updateCallout;
  }

  async updatePost(postID: string, description: string, displayName: string) {
    const postData: UpdatePostInput = {
      ID: postID,
      profileData: {
        description,
        displayName,
      },
    };
    const { data } = await this.sdkClient.updatePost({
      postData: postData,
    });
    return data.updatePost;
  }

  private async updateVisualByName(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visuals: any[],
    visualName: string,
    uri: string
  ) {
    const visual = visuals.find(v => v.name === visualName);
    if (visual) {
      return await this.alkemioLibClient.updateVisual(visual.id, uri);
    }
  }

  async updateVisualsOnJourneyProfile(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visuals: any[],
    banner: string,
    background: string,
    avatar: string
  ) {
    await this.updateVisualByName(visuals, 'banner', banner);
    await this.updateVisualByName(visuals, 'bannerNarrow', background);
    await this.updateVisualByName(visuals, 'avatar', avatar);
  }

  async user(userID: string) {
    try {
      const response = await this.sdkClient.userDetails({
        userID: userID,
      });

      if (!response) return;
      return response.data?.user;
    } catch (error) {
      return;
    }
  }

  async subspaceByNameID(
    spaceNameID: string,
    subspaceNameID: string
  ): Promise<SpaceProfileCommunity | undefined> {
    try {
      const response = await this.sdkClient.subspaceProfileCommunity({
        spaceID: spaceNameID,
        subspaceID: subspaceNameID,
      });

      return response.data?.space.subspace;
    } catch (error) {
      return undefined;
    }
  }

  async subspaceByNameIDOrFail(
    spaceNameID: string,
    subspaceNameID: string
  ): Promise<SpaceProfileCommunity> {
    const subspace = await this.subspaceByNameID(spaceNameID, subspaceNameID);
    if (!subspace) {
      throw new Error(`Subspace ${spaceNameID} ${spaceNameID} not found`);
    }
    return subspace;
  }
}
