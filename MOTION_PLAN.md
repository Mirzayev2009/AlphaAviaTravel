# Approved site motion system

Approved by the user on 21 October 2026. Supersedes the previous header-centered motion direction. The detailed scope is recorded in MOTION_REWORK_PROPOSAL.md.

Motion explains selection, depth, new content, and local feedback throughout the browsing and inquiry journey. Headings and hero copy stay still. Treat a photograph and its text as one related composition. Preserve layouts, section order, brand colors, factual content, routes, and all seven languages.

| Surface | Implemented behavior |
| --- | --- |
| Navigation/footer | Stable text, existing active/focus/press states, 180ms anchored mobile-menu arrival, shared link feedback. |
| Homepage | Controlled 400ms photo crossfade; no headline splitting or photo zoom. Whole tour/destination cards arrive once. Assistant, story, services, and final CTA enter as complete groups. Real review changes use a short crossfade and reserve the tallest real review in one CSS grid cell. Map/address stay still. |
| Tours | A 220ms selection pill connects category changes; results acknowledge the change together in 200ms. Lower rows arrive as they enter view. Counts and empty/error recovery remain immediate. |
| Tour details | Thumbnail-to-viewer continuity, 240ms itinerary expansion / 180ms collapse, local inquiry feedback. Prices update immediately. |
| Destinations | Whole card rows and a 300ms drawer from its actual edge. 180ms reverse exit, Escape, focus return, and native modal behavior. |
| Services | Native rails; arrows reflect available scrolling. Whole-rail arrival avoids moving the rail and each card twice. Shared drawer/viewer behaviors. |
| Gallery | Once-only photo groups preserve the asymmetric grid. A 320ms thumbnail enlargement and 200ms return preserve photograph proportions. Rapid next/previous changes cancel older work and use a 160ms image fade. Offscreen origins use a short closing fade. |
| About | Complete story and team-card arrivals, native biography disclosures with reversible measured expansion. |
| Contact | Stationary reading/typing. Validation and success feedback fade locally; pending changes affect the action only. |
| Visa | 240ms forward/back step travel, immediate progress, retained answers, focus on the new step heading. Result bodies enter as readable groups. |
| Chat | One anchored 240ms panel entrance (6px phone / 8px desktop), 140ms exit, no prompt cascade or scale pop. New messages move 5px over 200ms; send/stop status fades for 140ms. History/drafts/IME/scroll/stop/retry stay intact. |

## Runtime contract

- Reuse installed GSAP with scoped React cleanup and responsive/reduced-motion contexts. No new packages, fonts, photographs, or ScrollTrigger runtime.
- Shared SiteMotion loads separately from initial page code. One viewport observer per page observes bounded groups, unobserves completed/removed targets, and disconnects on navigation. At most six cards enter together with 80ms total staggering.
- Ordinary arrivals use opacity and individual CSS translate, leaving the existing CSS card-hover transform independent. Group travel is 6px; cards use 6px phone / 10px desktop. Gentle power2.out easing; no bounce, pointer followers, continuous zoom, or idle decorative loops.
- Selection dimensions are measured once and change through transforms. Photo frame transforms use inverse image scaling to preserve the photograph. No layout reads or React state updates inside a photo frame callback.
- The small user-operated disclosure is the only measured-height tween. It reads endpoint heights, cancels/reverses ongoing work, preserves native details semantics, and clears temporary styles.
- Default content stays visible. No animation gates requests, responses, or navigation. Reduced motion skips spatial effects and retains native disclosure, selected, focus, validation, and pending states; carousel autoplay is disabled. Focus movement for visa steps is independent of motion.
- Preserve Radix focus trapping, scroll locking, Escape, and focus return. Keep drawer content mounted through the exit; never retain stale selection after dismissal.

## Verification and budget

The approved initial JavaScript budget is 222,697 gzip bytes. Report initial code, separately loaded motion code, and their combined startup cost separately. Do not imply that deferred bytes disappear. The earlier pre-motion baseline (239,224 gzip bytes) remains in the historical report.

Use the production build, scoped lint, verify-motion.mjs (playback lifecycle, lazy graph/budget, photo aspect-ratio invariants), verify-chat.mjs, and verify-redesign.mjs. Browser review covers desktop 1365×900 and phone-size 390×844, first/middle/last content, rapid filters/photos/disclosures, drawer focus, local validation, visa answer retention, chat drafts, and Chinese wrapping. Record findings and limitations in .impeccable/review/motion-rework-validation.md. No production inquiry, contact submission, real AI request, publishing, or push is required. Viewport emulation is not a physical-phone FPS measurement.
