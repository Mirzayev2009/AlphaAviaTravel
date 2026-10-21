# Amber header and visible motion refinement

Requested and implemented 21 October 2026, following the user’s review of the prior motion pass. The user asked for distinct homepage header animation, elegant main-color inner header backgrounds without pictures or flat fills, and stronger motion throughout.

## Delivered

- Shared inline vector backdrop: warm ivory, layered amber curves, fine architectural contour lines. Applied through PageIntro to Tours, Destinations, Services, Gallery, About, Contact, Visa questions/results and recovery headings, plus the custom tour-detail and compact chat headers. No new image requests or libraries.
- First-paint CSS entrance for complete hero copy/actions, amber accent and navigation; no word splitting. GSAP copy transition on carousel changes; photo and playback controls retained.
- Deferred GSAP artwork reveal, all visible cards (fixed the previous six-card slice), stronger story/composition arrivals, category-result feedback and whole-service-rail arrivals. No animation loops, animated blur or React state updates per frame.
- Warm header tokens and current motion documentation/sidecar updated. All page order, routes, factual text, languages and integrations retained.

## Checks

- Production build and scoped ESLint passed; diff whitespace check passed.
- verify-motion.mjs passed: budget/lazy graph, playback states and cleanup, undistorted photo geometry.
- verify-chat.mjs passed; verify-redesign.mjs passed for 166 catalog records and 169 interface keys across seven languages.
- Desktop 1365×900 and phone 390×844: canonical Tours header, long 17-day tour title/body/meta, homepage hero, and compact chat header/workspace reviewed. Chat phone workspace remains about 607px high.
- French desktop heading wraps cleanly; Chinese phone heading, subtitle and categories fit. No horizontal overflow in these reviewed states. English restored.
- Carousel state change showed the new GSAP inline transition and released settled styles. Rapid Central Asia → World → Uzbekistan selection remains usable; result-grid translation/fade confirmed. Service rail entered once; lower rail waits until in view. Existing hovers retain their separate transform.
- Decoration is aria-hidden, nonfocusable and pointer-transparent. Supporting ink contrast is 6.43:1 against ivory and 5.55:1 against the pale amber used near copy; large dark heading text exceeds 3:1 over stronger artwork. Reading header artwork is softened; compact chat reserves its typing area.
- Browser logs showed no application errors during the refinement. A few role-based automation actions timed out; direct existing-control locators succeeded, with normal application state.

## Load measurements (gzip)

| JavaScript | Prior rework | This refinement |
| --- | ---: | ---: |
| Initial | 193,388 bytes | 194,095 bytes |
| Deferred shared motion | 30,083 bytes | 30,392 bytes |
| Combined startup | 223,471 bytes | 224,487 bytes |

Initial JavaScript grew by 707 gzip bytes and remains below the approved 222,697-byte ceiling. No images/fonts/packages were added. CSS rose by roughly 0.6KB gzip. No speedup or physical-phone FPS claim is made from byte counts or viewport review. The only new painting effect is a finite draw of two thin decorative SVG paths; other new effects use transform/opacity. Numerical frame traces and live OS reduced-motion switching were unavailable; media-query/source cleanup and the existing reduced-motion playback tests were checked. Existing large-entry build warning remains.

## Previews

- amber-header-tours-desktop.jpg
- amber-header-tours-mobile.jpg

No real inquiries/contact messages/AI requests were sent. This turn did not initiate deployment, commit or push; existing and concurrently committed work was preserved.
