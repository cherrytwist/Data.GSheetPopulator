import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import {
  CalloutState,
  CalloutType,
  CalloutVisibility,
} from '../generated/graphql';
import { Post } from '../inputModels';
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
    await this.processPosts();
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
            CalloutType.PostCollection,
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

  private async processPosts() {
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

        const existingPost = callout.posts?.find(
          c => c.nameID === postData.nameID
        );

        if (!existingPost) {
          const createdPost =
            await this.client.alkemioLibClient.createPostOnCallout(
              callout.id,
              postData.type,
              postData.displayName,
              postData.nameID,
              postData.description
            );

          await this.updateVisuals(postData, createdPost);

          this.logger.info(`...added post: ${postData.nameID}`);
        } else {
          const updatedPost = await this.client.updatePost(
            existingPost.id,
            postData.description,
            postData.displayName
          );
          await this.updateVisuals(postData, updatedPost);
          this.logger.info(`...updating post: ${postData.nameID}`);
        }
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create post contribution (${postData.nameID}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create post contribution: ${e}`);
        }
      } finally {
        this.profiler.profile(postProfileID);
      }
    }
  }

  private async updateVisuals(postData: Post, post: any) {
    const bannerNarrowVisualID = post?.bannerNarrow?.id || '';
    if (bannerNarrowVisualID && bannerNarrowVisualID.length > 0)
      await this.client.alkemioLibClient.updateVisual(
        bannerNarrowVisualID,
        postData.bannerNarrowURI
      );

    const bannerVisualID = post?.banner?.id || '';
    if (bannerVisualID && bannerVisualID.length > 0)
      await this.client.alkemioLibClient.updateVisual(
        bannerVisualID,
        postData.bannerURI
      );
  }
}
