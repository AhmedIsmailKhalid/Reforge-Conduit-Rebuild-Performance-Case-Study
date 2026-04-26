# TECHNOLOGY STACK

---

## Stack Overview

| Layer | Technology | Version | Replaces in Original Conduit |
|---|---|---|---|
| Build tool | Vite | 5.x | Create React App |
| Framework | React | 18.x | React 17 with class components |
| Language | TypeScript (strict) | 5.x | JavaScript with prop-types |
| Styling | Tailwind CSS | 3.x | Bootstrap 4 |
| Server state | React Query (TanStack Query) | 5.x | React-Redux with custom thunks |
| Client state | Zustand | 4.x | Redux store, auth slice only |
| Routing | React Router | 6.x | React Router 5 |
| Forms | React Hook Form + Zod | 7.x / 3.x | Uncontrolled inputs with no validation |
| HTTP client | Axios | 1.x | Axios, kept and modernized |
| Markdown | marked + DOMPurify | 12.x / 3.x | marked with no sanitization |
| Testing | Vitest + React Testing Library | 1.x / 14.x | None |
| API mocking | MSW (Mock Service Worker) | 2.x | None |
| Linting | ESLint + TypeScript ESLint | 8.x | Minimal or none |
| Formatting | Prettier | 3.x | None |
| Deployment | Vercel | — | GitHub Pages or none |
| Performance CI | Lighthouse CI | — | None |

---

## Decision Rationale

### Vite over Create React App

CRA has been officially unmaintained since 2023. It produces a single, unoptimized JavaScript bundle via Webpack with no tree-shaking optimization applied to application code. Vite uses native ES Modules in development, which eliminates bundle compilation on HMR and makes cold starts near-instant regardless of application size. In production, Vite uses Rollup with a configurable `manualChunks` strategy, splitting vendor dependencies into separately cacheable chunks. The resulting bundle size reduction is the most directly measurable improvement in this case study and is recorded in the Benchmark Report.

### Vite SPA over Next.js

Server-side rendering via Next.js would improve Lighthouse scores, particularly LCP and FCP, by delivering pre-rendered HTML to the browser. However, the Conduit API serves authenticated, personalized content for the personal feed, editor, and settings pages, which requires cookie-based token forwarding to render correctly on the server. This architectural complexity would shift the focus of the project from frontend performance engineering to SSR infrastructure, which is a different case study. The purpose of Reforge is to demonstrate how far a well-engineered SPA can be taken on its own merits, with measurable and attributable improvements. Using Vite without SSR ensures that every performance gain in the Benchmark Report is a direct result of frontend engineering decisions rather than a rendering architecture change.

### React Query over Redux for Server State

The original Conduit uses Redux as both a client state container and a server cache, a pattern that introduces cache invalidation complexity, duplicated loading state, and significant boilerplate per resource type. React Query is purpose-built for asynchronous server state management. It provides automatic background refetching, stale-while-revalidate caching, optimistic mutation support with rollback, and request deduplication, with no manual cache management required. The migration from Redux to React Query is one of the documented code quality improvements in the Benchmark Report.

### Zustand over Redux for Client State

The remaining client-only state in this application, specifically the auth token and current user session, does not require Redux. Zustand provides equivalent functionality through a persist middleware and devtools integration, with a substantially smaller API surface. The auth store is a single file, replacing the original Conduit's separate action creators, reducer, and selector files.

### TypeScript Strict Mode

The original Conduit codebase has no TypeScript. Introducing TypeScript in `strict` mode enforces explicit typing on all API response shapes, component props, and hook return values. The number of type errors surfaced during the initial strict-mode pass on migrated code is recorded in the Benchmark Report as a before/after signal for code correctness.

### Tailwind CSS over Bootstrap

Bootstrap ships a complete stylesheet regardless of which classes are used in the application. Tailwind's purge step at build time produces a CSS bundle containing only the classes referenced in source files, which directly reduces CSS payload size. Tailwind also enables a fully custom design system through CSS custom properties and configuration, rather than overriding Bootstrap's opinionated defaults.

### React Hook Form and Zod

The original Conduit forms use uncontrolled inputs with ad-hoc validation logic applied inline. React Hook Form manages form state with field-level re-rendering, meaning only the changed field re-renders rather than the entire form tree. Zod provides schema-level validation that serves dual purposes: form validation at the UI layer and TypeScript type inference for form values, making the schema the single source of truth for both shape and constraints.

### Vitest, React Testing Library, and MSW

Vitest shares the same configuration and transformer as Vite, eliminating the need for a separate Babel or Jest setup. React Testing Library enforces testing from the user's perspective via accessible queries, rather than testing component implementation details. MSW intercepts network requests at the service worker level in tests, meaning tests exercise the full hook-to-API-to-component chain against realistic mocked responses, with no module-level mocking of Axios or fetch.

### DOMPurify alongside marked

The original Conduit renders markdown output directly into the DOM via `dangerouslySetInnerHTML` without sanitization. This is a stored cross-site scripting vulnerability: any user who can create an article can inject arbitrary HTML into the rendered output. DOMPurify sanitizes the HTML produced by `marked` before it reaches the DOM. This security fix is explicitly documented in the case study.

---

## Technologies Excluded from Scope

| Technology | Rationale |
|---|---|
| Redux Toolkit | RTK improves Redux developer ergonomics but does not address the underlying architectural problem of using Redux as a server cache. React Query is the correct solution to that problem. |
| SWR | React Query provides more granular cache control, better TypeScript support, and more mature devtools. Both libraries address the same problem and using React Query is the more common industry choice at this time. |
| styled-components / Emotion | CSS-in-JS solutions add runtime overhead and increase JavaScript bundle size, which is in direct conflict with the performance objectives of this project. |
| GraphQL | The Conduit API is a REST API. Introducing a GraphQL layer would add complexity without improving any of the measured performance dimensions. |
