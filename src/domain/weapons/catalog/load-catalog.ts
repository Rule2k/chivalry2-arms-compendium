import catalogData from "@data/weapons/catalog.v1.json";
import { assertWeaponRecordV1 } from "../contract/validation";
import type { WeaponRecordV1 } from "../contract/weapon.types";

let weaponCatalogCache: WeaponRecordV1[] | null = null;

const validateCatalogEntry = (entry: unknown): WeaponRecordV1 => {
  assertWeaponRecordV1(entry);

  return entry;
};

export const loadWeaponCatalogV1 = (): WeaponRecordV1[] => {
  if (weaponCatalogCache) {
    return weaponCatalogCache;
  }

  if (!Array.isArray(catalogData)) {
    throw new Error("Expected catalog.v1.json to export an array.");
  }

  weaponCatalogCache = catalogData.map(validateCatalogEntry);

  return weaponCatalogCache;
};
