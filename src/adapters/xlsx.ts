import XLSX from 'xlsx';
import {
  Actor,
  ActorGroup,
  Aspect,
  Challenge,
  Ecoverse,
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
  EcoverseSheet,
  GroupsSheet,
  OpportunitiesSheet,
  OrganisationsSheet,
  RelationSheet,
  Sheets,
  UserSheet,
} from '../models/sheets';
import { toArray } from '../utils/string-to-array';
import { AbstractDataAdapter } from './data-adapter';

export class XLSXAdapter extends AbstractDataAdapter {
  private workbook: XLSX.WorkBook;

  constructor(fileName: string) {
    super();
    try {
      this.workbook = XLSX.readFile(fileName);
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
      name: x.NAME,
      textID: x.TEXT_ID,
      background: x.BACKGROUND,
      image: x.IMAGE,
      imageFile: x.IMAGE_FILE,
      impact: x.IMPACT,
      tagline: x.TAGLINE,
      textId: x.TEXT_ID,
      video: x.VIDEO,
      vision: x.VISION,
      visual: x.VISUAL,
      who: x.WHO,
      leadingOrganisations: toArray(x.LEAD_ORGS),
    }));
  }

  public users(): User[] {
    // TODO [ATS]: Add Challenges and Groups
    const sheet = this.workbook.Sheets[Sheets.Users];
    const result = XLSX.utils.sheet_to_json(sheet) as UserSheet[];
    return result.map(x => ({
      name: x.NAME,
      firstName: x.FIRST_NAME,
      lastName: x.LAST_NAME,
      email: x.EMAIL,
      phone: x.PHONE,
      city: x.CITY,
      country: x.COUNTRY,
      gender: x.GENDER,
      avatar: x.AVATAR,
      bio: x.BIO,
      challenges: toArray(x.CHALLENGES),
      color: x.COLOR,
      groups: toArray(x.GROUPS),
      jobTitle: x.JOB_TITLE,
      keywords: toArray(x.KEYWORDS),
      linkedin: x.LINKEDIN,
      organization: x.ORGANISATION,
      skills: toArray(x.SKILLS),
      twitter: x.TWITTER,
      opportunities: toArray(x.OPPORTUNITIES),
    }));
  }
  public opportunities = (): Opportunity[] => {
    const sheet = this.workbook.Sheets[Sheets.Opportunities];
    const result = XLSX.utils.sheet_to_json(sheet) as OpportunitiesSheet[];
    return result.map(x => ({
      id: x.ID,
      name: x.NAME,
      textID: x.TEXT_ID,
      background: x.BACKGROUND,
      challenge: x.CHALLENGE,
      image: x.IMAGE,
      impact: x.IMPACT,
      tagline: x.TAGLINE,
      textId: x.TEXT_ID,
      video: x.VIDEO,
      vision: x.VISION,
      who: x.WHO,
    }));
  };

  public groups = (): Group[] => {
    const sheet = this.workbook.Sheets[Sheets.Groups];
    const result = XLSX.utils.sheet_to_json(sheet) as GroupsSheet[];
    return result.map(x => ({
      name: x.NAME,
      description: x.DESCRIPTION,
    }));
  };

  public ecoverses(): Ecoverse[] {
    const sheet = this.workbook.Sheets[Sheets.Ecoverse];
    const result = XLSX.utils.sheet_to_json(sheet) as EcoverseSheet[];

    return result.map(ecoverse => ({
      name: ecoverse.NAME,
      textId: ecoverse.TEXT_ID,
      background: ecoverse.BACKGROUND,
      vision: ecoverse.VISION,
      impact: ecoverse.IMPACT,
      tagline: ecoverse.TAGLINE,
      who: ecoverse.WHO,
      refLogo: ecoverse.REF_LOGO,
      refRepo: ecoverse.REF_REPO,
      refWebsite: ecoverse.REF_WEBSITE,
    }));
  }

  public organizations = (): Organization[] => {
    const sheet = this.workbook.Sheets[Sheets.Organisations];
    const result = XLSX.utils.sheet_to_json(sheet) as OrganisationsSheet[];
    return result.map(x => ({
      name: x.NAME,
      textId: x.TEXT_ID,
      leading: toArray(x.LEADING),
      description: x.DESCRIPTION,
      keywords: toArray(x.KEYWORDS),
      logo: x.LOGO,
      logoFile: x.LOGO_FILE,
    }));
  };

  public hosts = (): Organization[] => {
    const sheet = this.workbook.Sheets[Sheets.Host];
    const result = XLSX.utils.sheet_to_json(sheet) as OrganisationsSheet[];

    return result.map(host => ({
      name: host.NAME,
      textId: host.TEXT_ID,
      leading: toArray(host.LEADING),
      description: host.DESCRIPTION,
      keywords: toArray(host.KEYWORDS),
      logo: host.LOGO,
      logoFile: host.LOGO_FILE,
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
}
