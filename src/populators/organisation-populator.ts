import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';

export class OrganizationPopulator extends AbstractPopulator {
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
    this.logger.info('Processing organisations');

    const organisations = this.data.organizations();

    if (organisations.length === 0) {
      this.logger.warn('No organisations to import!');
      return;
    }

    for (const organisation of organisations) {
      if (!organisation.name) {
        // End of valid organisations
        break;
      }

      // start processing
      this.logger.info(`Processing organisation: ${organisation.name}....`);
      const organisationProfileID = '===> organisationCreation - FULL';
      this.profiler.profile(organisationProfileID);

      try {
        const newOrganisation = await this.client.createOrganisation(
          organisation.name
        );

        const profileID = newOrganisation?.profile.id;

        if (profileID) {
          await this.client.createTagset(
            profileID,
            'Keywords',
            organisation.keywords
          );
          await this.client.updateProfile(
            profileID,
            organisation.logo,
            organisation.description
          );
          await this.client.addReference(
            profileID,
            'logo',
            organisation.logo,
            'Organisation logo'
          );
        }
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create organisation (${organisation.name}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create opportunity: ${e}`);
        }
      } finally {
        this.profiler.profile(organisationProfileID);
      }
    }
  }
}
