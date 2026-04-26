# IMPLEMENTATION ROADMAP

---

## Overview

The build is structured across seven phases. Phase 0 is distinct from the rest in that it captures all baseline measurements against the original Conduit application before any Reforge code is written. This ordering is a methodological requirement: the before/after comparison in the Benchmark Report is only valid if the baseline is captured on the unmodified original.

| Phase | Name | Primary Deliverable | Chat Part |
|---|---|---|---|
| 0 | Baseline Audit | All Before columns in BENCHMARK REPORT.md populated | Part 1 |
| 1 | Project Scaffolding | Vite, TypeScript, Tailwind, all config files wired | Part 1 |
| 2 | API Layer and Auth | Axios client, Zustand auth store, login and register flows | Part 1-2 |
| 3 | Feed and Articles | Home page, article list, article detail, React Query | Part 2-3 |
| 4 | User Interactions | Favorites, follows, comments, all with optimistic UI | Part 3 |
| 5 | Editor and Settings | Article creation, edit, settings page, profile page | Part 3-4 |
| 6 | Design System and UI | Full visual redesign, Tailwind component system | Part 4 |
| 7 | Polish and Deployment | SEO, accessibility fixes, Lighthouse CI, Vercel deploy | Part 4-5 |

---

## Phase 0: Baseline Audit

**Objective:** Capture all Before measurements with a reproducible methodology before any Reforge code is written.

**Tasks:**
- Run Lighthouse audit on `react-redux.realworld.io` in incognito with no extensions, on both Desktop and Mobile throttling presets
- Run three Lighthouse passes per preset and record the median score
- Run axe accessibility audit against the live Conduit URL
- Clone the original Conduit repository locally, run `npm run build`, and measure total bundle size via build output
- Run `cloc src/` on the original Conduit repository to record total lines of code, file count, and JS vs TS file breakdown
- Count ESLint violations on the original Conduit codebase
- Manually inspect the `<head>` element on each page type and document which meta tags, Open Graph tags, and structured data are absent
- Run PageSpeed Insights against the live Conduit URL and record lab data Core Web Vitals
- Document that zero test files exist in the original repository
- Populate all Before columns in `BENCHMARK REPORT.md` with real measured values

**Phase complete when:** Every Before cell in the Benchmark Report contains a real measured number. No cell is left blank or estimated.

---

## Phase 1: Project Scaffolding

**Objective:** A fully configured Vite project where `npm run dev` starts correctly, `npm run build` produces an optimized output, and zero configuration debt exists before feature development begins.

**Tasks:**
- Run `npm create vite@latest reforge -- --template react-ts`
- Install and configure Tailwind CSS, PostCSS, and Autoprefixer
- Configure `tsconfig.json` with `strict: true` and all recommended compiler flags
- Configure `vite.config.ts` with the `manualChunks` vendor splitting strategy
- Configure `.eslintrc.json` with TypeScript ESLint and React Hooks plugin rules
- Configure Prettier with consistent formatting rules
- Set up `vitest.config.ts`, install React Testing Library and MSW
- Configure environment variable handling via `VITE_API_BASE_URL`
- Create the `api/client.ts` Axios instance skeleton with interceptor stubs
- Create `store/authStore.ts` as a Zustand store with persist middleware
- Create `router/index.tsx` with all routes defined against stub page components
- Verify that `npm run build` completes cleanly and `rollup-plugin-visualizer` produces a bundle report

**Phase complete when:** The build is clean, TypeScript reports zero errors, ESLint reports zero violations, and the bundle visualizer is operational.

---

## Phase 2: API Layer and Auth

**Objective:** Login, register, and current user fetch are all functional end-to-end against the live Conduit API.

**Tasks:**
- Complete `api/client.ts` with a request interceptor for the Authorization header and a response interceptor for 401 handling
- Define `api/types.ts` with typed shapes for all API responses
- Implement `features/auth/hooks/useLogin.ts` as a React Query mutation
- Implement `features/auth/hooks/useRegister.ts` as a React Query mutation
- Implement `features/auth/hooks/useCurrentUser.ts` as a React Query query
- Build `features/auth/components/LoginForm.tsx` with React Hook Form and Zod schema validation
- Build `features/auth/components/RegisterForm.tsx` with React Hook Form and Zod schema validation
- Build `features/auth/components/AuthGuard.tsx` as a protected route component
- Build `components/layout/Navbar.tsx` with authenticated and unauthenticated states
- Build `pages/LoginPage.tsx` and `pages/RegisterPage.tsx`
- Verify that login works against the real API, the token persists on page refresh, and a 401 response signs the user out and redirects to `/login`

**Phase complete when:** The full authentication loop is functional against the real API with correct redirect behavior in all states.

---

## Phase 3: Feed and Articles

**Objective:** The home page feed, article detail page, and tag filtering are all functional via React Query, with correct loading states.

**Tasks:**
- Implement `features/articles/hooks/useArticles.ts` with pagination and tag, author, and favorited filters
- Implement `features/feed/hooks/useFeed.ts` with personal feed (authenticated) and global feed
- Implement `features/articles/hooks/useArticle.ts` for fetching a single article by slug
- Build `components/article/ArticleCard.tsx` with a skeleton loading state
- Build `features/feed/components/FeedTabs.tsx` for global, personal, and tag-filtered tabs
- Build `features/feed/components/Pagination.tsx`
- Build `pages/HomePage.tsx` with the banner, feed, and popular tags sidebar
- Implement `features/articles/hooks/useComments.ts`, `useAddComment.ts`, and `useDeleteComment.ts`
- Build `features/articles/components/CommentSection.tsx` and `CommentCard.tsx`
- Build `pages/ArticlePage.tsx` with full article meta, markdown body, and comments
- Verify that pagination works correctly, tag filters update the feed, and markdown renders safely via DOMPurify

**Phase complete when:** The home page and article page are fully functional with no console errors and correct skeleton behavior during loading.

---

## Phase 4: User Interactions

**Objective:** Favorites and follows update the UI immediately via optimistic mutations, with correct rollback behavior on failure.

**Tasks:**
- Implement `features/articles/hooks/useFavoriteArticle.ts` as an optimistic mutation with snapshot rollback
- Implement `features/profile/hooks/useFollowUser.ts` as an optimistic mutation with snapshot rollback
- Build `components/article/FavoriteButton.tsx` with a heart icon, count display, and optimistic state
- Build `features/profile/components/FollowButton.tsx` with optimistic follow and unfollow behavior
- Implement `features/profile/hooks/useProfile.ts`
- Build `features/profile/components/ProfileHeader.tsx`
- Build `features/profile/components/ProfileArticles.tsx` and `ProfileFavorites.tsx`
- Build `pages/ProfilePage.tsx`
- Verify that clicking Favorite updates the count immediately, and that the count reverts correctly if the API call fails

**Phase complete when:** All interactive mutations have optimistic updates and correct rollback behavior on simulated network failure.

---

## Phase 5: Editor and Settings

**Objective:** Article creation, editing, and user settings are all functional with correct cache invalidation after mutations.

**Tasks:**
- Implement `features/articles/hooks/useCreateArticle.ts`
- Implement `features/articles/hooks/useUpdateArticle.ts`
- Implement `features/articles/hooks/useDeleteArticle.ts`
- Implement `features/settings/hooks/useUpdateUser.ts`
- Build `features/articles/components/ArticleEditor.tsx` with fields for title, description, body, and tags
- Build `features/settings/components/SettingsForm.tsx` with fields for avatar URL, username, bio, email, and password
- Build `pages/EditorPage.tsx` handling both create and edit routes from the same component
- Build `pages/SettingsPage.tsx`
- Verify that a created article appears in the feed, an edited article pre-populates the form correctly, and a deleted article is removed from all relevant caches

**Phase complete when:** Full article CRUD is working and settings updates are reflected in the navbar without a page refresh.

---

## Phase 6: Design System and UI

**Objective:** The application is visually redesigned. No Bootstrap classes remain. The design is distinguishable from the original Conduit on first view.

**Tasks:**
- Define CSS custom properties in `index.css` covering the color palette, type scale, and spacing scale
- Build all `components/ui/` primitives: Button with variants, Input, Textarea, Badge, Avatar, Spinner, and Skeleton
- Apply the design system across all pages with consistent card layout, typography, and spacing
- Implement loading skeletons on ArticleCard, ProfileHeader, and CommentSection
- Implement `components/error/ErrorBoundary.tsx` and `ErrorMessage.tsx`
- Add dark mode support via Tailwind `dark:` classes with system preference detection
- Ensure all interactive elements have designed hover, focus, active, and disabled states
- Verify that the application is visually portfolio-quality and contains no residual Bootstrap classes

**Phase complete when:** The full visual pass is complete and the application is visually distinct from the original Conduit.

---

## Phase 7: Polish and Deployment

**Objective:** All Lighthouse scores meet the targets defined in SUCCESS CRITERIA.md. The application is deployed to Vercel. All After columns in the Benchmark Report are populated with real measured values.

**Tasks:**
- Implement `lib/seo.ts` and `hooks/usePageTitle.ts`
- Add `<meta>` tags, Open Graph tags, and Twitter Card tags to all pages
- Add JSON-LD Article structured data to `ArticlePage`
- Resolve all axe accessibility violations, covering ARIA labels, focus management, and color contrast
- Add `aria-live` regions for dynamic content updates in the feed and form error states
- Verify full keyboard navigation with correct tab order and no invisible focus states
- Configure `.lighthouserc.json` with Lighthouse CI score assertions
- Run the final Lighthouse audit on Desktop and Mobile in incognito
- Run the final axe audit against the deployed URL
- Run `npm run build` and record final gzipped bundle sizes
- Deploy to Vercel and configure the `VITE_API_BASE_URL` environment variable
- Run PageSpeed Insights against the live Vercel URL for real-world Core Web Vitals data
- Write Vitest tests covering the auth flow, favorite mutation, and feed rendering
- Run `vitest --coverage` and record coverage percentages
- Populate all After columns in `BENCHMARK REPORT.md` with real measured values
- Write the README with the case study narrative, an excerpt of the before/after table, and setup instructions

**Phase complete when:** Every After cell in the Benchmark Report contains a real measured number and the README communicates the full case study story.
