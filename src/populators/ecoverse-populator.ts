import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';
import { AbstractPopulator } from './abstract-populator';

export class EcoversePopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: DataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing ecoverse');

    // Iterate over the rows
    const ecoverse = this.data.ecoverse();
    if (!ecoverse.name) {
      // End of valid organisations
      return;
    }

    // start processing
    this.logger.info(`Processing ecoverse: ${ecoverse.name}....`);
    const ecoverseProfileID = '===> ecoverseUpdate - FULL';
    this.profiler.profile(ecoverseProfileID);

    try {
      await this.client.updateEcoverse({
        name: ecoverse.name,
        context: {
          background: ecoverse.background,
          impact: ecoverse.impact,
          tagline: ecoverse.tagline,
          vision: ecoverse.vision,
          who: ecoverse.who,
          references: [
            {
              name: 'website',
              uri: ecoverse.refWebsite,
              description: 'The ecoverse website',
            },
            {
              name: 'logo',
              uri: ecoverse.refLogo,
              description: 'The ecoverse logo',
            },
            {
              name: 'repo',
              uri: ecoverse.refRepo,
              description: 'The ecoverse repository',
            },
          ],
        },
      });

      this.logger.verbose(`Ecoverse updated: ${ecoverse.name}`);
    } catch (e) {
      this.logger.error(
        `Unable to update ecoverse (${ecoverse.name}): ${e.message}`
      );
    }
  }
}
