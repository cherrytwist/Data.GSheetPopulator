import {
  Ecoverse,
  Challenge,
  User,
  Opportunity,
  Organisation,
  Group,
} from '../models';
import { AbstractDataAdapter } from './data-adapter';

export class BaseDataAdapter extends AbstractDataAdapter {
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
