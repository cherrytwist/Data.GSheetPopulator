export type SpaceCommunity = {
  id: string;
  nameID: string;
  profile: {
    displayName: string;
  };
  community: {
    id: string;
    leadOrganizations: Contributor[];
    memberOrganizations: Contributor[];
    memberUsers: Contributor[];
    leadUsers: Contributor[];
  };
};

export type Contributor = {
  id: string;
  profile: {
    displayName: string;
  };
  nameID: string;
};
