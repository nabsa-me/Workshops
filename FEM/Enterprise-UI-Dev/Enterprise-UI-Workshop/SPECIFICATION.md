# Specification: `pulse-workshop`

## Overview

`pulse-workshop` is the primary exercise repository for the "Enterprise UI Architecture" workshop at Frontend Masters, taught by Steve Kinney. It serves **Exercises 2–9** — everything after the initial Module Federation detour in `pulse-federation`.

This is a pnpm monorepo that students evolve over the course of two days. Each exercise is a git branch checkpoint. Students start on a branch, complete the exercise by following a walkthrough, and the next branch represents the starting state for the next exercise (which is roughly the completed state of the previous one). Students who fall behind can check out the next branch and catch up.

The repo uses the same **Pulse** product domain as `pulse-federation` — an internal analytics/admin dashboard — so there's zero context switching between repos.

## Product Domain

**Pulse** is an internal analytics and admin dashboard with three feature areas:

- **Analytics** — Summary stats (fast), charts (medium), data table (slow). Multiple API calls at different speeds make streaming and Suspense boundaries viscerally obvious.
- **Users** — User list, user detail, invite flow. CRUD-ish. Good for demonstrating cross-boundary state changes and end-to-end testing.
- **Settings** — Org settings, notification preferences. Mostly static forms. Exists to show that not everything needs to be a separate package.

The domain is intentionally boring. Students should spend their mental energy on architecture, not understanding the product.

## Technical Stack

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Monorepo | pnpm workspaces | Industry standard, strict dependency isolation |
| Build Orchestration | Turborepo | Teaches caching, affected detection, pipeline config |
| Bundler | Vite | Fast, widely adopted, React plugin works out of the box |
| Framework | React 18 | Industry default; needed for streaming/Suspense exercises |
| Language | TypeScript (strict) | Core to the TypeScript scaling exercises |
| Routing | React Router 6 | Standard for multi-route React apps, supports lazy loading |
| Mock API | MSW 2.x | Used in dev and testing; shared handlers across both repos |
| Styling | Tailwind CSS | Utility-first, minimal config, widely adopted in enterprise codebases |
| Testing (E2E) | Playwright | Industry standard, good cross-browser support |
| Testing (Unit) | Vitest | Fast, Vite-native, good monorepo support |
| Linting | ESLint 9 (flat config) + eslint-plugin-boundaries | Core to the architectural linting exercise |
| CI | GitHub Actions | Most accessible CI platform for workshop students |
| Codemods | jscodeshift | Standard AST transform tool |

## File Naming Convention

**All file names use kebab-case.** No PascalCase or camelCase file names anywhere in the repository.

```
✅ analytics-dashboard.tsx
✅ stats-bar.tsx
✅ user-detail.tsx
✅ api-client.ts
✅ auth-provider.tsx
❌ AnalyticsDashboard.tsx
❌ apiClient.ts
❌ AuthProvider.tsx
```

Component exports inside files remain PascalCase per React convention. Only file names are kebab-cased.

## Repository Structure (Final State)

This is the complete file tree as it exists on the latest branch (`08-migration-start`). Earlier branches are subsets of this structure — files and directories are introduced progressively.

```
pulse-workshop/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── turbo.json
├── tsconfig.base.json
├── eslint.config.js
├── .gitignore
├── .nvmrc
├── apps/
│   ├── dashboard/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   ├── public/
│   │   │   └── favicon.svg
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── app.tsx
│   │       ├── entry-server.tsx
│   │       ├── routes/
│   │       │   ├── analytics.tsx
│   │       │   ├── users.tsx
│   │       │   ├── user-detail.tsx
│   │       │   └── settings.tsx
│   │       ├── shell/
│   │       │   ├── layout.tsx
│   │       │   ├── nav.tsx
│   │       │   └── auth-provider.tsx
│   │       └── global.css
│   └── legacy/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           ├── legacy-app.tsx
│           ├── legacy-analytics.tsx
│           └── legacy-analytics.tsx
├── packages/
│   ├── analytics/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── analytics-dashboard.tsx
│   │       ├── stats-bar.tsx
│   │       ├── chart.tsx
│   │       ├── big-table.tsx
│   │       └── analytics-dashboard.test.tsx
│   ├── users/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── user-list.tsx
│   │       ├── user-detail.tsx
│   │       ├── invite-flow.tsx
│   │       └── user-list.test.tsx
│   ├── ui/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── data-table.tsx
│   │       ├── stat-card.tsx
│   │       ├── loading-skeleton.tsx
│   │       ├── error-boundary.tsx
│   │       ├── tokens.ts
│   │       └── button.test.tsx
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           ├── types.ts
│           ├── api-client.ts
│           └── auth.ts
├── mocks/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── handlers.ts
│       ├── browser.ts
│       └── data/
│           ├── summary.ts
│           ├── chart.ts
│           ├── table.ts
│           └── users.ts
├── tests/
│   ├── e2e/
│   │   ├── playwright.config.ts
│   │   ├── cross-remote.spec.ts
│   │   └── analytics.spec.ts
│   └── fixtures/
│       └── analytics-summary.har
├── codemods/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── migrate-legacy-import.ts
│       └── __tests__/
│           └── migrate-legacy-import.test.ts
├── docs/
│   ├── 01-build-time.md
│   ├── 02-streaming.md
│   ├── 03-monorepo.md
│   ├── 04-typescript.md
│   ├── 05-linting.md
│   ├── 06-cicd.md
│   ├── 07-testing.md
│   └── 08-migration.md
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Branch Strategy

Each branch is a checkpoint. The naming pattern is `{number}-{exercise-slug}-start`. The branch represents the **starting state** for that exercise — students check it out, follow the walkthrough, and build toward the next branch's state.

| Branch | Exercise | What's New vs. Previous Branch |
|--------|----------|-------------------------------|
| `main` | — | Course overview README, branch index, setup instructions |
| `01-build-time-start` | Ex 2: Build-Time Composition | `apps/dashboard`, `packages/analytics`, `packages/ui`, `packages/shared`, `mocks/`. No turbo, no project references, basic pnpm workspace. |
| `02-streaming-start` | Ex 3: Streaming & Suspense | Analytics components now have async data fetching with different speeds. `entry-server.tsx` stub exists but is not wired up. Suspense boundaries are absent — students add them. |
| `03-monorepo-start` | Ex 4: Monorepo Setup | `packages/users` added. The workspace works but there's no Turborepo. No `turbo.json`. Build/test/lint scripts exist in each package but aren't orchestrated. |
| `04-typescript-start` | Ex 5: TypeScript References | Turborepo is configured and working. `tsconfig.json` files exist in each package but lack `composite: true` and `references`. `tsconfig.base.json` exists. |
| `05-linting-start` | Ex 6: Architectural Linting | TypeScript project references work. ESLint is installed with basic rules but `eslint-plugin-boundaries` is not configured. The plugin is in dependencies but the config is commented out / absent. |
| `06-cicd-start` | Ex 7: CI/CD Pipeline | Linting with boundaries works. `.github/workflows/` directory exists but `ci.yml` is empty or contains only a placeholder comment. |
| `07-testing-start` | Ex 8: Testing | CI pipeline is complete. Playwright is installed. MSW handlers exist. `tests/` directory exists with `playwright.config.ts` but no test files. No HAR fixtures. |
| `08-migration-start` | Ex 9: Strangler Fig + Codemods | Tests pass. `apps/legacy/` appears with a simulated legacy app. `codemods/` directory exists but transform files are empty/stubbed. No routing integration between legacy and modern apps yet. |
| `solution` | — | Fully completed state of all exercises. Reference implementation. |

### What the `docs/` Folder Contains on Each Branch

The `docs/` folder is present on **every branch** with all eight exercise guides. This means students can always read ahead or reference previous exercises. The root `README.md` on each branch dynamically points to the current exercise.

---

## Detailed Package Specifications

### `packages/shared`

The contract layer. Types, API client, and auth utilities shared across all packages.

#### `packages/shared/src/types.ts`
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface SummaryStats {
  totalUsers: number;
  activeToday: number;
  revenue: number;
  conversionRate: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TableRow {
  id: string;
  user: string;
  email: string;
  action: string;
  timestamp: string;
  duration: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface OrgSettings {
  name: string;
  plan: "free" | "pro" | "enterprise";
  features: string[];
}

export type TimeRange = "7d" | "30d" | "90d";
```

#### `packages/shared/src/api-client.ts`
A thin typed fetch wrapper:
```typescript
export async function apiClient<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
```

#### `packages/shared/src/auth.ts`
Auth context hook and provider type exports. The actual `AuthProvider` component lives in `apps/dashboard/src/shell/auth-provider.tsx` since it's app-level concern, but the types and hook are shared so packages can consume auth state.

```typescript
import { createContext, useContext } from "react";
import type { AuthState } from "./types";

export interface AuthContextValue extends AuthState {
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

#### `packages/shared/src/index.ts`
Explicit public API:
```typescript
export type {
  User,
  AuthState,
  SummaryStats,
  ChartDataPoint,
  TableRow,
  PaginatedResponse,
  OrgSettings,
  TimeRange,
} from "./types";
export { apiClient } from "./api-client";
export { AuthContext, useAuth } from "./auth";
export type { AuthContextValue } from "./auth";
```

#### `packages/shared/package.json`
```json
{
  "name": "@pulse/shared",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/"
  },
  "peerDependencies": {
    "react": "^18.3.0"
  }
}
```

**Note on package resolution:** All internal packages use `"main": "./src/index.ts"` pointing directly at TypeScript source. Vite resolves these via the workspace, so no build step is needed for internal packages during development. This is the standard monorepo DX pattern — packages are consumed as source, not built artifacts.

### `packages/ui`

Shared design system primitives. Deliberately small — just enough to demonstrate package boundaries, design token patterns, and the linting exercises.

#### Components:
- **`button.tsx`** — Basic button with variants (primary, secondary, ghost). Uses design tokens.
- **`card.tsx`** — Container card with optional title and padding. Used everywhere.
- **`data-table.tsx`** — Generic typed table component. Accepts columns config and data array. Used by analytics big table and user list.
- **`stat-card.tsx`** — Metric display card (label, value, optional trend indicator). Used by analytics stats bar.
- **`loading-skeleton.tsx`** — Placeholder skeleton for loading states. Multiple variants (text, card, table row).
- **`error-boundary.tsx`** — Reusable React error boundary with fallback UI.

#### `packages/ui/src/tokens.ts`
Design tokens as plain TypeScript constants:
```typescript
export const colors = {
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  secondary: "#64748b",
  success: "#22c55e",
  danger: "#ef4444",
  warning: "#f59e0b",
  background: "#ffffff",
  surface: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  textMuted: "#64748b",
} as const;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
} as const;

export const radii = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  full: "9999px",
} as const;
```

#### `packages/ui/src/index.ts`
Explicit public API — only exports what should be consumed:
```typescript
export { Button } from "./button";
export { Card } from "./card";
export { DataTable } from "./data-table";
export { StatCard } from "./stat-card";
export { LoadingSkeleton } from "./loading-skeleton";
export { ErrorBoundary } from "./error-boundary";
export { colors, spacing, radii } from "./tokens";
```

#### `packages/ui/package.json`
```json
{
  "name": "@pulse/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "test": "vitest run"
  },
  "peerDependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
```

### `packages/analytics`

The analytics feature package. This is the most complex package because it drives the streaming exercise.

#### Components:
- **`analytics-dashboard.tsx`** — Composes `StatsBar`, `Chart`, and `BigTable`. Each child fetches its own data independently, enabling fine-grained Suspense boundaries.
- **`stats-bar.tsx`** — Four `StatCard` components showing summary metrics. Fetches from `/api/analytics/summary`. Fast response (200ms).
- **`chart.tsx`** — Bar/line chart of analytics data over time. Fetches from `/api/analytics/chart`. Medium response (800ms). Accepts `TimeRange` prop. Can use recharts or a simple SVG implementation.
- **`big-table.tsx`** — Paginated data table of recent activity. Fetches from `/api/analytics/table`. Slow response (2000ms). Uses `DataTable` from `@pulse/ui`.

#### `packages/analytics/src/index.ts`
```typescript
export { AnalyticsDashboard } from "./analytics-dashboard";
// Only export the dashboard — internal components are not public API
```

This is important for the linting exercise — students will configure rules that prevent importing `stats-bar` directly from outside the package.

#### `packages/analytics/package.json`
```json
{
  "name": "@pulse/analytics",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "test": "vitest run"
  },
  "dependencies": {
    "@pulse/ui": "workspace:*",
    "@pulse/shared": "workspace:*"
  },
  "peerDependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
```

### `packages/users`

User management feature package. Introduced on `03-monorepo-start`.

#### Components:
- **`user-list.tsx`** — Table of users with search/filter. Uses `DataTable` from `@pulse/ui`.
- **`user-detail.tsx`** — Individual user profile view. Shows role, activity, settings.
- **`invite-flow.tsx`** — Multi-step form for inviting new users. Email input, role selector, confirmation.

#### `packages/users/src/index.ts`
```typescript
export { UserList } from "./user-list";
export { UserDetail } from "./user-detail";
export { InviteFlow } from "./invite-flow";
```

### `mocks/`

MSW handlers and static fixture data shared across dev and testing.

#### `mocks/src/handlers.ts`
All REST handlers with tuned delays:

```typescript
import { http, HttpResponse, delay } from "msw";

export const handlers = [
  // Analytics
  http.get("/api/analytics/summary", async () => {
    await delay(200);
    return HttpResponse.json(summaryData);
  }),
  http.get("/api/analytics/chart", async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const range = url.searchParams.get("range") ?? "30d";
    return HttpResponse.json(getChartData(range));
  }),
  http.get("/api/analytics/table", async ({ request }) => {
    await delay(2000);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    return HttpResponse.json(getTablePage(page));
  }),

  // Users
  http.get("/api/users", async () => {
    await delay(400);
    return HttpResponse.json(usersData);
  }),
  http.get("/api/users/:id", async ({ params }) => {
    await delay(300);
    const user = usersData.find((u) => u.id === params.id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),
  http.get("/api/users/me", async () => {
    await delay(100);
    return HttpResponse.json(currentUser);
  }),
  http.post("/api/users/invite", async () => {
    await delay(500);
    return HttpResponse.json({ success: true });
  }),

  // Settings
  http.get("/api/settings", async () => {
    await delay(200);
    return HttpResponse.json(settingsData);
  }),
];
```

#### `mocks/src/data/table.ts`
50 rows of activity log data, deterministically generated. Paginated at 10 per page. Each row has id, user name, email, action type, timestamp, and duration.

#### `mocks/src/data/users.ts`
15 mock users with varied roles, plus the `currentUser` constant for the auth context. Names should be diverse and realistic.

### `apps/dashboard`

The main application. Consumes all packages.

#### `apps/dashboard/src/main.tsx`
Entry point. Starts MSW in development, then renders `<App />`.

#### `apps/dashboard/src/app.tsx`
```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./shell/auth-provider";
import { Layout } from "./shell/layout";
import { lazy, Suspense } from "react";
import { LoadingSkeleton } from "@pulse/ui";

const Analytics = lazy(() => import("./routes/analytics"));
const Users = lazy(() => import("./routes/users"));
const UserDetail = lazy(() => import("./routes/user-detail"));
const Settings = lazy(() => import("./routes/settings"));

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<LoadingSkeleton variant="page" />}>
            <Routes>
              <Route path="/" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

#### `apps/dashboard/src/entry-server.tsx`
This file is the SSR streaming entry point for the streaming exercise. On `02-streaming-start`, it's a stub that students complete:

```typescript
// TODO: Exercise 3 — Implement streaming SSR
// Use renderToPipeableStream from react-dom/server
// Pipe the app through a Writable stream
// Add Suspense boundaries around AnalyticsDashboard components
```

On `03-monorepo-start` (post-exercise), it has a working implementation with `renderToPipeableStream`.

#### Route files (`apps/dashboard/src/routes/`)
Each route file is a thin wrapper that imports from the relevant package:

```typescript
// routes/analytics.tsx
import { AnalyticsDashboard } from "@pulse/analytics";

export default function AnalyticsRoute() {
  return <AnalyticsDashboard />;
}
```

```typescript
// routes/users.tsx
import { UserList } from "@pulse/users";

export default function UsersRoute() {
  return <UserList />;
}
```

### `apps/legacy`

Introduced on `08-migration-start`. A simulated legacy application for the strangler fig exercise.

#### `apps/legacy/src/legacy-app.tsx`
A deliberately "old-style" React app:
- Class components or very old-style functional components
- Inline styles or a single CSS file
- No package separation — everything in one file or flat directory
- Uses a deprecated `LegacyAnalytics` component that the codemod exercise will transform
- Has its own routing (simple hash-based or basic React Router)

#### `apps/legacy/src/legacy-analytics.tsx`
This component uses an import path that the codemod will migrate:
```typescript
// This is the "old" import that the codemod transforms
import { LegacyChart } from "./legacy-chart";
```

The codemod exercise transforms these to use `@pulse/analytics` package imports.

### `tests/`

#### `tests/e2e/playwright.config.ts`
Standard Playwright config:
- Base URL: `http://localhost:5173`
- Browsers: chromium only (for workshop speed)
- Web server command: `pnpm --filter @pulse/dashboard dev`
- Timeout: 30s

#### `tests/e2e/cross-remote.spec.ts`
On `07-testing-start`, this is a stub students complete:
```typescript
import { test, expect } from "@playwright/test";

// TODO: Exercise 8 — Write E2E tests
// Test 1: Navigate from analytics to users page, verify data loads
// Test 2: Click a user in the list, verify detail page renders
// Test 3: Navigate back to analytics, verify state is maintained
```

#### `tests/fixtures/analytics-summary.har`
On `07-testing-start`, this file doesn't exist. Students record it during the exercise using Playwright's HAR recording.

### `codemods/`

#### `codemods/src/migrate-legacy-import.ts`
On `08-migration-start`, this is a stub:
```typescript
import type { API, FileInfo } from "jscodeshift";

// TODO: Exercise 9 — Write a codemod
// Transform: import { LegacyChart } from "./legacy-chart"
// Into:      import { Chart } from "@pulse/analytics"
//
// Also handle:
// - Named imports with aliases
// - Multiple imports from the same source
// - Removing unused legacy imports

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Your transform here

  return root.toSource();
}
```

### `.github/workflows/ci.yml`

On `06-cicd-start`, this is empty/commented. The completed version (on `07-testing-start`) should look like:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm turbo typecheck

      - name: Lint
        run: pnpm turbo lint

      - name: Test
        run: pnpm turbo test

      - name: Build
        run: pnpm turbo build
```

### `turbo.json` (Completed State)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

On `03-monorepo-start`, this file does not exist. Students create it.

### `eslint.config.js` (Completed State)

ESLint 9 flat config with boundaries plugin:

```javascript
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "apps/*" },
        { type: "package", pattern: "packages/*" },
        { type: "mock", pattern: "mocks/*" },
        { type: "test", pattern: "tests/*" },
      ],
      "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["package", "mock"] },
            { from: "package", allow: ["package"] },
            { from: "test", allow: ["app", "package", "mock"] },
            { from: "mock", allow: ["package"] },
          ],
        },
      ],
      "boundaries/no-private": ["error"],
    },
  },
];
```

On `05-linting-start`, the boundaries plugin is installed but the rules above are not configured. Students add them.

---

## Exercise Walkthrough Specifications

Each exercise guide in `docs/` follows this structure:

1. **Title and Context** — What you're doing and why (1 paragraph)
2. **Prerequisites** — Branch to check out, install steps (2–3 commands max)
3. **Steps** — Numbered, concrete, one action per step. Code blocks for everything students type.
4. **Checkpoints** — "You should now see..." verification moments after key milestones
5. **Stretch Goals** — Optional challenges for fast finishers
6. **Solution Reference** — Note that the next branch represents the completed state

### Exercise 2: Build-Time Composition (`docs/01-build-time.md`)

**Branch:** `01-build-time-start`

**Context:** You've seen Module Federation's runtime composition. Now take the same analytics module and consume it as a regular package. No remote entry, no shared dependency negotiation — just an npm import in a monorepo.

**Steps:**
1. Examine the current structure: `apps/dashboard` imports `AnalyticsDashboard` from `@pulse/analytics`
2. Open `packages/analytics/package.json` — note `"main": "./src/index.ts"` pointing at source
3. Open `packages/analytics/src/index.ts` — note the explicit public API (only `AnalyticsDashboard` is exported)
4. Run `pnpm dev` — the dashboard loads with analytics, users route is a placeholder
5. Try importing `StatsBar` directly in `apps/dashboard/src/routes/analytics.tsx` — it works (no boundary enforcement yet) but shouldn't be part of the public API
6. Compare this experience to the federation setup:
   - One dev server vs. two
   - TypeScript types resolve across packages at compile time
   - No `remoteEntry.js`, no shared dependency negotiation
   - Change a component in `packages/analytics` → hot reload in the dashboard instantly

**Checkpoint:** Dashboard runs on `http://localhost:5173` with the analytics view showing stats, chart, and table. Changes to analytics package components hot reload in the dashboard.

**Stretch:** Add a new component to `packages/analytics` and export it. See how the TypeScript integration differs from the federation approach.

### Exercise 3: Streaming & Suspense (`docs/02-streaming.md`)

**Branch:** `02-streaming-start`

**Context:** The analytics dashboard makes three API calls at different speeds. Right now, the page shows a single loading spinner until everything resolves. With streaming SSR and Suspense boundaries, you can progressively render the shell, then stats, then chart, then table as each resolves.

**Steps:**
1. Open `packages/analytics/src/analytics-dashboard.tsx` — note that each child component fetches its own data
2. Open `apps/dashboard/src/entry-server.tsx` — read the TODO stub
3. Implement `renderToPipeableStream`:
   - Import from `react-dom/server`
   - Wrap the app with appropriate Suspense boundaries
   - Pipe the stream to the response
4. Add Suspense boundaries inside `AnalyticsDashboard`:
   - Wrap `StatsBar` in its own `<Suspense>` with a skeleton fallback
   - Wrap `Chart` in its own `<Suspense>` with a skeleton fallback
   - Wrap `BigTable` in its own `<Suspense>` with a skeleton fallback
5. Run the app and watch the network waterfall:
   - Shell renders immediately
   - Stats bar appears after ~200ms
   - Chart appears after ~800ms
   - Table appears after ~2000ms
6. Experiment with different boundary placements:
   - One Suspense around all three (old behavior — everything waits)
   - Individual boundaries (progressive — each streams in)
   - Group chart + table together, stats alone (compromise)

**Checkpoint:** The shell (nav, layout) renders immediately. Stats bar appears first, chart second, table last. Each has a skeleton placeholder until its data arrives.

**Stretch:** Move one Suspense boundary to wrap chart and table together. Compare the UX — is it better or worse to have them appear at the same time?

### Exercise 4: Monorepo Setup (`docs/03-monorepo.md`)

**Branch:** `03-monorepo-start`

**Context:** The workspace has multiple packages now (analytics, users, ui, shared) but no build orchestration. Running `pnpm -r build` rebuilds everything every time, even unchanged packages. Turborepo adds caching and dependency-aware task execution.

**Steps:**
1. Run `pnpm -r build` — note that it builds all packages sequentially
2. Run it again — same time, no caching
3. Create `turbo.json` at the root with the pipeline config
4. Update root `package.json` scripts to use `turbo`:
   ```json
   "build": "turbo build",
   "typecheck": "turbo typecheck",
   "lint": "turbo lint",
   "test": "turbo test"
   ```
5. Run `pnpm turbo build` — first run builds everything
6. Run it again — observe `FULL TURBO` cache hits, near-zero time
7. Make a change in `packages/ui/src/button.tsx`
8. Run `pnpm turbo build` again — only `@pulse/ui`, `@pulse/analytics`, `@pulse/users`, and `@pulse/dashboard` rebuild. `@pulse/shared` shows cache hit.
9. Examine the dependency graph: `pnpm turbo build --graph`

**Checkpoint:** `pnpm turbo build` on a clean cache builds everything. Second run shows `FULL TURBO` for all tasks. After changing `packages/ui`, only downstream packages rebuild.

**Stretch:** Add `--filter=@pulse/analytics...` to build only analytics and its dependencies. Compare the output.

### Exercise 5: TypeScript References (`docs/04-typescript.md`)

**Branch:** `04-typescript-start`

**Context:** TypeScript currently type-checks each package independently. There's no incremental checking across package boundaries — changing a type in `@pulse/shared` requires re-checking everything. Project references enable incremental builds and ensure packages only depend on declared dependencies.

**Steps:**
1. Run `pnpm turbo typecheck` — note the time
2. Open `packages/analytics/tsconfig.json` — no `composite` or `references` fields
3. Add `"composite": true` to `compilerOptions` in each package's `tsconfig.json`
4. Add `"references"` arrays based on each package's actual dependencies:
   - `packages/shared`: no references (leaf package)
   - `packages/ui`: references `packages/shared`
   - `packages/analytics`: references `packages/ui`, `packages/shared`
   - `packages/users`: references `packages/ui`, `packages/shared`
   - `apps/dashboard`: references all packages
5. Run `tsc --build` from the root (using a root `tsconfig.json` that references all packages)
6. Run it again — observe incremental: `.tsbuildinfo` files appear, second run is faster
7. Change a type in `packages/shared/src/types.ts` (e.g., add a field to `User`)
8. Run `tsc --build` — only downstream packages recheck
9. Set up path aliases in `tsconfig.base.json` so `@pulse/shared` resolves cleanly

**Checkpoint:** `tsc --build` works with incremental checking. Changing `@pulse/shared` only rechecks packages that depend on it. `.tsbuildinfo` files exist in each package.

### Exercise 6: Architectural Linting (`docs/05-linting.md`)

**Branch:** `05-linting-start`

**Context:** Nothing stops `packages/analytics` from importing directly from `packages/users` internal files, bypassing the public API. `eslint-plugin-boundaries` enforces architectural rules so that import violations are caught at lint time, not in code review.

**Steps:**
1. Open `eslint.config.js` — basic ESLint config, no boundary rules
2. Demonstrate the problem: in `packages/analytics/src/analytics-dashboard.tsx`, add `import { UserList } from "@pulse/users/src/user-list"` — TypeScript is fine with it, ESLint doesn't complain
3. Install and configure `eslint-plugin-boundaries`:
   - Define element types: `app`, `package`, `mock`, `test`
   - Define allowed dependencies: apps can import packages, packages can import other packages, mocks can import packages
4. Run `pnpm turbo lint` — the cross-package import from step 2 now fails
5. Remove the violation, verify lint passes
6. Add a `boundaries/no-private` rule — prevent importing non-index files from packages
7. Try `import { StatsBar } from "@pulse/analytics/src/stats-bar"` in the dashboard — lint error
8. Write a custom rule or add a banned-dependency pattern (e.g., prevent any package from importing `lodash` directly — must use `@pulse/shared` utilities instead)

**Checkpoint:** `pnpm turbo lint` passes cleanly. Importing internals from another package triggers a lint error. The boundary rules match the architecture diagram.

**Stretch:** Write a custom ESLint rule that enforces a project convention — for example, requiring all exported components to have a `displayName`.

### Exercise 7: CI/CD Pipeline (`docs/06-cicd.md`)

**Branch:** `06-cicd-start`

**Context:** You have a working monorepo with type checking, linting, and build orchestration. Now you need CI that's fast — it should only build and test what changed, use caching aggressively, and parallelize where possible.

**Steps:**
1. Open `.github/workflows/ci.yml` — it's empty
2. Create a basic workflow:
   - Trigger on push to main and pull requests
   - pnpm install with frozen lockfile
   - Run typecheck, lint, test, build via Turborepo
3. Configure Turborepo remote caching:
   - Add `TURBO_TOKEN` and `TURBO_TEAM` as repository secrets (explain the concept even if students can't set up Vercel remote cache in the workshop)
   - Show how `turbo build --remote-cache` works
4. Add a matrix strategy to parallelize test suites:
   ```yaml
   strategy:
     matrix:
       package: [analytics, users, ui, shared]
   steps:
     - run: pnpm turbo test --filter=@pulse/${{ matrix.package }}
   ```
5. Add Lighthouse CI step:
   - Install `@lhci/cli`
   - Build the dashboard
   - Run Lighthouse against the built dashboard
   - Assert performance budget (LCP < 2.5s, CLS < 0.1, total JS < 200KB)

**Checkpoint:** The CI workflow YAML is valid (can verify with `actionlint` or paste into GitHub's workflow editor). The workflow runs typecheck, lint, test, and build with Turborepo. Lighthouse CI step is configured with performance budgets.

**Stretch:** Add a step that comments the Lighthouse score on PRs.

### Exercise 8: Testing Strategies (`docs/07-testing.md`)

**Branch:** `07-testing-start`

**Context:** You need three levels of testing in a microfrontend architecture: E2E tests that exercise the real composed application, service-mocked tests that isolate the frontend, and contract-aware tests that catch API drift.

**Steps:**
1. Write a Playwright E2E test (`tests/e2e/cross-remote.spec.ts`):
   - Navigate to `/` (analytics)
   - Wait for stats bar to render
   - Navigate to `/users`
   - Verify user list renders
   - Click first user
   - Verify user detail page
   - Navigate back to `/`
   - Verify analytics is still loaded (not re-fetched)
2. Write a Playwright test with MSW mocking:
   - Use `page.route()` or configure MSW to intercept API calls
   - Mock the analytics summary endpoint to return custom data
   - Verify the UI renders the mocked values
3. Record a HAR file:
   - Use Playwright's built-in HAR recording: `page.routeFromHAR()`
   - Record real MSW responses to `tests/fixtures/analytics-summary.har`
   - Write a test that replays the HAR for deterministic results
4. Run the tests: `npx playwright test`
5. Discussion prompt: Where would Pact-style contract testing catch a bug that these tests miss? (Answer: when the real backend changes its response shape between HAR recordings)

**Checkpoint:** `npx playwright test` passes. At least 3 test cases cover cross-route navigation, MSW mocking, and HAR replay.

### Exercise 9: Strangler Fig + Codemods (`docs/08-migration.md`)

**Branch:** `08-migration-start`

**Context:** You have a legacy app and a modern monorepo. The strangler fig pattern lets them coexist: a shared entry point routes some paths to legacy, others to modern. Over time, you migrate routes one at a time until the legacy app is empty. Codemods automate the tedious import rewrites.

**Steps:**
1. Explore `apps/legacy/` — note the old patterns (class components, inline styles, flat structure)
2. Set up a routing-level strangler fig:
   - Create a shared entry point (could be a simple Express/Vite middleware or a conditional import in `apps/dashboard`)
   - Route `/` to the modern analytics dashboard
   - Route `/legacy/*` to the legacy app
   - Students can see both apps at different URLs
3. Migrate one route:
   - Take the legacy analytics view and replace it with the modern `@pulse/analytics` package
   - Update the routing to serve the modern version for that path
   - Keep the rest of the legacy app intact
4. Write a jscodeshift codemod (`codemods/src/migrate-legacy-import.ts`):
   - Find all `import { LegacyChart } from "./legacy-chart"` patterns
   - Transform to `import { Chart } from "@pulse/analytics"`
   - Handle edge cases: aliased imports, multiple specifiers
5. Test the codemod:
   - Run against `apps/legacy/src/` files
   - Verify the transforms are correct
   - See the diff in git — one PR, clean migration
6. Run the codemod across the monorepo to verify it only touches relevant files

**Checkpoint:** Both apps are accessible (modern at `/`, legacy at `/legacy/*`). One route has been migrated. The codemod successfully transforms legacy imports to modern package imports.

---

## Root README.md (on `main`)

```markdown
# Pulse Workshop — Enterprise UI Architecture

Course materials for the Enterprise UI Architecture workshop at Frontend Masters.

## Prerequisites

- Node.js 20+ (check with `node -v`)
- pnpm 9+ (check with `pnpm -v`)
- Git

## Quick Start

\```bash
git clone <repo-url>
cd pulse-workshop
pnpm install
\```

## Workshop Structure

This repository is organized as branches. Each exercise starts from a
checkpoint branch:

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

\```bash
git checkout 01-build-time-start
pnpm install
\```

Then open `docs/01-build-time.md` for the walkthrough.

## If You Fall Behind

No worries — just check out the next branch. Each branch is a clean
starting point:

\```bash
git checkout 03-monorepo-start
pnpm install
\```

## Exercise Guides

All exercise walkthroughs are in the `docs/` folder and are available on
every branch:

- [Exercise 2: Build-Time Composition](docs/01-build-time.md)
- [Exercise 3: Streaming & Suspense](docs/02-streaming.md)
- [Exercise 4: Monorepo Setup](docs/03-monorepo.md)
- [Exercise 5: TypeScript References](docs/04-typescript.md)
- [Exercise 6: Architectural Linting](docs/05-linting.md)
- [Exercise 7: CI/CD Pipeline](docs/06-cicd.md)
- [Exercise 8: Testing Strategies](docs/07-testing.md)
- [Exercise 9: Strangler Fig & Codemods](docs/08-migration.md)

## Project Structure

\```
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
\```
```

---

## Acceptance Criteria

### Global
- [ ] All file names are kebab-case (no PascalCase or camelCase file names)
- [ ] TypeScript strict mode enabled in all packages
- [ ] No `any` types anywhere
- [ ] All internal packages use `"main": "./src/index.ts"` (source imports, no build step for internal packages)
- [ ] pnpm workspace aliases work (`@pulse/shared`, `@pulse/ui`, etc.)
- [ ] `pnpm install` from root installs all dependencies
- [ ] `.nvmrc` specifies Node 20

### Branch: `01-build-time-start`
- [ ] `pnpm dev` starts the dashboard on port 5173
- [ ] Analytics dashboard renders with stats bar, chart, and table
- [ ] All data comes from MSW (no real network requests)
- [ ] `@pulse/analytics` is consumed as a workspace package (not federation)
- [ ] Hot reload works across package boundaries
- [ ] No Turborepo configured (no `turbo.json`)
- [ ] No TypeScript project references configured

### Branch: `02-streaming-start`
- [ ] Analytics components fetch data independently with different delays
- [ ] `entry-server.tsx` exists as a stub with TODO comments
- [ ] No Suspense boundaries inside AnalyticsDashboard (students add them)
- [ ] MSW delays are deterministic: 200ms (summary), 800ms (chart), 2000ms (table)

### Branch: `03-monorepo-start`
- [ ] `packages/users` package exists with UserList, UserDetail, InviteFlow
- [ ] `/users` route works in the dashboard
- [ ] No `turbo.json` exists
- [ ] `pnpm -r build` works but is slow and uncached

### Branch: `04-typescript-start`
- [ ] `turbo.json` exists and is correctly configured
- [ ] `pnpm turbo build` works with caching
- [ ] `tsconfig.json` files exist in all packages but lack `composite: true`
- [ ] No `references` arrays in any `tsconfig.json`
- [ ] `tsconfig.base.json` exists with shared compiler options

### Branch: `05-linting-start`
- [ ] TypeScript project references work (`tsc --build` succeeds)
- [ ] `.tsbuildinfo` files are generated
- [ ] ESLint is installed with basic rules
- [ ] `eslint-plugin-boundaries` is in dependencies but NOT configured
- [ ] Cross-package internal imports are NOT flagged by the linter

### Branch: `06-cicd-start`
- [ ] `eslint-plugin-boundaries` is configured and working
- [ ] Cross-package internal imports trigger lint errors
- [ ] `.github/workflows/ci.yml` exists but is empty or placeholder only

### Branch: `07-testing-start`
- [ ] CI workflow is complete and valid YAML
- [ ] Playwright is installed and `playwright.config.ts` exists
- [ ] MSW handlers are available for test use
- [ ] `tests/e2e/` directory exists with stubbed test files
- [ ] No HAR fixtures exist yet (students create them)
- [ ] No completed test cases (students write them)

### Branch: `08-migration-start`
- [ ] Playwright tests pass (from previous exercise)
- [ ] `apps/legacy/` exists with simulated legacy app
- [ ] Legacy app has class components or old-style patterns
- [ ] Legacy app uses importable components that the codemod will transform
- [ ] `codemods/` directory exists with stubbed transform file
- [ ] No routing integration between legacy and modern apps (students create it)

### Branch: `solution`
- [ ] All exercises are completed
- [ ] All tests pass (`pnpm turbo test`)
- [ ] Lint passes (`pnpm turbo lint`)
- [ ] Type check passes (`pnpm turbo typecheck`)
- [ ] Build succeeds (`pnpm turbo build`)
- [ ] Playwright E2E tests pass
- [ ] Codemod transforms correctly
- [ ] CI workflow is complete
- [ ] Strangler fig routing works (modern at `/`, legacy at `/legacy/*`)

### Documentation
- [ ] `docs/` folder exists on every branch with all 8 exercise guides
- [ ] Each guide follows the standard structure (context, prerequisites, steps, checkpoints, stretch, solution ref)
- [ ] Root README on `main` has branch index and setup instructions
- [ ] Root README on each exercise branch points to the current exercise doc
- [ ] Code blocks in all docs are accurate and match actual file paths
- [ ] All guides are tested: following the steps produces the expected checkpoints

---

## Visual Design Notes

The UI should be presentable on a projector but minimal. Students shouldn't be distracted by the design.

- Clean, light-theme dashboard layout
- Sidebar navigation with route highlighting
- Cards for stats, standard table for data
- Loading skeletons that are visually distinct from loaded content
- Tailwind CSS for all styling — utility classes keep styles colocated with markup and eliminate CSS file sprawl
- Consistent spacing using the design tokens from `@pulse/ui`, exposed as Tailwind theme extensions

## Dependencies (Key Versions)

Pin to current stable versions at time of creation:

- `react` / `react-dom`: ^18.3
- `react-router-dom`: ^6.26
- `typescript`: ^5.5
- `tailwindcss`: ^4.0
- `vite`: ^5.4
- `vitest`: ^2.1
- `msw`: ^2.4
- `@playwright/test`: ^1.48
- `eslint`: ^9.12
- `eslint-plugin-boundaries`: ^4.2
- `jscodeshift`: ^17.0
- `turbo`: ^2.1

## Notes for Implementation

1. **Source imports, no package builds for dev.** Internal packages point `main` at TypeScript source. Vite resolves them directly. Only add a `build` script that produces `dist/` if needed for the CI exercise — and even then, keep dev pointing at source.

2. **MSW is the only backend.** No Express server, no database, no real API. The mock handlers *are* the API. This keeps setup instant and eliminates infrastructure debugging during the workshop.

3. **Branches must be independent starting points.** A student should be able to `git checkout 05-linting-start && pnpm install` and have a fully working repo. No "you need to complete the previous exercise first" dependencies. Each branch is self-contained.

4. **The legacy app should look old.** Use patterns students will recognize from real legacy codebases: class components, `componentDidMount`, inline styles, prop drilling, maybe even a `var` or two. Not offensively bad — just clearly "old."

5. **Deterministic mock data.** No `Math.random()` in fixture data. Every run should produce identical results. This matters for the HAR replay exercise and for debugging in a classroom setting.

6. **Exercise stubs should be clear.** When a file is stubbed for students to complete, use `// TODO: Exercise N —` comments that explain exactly what needs to happen. Don't make students guess what the exercise expects.

7. **All docs on all branches.** The `docs/` folder is identical across all branches. Students should always be able to read any exercise guide regardless of which branch they're on. Only the root README changes per branch to point at the current exercise.
