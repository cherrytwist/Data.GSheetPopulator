import { CherrytwistClient, Opportunity } from 'cherrytwist-lib';
import { Logger } from 'winston';
import { AbstractDataAdapter } from '../adapters/data-adapter';
import { AbstractPopulator } from './abstract-populator';

export class ActorPopulator extends AbstractPopulator {
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
    const opportunities =
      ((await this.client.opportunities()) as Opportunity[]) || [];
    await this.processActorGroups(opportunities);
    await this.processActors(opportunities);
    await this.processRelations(opportunities);
  }

  private async processActorGroups(opportunities: Opportunity[]) {
    this.logger.info('Processing actor groups');

    const actorGroups = this.data.actorGroups();

    if (actorGroups.length === 0) {
      this.logger.warn('No actor groups to import!');
      return;
    }

    if (!(opportunities && opportunities.length > 0)) {
      this.logger.error('Can not process actor groups. Missing opportunities');
      return;
    }

    for (const actorGroup of actorGroups) {
      if (!actorGroup.name) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing actor group: ${actorGroup.name}....`);
      const actorGroupProfileID = '===> actorGroupCreation - FULL';
      this.profiler.profile(actorGroupProfileID);

      const opportunity = opportunities.find(
        c => c.name.toLowerCase() === actorGroup.opportunity.toLowerCase()
      );

      if (!opportunity) {
        this.logger.warn(
          `Skipping actor group '${actorGroup.name}'. Missing opportunity '${actorGroup.opportunity}'!`
        );
        continue;
      }

      try {
        await this.client.createActorGroup(
          opportunity.id,
          actorGroup.name,
          actorGroup.description
        );

        this.logger.info(`...added actor group: ${actorGroup.name}`);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create actor group (${actorGroup.name}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create actor group: ${e}`);
        }
      } finally {
        this.profiler.profile(actorGroupProfileID);
      }
    }
  }

  private async processActors(opportunities: Opportunity[]) {
    this.logger.info('Processing actors');

    const actors = this.data.actors();

    if (actors.length === 0) {
      this.logger.warn('No actors to import!');
      return;
    }

    if (!(opportunities && opportunities.length > 0)) {
      this.logger.error('Can not process actors. Missing opportunities');
      return;
    }

    for (const actor of actors) {
      if (!actor.name) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing actor: ${actor.name}....`);
      const actorProfileID = '===> actorCreation - FULL';
      this.profiler.profile(actorProfileID);

      const opportunity = opportunities.find(
        c => c.name.toLowerCase() === actor.opportunity.toLowerCase()
      );

      if (!opportunity) {
        this.logger.warn(
          `Skipping actor '${actor.name}'. Missing opportunity '${actor.opportunity}'!`
        );
        continue;
      }

      const actorGroup = opportunity.actorGroups?.find(
        g => g.name.toLowerCase() === actor.actorGroup
      );

      if (!actorGroup) {
        this.logger.warn(
          `Skipping actor '${actor.name}'. Missing actor group '${actor.actorGroup}'!`
        );
        continue;
      }

      try {
        await this.client.createActor(
          actorGroup.id,
          actor.name,
          actor.description
        );

        this.logger.info(`...added actor: ${actor.name}`);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create actor (${actor.name}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create actor: ${e}`);
        }
      } finally {
        this.profiler.profile(actorProfileID);
      }
    }
  }

  private async processRelations(opportunities: Opportunity[]) {
    this.logger.info('Processing relations');

    const relations = this.data.relations();

    if (relations.length === 0) {
      this.logger.warn('No relations to import!');
      return;
    }

    if (!(opportunities && opportunities.length > 0)) {
      this.logger.error('Can not process relations. Missing opportunities');
      return;
    }

    for (const relation of relations) {
      if (!relation.type) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(
        `Processing relation: ${relation.type}-${relation.actorName}....`
      );
      const relationProfileID = '===> relationCreation - FULL';
      this.profiler.profile(relationProfileID);

      const opportunity = opportunities.find(
        c => c.name.toLowerCase() === relation.opportunity.toLowerCase()
      );

      if (!opportunity) {
        this.logger.warn(
          `Skipping relation '${relation.type}-${relation.actorName}'. Missing opportunity '${relation.opportunity}'!`
        );
        continue;
      }

      try {
        await this.client.createRelation(
          opportunity.id,
          relation.type,
          relation.description,
          relation.actorName,
          relation.actorRole,
          relation.actorType
        );

        this.logger.info(
          `...added relation: ${relation.type}-${relation.actorName}`
        );
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create relation (${relation.type}-${relation.actorName}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create relation: ${e}`);
        }
      } finally {
        this.profiler.profile(relationProfileID);
      }
    }
  }
}
