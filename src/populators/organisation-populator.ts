import { CherrytwistClient } from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Organization } from '../models/organisation';
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

    const organisationsData = this.data.organizations();

    if (organisationsData.length === 0) {
      this.logger.warn('No organisations to import!');
      return;
    }

    const existingOrganisations = await this.client.organisations();

    for (const organisationData of organisationsData) {
      if (!organisationData.displayName) {
        // End of valid organisations
        break;
      }

      // start processing
      this.logger.info(
        `Processing organisation: ${organisationData.displayName}....`
      );
      const organisationProfileID = '===> organisationCreation - FULL';
      this.profiler.profile(organisationProfileID);

      const existingOrganisation = existingOrganisations?.find(
        x => x.nameID === organisationData.nameID
      );

      try {
        if (existingOrganisation) {
          this.logger.info(
            `Organisation ${organisationData.displayName} already exists! Updating`
          );
          await this.updateOrganisation(organisationData, existingOrganisation);
        } else {
          await this.createOrganisation(organisationData);
        }
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create organisation (${organisationData.displayName}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create opportunity: ${e}`);
        }
      } finally {
        this.profiler.profile(organisationProfileID);
      }
    }
  }

  async createOrganisation(organisationData: Organization) {
    const newOrganisation = await this.client.createOrganisation(
      organisationData.displayName,
      organisationData.nameID
    );

    const profileID = newOrganisation?.profile.id;

    if (profileID) {
      await this.client.createTagsetOnProfile(
        profileID,
        'Keywords',
        organisationData.keywords
      );
      await this.client.updateProfile(
        profileID,
        organisationData.avatar,
        organisationData.description
      );
    }
  }

  async updateOrganisation(
    organisationData: Organization,
    existingOrganisation: any
  ) {
    const profileID = existingOrganisation?.profile.id;

    if (profileID) {
      // todo: fill this out more
      await this.client.updateProfile(
        profileID,
        organisationData.avatar,
        organisationData.description
      );
    }
  }
}
