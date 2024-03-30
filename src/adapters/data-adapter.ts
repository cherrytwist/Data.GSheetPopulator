import {
  Callout,
  Post,
  Challenge,
  Space,
  Opportunity,
  Organization,
  User,
} from '../inputModels';

export abstract class AbstractDataAdapter {
  abstract posts(): Post[];
  abstract callouts(): Callout[];
  abstract spaces(): Space[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organizations(): Organization[];
}
