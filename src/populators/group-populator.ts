import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';
import { AbstractPopulator } from './abstract-populator';

export class GroupPopulator extends AbstractPopulator {
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
    this.logger.info('Processing groups');

    // Iterate over the rows
    const groups = this.data.groups();
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
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
