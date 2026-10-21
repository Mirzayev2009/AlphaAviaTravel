# Proposed motion rework

Status: **Approved by the user on 21 October 2026. Implementation authorized.**

This approved proposal supersedes the earlier motion direction. Preserve the current page layouts, full-screen homepage hero, section order, orange/amber colors, factual content, routes, integrations, and seven languages.

## Problem to solve

The current implementation repeats an animated page introduction throughout the site, splits the hero headline into independently moving words, and concentrates additional entrances in a few homepage elements. The remaining cards, drawers, image viewers, expanding sections, and form steps do not follow a coherent motion system. Separate photo, caption, and control sequences make otherwise related content feel disconnected.

The goal is natural continuity across the complete browsing and inquiry journey. Visitors should feel where content came from, what changed after an action, and where to look next. Headings should remain readable and stable.

## Direction

- Remove the moving headline words, repeated page-title entrances, independent floating copy, and decorative hero photo zoom. Keep the hero photograph's controlled crossfade, readable copy, stationary booking actions, and pause controls.
- Establish one family of easing and timing. Use gentle deceleration without overshoot, bounce, or elastic movement. Controls respond in roughly 140–220ms; drawers and photo transitions use 240–360ms; selected first-view content groups use 360–480ms. Exits are faster than entrances.
- Keep ordinary travel small: about 6–12px on desktop and 4–8px on phones. Reserve larger movement for a genuine spatial action, such as a drawer entering from an edge or a thumbnail expanding into the photo viewer.
- Treat a card's media, title, and action as one related unit. Use short, capped staggering only when a row or list actually arrives together. Do not stagger every title, sentence, and button separately.
- Use motion throughout page bodies and interaction flows. Give static reading and typing areas rest. Do not apply one identical fade-and-rise to every section.

## Coverage by surface

| Surface | Planned treatment |
| --- | --- |
| Shared navigation and footer | Stable header text; consistent active/hover/press feedback; a short anchored mobile-menu transition. Footer links use the same feedback while legal and contact text stay still. |
| Home | Stable hero copy with coordinated photograph changes. Featured tours, destination cards, services, and the team/story media receive restrained group arrivals as they enter view. The assistant invitation enters as one composition. Review changes crossfade when real reviews are available. Map and address remain stable; the final contact action has clear interaction feedback. |
| Tours | Animate the category selection and the result change as a connected action. Keep the grid stable; replace sideways-moving descriptions with a short grouped transition. Reveal additional visible card rows once as the visitor reaches them. Preserve focus and result-count announcements. Empty and error states remain clear. |
| Tour details | Connect gallery thumbnails to their enlarged viewer; keep next/previous photo changes controlled. Smoothly explain itinerary expansion/collapse. Give inquiry validation, pending, error, and success states precise local feedback. Price updates show the actual new value immediately. Preserve inquiry-before-itinerary order. |
| Destinations | Apply the card-row motion to the whole destination catalog, including content below the first screen. Open details from the drawer's actual edge, with media and description arriving together. Closing reverses direction and restores focus. |
| Services | Retain native horizontal rail movement and avoid a second animation on cards already moving with the rail. Make browsing controls reflect the rail position. Use the same detail-drawer and photo-viewer motion as destinations and tour details. |
| Gallery | Animate visible photo groups in the page body once, respecting the asymmetric grid. Expand a selected thumbnail into the viewer using its real start/end geometry. Closing returns it to its origin when that thumbnail is still present; otherwise use a short fade. Fast image changes must cancel outdated transitions. |
| About | Give the story/photo composition and team rows a measured arrival. Animate biography expansion/collapse where it helps explain the additional content. Keep long biography text and page headings still. |
| Contact | Keep the form and contact details stationary while typing. Animate only changes such as validation feedback, pending state, error recovery, and confirmation. Preserve field values and correct focus. |
| Visa questions/results | Make Forward and Back steps move in the expected direction, with progress updating together. Preserve answers, validation, and keyboard focus. Results arrive as a readable group; the page title stays still. No visa content or rules change. |
| Floating and full-page chat | Use a short entrance anchored to the launcher, without the current scale-pop or long prompt cascade. New messages arrive as a single readable unit. Preserve drafts, expansion continuity, stop/retry, keyboard handling, and reading older messages without forced scrolling. |
| Loading, empty, error, and not-found states | Keep recovery actions immediately available. Use brief state feedback without decorative loops, fake progress, or delayed access to content. |

## Implementation sequence after approval

1. **Reset and unify:** remove the conflicting header/word effects; define shared motion roles, timing, easing, entrance/exit behavior, and cancellation rules. Update the approved motion documentation to this direction.
2. **Build reusable behavior:** establish card-row arrivals, selection/result changes, drawers, photo viewing, expanding content, and local form/message feedback. Keep separate animations from fighting over the same element's transform.
3. **Apply through complete flows:** Home → Tours → tour details → inquiry; Destinations/Services → details → photos; Gallery → viewer; About → biographies; Contact/Visa/Chat → state changes. This is a full-site pass, not another header-only pass.
4. **Verify in one desktop/mobile review:** inspect first, middle, and last content areas; test repeated filters, fast photo navigation, open/close interruption, Back/Forward, keyboard access, reduced motion, and long translations. Fix the material findings together, then confirm affected behavior.
5. **Hand back for visual review:** provide a coverage checklist, before/after load measurements, and representative previews. Do not publish or push changes unless separately requested.

## Performance and accessibility requirements

- Reuse installed GSAP. Keep optional viewer/drawer effects in their existing lazy loading paths, adding no packages, fonts, or image assets.
- Target no increase in the current initial download (about 222.7KB gzip). Measure the result before handoff and rework unnecessary initial code if it exceeds the budget.
- Prefer transform and opacity. No continuous full-page zoom, scroll hijacking, pointer-following effects, animated blur, permanent GPU hints, or React updates on every animation frame.
- Use a shared viewport-observation approach and bounded visible batches. Unobserve completed entrances and do no recurring work for offscreen or completed effects.
- Small user-triggered expanding panels may use measured expansion where necessary for continuity; read dimensions once, cancel/reverse cleanly, and keep this work isolated. Do not animate the dimensions of entire pages or grids.
- Content is readable and usable without animation. Reduced motion removes spatial travel and retains immediate focus, selected, loading, success, and error states.
- Preserve Radix focus trapping, Escape, scroll locking, and focus return. Preserve native disclosure and form semantics. A transition never delays navigation, network requests, or the display of an actual response.
- Verify frame behavior separately from download size. Desktop and phone-size browser checks are required; physical-device performance must not be claimed from viewport emulation.

## Approval record

The user approved this complete direction on 21 October 2026. The existing Apple-inspired restraint, brand colors, and structure remain the visual authority. Implementation and verification are recorded in MOTION_PLAN.md and .impeccable/review/motion-rework-validation.md.
