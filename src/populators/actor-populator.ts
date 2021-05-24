import { Challenge, CherrytwistClient } from '@cherrytwist/client-lib';
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
    await this.processActorGroups();
    await this.processActors();
    await this.processRelations();
    await this.processAspects();
  }

  private async processActorGroups() {
    this.logger.info('Processing actor groups');

    const actorGroups = this.data.actorGroups();

    if (actorGroups.length === 0) {
      this.logger.warn('No actor groups to import!');
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

      const opportunity = await this.client.opportunityByNameID(
        actorGroup.ecoverseID,
        actorGroup.opportunity
      );

      if (!opportunity) {
        this.logger.warn(
          `Skipping actor group '${actorGroup.name}'. Missing opportunity '${actorGroup.opportunity}'!`
        );
        continue;
      }

      const ecosystemModelID = opportunity.context?.ecosystemModel?.id;
      if (!ecosystemModelID) {
        this.logger.error(
          `Unable to create actor group (${actorGroup.name}): ecosystemModel id not found`
        );
        return;
      }

      try {
        await this.client.createActorGroup(
          ecosystemModelID,
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

  private async processActors() {
    this.logger.info('Processing actors');

    const actors = this.data.actors();

    if (actors.length === 0) {
      this.logger.warn('No actors to import!');
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

      const opportunity = await this.client.opportunityByNameID(
        actor.ecoverseID,
        actor.opportunity
      );

      if (!opportunity) {
        this.logger.warn(
          `Skipping actor '${actor.name}'. Missing opportunity '${actor.opportunity}'!`
        );
        continue;
      }

      const actorGroup = opportunity.context?.ecosystemModel?.actorGroups?.find(
        g => g.name.toLowerCase() === actor.actorGroup.toLowerCase()
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
          actor.value || '', // workaround data model inconsistency
          actor.impact || '', // workaround data model inconsistency
          actor.description || '' // workaround data model inconsistency
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

  private async processRelations() {
    this.logger.info('Processing relations');

    const relations = this.data.relations();

    if (relations.length === 0) {
      this.logger.warn('No relations to import!');
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

      const opportunity = await this.client.opportunityByNameID(
        relation.ecoverseID,
        relation.opportunity
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

  private async processAspects() {
    this.logger.info('Processing aspects');

    const aspects = this.data.aspects();

    if (aspects.length === 0) {
      this.logger.warn('No aspects to import!');
      return;
    }

    for (const aspect of aspects) {
      if (!aspect.title) {
        // End of valid organizations
        break;
      }

      // start processing
      this.logger.info(`Processing aspect: ${aspect.title}....`);
      const aspectProfileID = '===> aspectCreation - FULL';
      this.profiler.profile(aspectProfileID);

      const opportunity = await this.client.opportunityByNameID(
        aspect.ecoverseID,
        aspect.opportunity
      );

      if (!opportunity) {
        this.logger.warn(
          `Skipping aspect '${aspect.title}'. Missing opportunity '${aspect.opportunity}'!`
        );
        continue;
      }

      const contextID = opportunity.context?.id;
      if (!contextID) {
        this.logger.warn(
          `Skipping aspect '${aspect.title}'. Missing context ID on '${aspect.opportunity}'!`
        );
        continue;
      }

      try {
        await this.client.createAspect(
          contextID,
          aspect.title,
          aspect.framing,
          aspect.explanation
        );

        this.logger.info(`...added aspect: ${aspect.title}`);
      } catch (e) {
        if (e.response && e.response.errors) {
          this.logger.error(
            `Unable to create aspect (${aspect.title}): ${e.response.errors[0].message}`
          );
        } else {
          this.logger.error(`Could not create aspect: ${e}`);
        }
      } finally {
        this.profiler.profile(aspectProfileID);
      }
    }
  }
}
