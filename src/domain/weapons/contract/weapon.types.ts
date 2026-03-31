import type { FromSchema } from "json-schema-to-ts";

import {
  SOURCE_PROVIDER,
  WEAPON_SCHEMA_VERSION,
  weaponV1Schema,
} from "../../../../contracts/weapon-v1.schema";

export { SOURCE_PROVIDER, WEAPON_SCHEMA_VERSION };

export type WeaponRecordV1 = FromSchema<typeof weaponV1Schema>;
export type WeaponSummaryMetrics = WeaponRecordV1["summary"];
export type WeaponAttacks = WeaponRecordV1["attacks"];
export type WeaponCoreAttack = WeaponAttacks["slash"];
export type WeaponOptionalAttack = NonNullable<WeaponAttacks["special"]>;
export type WeaponSourceMeta = WeaponRecordV1["source"];
