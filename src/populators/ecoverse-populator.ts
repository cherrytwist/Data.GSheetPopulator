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
        // End of valid organisations
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
        if (ecoverseExists) {
          await this.updateEcoverse(ecoverseData);
        } else {
          await this.createEcoverse(ecoverseData);
        }

        await this.client.updateReferencesOnEcoverse(ecoverseData.nameID, [
          {
            name: 'website',
            uri: ecoverseData.refWebsite,
            description: 'The ecoverse website',
          },
          {
            name: 'logo',
            uri: ecoverseData.refLogo,
            description: 'The ecoverse logo',
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
            `Unable to create/update ecoverse (${ecoverseData.nameID}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to create/update ecoverse (${ecoverseData.nameID}): ${e.message}`
          );
        }
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
        // references: [
        //   {
        //     name: 'website',
        //     uri: ecoverse.refWebsite,
        //     description: 'The ecoverse website',
        //   },
        //   {
        //     name: 'logo',
        //     uri: ecoverse.refLogo,
        //     description: 'The ecoverse logo',
        //   },
        //   {
        //     name: 'repo',
        //     uri: ecoverse.refRepo,
        //     description: 'The ecoverse repository',
        //   },
        // ],
      },
    });

    this.logger.info(`Ecoverse updated: ${ecoverseData.displayName}`);
  }

  async createEcoverse(ecoverseData: Ecoverse) {
    await this.client.createEcoverse({
      nameID: ecoverseData.nameID,
      displayName: ecoverseData.displayName,
      hostID: ecoverseData.host,
      context: {
        background: ecoverseData.background,
        impact: ecoverseData.impact,
        tagline: ecoverseData.tagline,
        vision: ecoverseData.vision,
        who: ecoverseData.who,
        // references: [
        //   {
        //     name: 'website',
        //     uri: ecoverse.refWebsite,
        //     description: 'The ecoverse website',
        //   },
        //   {
        //     name: 'logo',
        //     uri: ecoverse.refLogo,
        //     description: 'The ecoverse logo',
        //   },
        //   {
        //     name: 'repo',
        //     uri: ecoverse.refRepo,
        //     description: 'The ecoverse repository',
        //   },
        // ],
      },
    });

    this.logger.info(`Ecoverse created: ${ecoverseData.nameID}`);
  }
}
