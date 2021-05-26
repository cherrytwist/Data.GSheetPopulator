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
  color: string;
  // membership within an ecoverse related fields
  ecoverseID: string;
  challenges: string[];
  opportunities: string[];
  groups: string[];
};
