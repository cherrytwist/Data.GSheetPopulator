import { SpaceCollaboration } from './spaceCollaboration';
import { SpaceCommunity } from './spaceCommunity';
import { SpaceProfile } from './spaceProfile';

// Combine spaceProfile and spaceCommunity into one type
export type SpaceFull = SpaceProfile & SpaceCommunity & SpaceCollaboration;
