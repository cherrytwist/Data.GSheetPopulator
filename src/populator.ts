import { CherrytwistClient } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { DataAdapter } from './adapters/adapter';
import { ChallengePopulator } from './populators/challenge-populator';
import { EcoversePopulator } from './populators/ecoverse-populator';
import { GroupPopulator } from './populators/group-populator';
import { HostPopulator } from './populators/host-populator';
import { OpportunityPopulator } from './populators/opportunity-populator';
import { OrganisationPopulator } from './populators/organisation-populator';
import { UserPopulator } from './populators/user-populator';

export class GSheetParams {
  gsheetID = '';
  google_credentials_file = '';
  google_token_file = '';
}

export class Populator {
  // The ctClient to use to interact with the server
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

  async populate() {
    if (!this.data) throw new Error('No data to populate');
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

    const challengePopulator = new ChallengePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const organisationPopulator = new OrganisationPopulator(
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

    const ecoversePopulator = new EcoversePopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    const hostPopulator = new HostPopulator(
      this.client,
      this.data,
      this.logger,
      this.profiler
    );

    await ecoversePopulator.populate();
    await hostPopulator.populate();
    await groupPopulator.populate();
    await userPopulator.populate();
    await challengePopulator.populate();
    await opportunityPopulator.populate();
    await organisationPopulator.populate();
  }
}
