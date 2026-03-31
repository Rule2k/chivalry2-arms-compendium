export const WEAPON_SCHEMA_VERSION = "weapon-v1" as const;
export const SOURCE_PROVIDER = "chivalry2-weapons" as const;

export const weaponV1Schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://chivalry.local/contracts/weapon-v1.schema.json",
  title: "Normalized Chivalry Weapon V1",
  type: "object",
  additionalProperties: false,
  required: [
    "schemaVersion",
    "id",
    "slug",
    "name",
    "aliases",
    "subclassAccess",
    "weaponTypes",
    "damageType",
    "summary",
    "attacks",
    "source",
  ],
  properties: {
    schemaVersion: {
      type: "string",
      const: WEAPON_SCHEMA_VERSION,
    },
    id: {
      type: "string",
      minLength: 1,
    },
    slug: {
      type: "string",
      minLength: 1,
    },
    name: {
      type: "string",
      minLength: 1,
    },
    aliases: {
      type: "array",
      items: {
        type: "string",
        minLength: 1,
      },
      uniqueItems: true,
    },
    subclassAccess: {
      type: "array",
      items: {
        type: "string",
        minLength: 1,
      },
      uniqueItems: true,
    },
    weaponTypes: {
      type: "array",
      items: {
        type: "string",
        minLength: 1,
      },
      uniqueItems: true,
    },
    damageType: {
      type: "string",
      minLength: 1,
    },
    summary: {
      $ref: "#/$defs/summaryMetrics",
    },
    attacks: {
      type: "object",
      additionalProperties: false,
      required: ["slash", "overhead", "stab"],
      properties: {
        slash: {
          $ref: "#/$defs/coreAttack",
        },
        overhead: {
          $ref: "#/$defs/coreAttack",
        },
        stab: {
          $ref: "#/$defs/coreAttack",
        },
        special: {
          $ref: "#/$defs/optionalAttack",
        },
        sprintAttack: {
          $ref: "#/$defs/optionalAttack",
        },
        throw: {
          $ref: "#/$defs/optionalAttack",
        },
      },
    },
    source: {
      $ref: "#/$defs/sourceMeta",
    },
  },
  $defs: {
    nonNegativeNumber: {
      type: "number",
      minimum: 0,
    },
    summaryMetrics: {
      type: "object",
      additionalProperties: false,
      required: [
        "avgLightDamage",
        "avgHeavyDamage",
        "avgRange",
        "avgSpeed",
      ],
      properties: {
        avgLightDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        avgHeavyDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        avgRange: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        avgSpeed: {
          $ref: "#/$defs/nonNegativeNumber",
        },
      },
    },
    coreAttack: {
      type: "object",
      additionalProperties: false,
      required: [
        "range",
        "lightDamage",
        "heavyDamage",
        "lightWindup",
        "heavyWindup",
        "lightRelease",
        "heavyRelease",
        "lightRecovery",
        "heavyRecovery",
        "lightStaminaDamage",
        "heavyStaminaDamage",
      ],
      properties: {
        range: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        lightDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        heavyDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        lightWindup: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        heavyWindup: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        lightRelease: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        heavyRelease: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        lightRecovery: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        heavyRecovery: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        lightStaminaDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        heavyStaminaDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
      },
    },
    optionalAttack: {
      type: "object",
      additionalProperties: false,
      required: ["damage", "windup", "release", "recovery", "staminaDamage"],
      properties: {
        damage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        windup: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        release: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        recovery: {
          $ref: "#/$defs/nonNegativeNumber",
        },
        staminaDamage: {
          $ref: "#/$defs/nonNegativeNumber",
        },
      },
    },
    sourceMeta: {
      type: "object",
      additionalProperties: false,
      required: ["provider", "weaponKey", "mappingVersion"],
      properties: {
        provider: {
          type: "string",
          const: SOURCE_PROVIDER,
        },
        weaponKey: {
          type: "string",
          minLength: 1,
        },
        mappingVersion: {
          type: "string",
          minLength: 1,
        },
        libraryVersion: {
          type: "string",
        },
      },
    },
  },
} as const;
