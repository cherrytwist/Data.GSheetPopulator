import {
  Actor,
  ActorGroup,
  Post,
  Challenge,
  Space,
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
  posts(): Post[] {
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
  spaces(): Space[] {
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
