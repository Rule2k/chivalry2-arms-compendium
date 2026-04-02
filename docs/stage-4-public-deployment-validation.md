# Stage 4: Public Deployment and Validation

## Current Stage

Stage 4 is now active.

The initial V1 has been deployed on the VPS, so the project has moved out of pre-launch delivery and into live-operation validation.

## Exact Stage Objective

Stage 4 exists to answer a practical question:

Is the live homepage-first V1 stable, useful, and maintainable enough to keep operating and iterating?

This stage is about validating the deployed product without reflexively expanding scope.

## Exit Condition

Stage 4 is complete when all of the following are true:

- the VPS deployment and restart behavior are trusted enough for routine operation;
- redeploying the site is straightforward and repeatable;
- the live product has enough stability to keep online with low drama;
- real usage or direct feedback has clarified whether the next move should be V1 refinement or longer-term data-management work.

## What Is Already True

The repository already contains the baseline needed for this stage:

- a Next.js App Router site that renders the generated normalized weapon catalog;
- a Docker runtime via `Dockerfile`;
- a simple deployment composition via `compose.yaml`;
- a healthcheck on the app container;
- unit and end-to-end coverage for the main homepage flow;
- generated V1 catalog artifacts under `data/weapons/`.

## What Stage 4 Should Validate

The main validation themes are:

- operational confidence on the VPS, especially restart and redeploy behavior;
- release confidence, including build, test, and deployment checks that stay proportionate to the project;
- product usefulness of the current homepage-first scope;
- clarity on whether missing product surface area is a real user problem or just a design ambition.

## Decision Pressure In This Stage

Stage 4 should avoid two common mistakes:

- declaring the live V1 "done" without enough operating confidence;
- expanding into deeper browsing or detail surfaces before live feedback proves they matter.

## Likely Outcomes

By the end of Stage 4, the project should be ready to choose one of these directions:

- continue refining the live V1 with targeted product improvements;
- move toward Stage 5 and formalize the long-term data maintenance plan;
- do both in a narrow, staged way if operational needs and product needs are both clear.
