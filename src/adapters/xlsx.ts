import XLSX from 'xlsx';
import {
  Callout,
  Post,
  Space,
  Subspace,
  Subsubspace,
  Organization,
  User,
} from '../inputModels';
import {
  PostSheet,
  SubspacesSheet,
  SpaceSheet,
  SubsubspacesSheet,
  OrganizationsSheet,
  Sheets,
  UserSheet,
  CalloutSheet,
} from '../inputModels/sheets';
import { toArray } from '../utils/string-to-array';
import { AbstractDataAdapter } from './data-adapter';

export class XLSXAdapter extends AbstractDataAdapter {
  private workbook: XLSX.WorkBook;
  public filename!: string;

  constructor(fileName: string) {
    super();
    try {
      this.workbook = XLSX.readFile(fileName);
      this.filename = fileName;
    } catch (ex: any) {
      console.error(ex.message);
      this.workbook = XLSX.utils.book_new();
    }
  }

  callouts(): Callout[] {
    const sheet = this.workbook.Sheets[Sheets.Callouts];
    const result = XLSX.utils.sheet_to_json(sheet) as CalloutSheet[];
    return result.map(x => ({
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      description: x.DESCRIPTION,
      subspace: x.SUBSPACE,
    }));
  }

  posts(): Post[] {
    const sheet = this.workbook.Sheets[Sheets.Posts];
    const result = XLSX.utils.sheet_to_json(sheet) as PostSheet[];
    return result.map(x => ({
      type: x.TYPE,
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      description: x.DESCRIPTION,
      callout: x.CALLOUT,
      subspace: x.SUBSPACE,
      tags: toArray(x.TAGS),
      bannerURI: x.VISUAL_BANNER,
      bannerNarrowURI: x.VISUAL_BANNER_NARROW,
    }));
  }

  public subspaces(): Subspace[] {
    const sheet = this.workbook.Sheets[Sheets.Subspaces];
    const result = XLSX.utils.sheet_to_json(sheet) as SubspacesSheet[];
    return result.map(x => ({
      process: x.PROCESS === 'Y', // 'Y' or 'N
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      background: x.BACKGROUND,
      impact: x.IMPACT,
      tagline: x.TAGLINE,
      who: x.WHO,
      country: x.COUNTRY,
      city: x.CITY,
      vision: x.VISION,
      visualAvatar: x.VISUAL_AVATAR,
      visualBackground: x.VISUAL_BACKGROUND,
      visualBanner: x.VISUAL_BANNER,
      refVideo: x.REF_VIDEO,
      refJitsi: x.REF_JITSI,
      ref1Name: x.REF_1_NAME,
      ref1Value: x.REF_1_VALUE,
      ref1Description: x.REF_1_DESCRIPTION,
      leadOrganizations: toArray(x.LEAD_ORGS),
      memberOrganizations: toArray(x.MEMBER_ORGS),
      leadUsers: toArray(x.LEAD_USERS),
      memberUsers: toArray(x.MEMBER_USERS),
      tags: toArray(x.TAGS),
    }));
  }

  public users(): User[] {
    const sheet = this.workbook.Sheets[Sheets.Users];
    const result = XLSX.utils.sheet_to_json(sheet) as UserSheet[];
    return result.map(x => ({
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      firstName: x.FIRST_NAME,
      lastName: x.LAST_NAME,
      email: x.EMAIL,
      phone: x.PHONE,
      city: x.CITY,
      country: x.COUNTRY,
      gender: x.GENDER,
      avatar: x.AVATAR,
      bio: x.BIO,
      jobTitle: x.JOB_TITLE,
      keywords: toArray(x.KEYWORDS),
      linkedin: x.LINKEDIN,
      organization: x.ORGANIZATION,
      skills: toArray(x.SKILLS),
      twitter: x.TWITTER,
    }));
  }
  public subsubspaces = (): Subsubspace[] => {
    const sheet = this.workbook.Sheets[Sheets.Subsubspaces];
    const result = XLSX.utils.sheet_to_json(sheet) as SubsubspacesSheet[];
    return result.map(x => ({
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      background: x.BACKGROUND,
      parentSpace: x.SUBSPACE,
      impact: x.IMPACT,
      tagline: x.TAGLINE,
      vision: x.VISION,
      who: x.WHO,
      leadOrganizations: toArray(x.LEAD_ORGS),
      memberOrganizations: toArray(x.MEMBER_ORGS),
      leadUsers: toArray(x.LEAD_USERS),
      memberUsers: toArray(x.MEMBER_USERS),
      country: x.COUNTRY,
      city: x.CITY,
      visualAvatar: x.VISUAL_AVATAR,
      visualBackground: x.VISUAL_BACKGROUND,
      visualBanner: x.VISUAL_BANNER,
      refVideo: x.REF_VIDEO,
      refJitsi: x.REF_JITSI,
      ref1Name: x.REF_1_NAME,
      ref1Value: x.REF_1_VALUE,
      ref1Description: x.REF_1_DESCRIPTION,
      tags: toArray(x.TAGS),
    }));
  };

  public spaces(): Space[] {
    const sheet = this.workbook.Sheets[Sheets.Space];
    const result = XLSX.utils.sheet_to_json(sheet) as SpaceSheet[];

    return result.map(space => ({
      displayName: space.DISPLAY_NAME,
      nameID: space.NAME_ID,
      anonymousReadAccess: this.stringToBoolean(space.ANONYMOUS_READ_ACCESS),
      background: space.BACKGROUND,
      vision: space.VISION,
      impact: space.IMPACT,
      tagline: space.TAGLINE,
      who: space.WHO,
      host: space.HOST,
      visualAvatar: space.VISUAL_AVATAR,
      visualBackground: space.VISUAL_BACKGROUND,
      visualBanner: space.VISUAL_BANNER,
      refWebsite: space.REF_WEBSITE,
      refRepo: space.REF_REPO,
      tags: toArray(space.TAGS),
      leadUsers: toArray(space.LEAD_USERS),
    }));
  }

  public organizations = (): Organization[] => {
    const sheet = this.workbook.Sheets[Sheets.Organizations];
    const result = XLSX.utils.sheet_to_json(sheet) as OrganizationsSheet[];
    return result.map(x => ({
      displayName: x.DISPLAY_NAME,
      nameID: x.NAME_ID,
      description: x.DESCRIPTION,
      keywords: toArray(x.KEYWORDS),
      avatar: x.AVATAR,
      country: x.COUNTRY,
      city: x.CITY,
    }));
  };

  private stringToBoolean(value: string): boolean {
    if (String(value).toLowerCase() === 'false') {
      return false;
    }
    return true;
  }
}
