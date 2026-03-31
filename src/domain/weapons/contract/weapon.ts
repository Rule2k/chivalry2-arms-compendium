import type { WeaponAttacks, WeaponSummaryMetrics } from "./weapon.types";

const average = (values: number[]): number => {
  if (values.length === 0) {
    throw new Error("Cannot average an empty list of values.");
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const deriveWeaponSummaryMetrics = (
  attacks: Pick<WeaponAttacks, "slash" | "overhead" | "stab">,
): WeaponSummaryMetrics => {
  return {
    avgLightDamage: average([
      attacks.slash.lightDamage,
      attacks.overhead.lightDamage,
      attacks.stab.lightDamage,
    ]),
    avgHeavyDamage: average([
      attacks.slash.heavyDamage,
      attacks.overhead.heavyDamage,
      attacks.stab.heavyDamage,
    ]),
    avgRange: average([
      attacks.slash.range,
      attacks.overhead.range,
      attacks.stab.range,
    ]),
    avgSpeed: average([
      attacks.slash.lightWindup,
      attacks.slash.heavyWindup,
      attacks.overhead.lightWindup,
      attacks.overhead.heavyWindup,
      attacks.stab.lightWindup,
      attacks.stab.heavyWindup,
    ]),
  };
};
