import { assignUserAsLead } from '../utils';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { Space } from '../models/space';
import { AbstractPopulator } from './abstract-populator';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { assignUserAsMember } from '../utils/assign-user-as-member';
import { CreateSpaceInput, UpdateTagsetInput } from '@alkemio/client-lib';

export class SpacePopulator extends AbstractPopulator {
  private allowCreation: boolean;

  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger,
    allowCreation = false
  ) {
    super(client, data, logger, profiler);
    this.name = 'space-populator';
    this.allowCreation = allowCreation;
  }

  async populate() {
    const spaces = this.data.spaces();
    if (spaces.length === 0) {
      this.logger.warn('No Spaces to import!');
      return;
    }

    for (const spaceData of spaces) {
      if (!spaceData.displayName) {
        // End of valid spaces
        return;
      }

      // start processing
      this.logger.info(`Processing space: ${spaceData.nameID}....`);
      const spaceProfileID = '===> spaceUpdate - FULL';
      this.profiler.profile(spaceProfileID);

      const spaceExists = await this.client.alkemioLibClient.spaceExists(
        spaceData.nameID
      );

      try {
        if (!spaceExists) {
          if (this.allowCreation) {
            await this.createSpace(spaceData);
          } else {
            const msg = `Specified Space does not exist: ${spaceData.nameID}`;
            this.logger.error(msg);
            throw new Error(msg);
          }
        }
        await this.updateSpace(spaceData);

        await this.client.alkemioLibClient.updateReferencesOnSpace(
          spaceData.nameID,
          [
            {
              name: 'website',
              uri: spaceData.refWebsite,
              description: 'The space website',
            },
            {
              name: 'repo',
              uri: spaceData.refRepo,
              description: 'The space repository',
            },
          ]
        );
      } catch (e: any) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to update space (${spaceData.nameID}):${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(
            `Unable to update space (${spaceData.nameID}): ${e.message}`
          );
        }
        throw e;
      } finally {
        this.profiler.profile(spaceProfileID);
      }
    }
  }

  async updateSpace(spaceData: Space) {
    const spaceProfileData = await this.client.sdkClient.spaceProfile({
      id: spaceData.nameID,
    });
    const spaceProfileTagset = spaceProfileData.data.space.profile.tagset;
    const tagsetsData: UpdateTagsetInput[] = [];
    if (spaceProfileTagset) {
      tagsetsData.push({
        ID: spaceProfileTagset.id,
        tags: spaceData.tags || [],
      });
    }
    const updatedSpace = await this.client.alkemioLibClient.updateSpace({
      ID: spaceData.nameID,
      hostID: spaceData.host,
      profileData: {
        displayName: spaceData.displayName,
        description: spaceData.background,
        tagline: spaceData.tagline,
        tagsets: tagsetsData,
      },
      context: {
        impact: spaceData.impact,
        vision: spaceData.vision,
        who: spaceData.who,
      },
    });

    const visuals = updatedSpace?.profile?.visuals || [];
    await this.client.updateVisualsOnJourneyProfile(
      visuals,
      spaceData.visualBanner,
      spaceData.visualBackground,
      spaceData.visualAvatar
    );

    if (updatedSpace?.community?.id) {
      await assignUserAsMember(
        this.client,
        this.logger,
        updatedSpace.community.id,
        spaceData.leadUsers
      );
      await assignUserAsLead(
        this.client,
        this.logger,
        updatedSpace.community.id,
        spaceData.leadUsers
      );
    }

    this.logger.info(`Space updated: ${spaceData.displayName}`);
  }

  async createSpace(spaceData: Space) {
    const input: CreateSpaceInput = {
      nameID: spaceData.nameID,
      hostID: spaceData.host,
      profileData: {
        displayName: spaceData.displayName,
      },
    };
    await this.client.alkemioLibClient.createSpace(input);

    this.logger.info(`Space created: ${spaceData.displayName}`);
  }
}
