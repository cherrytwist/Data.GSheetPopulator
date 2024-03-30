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
import { AlkemioClient, AlkemioClientConfig } from '@alkemio/client-lib';
import { OpportunityApi } from '../apiModels/opportunityApi';

export class AlkemioPopulatorClient {
  public config!: AlkemioClientConfig;
  public sdkClient!: Sdk;
  public alkemioLibClient!: AlkemioClient;
  private logger: Logger;
  private opportunitiesCache: Map<string, any> = new Map();

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
    const spaceResponse = await this.sdkClient.spaceCallouts({ id: spaceID });
    return spaceResponse.data.space;
  }

  async challengeCallouts(spaceID: string, challengeID: string) {
    const spaceResponse = await this.sdkClient.challengeCallouts({
      spaceID,
      challengeID,
    });
    return spaceResponse.data.space.challenge;
  }

  async getOpportunityByNameIdOrFail(
    spaceID: string,
    opportunityNameID: string
  ): Promise<OpportunityApi> {
    const opportunity = await this.getOpportunityByNameID(
      spaceID,
      opportunityNameID
    );
    if (!opportunity) {
      throw new Error(`Opportunity ${opportunityNameID} not found`);
    }
    return opportunity;
  }

  async getOpportunityByNameID(
    spaceID: string,
    opportunityNameID: string
  ): Promise<OpportunityApi | undefined> {
    let cachedOpportunity = this.opportunitiesCache.get(opportunityNameID);
    if (!cachedOpportunity) {
      const response = await this.sdkClient.opportunitiesInSpace({
        spaceID,
      });
      const challenges = response.data.space.challenges || [];
      for (const challenge of challenges) {
        const opportunities = challenge.opportunities || [];
        for (const opportunity of opportunities) {
          const key = opportunity.nameID;
          this.opportunitiesCache.set(key, opportunity);
        }
      }
      cachedOpportunity = this.opportunitiesCache.get(opportunityNameID);
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

  async challengeByNameID(spaceNameID: string, challengeNameID: string) {
    try {
      const response = await this.sdkClient.challengeDetails({
        spaceID: spaceNameID,
        challengeID: challengeNameID,
      });

      if (!response) return;
      return response.data?.space.challenge;
    } catch (error) {
      return;
    }
  }
}
