import {
  Actor,
  ActorGroup,
  Callout,
  Post,
  Challenge,
  Space,
  Group,
  Opportunity,
  Organization,
  Relation,
  User,
} from '../models';

export abstract class AbstractDataAdapter {
  abstract actors(): Actor[];
  abstract actorGroups(): ActorGroup[];
  abstract posts(): Post[];
  abstract callouts(): Callout[];
  abstract spaces(): Space[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organizations(): Organization[];
  abstract groups(): Group[];
  abstract relations(): Relation[];
}
