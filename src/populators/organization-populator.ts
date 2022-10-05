import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { Organization } from '../models/organization';
import { AbstractPopulator } from './abstract-populator';

export class OrganizationPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    this.logger.info('Processing organizations');

    const organizationsData = this.data.organizations();

    if (organizationsData.length === 0) {
      this.logger.warn('No organizations to import!');
      return;
    }

    const existingOrganizations =
      await this.client.alkemioLibClient.organizations();

    for (const organizationData of organizationsData) {
      if (!organizationData.displayName) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(
        `Processing organization: ${organizationData.displayName}....`
      );
      const organizationProfileID = '===> organizationCreation - FULL';
      this.profiler.profile(organizationProfileID);

      const existingOrganization = existingOrganizations?.find(
        x => x.nameID.toLowerCase() === organizationData.nameID.toLowerCase()
      );

      try {
        if (existingOrganization) {
          this.logger.info(`...updating: ${organizationData.displayName}`);
          await this.updateOrganization(organizationData, existingOrganization);
        } else {
          this.logger.info(`...creating: ${organizationData.displayName}`);
          await this.createOrganization(organizationData);
        }
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create organization (${organizationData.displayName}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create opportunity: ${e}`);
        }
      } finally {
        this.profiler.profile(organizationProfileID);
      }
    }
  }

  async createOrganization(organizationData: Organization) {
    const newOrganization =
      await this.client.alkemioLibClient.createOrganization(
        organizationData.displayName,
        organizationData.nameID
      );

    const profileID = newOrganization?.profile.id;
    const visualID = newOrganization?.profile.avatar?.id || '';

    if (profileID) {
      await this.client.alkemioLibClient.createTagsetOnProfile(
        profileID,
        'Keywords',
        organizationData.keywords
      );
      await this.client.alkemioLibClient.updateProfile(
        profileID,
        organizationData.description,
        organizationData.country,
        organizationData.city
      );
      await this.client.alkemioLibClient.updateVisual(
        visualID,
        organizationData.avatar
      );
    }
  }

  async updateOrganization(
    organizationData: Organization,
    existingOrganization: any
  ) {
    const profileID = existingOrganization?.profile.id;
    const visualID = existingOrganization?.profile.avatar?.id || '';

    if (profileID) {
      // todo: fill this out more
      await this.client.alkemioLibClient.updateProfile(
        profileID,
        organizationData.description
      );
      await this.client.alkemioLibClient.updateVisual(
        visualID,
        organizationData.avatar
      );
    }
  }
}
