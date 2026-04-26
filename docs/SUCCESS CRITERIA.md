# SUCCESS CRITERIA

---

## Definition of Success

Each criterion below has a specific numeric threshold and a defined measurement method. A criterion passes only when the measured value meets or exceeds the threshold. Estimated or inferred values do not constitute a pass.

---

## Performance Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| Lighthouse Performance score, Desktop | >= 95 | Lighthouse CLI, incognito, no extensions |
| Lighthouse Performance score, Mobile | >= 90 | Lighthouse CLI, incognito, simulated throttling |
| LCP (Largest Contentful Paint) | < 2,500ms | PageSpeed Insights lab data |
| CLS (Cumulative Layout Shift) | < 0.10 | PageSpeed Insights lab data |
| INP (Interaction to Next Paint) | < 200ms | web-vitals library instrumented in application |
| FCP (First Contentful Paint) | < 1,800ms | Lighthouse report |
| TBT (Total Blocking Time) | < 200ms | Lighthouse report |

---

## Bundle Size Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| Total JS bundle size, gzipped | < 150KB | Vite build output with rollup-plugin-visualizer |
| Largest single JS chunk, gzipped | < 60KB | rollup-plugin-visualizer output |
| Number of JS chunks | >= 4 | Build output inspection |
| Total CSS bundle size, gzipped | < 15KB | Build output inspection |
| Measurable reduction from original CRA bundle | Required | Benchmark Report delta column |

---

## Accessibility Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| Lighthouse Accessibility score | >= 95 | Lighthouse CLI |
| axe critical violations | 0 | npx axe against deployed URL |
| axe serious violations | 0 | npx axe against deployed URL |
| All interactive elements reachable via keyboard | Required | Manual keyboard walkthrough of all pages |
| Focus indicator visible on all interactive elements | Required | Manual visual inspection |
| All images have descriptive alt text | 100% | axe audit and manual inspection |
| All form inputs have associated labels | 100% | axe audit |

---

## SEO Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| Lighthouse SEO score | >= 95 | Lighthouse CLI |
| `<title>` tag present and unique on all pages | Required | Manual HTML inspection per page |
| `<meta name="description">` present on all pages | Required | Manual HTML inspection |
| Open Graph tag set complete on all pages | Required | opengraph.xyz validator |
| Twitter Card tags present on all pages | Required | Manual HTML inspection |
| JSON-LD Article structured data on ArticlePage | Required | Google Rich Results Test |
| `<html lang="en">` attribute present | Required | Manual HTML inspection |

---

## Code Quality Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| TypeScript compilation errors | 0 | npm run typecheck (tsc --noEmit) |
| ESLint violations | 0 | npm run lint |
| Untyped `any` usage in application code | 0 | tsc output and manual grep |
| Class components remaining | 0 | grep across src/ |
| Direct Redux imports remaining | 0 | grep across src/ |
| All forms validated with Zod schemas | Required | Code review |
| All dangerouslySetInnerHTML calls sanitized with DOMPurify | Required | Code review |

---

## Test Coverage Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| Test files present | >= 8 | vitest --coverage report |
| Statement coverage | >= 60% | vitest --coverage report |
| Critical user flows with test coverage | Login, Register, Favorite, Feed render | Test file inspection |
| All API calls in tests intercepted by MSW | 100% | MSW handler coverage review |
| All tests passing | 0 failures | npm test output |

---

## UX and Functional Criteria

| Criterion | Target | Measurement Method |
|---|---|---|
| Favorite count updates before API response returns | Required | Manual browser test |
| Follow state updates before API response returns | Required | Manual browser test |
| Optimistic update rolls back on API failure | Required | Manual test with network request blocked |
| Skeleton loading states visible during all data fetches | Required | Manual browser test on throttled connection |
| Error boundary prevents full application crash | Required | Manual error injection test |
| Custom 404 page rendered for unknown routes | Required | Navigate to a nonexistent path |
| Unauthenticated users redirected from protected routes | Required | Manual test without token |
| Login state persists across page refresh | Required | Manual browser test |

---

## Case Study Completeness Criteria

| Criterion | Pass Condition |
|---|---|
| Benchmark Report fully populated | Every Before and After cell contains a real measured value, no placeholders |
| All measured metrics improve from Before to After | Zero regressions across any dimension |
| Measurement methodology documented | How each metric was measured is written in BENCHMARK REPORT.md |
| Live deployment accessible | Vercel URL is publicly reachable |
| Original Conduit baseline cited in README | README links to react-redux.realworld.io as the source baseline |
| README includes before/after comparison | A summary table from BENCHMARK REPORT.md is included in the README |

---

## What This Project Demonstrates

The table below maps the engineering signals this project produces to the evidence that supports each signal. This section is written for a technical recruiter or engineering hiring manager reviewing the repository.

| Engineering Signal | Supporting Evidence |
|---|---|
| Performance engineering with measurable outcomes | Lighthouse delta with documented methodology, not self-reported numbers |
| Architectural decision-making | Written rationale for React Query over Redux, Vite over CRA, documented in TECHNOLOGY STACK.md |
| TypeScript discipline | Strict mode compilation, zero any types, all API response shapes explicitly modeled |
| Security awareness | Stored XSS vulnerability identified in original codebase, fixed with DOMPurify, documented in architecture |
| Testing maturity | React Testing Library with MSW, testing from the user perspective against realistic mocked responses |
| Accessibility engineering | axe violation count before and after, keyboard navigation verified, Lighthouse a11y score documented |
| Frontend design capability | Full visual redesign from Bootstrap defaults to a bespoke Tailwind design system |
| Product and SEO thinking | Open Graph, Twitter Cards, JSON-LD structured data, canonical URLs, all implemented and verified |
