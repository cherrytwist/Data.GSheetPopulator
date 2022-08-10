import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';

export class AspectPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    await this.processAspects();
  }
  private async processAspects() {
    this.logger.info('Processing aspects');

    const aspects = this.data.aspects();

    if (aspects.length === 0) {
      this.logger.warn('No aspects to import!');
      return;
    }

    for (const aspect of aspects) {
      if (!aspect.nameID) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing aspect: ${aspect.nameID}....`);
      const aspectProfileID = '===> aspectCreation - FULL';
      this.profiler.profile(aspectProfileID);

      const challenge = await this.client.challengeByNameID(
        this.hubID,
        aspect.challenge
      );

      if (!challenge) {
        this.logger.warn(
          `Skipping aspect '${aspect.nameID}'. Missing challenge '${aspect.challenge}'!`
        );
        continue;
      }

      const collaborationID = challenge.collaboration?.id;
      if (!collaborationID) {
        this.logger.warn(
          `Skipping aspect '${aspect.nameID}'. Missing collaboration ID on '${aspect.challenge}'!`
        );
        continue;
      }

      try {
        const callouts = challenge.collaboration?.callouts;
        if (!callouts || callouts.length === 0) {
          this.logger.warn(
            `Skipping aspect '${aspect.nameID}'. Missing card callout on '${aspect.challenge}'!`
          );
          continue;
        }

        const createdAspect = await this.client.createAspectOnCallout(
          callouts[0].id,
          aspect.type,
          aspect.displayName,
          aspect.nameID,
          aspect.description,
          aspect.tags
        );

        const bannerNarrowVisualID = createdAspect?.bannerNarrow?.id || '';
        if (bannerNarrowVisualID && bannerNarrowVisualID.length > 0)
          await this.client.updateVisual(
            bannerNarrowVisualID,
            aspect.bannerNarrowURI
          );

        this.logger.info(`...added aspect: ${aspect.nameID}`);
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create aspect (${aspect.nameID}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create aspect: ${e}`);
        }
      } finally {
        this.profiler.profile(aspectProfileID);
      }
    }
  }
}
