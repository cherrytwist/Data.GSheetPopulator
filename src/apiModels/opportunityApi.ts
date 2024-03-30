export type OpportunityApi = {
  id: string;
  nameID: string;
  profile: {
    displayName: string;
    tagset: {
      id: string;
    };
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
