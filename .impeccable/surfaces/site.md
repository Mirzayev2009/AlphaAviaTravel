# Travel website redesign

Approved by the user on 2026-10-20. Build path: code.

## Direction

The user's Apple reference governs the visual direction. Preserve orange/amber, all routes, existing factual content, and the current section order. The concept seed from planning was seed:f25aa7cee181ab10; its catalog was unavailable. The user's pinned reference takes precedence.

Modes: Persuade for Home and promotional introductions; Operate for tour browsing and inquiries, service browsing and chat; Read for destination guides and itineraries.

Color strategy: restrained. Travelers research in daylight on phones and laptops, often comparing detailed itineraries, so light neutral surfaces and dark readable text are the base. Orange identifies the main action and amber is a supporting brand accent. Do not add decorative color families.

## First viewport

Updated by the user's section-by-section direction on 2026-10-21: the homepage opens with a full-viewport photograph as the background, edge to edge, with the headline, supporting copy, and actions centered over it. The navigation overlays the photograph at the top and becomes solid when scrolled or its mobile menu opens. A dark photographic overlay protects text contrast. Preserve carousel content and visible, keyboard-accessible controls, with space reserved for the chat launcher. The image remains full-bleed on phones; translated copy can increase the minimum viewport height on short screens rather than clip.

## Motion and interaction

The user retained the authored orange/amber backgrounds and approved calmer single arrivals, then requested faster headers on 2026-10-22. Header entrance timelines now play at 1.2×: effective inner-page copy / artwork / contour durations are about 667ms / 833ms / 933ms; homepage copy/actions use 708ms and the amber accent 767ms. Authored values remain unchanged; offsets and staggers scale proportionately. Cards retain 950ms with 12px desktop / 8px phone travel and 140ms maximum total staggering; compositions and service rails use 900ms. GSAP owns authored entrances with gentle `sine.out` easing. First activation and route effects scan fresh content; reduced-motion media re-entry settles visible content. Completed-node weak tracking and an effect-local active set prevent replay without treating interrupted Strict Mode scenes as finished. No competing CSS startup animation or second moving category grid. Preserve independent hover feedback, Radix lifecycle CSS, current structure, copy, keyboard/modal semantics, reduced motion, and performance constraints. MOTION_PLAN.md records the current timings; review artifacts retain their historical validation scope.

Home closing sections now have one-time GSAP choreography: 900ms headings and quote fades, 900ms location-copy arrival with a static map, individual service rules/copy (700ms / 850ms, 55ms sibling delays capped at 180ms), and a final route/copy/destination sequence (1050ms / 850ms / 300ms). Service grids stay still; review loading/body nodes use distinct keys. Context-bound preparation reverts asynchronous sets under reduced motion. Header playback remains 1.2× and cards remain 950ms.

JourneyLoader now appears only on fresh document arrivals/refreshes through AppStartup outside the router, superseding the earlier route-logo and no-minimum-wait behavior. Keep the original centered logo and amber framing. The user-required approximately 2s finite intro begins on logo load/error with an 800ms start deadline, then fades over 250ms once language, initial PageContent commit, and deferred SiteMotion are ready; the exit fallback is 350ms. Static/reduced/import-failure paths cannot leave access blocked. Content prepares in parallel, measurable but inert and aria-hidden; SiteMotion activates after the intro exits, preserving the first Home entrance. Internal route waits use neutral LoadingCards, with no logo or minimum wait. React-only completion callbacks use lifecycle guards without outer GSAP-context switching; unmount cleans up motion/listeners. No invented progress percentage.

## System

System sans typography is explicitly retained from the approved plan and Apple reference, with proper multi-script fallbacks. Display 40–76px, section headings 32–52px, body 16–19px. Tracking never tighter than -0.04em. Content width 1200px; wider panorama 1520px. Cards and media use 16px corners; small controls use pills; inputs use 10px corners.

Taste dials: DESIGN_VARIANCE 6, MOTION_INTENSITY 4, VISUAL_DENSITY 3. This is a visual overhaul preserving IA and brand colors. Reuse the existing Radix/shadcn primitives and Lucide icon family. UI/UX Pro Max's accessibility and responsive guidance apply; its generated blue palette and aurora styling conflict with the user's brief and are rejected.

## Scope and checks

Implement REDESIGN_PLAN.md across all pages. Preserve the homepage sequence and the inquiry-before-itinerary order on tour details. Verify desktop, 390px mobile, tablet, preview width, seven languages, dialogs/drawers, fresh tour URLs, forms with controlled responses, and reduced motion. No production test submissions. No backend replacement or deployment.

## Chat layout correction

User requested a complete chatbot layout fix on 2026-10-21. Use a shared toolbar, scrolling conversation, and pinned multiline composer in both floating and full-page views. Preserve the existing AI integration and keep chat code lazy. Empty state prompts fill the composer without sending. Retain conversations and drafts in memory across closing/expanding; provide stop, new conversation, and error retry controls. Use readable message formatting, 44px actions, full-screen mobile dialog behavior, and keyboard-aware viewport sizing. This Operate surface uses the existing neutral/orange design system rather than marketing page spacing.
