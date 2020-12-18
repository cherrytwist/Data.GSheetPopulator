import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';

export class HostPopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing host');

    const hosts = this.data.hosts();
    if (hosts.length === 0) {
      this.logger.warn('No host to import!');
      return;
    }

    if (hosts.length > 1) {
      this.logger.warn(
        'More than 1 host in source. Will import only the first one!'
      );
    }

    const host = hosts[0];

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
