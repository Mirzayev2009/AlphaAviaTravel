# Travel website redesign

Approved by the user on 2026-10-20. Build path: code.

## Direction

The user's Apple reference governs the visual direction. Preserve orange/amber, all routes, existing factual content, and the current section order. The concept seed from planning was seed:f25aa7cee181ab10; its catalog was unavailable. The user's pinned reference takes precedence.

Modes: Persuade for Home and promotional introductions; Operate for tour browsing and inquiries, service browsing and chat; Read for destination guides and itineraries.

Color strategy: restrained. Travelers research in daylight on phones and laptops, often comparing detailed itineraries, so light neutral surfaces and dark readable text are the base. Orange identifies the main action and amber is a supporting brand accent. Do not add decorative color families.

## First viewport

Updated by the user's section-by-section direction on 2026-10-21: the homepage opens with a full-viewport photograph as the background, edge to edge, with the headline, supporting copy, and actions centered over it. The navigation overlays the photograph at the top and becomes solid when scrolled or its mobile menu opens. A dark photographic overlay protects text contrast. Preserve carousel content and visible, keyboard-accessible controls, with space reserved for the chat launcher. The image remains full-bleed on phones; translated copy can increase the minimum viewport height on short screens rather than clip.

## Motion and interaction

The user approved the full-site motion rework on 21 October 2026. Headings and hero copy remain stable. Motion explains selection, depth, arriving content, disclosure, and local feedback throughout complete flows. Whole cards and compositions enter once with short, capped movement; category pills/result groups, reversible drawers, thumbnail-connected viewers, native disclosures, visa steps, and chat share gentle power2.out timing. Preserve CSS for simple hover/exit feedback. Respect reduced motion, cleanup, focus, and interruption. No headline splitting, independent photo/caption flights, continuous zoom, or prompt cascades. SiteMotion is loaded separately; initial and deferred startup bytes are recorded independently. MOTION_PLAN.md is the implementation authority and .impeccable/review/motion-rework-validation.md records checks and limitations.

## System

System sans typography is explicitly retained from the approved plan and Apple reference, with proper multi-script fallbacks. Display 40–76px, section headings 32–52px, body 16–19px. Tracking never tighter than -0.04em. Content width 1200px; wider panorama 1520px. Cards and media use 16px corners; small controls use pills; inputs use 10px corners.

Taste dials: DESIGN_VARIANCE 6, MOTION_INTENSITY 4, VISUAL_DENSITY 3. This is a visual overhaul preserving IA and brand colors. Reuse the existing Radix/shadcn primitives and Lucide icon family. UI/UX Pro Max's accessibility and responsive guidance apply; its generated blue palette and aurora styling conflict with the user's brief and are rejected.

## Scope and checks

Implement REDESIGN_PLAN.md across all pages. Preserve the homepage sequence and the inquiry-before-itinerary order on tour details. Verify desktop, 390px mobile, tablet, preview width, seven languages, dialogs/drawers, fresh tour URLs, forms with controlled responses, and reduced motion. No production test submissions. No backend replacement or deployment.

## Chat layout correction

User requested a complete chatbot layout fix on 2026-10-21. Use a shared toolbar, scrolling conversation, and pinned multiline composer in both floating and full-page views. Preserve the existing AI integration and keep chat code lazy. Empty state prompts fill the composer without sending. Retain conversations and drafts in memory across closing/expanding; provide stop, new conversation, and error retry controls. Use readable message formatting, 44px actions, full-screen mobile dialog behavior, and keyboard-aware viewport sizing. This Operate surface uses the existing neutral/orange design system rather than marketing page spacing.
