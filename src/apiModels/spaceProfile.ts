export type SpaceProfile = {
  id: string;
  nameID: string;
  profile: {
    displayName: string;
    tagset?: TagsetApi;
  };
};

export type TagsetApi = {
  id: string;
  tags: string[];
};
