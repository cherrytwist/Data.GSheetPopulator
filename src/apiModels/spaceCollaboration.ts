export type SpaceCollaboration = {
  collaboration: {
    id: string;
    callouts: Callout[];
  };
};

export type Callout = {
  id: string;
  nameID: string;
  type: string;
  contributions: Contribution[];
};

export type Contribution = {
  id: string;
  post?: {
    id: string;
    nameID: string;
  };
};
