import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';

export class GroupPopulator extends AbstractPopulator {
  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: AlkemioClient,
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
      const groupProfileID = '===> groupCreation - FULL';
      this.profiler.profile(groupProfileID);

      try {
        await this.client.createEcoverseGroup(
          this.ecoverseID,
          group.name,
          group.description
        );

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
        this.profiler.profile(groupProfileID);
      }
    }
  }
}
