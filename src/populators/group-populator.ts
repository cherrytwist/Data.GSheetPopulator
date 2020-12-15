import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';

export class GroupPopulator extends AbstractPopulator {
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
    this.logger.info('Processing groups');
    const groups = this.data.groups();
    if (groups.length === 0) {
      this.logger.warn('No groups to import!');
      return;
    }

    for (const group of groups) {
      if (!group.name) {
        // End of valid organisations
        break;
      }

      // start processing
      this.logger.info(`Processing group: ${group.name}....`);
      const organisationProfileID = '===> groupCreation - FULL';
      this.profiler.profile(organisationProfileID);

      try {
        await this.client.createEcoverseGroup(group.name);

        this.logger.info(`Added group: ${group.name}`);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create group (${group.name}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to create group (${group.name}): ${e.message}`
          );
        }
      } finally {
        this.profiler.profile(organisationProfileID);
      }
    }
  }
}
