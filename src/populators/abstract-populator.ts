import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { BaseDataAdapter } from '../adapters/base-adapter';
import { createLogger, createProfiler } from '../utils/create-logger';
import { CherrytwistClient } from '@cherrytwist/client-lib';

export abstract class AbstractPopulator {
  protected client: CherrytwistClient;
  protected data: AbstractDataAdapter;
  protected logger: Logger;
  protected profiler: Logger;
  protected name: string;
  protected ecoverseID: string;

  // Create the ecoverse with enough defaults set/ members populated
  constructor(
    client: CherrytwistClient,
    data?: AbstractDataAdapter,
    logger?: Logger,
    profiler?: Logger
  ) {
    this.client = client;
    this.data = data || new BaseDataAdapter();
    this.logger = logger || createLogger();
    this.profiler = profiler || createProfiler();
    this.name = 'abstract-populator';
    this.ecoverseID = this.getEcoverseID();
  }

  getEcoverseID(): string {
    const ecoverses = this.data.ecoverses();
    if (ecoverses.length != 1) {
      throw new Error('Exactly one ecoverse must be available!');
    }

    return ecoverses[0].nameID;
  }

  abstract populate(): void;
}
