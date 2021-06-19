import { CherrytwistClient } from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Ecoverse } from '../models/ecoverse';
import { AbstractPopulator } from './abstract-populator';

export class EcoversePopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
    this.name = 'ecoverse-populator';
  }

  async populate() {
    this.logger.info('Processing ecoverse');

    const ecoverses = this.data.ecoverses();
    if (ecoverses.length === 0) {
      this.logger.warn('No ecoverses to import!');
      return;
    }

    for (const ecoverseData of ecoverses) {
      if (!ecoverseData.displayName) {
        // End of valid ecoverses
        return;
      }

      // start processing
      this.logger.info(`Processing ecoverse: ${ecoverseData.nameID}....`);
      const ecoverseProfileID = '===> ecoverseUpdate - FULL';
      this.profiler.profile(ecoverseProfileID);

      const ecoverseExists = await this.client.ecoverseExists(
        ecoverseData.nameID
      );
      try {
        if (!ecoverseExists) {
          const msg = `Specified ecoverse does not exist: ${ecoverseData.nameID}`;
          this.logger.error(msg);
          throw new Error(msg);
        }
        await this.updateEcoverse(ecoverseData);

        await this.client.updateReferencesOnEcoverse(ecoverseData.nameID, [
          {
            name: 'website',
            uri: ecoverseData.refWebsite,
            description: 'The ecoverse website',
          },
          {
            name: 'repo',
            uri: ecoverseData.refRepo,
            description: 'The ecoverse repository',
          },
        ]);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to update ecoverse (${ecoverseData.nameID}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to update ecoverse (${ecoverseData.nameID}): ${e.message}`
          );
        }
        throw e;
      } finally {
        this.profiler.profile(ecoverseProfileID);
      }
    }
  }

  async updateEcoverse(ecoverseData: Ecoverse) {
    await this.client.updateEcoverse({
      ID: ecoverseData.nameID,
      displayName: ecoverseData.displayName,
      hostID: ecoverseData.host,
      context: {
        background: ecoverseData.background,
        impact: ecoverseData.impact,
        tagline: ecoverseData.tagline,
        vision: ecoverseData.vision,
        who: ecoverseData.who,
        visual: {
          avatar: ecoverseData.visualAvatar,
          background: ecoverseData.visualBackground,
          banner: ecoverseData.visualBanner,
        },
      },
    });

    this.logger.info(`Ecoverse updated: ${ecoverseData.displayName}`);
  }
}
