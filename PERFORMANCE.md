# Loading performance

The first performance pass preserves the design, original photography, factual content, routes, and GSAP motion. It changes the files delivered to the browser.

## Measured file sizes

Decimal units; responsive photo size depends on viewport and pixel density.

| Resource | Before | After |
| --- | ---: | ---: |
| Registan photograph used by cards and story sections | 41.2 MB | 23–271 KB; 81 KB at 960px |
| First hero photograph | 4.59 MB | 23–272 KB; 82 KB at 960px |
| English tour catalog | 701 KB | 78 KB |
| English destination catalog | 156 KB | 18 KB |
| Startup JavaScript, all static dependencies | 913 KB | 722 KB |
| Startup JavaScript, gzip | 298 KB | 240 KB |
| Startup CSS | 116 KB | 95 KB |

These are production artifact sizes, not browser load-time or Lighthouse measurements. The in-app browser remained on an internal error page that its security policy prevents controlling. Fresh browser timing and visual checks require reloading the local preview.

## What changed

- Original photos stay intact. A repeatable Sharp preparation step creates WebP versions at up to 480, 960, 1600, and 1920px, with content-hashed filenames and duplicate-photo reuse. The shared image component supplies responsive sources, correct display-size hints, and intrinsic dimensions. The first hero image loads eagerly; other content remains lazy.
- Catalog requests contain the selected language and English fallback. Queries cache each language separately without re-fetching unchanged catalog data on every window focus.
- English interface text is available immediately. Six other dictionaries load on selection, and the existing language remains visible while the next dictionary loads. A failed download retains readable English fallback text.
- The chat conversation, destination drawer, map styles, and contact notification code load when needed. Unused global tooltip/toast providers and unused carousel styles no longer enter startup delivery.
- Vercel cache rules allow long-lived caching for content-hashed photos and short caching for language catalogs. No deployment has been performed by this performance pass.

## Development and verification

Use `npm run dev` or `npm run build`. Both automatically prepare assets; subsequent runs reuse existing encodes. Generated files under `src/generated/` and `public/data/optimized/` are ignored by Git and are recreated from committed source files.

After a production build, run `node scripts/verify-redesign.mjs` and `node scripts/verify-performance.mjs`. Verification covers all 166 source tour records, 1,162 cross-language URL/price resolutions including duplicate options, all seven asynchronous language switches, failed-language fallback, unchanged localized catalog facts, and all 216 responsive photo entries with production files present.

The production build and scoped ESLint checks pass. Vite still reports a startup chunk above 500 KB. Backend response time and live Core Web Vitals were not measured, so this pass does not claim that every remaining source of latency is resolved.
