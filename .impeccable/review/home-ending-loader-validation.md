# Home ending and loader — 2026-10-22

The loader timing and route behavior in this historical review are superseded by `startup-handoff-validation.md`: the current branded intro runs only on document arrival/refresh for approximately two seconds, then hands off to first-page motion. Internal route waits use neutral loading cards.

Added scoped GSAP entrances to the final homepage sections without changing their order or factual content. Traveler-story headings and bodies have separate owners; the body fades without spatial movement. Location copy settles while the map stays outside all animated ancestors. Service rules draw before each whole content group settles, with sibling delays capped at 180ms. The final invitation traces an amber route and resolves its destination while its copy moves as one unit. Existing header playback and 950ms card timings are unchanged.

JourneyLoader replaces the blank language-initialization wait and route skeleton fallback only while those operations are pending. It centers the existing 44,264-byte company logo, with restrained amber framing. The logo remains stationary; GSAP draws the route over two seconds with slower beacon feedback. No timer holds ready content, and no invented percentage is shown. Animation imports remain lazy; the static status and logo remain useful if the enhancement fails. The loop pauses offscreen/hidden, reverts under reduced motion, and releases its observer, listener, and timeline on unmount.

The review also fixed two lifecycle cases: loading/resolved review roots have distinct keys so asynchronous reviews register their arrival, and preparation itself is context-safe so asynchronous GSAP sets revert when motion preferences change.

## Evidence

- Desktop 1365×900 and phone 390×844 inspections covered services, the invitation, and the isolated loader preview. Service roots and invitation completed once with cleared child styles; the grid and map frame had no inline transforms.
- Phone service rows retained independent viewport entry with 8px preparation, avoiding an offscreen parent sequence. The final invitation and consultation link fit the viewport with visible keyboard focus.
- The original logo loaded at natural width 640, displayed at 152px desktop and about 137px phone, centered in the frame. The ready homepage contained zero loader elements.
- Screenshots: `home-ending-desktop.png`, `home-ending-mobile.png`, `journey-loader-desktop.png`, `journey-loader-mobile.png`. `journey-loader-preview.html` is an isolated local review fixture, outside the production entry graph.
- Scoped lint, production build, catalog/interface validation (166 records; 169 keys across seven languages), motion checks, JSON validation, and whitespace checks passed. The motion check now explicitly protects the deferred loader-animation entry.
- Initial JavaScript is 194,476 gzip bytes, 345 bytes above the preceding header-speed build and below the existing 222,697-byte ceiling. The optional loader-motion chunk is about 0.67kB gzip and reuses the deferred GSAP runtime. The existing build chunk-size advisory remains.

Reduced-motion and hidden/offscreen cleanup were reviewed in source; existing playback checks also cover preference and lifecycle behavior. No OS-preference switching or physical-device FPS profiling was performed. No production messages/forms were submitted. No commit, push, or deployment was initiated.
