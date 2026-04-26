# BENCHMARK REPORT

---

## Methodology

All Before measurements are taken against the live original Conduit implementation at `https://conduit-realworld-example-app.fly.dev/` before any Reforge code is written. All After measurements are taken against the deployed Reforge application after Phase 7 is complete. Both sets of measurements use identical tooling and conditions to ensure comparability.

---

## Measurement Conditions

| Parameter | Specification |
|---|---|
| Browser | Chrome 147.0.7727.117 (64-bit) |
| Browser mode | Incognito window |
| Extensions | None active |
| Lighthouse throttling | Simulated throttling, default preset |
| Lighthouse runs per URL | 3 runs, median score recorded |
| axe version | axe-core 4.11.3 via CLI |
| Bundle measurement | Gzipped sizes from production build output |
| Core Web Vitals source | Lighthouse CLI lab data |
| Date of Before audit | 26 April 2026 |
| Date of After audit | _______________ |

---

## Section 1: Lighthouse Scores

### Desktop

| Metric | Before | After | Delta | Target |
|---|---|---|---|---|
| Performance | 81 | | | >= 95 |
| Accessibility | 91 | | | >= 95 |
| Best Practices | 100 | | | >= 95 |
| SEO | 100 | | | >= 95 |

**Run breakdown (Desktop):**

| Run | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Run 1 | 81 | 91 | 100 | 100 |
| Run 2 | 81 | 91 | 100 | 100 |
| Run 3 | 80 | 91 | 100 | 100 |
| **Median** | **81** | **91** | **100** | **100** |

### Mobile

| Metric | Before | After | Delta | Target |
|---|---|---|---|---|
| Performance | 76 | | | >= 90 |
| Accessibility | 91 | | | >= 95 |
| Best Practices | 100 | | | >= 95 |
| SEO | 100 | | | >= 95 |

**Run breakdown (Mobile):**

| Run | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Run 1 | 77 | 91 | 100 | 100 |
| Run 2 | 76 | 91 | 100 | 100 |
| Run 3 | 76 | 91 | 100 | 100 |
| **Median** | **76** | **91** | **100** | **100** |

---

## Section 2: Core Web Vitals (Lighthouse CLI Lab Data)

### Desktop

| Metric | Before | After | Delta | Good Threshold |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | 0.7s | | | < 2,500ms |
| CLS (Cumulative Layout Shift) | 0.401 | | | < 0.10 |
| INP (Interaction to Next Paint) | N/A | | | < 200ms |
| FCP (First Contentful Paint) | 0.7s | | | < 1,800ms |
| TBT (Total Blocking Time) | 0ms | | | < 200ms |
| Speed Index | 0.8s | | | < 3,400ms |

**Note:** CLS of 0.401 on desktop is rated Poor by Google thresholds, where anything above 0.25 is Poor. This layout shift occurs only at wider viewport widths and is absent on mobile, indicating a viewport-specific layout instability in the original implementation. This is the single most significant Core Web Vitals finding in the Before audit.

### Mobile

| Metric | Before | After | Delta | Good Threshold |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | 4.2s | | | < 2,500ms |
| CLS (Cumulative Layout Shift) | 0 | | | < 0.10 |
| INP (Interaction to Next Paint) | N/A | | | < 200ms |
| FCP (First Contentful Paint) | 3.9s | | | < 1,800ms |
| TBT (Total Blocking Time) | 0ms | | | < 200ms |
| Speed Index | 3.9s | | | < 3,400ms |

**Note:** Mobile LCP of 4.2s and FCP of 3.9s are both rated Poor. The performance gap between desktop and mobile is substantial, with LCP degrading by 3.5s under mobile throttling conditions. Both values exceed their respective Good thresholds by a wide margin.

---

## Section 3: Bundle Size

| Metric | Before (CRA) | After (Vite) | Delta | Target |
|---|---|---|---|---|
| Total JS bundle size, gzipped | 86.8KB | | | < 150KB |
| Largest single JS chunk, gzipped | 86.8KB | | | < 60KB |
| Number of JS chunks | 1 | | | >= 4 |
| Total CSS size, gzipped | 0KB, embedded in JS | | | < 15KB |
| Total assets size, gzipped | 86.8KB | | | — |

**Measurement notes:**
- Before: measured from CRA build output under `build/static/js/` using Node.js zlib.gzipSync
- The original Conduit produces a single monolithic JS chunk with no code splitting. Bootstrap CSS is embedded inside the JS bundle rather than delivered as a separate stylesheet, which prevents the browser from caching styles independently of application logic.
- After: measured from Vite build output using rollup-plugin-visualizer

---

## Section 4: Accessibility (axe-core 4.11.3 Audit)

### Violation Counts

| Severity | Before | After | Delta |
|---|---|---|---|
| Critical | 0 | | |
| Serious | 2 | | |
| Moderate | 3 | | |
| Minor | 0 | | |
| Total | 5 | | |

### Violations Identified in Before Audit

| Rule ID | Description | Severity | Resolved in After |
|---|---|---|---|
| document-title | HTML document has no non-empty title element | Serious | |
| html-has-lang | HTML element has no lang attribute | Serious | |
| landmark-one-main | Document has no main landmark element | Moderate | |
| page-has-heading-one | Page contains no level-one heading | Moderate | |
| region | Page content is not contained within landmark regions | Moderate | |

**Note:** The axe audit runs against the initial HTML shell before React hydration. The violations reflect genuine structural omissions: the title and lang attribute are never set at any point in the page lifecycle, which the Lighthouse accessibility audit independently confirms via the score of 91 rather than 100.

---

## Section 5: SEO Tag Coverage

| Tag or Property | Before | After |
|---|---|---|
| `<title>` tag present | Yes, static value "Conduit", never updated per route | |
| `<meta name="description">` present | Yes, CRA default "Web site created using create-react-app", not meaningful | |
| `<html lang="">` attribute | Yes, value "en" | |
| `og:title` | MISSING | |
| `og:description` | MISSING | |
| `og:image` | MISSING | |
| `og:url` | MISSING | |
| `twitter:card` | MISSING | |
| `twitter:title` | MISSING | |
| `twitter:description` | MISSING | |
| JSON-LD structured data, Article schema | MISSING | |
| Canonical URL tag | MISSING | |
| Meta robots tag | MISSING | |
| Lighthouse SEO score | 100 Desktop, 100 Mobile | |

**Note:** The Lighthouse SEO score of 100 reflects only crawlability and basic tag presence. It does not validate Open Graph tags, Twitter Cards, structured data, or whether description content is meaningful. The title element never updates across route changes, the description is the CRA boilerplate default, and all social sharing metadata is absent. The functional SEO quality is poor despite the 100 score.

---

## Section 6: Code Quality

| Metric | Before | After | Delta |
|---|---|---|---|
| TypeScript errors (tsc --noEmit) | N/A, no TypeScript in codebase | | |
| ESLint violations | N/A, no ESLint configuration present | | |
| Class components | 11 | | |
| Files using untyped `any` | N/A, plain JavaScript throughout | | |
| Files with Redux imports | Not individually counted, entire state layer is Redux | | |
| Total lines of code | 2,378 | | |
| Total source files | 38 | | |
| JavaScript files | 38 | | |
| TypeScript and TSX files | 0 | | |

**Class components identified in Before audit:**

| File | Component |
|---|---|
| src/components/App.js | App |
| src/components/Article/CommentInput.js | CommentInput |
| src/components/Article/index.js | Article |
| src/components/Editor.js | Editor |
| src/components/Header.js | Header |
| src/components/Home/index.js | Home |
| src/components/ListErrors.js | ListErrors |
| src/components/Login.js | Login |
| src/components/Profile.js | Profile |
| src/components/Register.js | Register |
| src/components/Settings.js | Settings |

---

## Section 7: Test Coverage

| Metric | Before | After |
|---|---|---|
| Test files | 0 | |
| Total test cases | 0 | |
| Statement coverage | 0% | |
| Branch coverage | 0% | |
| Function coverage | 0% | |
| Line coverage | 0% | |
| Critical flows covered | None | |

---

## Section 8: High-Level Summary

| Dimension | Before | After | Change |
|---|---|---|---|
| Lighthouse Performance, Desktop | 81 | | |
| Lighthouse Performance, Mobile | 76 | | |
| Lighthouse Accessibility, Desktop | 91 | | |
| Lighthouse SEO, Desktop | 100 | | |
| LCP, Desktop | 0.7s | | |
| LCP, Mobile | 4.2s | | |
| CLS, Desktop | 0.401 (Poor) | | |
| Total JS bundle, gzipped | 86.8KB, 1 chunk | | |
| axe serious violations | 2 | | |
| axe moderate violations | 3 | | |
| Open Graph tags present | 0 of 4 | | |
| Twitter Card tags present | 0 of 3 | | |
| Class components | 11 | | |
| TypeScript files | 0 | | |
| Test files | 0 | | |

---

## Audit Tool Versions

| Tool | Version |
|---|---|
| Chrome | 147.0.7727.117 (64-bit) |
| Lighthouse CLI | 13.1.0 |
| axe CLI | 4.11.2 (axe-core 4.11.3) |
| PageSpeed Insights | web tool, version not applicable |
| Node.js | 22.22.1 |
| npm | 10.9.4 |
| Vite | TBD, populated in After audit |
| Vitest | TBD, populated in After audit |

---

_This document is populated in two passes. Phase 0 populates all Before columns. Phase 7 populates all After columns. All values are real measured results._
