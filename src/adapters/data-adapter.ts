import {
  Actor,
  ActorGroup,
  Challenge,
  Ecoverse,
  Group,
  Opportunity,
  Organisation,
  User,
  Relation,
} from '../models/index';

export abstract class AbstractDataAdapter {
  abstract ecoverses(): Ecoverse[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organisations(): Organisation[];
  abstract groups(): Group[];
  abstract hosts(): Organisation[];
  abstract actors(): Actor[];
  abstract actorGroups(): ActorGroup[];
  abstract relations(): Relation[];
}
