import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { AbstractPopulator } from './abstract-populator';
import { CalloutPopulator } from './callout-populator';
import { SpacePopulator } from './space-populator';
import { OrganizationPopulator } from './organization-populator';
import { UserPopulator } from './user-populator';
import { SubsubspacePopulator } from './subsubspace-populator';
import { SubspacePopulator } from './subspace-populator';

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
    this.spaceID = this.getSpaceID();

    const organizationPopulator = new OrganizationPopulator(
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

    const calloutPopulator = new CalloutPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const spacePopulator = new SpacePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler,
      this.allowCreation
    );

    const subspacesPopulator = new SubspacePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const subsubspacesPopulator = new SubsubspacePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    // organizations first as they are needed for Space + Subspaces
    await organizationPopulator.populate();
    await spacePopulator.populate();
    await userPopulator.populate();

    await subspacesPopulator.populate();
    await subsubspacesPopulator.populate();

    await calloutPopulator.populate();

    await userPopulator.populateUserRoles();
  }
}
