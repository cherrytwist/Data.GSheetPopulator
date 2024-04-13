import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { AbstractPopulator } from './abstract-populator';
import { SubspacePopulator } from './subspace-populator';
import { SubsubspacePopulator } from './subsubspace-populator';

export class SpacesPopulator extends AbstractPopulator {
  constructor(
    client: AlkemioPopulatorClient,
    data: AbstractDataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    super(client, data, logger, profiler);
  }

  async populate() {
    if (!this.data) throw new Error('No data to populate');
    const subspacePopulator = new SubspacePopulator(
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

    await subspacePopulator.populate();
    await subsubspacesPopulator.populate();
  }
}
