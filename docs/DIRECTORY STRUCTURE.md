# DIRECTORY STRUCTURE

---

## Root Structure

```
reforge/
├── .env                              # Environment variables (never committed)
├── .env.example                      # Template for environment variables
├── .eslintrc.json                    # ESLint flat config
├── .gitignore
├── index.html                        # Vite entry point
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json                     # TypeScript strict config
├── tsconfig.node.json                # Node-specific TS config for vite.config
├── vite.config.ts                    # Vite config with manual chunking
├── vitest.config.ts                  # Vitest config, separate from vite for clarity
├── .lighthouserc.json                # Lighthouse CI configuration
├── docs/
│   ├── DIRECTORY STRUCTURE.md
│   ├── IMPLEMENTATION ROADMAP.md
│   ├── SUCCESS CRITERIA.md
│   ├── SYSTEM ARCHITECTURE.md
│   ├── TECHNOLOGY STACK.md
│   └── BENCHMARK REPORT.md          # Before/after metrics, the primary case study artifact
└── src/
    ├── main.tsx                      # App entry point, providers, strict mode
    ├── App.tsx                       # Root component, router outlet
    ├── index.css                     # Global styles, Tailwind directives, CSS custom properties
    ├── vite-env.d.ts                 # Vite type declarations
    │
    ├── api/                          # API layer, all network concerns isolated here
    │   ├── client.ts                 # Axios instance with interceptors and token management
    │   ├── endpoints.ts              # Typed endpoint constants
    │   └── types.ts                  # Raw API response shapes, mapped to domain types in hooks
    │
    ├── components/                   # Shared, reusable UI components
    │   ├── ui/                       # Primitive design system components
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Textarea.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Avatar.tsx
    │   │   ├── Spinner.tsx
    │   │   ├── Skeleton.tsx          # Loading skeleton primitives
    │   │   └── index.ts              # Barrel export
    │   ├── layout/                   # Structural layout components
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── PageContainer.tsx
    │   ├── article/                  # Article-specific shared components
    │   │   ├── ArticleCard.tsx       # Feed card with author, tags, and preview
    │   │   ├── ArticleCardSkeleton.tsx
    │   │   ├── ArticleMeta.tsx       # Author, date, follow, and like actions
    │   │   ├── TagList.tsx
    │   │   └── FavoriteButton.tsx    # Optimistic UI heart button
    │   └── error/
    │       ├── ErrorBoundary.tsx     # React error boundary wrapper
    │       └── ErrorMessage.tsx      # Inline error state component
    │
    ├── features/                     # Feature-sliced modules, each owns its domain
    │   ├── auth/
    │   │   ├── components/
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── RegisterForm.tsx
    │   │   │   └── AuthGuard.tsx     # Protected route wrapper
    │   │   ├── hooks/
    │   │   │   ├── useLogin.ts
    │   │   │   ├── useRegister.ts
    │   │   │   └── useCurrentUser.ts
    │   │   └── schemas/
    │   │       └── auth.schema.ts    # Zod validation schemas
    │   │
    │   ├── articles/
    │   │   ├── components/
    │   │   │   ├── ArticleEditor.tsx
    │   │   │   ├── ArticleBody.tsx   # Markdown rendering
    │   │   │   ├── CommentSection.tsx
    │   │   │   ├── CommentCard.tsx
    │   │   │   ├── CommentForm.tsx
    │   │   │   └── DeleteArticleButton.tsx
    │   │   ├── hooks/
    │   │   │   ├── useArticle.ts
    │   │   │   ├── useArticles.ts        # Paginated feed with React Query
    │   │   │   ├── useCreateArticle.ts
    │   │   │   ├── useUpdateArticle.ts
    │   │   │   ├── useDeleteArticle.ts
    │   │   │   ├── useFavoriteArticle.ts # Optimistic mutation
    │   │   │   ├── useComments.ts
    │   │   │   ├── useAddComment.ts
    │   │   │   └── useDeleteComment.ts
    │   │   └── schemas/
    │   │       └── article.schema.ts
    │   │
    │   ├── feed/
    │   │   ├── components/
    │   │   │   ├── GlobalFeed.tsx
    │   │   │   ├── PersonalFeed.tsx
    │   │   │   ├── TagFeed.tsx
    │   │   │   ├── FeedTabs.tsx
    │   │   │   └── Pagination.tsx
    │   │   └── hooks/
    │   │       └── useFeed.ts            # Unified feed hook with tab and page state
    │   │
    │   ├── profile/
    │   │   ├── components/
    │   │   │   ├── ProfileHeader.tsx
    │   │   │   ├── ProfileArticles.tsx
    │   │   │   ├── ProfileFavorites.tsx
    │   │   │   └── FollowButton.tsx      # Optimistic follow/unfollow
    │   │   └── hooks/
    │   │       ├── useProfile.ts
    │   │       └── useFollowUser.ts
    │   │
    │   └── settings/
    │       ├── components/
    │       │   └── SettingsForm.tsx
    │       └── hooks/
    │           └── useUpdateUser.ts
    │
    ├── hooks/                            # Global, cross-feature hooks
    │   ├── usePageTitle.ts               # Sets document.title per page for SEO
    │   └── useIntersectionObserver.ts
    │
    ├── pages/                            # Route-level page components, thin wrappers
    │   ├── HomePage.tsx
    │   ├── LoginPage.tsx
    │   ├── RegisterPage.tsx
    │   ├── ArticlePage.tsx
    │   ├── EditorPage.tsx
    │   ├── ProfilePage.tsx
    │   ├── SettingsPage.tsx
    │   └── NotFoundPage.tsx
    │
    ├── router/
    │   ├── index.tsx                     # createBrowserRouter definition
    │   └── routes.ts                     # Route path constants
    │
    ├── store/                            # Zustand stores for client-only state
    │   └── authStore.ts                  # Auth token and current user, persisted
    │
    ├── lib/                              # Pure utilities, no React, no side effects
    │   ├── date.ts                       # Date formatting helpers
    │   ├── markdown.ts                   # Markdown parser setup
    │   └── seo.ts                        # Meta tag helpers
    │
    └── tests/                            # Vitest test files
        ├── setup.ts                      # Global test setup, MSW and matchers
        ├── mocks/
        │   ├── handlers.ts               # MSW request handlers
        │   └── server.ts                 # MSW server instance
        ├── components/
        │   ├── ArticleCard.test.tsx
        │   ├── FavoriteButton.test.tsx
        │   └── AuthGuard.test.tsx
        └── hooks/
            ├── useLogin.test.ts
            ├── useFavoriteArticle.test.ts
            └── useArticles.test.ts
```

---

## Architectural Decisions Reflected in the Structure

**`api/` isolation.** No component imports directly from `api/`. All data access is routed through hooks in `features/*/hooks/`, keeping the API layer decoupled and independently testable.

**Feature-sliced `features/` directory.** Modules are organized by domain, not by file type. Each feature owns its components, hooks, and schemas. Cross-feature dependencies are resolved through the shared `components/` directory only.

**Thin `pages/` components.** Page-level components compose feature components but contain no business logic. This constrains route components to a minimal surface area and keeps testable logic inside features.

**Minimal `components/ui/` design system.** Primitive components accept `className` overrides and impose no third-party dependency on the styling layer, giving full design control without an external component library.

**Constrained `store/` scope.** Zustand manages only client state that React Query cannot own: the auth token and current user session. All server-derived state, articles, profiles, tags, and comments, is owned by React Query.
