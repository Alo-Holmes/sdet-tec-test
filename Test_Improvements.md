# MiniMart SDET Technical Assessment — Improvements Branch

This is the **“test improvements”** branch of the MiniMart SDET technical assessment. It builds on the baseline repo to fix, enhance, and document tests, test quality, and testing strategy.

---

## Table of Contents

- [Overview](#overview)  
- [Changes / Improvements](#changes--improvements)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
- [Running the Tests](#running-the-tests)  
- [How Test Quality Was Improved](#how-test-quality-was-improved)  
- [Testing Strategy Recommendations](#testing-strategy-recommendations)  
- [Known Issues & Limitations](#known-issues--limitations)  
- [How to Contribute / Review](#how-to-contribute--review)  
- [Contact / Author](#contact--author)

---

## Overview

This repo simulates an e-commerce platform (called *MiniMart*) with both backend and frontend components. The goal of the assessment is to:

1. Identify bugs  
2. Analyze test quality  
3. Improve or write better tests  
4. Recommend overall testing strategy  
5. Document findings

The **“test improvements”** branch focuses on step 3 (improving/fixing tests) and also includes enhancements to steps 2 & 4.

---

## Changes / Improvements (on this branch)

Here are some of the things polished / fixed / added:

- Identified flaky or brittle tests, and refactored them to make them more deterministic.  
- Increased test coverage (especially in parts of the backend/services & API).  
- Added or improved unit tests for frontend components where edge cases were missing.  
- Improved end-to-end (E2E) test scenarios to better mimic realistic user flows.  
- Cleaned up or removed redundant tests.  
- Improved naming, structure, and assertions to make tests more readable and maintainable.  
- Added better documentation/comments in test files to explain “why” certain behaviors are tested (not just “what”).  
- Updated test setup / mocks to reduce coupling to implementation details (i.e. less brittle).  

---

## Project Structure

Here’s how the repo is organized (same baseline structure, with additions/modifications for tests):

minimart-sdet-test/
├── backend/ # Symfony PHP API
│ ├── src/
│ │ ├── Controller/
│ │ ├── Entity/
│ │ └── Service/
│ └── tests/
│ ├── Unit/
│ └── Api/
├── frontend/ # Vue.js application
│ ├── src/
│ │ ├── components/
│ │ ├── views/
│ │ └── store/
│ └── tests/
│ ├── unit/
│ └── e2e/
├── database/
│ └── init.sql
├── docker-compose.yml
└── docs/ (or other / your test docs & improvement logs)

yaml
Copy code

---

## Setup Instructions

To run this project locally, you’ll need:

- Docker & Docker Compose  
- Git  

Steps:

1. Clone the repository and switch to this branch:

   ```bash
   git clone <repository-url>
   cd sdet-tec-test
   git checkout test-improvements
Start up services:

bash
Copy code
docker-compose up --build
Once services are up, access:

Frontend UI: http://localhost:8082

Backend API: http://localhost:8000

Database / phpMyAdmin: http://localhost:8081

Use test credentials if needed (if still same):

Email: test@example.com

Password: password

Running the Tests
Instructions to run various types of tests:

Test Type	Command / How to Run
Backend unit tests (PHPUnit)	docker-compose exec backend ./vendor/bin/phpunit
Backend API / integration tests (Codeception)	docker-compose exec backend ./vendor/bin/codecept run
Frontend unit tests (Jest)	docker-compose exec frontend npm run test:unit
Frontend E2E tests	docker-compose exec frontend npm run test:e2e

Expect more reliable passes, fewer false positives/negatives, and better assertion coverage in this branch.

How Test Quality Was Improved
These are some of the concrete strategies / changes made to bump up test quality:

Isolation and mocking: reduced dependencies on external state where possible (mocking services, stubbing API calls), especially in frontend unit tests.

Better data setup: more careful seeding / setup so that tests don’t break due to unexpected data.

Edge case testing: included test scenarios that cover unexpected inputs, error paths, zero or empty states, etc.

Clearer assertions: instead of vague expectations (e.g. “some item exists”), use precise property checks, message content, status codes, etc.

Avoiding duplication: extracted common setup logic into helper functions or fixtures to reduce repeated boilerplate.

Naming and structure: test files and functions renamed for clarity; grouped logically so it’s easy to understand what is being tested.

Testing Strategy Recommendations (beyond this branch)
To push this further:

Introduce mutation testing (to see how “good” your tests are in catching faulty changes).

Integrate test coverage thresholds in CI/CD so that regressions or missing coverage are flagged.

Add contract/integration tests between frontend & backend (beyond just mocking): real API responses.

Add performance & load testing for critical backend endpoints.

Include exploratory/performance tests around UI interactions (e.g. slow networks, offline behavior).

Continuous monitoring of flaky tests: tracking failures over time.

Known Issues & Limitations
(These are things still open or that you chose not to address in this iteration for scope reasons.)

Some tests still depend on implementation details or fragile data assumptions.

UI E2E flows could be more comprehensive (e.g. negative/invalid inputs).

Some backend error-handling paths are not fully covered.

Timeouts / delays in tests on slower machines or CI environments may still cause flakiness.

How to Contribute / Review
If someone else is reviewing or building on this:

Focus first on failing/flaky tests – run the full suite multiple times to catch flakiness.

Review test coverage reports: check for untested edge cases especially in business logic.

When adding new features, write tests first (TDD) to force thinking about behaviour & errors.

Use peer review for test code as much as production code.

Contact / Author
Alo Holmes
QA Engineer & Test Quality Advocate
Repo: Alo-Holmes / sdet-tec-test