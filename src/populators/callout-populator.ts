import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import {
  CalloutState,
  CalloutType,
  CalloutVisibility,
} from '../generated/graphql';
import { Post } from '../models';
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
        this.spaceID,
        challengeNameID
      );
      if (!challenge || !challenge.collaboration) {
        const errorMsg = `Skipping callout '${calloutNameID}'. Unable to identify challenge '${challengeNameID}'!`;
        throw new Error(errorMsg);
      }
      return challenge.collaboration;
    }

    const space = await this.client.spaceCallouts(this.spaceID);
    if (!space || !space.collaboration) {
      const errorMsg = `Skipping callout '${calloutNameID}'. Unable to get collaboration for Space`;
      throw new Error(errorMsg);
    }

    return space.collaboration;
  }

  private async processCards() {
    this.logger.info('Processing posts');

    const posts = this.data.posts();

    if (posts.length === 0) {
      this.logger.warn('No posts to import!');
      return;
    }

    for (const postData of posts) {
      if (!postData.nameID) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing post: ${postData.nameID}....`);
      const postProfileID = '===> postreation - FULL';
      this.profiler.profile(postProfileID);

      try {
        const collaboration = await this.getCollaborationForCallout(
          postData.callout,
          postData.challenge
        );
        const callout = collaboration.callouts?.find(
          c => c.nameID === postData.callout
        );
        if (!callout) {
          if (postData.challenge) {
            this.logger.error(
              `Unable to find callout with nameID: ${postData.callout} in challenge: ${postData.challenge}`
            );
          } else {
            this.logger.error(
              `Unable to find callout with nameID: ${postData.callout} in space`
            );
          }
          continue;
        }

        const existingCard = callout.posts?.find(
          c => c.nameID === postData.nameID
        );

        if (!existingCard) {
          const createdCard =
            await this.client.alkemioLibClient.createPostOnCallout(
              callout.id,
              postData.type,
              postData.displayName,
              postData.nameID,
              postData.description
            );

          await this.updateVisuals(postData, createdCard);

          this.logger.info(`...added post: ${postData.nameID}`);
        } else {
          const updatedCard = await this.client.updateCard(
            existingCard.id,
            postData.description,
            postData.displayName
          );
          await this.updateVisuals(postData, updatedCard);
          this.logger.info(`...updating post: ${postData.nameID}`);
        }
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create aspect (${postData.nameID}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create aspect: ${e}`);
        }
      } finally {
        this.profiler.profile(postProfileID);
      }
    }
  }

  private async updateVisuals(postData: Post, aspect: any) {
    const bannerNarrowVisualID = aspect?.bannerNarrow?.id || '';
    if (bannerNarrowVisualID && bannerNarrowVisualID.length > 0)
      await this.client.alkemioLibClient.updateVisual(
        bannerNarrowVisualID,
        postData.bannerNarrowURI
      );

    const bannerVisualID = aspect?.banner?.id || '';
    if (bannerVisualID && bannerVisualID.length > 0)
      await this.client.alkemioLibClient.updateVisual(
        bannerVisualID,
        postData.bannerURI
      );
  }
}
