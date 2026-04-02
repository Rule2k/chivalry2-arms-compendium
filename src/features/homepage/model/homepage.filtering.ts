import type { WeaponRecordV1 } from "@/domain/weapons/contract/weapon.types";

import { HOMEPAGE_CLASS_HIERARCHY } from "./homepage.constants";
import type {
  HomepageClassKey,
  HomepageFilterState,
  HomepageMetricMaximums,
  HomepageMetricKey,
  HomepageSortKey,
  WeaponHomepageEntry,
} from "./homepage.types";

export const createWeaponHomepageEntries = (
  weapons: WeaponRecordV1[],
): WeaponHomepageEntry[] => {
  return weapons.map((weapon) => ({
    damageType: weapon.damageType,
    id: weapon.id,
    name: weapon.name,
    slug: weapon.slug,
    subclassAccess: weapon.subclassAccess,
    subclassAccessLabel: weapon.subclassAccess.join(", "),
    summary: weapon.summary,
    weaponTypes: weapon.weaponTypes,
    weaponTypesLabel: weapon.weaponTypes.join(", "),
  }));
};

export const getVisibleSubclassOptions = (
  activeClass: HomepageClassKey,
): string[] => {
  if (activeClass === "All") {
    return [];
  }

  return [...HOMEPAGE_CLASS_HIERARCHY[activeClass]];
};

export const getSummaryMetricMaximums = (
  weapons: WeaponHomepageEntry[],
): HomepageMetricMaximums => {
  return {
    avgHeavyDamage: Math.max(...weapons.map((weapon) => weapon.summary.avgHeavyDamage)),
    avgLightDamage: Math.max(...weapons.map((weapon) => weapon.summary.avgLightDamage)),
    avgRange: Math.max(...weapons.map((weapon) => weapon.summary.avgRange)),
    avgSpeed: Math.max(...weapons.map((weapon) => weapon.summary.avgSpeed)),
  };
};

export const filterHomepageEntries = (
  weapons: WeaponHomepageEntry[],
  filterState: HomepageFilterState,
): WeaponHomepageEntry[] => {
  const normalizedSearchTerm = filterState.searchTerm.trim().toLowerCase();
  const allowedSubclassSet = new Set<string>(
    filterState.activeClass === "All"
      ? []
      : HOMEPAGE_CLASS_HIERARCHY[filterState.activeClass],
  );

  return weapons.filter((weapon) => {
    const matchesClass =
      filterState.activeClass === "All"
        ? true
        : weapon.subclassAccess.some((subclass) => allowedSubclassSet.has(subclass));

    const matchesSubclass =
      filterState.activeSubclass === "All"
        ? true
        : weapon.subclassAccess.includes(filterState.activeSubclass);

    const matchesSearch =
      normalizedSearchTerm.length === 0
        ? true
        : weapon.name.toLowerCase().includes(normalizedSearchTerm);

    return matchesClass && matchesSubclass && matchesSearch;
  });
};

const compareMetricValues = (
  leftValue: number,
  rightValue: number,
  metricKey: HomepageMetricKey,
): number => {
  if (metricKey === "avgSpeed") {
    return leftValue - rightValue;
  }

  return rightValue - leftValue;
};

export const sortHomepageEntries = (
  weapons: WeaponHomepageEntry[],
  sortKey: HomepageSortKey,
): WeaponHomepageEntry[] => {
  const sortedWeapons = [...weapons];

  sortedWeapons.sort((leftWeapon, rightWeapon) => {
    if (sortKey === "name") {
      return leftWeapon.name.localeCompare(rightWeapon.name);
    }

    const difference = compareMetricValues(
      leftWeapon.summary[sortKey],
      rightWeapon.summary[sortKey],
      sortKey,
    );

    if (difference !== 0) {
      return difference;
    }

    return leftWeapon.name.localeCompare(rightWeapon.name);
  });

  return sortedWeapons;
};

export const getWeaponById = (
  weapons: WeaponHomepageEntry[],
  weaponId: string | null,
): WeaponHomepageEntry | null => {
  if (!weaponId) {
    return null;
  }

  return weapons.find((weapon) => weapon.id === weaponId) ?? null;
};
