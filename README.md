# SACCO Management System — Frontend

A production-ready frontend for a SACCO (Savings and Credit Cooperative) management system, built to consume a REST API from a FastAPI backend (developed separately). The frontend is fully functional in isolation using a mock API layer until the real backend is ready.

---

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** (build tool, dev server)
- **React Router DOM** — routing
- **Axios** — HTTP client with interceptors
- **TanStack Query** — server state, caching, mutations
- **React Hook Form** + **Zod** — forms and validation
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite`)
- **Framer Motion** — animation (modals)
- **Lucide React** — icons
- **clsx** + **tailwind-merge** — conditional class handling
- **MSW (Mock Service Worker)** — mock API layer for frontend-only development

---

## Project Structure

```
src/
├── api/               # Axios instance + interceptors
├── app/               # App-level providers (Router, QueryClient, Auth)
├── components/
│   ├── common/        # DataTable, PageHeader, Loader, ErrorBoundary
│   ├── layout/         # Navbar, Sidebar
│   └── ui/            # Button, Card, Input, Modal (design system primitives)
├── config/            # Environment variable access (env.ts)
├── constants/         # App-wide constants
├── contexts/          # AuthContext
├── features/          # One folder per domain (see below)
├── hooks/             # Shared hooks (useAuth)
├── layouts/           # MainLayout, AuthLayout
├── lib/               # Utility functions (cn, etc.)
├── mocks/             # MSW handlers + fixture data
├── pages/             # Route-level page components
├── routes/            # Route definitions, ProtectedRoute
├── store/             # Minimal client-only UI state
├── styles/            # globals.css, theme.css (design tokens)
├── types/             # Shared global types (ApiResponse, PaginatedData)
└── utils/             # Formatting helpers
```

### Feature module pattern

Every domain under `src/features/` follows the same shape:

```
features/<domain>/
├── types.ts        # Domain types (entity, payloads, list params)
├── schema.ts       # Zod validation schemas (where forms exist)
├── api.ts          # Axios calls, wrapped in ApiResponse<T>
├── hooks.ts        # TanStack Query hooks (useX, useCreateX, etc.)
├── components/     # Domain-specific modals/forms
└── index.ts        # Barrel export
```

**Domains implemented:** `members`, `savings`, `shares`, `loans`, `guarantors`, `contributions`, `transactions`, `reports`, `notifications`, `settings`.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example file and fill in values:

```bash
cp .env.example .env
```

| Variable            | Description                          | Example                     |
| ------------------- | ------------------------------------ | --------------------------- |
| `VITE_API_BASE_URL` | Base URL of the backend API          | `http://localhost:8000/api` |
| `VITE_APP_NAME`     | Display name of the app              | `SACCO Management System`   |
| `VITE_ENABLE_MOCKS` | Enables the MSW mock API (see below) | `true` / `false`            |

**Note:** `.env` is git-ignored. Never commit real credentials or production URLs to `.env.example`.

### 3. Run the dev server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

Vercel (and most CI) run `npm run build`, which invokes `tsc` strictly — always run this locally before pushing, since it catches errors the dev server's esbuild pipeline is more lenient about.

---

## Mock API Layer (MSW)

Since the FastAPI backend doesn't exist yet, the app can run entirely against an in-memory mock API using **Mock Service Worker**. This intercepts real HTTP requests at the network level — no code in `api.ts`/`hooks.ts` files knows or cares that mocks exist.

### Enabling mocks

Set in `.env`:

```
VITE_ENABLE_MOCKS=true
```

Restart the dev server after changing this (env vars only load at server start).

### Confirming mocks are active

Open the browser console — you should see:

```
[MSW] Mocking enabled.
```

If missing, confirm `public/mockServiceWorker.js` exists (regenerate with `npx msw init public/ --save` if not) and that it's committed to git (Vercel needs it in the deployed build).

### Mock data location

- `src/mocks/data.ts` — fixture arrays for all 10 domains
- `src/mocks/handlers.ts` — REST handlers matching the exact `ApiResponse<T>` envelope the real backend must also return
- Mutations (create/update/approve/etc.) modify the in-memory arrays directly, so the UI reflects changes immediately via TanStack Query cache invalidation

### Switching to the real backend

1. Set `VITE_ENABLE_MOCKS=false`
2. Set `VITE_API_BASE_URL` to the real backend's URL
3. No other code changes needed — the API contract (`ApiResponse<T>` shape, endpoint paths, payload shapes) was designed to match what `mocks/handlers.ts` already mimics. Confirm the real backend matches these shapes exactly, or adjust `features/*/api.ts` if the contracts diverge.

---

## API Response Contract

All backend endpoints (real or mocked) must return this shape:

```ts
{
  success: boolean;
  message: string;
  data: T;
}
```

List endpoints wrap `data` in pagination:

```ts
{
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
```

---

## Authentication

Auth is fully built (JWT + refresh token flow, `AuthContext`, `ProtectedRoute`, permission helpers) but **currently not enforced** — all routes are public by explicit decision, since there's no backend to authenticate against yet.

**To re-enable enforcement** once the backend's auth endpoints exist: wrap routes in `src/routes/index.tsx` with `<Route element={<ProtectedRoute />}>` (see the inline `TEMP` comment in that file for the exact spot).

---

## Known Limitations / Pending Work

| Item                                            | Status                                                                                                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Detail pages (single member, single loan, etc.) | Not started                                                                                                                 |
| Pagination/search/filter UI on list pages       | Not started (hooks already accept params)                                                                                   |
| Dashboard summary cards                         | Functional, but derived from first-page data only — needs a real `/dashboard/summary` endpoint for accurate totals at scale |
| Reports page                                    | Filter form works; result rendering is raw JSON pending confirmed report shapes from backend                                |
| Auth enforcement                                | Built, intentionally disabled until backend auth exists                                                                     |
| Automated tests                                 | Not set up (not in original stack scope)                                                                                    |

---

## Commit Convention

```
<type>: <short description>

[optional body]
```

Types: `feat`, `fix`, `refactor`, `chore`

Example:

```
feat: add Loans application flow + approve/reject actions
```

---

## Deployment (Vercel)

Environment variables must be set in **Vercel → Project → Settings → Environment Variables** (not read from `.env`, which is never deployed):

- `VITE_API_BASE_URL`
- `VITE_APP_NAME`
- `VITE_ENABLE_MOCKS`

After adding/changing env vars, trigger a **Redeploy** — Vercel does not apply env var changes to already-built deployments.
