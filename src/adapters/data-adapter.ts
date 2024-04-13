import {
  Callout,
  Post,
  Subspace,
  Space,
  Subsubspace,
  Organization,
  User,
} from '../inputModels';

export abstract class AbstractDataAdapter {
  abstract posts(): Post[];
  abstract callouts(): Callout[];
  abstract spaces(): Space[];
  abstract subspaces(): Subspace[];
  abstract users(): User[];
  abstract subsubspaces(): Subsubspace[];
  abstract organizations(): Organization[];
}
