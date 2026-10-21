# Alpha Avia Travel

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The redesign serves international visitors planning Uzbekistan and Central Asia trips and Uzbekistan residents planning local or overseas travel equally. Confirmed by the user on 2026-10-20.

## Product Purpose

Help visitors choose a tour and send a booking inquiry. This is the primary outcome confirmed by the user.

## Operating Context

The existing implementation uses React, Vite, React Router, Tailwind CSS, Radix UI components, Framer Motion, and i18next. Tour and destination content is served from JSON under public/data. Registration and review endpoints are present under api; an older Express backend also exists under server.

Existing routes cover Home, Tours, Tour Details, Destinations, Services, Gallery, About, Contact, an AI travel assistant, and visa questions/results. Existing UI languages are English, Russian, Spanish, French, Italian, Chinese, and Uzbek.

## Capabilities and Constraints

- Keep every existing page and the current section order; redesign their appearance. Confirmed by the user.
- Preserve product content and features while planning visual improvements.
- Tour browsing currently offers Uzbekistan, Central Asia, and Worldwide categories. The current English dataset has 17 Uzbekistan tours, 7 Central Asia tours, and no Worldwide tours. These are repository observations, not claims about the agency's complete inventory.
- The existing website includes tour inquiries, destination drawers, hotel and transport details, gallery viewing, contact forms, and AI assistance. Integration reliability is subject to verification.
- The user approved REDESIGN_PLAN.md on 2026-10-20 and requested impeccable, taste, UI/UX Pro Max, and GSAP for implementation.

## Brand Commitments

Keep the main orange and amber colors. The existing product name is Alpha Avia Travel. The user selected Apple's website as the visual reference: translate its clarity and restraint to this travel brand.

The user permits clarification of button labels and short interface text while retaining factual content and all seven languages.

## Evidence on Hand

- Existing tour and destination data under public/data.
- Local destination photography, team images, and transport imagery under public/data/images.
- Existing logo image at public/alpha logo.jpg.
- Existing company story and translated content under src/i18n.
- Review data is loaded from an endpoint, with hardcoded fallback testimonials in the current implementation. Their authenticity is unconfirmed; they must not become new proof claims without verification.

## Open Decisions

- Exact use of the existing logo and imagery; preserve the existing assets by default.
- Verified company claims and customer testimonials.
