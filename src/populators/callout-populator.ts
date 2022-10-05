import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import {
  CalloutState,
  CalloutType,
  CalloutVisibility,
} from '../generated/graphql';
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

    for (const calloutData of callouts) {
      if (!calloutData.nameID) {
        // End of valid callouts
        break;
      }

      // start processing
      this.logger.info(`Processing callout: ${calloutData.nameID}....`);
      const calloutProfileID = '===> callout Creation - FULL';
      this.profiler.profile(calloutProfileID);
      try {
        const collaboration = await this.getCollaborationForCallout(
          calloutData.nameID,
          calloutData.challenge
        );
        const existingCallout = collaboration.callouts?.find(
          c => c.nameID === calloutData.nameID
        );
        if (!existingCallout) {
          const createdCallout = await this.client.createCalloutOnCollaboration(
            collaboration.id,
            calloutData.displayName,
            calloutData.nameID,
            calloutData.description,
            CalloutType.Card,
            CalloutState.Open
          );

          this.logger.info(`...added callout: ${createdCallout.nameID}`);
          await this.client.updateCalloutVisibility(
            createdCallout.id,
            CalloutVisibility.Published
          );

          this.logger.info(`...published callout: ${createdCallout.nameID}`);
        } else {
          const updatedCallout = await this.client.updateCallout(
            existingCallout.id,
            calloutData.description,
            calloutData.displayName
          );
          this.logger.info(`...updated callout: ${updatedCallout.nameID}`);
        }
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create callout (${calloutData.nameID}): ${e.response.errors[0].message}`
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
      const challenge = await this.client.challengeCallouts(
        this.hubID,
        challengeNameID
      );
      if (!challenge || !challenge.collaboration) {
        const errorMsg = `Skipping callout '${calloutNameID}'. Unable to identify challenge '${challengeNameID}'!`;
        throw new Error(errorMsg);
      }
      return challenge.collaboration;
    }

    const hub = await this.client.hubCallouts(this.hubID);
    if (!hub || !hub.collaboration) {
      const errorMsg = `Skipping callout '${calloutNameID}'. Unable to get collaboration for Hub`;
      throw new Error(errorMsg);
    }

    return hub.collaboration;
  }

  private async processCards() {
    this.logger.info('Processing cards');

    const cards = this.data.cards();

    if (cards.length === 0) {
      this.logger.warn('No cards to import!');
      return;
    }

    for (const cardData of cards) {
      if (!cardData.nameID) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing card: ${cardData.nameID}....`);
      const cardProfileID = '===> cardreation - FULL';
      this.profiler.profile(cardProfileID);

      try {
        const collaboration = await this.getCollaborationForCallout(
          cardData.callout,
          cardData.challenge
        );
        const callout = collaboration.callouts?.find(
          c => c.nameID === cardData.callout
        );
        if (!callout) {
          if (cardData.challenge) {
            this.logger.error(
              `Unable to find callout with nameID: ${cardData.callout} in challenge: ${cardData.challenge}`
            );
          } else {
            this.logger.error(
              `Unable to find callout with nameID: ${cardData.callout} in hub`
            );
          }
          continue;
        }

        const existingCard = callout.aspects?.find(
          c => c.nameID === cardData.nameID
        );

        if (!existingCard) {
          const createdAspect =
            await this.client.alkemioLibClient.createAspectOnCallout(
              callout.id,
              cardData.type,
              cardData.displayName,
              cardData.nameID,
              cardData.description,
              cardData.tags
            );

          const bannerNarrowVisualID = createdAspect?.bannerNarrow?.id || '';
          if (bannerNarrowVisualID && bannerNarrowVisualID.length > 0)
            await this.client.alkemioLibClient.updateVisual(
              bannerNarrowVisualID,
              cardData.bannerNarrowURI
            );

          this.logger.info(`...added card: ${cardData.nameID}`);
        } else {
          this.logger.info(`...updating card: ${cardData.nameID}`);
        }
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create aspect (${cardData.nameID}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create aspect: ${e}`);
        }
      } finally {
        this.profiler.profile(cardProfileID);
      }
    }
  }
}
