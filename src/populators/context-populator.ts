import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';
import { ChallengePopulator } from './challenge-populator';
import { HubPopulator } from './hub-populator';
import { OpportunityPopulator } from './opportunity-populator';

export class ContextPopulator extends AbstractPopulator {
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
    const challengePopulator = new ChallengePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const opportunityPopulator = new OpportunityPopulator(
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

    await hubPopulator.populate();
    await challengePopulator.populate();
    await opportunityPopulator.populate();
  }
}
