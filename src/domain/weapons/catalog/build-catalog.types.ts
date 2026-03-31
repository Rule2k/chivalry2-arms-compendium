import type { WeaponRecordV1 } from "../contract/weapon.types";

export type WeaponCatalogExclusionV1 = {
  weaponKey: string;
  name: string;
  reasons: string[];
};

export type WeaponCatalogBuildResultV1 = {
  excluded: WeaponCatalogExclusionV1[];
  weapons: WeaponRecordV1[];
};
