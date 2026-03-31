# Master Plan

## 1. Purpose

This file is the strategic source of truth for the project.

It is used to:
- preserve project context across sessions;
- capture scope, constraints, decisions, risks, and sequencing;
- decide what should be planned next;
- reset context before generating a new implementation plan.

This file is not:
- a task list;
- a backlog;
- an implementation spec.

## 2. Project Snapshot

### Working Name

TBD.

Current repository name: `chivalry`.

### One-Sentence Summary

A website that presents Chivalry 2 weapon statistics in a way that is simple, clear, and still detailed enough to be genuinely useful.

### Problem

Chivalry 2 does not provide a simple way to inspect all weapon stats in one place. In-game information is too limited and existing community resources with deeper stats are often too hard to browse.

### Audience

- the project owner;
- Chivalry 2 players who want a clean and accessible weapon-stat reference.

This is a personal project, not a commercial product.

### Expected Value

Provide a reference site that players can actually use comfortably when comparing and understanding weapons.

### Success Looks Like

- players use it as a practical reference;
- the interface is perceived as clear;
- the stats feel detailed enough to matter;
- the site earns recognition in the Chivalry 2 community.

### Failure Looks Like

- the data becomes stale and hard to maintain;
- the UI becomes as confusing as existing alternatives;
- the site is too shallow to justify its existence.

## 3. Scope

### V1 In Scope

- front-end-only website;
- public weapon reference built from the current community library;
- all weapons shown by default on the main page;
- filtering by subclass, weapon name, and weapon type;
- sorting by core summary metrics such as damage, range, and speed;
- simple weapon component for browsing;
- detailed weapon component for deep inspection;
- in-place comparison mode between two weapons;
- derived metrics when they can be computed reliably from source data.

### V1 Out of Scope

- public API;
- advanced analytics;
- back-office;
- admin accounts;
- product complexity that hurts clarity.

### Catalog Rules For V1

Include only weapons that:
- belong to at least one subclass.

Exclude:
- `Carryable`;
- `Prop`;
- `Champion Weapon`;
- `Fists`.

## 4. Constraints and Principles

### Constraints

- solo personal project;
- V1 should stay intentionally narrow;
- long-term maintainability matters because one developer owns the project;
- current source data is external and may become stale;
- the source repository is useful but noisy, so raw source objects are not a safe long-term product contract.

### Guiding Principles

- clarity over feature depth;
- ship a usable reference experience first;
- keep V1 front-end focused;
- design for a future move from library-based data to database-backed data;
- treat data maintainability as a product concern, not just a technical concern.

## 5. Source Data Reality

Current source: `chivalry2-weapons`.

What it provides:
- a curated public export of weapons;
- structured weapon data for slash, overhead, stab, and some optional attacks;
- class-target damage-multiplier logic that can later support damage-by-target-type features.

What it does not justify yet:
- direct 1:1 use as the product data model;
- blind inclusion of every JSON file in the repository;
- exposing low-level combat tuning fields directly in the UI.

Key implications:
- the project must define its own normalized weapon model;
- the front end should depend on normalized product data, not raw library objects;
- future migration to a database should preserve that normalized contract.

## 6. Product Model For V1

### Core Surfaces

The product has two display surfaces and one shared interaction mode:
- simple weapon component;
- detailed weapon component;
- comparison mode.

Comparison mode is not a dedicated page.

### Simple Weapon Component

Purpose:
Fast scanning and sorting on the main page.

Fields:
- `name`;
- `subclassAccess`;
- `weaponTypes`;
- `damageType`;
- `avgLightDamage`;
- `avgHeavyDamage`;
- `avgRange`;
- `avgSpeed`.

Metric rules:
- `avgRange` = average of `slash.range`, `overhead.range`, and `stab.range`;
- `avgSpeed` = average windup across `slash`, `overhead`, and `stab`, using both light and heavy variants.

### Detailed Weapon Component

Purpose:
Deep inspection of a single weapon without losing readability.

Identity and access:
- `name`;
- `aliases` when useful for search;
- `subclassAccess`;
- `weaponTypes`;
- `damageType`.

Summary metrics:
- `avgLightDamage`;
- `avgHeavyDamage`;
- `avgRange`;
- `avgSpeed`.

Core attack groups:
- `slash`;
- `overhead`;
- `stab`.

For each core attack expose:
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

Optional attack groups when present:
- `special`;
- `sprintAttack`;
- `sprintCharge`;
- `throw`.

For optional attacks expose only:
- `damage`;
- `windup`;
- `release`;
- `recovery`;
- `staminaDamage`.

### Comparison Mode

Rules:
- compare exactly two weapons at a time;
- one weapon acts as the current reference;
- comparison is applied directly on the visible weapon components;
- only visible stats are compared in the current mode;
- there are no comparison-only stats;
- comparison is visual only: the same stats are shown with positive or negative highlighting.

### Hidden In V1

Do not expose unless later justified:
- turn-limit values;
- `feint`;
- `thwack`;
- `hitSuccess`;
- `blocked`;
- `worldHit`;
- `playRate`;
- `drawStrength`;
- direction fields;
- weapon tip check fields;
- similar low-level combat tuning fields.

## 7. Global Stages and Order

These stages define the macro implementation order.

### Stage 1. Strategic Framing

Goal:
Lock the project's purpose, scope, constraints, product direction, and workstreams.

Exit condition:
The master plan is good enough to generate the first implementation plan.

Status:
Current stage is effectively at the end of this phase.

### Stage 2. Source Normalization and Product Contract

Goal:
Turn the current source library into a clean project-owned weapon model and a curated V1 catalog.

Output:
- normalized weapon schema;
- clear catalog rules;
- source-to-product mapping rules.

Exit condition:
The normalized model is stable enough for front-end implementation.

Master plan checkpoint:
Return to this file when the normalized model is validated, then mark the stage complete and decide the next implementation plan.

### Stage 3. V1 Reference Experience

Goal:
Build the front-end-only weapon reference experience.

Output:
- main page browsing experience;
- simple weapon component;
- detailed weapon component;
- comparison mode;
- working filters and sorting.

Exit condition:
The site is usable as a real reference product.

Master plan checkpoint:
Return to this file when the front-end experience is usable, then decide whether the immediate next plan is stabilization, deployment, or both.

### Stage 4. Public Deployment and Validation

Goal:
Deploy the site on the VPS and validate that the live product is worth operating.

Output:
- live public site;
- basic operational confidence;
- product feedback from real use.

Exit condition:
The project is publicly accessible and stable enough to keep iterating.

Master plan checkpoint:
Return to this file after deployment and initial validation, then decide whether to continue refining V1 or move into longer-term data management work.

### Stage 5. Data Management Evolution

Goal:
Prepare the project to move beyond direct library dependency.

Output:
- database direction;
- migration path from library-based data to database-backed data;
- future admin and back-office direction.

Exit condition:
There is a credible long-term data maintenance plan.

Master plan checkpoint:
Return to this file when the future data model and maintenance workflow become concrete enough to plan implementation.

### Stage 6. Expansion

Goal:
Extend the project beyond the initial weapon reference.

Likely candidates:
- class-related data;
- damage by target type;
- later domain expansions that still respect clarity.

Exit condition:
A new product area is mature enough to deserve its own implementation plan.

Master plan checkpoint:
Return to this file before any major expansion to re-evaluate scope, risks, and sequencing.

## 8. Major Workstreams

### Workstream: UX and UI

Purpose:
Make weapon stats easy to browse, understand, and compare.

Includes:
- information architecture;
- browsing flows;
- main-page-first experience;
- filters and sorting;
- simple and detailed weapon components;
- in-place comparison behavior.

### Workstream: Weapon Reference Product

Purpose:
Define the public-facing weapon catalog, visible stat model, and comparison behavior.

Includes:
- V1 catalog curation;
- summary metrics;
- detailed stat presentation;
- decisions about what to show, simplify, or hide.

### Workstream: Data Source and Normalization

Purpose:
Own the product data contract independently of the source library.

Includes:
- normalized weapon model;
- mapping from source data to product data;
- future migration path toward a database-backed model.

### Workstream: Deployment and Public Availability

Purpose:
Make the product live early on the VPS and keep the operational burden reasonable.

Includes:
- deployment path;
- public release readiness;
- basic live-operation baseline.

## 9. Sequence Logic

Implementation order:
1. finish the strategic framing in this file;
2. define the normalized weapon model and V1 catalog;
3. build the V1 front-end reference experience on top of that model;
4. deploy and validate the live site;
5. design the database/back-office evolution path;
6. expand into new data domains only after the above is stable.

Parallelism rules:
- UI direction and source-data exploration can progress together early;
- back-office thinking belongs in the master plan now, but not in immediate V1 implementation;
- deployment preparation can start before V1 is perfect, but only after the reference experience is clearly useful.

## 10. Risks, Unknowns, and Decision Gates

### Major Risks

- the source library becomes too outdated to trust;
- the product becomes coupled to a noisy source schema;
- the UI becomes too dense and loses its core advantage;
- long-term data updates become too manual to sustain.

### Current Unknowns

- final project name;
- exact normalized schema details;
- best long-term update workflow for weapon data;
- exact point at which a database becomes necessary;
- order of future expansions after weapons.

### Decision Gates

- when to stop relying on the current library as primary source;
- when to introduce a database;
- when to introduce a back-office;
- when to expand beyond the initial weapon reference.

## 11. Structural Decisions

Validated decisions:
- V1 is front-end only;
- future database-backed data management is part of the long-term plan;
- the main page is the primary product surface;
- comparison happens in-place, not on a separate page;
- subclass access is the primary availability signal in the UI;
- the project uses a normalized internal product model instead of the raw library schema;
- homepage summary metrics stay simplified and are derived from core attack data.

## 12. Progress and Next Planning Candidates

### Stage Progress

- Stage 1. Strategic framing: complete enough to proceed
- Stage 2. Source normalization and product contract: next
- Stage 3. V1 reference experience: pending
- Stage 4. Public deployment and validation: pending
- Stage 5. Data management evolution: pending
- Stage 6. Expansion: pending

### Next Planning Candidates

- normalized weapon schema;
- V1 catalog normalization rules;
- front-end component architecture for simple/detailed/comparison modes.

## 13. Session Reset Summary

### Current State

The strategic foundation is in place. The source library has been audited at a high level. The next real implementation work is to formalize the normalized weapon model and V1 catalog contract.

### Current Focus

Move from strategy into Stage 2 by defining the normalized product-facing weapon model.

### Next High-Level Question

What exact normalized schema should the project use to map source-library weapon data into simple, detailed, and comparison-ready front-end data?

### Last Updated

2026-03-31

## 14. Operating Rules

### How This File Is Used

At the start of each session:
1. read this file;
2. confirm the current stage;
3. decide whether the next action is a new implementation plan or a master-plan update.

After each implementation plan is completed:
1. return to this file;
2. update stage progress;
3. record any structural decision change;
4. decide the next stage or next implementation plan.

### Maintenance Rules

- keep this file strategic;
- do not add fine-grained implementation tasks here;
- update it when a structural decision changes;
- update it when a stage is completed or re-scoped;
- prefer stable project language over temporary execution details.
