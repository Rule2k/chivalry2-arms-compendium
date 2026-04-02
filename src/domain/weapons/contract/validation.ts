import Ajv2020 from "ajv/dist/2020";

import { weaponV1Schema } from "@contracts/weapon-v1.schema";
import type { WeaponRecordV1 } from "./weapon.types";

const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
});

const validateWeaponRecord = ajv.compile<WeaponRecordV1>(weaponV1Schema);

const formatValidationErrors = (): string => {
  return (validateWeaponRecord.errors ?? [])
    .map((error) => `${error.instancePath || "/"} ${error.message ?? "invalid"}`)
    .join("; ");
};

type WeaponRecordAssertion = (weapon: unknown) => asserts weapon is WeaponRecordV1;

export const assertWeaponRecordV1: WeaponRecordAssertion = (weapon) => {
  if (validateWeaponRecord(weapon)) {
    return;
  }

  throw new Error(`Weapon contract validation failed: ${formatValidationErrors()}`);
};

export const isWeaponRecordV1 = (weapon: unknown): weapon is WeaponRecordV1 => {
  return validateWeaponRecord(weapon);
};
