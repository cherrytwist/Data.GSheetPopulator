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
import { AbstractDataAdapter } from './data-adapter';

export class BaseDataAdapter extends AbstractDataAdapter {
  aspects(): Aspect[] {
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
