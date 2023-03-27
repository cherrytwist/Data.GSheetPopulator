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
  UpdateAspectInput,
} from '../generated/graphql';
import { Logger } from 'winston';
import {
  AlkemioClient,
  AlkemioClientConfig,
  CreateAspectTemplateInput,
} from '@alkemio/client-lib';

export class AlkemioPopulatorClient {
  public config!: AlkemioClientConfig;
  public sdkClient!: Sdk;
  public alkemioLibClient!: AlkemioClient;
  private logger: Logger;

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
      `Authenticated user: '${userResponse.data.me.profile.displayName}'`
    );
  }

  async validateConnection() {
    return await this.alkemioLibClient.validateConnection();
  }

  async hubCallouts(hubID: string) {
    const hubResponse = await this.sdkClient.hubCallouts({ id: hubID });
    return hubResponse.data.hub;
  }

  async challengeCallouts(hubID: string, challengeID: string) {
    const hubResponse = await this.sdkClient.challengeCallouts({
      hubID,
      challengeID,
    });
    return hubResponse.data.hub.challenge;
  }

  async createCalloutOnCollaboration(
    collaborationID: string,
    displayName: string,
    nameID: string,
    description: string,
    type: CalloutType,
    state: CalloutState
  ) {
    const cardTemplate: CreateAspectTemplateInput = {
      defaultDescription: 'something',
      type: 'test',
      profile: {
        description: 'asdf',
        displayName: 'test',
      },
    };
    const calloutData: CreateCalloutOnCollaborationInput = {
      nameID,
      collaborationID,
      type,
      state,
      profile: {
        displayName,
        description,
      },
      cardTemplate,
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
      profileData: {
        description,
        displayName,
      },
    };
    const { data } = await this.sdkClient.updateCallout({
      calloutData: calloutData,
    });
    return data.updateCallout;
  }

  async updateCard(cardID: string, description: string, displayName: string) {
    const cardData: UpdateAspectInput = {
      ID: cardID,
      profileData: {
        description,
        displayName,
      },
    };
    const { data } = await this.sdkClient.updateCard({
      cardData: cardData,
    });
    return data.updateAspect;
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

  async challengeByNameID(hubNameID: string, challengeNameID: string) {
    try {
      const response = await this.sdkClient.challengeDetails({
        hubID: hubNameID,
        challengeID: challengeNameID,
      });

      if (!response) return;
      return response.data?.hub.challenge;
    } catch (error) {
      return;
    }
  }
}
