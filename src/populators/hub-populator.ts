import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Hub } from '../models/hub';
import { AbstractPopulator } from './abstract-populator';

export class HubPopulator extends AbstractPopulator {
  private allowCreation: boolean;

  constructor(
    client: AlkemioClient,
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

      const hubExists = await this.client.hubExists(hubData.nameID);

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

        await this.client.updateReferencesOnHub(hubData.nameID, [
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
        ]);
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
    const updatedHub = await this.client.updateHub({
      ID: hubData.nameID,
      displayName: hubData.displayName,
      hostID: hubData.host,
      context: {
        background: hubData.background,
        impact: hubData.impact,
        tagline: hubData.tagline,
        vision: hubData.vision,
        who: hubData.who,
      },
      tags: hubData.tags || [],
    });

    const visuals = updatedHub?.context?.visuals || [];
    await this.client.updateVisualsOnContext(
      visuals,
      hubData.visualBanner,
      hubData.visualBackground,
      hubData.visualAvatar
    );

    this.logger.info(`Hub updated: ${hubData.displayName}`);
  }

  async createHub(hubData: Hub) {
    await this.client.createHub({
      nameID: hubData.nameID,
      displayName: hubData.displayName,
      hostID: hubData.host,
    });

    this.logger.info(`Hub created: ${hubData.displayName}`);
  }
}
