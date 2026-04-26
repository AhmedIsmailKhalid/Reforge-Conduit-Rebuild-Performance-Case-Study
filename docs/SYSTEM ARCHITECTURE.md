# SYSTEM ARCHITECTURE

---

## Overview

Reforge is a single-page application that consumes the public Conduit RealWorld API. There is no custom backend. The architectural scope of this project is entirely within the frontend layer, covering data flow design, state ownership boundaries, bundle structure, and rendering strategy.

---

## High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                          Browser                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  React Application                    │   │
│  │                                                       │   │
│  │  ┌─────────────┐    ┌─────────────────────────────┐  │   │
│  │  │ React Router │───▶│      Page Components        │  │   │
│  │  └─────────────┘    └──────────────┬──────────────┘  │   │
│  │                                     │                  │   │
│  │                      ┌──────────────┴─────────────┐   │   │
│  │                       │                            │   │   │
│  │  ┌───────────────────▼──────┐  ┌────────────────┐ │   │   │
│  │  │      Feature Hooks        │  │    Shared UI   │ │   │   │
│  │  │     (React Query)        │  │  Components    │ │   │   │
│  │  └───────────────────┬──────┘  └────────────────┘ │   │   │
│  │                       │                              │   │   │
│  │  ┌────────────────────▼────┐  ┌──────────────────┐ │   │   │
│  │  │      Query Client        │  │  Zustand Store   │ │   │   │
│  │  │    (server cache)        │  │  (auth session)  │ │   │   │
│  │  └────────────────────┬────┘  └──────────────────┘ │   │   │
│  │                        │                              │   │   │
│  │  ┌─────────────────────▼───┐                         │   │   │
│  │  │       Axios Client       │                         │   │   │
│  │  │     (interceptors)       │                         │   │   │
│  │  └─────────────────────┬───┘                         │   │   │
│  └────────────────────────┼─────────────────────────────┘   │
│                            │ HTTPS                            │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│          Conduit RealWorld API  (api.realworld.io)          │
│                                                              │
│  /api/articles      /api/profiles     /api/tags             │
│  /api/articles/:slug/comments         /api/user             │
│  /api/users/login   /api/users        /api/user/feed        │
└────────────────────────────────────────────────────────────┘
```

---

## State Ownership Boundaries

The central architectural decision in Reforge is the explicit separation of server state and client state into distinct ownership layers. The original Conduit conflates both into a single Redux store, which creates cache invalidation complexity and requires manual coordination between network responses and UI state.

```
┌──────────────────────────────────────────────────────────┐
│                    State Ownership Map                    │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │            React Query  (Server State)             │   │
│  │                                                     │   │
│  │   Articles   Profiles   Comments   Tags            │   │
│  │                                                     │   │
│  │   Responsibilities:                                 │   │
│  │   - Automatic background refetch on window focus   │   │
│  │   - Stale-while-revalidate cache strategy          │   │
│  │   - Optimistic mutations with rollback             │   │
│  │   - Request deduplication across components        │   │
│  │   - Cache invalidation on successful mutation      │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │            Zustand  (Client State)                  │   │
│  │                                                     │   │
│  │   Auth token   Current user object                 │   │
│  │                                                     │   │
│  │   Responsibilities:                                 │   │
│  │   - Persist token to localStorage via middleware   │   │
│  │   - Expose token to Axios request interceptor      │   │
│  │   - Clear all state on logout or 401 response      │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │        React Local State  (Component State)        │   │
│  │                                                     │   │
│  │   UI toggles   Modal open/close   Tab selection    │   │
│  │   Form state managed via React Hook Form           │   │
│  └───────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Bundle Architecture

The shift from a single CRA bundle to Vite's manual chunking strategy is one of the two primary performance improvements in this project. Vendor dependencies are split into separately cacheable chunks. A deployment that changes only application code does not invalidate the cached vendor chunks in the user's browser.

```
Original Conduit  (CRA Build):
┌──────────────────────────────────────────────────────────┐
│         main.[hash].js   (~400-500KB gzipped)            │
│   React + Redux + all vendor code + all app code         │
│   Single chunk, no code splitting                        │
└──────────────────────────────────────────────────────────┘

Reforge  (Vite Build with manualChunks):
┌──────────────────────────────────────────────────────────┐
│  vendor-react.[hash].js           (~45KB gzipped)        │
│  react, react-dom, react-router-dom                      │
├──────────────────────────────────────────────────────────┤
│  vendor-query.[hash].js           (~15KB gzipped)        │
│  @tanstack/react-query                                    │
├──────────────────────────────────────────────────────────┤
│  vendor-forms.[hash].js           (~12KB gzipped)        │
│  react-hook-form, zod                                     │
├──────────────────────────────────────────────────────────┤
│  vendor-markdown.[hash].js        (~20KB gzipped)        │
│  marked, dompurify                                        │
├──────────────────────────────────────────────────────────┤
│  app.[hash].js                    (~30KB gzipped)        │
│  All application source code                             │
└──────────────────────────────────────────────────────────┘
  Vendor chunks are cached across deployments.
  An application code change invalidates only app.[hash].js.
```

---

## Request Lifecycle with Optimistic Updates

```
User action: click Favorite button
        │
        ▼
FavoriteButton.tsx
  calls useFavoriteArticle() mutation
        │
        ▼
React Query mutation handler
  1. Snapshots previous cache entry for this article
  2. Applies optimistic update to cache immediately
  3. UI reflects new state before any network call
        │
        ▼
Axios client  (api/client.ts)
  Request interceptor injects Authorization header
  from Zustand authStore.token
        │
        ├── SUCCESS
        │     Cache entry for this article is invalidated
        │     React Query refetches to confirm server state
        │     UI already shows correct state
        │
        └── FAILURE
              Optimistic update is rolled back from snapshot
              Previous cache entry is restored
              Error state displayed to user
```

---

## Authentication Data Flow

```
Step 1: User submits login form
        Zod schema validates email format and password length
        Validation error displayed inline if schema fails

Step 2: useLogin() mutation fires
        POST /api/users/login

Step 3: Successful response received
        user.token extracted from response body
        authStore.setAuth(token, user) called
        Zustand persist middleware writes to localStorage

Step 4: Subsequent authenticated requests
        Axios request interceptor reads authStore.token
        Injects header: Authorization: Token <jwt>

Step 5: 401 response received on any request
        Axios response interceptor catches the error
        authStore.clearAuth() clears token and user
        React Router redirects user to /login
```

---

## SEO Architecture

```
lib/seo.ts
  Exports buildMetaTags(title, description, ogData)
  Returns a structured object consumed by each page component

hooks/usePageTitle.ts
  Calls document.title on every route change via useEffect
  Accepts a page-specific title string

Per-page meta tag coverage:
  HomePage       "Reforge — A Modern Blogging Platform"
  ArticlePage    article.title and article.description (dynamic, from API)
  ProfilePage    "@username on Reforge" (dynamic)
  All pages      Open Graph tags and Twitter Card tags
  ArticlePage    JSON-LD Article structured data schema
```

---

## Security Improvements Over Original Conduit

| Vulnerability | Original Conduit | Reforge |
|---|---|---|
| Stored XSS via markdown | marked output injected into DOM without sanitization | marked output passed through DOMPurify.sanitize() before dangerouslySetInnerHTML |
| No input validation | Raw form values sent directly to API | Zod schemas validate all form input client-side before any network call |
| Token handling on 401 | No automatic token invalidation | Axios response interceptor clears token and redirects on any 401 response |
