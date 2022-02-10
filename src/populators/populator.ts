import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';
import { ActorPopulator } from './actor-populator';
import { AspectPopulator } from './aspect-populator';
import { CommunityPopulator } from './community-populator';
import { ContextPopulator } from './context-populator';
import { OrganizationPopulator } from './organization-populator';

export class Populator extends AbstractPopulator {
  private allowCreation: boolean;
  constructor(
    client: AlkemioClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger,
    allowCreation = false
  ) {
    super(client, data, logger, profiler);
    this.allowCreation = allowCreation;
  }

  async populate() {
    if (!this.data) throw new Error('No data to populate');
    this.hubID = this.getHubID();

    const organizationPopulator = new OrganizationPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const contextPopulator = new ContextPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler,
      this.allowCreation
    );

    const communityPopulator = new CommunityPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const actorPopulator = new ActorPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const aspectPopulator = new AspectPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    // organizations first as they are needed for Hub + Challenges
    await organizationPopulator.populate();
    await contextPopulator.populate();

    // populate the specific opportunity entities. Todo: get this so it can also be updated
    await actorPopulator.populate();

    await aspectPopulator.populate();

    await communityPopulator.populate();
  }
}
