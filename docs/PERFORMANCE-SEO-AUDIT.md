# BCIM Engineering — Performance & SEO Audit

Site: https://site.bcim.in · Stack: Next.js 16.2 (App Router, Turbopack), React 19, Tailwind 4, Framer Motion, hosted on Railway (`next start`).
Audit date: 15 Oct 2026. Tool: Lighthouse 13.5 (mobile emulation, simulated slow 4G, 4× CPU slowdown).

## How to read the numbers

* **Before** = live production (`site.bcim.in`) measured before any change.
* **After** = the same code built with `next build` and served by `next start` on localhost, same Lighthouse settings. Localhost has no network latency, so TTFB is not comparable. Re-run against production after deploy to confirm.
* These are **lab** results. No real-user (field) data was available: Search Console / CrUX access was not provided, so INP and field LCP are **not reported**. TBT is used as the lab proxy for responsiveness.

## Before → after (Lighthouse mobile)

| Page | Perf | A11y | Best Pr. | SEO | LCP | TBT | CLS | Page weight |
|---|---|---|---|---|---|---|---|---|
| Home | 61 → **85** | 96 → **100** | 100 → 100 | 92 → **100** | 15.6 s → 4.3 s | 460 → 50 ms | 0.033 → 0.001 | 2,887 → **584 KiB** |
| Projects | 69 → **91** | 94 → **100** | 100 → 100 | 100 → 100 | 11.7 s → 3.5 s | 230 → 40 ms | 0 → 0 | 2,725 → **765 KiB** |
| Commercial service | 75 → **92** | 94 → **100** | 100 → 100 | 100 → 100 | 8.9 s → 3.4 s | 80 → 40 ms | 0 → 0 | 1,920 → **531 KiB** |
| Project detail (Techridge P3) | 84 → **92** | 96 → **100** | 100 → 100 | 100 → 100 | 4.5 s → 3.4 s | 30 → 50 ms | 0 → 0 | 1,745 → **464 KiB** |
| Gallery | 86 → 89 | 96 → **100** | 100 → 100 | 100 → 100 | 3.9 s → 3.7 s | 20 → 80 ms | 0 → 0 | 4,726 → **775 KiB** |
| About | 98 → 92* | 94 → 98 | 100 → 100 | 100 → 100 | 2.3 s → 3.4 s | 50 → 40 ms | 0 → 0 | 1,455 → **415 KiB** |
| Blog | 95 → 93* | 96 → 96 | 100 → 100 | 100 → 100 | 2.9 s → 3.3 s | 30 → 30 ms | 0 → 0 | 487 → 461 KiB |
| Contact | 99 → 91* | 96 → 100 | 100 → 100 | 100 → 100 | 2.1 s → 3.3 s | 60 → 110 ms | 0 → 0 | 442 → 417 KiB |

\* Lab noise, not a regression in delivered bytes: these pages were already light, and "after" is measured on a different machine setup (local server, no CDN). Confirm on production.

**Targets:** Performance 90+ is met on 6 of 8 pages locally (Home 85 and Gallery 89 are the two below target). SEO 95+, Accessibility 95+ and Best Practices 95+ are met on every tested page. **LCP ≤ 2.5 s is not met in the lab** (3.3–4.3 s under simulated slow-4G/4× CPU). INP could not be measured.

## Verified findings (evidence → fix)

| # | Severity | Finding & evidence | Fix | Files |
|---|---|---|---|---|
| 1 | **High** | Photos served unoptimised: home hero and featured cards were 1.1 MB JPEGs (`techridge-p3*.jpg`), loaded twice on the home page (2.9 MB page). Lighthouse LCP 15.6 s (home), 11.7 s (projects). All `<img>` bypassed Next's optimiser. | New `SiteImage` wrapper uses `next/image` (AVIF/WebP, responsive `sizes`, lazy loading). Hero is the only `priority` image. Hero now delivers ~29–38 KB AVIF instead of 1,112 KB. | `src/components/shared/SiteImage.tsx` + 12 components/pages |
| 2 | **High** | Home "Services" cards used `motion.img` with the raw 1.1 MB photo, still loaded after fix 1 (seen in the second Lighthouse run). | `motion.create(Image)` with `fill` + `sizes`. | `src/components/home/ServicesSection.tsx` |
| 3 | **High** | Hero text was invisible until JS hydration (Framer Motion `initial="hidden"`), delaying FCP/LCP; hero also loaded GSAP (~70 KB) only for a word swap. | Hero entrance now plain CSS keyframes (same look, starts on first paint, respects `prefers-reduced-motion`); word swap uses a CSS transition. GSAP removed. | `Hero.tsx`, `globals.css` |
| 4 | Medium | `/images/*` served with `Cache-Control: public, max-age=0` (verified with curl). | 1-day cache + stale-while-revalidate (files are not fingerprinted, so not `immutable`). Optimised images cached 30 days. | `next.config.ts` |
| 5 | Medium | 9 dependencies installed but never imported: gsap, @gsap/react, swiper, react-intersection-observer, 4× @radix-ui, class-variance-authority. | Removed (build + type check pass). | `package.json`, lockfile |
| 6 | Medium | **Fake project photos:** every project page showed the same 3 Unsplash stock photos under "Project Gallery", captioned "<project> view 1–3". | Section removed. Real project photos can be added back when supplied. | `src/app/projects/[id]/page.tsx` |
| 7 | Medium | SEO audit failure on home: two links with text "Learn More" (SEO 92). | Added visually-hidden context ("about Commercial Construction"). | `ServicesSection.tsx`, `ServicesOverview.tsx` |
| 8 | Medium | Colour-contrast failures (white on amber 2.1:1, white on green 2.5–3.7:1, grey-400 text 2.5:1, footer text 3.75:1) on 4 pages. | Darker badge colours, `navy-500` text on light backgrounds, lighter footer text. | 5 components |
| 9 | Low | Heading order skipped levels on Projects and service pages (h1 → h3/h4). | Corrected to h1 → h2 → h3. | `ServiceDetail.tsx`, `ProjectsGrid.tsx` |
| 10 | Low | Sitemap `lastModified` was the build time for every URL, which is misleading to crawlers. | Removed for pages without a real date; blog keeps its real publication dates. | `src/app/sitemap.ts` |
| 11 | Low | Structured data had only Organization + WebSite. | Added `BreadcrumbList` (inner pages), `BlogPosting` (articles, real dates), `Service` (Commercial, Residential). All mirror visible content; nothing invented. | `src/lib/site.ts`, `JsonLd.tsx`, 10 pages |
| 12 | Low | Hero "Years Active" was hard-coded 7+; computed value is 8+ (2018 → 2026). | Now computed from the founding year. | `Hero.tsx` |

Already fixed earlier in this engagement (verified live): canonical URLs → `site.bcim.in`, working `og-image.jpg`, 16 px form inputs, mobile menu scrolling.

## Checked and found correct (no change)

* HTTP → HTTPS 301; `/about/` → `/about` 308; unknown routes 404; removed pages (`/request-quote`, `/services/interior`) 404.
* `robots.txt` allows crawling, blocks `/admin` and `/api`, references the sitemap. Sitemap: 31 URLs, all 200, no private or stale pages.
* One H1 per page, titles and descriptions unique, `alt` present on all content images (empty only on decorative heroes).
* Project statistics match records: 7 completed, 4 ongoing, 3 states (Karnataka, Telangana, Andhra Pradesh).
* Document TTFB 230–250 ms from this location; gzip enabled.

## Unresolved — needs you / access

1. **Real photos wanted.** Stock Unsplash images are still used for: Sri City project cover, About-page "team at work" image (alt text claims it is BCIM's team), blog covers. Supply approved BCIM photos to replace them.
2. **"0 Lost Time Accidents"** (home hero) is not backed by any record in the repo. Confirm before keeping it public.
3. **LCP still > 2.5 s in the lab.** Cause: most pages reveal their first content with Framer Motion `initial` opacity-0 states, so text appears only after hydration under CPU throttling. Fix needs a wider change (CSS-first entrance on above-the-fold blocks); not done to avoid altering the design across 19 files.
4. **Next.js security advisory** (`npm audit`: 1 critical in `next`, high in `nanoid`/`postcss`). `npm audit fix --force` upgrades Next to a newer major/minor; needs a planned upgrade and test.
5. **Google Search Console / field data**: not accessible here. Add `site.bcim.in`, submit `/sitemap.xml`, inspect the home and a project URL, then check Core Web Vitals after ~28 days of traffic.
6. **DQS project page title** is 81 characters (will be truncated in results); needs a shorter approved display name.
7. **Domain decision:** canonical/sitemap/JSON-LD point to `site.bcim.in` because `bcim.in` is still the old GoDaddy site. Switch `src/lib/site.ts`, `layout.tsx` metadata and `sitemap.ts` together when `bcim.in` moves.
8. **Blog content** (4 articles dated Mar–Jun 2025, "India 2025" trends) needs a human accuracy review; dates were left untouched. Blog has no internal links to service/project pages.
9. No lint or test scripts exist in `package.json`; checks run were `tsc --noEmit`, `next build`, and Lighthouse.

## Deploy and rollback

* Deploy: push to `master`; Railway builds with Nixpacks (`next build`, `next start`). First requests to each image generate its AVIF/WebP once (slower), then are cached.
* After deploy re-run: `npx lighthouse https://site.bcim.in/ --only-categories=performance,accessibility,best-practices,seo` for Home, Projects, a project page, Gallery.
* Rollback: `git revert <commit>` and push, or redeploy the previous successful deployment in the Railway dashboard. No data or environment variable changes are involved.

## Production re-test (live site, after deploy of 294a466)

Same Lighthouse settings. Production scores vary noticeably run to run (the first run after a deploy also pays for generating each AVIF/WebP once), so two runs are shown where they differed.

| Page | Perf (run 1 / run 2) | A11y | Best Pr. | SEO | LCP | TBT | Weight |
|---|---|---|---|---|---|---|---|
| Home | 52 / 74 | 100 | 100 | 100 | 6.1 / 6.0 s | 1,050 / 200 ms | 2,887 → 584 KiB |
| Projects | 73 / 84 | 100 | 100 | 100 | 6.1 / 4.5 s | 40 / 50 ms | 2,725 → 765 KiB |
| Project detail | 97 | 100 | 100 | 100 | 2.6 s | 20 ms | 1,745 → 464 KiB |
| Commercial | 94 | 100 | 100 | 100 | 3.0 s | 10 ms | 1,920 → 531 KiB |
| Gallery | 94 | 100 | 100 | 100 | 2.7 s | 20 ms | 4,726 → 772 KiB |
| About | 85 / 97 | 98 | 100 | 100 | 3.3 / 2.5 s | 310 / 30 ms | 1,455 → 417 KiB |
| Blog | 98 | 96 | 100 | 100 | 2.3 s | 20 ms | 487 → 462 KiB |
| Contact | 89 / 99 | 100 | 100 | 100 | 3.5 / 2.0 s | 80 / 50 ms | 442 → 417 KiB |

Result: Accessibility, Best Practices and SEO ≥ 96 everywhere; page weight down 5–80%. Performance ≥ 90 on 6 of 8 pages in at least one run; **Home (52–74) and Projects (73–84) remain below target.**

Follow-up found in this re-test: on the home page the measured LCP element was the headline word that swaps every few seconds, so a longer swapped word re-set LCP (observed render delay ~3.9 s). The word swap now starts 7 s after load; locally the observed LCP element is the eyebrow line (render delay ~0.7 s). The simulated Lighthouse LCP score is unchanged (4.3 s), so the home page is still short of the 2.5 s target; the remaining cost is JavaScript (Framer Motion + hydration), see "Unresolved" item 3.
