import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';
import { AbstractPopulator } from './abstract-populator';

export class HostPopulator extends AbstractPopulator {
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
    this.logger.info('Processing host');

    // Iterate over the rows
    const host = this.data.host();

    if (!host) {
      this.logger.error(
        'Can not set organisation host, Missing host information!'
      );
      return;
    }

    // start processing
    this.logger.info(`Processing ecoverse host: ${host.name} ...`);
    const ecoverseHostProfileID = '===> ecoverseHostUpdate - FULL';
    this.profiler.profile(ecoverseHostProfileID);

    try {
      await this.client.updateHostOrganisation(
        host.name,
        host.logo,
        host.logoFile,
        host.textId,
        host.description,
        host.keywords
      );

      this.logger.info(`Ecoverse host updated: ${host.name}`);
    } catch (e) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to update ecoverse host (${host.name}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to update ecoverse host (${host.name}): ${e.message}`
        );
      }
    } finally {
      this.profiler.profile(ecoverseHostProfileID);
    }
  }
}
