import {
  Actor,
  ActorGroup,
  Aspect,
  Challenge,
  Ecoverse,
  Group,
  Opportunity,
  Organization,
  Relation,
  User,
} from '../models';

export abstract class AbstractDataAdapter {
  abstract actors(): Actor[];
  abstract actorGroups(): ActorGroup[];
  abstract aspects(): Aspect[];
  abstract ecoverses(): Ecoverse[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organizations(): Organization[];
  abstract groups(): Group[];
  abstract relations(): Relation[];
}
