# Site motion system

The full-site rework was approved on 21 October 2026. Subsequent review retained the orange/amber header treatment and requested calmer, single arrivals throughout the site. On 22 October, the user asked for headers to be a little faster while keeping the approved body pace. This document records the current implementation. Preserve page structure, section order, factual copy, routes, brand colors, and all seven languages.

## Visual and motion thesis

The homepage photograph stays full screen. Its headline, subtitle, and actions enter as a coordinated composition, with a drawn amber accent. Later carousel changes acknowledge the new destination through one short copy transition. Inner-page headers use an authored warm ivory canvas with layered amber architectural curves and fine contour lines. The composition frames clear, readable copy. No photos, blurry blobs, grids, new typefaces, or new libraries are used for this background.

Motion is visibly present through page bodies and browsing actions. Treat media and copy as one unit. There is no word-by-word headline animation, continuous photo zoom, decorative loop, scroll hijacking, or loading gate.

| Surface | Current behavior |
| --- | --- |
| Navigation | Stationary shared navigation with retained active, hover, focus, and press feedback. Mobile menu has one anchored 6px / 400ms GSAP arrival. |
| Home hero | Whole copy and actions rise together 16px; the entrance timeline now plays at 1.2×, giving effective copy / amber-rule durations of about 708ms / 767ms and a 67ms rule offset. Authored values remain 850ms / 920ms / 80ms. No nested second rise. Later carousel updates settle toward the current endpoint over 600ms without resetting copy. Photograph crossfade remains 400ms with pause/offscreen/hidden/reduced-motion controls. |
| Inner-page headers | Shared inline vector artwork on warm ivory. The entrance timeline now plays at 1.2×: effective copy / art / contour durations are about 667ms / 833ms / 933ms, with 50ms stagger and 67ms contour offset. Authored values remain 800ms / 1000ms / 1120ms, 60ms stagger, and 80ms offset; copy travels 12px and art 24–28px. PageIntro, tour-detail heading, and compact assistant heading share this `sine.out` treatment. |
| Cards and gallery | Whole cards arrive once, 12px desktop / 8px phone, 950ms `sine.out`, with 70ms per-card staggering capped at 140ms total. Prepare offscreen or before new content paints; never rewind content already visible when the lazy controller attaches. |
| Story and feature compositions | Desktop story groups use 12px horizontal travel; other groups use 12px desktop / 8px phone vertical travel, 900ms `sine.out`. Media and text stay together. |
| Tour categories | 340ms `sine.out` selection pill. Results update immediately and use only their own one-time card arrival; the grid has no second translating/fading layer. Later rows still arrive on scroll. |
| Services | Whole rails enter once, 12px desktop / 8px phone over 900ms. Native horizontal scrolling and position-aware controls remain. No second moving layer on individual rail cards. |
| Drawers and photo viewer | Retained edge entrance (480ms), reverse exit (300ms), real thumbnail enlargement (480ms), return (300ms), image fade (260ms), Escape, focus return, and scroll locking. Photo geometry uses `sine.inOut`; drawers use `sine.out`. |
| Itineraries and biographies | Native disclosures with localized measured expansion (360ms) and faster collapse (280ms), cancellation and reversal. |
| Forms, visa, chat | Local form feedback remains quick (160ms); directional visa steps use 6px / 420ms. Anchored chat opens over 400ms; new messages settle 5px / 320ms, independently of status feedback. Preserve answers, drafts, reading position, and immediate typing. |
| Reviews, map, legal content | Real review crossfades reserve the tallest real quote in a shared grid cell. Map/address and legal reading stay stable. |

## Runtime contract

Reuse installed GSAP with scoped React cleanup, media contexts, and cancellation. Shared SiteMotion stays outside the initial module graph. One observer handles prepared content as it enters the viewport, unobserves completed/removed targets, and disconnects on navigation. A persistent weak set prevents replaying the same node after an observer or media-context restart. Body effects use individual CSS translate so they do not overwrite CSS hover transforms.

GSAP owns authored page entrances and action-dependent transitions, using gentle `sine.out` easing. Content is visible by default; the deferred controller leaves already-painted visible content in place and prepares offscreen or freshly inserted content before its arrival. No CSS startup animation competes with GSAP, and no hidden loading class is added. Existing hover feedback and Radix exit-presence CSS remain independent. The thin SVG line draw is finite and limited to two paths; other new motion uses transform/opacity. No animated blur, permanent GPU hints, per-frame React state, or new dependency. Existing localized disclosure height measurement remains isolated.

Reduced motion leaves all content and geometry visible, skips spatial GSAP/CSS effects, disables carousel autoplay, and retains selected, focus, validation, loading, success, and error states. A transition never delays navigation, network requests, responses, or actual value changes. Preserve Radix modal semantics, Escape, focus trapping/return, native disclosure semantics, and chat behavior.

## Verification

The approved initial JavaScript ceiling remains 222,697 gzip bytes. Report initial, deferred shared motion, and combined startup separately. See .impeccable/review/motion-performance.json and amber-header-validation.md. Source/build checks cover the lazy graph, budget, playback lifecycle, photo geometry, chat session behavior, catalog routes, and seven-language keys. Browser review includes desktop 1365×900, phone 390×844, long tour copy, French/Chinese wrapping, first-load and carousel motion, repeated filtering, and service rails. Viewport checks do not establish physical-device FPS; numerical frame traces and live OS preference switching were not available in this browser tool. No production forms or AI requests, publishing, commit, or push are part of this refinement.
