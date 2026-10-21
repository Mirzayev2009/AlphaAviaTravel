# Alpha Avia Travel redesign plan

Status: approved by the user on 2026-10-20; frontend implementation complete. Build, scoped lint, catalog URL checks, and translation checks pass. The final visual review awaits refreshed browser captures; see `.impeccable/review/validation.md`. Implementation uses impeccable, the user's locally installed taste and UI/UX Pro Max skills, and official GSAP guidance for animation.

## Confirmed brief

- Serve international visitors and Uzbekistan residents equally.
- Make choosing a tour and sending a booking inquiry the primary outcome.
- Keep every existing page, feature, and current section order.
- Retain the main orange and amber colors.
- Use [Apple's website](https://www.apple.com/) as the visual reference.
- Clarify button labels and short interface text while retaining factual content and all seven languages.
- Build directly after plan approval, then review the rendered result.

## What I learned

The app uses React 19, Vite, React Router, Tailwind CSS 4, Radix components, Framer Motion, Swiper, Leaflet, and i18next. The visible catalog comes mainly from public/data JSON files. The English inventory currently contains 17 Uzbekistan tours and 7 Central Asia tours; the Worldwide category is empty. There are six destination guides. English, Russian, Spanish, French, Italian, Chinese, and Uzbek are supported, with some incomplete content and language inconsistencies.

Routes cover Home, Tours, Tour Details, Destinations, Services, Gallery, About, Contact, AI Chat, Visa Questions, Visa Results, and a not-found page. Services and Tour Details manage their own header/footer, while most other pages use Layout. Shared cards, dialogs, drawers, and form primitives are the right places to establish consistent styling.

The homepage's section order is fixed: hero carousel, featured tours, destinations, travel assistant, reasons to choose the agency, testimonials, location/map, services, final contact invitation. The header and footer remain around that sequence.

Research validation: inspected the running desktop and mobile interface, followed a tour card into its inquiry page, and reproduced missing tour content in a fresh tab. The existing production build passed, with a warning about a large JavaScript bundle. No production forms were submitted.

### Main findings

| Finding | Effect on the visitor | Planned response |
| --- | --- | --- |
| Orange headings, bright badges, gradients, glows, heavy shadows, and repeated animations compete | It is difficult to identify the most important action | Establish a clear type hierarchy and use orange deliberately for actions and selected states |
| Repeated large orange page banners and similar boxed sections | Pages feel repetitive and generic | Give each existing section a deliberate composition within one coherent system |
| Card padding, image treatment, title wrapping, and metadata spacing vary | Tours are harder to scan and compare | Standardize card anatomy, image ratios, spacing, and action placement |
| “Register Now” opens tour details; the form says “Confirm Booking” | Labels suggest a stronger commitment than an inquiry | Use accurate labels such as “View tour” and “Send booking inquiry” |
| A tour opens via a card but has missing content in a fresh tab at the same URL | Shared tour links fail the main conversion flow | Resolve tours from the current catalog using the URL, with useful loading and not-found states |
| Phone/email link destinations differ from their visible values | Visitors can contact the wrong destination | Align link targets with the displayed existing contact details |
| Services and tour details sit outside the shared page layout | Scroll and assistant behavior vary between routes | Make the shell behavior consistent while preserving page content and order |
| Continuous AI-button pulsing and automatic service scrolling | Decorative motion competes with reading and selection | Use restrained transitions, clear browsing controls, and reduced-motion support |

Source inspection also found an older registration component calling an undefined helper, duplicate tour route declarations, a visa fallback route that does not exist, raw separator text rendered on pages, and inconsistent factual marketing copy. These should be handled in their relevant implementation areas, without inventing new business facts.

## Proposed visual direction

Translate Apple's spacious layout, strong typography, focused imagery, and simple controls into a travel experience. Use white and soft neutral surfaces, dark readable text, and the existing orange/amber accents. Keep the brand recognizable through the name, colors, destination photography, and content.

Use a cohesive system sans-serif font stack with appropriate Latin, Cyrillic, and Chinese fallbacks. Define a consistent content width, spacing rhythm, heading scale, corner treatment, borders, and button hierarchy. Reduce gradients, oversized shadows, decorative icon containers, and continuous pulsing.

The first viewport keeps the existing hero carousel: one strong destination image, a clear headline and supporting line, a prominent tour action, a quieter destination action, and discreet slide controls. Preserve the carousel's content and feature. Carry this restraint through dense itinerary content, forms, drawers, and chat states.

The main interaction is choosing a tour and understanding its next step. Tour cards make destination, duration, and price easy to compare; the detail page presents a clear inquiry form and readable itinerary in their existing section order. Subtle image movement and short transitions provide feedback without obscuring content.

Tradeoff: generous spacing must be balanced with enough tour information to compare options. Mobile layouts and longer translations will receive deliberate attention.

## Page coverage

| Surface | Redesign work |
| --- | --- |
| Header and footer | Refine brand presentation, navigation hierarchy, language control, mobile menu, contact details, and secondary AI access |
| Home | Restyle every existing section in place, with stronger photography, a clear hierarchy, consistent cards, quieter proof sections, and a focused final action |
| Tours | Refine the page introduction, existing category controls, catalog cards, recommendation highlights, and empty/loading/error states |
| Tour Details | Refine the title, inquiry form, total-price summary, gallery, highlights, itinerary, contact section, and confirmation state in the current order |
| Destinations | Refine the cards and detail drawer for comfortable reading, photography, and a clear path to tours |
| Services | Refine transportation and hotel rows, browsing controls, detail panels, and contact invitation |
| Gallery | Refine image presentation and lightbox controls, including keyboard and touch access |
| About | Improve the company story's readability and the team presentation using existing factual content |
| Contact | Improve form grouping, validation feedback, contact hierarchy, and submission states |
| AI assistant | Unify full-page and floating chat presentation; retain the current capability and tour recommendations |
| Visa and not-found pages | Apply the same visual language and repair local navigation issues; retain the existing flows |

## Implementation sequence after approval

1. Establish shared visual tokens and reusable typography, button, card, form, and page-section treatments.
2. Redesign the shared header/footer and homepage to set the visual standard, preserving section order.
3. Apply the system to Tours and Tour Details, including the direct-link and inquiry-label fixes.
4. Complete Destinations, Services, Gallery, About, Contact, AI Chat, visa screens, dialogs, drawers, and feedback states.
5. Verify desktop and mobile together, fix the findings in one batch, and confirm the result in a final review. Record the finished design system for future work.

## Acceptance checks

- Existing routes, features, factual data, and section order remain intact.
- Orange and amber remain the main brand accents; typography, surfaces, and controls are consistent.
- Tour links work from a fresh tab and after reload, with graceful missing-tour behavior.
- The main path clearly reads: choose a tour, inspect its details, send an inquiry, receive an accurate acknowledgment.
- Category switching, empty Worldwide inventory, destination drawers, service panels, lightbox, navigation, and chat controls remain usable.
- Check narrow mobile, tablet, desktop, and the user's preview width; avoid horizontal page overflow and content covered by floating controls.
- Verify all seven languages and representative long titles, destination lists, and validation messages.
- Check keyboard focus, form labels, accessible contrast, readable text sizes, and reduced-motion behavior.
- Production build and relevant lint checks pass, or pre-existing unrelated limitations are identified precisely.
- Validate request success/failure UI with controlled responses; do not create real production inquiries as test data.

## Separate release concerns

The contact page currently contains a privileged Supabase credential in client code. This is an existing security issue that needs credential rotation and a server-side submission boundary before release; the credential is deliberately not repeated here. Backend security changes are separate from the visual redesign and have not been performed.

The visa result screen generates hardcoded requirements, and fallback testimonials and some company claims are unverified. A visual redesign cannot validate them. Preserve the sections and flag factual questions for the owner instead of adding claims or presenting new verified advice.

## Approval boundary

The user's approval authorized the described frontend redesign and the small navigation, labeling, and contact-link fixes needed for the existing user flows. It did not authorize publishing, replacing the backend, changing prices, inventing testimonials, or altering factual visa requirements. The implementation remains local for review.
