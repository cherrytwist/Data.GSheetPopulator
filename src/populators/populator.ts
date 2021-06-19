import { CherrytwistClient } from '@cherrytwist/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';
import { ActorPopulator } from './actor-populator';
import { CommunityPopulator } from './community-populator';
import { ContextPopulator } from './context-populator';
import { OrganizationPopulator } from './organisation-populator';

export class Populator extends AbstractPopulator {
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
    if (!this.data) throw new Error('No data to populate');

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
      this.profiler
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

    // organisations first as they are needed for Ecoverse + Challenges
    //await organizationPopulator.populate();
    await contextPopulator.populate();

    // populate the specific opportunity entities. Todo: get this so it can also be updated
    await actorPopulator.populate();

    await communityPopulator.populate();
  }
}
