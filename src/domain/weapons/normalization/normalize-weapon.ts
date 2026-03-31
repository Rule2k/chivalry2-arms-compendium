import { deriveWeaponSummaryMetrics } from "../contract/weapon";
import {
  SOURCE_PROVIDER,
  WEAPON_SCHEMA_VERSION,
  type WeaponAttacks,
  type WeaponCoreAttack,
  type WeaponOptionalAttack,
  type WeaponRecordV1,
} from "../contract/weapon.types";
import type {
  Chivalry2RawCoreAttack,
  Chivalry2RawOptionalAttack,
  Chivalry2SourceWeaponEntry,
} from "../source/chivalry2-source.types";
import { createWeaponSlug, normalizeStringList } from "./normalization";
import type { WeaponNormalizationContext } from "./normalize-weapon.types";

const optionalAttackNames = [
  "special",
  "sprintAttack",
  "throw",
] as const;

type OptionalAttackName = (typeof optionalAttackNames)[number];

const mapCoreAttack = (attack: Chivalry2RawCoreAttack): WeaponCoreAttack => {
  return {
    range: attack.range,
    lightDamage: attack.light.damage,
    heavyDamage: attack.heavy.damage,
    lightWindup: attack.light.windup,
    heavyWindup: attack.heavy.windup,
    lightRelease: attack.light.release,
    heavyRelease: attack.heavy.release,
    lightRecovery: attack.light.recovery,
    heavyRecovery: attack.heavy.recovery,
    lightStaminaDamage: attack.light.staminaDamage,
    heavyStaminaDamage: attack.heavy.staminaDamage,
  };
};

const mapOptionalAttack = (
  attack: Chivalry2RawOptionalAttack,
): WeaponOptionalAttack => {
  return {
    damage: attack.damage,
    windup: attack.windup,
    release: attack.release,
    recovery: attack.recovery,
    staminaDamage: attack.staminaDamage,
  };
};

const isValidOptionalAttack = (attack: Chivalry2RawOptionalAttack): boolean => {
  return [
    attack.damage,
    attack.windup,
    attack.release,
    attack.recovery,
    attack.staminaDamage,
  ].every((value) => value >= 0);
};

const requireCoreAttack = (
  entry: Chivalry2SourceWeaponEntry,
  attackName: "slash" | "overhead" | "stab",
): Chivalry2RawCoreAttack => {
  const attack = entry.weapon.attacks[attackName];

  if (!attack) {
    throw new Error(
      `Weapon "${entry.weaponKey}" is missing the required core attack "${attackName}".`,
    );
  }

  return attack as Chivalry2RawCoreAttack;
};

const mapOptionalAttacks = (
  entry: Chivalry2SourceWeaponEntry,
): Partial<Record<OptionalAttackName, WeaponOptionalAttack>> => {
  return optionalAttackNames.reduce<Partial<Record<OptionalAttackName, WeaponOptionalAttack>>>(
    (accumulator, attackName) => {
      const attack = entry.weapon.attacks[attackName];

      if (!attack || !isValidOptionalAttack(attack as Chivalry2RawOptionalAttack)) {
        return accumulator;
      }

      return {
        ...accumulator,
        [attackName]: mapOptionalAttack(attack as Chivalry2RawOptionalAttack),
      };
    },
    {},
  );
};

export const normalizeWeaponRecordV1 = (
  entry: Chivalry2SourceWeaponEntry,
  context: WeaponNormalizationContext,
): WeaponRecordV1 => {
  const coreAttacks = {
    slash: mapCoreAttack(requireCoreAttack(entry, "slash")),
    overhead: mapCoreAttack(requireCoreAttack(entry, "overhead")),
    stab: mapCoreAttack(requireCoreAttack(entry, "stab")),
  };

  const attacks: WeaponAttacks = {
    ...coreAttacks,
    ...mapOptionalAttacks(entry),
  };

  return {
    schemaVersion: WEAPON_SCHEMA_VERSION,
    id: entry.weaponKey,
    slug: createWeaponSlug(entry.weapon.name),
    name: entry.weapon.name,
    aliases: normalizeStringList(entry.weapon.aliases ?? []),
    subclassAccess: normalizeStringList(entry.weapon.subclasses ?? []),
    weaponTypes: normalizeStringList(entry.weapon.weaponTypes),
    damageType: entry.weapon.damageType,
    summary: deriveWeaponSummaryMetrics(coreAttacks),
    attacks,
    source: {
      provider: SOURCE_PROVIDER,
      weaponKey: entry.weaponKey,
      mappingVersion: context.mappingVersion,
      libraryVersion: context.libraryVersion,
    },
  };
};
