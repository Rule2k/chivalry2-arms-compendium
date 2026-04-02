# Master Plan

## 1. Purpose

This file is the strategic source of truth for the project.
Canonical path: `docs/MASTER_PLAN.md`.

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

Chivalry 2 Arms Compendium.

Current repository name: `chivalry2-arms-compendium`.

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
- filtering by class, subclass, and weapon name;
- sorting by core summary metrics such as damage, range, and speed;
- codex-style weapon cards for browsing;
- in-place comparison mode between two weapons;
- derived metrics when they can be computed reliably from source data.

### V1 Out of Scope

- public API;
- advanced analytics;
- back-office;
- admin accounts;
- dedicated weapon-detail route at launch;
- extra browsing controls that are not yet justified by live product use;
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

### Contract Role Beyond The Current Source

The normalized contract is not tied to file-based source ingestion.

It should continue to act as the product-facing boundary even after a move to database-backed data.

That means:
- the database is a storage and maintenance layer, not the product contract itself;
- front-end consumers should still depend on normalized product-facing weapon data;
- migration to a database should preserve the same contract whenever possible;
- ingestion, validation, and projection logic may change over time, but the product-facing contract should remain intentionally stable.

## 6. Product Model For V1

### Core Surfaces

The live V1 has one primary display surface and one shared interaction mode:
- homepage weapon card surface;
- comparison mode.

Comparison mode is not a dedicated page.

### Homepage Weapon Card Surface

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

### Deferred Detailed Inspection Surface

The normalized contract still carries enough attack data to support a future detailed inspection surface.

That deeper surface is no longer required for the launch definition of V1.

If it becomes justified by live feedback, it should preserve the same readability goals and expose:

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

Status:
The normalized contract, catalog rules, source-to-product mapping, and generated V1 catalog are now stable enough to support front-end implementation.

### Stage 3. V1 Reference Experience

Goal:
Build the front-end-only weapon reference experience.

Output:
- main page browsing experience;
- homepage weapon card surface;
- comparison mode;
- working filters and sorting.

Exit condition:
The site is usable as a real reference product through its homepage-first browsing and comparison surface.

Master plan checkpoint:
Return to this file when the front-end experience is usable, then decide whether the immediate next plan is stabilization, deployment, or both.

Status:
Stage 3 is complete. The repository contains a real Next.js homepage experience wired to the normalized V1 catalog, and that intentionally narrowed homepage-first surface was sufficient to launch the initial V1 on the VPS.

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

Status:
Stage 4 is now active. The initial V1 is deployed on the VPS, and the project has moved from pre-launch build-out into post-launch validation, operational hardening, and product feedback collection.

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
- homepage card presentation;
- in-place comparison behavior.

### Workstream: Weapon Reference Product

Purpose:
Define the public-facing weapon catalog, visible stat model, and comparison behavior.

Includes:
- V1 catalog curation;
- summary metrics;
- decisions about whether deeper stat presentation is needed after launch;
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
- deployment preparation can start before V1 is perfect, but only after the reference experience is clearly useful;
- once the site is live, further product scope should be driven by real usage and operational pain rather than assumed completeness.

## 10. Risks, Unknowns, and Decision Gates

### Major Risks

- the source library becomes too outdated to trust;
- the product becomes coupled to a noisy source schema;
- the UI becomes too dense and loses its core advantage;
- long-term data updates become too manual to sustain.

### Current Unknowns

- final shape of any post-launch detailed weapon-inspection surface;
- best long-term update workflow for weapon data;
- what real users most need beyond the homepage-first V1;
- exact point at which a database becomes necessary;
- order of future expansions after weapons.

### Decision Gates

- when to stop relying on the current library as primary source;
- when to introduce a database;
- when to introduce a back-office;
- when to expand beyond the initial weapon reference.

## 11. Structural Decisions

Validated decisions:
- the working product name is "Chivalry 2 Arms Compendium";
- V1 is front-end only;
- future database-backed data management is part of the long-term plan;
- the main page is the primary product surface;
- comparison happens in-place, not on a separate page;
- the initial live V1 is intentionally homepage-first and does not include a separate weapon-detail route;
- subclass access is the primary availability signal in the UI;
- the project uses a normalized internal product model instead of the raw library schema;
- the normalized weapon contract acts as the source of truth for product-facing weapon data, and TypeScript types should be derived from that contract rather than duplicated by hand;
- generated normalized datasets are useful development and validation artifacts now, and may later serve as snapshots, fixtures, regression references, or export projections even after the project adopts a database;
- the current catalog build script is the first form of the ingestion pipeline and may later evolve into a database import, sync, or validation script rather than being discarded;
- homepage summary metrics stay simplified and are derived from core attack data;
- homepage design direction is validated: `prototypes/homepage-designs-v2/71-arms-compendium-codex.html` is the chosen reference prototype;
- the Stage 3 front-end implementation is anchored on a Next.js App Router application that consumes the generated normalized catalog directly and keeps homepage comparison and filtering as client-side interactions;
- the live deployment baseline is Docker-based and currently runs on the VPS through the repository's container runtime files.

### Homepage Design Direction

The chosen design emerged from 7 waves of iterative prototyping (71 designs total). The final prototype combines:

- **Identity**: "Chivalry 2 Arms Compendium" — positions the site as a scholarly weapon reference, not a comparison tool.
- **Aesthetic**: Royal Decree / medieval parchment style — ivory/cream background, royal blue + gold palette, Cormorant Garamond + Alegreya fonts, gold double borders, fleur-de-lis motifs, linen noise texture.
- **Weapon cards**: Codex-page entries in a 2-column grid — centered weapon name, damage type badge, gold rule separator, full-width stat bars, meta info (type/class), and Set Left / Set Right comparison buttons.
- **Comparison mode**: Mirrored stat bars (left grows right-to-left, right grows left-to-right), VS shield badge, winner gets gold bar + green value, Speed stat uses lower-is-better logic.
- **Selection states**: Neutral gold (left) and royal blue (right) — no green/red highlighting on weapon cards or buttons.
- **Controls**: Search, class/subclass filtering, and sort by stat.
- **Footer**: Minimal ornamental rule with subtle text.

## 12. Progress and Next Planning Candidates

### Stage Progress

- Stage 1. Strategic framing: complete
- Stage 2. Source normalization and product contract: complete
- Stage 3. V1 reference experience: complete — the homepage-first reference experience is implemented and deployed as the initial live V1
- Stage 4. Public deployment and validation: current stage — the VPS deployment is live and now needs operating confidence, feedback, and iteration discipline
- Stage 5. Data management evolution: pending
- Stage 6. Expansion: pending

### Next Planning Candidates

- validate live stability and the redeploy workflow on the VPS.
- decide whether post-launch product feedback justifies a deeper inspection surface or broader filtering.
- define the next sustainable data refresh workflow from source package to deployed catalog.

## 13. Session Reset Summary

### Current State

Stages 1 through 3 are complete. The project now has a live VPS deployment of the homepage-first V1: a real Next.js reference site wired to the normalized catalog, with search, class/subclass browsing, sorting, and in-place comparison built on top of the validated prototype direction. The chosen prototype remains `prototypes/homepage-designs-v2/71-arms-compendium-codex.html`, but the current strategic question is no longer how to reach launch. It is how to validate and evolve the live product without adding premature scope.

### Current Focus

Run Stage 4 well: keep the live VPS deployment stable, tighten redeploy confidence, observe what real use reveals about missing product surface area, and only then decide whether the next step is V1 refinement or longer-term data-management planning.

### Next High-Level Question

What does the live VPS deployment reveal as the highest-value next move: operational hardening, targeted V1.1 product refinement, or longer-term data-management planning?

### Last Updated

2026-04-02

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
