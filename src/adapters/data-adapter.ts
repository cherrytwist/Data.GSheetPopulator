import {
  Challenge,
  Ecoverse,
  Opportunity,
  User,
  Group,
  Organisation,
} from '../models/index';

export abstract class AbstractDataAdapter {
  abstract ecoverses(): Ecoverse[];
  abstract challenges(): Challenge[];
  abstract users(): User[];
  abstract opportunities(): Opportunity[];
  abstract organisations(): Organisation[];
  abstract groups(): Group[];
  abstract hosts(): Organisation[];
}
