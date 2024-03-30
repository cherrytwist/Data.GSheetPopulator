export type OpportunityApi = {
  id: string;
  nameID: string;
  profile: {
    displayName: string;
  };
  community: {
    id: string;
    leadOrganizations: Contributor[];
    memberOrganizations: Contributor[];
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
