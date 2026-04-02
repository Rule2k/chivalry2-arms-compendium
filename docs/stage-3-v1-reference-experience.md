# Stage 3: V1 Reference Experience

## Current Stage

Stage 3 is no longer at the planning-only phase.

The repository now contains the first real implementation of the public reference experience on top of the normalized V1 catalog.

## Exact Stage Objective

Stage 3 exists to turn the validated homepage direction and normalized weapon data into a usable front-end product.

This stage should prove that the project can present weapon information in a way that is both browseable and genuinely useful.

## Exit Condition

Stage 3 is complete when all of the following are true:

- the main page is usable as a real reference surface, not only a prototype translation;
- users can browse the full curated catalog with the intended V1 filter and sorting surface;
- users can compare two weapons in place without friction;
- the product exposes a detailed inspection surface that justifies the normalized contract work from Stage 2;
- the implementation is stable enough to move into deployment and validation.

## What Is Now Implemented

The repository now includes:

- a real Next.js App Router application shell for the public site;
- homepage route wiring that loads the generated normalized catalog and validates entries at runtime;
- homepage view-model helpers that transform catalog records into display-ready entries;
- homepage browsing with name search, class selection, subclass filtering, and metric sorting;
- in-place two-weapon comparison with left/right slot assignment, mirrored stat comparisons, and clear actions;
- the validated codex-style visual direction translated into reusable components and shared UI primitives;
- baseline quality tooling for linting, type-checking, unit tests, and Playwright end-to-end coverage.

## Stage 3 Progress Assessment

The core homepage foundation is now in place.

This means the project has moved past scaffold work and into real product completion work.
The repository can already render the full generated catalog and exercise the main browsing loop on desktop and narrow mobile layouts.

Stage 3 is still open because the full V1 reference surface is not complete yet.

## Remaining Work To Close Stage 3

The highest-value remaining items are:

- add the remaining V1 browsing controls that are still missing from the implemented homepage surface, especially weapon-type filtering;
- build the detailed weapon inspection surface on top of the normalized attack data rather than stopping at summary cards and comparison rows;
- strengthen regression coverage around the real catalog data and interaction edge cases;
- validate release readiness through build, test, and deployment-oriented hardening once the missing product surface is in place.

## Repository Role Of This Stage

The Stage 3 implementation keeps the Stage 2 contract boundary intact:

- the front end consumes normalized catalog data rather than raw source-library objects;
- homepage interactions operate on product-facing view models derived from the contract;
- the generated catalog remains a stable local input for development and regression testing.

That direction is now considered validated enough to continue Stage 3 implementation rather than revisiting the data model again.
