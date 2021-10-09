import {
  Actor,
  ActorGroup,
  Aspect,
  Challenge,
  Hub,
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
  abstract hubs(): Hub[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organizations(): Organization[];
  abstract groups(): Group[];
  abstract relations(): Relation[];
}
