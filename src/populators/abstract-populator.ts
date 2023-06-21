import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { BaseDataAdapter } from '../adapters/base-adapter';
import { createLogger, createProfiler } from '../utils/create-logger';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';

export abstract class AbstractPopulator {
  protected client: AlkemioPopulatorClient;
  protected data: AbstractDataAdapter;
  protected logger: Logger;
  protected profiler: Logger;
  protected name: string;
  protected spaceID: string;

  // Create the Space with enough defaults set/ members populated
  constructor(
    client: AlkemioPopulatorClient,
    data?: AbstractDataAdapter,
    logger?: Logger,
    profiler?: Logger
  ) {
    this.client = client;
    this.data = data || new BaseDataAdapter();
    this.logger = logger || createLogger();
    this.profiler = profiler || createProfiler();
    this.name = 'abstract-populator';
    this.spaceID = this.getSpaceID();
  }

  getSpaceID(): string {
    const spaces = this.data.spaces();
    if (spaces.length != 1) {
      throw new Error('Exactly one Space must be available!');
    }

    return spaces[0].nameID;
  }

  abstract populate(): void;
}
