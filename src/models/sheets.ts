export enum Sheets {
  Actors = 'Actors',
  ActorGroups = 'ActorGroups',
  Callouts = 'Callouts',
  Cards = 'Cards',
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
  LEAD_USERS: string;
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
  COUNTRY: string;
  CITY: string;
  LEAD_ORGS: string;
  MEMBER_ORGS: string;
  LEAD_USERS: string;
  MEMBER_USERS: string;
  TAGS: string;
  REF_VIDEO: string;
  REF_JITSI: string;
  REF_1_NAME: string;
  REF_1_VALUE: string;
  REF_1_DESCRIPTION: string;
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
  LEAD_ORGS: string;
  MEMBER_ORGS: string;
  LEAD_USERS: string;
  MEMBER_USERS: string;
  COUNTRY: string;
  CITY: string;
  TAGS: string;
  REF_VIDEO: string;
  REF_JITSI: string;
  REF_1_NAME: string;
  REF_1_VALUE: string;
  REF_1_DESCRIPTION: string;
  VISUAL_AVATAR: string;
  VISUAL_BACKGROUND: string;
  VISUAL_BANNER: string;
}

export interface OrganizationsSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  DESCRIPTION: string;
  KEYWORDS: string;
  COUNTRY: string;
  CITY: string;
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
  GROUPS: string;
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

export interface CardSheet {
  TYPE: string;
  NAME_ID: string;
  DISPLAY_NAME: string;
  DESCRIPTION: string;
  TAGS: string;
  VISUAL_BANNER: string;
  VISUAL_BANNER_NARROW: string;
  CHALLENGE: string;
  CALLOUT: string;
}

export interface CalloutSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  DESCRIPTION: string;
  CHALLENGE: string;
}
