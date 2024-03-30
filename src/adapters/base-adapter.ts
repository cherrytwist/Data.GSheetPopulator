import {
  Post,
  Challenge,
  Space,
  Opportunity,
  Organization,
  User,
  Callout,
} from '../inputModels';
import { AbstractDataAdapter } from './data-adapter';

export class BaseDataAdapter extends AbstractDataAdapter {
  callouts(): Callout[] {
    return [];
  }
  posts(): Post[] {
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
  hosts(): Organization[] {
    return [];
  }
}
