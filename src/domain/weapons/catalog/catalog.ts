import type {
  CatalogCandidate,
  CatalogEligibility,
} from "./catalog.types";

export const CATALOG_RULES_SCHEMA_VERSION = "catalog-rules-v1";

export const EXCLUDED_WEAPON_TYPES_V1 = [
  "Carryable",
  "Prop",
  "Champion Weapon",
] as const;

export const EXCLUDED_WEAPON_NAMES_V1 = ["Fists"] as const;

const excludedWeaponTypeSet = new Set<string>(EXCLUDED_WEAPON_TYPES_V1);
const excludedWeaponNameSet = new Set<string>(EXCLUDED_WEAPON_NAMES_V1);

export const evaluateCatalogEligibilityV1 = (
  candidate: CatalogCandidate,
): CatalogEligibility => {
  const reasons: string[] = [];

  if (candidate.subclassAccess.length === 0) {
    reasons.push("Weapon must belong to at least one subclass.");
  }

  if (excludedWeaponNameSet.has(candidate.name)) {
    reasons.push(`Weapon name "${candidate.name}" is excluded from V1.`);
  }

  const excludedTypes = candidate.weaponTypes.filter((weaponType) =>
    excludedWeaponTypeSet.has(weaponType),
  );

  if (excludedTypes.length > 0) {
    reasons.push(
      `Weapon type is excluded from V1: ${excludedTypes.join(", ")}.`,
    );
  }

  return {
    included: reasons.length === 0,
    reasons,
  };
};

export const isCatalogEligibleV1 = (candidate: CatalogCandidate): boolean => {
  return evaluateCatalogEligibilityV1(candidate).included;
};
