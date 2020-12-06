import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from '../adapters/adapter';

export abstract class AbstractPopulator {
  client: CherrytwistClient;
  data: DataAdapter;
  logger: Logger;
  profiler: Logger;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data: DataAdapter,
    logger: Logger,
    profiler: Logger
  ) {
    this.client = client;
    this.data = data;
    this.logger = logger;
    this.profiler = profiler;
  }

  abstract populate(): void;
}
