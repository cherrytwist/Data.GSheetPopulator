import { CherrytwistClient } from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
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

    if (ecoverses.length > 1) {
      this.logger.warn(
        'More than 1 ecoverse in source. Will import only the first one!'
      );
    }

    // Iterate over the rows
    const ecoverse = ecoverses[0];
    if (!ecoverse.name) {
      // End of valid organisations
      return;
    }

    // start processing
    this.logger.info(`Processing ecoverse: ${ecoverse.name}....`);
    const ecoverseProfileID = '===> ecoverseUpdate - FULL';
    this.profiler.profile(ecoverseProfileID);

    //todo - set the organisation by name
    const organisationName = ecoverse.host;
    let hostOrgID: string | undefined = undefined;
    if (organisationName) {
      try {
        const orgResponse = await this.client.organisation(organisationName);
        hostOrgID = orgResponse?.id;
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to identify ecoverse host (${organisationName}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to update ecoverse (${organisationName}): ${e.message}`
          );
        }
      }
    }

    try {
      await this.client.updateEcoverse({
        ID: '1',
        name: ecoverse.name,
        hostID: hostOrgID,
        context: {
          background: ecoverse.background,
          impact: ecoverse.impact,
          tagline: ecoverse.tagline,
          vision: ecoverse.vision,
          who: ecoverse.who,
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
      await this.client.updateEcoverseReferences([
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
      ]);

      this.logger.info(`Ecoverse updated: ${ecoverse.name}`);
    } catch (e) {
      if (e.response && e.response.errors) {
        this.logger.error(
          `Unable to update ecoverse (${ecoverse.name}):${e.response.errors[0].message}`
        );
      } else {
        this.logger.error(
          `Unable to update ecoverse (${ecoverse.name}): ${e.message}`
        );
      }
    } finally {
      this.profiler.profile(ecoverseProfileID);
    }
  }
}
