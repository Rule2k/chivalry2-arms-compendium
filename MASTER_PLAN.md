# Master Plan

## 1. Role of This Document

This file is the project's global reference document.

It is used to:
- preserve strategic context across sessions;
- summarize the project's purpose, scope, constraints, and major workstreams;
- track macro-level progress;
- provide a stable base for generating future implementation plans.

This file must not become a task list or a technical implementation document.

## 2. Project Identity

### Project Name

TBD.

Current working repository name: `chivalry`.

### One-Sentence Summary

A website that displays Chivalry 2 weapon statistics in a way that is simple, clear, and still detailed enough to be genuinely useful.

### Problem Being Solved

Chivalry 2 does not provide a simple way to view all weapon statistics in one place. In-game information is too simplified and must be viewed weapon by weapon, while existing third-party resources with detailed stats are often too complex to browse comfortably.

### Target Users / Audience

Primary audience:
- the project owner;
- Chivalry 2 players who want a clear and accessible way to explore weapon statistics.

This is a personal project, not a professional or commercial initiative.

### Expected Value

The project should provide a clear and easy-to-use reference for Chivalry 2 weapon statistics, balancing simplicity and useful detail.

## 3. Vision and Success Criteria

### Long-Term Vision

The project should become the go-to website for players who want a clean interface to explore Chivalry 2 weapon statistics without dealing with overly simplified in-game views or overly complex community resources.

### Success Criteria

The project is successful if:
- players actively use it to inspect weapon statistics;
- the interface is perceived as clear and easy to navigate;
- the data is detailed enough to be genuinely useful;
- the site earns recognition within the Chivalry 2 player community as a good reference.

Examples:
- product adoption;
- business impact;
- quality level;
- operational stability;
- user satisfaction.

### Failure Criteria

The project is off-track if:
- the data becomes stale and cannot be maintained with reasonable effort;
- the interface ends up as confusing as the existing alternatives;
- the site does not provide enough useful detail to justify its existence.

## 4. Scope

### In Scope

Initial scope includes:
- a front-end website focused on Chivalry 2 weapon statistics;
- a complete reference of the weapons covered by the current data source;
- a main page that shows all weapons by default;
- filtering by class, weapon name, and weapon type;
- sorting by key stats such as damage, range, and speed;
- clear weapon detail views;
- weapon comparison capabilities;
- two-weapon comparison through direct selection in the interface;
- derived values and calculations when they can be reliably produced from the available source data;
- an interface that stays simple to use while still exposing meaningful detail.

### Out of Scope

Explicitly out of scope for now:
- advanced analytics;
- a public API;
- a back-office in the initial version;
- admin accounts in the initial version;
- non-essential product complexity that would make the experience harder to use.

### Initial Assumptions

Current assumptions:
- V1 can be delivered as a front-end-only application;
- V1 will rely on the existing `chivalry2-weapons` library as its primary source of data;
- the first useful version is a complete weapon reference site with easy comparison between weapons;
- the homepage or main page is the core product surface, not a navigation hub;
- the default browsing experience should expose all weapons immediately;
- the first browsing controls should focus on class, name, and weapon type;
- the first sorting controls should focus on damage, range, and speed;
- filtering and sorting are likely useful, but they must be integrated in a way that does not harm clarity;
- the project should be designed so that richer data dimensions can be added later, including class-dependent weapon behavior;
- the project will likely need a database;
- the project will likely need a back-office or admin workflow to keep data maintainable over time;
- the existing `chivalry2-weapons` community library can serve as an initial data foundation, even if it is outdated.

## 5. Constraints

### Business Constraints

Known business constraints:
- this is a personal project, not a commercial product;
- success should be measured in usefulness and community adoption, not revenue;
- scope discipline matters because the project is maintained by one person.

### Technical Constraints

Known technical constraints:
- the initial version is expected to be front-end only;
- the current data source is an external community library that is already outdated;
- the amount of available detail is limited by what the current library exposes and by what can be safely derived from it;
- the project should leave room for a future database and back-office without forcing them into V1.

### Delivery Constraints

Known constraints:
- this is a personal project;
- there is currently a single developer;
- long-term maintainability matters because the project depends on one person.
- V1 should stay intentionally narrow and focused.

### Quality Constraints

Known priorities:
- the interface must remain simple and clear;
- the information must remain detailed enough to be useful;
- data maintainability is a critical quality requirement.
- comparison between weapons should feel straightforward, not hidden behind a complicated UI.

## 6. Guiding Principles

The project should be guided by the following principles:
- clarity over feature depth;
- ship a usable reference experience before expanding into a broader platform;
- keep the first version intentionally front-end focused;
- design the product so the data source can evolve from a library to a database later;
- avoid UI complexity even when adding useful browsing, sorting, and comparison features;
- treat data maintainability as a first-class product concern, not a later afterthought.

## 7. Global Project Stages

This section defines the major stages of the project at a strategic level.
These are not implementation plans. They are the macro steps the project must go through.

For each stage, include:
- objective;
- why it matters;
- expected output;
- completion condition;
- dependencies.

### Stage 1. Foundation and Framing

Objective:
Clarify the project's purpose, scope, constraints, stakeholders, and success criteria.

Why it matters:
Without a clear frame, the project could become either too shallow to be useful or too complex for a solo-maintained personal project.

Expected output:
A validated project frame and aligned strategic direction.

Completion condition:
The project has a clear identity, scope, and decision basis.

Dependencies:
None. This is the starting stage.

### Stage 2. Product Definition

Objective:
Define the product shape, major capabilities, core user journeys, and value proposition.

Why it matters:
The success of the project depends heavily on presenting detailed data through a UI that remains clear and approachable.

Expected output:
A clear product definition at macro level.

Completion condition:
The project has a stable product direction that can be decomposed into concrete initiatives.

Dependencies:
Foundation and framing must be sufficiently clear.

### Stage 3. Solution Strategy

Objective:
Determine the high-level approach required to deliver the product, including platform, systems, operations, and governance considerations.

Why it matters:
The project must balance a fast front-end-first approach with a longer-term path toward maintainable data management.

Expected output:
A coherent strategic delivery direction.

Completion condition:
The project has a defensible global solution path.

Dependencies:
Product definition must be clear enough to choose an appropriate delivery strategy.

### Stage 4. Execution Structuring

Objective:
Break the project into major workstreams and identify how they relate to each other.

Why it matters:
The project needs a stable execution structure so future implementation plans can be generated cleanly without redefining the whole project each time.

Expected output:
A portfolio of workstreams ready to be converted into implementation plans.

Completion condition:
The project can be organized into execution-ready domains without ambiguity.

Dependencies:
Solution strategy must be clear enough to determine the right workstream boundaries.

### Stage 5. Incremental Delivery

Objective:
Advance the project through major releases, validations, iterations, and stabilization cycles.

Why it matters:
The product should prove its usefulness early through a public, usable site rather than waiting for a fully mature data platform.

Expected output:
Visible progress toward a usable and valuable product.

Completion condition:
The project reaches the expected level of delivery and readiness.

Dependencies:
Execution must already be structured into clear workstreams and priorities.

### Stage 6. Launch, Operation, and Evolution

Objective:
Prepare the project for real-world operation, adoption, support, and future growth.

Why it matters:
The long-term value of the project depends not only on launch, but on keeping the data current and extending the site responsibly over time.

Expected output:
A project that can run, be monitored, improved, and extended.

Completion condition:
The project is operational and has a defined evolution path.

Dependencies:
The project must already provide a usable reference experience worth operating and extending.

## 8. Major Workstreams

The project currently appears to require the following major workstreams.

### Workstream: UX and UI

Purpose:
Define and deliver an interface that makes weapon statistics easy to browse, understand, and compare.

Scope:
- information architecture;
- default all-weapons view;
- browsing flows;
- class-based filtering;
- name search;
- weapon-type filtering;
- filtering and sorting patterns;
- comparison experience;
- readability and presentation of detailed stats.

Key Questions:
- what is the best UI pattern for balancing simplicity and depth?
- how much filtering and sorting can be added without making the product feel heavy?
- how should comparison be exposed so it feels natural?
- what should remain visible on the main page versus only on a weapon detail view?

Dependencies:
- product definition;
- available shape of the source data.

Completion Condition:
The project has a clear interface direction that supports browsing and comparison without unnecessary complexity.

### Workstream: Weapon Reference and Comparison Experience

Purpose:
Turn the available weapon data into a coherent public reference product.

Scope:
- weapon catalog coverage;
- main-page-first reference experience;
- weapon detail views;
- comparison between two weapons through direct selection;
- comparison logic at product level;
- derived values that can be computed reliably from available data.

Key Questions:
- what is the minimum complete reference experience for V1?
- which derived values are truly useful and safe to expose?
- how should future dimensions such as class-dependent damage fit into the product model?
- which raw library values should be simplified, grouped, or hidden in order to stay readable?

Dependencies:
- source data quality;
- UX and UI direction.

Completion Condition:
The project has a well-defined reference experience that can serve as the first public version.

### Workstream: Data Source and Future Data Management

Purpose:
Make the project viable beyond the initial library-based version by preparing for a more maintainable data workflow.

Scope:
- evaluation of the current community library as a starting point;
- strategy for replacing or extending that source later;
- future database direction;
- future admin and back-office direction;
- long-term data update workflow.

Key Questions:
- how long can the project rely on the current library?
- what is the migration path from library-based data to database-backed data?
- when does a back-office become necessary rather than optional?

Dependencies:
- understanding of current and future data needs;
- validation that the front-end reference experience is worth maintaining long term.

Completion Condition:
The project has a credible long-term path for keeping weapon data current and extensible.

### Workstream: Deployment and Public Availability

Purpose:
Ensure the project can be deployed early and used publicly on the existing VPS.

Scope:
- readiness for public deployment;
- hosting strategy;
- operational baseline for a personal project;
- practical release path from local work to a live site.

Key Questions:
- what is the earliest point at which the site should go live?
- what operational baseline is sufficient for a personal but public site?

Dependencies:
- a usable first product slice;
- a solution strategy compatible with early deployment.

Completion Condition:
The project can be published and iterated in a live environment without unnecessary operational burden.

## 9. Global Sequence and Dependencies

Current sequencing logic:
- first clarify the reference experience and the UI direction, because these shape most downstream decisions;
- in parallel, explore the current weapon data library to understand what the product can realistically expose in V1;
- build and validate a front-end-only public reference site before investing heavily in a database or back-office;
- treat future data management as an official project track, but not as the immediate implementation focus;
- once the front-end reference site proves useful, define the migration path from library-based data to database-backed data;
- after the data model and maintenance workflow are clearer, introduce the future admin and back-office layer;
- expand the project later into richer domains such as classes and damage by target type.

Key dependency logic:
- UX and UI is the most critical workstream because the project's value depends on clarity;
- data exploration must happen early because source limitations directly affect product shape;
- back-office and admin capabilities should not drive V1, but the architecture should avoid blocking them later;
- long-term project risk is dominated by data freshness and updateability.

## 10. Risks, Unknowns, and Decision Gates

### Major Risks

Known major risks:
- obtaining reliable weapon statistics;
- keeping weapon statistics up to date over time;
- depending too heavily on an external community-maintained library that is already outdated.

### Unknowns

Current unknowns:
- the final project name;
- the best long-term process for updating weapon statistics;
- whether a database and back-office are both necessary immediately, or only later;
- the right UI pattern for browsing, filtering, sorting, and comparing weapons without making the site feel complex;
- which future data domains should be supported after weapons, and in what order.

### Decision Gates

Key decision gates:
- decide when the current library is no longer sufficient as the primary data source;
- decide when to move from a front-end-only product to a database-backed product;
- decide when a back-office becomes necessary enough to justify the added complexity;
- decide the order of post-weapon expansion, starting with likely candidates such as classes and damage by target type.

## 11. Structural Decisions

### Decision: Start With a Front-End-Only V1

Date:
2026-03-31

Status:
Validated

Context:
The project needs to prove usefulness quickly, while keeping scope controlled for a solo developer.

Decision:
The initial version will be a front-end-only application built on top of the existing community weapon library.

Impact:
This keeps the first execution phase lean, while requiring the product to stay adaptable to a future database-backed model.

### Decision: Treat Future Data Management as Part of the Master Plan

Date:
2026-03-31

Status:
Validated

Context:
The project's main long-term risk is stale data, so future maintainability cannot be ignored even if it is not part of V1.

Decision:
Database-backed data management and a future back-office are official parts of the long-term project plan.

Impact:
The architecture and product model should avoid dead ends, even while the first implementation remains front-end focused.

### Decision: Prioritize Clarity Over Feature Depth

Date:
2026-03-31

Status:
Validated

Context:
The core opportunity of the project is to make detailed weapon statistics easier to use than existing resources.

Decision:
Clarity takes priority over adding more features or more UI density.

Impact:
Feature selection, browsing patterns, and comparison workflows must all be judged primarily through usability and readability.

### Decision: Make the Main Page the Primary Product Surface

Date:
2026-03-31

Status:
Validated

Context:
The core value of the site is immediate access to weapon statistics, not deep navigation across multiple sections.

Decision:
The main page will be the primary surface of the product, showing all weapons by default and supporting browsing, filtering, sorting, and entry into comparison.

Impact:
The site should avoid unnecessary hub navigation and keep the core experience centered on direct access to weapon data.

### Decision: Default to an All-Weapons Browsing Experience

Date:
2026-03-31

Status:
Validated

Context:
The site should feel immediately useful without requiring the user to navigate through menus or select an entry point first.

Decision:
The default experience will show all weapons, with lightweight controls for filtering by class, name, and weapon type, plus sorting by major stats such as damage, range, and speed.

Impact:
The information architecture should remain flat and direct, with the main page acting as the primary discovery and comparison surface.

## 12. Global Progress

- Foundation and framing: in progress
- Product definition: in progress
- Solution strategy: in progress
- Execution structuring: in progress
- Incremental delivery: not started
- Launch, operation, and evolution: not started

## 13. Next Planning Candidates

- UX and UI exploration;
- weapon reference and comparison experience;
- source library exploration and data-shape assessment.

## 14. Session Reset Summary

This section should remain short and be updated over time.
It exists to help restart a session quickly.

### Current State

The project has just started. The repository exists, the master planning document is in place, and the first layer of strategic framing has been defined.

### Current Focus

Define the UI direction, validate the front-end reference experience, and understand the limits of the current weapon data source.

### Next High-Level Question

What exact data model and stat presentation can be supported by the current source library without making the interface confusing?

### Last Updated

2026-03-31

## 15. Usage Rules

Rules for maintaining this file:
- keep it strategic, not tactical;
- do not add fine-grained implementation tasks;
- prefer stable categories over temporary details;
- update decisions, risks, and progress when the project changes;
- use this file at the start of each session before generating detailed plans.
