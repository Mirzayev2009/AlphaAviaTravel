# Stable startup handoff — 2026-10-22

This records the latest correction and supersedes earlier startup timing evidence. The logo intro remains exclusive to document arrivals/refreshes; internal routes use neutral loading cards without a branded delay. Header playback remains 1.2× and card arrival remains 950ms.

JourneyLoader now owns both retained clocks: `introStartedAt` starts after logo load/error, with an 800ms start ceiling, and completes the required 2s introduction; `exitStartedAt` starts at readiness and owns the 250ms exit. React timers complete static/reduced-motion and optional-import-failure paths. The GSAP module has no completion callbacks. Logo, label, and orbit are visible before it attaches; late decoration and exit seek elapsed time instead of hiding content or starting another sequence. All finite-intro children are bounded and the glow has a single animation owner.

AppStartup stays outside the router. Language, initial PageContent commit, and deferred SiteMotion prepare in parallel behind measurable inert, aria-hidden content. SiteMotion activates after the intro exits. Its completed-node WeakSet and effect-local active Set preserve one completed entrance while permitting interrupted Strict Mode setup to restart unfinished work. The GSAP React, core, and timeline skills guided scoped ownership and cleanup.

Asset preparation writes generated JSON only when content changes. A repeat preparation check examined 43 generated files and rewrote none, preventing unchanged build outputs from triggering development reloads.

## Browser evidence

The saved [DOM traces](startup-timing-traces.json) contain sampled states rather than frame-rate measurements. Times are relative to each trace's first sample, not navigation start; the 1500ms fixture trace starts after a screenshot.

| Case | Observed result |
| --- | --- |
| Actual development refresh | One overlay initially; logo opacity remained 1 with no inline logo styles. Overlay count changed to 0, then Home progressed from entering/run 1 to entered/run 1. No second intro or logo entrance. |
| Production fixture: optional motion delayed 1500ms | One intro and one Home entrance; late decoration caught up without resetting logo visibility or reopening the intro. |
| Production fixture: optional motion delayed 2100ms | Logo remained visible. Exit-opacity samples were .9452 → .5589 → .0001, followed by overlay 0 and Home entering/run 1 → entered/run 1. |
| Production fixture: optional motion delayed 3000ms | Intro completed and Home entered once before the optional chunk arrived. Its late arrival after unmount did not reopen the intro. |
| Actual internal Tours navigation | Heading settled; logo count 0 and overlay count 0. |
| Actual internal return to Home | Logo count 0 and overlay count 0; Home run count remained 1. |

No runtime errors were captured in the final tests. The local `startup-test-server.mjs` fixture used ports 4174–4176 to delay the optional production-build chunk; it made no production-service change. The stable-logo screenshot is [startup-stable-logo.png](startup-stable-logo.png).

## Checks and limits

Production build, scoped lint, motion checks, and redesign checks passed. Catalog/translation verification covered 166 records and 169 interface keys across seven languages. Initial JavaScript is 614,540 raw / 195,382 gzip bytes, below the existing 222,697-byte initial gzip ceiling; deferred graph checks remain intact. No dependency was added.

These are DOM and build observations, not an FPS or physical-device benchmark. Reduced-motion behavior was audited in source only; OS preference emulation was not performed. Delayed-chunk tests establish late-attachment behavior, not every network-failure condition. No production forms or messages were submitted, and no commit, push, or deployment was initiated.
