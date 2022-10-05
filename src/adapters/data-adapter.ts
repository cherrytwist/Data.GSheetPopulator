import {
  Actor,
  ActorGroup,
  Callout,
  Card,
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
  abstract cards(): Card[];
  abstract callouts(): Callout[];
  abstract hubs(): Hub[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organizations(): Organization[];
  abstract groups(): Group[];
  abstract relations(): Relation[];
}
