export type User = {
  nameID: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  gender: string;
  avatar: string;
  organization: string;
  jobTitle: string;
  bio: string;
  skills: string[];
  keywords: string[];
  linkedin: string;
  twitter: string;
  // membership within an Space related fields
  groups: string[];
};
