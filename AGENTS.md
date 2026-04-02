# AGENTS

## Repository Conventions

- Primary strategic document: `docs/MASTER_PLAN.md`
- Stage-specific implementation notes live under `docs/`
- Product contracts live under `contracts/`
- Organize code under domain-first folders such as `src/domain/weapons/`

## Working Rules

- Keep `docs/MASTER_PLAN.md` strategic, not implementation-heavy
- Record durable workflow or repository conventions here when they emerge from user feedback
- Prefer ES6 style with arrow functions for local helpers and exported functions
- Keep types in dedicated `*.types.ts` files instead of mixing them with runtime helpers
- Treat the normalized product contract as the source of truth and derive TypeScript types from it instead of duplicating domain shapes by hand
- Prefer feature-scoped folders when a domain has multiple related files

## Current Stage

- Stage 3: V1 Reference Experience

## Current Technical Direction

- Weapon contract source of truth: `contracts/weapon-v1.schema.ts`
- Catalog rules artifact: `contracts/catalog-rules.v1.json`
- Derived domain typing: `src/domain/weapons/contract/weapon.types.ts`
- Normalization helpers: `src/domain/weapons/normalization/normalization.ts`
- Source ingestion: `src/domain/weapons/source/chivalry2-source.ts`
- Catalog generation script: `scripts/build-weapons-catalog.ts`
- Validated homepage prototype reference: `prototypes/homepage-designs-v2/71-arms-compendium-codex.html`
