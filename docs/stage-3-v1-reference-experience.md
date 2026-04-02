# Stage 3: V1 Reference Experience

## Current Stage

Stage 3 is complete.

The repository contains the launched homepage-first V1 of the public reference experience on top of the normalized V1 catalog.

## Exact Stage Objective

Stage 3 exists to turn the validated homepage direction and normalized weapon data into a usable front-end product.

This stage should prove that the project can present weapon information in a way that is both browseable and genuinely useful.

## Exit Condition

Stage 3 is complete when all of the following are true:

- the main page is usable as a real reference surface, not only a prototype translation;
- users can browse the full curated catalog with the launch filter and sorting surface;
- users can compare two weapons in place without friction;
- the normalized contract work from Stage 2 is successfully expressed through a useful public browsing experience, even if deeper inspection remains deferred;
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

The core homepage foundation is in place and has proven sufficient for an initial public launch.

This means the project moved past scaffold work and into a real product release.
The repository can already render the full generated catalog and exercise the main browsing loop on desktop and narrow mobile layouts.

Stage 3 should now be treated as closed, with Stage 4 handling live validation and any post-launch refinement decisions.

## What Moves Forward Into Stage 4

The highest-value follow-on items are now:

- validate the live VPS deployment and redeploy workflow under real operating conditions;
- strengthen regression coverage around the real catalog data and interaction edge cases;
- use real product feedback to decide whether missing surfaces such as deeper inspection or broader filtering deserve near-term scope.

## Repository Role Of This Stage

The Stage 3 implementation keeps the Stage 2 contract boundary intact:

- the front end consumes normalized catalog data rather than raw source-library objects;
- homepage interactions operate on product-facing view models derived from the contract;
- the generated catalog remains a stable local input for development and regression testing.

That direction is now considered validated enough to move into deployment validation rather than revisiting the data model again.
