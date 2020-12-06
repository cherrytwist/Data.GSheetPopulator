export enum Sheets {
  Ecoverse = 'Ecoverse',
  Information = 'Information',
  Challenges = 'Challenges',
  Opportunities = 'Opportunities',
  Organisations = 'Organisations',
  Groups = 'Groups',
  Users = 'Users',
}

export interface EcoverseSheet {
  NAME: string;
  TEXT_ID: string;
  TAGLINE: string;
  BACKGROUND: string;
  VISION: string;
  IMPACT: string;
  WHO: string;
  REF_WEBSITE: string;
  REF_LOGO: string;
  REF_REPO: string;
}

export interface ChallengesSheet {
  NAME: string;
  TEXT_ID: string;
  TAGLINE: string;
  BACKGROUND: string;
  VISION: string;
  IMPACT: string;
  WHO: string;
  VIDEO: string;
  IMAGE_FILE: string;
  IMAGE: string;
  VISUAL: string;
}

export interface OpportunitiesSheet {
  ID: string;
  NAME: string;
  TEXT_ID: string;
  CHALLENGE: string;
  TAGLINE: string;
  BACKGROUND: string;
  VISION: string;
  IMPACT: string;
  WHO: string;
  VIDEO: string;
  IMAGE: string;
}

export interface OrganisationsSheet {
  NAME: string;
  TEXT_ID: string;
  LEADING: string;
  DESCRIPTION: string;
  KEYWORDS: string;
  LOGO_FILE: string;
  LOGO: string;
}

export interface GroupsSheet {
  NAME: string;
  DESCRIPTION: string;
}

export interface UserSheet {
  FIRST_NAME: string;
  LAST_NAME: string;
  NAME: string;
  CHALLENGES: string;
  GROUPS: string;
  EMAIL: string;
  PHONE: string;
  CITY: string;
  COUNTRY: string;
  GENDER: string;
  AVATAR: string;
  ORGANISATION: string;
  JOB_TITLE: string;
  BIO: string;
  SKILLS: string;
  KEYWORDS: string;
  LINKEDIN: string;
  TWITTER: string;
  COLOR: string;
}
