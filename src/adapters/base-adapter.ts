import {
  Post,
  Space,
  Subspace,
  Subsubspace,
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
  subspaces(): Subspace[] {
    return [];
  }
  users(): User[] {
    return [];
  }
  subsubspaces(): Subsubspace[] {
    return [];
  }
  organizations(): Organization[] {
    return [];
  }
  hosts(): Organization[] {
    return [];
  }
}
