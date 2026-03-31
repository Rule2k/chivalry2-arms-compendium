export type CatalogCandidate = {
  name: string;
  subclassAccess: string[];
  weaponTypes: string[];
};

export type CatalogEligibility = {
  included: boolean;
  reasons: string[];
};
