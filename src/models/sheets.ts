export enum Sheets {
  Actors = 'Actors',
  ActorGroups = 'ActorGroups',
  Aspects = 'Aspects',
  Hub = 'Hub',
  Information = 'Information',
  Challenges = 'Challenges',
  Opportunities = 'Opportunities',
  Organizations = 'Organizations',
  Groups = 'Groups',
  Users = 'Users',
  Relations = 'Relations',
}

export interface HubSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  ANONYMOUS_READ_ACCESS: string;
  TAGLINE: string;
  BACKGROUND: string;
  VISION: string;
  IMPACT: string;
  WHO: string;
  HOST: string;
  TAGS: string;
  REF_WEBSITE: string;
  REF_REPO: string;
  VISUAL_AVATAR: string;
  VISUAL_BACKGROUND: string;
  VISUAL_BANNER: string;
}

export interface ChallengesSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  TAGLINE: string;
  BACKGROUND: string;
  VISION: string;
  IMPACT: string;
  WHO: string;
  LEAD_ORGS: string;
  TAGS: string;
  REF_VIDEO: string;
  REF_JITSI: string;
  VISUAL_AVATAR: string;
  VISUAL_BACKGROUND: string;
  VISUAL_BANNER: string;
}

export interface OpportunitiesSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  CHALLENGE: string;
  TAGLINE: string;
  BACKGROUND: string;
  VISION: string;
  IMPACT: string;
  WHO: string;
  TAGS: string;
  REF_VIDEO: string;
  REF_JITSI: string;
  VISUAL_AVATAR: string;
  VISUAL_BACKGROUND: string;
  VISUAL_BANNER: string;
}

export interface OrganizationsSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  DESCRIPTION: string;
  KEYWORDS: string;
  AVATAR: string;
}

export interface GroupsSheet {
  NAME: string;
  DESCRIPTION: string;
  KEYWORDS: string;
  AVATAR: string;
}

export interface UserSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  PHONE: string;
  CITY: string;
  COUNTRY: string;
  GENDER: string;
  AVATAR: string;
  ORGANIZATION: string;
  JOB_TITLE: string;
  BIO: string;
  SKILLS: string;
  KEYWORDS: string;
  LINKEDIN: string;
  TWITTER: string;
  // Hub membership
  CHALLENGES: string;
  GROUPS: string;
  OPPORTUNITIES: string;
}

export interface ActorGroupsSheet {
  NAME: string;
  DESCRIPTION: string;
  OPPORTUNITY: string;
}

export interface ActorsSheet {
  NAME: string;
  DESCRIPTION: string;
  ACTOR_GROUP: string;
  VALUE: string;
  IMPACT: string;
  OPPORTUNITY: string;
}

export interface RelationSheet {
  TYPE: string;
  ACTOR_NAME: string;
  ACTOR_TYPE: string;
  ACTOR_ROLE: string;
  DESCRIPTION: string;
  OPPORTUNITY: string;
}

export interface AspectSheet {
  TITLE: string;
  FRAMING: string;
  EXPLANATION: string;
  OPPORTUNITY: string;
}
