import type { WeaponRecordV1 } from "@/domain/weapons/contract/weapon.types";
import {
  HOMEPAGE_CLASS_HIERARCHY,
  createWeaponHomepageEntries,
} from "@/features/homepage/model/homepage.model";
import type { WeaponHomepageEntry } from "@/features/homepage/model/homepage.types";

const weaponFixture = (
  weapon: Partial<WeaponRecordV1> & Pick<WeaponRecordV1, "id" | "name">,
): WeaponRecordV1 => {
  return {
    aliases: [],
    attacks: {
      overhead: {
        heavyDamage: 60,
        heavyRecovery: 600,
        heavyRelease: 200,
        heavyStaminaDamage: 20,
        heavyWindup: 350,
        lightDamage: 40,
        lightRecovery: 500,
        lightRelease: 180,
        lightStaminaDamage: 12,
        lightWindup: 200,
        range: 150,
      },
      slash: {
        heavyDamage: 60,
        heavyRecovery: 600,
        heavyRelease: 200,
        heavyStaminaDamage: 20,
        heavyWindup: 350,
        lightDamage: 40,
        lightRecovery: 500,
        lightRelease: 180,
        lightStaminaDamage: 12,
        lightWindup: 200,
        range: 150,
      },
      stab: {
        heavyDamage: 60,
        heavyRecovery: 600,
        heavyRelease: 200,
        heavyStaminaDamage: 20,
        heavyWindup: 350,
        lightDamage: 40,
        lightRecovery: 500,
        lightRelease: 180,
        lightStaminaDamage: 12,
        lightWindup: 200,
        range: 150,
      },
    },
    damageType: "Cut",
    schemaVersion: "weapon-v1",
    slug: weapon.name.toLowerCase().replace(/\s+/g, "-"),
    source: {
      mappingVersion: "test",
      provider: "chivalry2-weapons",
      weaponKey: weapon.id,
    },
    subclassAccess: [],
    summary: {
      avgHeavyDamage: 60,
      avgLightDamage: 40,
      avgRange: 150,
      avgSpeed: 300,
    },
    weaponTypes: ["Sword"],
    ...weapon,
    id: weapon.id,
    name: weapon.name,
  };
};

export const homepageWeapons: WeaponHomepageEntry[] = createWeaponHomepageEntries([
  weaponFixture({
    damageType: "Cut",
    id: "greatsword",
    name: "Greatsword",
    subclassAccess: HOMEPAGE_CLASS_HIERARCHY.Knight.slice(0, 1) as string[],
    summary: {
      avgHeavyDamage: 85,
      avgLightDamage: 60,
      avgRange: 205,
      avgSpeed: 480,
    },
    weaponTypes: ["Sword", "Two Handed"],
  }),
  weaponFixture({
    damageType: "Chop",
    id: "battle-axe",
    name: "Battle Axe",
    subclassAccess: HOMEPAGE_CLASS_HIERARCHY.Vanguard.slice(0, 1) as string[],
    summary: {
      avgHeavyDamage: 75,
      avgLightDamage: 52,
      avgRange: 180,
      avgSpeed: 440,
    },
    weaponTypes: ["Axe", "Two Handed"],
  }),
  weaponFixture({
    damageType: "Blunt",
    id: "mace",
    name: "Mace",
    subclassAccess: ["Man at Arms"],
    summary: {
      avgHeavyDamage: 58,
      avgLightDamage: 42,
      avgRange: 140,
      avgSpeed: 260,
    },
    weaponTypes: ["Mace", "One Handed"],
  }),
]);
