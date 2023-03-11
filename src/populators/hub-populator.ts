import { assignUserAsLead } from '../utils';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Hub } from '../models/hub';
import { AbstractPopulator } from './abstract-populator';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { assignUserAsMember } from '../utils/assign-user-as-member';
import { CreateHubInput, UpdateTagsetInput } from '@alkemio/client-lib';

export class HubPopulator extends AbstractPopulator {
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
      this.logger.warn('No Hubs to import!');
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

      const hubExists = await this.client.alkemioLibClient.hubExists(
        hubData.nameID
      );

      try {
        if (!hubExists) {
          if (this.allowCreation) {
            await this.createHub(hubData);
          } else {
            const msg = `Specified Hub does not exist: ${hubData.nameID}`;
            this.logger.error(msg);
            throw new Error(msg);
          }
        }
        await this.updateHub(hubData);

        await this.client.alkemioLibClient.updateReferencesOnHub(
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

  async updateHub(hubData: Hub) {
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
    const updatedHub = await this.client.alkemioLibClient.updateHub({
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

    const visuals = updatedHub?.profile?.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
      visuals,
      hubData.visualBanner,
      hubData.visualBackground,
      hubData.visualAvatar
    );

    if (updatedHub?.community?.id) {
      await assignUserAsMember(
        this.client,
        this.logger,
        updatedHub.community.id,
        hubData.leadUsers
      );
      await assignUserAsLead(
        this.client,
        this.logger,
        updatedHub.community.id,
        hubData.leadUsers
      );
    }

    this.logger.info(`Hub updated: ${hubData.displayName}`);
  }

  async createHub(hubData: Hub) {
    const input: CreateHubInput = {
      nameID: hubData.nameID,
      hostID: hubData.host,
      profileData: {
        displayName: hubData.displayName,
      },
    };
    await this.client.alkemioLibClient.createHub(input);

    this.logger.info(`Hub created: ${hubData.displayName}`);
  }
}
