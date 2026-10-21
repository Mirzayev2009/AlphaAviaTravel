# Approved motion rework — validation

Completed 21 October 2026. The user approved MOTION_REWORK_PROPOSAL.md. MOTION_PLAN.md, DESIGN.md, the site surface notes, and the design sidecar now describe this implementation.

## Verified behavior

| Surface | Review performed |
| --- | --- |
| Home | First cards plus assistant/story/services/final CTA all reached their once-only entered state. Header/hero headings have no inline animation styles. Map and address stay stable. Carousel pause verified; default photo crossfade retained. Real review endpoint returned no review data, so the fallback was reviewed. Real-review changes use a CSS grid reserving the tallest real quote and a short active-entry fade. |
| Tours | Uzbekistan (17 records), Central Asia (7), World (0); repeated selection, pill alignment, immediate counts, clear empty recovery. Scrolling reached lower rows (indices 9–14); settled cards released temporary styles. |
| Tour detail | Empty inquiry invokes native validation and focuses name without sending. Itinerary reverses under rapid clicks and clears temporary height. Thumbnail viewer opens; rapid next/previous, Escape, and return focus work. |
| Destinations | Desktop and 390px drawer opening/closing, Escape, 44px close target, viewport fit, unlocked page and focus on the originating destination. |
| Services | Two native rails expose appropriate disabled end controls. Transport and hotel drawers reviewed; nested hotel viewer closes to the relevant thumbnail and then returns to the service card. Fast new selection cancels dismissal. |
| Gallery | Asymmetric desktop/mobile grid retained. Thumbnail enlargement, rapid seven-photo navigation, closing to a visible photo, and offscreen fallback focus on the original thumbnail checked. No residual photo transforms. |
| About | Phone story/team content and repeated biography expansion, including keyboard Enter. |
| Contact | Phone empty validation shows all four messages and focuses name; no horizontal overflow. No message submitted. |
| Visa | Forward/Back motion and heading focus; all three travel answers and both visit answers retained. Results body groups enter on view; title remains stable. Only local form navigation used. |
| Chat | Phone opening focuses the dialog; prompts fill a draft. Close returns focus to launcher. Reopen and full-page expansion preserve draft. Test draft cleared afterward; no AI request. Existing session regression checks cover stop/retry and response races. |
| Languages | All 169 literal interface keys checked across seven languages; 166 tour URL/catalog records checked. Chinese phone hero and wrapping category labels fit without horizontal overflow; moving pill aligns after the language change. English restored afterward. |

## Production and source checks

- Production build passed; scoped lint passed for all changed components/pages and the motion helper/check script. Diff whitespace check passed.
- verify-motion.mjs passed: carousel offscreen/hidden/hover/manual/reduced-motion/touch behavior, listener cleanup, deferred bundle graph/budget, photo geometry endpoints, and preserved image aspect ratio throughout expansion.
- verify-chat.mjs passed: drafts, duplicate submit protection, retry history, cancellation, reset races, timeouts, safe formatting, seven-language text.
- verify-redesign.mjs passed: 166 catalog records and 169 interface keys across seven languages.
- Browser review at 1365×900 and 390×844. No new browser errors after the photo-context cleanup fix. Temporary viewport override reset; homepage left open.
- The review found a GSAP parent/child context cycle on fast photo changes and missing explicit drawer focus return. Both were corrected and the affected flows confirmed. Removed filter targets are now unobserved; offscreen photo returns use the original visible launcher for focus.

## Download measurements

Gzip measurements count the production manifest JavaScript graph, not network latency or page-render time.

| Measurement | Before this rework | After |
| --- | ---: | ---: |
| Initial JavaScript | 222,697 bytes | 193,388 bytes |
| Separately loaded shared motion and GSAP | included above | 30,083 bytes |
| Initial plus shared motion startup | 222,697 bytes | 223,471 bytes |

Initial JavaScript is 13.2% smaller and meets the approved 222,697-byte initial budget. The combined startup is 774 bytes (0.35%) larger; deferral moves the animation runtime off the initial render path, rather than removing its download. Chat, map, drawers, and photo-viewer routes remain separate. No packages, fonts, or image assets were added. The existing large-entry build warning remains.

## Performance/accessibility limits

Motion work was checked separately from byte counts: bounded once-only observations, cleared settled styles, no idle loops/scroll hijacking, no per-frame React state, compositor transforms/opacity, and dimension reads only at photo endpoints. Disclosures alone animate a localized measured height. Source cleanup and reduced-motion paths were reviewed; carousel reduced-motion behavior has an automated check. Browser tooling offered no reduced-motion emulation or frame profiler, so live OS preference switching and numerical FPS/CPU traces were not measured. Viewport testing does not establish performance on a physical phone.

Pending/success/network-error form branches retain the existing integration and local feedback but were not exercised with production submissions. Real review transitions could not be visually assessed without live review data. No factual content, visa guidance, backend behavior, live credentials, deployment, commit, or push changed in this pass.

## Previews

- motion-rework-tours-desktop.jpg
- motion-rework-gallery-mobile.jpg
