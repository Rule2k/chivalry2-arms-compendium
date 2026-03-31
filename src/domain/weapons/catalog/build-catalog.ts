import { assertWeaponRecordV1 } from "../contract/validation";
import type { Chivalry2SourceWeaponEntry } from "../source/chivalry2-source.types";
import { normalizeWeaponRecordV1 } from "../normalization/normalize-weapon";
import type { WeaponNormalizationContext } from "../normalization/normalize-weapon.types";
import { evaluateCatalogEligibilityV1 } from "./catalog";
import type {
  WeaponCatalogBuildResultV1,
  WeaponCatalogExclusionV1,
} from "./build-catalog.types";

const sortByName = <T extends { name: string }>(records: T[]): T[] => {
  return [...records].sort((left, right) => left.name.localeCompare(right.name));
};

const sortExclusions = (
  exclusions: WeaponCatalogExclusionV1[],
): WeaponCatalogExclusionV1[] => {
  return [...exclusions].sort((left, right) => left.name.localeCompare(right.name));
};

export const buildWeaponCatalogV1 = (
  entries: Chivalry2SourceWeaponEntry[],
  context: WeaponNormalizationContext,
): WeaponCatalogBuildResultV1 => {
  const weapons: WeaponCatalogBuildResultV1["weapons"] = [];
  const excluded: WeaponCatalogExclusionV1[] = [];

  for (const entry of entries) {
    const normalizedWeapon = normalizeWeaponRecordV1(entry, context);
    assertWeaponRecordV1(normalizedWeapon);

    const eligibility = evaluateCatalogEligibilityV1({
      name: normalizedWeapon.name,
      subclassAccess: normalizedWeapon.subclassAccess,
      weaponTypes: normalizedWeapon.weaponTypes,
    });

    if (!eligibility.included) {
      excluded.push({
        weaponKey: normalizedWeapon.source.weaponKey,
        name: normalizedWeapon.name,
        reasons: eligibility.reasons,
      });
      continue;
    }

    weapons.push(normalizedWeapon);
  }

  return {
    excluded: sortExclusions(excluded),
    weapons: sortByName(weapons),
  };
};
