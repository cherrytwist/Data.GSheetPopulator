import {
  Ecoverse,
  Challenge,
  User,
  Opportunity,
  Organisation,
  Group,
  Actor,
  ActorGroup,
  Relation,
} from '../models';
import { AbstractDataAdapter } from './data-adapter';

export class BaseDataAdapter extends AbstractDataAdapter {
  relations(): Relation[] {
    return [];
  }
  actors(): Actor[] {
    return [];
  }
  actorGroups(): ActorGroup[] {
    return [];
  }
  ecoverses(): Ecoverse[] {
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
  organisations(): Organisation[] {
    return [];
  }
  groups(): Group[] {
    return [];
  }
  hosts(): Organisation[] {
    return [];
  }
}
