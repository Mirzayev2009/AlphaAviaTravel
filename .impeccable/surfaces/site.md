# Travel website redesign

Approved by the user on 2026-10-20. Build path: code.

## Direction

The user's Apple reference governs the visual direction. Preserve orange/amber, all routes, existing factual content, and the current section order. The concept seed from planning was seed:f25aa7cee181ab10; its catalog was unavailable. The user's pinned reference takes precedence.

Modes: Persuade for Home and promotional introductions; Operate for tour browsing and inquiries, service browsing and chat; Read for destination guides and itineraries.

Color strategy: restrained. Travelers research in daylight on phones and laptops, often comparing detailed itineraries, so light neutral surfaces and dark readable text are the base. Orange identifies the main action and amber is a supporting brand accent. Do not add decorative color families.

## First viewport

A quiet navigation bar, a large clear destination headline, short supporting copy, tour and destination actions, and a panoramic destination photograph. Keep the existing carousel's content. Its controls remain visible and keyboard accessible. At narrow widths use a deliberate compact text composition and a taller photographic crop; actions remain visible.

## Motion and interaction

GSAP owns authored motion. Sequence hero copy and panorama with a short expo-out timeline; add a small scroll-linked change of photograph scale, scoped to the hero and disabled for reduced motion. Keep content visible without animation. State changes use short transitions, and the carousel is pausable. Do not animate each section with the same entrance. No scroll hijacking or continuous decorative loops.

## System

System sans typography is explicitly retained from the approved plan and Apple reference, with proper multi-script fallbacks. Display 40–76px, section headings 32–52px, body 16–19px. Tracking never tighter than -0.04em. Content width 1200px; wider panorama 1520px. Cards and media use 16px corners; small controls use pills; inputs use 10px corners.

Taste dials: DESIGN_VARIANCE 6, MOTION_INTENSITY 4, VISUAL_DENSITY 3. This is a visual overhaul preserving IA and brand colors. Reuse the existing Radix/shadcn primitives and Lucide icon family. UI/UX Pro Max's accessibility and responsive guidance apply; its generated blue palette and aurora styling conflict with the user's brief and are rejected.

## Scope and checks

Implement REDESIGN_PLAN.md across all pages. Preserve the homepage sequence and the inquiry-before-itinerary order on tour details. Verify desktop, 390px mobile, tablet, preview width, seven languages, dialogs/drawers, fresh tour URLs, forms with controlled responses, and reduced motion. No production test submissions. No backend replacement or deployment.
