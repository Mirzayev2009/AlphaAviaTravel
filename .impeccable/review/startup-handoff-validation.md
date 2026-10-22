# Startup handoff correction — 2026-10-22

This supersedes the prior loader contract. The logo is a document-arrival/refresh introduction, not a route-loading indicator. Its two-second finite sequence starts when the logo loads/errors (800ms readiness ceiling), then fades for 250ms after language, the first route, and the deferred controller are ready. Guarded deadlines preserve the static/reduced-motion path; the controller request has a five-second static fallback. Internal routes use neutral loading cards with no logo or intro delay.

AppStartup lives outside the router and prepares measurable content in parallel, keeping it inert and hidden from assistive technology until the overlay exits. SiteMotion is loaded beforehand but disabled during the intro. Its first enabled scan runs fresh, so the opening home animation is visible on the first visit. Completed nodes and active work have separate ownership: interrupted StrictMode setup is not mistaken for a finished entrance. React-only loader callbacks use live guards rather than switching an inner matchMedia tween back into its parent GSAP context; this avoids circular cleanup.

## Live browser checks

| Case | Observed result |
| --- | --- |
| Fresh Home, desktop | Logo count1; content inert. Handoff observed2467ms after the initial DOM sample: logo count0, inert removed, hero entering with run count1 and intermediate opacity/translate. Hero completed once and cleared styles. |
| Internal Home → Tours → Home → Gallery | Logo/overlay counts remained0. Home entrance ran once on return. |
| Fresh Home,390×844 | Logo count1, content inert; handoff showed hero entering once; loader count0 afterward. |
| Mobile internal Tours navigation | Logo count0. |
| Refresh while on Tours | Logo count1, then inner-page entrance entering once. |
| Mobile Tours → Home | Logo count0; home entrance run count1. |
| Lower Home sections | All five service entries and invitation completed once with cleared copy styles; phone preparation remained8px. |

No new runtime errors were captured after the corrected handoff tests. Screenshots from the actual startup flow are `startup-logo-mobile.png` and `startup-home-mobile.png`.

Scoped lint, production build, motion checks (including deferred loader/page code), seven-language/catalog checks, JSON and whitespace validation passed. Initial JavaScript is195,008 gzip bytes, within the existing222,697-byte ceiling. GSAP and controller modules remain deferred; no dependency was added. Header1.2× playback and950ms card timing are unchanged.

Reduced-motion and failure deadlines were reviewed in source; OS preference switching and network-failure injection were not performed. No production forms or messages were submitted. No commit, push or deployment was initiated.
