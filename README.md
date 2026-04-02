# Chivalry 2 Arms Compendium

Homepage-first weapon reference for Chivalry 2.

The project ships a codex-style Next.js site backed by a normalized weapon contract and a generated V1 catalog. The current live V1 is deployed on a VPS and focuses on the highest-value browsing loop: search, class and subclass filtering, summary-metric sorting, and in-place comparison between two weapons.

## Current Status

- Stage 4 is active: public deployment and validation.
- Stage 3 is complete: the initial homepage-first V1 is built and live.
- The current generated V1 catalog includes 40 weapons and 4 documented exclusions from `chivalry2-weapons@1.0.6`.

## Current Product Surface

- main homepage weapon grid
- search by weapon name
- class and subclass filtering
- sort by summary metrics: light damage, heavy damage, range, speed
- left/right in-place comparison
- normalized weapon data loaded from generated local catalog artifacts

The launch V1 intentionally does not include a separate weapon-detail route. The normalized contract already supports deeper attack data if a later iteration needs it.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- AJV for runtime contract validation
- Vitest and Playwright for regression coverage
- Docker and Docker Compose for deployment/runtime packaging

## Data Model

The source of truth for product-facing weapon data is the normalized contract:

- schema: `contracts/weapon-v1.schema.ts`
- derived types: `src/domain/weapons/contract/weapon.types.ts`
- normalization helpers: `src/domain/weapons/normalization/normalization.ts`
- source ingestion: `src/domain/weapons/source/chivalry2-source.ts`
- catalog build script: `scripts/build-weapons-catalog.ts`
- generated artifacts: `data/weapons/catalog.v1.json` and `data/weapons/catalog.v1.exclusions.json`

The frontend consumes normalized catalog data, not raw objects from the upstream library.

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build the app:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## Catalog Workflow

Rebuild the generated weapon catalog from the upstream source package:

```bash
npm run build:weapons
```

This regenerates:

- `data/weapons/catalog.v1.json`
- `data/weapons/catalog.v1.exclusions.json`

## Quality Checks

Run linting:

```bash
npm run lint
```

Run type-checking:

```bash
npm run typecheck
```

Run unit tests:

```bash
npm run test:unit
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run the combined test suite:

```bash
npm run test
```

## Docker Runtime

Build and run the app with Docker Compose:

```bash
docker compose up --build
```

The repository runtime baseline is:

- `Dockerfile` for production image build
- `compose.yaml` for the app service and healthcheck

## Repository Guide

- `docs/MASTER_PLAN.md`: strategic source of truth
- `docs/stage-3-v1-reference-experience.md`: launch-stage summary
- `docs/stage-4-public-deployment-validation.md`: current stage note
- `contracts/`: product contracts and catalog rules
- `src/domain/weapons/`: domain model, normalization, ingestion, catalog logic
- `src/features/homepage/`: homepage product surface
- `prototypes/homepage-designs-v2/71-arms-compendium-codex.html`: validated visual reference

## Notes

This is a personal project, not a commercial product. The design goal is not exhaustive analytics; it is a clear, credible weapon reference that stays maintainable for one developer.
