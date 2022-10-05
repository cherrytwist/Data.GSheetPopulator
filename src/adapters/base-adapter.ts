import {
  Actor,
  ActorGroup,
  Card,
  Challenge,
  Hub,
  Group,
  Opportunity,
  Organization,
  Relation,
  User,
  Callout,
} from '../models';
import { AbstractDataAdapter } from './data-adapter';

export class BaseDataAdapter extends AbstractDataAdapter {
  callouts(): Callout[] {
    return [];
  }
  cards(): Card[] {
    return [];
  }
  relations(): Relation[] {
    return [];
  }
  actors(): Actor[] {
    return [];
  }
  actorGroups(): ActorGroup[] {
    return [];
  }
  hubs(): Hub[] {
    return [];
  }
  challenges(): Challenge[] {
    return [];
  }
  users(): User[] {
    return [];
  }
  opportunities(): Opportunity[] {
    return [];
  }
  organizations(): Organization[] {
    return [];
  }
  groups(): Group[] {
    return [];
  }
  hosts(): Organization[] {
    return [];
  }
}
