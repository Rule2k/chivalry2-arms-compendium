export const CHIVALRY2_SOURCE_PROVIDER = "chivalry2-weapons" as const;

export type Chivalry2RawAttackWindow = {
  damage: number;
  staminaDamage: number;
  windup: number;
  release: number;
  recovery: number;
};

export type Chivalry2RawCoreAttack = {
  range: number;
  light: Chivalry2RawAttackWindow;
  heavy: Chivalry2RawAttackWindow;
};

export type Chivalry2RawOptionalAttack = Chivalry2RawAttackWindow;

export type Chivalry2RawWeaponAttacks = {
  [attackName: string]: unknown;
  slash?: Chivalry2RawCoreAttack;
  overhead?: Chivalry2RawCoreAttack;
  stab?: Chivalry2RawCoreAttack;
  special?: Chivalry2RawOptionalAttack;
  sprintAttack?: Chivalry2RawOptionalAttack;
  sprintCharge?: Chivalry2RawOptionalAttack;
  throw?: Chivalry2RawOptionalAttack;
};

export type Chivalry2RawWeapon = {
  id: string;
  name: string;
  aliases?: string[];
  classes?: string[];
  subclasses?: string[];
  weaponTypes: string[];
  damageType: string;
  attacks: Chivalry2RawWeaponAttacks;
};

export type Chivalry2SourceWeaponEntry = {
  weaponKey: string;
  weapon: Chivalry2RawWeapon;
};

export type Chivalry2SourcePackageMeta = {
  provider: typeof CHIVALRY2_SOURCE_PROVIDER;
  version: string;
  packageRoot: string;
  weaponsDirectory: string;
};
