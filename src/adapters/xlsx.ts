import XLSX from 'xlsx';
import {
  Challenge,
  Ecoverse,
  Group,
  Opportunity,
  Organisation,
  User,
} from '../models';
import {
  ChallengesSheet,
  EcoverseSheet,
  GroupsSheet,
  OpportunitiesSheet,
  OrganisationsSheet,
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
      organisation: x.ORGANISATION,
      skills: toArray(x.SKILLS),
      twitter: x.TWITTER,
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

  public organisations = (): Organisation[] => {
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

  public hosts = (): Organisation[] => {
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
}
