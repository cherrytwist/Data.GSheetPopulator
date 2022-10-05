import {
  CalloutState,
  CalloutType,
  CalloutVisibility,
} from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { AbstractPopulator } from './abstract-populator';

export class CalloutPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    await this.processCallouts();
    await this.processCards();
  }

  private async processCallouts() {
    this.logger.info('Processing callouts');

    const callouts = this.data.callouts();

    if (callouts.length === 0) {
      this.logger.warn('No callouts to import!');
      return;
    }

    for (const callout of callouts) {
      if (!callout.nameID) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing callout: ${callout.nameID}....`);
      const calloutProfileID = '===> callout Creation - FULL';
      this.profiler.profile(calloutProfileID);
      try {
        const collaboration = await this.getCollaborationForCallout(
          callout.nameID,
          callout.challenge
        );

        const createdCallout =
          await this.client.alkemioLibClient.createCalloutOnCollaboration(
            collaboration.id,
            callout.displayName,
            callout.nameID,
            callout.description,
            CalloutType.Card,
            CalloutState.Open,
            CalloutVisibility.Published
          );

        this.logger.info(`...added callout: ${createdCallout.nameID}`);
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create callout (${callout.nameID}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create callout: ${e}`);
        }
      } finally {
        this.profiler.profile(calloutProfileID);
      }
    }
  }

  private async getCollaborationForCallout(
    calloutNameID: string,
    challengeNameID: string | undefined
  ) {
    // If challenge is specified, use the collaboration from the challenge
    if (challengeNameID) {
      const challenge = await this.client.alkemioLibClient.challengeByNameID(
        this.hubID,
        challengeNameID
      );
      if (!challenge || !challenge.collaboration) {
        const errorMsg = `Skipping callout '${calloutNameID}'. Unable to identify challenge '${challengeNameID}'!`;
        throw new Error(errorMsg);
      }
      return challenge.collaboration;
    }

    const hub = await this.client.alkemioLibClient.hubInfo(this.hubID);
    if (!hub || !hub.collaboration) {
      const errorMsg = `Skipping callout '${calloutNameID}'. Unable to get collaboration for Hub`;
      throw new Error(errorMsg);
    }

    return hub.collaboration;
  }

  private async processCards() {
    this.logger.info('Processing aspects');

    const aspects = this.data.cards();

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

      const challenge = await this.client.alkemioLibClient.challengeByNameID(
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

        const createdAspect =
          await this.client.alkemioLibClient.createAspectOnCallout(
            callouts[0].id,
            aspect.type,
            aspect.displayName,
            aspect.nameID,
            aspect.description,
            aspect.tags
          );

        const bannerNarrowVisualID = createdAspect?.bannerNarrow?.id || '';
        if (bannerNarrowVisualID && bannerNarrowVisualID.length > 0)
          await this.client.alkemioLibClient.updateVisual(
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
