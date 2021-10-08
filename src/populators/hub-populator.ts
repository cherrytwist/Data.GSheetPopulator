import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Ecoverse } from '../models/hub';
import { AbstractPopulator } from './abstract-populator';

export class HubPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
    this.name = 'hub-populator';
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

      const hubExists = await this.client.ecoverseExists(hubData.nameID);
      try {
        if (!hubExists) {
          const msg = `Specified Hub does not exist: ${hubData.nameID}`;
          this.logger.error(msg);
          throw new Error(msg);
        }
        await this.updateEcoverse(hubData);

        await this.client.updateReferencesOnEcoverse(hubData.nameID, [
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
      } catch (e) {
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

  async updateEcoverse(hubData: Ecoverse) {
    await this.client.updateEcoverse({
      ID: hubData.nameID,
      displayName: hubData.displayName,
      hostID: hubData.host,
      context: {
        background: hubData.background,
        impact: hubData.impact,
        tagline: hubData.tagline,
        vision: hubData.vision,
        who: hubData.who,
        visual: {
          avatar: hubData.visualAvatar,
          background: hubData.visualBackground,
          banner: hubData.visualBanner,
        },
      },
      tags: hubData.tags || [],
      authorizationPolicy: {
        anonymousReadAccess: hubData.anonymousReadAccess,
      },
    });

    this.logger.info(`Ecoverse updated: ${hubData.displayName}`);
  }
}
