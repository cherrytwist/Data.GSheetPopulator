import { assignUserAsLead } from '../utils';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Space } from '../models/hub';
import { AbstractPopulator } from './abstract-populator';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { assignUserAsMember } from '../utils/assign-user-as-member';
import { CreateHubInput, UpdateTagsetInput } from '@alkemio/client-lib';

export class SpacePopulator extends AbstractPopulator {
  private allowCreation: boolean;

  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger,
    allowCreation = false
  ) {
    super(client, data, logger, profiler);
    this.name = 'hub-populator';
    this.allowCreation = allowCreation;
  }

  async populate() {
    const hubs = this.data.hubs();
    if (hubs.length === 0) {
      this.logger.warn('No Spaces to import!');
      return;
    }

    for (const hubData of hubs) {
      if (!hubData.displayName) {
        // End of valid hubs
        return;
      }

      // start processing
      this.logger.info(`Processing hub: ${hubData.nameID}....`);
      const hubProfileID = '===> hubUpdate - FULL';
      this.profiler.profile(hubProfileID);

      const spaceExists = await this.client.alkemioLibClient.spaceExists(
        hubData.nameID
      );

      try {
        if (!spaceExists) {
          if (this.allowCreation) {
            await this.createSpace(hubData);
          } else {
            const msg = `Specified Space does not exist: ${hubData.nameID}`;
            this.logger.error(msg);
            throw new Error(msg);
          }
        }
        await this.updateSpace(hubData);

        await this.client.alkemioLibClient.updateReferencesOnSpace(
          hubData.nameID,
          [
            {
              name: 'website',
              uri: hubData.refWebsite,
              description: 'The hub website',
            },
            {
              name: 'repo',
              uri: hubData.refRepo,
              description: 'The hub repository',
            },
          ]
        );
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to update hub (${hubData.nameID}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to update hub (${hubData.nameID}): ${e.message}`
          );
        }
        throw e;
      } finally {
        this.profiler.profile(hubProfileID);
      }
    }
  }

  async updateSpace(hubData: Space) {
    const hubProfileData = await this.client.sdkClient.hubProfile({
      id: hubData.nameID,
    });
    const hubProfileTagset = hubProfileData.data.hub.profile.tagset;
    const tagsetsData: UpdateTagsetInput[] = [];
    if (hubProfileTagset) {
      tagsetsData.push({
        ID: hubProfileTagset.id,
        tags: hubData.tags || [],
      });
    }
    const updatedSpace = await this.client.alkemioLibClient.updateSpace({
      ID: hubData.nameID,
      hostID: hubData.host,
      profileData: {
        displayName: hubData.displayName,
        description: hubData.background,
        tagline: hubData.tagline,
        tagsets: tagsetsData,
      },
      context: {
        impact: hubData.impact,
        vision: hubData.vision,
        who: hubData.who,
      },
    });

    const visuals = updatedSpace?.profile?.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
      visuals,
      hubData.visualBanner,
      hubData.visualBackground,
      hubData.visualAvatar
    );

    if (updatedSpace?.community?.id) {
      await assignUserAsMember(
        this.client,
        this.logger,
        updatedSpace.community.id,
        hubData.leadUsers
      );
      await assignUserAsLead(
        this.client,
        this.logger,
        updatedSpace.community.id,
        hubData.leadUsers
      );
    }

    this.logger.info(`Space updated: ${hubData.displayName}`);
  }

  async createSpace(hubData: Space) {
    const input: CreateHubInput = {
      nameID: hubData.nameID,
      hostID: hubData.host,
      profileData: {
        displayName: hubData.displayName,
      },
    };
    await this.client.alkemioLibClient.createSpace(input);

    this.logger.info(`Space created: ${hubData.displayName}`);
  }
}
