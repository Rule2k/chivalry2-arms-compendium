# Stage 2: Source Normalization and Product Contract

## Current Stage

The project entered Stage 2 from a repository that initially contained only the strategic master plan.

The implementation goal of this stage is to define a project-owned V1 weapon contract that is stable enough to support the future front-end without depending on the raw source-library shape.

## Exact Stage Objective

Stage 2 exists to lock three things:

1. the normalized weapon schema the project will own;
2. the catalog curation rules that decide which weapons belong in V1;
3. the mapping rules that translate source-library data into product-facing data.

This stage does not build the final UI.
It defines the contract that the UI will trust.

## Exit Condition

Stage 2 is complete when all of the following are true:

- the normalized weapon model is explicit and versioned;
- the V1 catalog rules are explicit and testable;
- the source-to-product mapping rules are documented;
- the contract fully covers the simple view, detailed view, and comparison mode;
- the future Stage 3 UI can consume normalized data without reading raw library objects.

## Contract Decisions Locked In This Stage

The master plan already fixed the visible product fields.
This stage adds the missing implementation decisions required to make the contract executable:

- each normalized weapon has a stable `id` and `slug`;
- `aliases` is always present, even when empty;
- the three core attacks `slash`, `overhead`, and `stab` are required;
- optional attacks are present only when the source provides them;
- summary metrics are derived from the three core attacks only;
- hidden low-level combat tuning fields are dropped from the product model;
- source metadata is retained in a minimal internal block for traceability.

## Summary Metric Rules

These rules are now fixed for V1:

- `avgLightDamage` = mean of `slash.lightDamage`, `overhead.lightDamage`, and `stab.lightDamage`;
- `avgHeavyDamage` = mean of `slash.heavyDamage`, `overhead.heavyDamage`, and `stab.heavyDamage`;
- `avgRange` = mean of `slash.range`, `overhead.range`, and `stab.range`;
- `avgSpeed` = mean of the six windup values across core attacks:
  `slash.lightWindup`, `slash.heavyWindup`, `overhead.lightWindup`, `overhead.heavyWindup`, `stab.lightWindup`, `stab.heavyWindup`.

The contract stores the derived values directly so the UI can sort and compare without recomputing them from raw source objects.

## V1 Catalog Rules

Include only weapons that:

- belong to at least one subclass.

Exclude any weapon whose `weaponTypes` contains:

- `Carryable`;
- `Prop`;
- `Champion Weapon`.

Exclude any weapon whose `name` is:

- `Fists`.

These rules are product rules, not source-library rules.
They should be enforced after normalization and before publication to the front end.

## Source-to-Product Mapping Rules

### Identity

- derive a stable product `id`;
- derive a URL-safe `slug` from the product name;
- keep the source weapon key in `source.weaponKey`.

### Classification

- map source subclass membership into `subclassAccess`;
- map source weapon categories into `weaponTypes`;
- map the primary damage category into `damageType`;
- normalize array values by trimming, deduplicating, and sorting them for deterministic output.

### Core Attacks

The source must provide enough data to build all three core groups:

- `slash`;
- `overhead`;
- `stab`.

Each core group must expose:

- `range`;
- `lightDamage`;
- `heavyDamage`;
- `lightWindup`;
- `heavyWindup`;
- `lightRelease`;
- `heavyRelease`;
- `lightRecovery`;
- `heavyRecovery`;
- `lightStaminaDamage`;
- `heavyStaminaDamage`.

If one of these core groups cannot be built, the weapon is not valid for the normalized V1 contract.

### Optional Attacks

When present in the source, normalize these groups:

- `special`;
- `sprintAttack`;
- `throw`.

Each optional group is flattened into:

- `damage`;
- `windup`;
- `release`;
- `recovery`;
- `staminaDamage`.

If an optional attack exists in the source but uses placeholder negative values for one of these visible fields, omit that attack from the normalized V1 record instead of emitting invalid product data.

### Hidden Source Fields

Do not carry these into the product contract unless a later stage explicitly reopens the decision:

- turn limits;
- `feint`;
- `thwack`;
- `hitSuccess`;
- `blocked`;
- `worldHit`;
- `playRate`;
- `drawStrength`;
- direction fields;
- weapon tip check fields;
- similar low-level combat tuning values.

## Immediate Execution Outcome In This Repository

The Stage 2 implementation now starts with:

- a versioned weapon schema that acts as the source of truth for the product contract;
- catalog rules encoded as data and domain helpers;
- TypeScript domain types derived from that schema, plus summary-metric helpers;
- a source-ingestion path that reads the `chivalry2-weapons` JSON files directly;
- a catalog build script that generates normalized V1 data and an exclusion report.

Current generated artifacts:

- `data/weapons/catalog.v1.json`
- `data/weapons/catalog.v1.exclusions.json`

Current implementation entry point:

- `npm run build:weapons`

Current observed output from the source library:

- 40 weapons are included in the V1 catalog;
- 4 weapons are excluded by catalog policy;
- no duplicate product names or slugs were generated;
- `special` is absent for `Spear` for the same reason.

## Role In A Future Database-Backed Model

These Stage 2 artifacts are not throwaway work that only exists for the file-based version of the project.

### Contract

The weapon contract remains the stable product-facing boundary even if storage later moves to a database.

The goal is for the front end to keep depending on the normalized product model, not on database tables or raw source-library objects.

### Generated Data

The generated catalog files are useful now as:

- stable inputs for front-end work;
- readable snapshots of the normalized product output;
- regression references for future mapping changes.

Later, even with a database, they may still remain useful as:

- fixtures for local development;
- snapshots for migration verification;
- export projections of the current public catalog.

### Build Script

The current build script is the first version of the ingestion pipeline.

Today it reads raw source files and emits normalized product data.
Later it can evolve to:

- import normalized data into a database;
- resync the database from the upstream source;
- validate that stored records still conform to the product contract;
- emit product-facing exports or reports.

That review is now complete: the normalized model is considered stable enough to close Stage 2. The next implementation step is to start Stage 3 by building the real front-end on top of the generated V1 catalog and the validated homepage prototype.
