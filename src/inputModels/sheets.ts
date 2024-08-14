export enum Sheets {
  Callouts = 'Callouts',
  Posts = 'Posts',
  Space = 'Space',
  Information = 'Information',
  Subspaces = 'Subspaces',
  Subsubspaces = 'Subsubspaces',
  Organizations = 'Organizations',
  Users = 'Users',
}

export interface SpaceSheet {
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

export interface SubspacesSheet {
  PROCESS: string;
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

export interface SubsubspacesSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  SUBSPACE: string;
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
export interface UserSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  PHONE: string;
  CITY: string;
  COUNTRY: string;
  AVATAR: string;
  ORGANIZATION: string;
  JOB_TITLE: string;
  BIO: string;
  SKILLS: string;
  KEYWORDS: string;
  LINKEDIN: string;
  TWITTER: string;
}

export interface PostSheet {
  TYPE: string;
  NAME_ID: string;
  DISPLAY_NAME: string;
  DESCRIPTION: string;
  TAGS: string;
  VISUAL_BANNER: string;
  VISUAL_BANNER_NARROW: string;
  SUBSPACE: string;
  CALLOUT: string;
}

export interface CalloutSheet {
  NAME_ID: string;
  DISPLAY_NAME: string;
  DESCRIPTION: string;
  SUBSPACE: string;
}
