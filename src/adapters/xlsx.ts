import XLSX from 'xlsx';
import {
  Actor,
  ActorGroup,
  Aspect,
  Challenge,
  Hub as Hub,
  Group,
  Opportunity,
  Organization,
  Relation,
  User,
} from '../models';
import {
  ActorGroupsSheet,
  ActorsSheet,
  AspectSheet,
  ChallengesSheet,
  HubSheet as HubSheet,
  GroupsSheet,
  OpportunitiesSheet,
  OrganizationsSheet,
  RelationSheet,
  Sheets,
  UserSheet,
} from '../models/sheets';
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
    } catch (ex) {
      console.error(ex.message);
      this.workbook = XLSX.utils.book_new();
    }
  }

  actors(): Actor[] {
    const sheet = this.workbook.Sheets[Sheets.Actors];
    const result = XLSX.utils.sheet_to_json(sheet) as ActorsSheet[];
    return result.map(x => ({
      name: x.NAME,
      description: x.DESCRIPTION,
      impact: x.IMPACT,
      actorGroup: x.ACTOR_GROUP,
      value: x.VALUE,
      opportunity: x.OPPORTUNITY,
    }));
  }

  actorGroups(): ActorGroup[] {
    const sheet = this.workbook.Sheets[Sheets.ActorGroups];
    const result = XLSX.utils.sheet_to_json(sheet) as ActorGroupsSheet[];
    return result.map(x => ({
      name: x.NAME,
      description: x.DESCRIPTION,
      opportunity: x.OPPORTUNITY,
    }));
  }

  aspects(): Aspect[] {
    const sheet = this.workbook.Sheets[Sheets.Aspects];
    const result = XLSX.utils.sheet_to_json(sheet) as AspectSheet[];
    return result.map(x => ({
      title: x.TITLE,
      explanation: x.EXPLANATION,
      framing: x.FRAMING,
      opportunity: x.OPPORTUNITY,
    }));
  }

  public challenges(): Challenge[] {
    const sheet = this.workbook.Sheets[Sheets.Challenges];
    const result = XLSX.utils.sheet_to_json(sheet) as ChallengesSheet[];
    return result.map(x => ({
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      background: x.BACKGROUND,
      impact: x.IMPACT,
      tagline: x.TAGLINE,
      who: x.WHO,
      vision: x.VISION,
      visualAvatar: x.VISUAL_AVATAR,
      visualBackground: x.VISUAL_BACKGROUND,
      visualBanner: x.VISUAL_BANNER,
      refVideo: x.REF_VIDEO,
      refJitsi: x.REF_JITSI,
      leadingOrganizations: toArray(x.LEAD_ORGS),
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
      // Membership
      challenges: toArray(x.CHALLENGES),
      groups: toArray(x.GROUPS),
      opportunities: toArray(x.OPPORTUNITIES),
    }));
  }
  public opportunities = (): Opportunity[] => {
    const sheet = this.workbook.Sheets[Sheets.Opportunities];
    const result = XLSX.utils.sheet_to_json(sheet) as OpportunitiesSheet[];
    return result.map(x => ({
      nameID: x.NAME_ID,
      displayName: x.DISPLAY_NAME,
      background: x.BACKGROUND,
      challenge: x.CHALLENGE,
      impact: x.IMPACT,
      tagline: x.TAGLINE,
      vision: x.VISION,
      who: x.WHO,
      visualAvatar: x.VISUAL_AVATAR,
      visualBackground: x.VISUAL_BACKGROUND,
      visualBanner: x.VISUAL_BANNER,
      refVideo: x.REF_VIDEO,
      refJitsi: x.REF_JITSI,
      tags: toArray(x.TAGS),
    }));
  };

  public groups = (): Group[] => {
    const sheet = this.workbook.Sheets[Sheets.Groups];
    const result = XLSX.utils.sheet_to_json(sheet) as GroupsSheet[];
    return result.map(x => ({
      name: x.NAME,
      description: x.DESCRIPTION,
      avatar: x.AVATAR,
      keywords: toArray(x.KEYWORDS),
    }));
  };

  public hubs(): Hub[] {
    const sheet = this.workbook.Sheets[Sheets.Hub];
    const result = XLSX.utils.sheet_to_json(sheet) as HubSheet[];

    return result.map(hub => ({
      displayName: hub.DISPLAY_NAME,
      nameID: hub.NAME_ID,
      anonymousReadAccess: this.stringToBoolean(hub.ANONYMOUS_READ_ACCESS),
      background: hub.BACKGROUND,
      vision: hub.VISION,
      impact: hub.IMPACT,
      tagline: hub.TAGLINE,
      who: hub.WHO,
      host: hub.HOST,
      visualAvatar: hub.VISUAL_AVATAR,
      visualBackground: hub.VISUAL_BACKGROUND,
      visualBanner: hub.VISUAL_BANNER,
      refWebsite: hub.REF_WEBSITE,
      refRepo: hub.REF_REPO,
      tags: toArray(hub.TAGS),
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
    }));
  };

  relations(): Relation[] {
    const sheet = this.workbook.Sheets[Sheets.Relations];
    const result = XLSX.utils.sheet_to_json(sheet) as RelationSheet[];

    return result.map(x => ({
      type: x.TYPE,
      actorName: x.ACTOR_NAME,
      actorRole: x.ACTOR_ROLE,
      actorType: x.ACTOR_TYPE,
      description: x.DESCRIPTION,
      opportunity: x.OPPORTUNITY,
    }));
  }

  private stringToBoolean(value: string): boolean {
    if (String(value).toLowerCase() === 'false') {
      return false;
    }
    return true;
  }
}
