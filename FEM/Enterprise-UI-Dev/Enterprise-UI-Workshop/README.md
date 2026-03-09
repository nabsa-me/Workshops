# Pulse Workshop — Enterprise UI Architecture

Course materials for the Enterprise UI Architecture workshop at Frontend Masters.

## Prerequisites

- Node.js 20+ (check with `node -v`)
- pnpm 9+ (check with `pnpm -v`)
- Git

## Quick Start

```bash
git clone <repo-url>
cd pulse-workshop
pnpm install
```

## Workshop Structure

This repository is organized as branches. Each exercise starts from a checkpoint branch:

| Branch | Exercise | Topic |
|--------|----------|-------|
| `01-build-time-start` | Exercise 2 | Build-time composition |
| `02-streaming-start` | Exercise 3 | Server components & streaming |
| `03-monorepo-start` | Exercise 4 | Monorepo setup with Turborepo |
| `04-typescript-start` | Exercise 5 | TypeScript project references |
| `05-linting-start` | Exercise 6 | Architectural linting |
| `06-cicd-start` | Exercise 7 | CI/CD with GitHub Actions |
| `07-testing-start` | Exercise 8 | Testing strategies |
| `08-migration-start` | Exercise 9 | Strangler fig & codemods |
| `solution` | — | Completed reference |

## Starting an Exercise

```bash
git checkout 01-build-time-start
pnpm install
```

Then open `docs/01-build-time.md` for the walkthrough.

## If You Fall Behind

No worries — just check out the next branch. Each branch is a clean starting point:

```bash
git checkout 03-monorepo-start
pnpm install
```

## Exercise Guides

All exercise walkthroughs are in the `docs/` folder and are available on every branch:

- [Exercise 2: Build-Time Composition](docs/01-build-time.md)
- [Exercise 3: Streaming & Suspense](docs/02-streaming.md)
- [Exercise 4: Monorepo Setup](docs/03-monorepo.md)
- [Exercise 5: TypeScript References](docs/04-typescript.md)
- [Exercise 6: Architectural Linting](docs/05-linting.md)
- [Exercise 7: CI/CD Pipeline](docs/06-cicd.md)
- [Exercise 8: Testing Strategies](docs/07-testing.md)
- [Exercise 9: Strangler Fig & Codemods](docs/08-migration.md)

## Project Structure

```
pulse-workshop/
├── apps/
│   ├── dashboard/     — main Pulse dashboard app
│   └── legacy/        — simulated legacy app (exercise 9)
├── packages/
│   ├── analytics/     — analytics feature
│   ├── users/         — user management feature
│   ├── ui/            — shared design system
│   └── shared/        — types, API client, auth
├── mocks/             — MSW handlers and fixture data
├── tests/             — E2E tests and fixtures
├── codemods/          — jscodeshift transforms
└── docs/              — exercise walkthroughs
```
