import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { AbstractPopulator } from './abstract-populator';
import { ActorPopulator } from './actor-populator';
import { CalloutPopulator } from './callout-populator';
import { ContextPopulator } from './context-populator';
import { GroupPopulator } from './group-populator';
import { HubPopulator } from './hub-populator';
import { OrganizationPopulator } from './organization-populator';
import { UserPopulator } from './user-populator';

export class Populator extends AbstractPopulator {
  private allowCreation: boolean;
  constructor(
    client: AlkemioPopulatorClient,
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

    const groupPopulator = new GroupPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const userPopulator = new UserPopulator(
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

    const actorPopulator = new ActorPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const calloutPopulator = new CalloutPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const hubPopulator = new HubPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler,
      this.allowCreation
    );

    // organizations first as they are needed for Hub + Challenges
    await organizationPopulator.populate();
    await hubPopulator.populate();
    await userPopulator.populate();
    await groupPopulator.populate();

    await contextPopulator.populate();

    // populate the specific opportunity entities. Todo: get this so it can also be updated
    await actorPopulator.populate();

    await calloutPopulator.populate();

    await userPopulator.populateUserRoles();
  }
}
