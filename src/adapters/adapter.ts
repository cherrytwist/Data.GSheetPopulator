import {
  Challenge,
  Ecoverse,
  Opportunity,
  User,
  Group,
  Organisation,
} from '../models/index';

export interface DataAdapter {
  ecoverse: () => Ecoverse;
  challenges: () => Challenge[];
  users: () => User[];
  opportunities: () => Opportunity[];
  organisations: () => Organisation[];
  groups: () => Group[];
}
