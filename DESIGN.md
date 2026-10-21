---
name: Alpha Avia Travel
description: Clear travel choices, destination photography, and a focused inquiry path.
colors:
  brand: "#ff8a00"
  brand-hover: "#f9a12b"
  brand-strong: "#a74b00"
  primary-foreground: "#241708"
  background: "#fff"
  ink: "#1d1d1f"
  ink-soft: "#65656b"
  surface: "#f5f5f7"
  surface-warm: "#fff5e8"
  accent: "#fff3e2"
  accent-foreground: "#924300"
  line: "#e5e5e8"
  input: "#d1d1d6"
  destructive: "#b3261e"
  error-surface: "#fff0ef"
  nav-text: "#515154"
  description-text: "#55555c"
  placeholder: "#737378"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "clamp(38px, 5.6vw, 76px)"
    fontWeight: 650
    lineHeight: 1.06
    letterSpacing: "-.04em"
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "clamp(38px, 5vw, 64px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-.04em"
  title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "clamp(32px, 4vw, 48px)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-.035em"
  card-title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "21px"
    fontWeight: 650
    lineHeight: 1.28
    letterSpacing: "-.025em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "17px"
    lineHeight: 1.6
  field:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "16px"
    lineHeight: 1.4
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "13px"
    fontWeight: 500
  navigation:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans CJK SC", Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 500
rounded:
  detail: "8px"
  field: "10px"
  mobile-media: "12px"
  surface: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  content: "20px"
  lg: "24px"
  xl: "32px"
  panel: "40px"
  wide: "48px"
  split: "64px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    padding: "12px 23px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 23px"
    height: "46px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "10px 17px"
    height: "40px"
  text-link:
    textColor: "{colors.brand-strong}"
    height: "44px"
  icon-button:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    width: "44px"
    height: "44px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
  navigation:
    textColor: "{colors.nav-text}"
    typography: "{typography.navigation}"
    padding: "25px 0"
  category-chip:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "11px 19px"
    height: "44px"
  category-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
  tour-card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  itinerary:
    textColor: "{colors.ink}"
    padding: "22px 0"
  chat-composer:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.surface}"
    padding: "7px 8px 7px 14px"
---

# Design System: Alpha Avia Travel

<!-- Extracted 2026-10-21 from src/styles/travel.css, its import order in src/main.jsx, and the shared React components. This records implementation evidence; final desktop/mobile visual approval remains pending. -->

## Overview

**Creative North Star: "A Clear Window onto Travel"**

The approved Apple reference appears as quiet light surfaces, generous space, clear system typography, and destination photography. Orange gives the visitor a visible next step; the darker orange carries links and small functional accents. The interface serves both international visitors and Uzbekistan residents, with one consistent visual language across seven languages.

The system moves from broad introductions to practical comparison and readable inquiry forms. Rounded media and panels soften the presentation without heavy decorative framing. The approved system sans stack is an explicit project decision, including display headings; it is retained with Latin, Cyrillic, and Chinese fallbacks.

**Key Characteristics:**
- White and soft neutral surfaces with deliberate orange actions.
- Large dark headings, compact functional labels, and readable supporting copy.
- Rounded photography, pill controls, and fine neutral dividers.
- Short feedback transitions, a pausable hero carousel, and reduced-motion support.

## Colors

The palette combines orange and warm cream with a cool neutral reading surface; frontmatter preserves the source CSS color strings.

### Primary
- **Travel Orange** (`brand`): primary buttons, active navigation underline, map marker, and highlighted tour outline.
- **Amber Hover** (`brand-hover`): the primary button's hover state, keeping the orange/amber brand relationship visible in interaction.
- **Deep Orange** (`brand-strong`): text links, functional metadata, icons, active mobile navigation, field carets, and focus outlines. The source `ring` alias shares this value.
- **Warm Dark Ink** (`primary-foreground`): readable primary-button text.
- **Warm Cream** (`surface-warm`): contact invitation, user chat bubbles, and quieter hover feedback. The Radix accent and accent foreground retain their own source values for focused menu options.

### Neutral
- **White** (`background`): the page, cards, popovers, and fields.
- **Reading Ink** (`ink`): headings, prices, primary text, and selected category-chip backgrounds.
- **Supporting Gray** (`ink-soft`): descriptions, metadata, and secondary text; navigation and tour descriptions have their documented local gray values.
- **Soft Gray** (`surface`): alternate sections, assistant panels, form surroundings, and hover surfaces.
- **Fine Line** (`line`): card separators, borders, and section dividers. **Field Line** (`input`) gives controls a stronger boundary.
- **Error Red** (`destructive`) and **Error Wash** (`error-surface`): invalid fields and request errors; these are semantic feedback colors, not additional brand families.

### Named Rules

**The Action Orange Rule.** Use bright orange for primary actions and selected emphasis; use the darker orange for text links and small functional accents.

## Typography

**Display Font:** the system sans stack in the frontmatter.
**Body Font:** the same multilingual stack, with Noto Sans and Noto Sans CJK SC fallbacks.

**Character:** one restrained family creates hierarchy through size, weight, and space. Headings use balanced wrapping and modest negative tracking; prose remains quieter and more open.

### Hierarchy
- **Display:** hero headline; constrained to a broad centered measure (`1000px`). Supporting hero text uses a fluid size (`clamp(17px, 1.7vw, 21px)`) and a shorter measure (`650px`).
- **Headline:** centered page introductions, with description width capped (`660px`); introduction copy uses a larger reading size (`19px`, line height `1.55`).
- **Title:** section headings. Tour detail headings have their own fluid scale (`clamp(36px, 4.5vw, 60px)`, line height `1.1`).
- **Card title:** tour names. Card prose uses a compact reading size (`14px`, line height `1.6`); destination descriptions use line height (`1.65`).
- **Body:** section descriptions and longer story text. Itinerary content uses a smaller size (`15px`) with generous line height (`1.8`).
- **Field:** inquiry and contact controls; maintain the readable control size on phones.
- **Label / Navigation:** functional field labels and desktop navigation. Tour duration metadata is a factual label (`12px`, weight `600`), not a decorative heading prefix.
- **Numbers:** tour prices, totals, and carousel counts use tabular numerals where declared.

### Named Rules

**The Single Voice Rule.** Retain the approved multilingual system sans stack and express emphasis through the established type roles; headings do not need orange fills.

## Layout

The main container is centered with width (`min(100% - 80px, 1200px)`). At wide screens (`min-width: 1600px`), it becomes (`min(100% - 120px, 1280px)`). Following the user's homepage correction, the hero is full-bleed with a minimum height (`100svh`, with `100vh` fallback), centered foreground copy, and absolute cover photography. It offsets the shared navigation's full height (`73px` desktop, `65px` mobile, including its border) so the photograph extends behind the navigation and fills the opening viewport. Equal vertical padding reserves room for navigation and carousel controls; short screens and long translations may expand the minimum height. Shared sections use the section spacing token; alternate surfaces create chapter boundaries.

Tours and destination grids begin at three columns with a gap (`24px`). Tour images use an aspect ratio (`1.48`); the card body has padding (`25px`) and gap (`14px`). Inquiry forms use two fields per row, with column gap (`20px`) and row gap (`22px`). Major reading/form splits use different ratios appropriate to the content, including inquiry (`.85fr 1.3fr`) and tour information (`.75fr 1.5fr`). Do not replace those with uniform cards.

Responsive behavior follows the actual queries:
- **Below 1200px:** tighten header spacing, simplify service previews to three columns, and reduce assistant-panel padding.
- **Below 1024px:** desktop navigation becomes a toggle-controlled menu, tour cards become two columns, service rails show two items, and team cards become two columns.
- **Below 768px:** container gutters become (`20px`); header inner height becomes (`64px`) from (`72px`); section padding becomes (`58px`). Introductions, assistant content, inquiry, story, contact, and tour information stack. Destination cards become one column; service rails show a partial next item with column width (`82%`) and gap (`16px`). Gallery cards retain two columns, with the lead image spanning the row. The hero stays full-viewport and full-bleed; controls wrap when needed and reserve the chat launcher's corner.
- **Below 580px:** tour, team, contact-option, and field grids become one column. Hero headline size becomes (`38px`); the extra header assistant shortcut hides.

Keep translated controls flexible: category controls wrap, tour action/price rows wrap, contact values break safely, and form grid items have `min-width: 0`. The detail sheet is bounded to (`700px`) with its own scrolling body. Floating chat is bounded by the viewport (`min(420px, calc(100vw - 32px))`) and available dynamic height. Below (`768px`), or on a short touch viewport, it fills the viewport and follows visual-viewport resizing above the keyboard. A short-window container query compacts the toolbar and footer. The full-page chat uses the available height below the shared navigation, with a compact heading and one conversation workspace.

## Elevation & Depth

Depth comes mainly from white against soft neutral or warm surfaces, fine dividers, and photographic crops. Shadows are restrained and have specific jobs. The translucent sticky header uses a white layer and, when supported, a backdrop blur (`14px`). At the top of the homepage it becomes transparent over the hero, with white controls and amber brand detail; scrolling or opening the mobile menu restores the solid treatment. The hero uses a dark overlay over the entire image to protect centered white text. Gradients occur locally over images to protect text or controls; they are not general page decoration.

### Shadow Vocabulary
- **Tour card:** (`0 4px 18px rgb(29 29 31 / .035)`), a low resting separation.
- **Chat launcher:** (`0 6px 24px rgb(90 49 0 / .15)`), keeping the fixed control distinct.
- **Floating chat:** (`0 16px 70px rgb(29 29 31 / .16)`), a raised conversation panel.
- **Office marker:** (`0 3px 12px rgb(29 29 31 / .15)`), local map legibility.

### Named Rules

**The Surface First Rule.** Establish hierarchy with surface tone, spacing, and dividers before adding elevation; use the observed shadow roles for cards and floating controls.

## Shapes

Cards, contained media, sheets' images, and form panels share the surface radius. Inputs use the field radius, while buttons and category controls use pills. Icon controls are circles with explicit dimensions. At mobile widths gallery media use the smaller mobile-media radius. The full-bleed homepage hero has square edges. Images use `object-fit: cover`; gallery lightboxes use `object-fit: contain` to show the whole image.

Borders are normally thin (`1px`) and neutral. A recommended tour receives an orange outline (`2px`) with offset (`4px`). Chat bubbles share rounded corners with a small directional corner (`4px`). Avoid turning these local state treatments into extra decoration on every panel.

## Components

### Buttons

Compact pill controls make the action hierarchy clear. Primary and secondary primitives use the frontmatter values as minimum heights, not fixed text-clipping heights. The primary has warm dark text; the secondary is transparent with a neutral border. A small variant is used for tour-card actions. Hover changes the background; active press scales (`.98`) with a short transition (`.2s`). Disabled buttons use opacity (`.5`) and a not-allowed cursor.

The shared CSS also governs Radix buttons through `data-slot="button"`; the Radix outline variant maps to the secondary treatment. The dormant orange-outline class is not a required third action tier.

### Chips

Category filters are pill buttons with neutral borders, optional inline Lucide icons, and a pressed state expressed by dark ink against white. Hover uses the soft neutral surface. Categories wrap instead of scrolling offscreen. Selection is represented with `aria-pressed`, and the group has an accessible name.

### Cards / Containers

Tour cards are white rounded columns with clipped media, functional duration metadata, a title link, destination, description, price, and a quieter tour action. The footer divider separates comparison information from the action, and `margin-top: auto` keeps it at the bottom. On fine-pointer hover, interactive cards lift (`4px`, `.32s`), receive the shared soft shadow, and scale their clipped photographs (`1.04`). Tour actions take the brand fill; directional icons move (`2px`). Destination and team cards cast their shadow around the media rather than their text. Service rails reserve space for the lift and shadow. Keyboard focus receives the same shadow and action emphasis without positional movement. Reduced motion disables lift, zoom, and arrow travel. Recommendation highlighting uses the outline described in Shapes.

Service cards use a horizontal snapping rail with explicit browsing controls. They keep a media ratio (`1.35`) and body padding (`24px`, mobile `22px`). Destination tiles combine a portrait crop with a local lower image scrim and white destination title; descriptive text sits below the image.

### Inputs / Fields

White controls have a neutral stroke, the field radius, an explicit label, and a readable minimum height. Textareas can resize vertically and start taller (`140px`). Focus shifts the border to deep orange and adds an outline (`2px`, offset `2px`); invalid fields use the semantic error stroke. Request errors use the error wash with text and `role="alert"`; pending inquiry submission disables controls and exposes a busy state.

The general keyboard focus rule is an outline (`2px`) in deep orange with offset (`4px`). Preserve native semantics, labels, and focus visibility when composing forms.

### Navigation

The header is sticky with a fine lower divider. Desktop links use readable text (`14px`), gray at rest and ink on hover or when current; the homepage overlay uses white. The current link has an orange underline (`2px`) placed above the bottom edge (`15px`). The mobile menu uses larger link text (`18px`) and deep orange for the current route. Its button exposes `aria-expanded` and `aria-controls`; selecting a route or pressing Escape closes the menu. The language selector uses (`13px`) and retains all seven languages.

### Text Links and Icon Controls

Text links combine deep orange with a directional inline SVG; hover adds an underline. Their minimum target height is retained even when the text is small. Circular icon controls have a neutral border, white surface, and soft neutral hover; carousel controls use a more opaque white layer on photography. Give standalone icon actions an accessible name.

### Itinerary and Detail Surfaces

Itinerary days use native details/summary rows with a lower divider and generous vertical padding. Opening a day rotates its plus icon (`45deg`, `.2s`). The date/day label is functional sequence information. Detail drawers preserve a fixed header/footer and independently scrolling body; gallery dialogs preserve image proportions and accessible controls.

### Motion

The user approved calmer body motion and requested faster headers on 22 October. Header entrance timelines now play at 1.2× their authored speed: homepage copy/actions travel together 16px in about 708ms, and the 72px amber accent draws in 767ms with a 67ms offset. The photograph stays steady; later carousel changes retain their 600ms settle without resetting copy. Inner-page headers retain warm ivory (`--intro-surface: #fff8ee`), layered orange/amber architectural curves, fine contour lines, and warm supporting ink (`--intro-ink: #705642`). Effective copy / artwork / contour durations are about 667ms / 833ms / 933ms, with 50ms staggering and a 67ms contour offset. Copy travels 12px and art 24–28px. Authored tween values and offsets remain unchanged; only these entrance timelines use the 1.2× multiplier. These scoped GSAP entrances retain `sine.out`. Do not split words, add photo zoom, or use blurred blobs and repeating decorative patterns.

Whole cards retain the approved 950ms `sine.out` arrival, with 12px desktop / 8px phone travel and 70ms staggering capped at 140ms total. Compositions and service rails use 900ms; desktop stories move 12px horizontally and other groups use the same small vertical travel as cards. Prepare content offscreen or before a newly inserted group paints, and leave already-visible content in place when the deferred controller attaches. Each node enters once. Category selection uses a 340ms pill; results use their own card arrival without a second animated grid layer. Preserve the independent CSS hover transform by using individual translate for body reveals.

GSAP owns page entrances, artwork, and action-dependent motion; no CSS startup animation competes with it. Content remains visible by default, shared motion stays deferred, and a persistent weak set prevents replay after observer/media restarts. Existing CSS hover feedback and Radix exit-presence animations retain their separate roles. Drawers use 480ms entry / 300ms exit; photo enlargement and return use 480ms / 300ms `sine.inOut`, with 260ms image fades. Disclosures use 360ms open / 280ms close and visa steps use 6px / 420ms. Keep reduced-motion equivalents, scoped cleanup, cancellation, focus, and preserved form/chat state. No continuous decorative loops, scroll hijacking, animated blur, per-frame React state, or animation gate. See MOTION_PLAN.md for current coverage and initial/deferred startup reporting.

### Chat workspace

Use three rows: a compact identity/action toolbar, one scrolling transcript (`minmax(0, 1fr)`), and a pinned multiline composer. Replies use readable body text (`16px`, compact `15px`) and a maximum reading width (`70ch`); user messages use the warm surface. The empty state offers three real prompt buttons, stacked in the floating view and on mobile. Toolbar controls and send/stop actions have targets (`44px`). Keep title text flexible and actions fixed. The composer grows to (`144px`) before scrolling; desktop Enter sends and Shift + Enter adds a line, while touch keyboards retain normal newlines. Focus visibly outlines the composer.

Floating chat uses a modeless desktop dialog and a modal full-screen mobile dialog with focus return, scroll locking, and Escape handling. GSAP opens the window as one anchored composition (8px desktop / 6px phone, 400ms `sine.out`), with no scale pop or prompt cascade. A compositor CSS exit retains Radix lifecycle. New messages settle as one readable unit (5px, 320ms); independent status feedback fades for 180–240ms so a status change cannot rewind a message. Existing history never replays or interrupts reading. Spatial motion is disabled under reduced motion. Conversation and draft persist in memory across views. Loading has an explicit stop action; failures and timeouts offer an adjacent retry without duplicating the user turn. Do not add attachment or voice controls unless those capabilities exist.

## Do's and Don'ts

### Do:
- **Do** preserve the orange/amber action character, neutral reading surfaces, and approved multilingual system sans stack.
- **Do** reuse the established container, type roles, surface corners, field corners, and pill controls.
- **Do** keep functional metadata factual and place long translated text in wrapping layouts.
- **Do** retain clear focus outlines, labeled controls, pressed/current states, pausable motion, and reduced-motion behavior.
- **Do** keep inquiry labels accurate and use photography already supplied by the product.

### Don't:
- **Don't** add decorative color families, repeated orange heading fills, oversized glows, or continuous decorative loops.
- **Don't** replace the approved section order or hide product content to simplify a layout.
- **Don't** turn functional duration/day labels into decorative kickers on new surfaces.
- **Don't** treat generated tonal ramps in the sidecar as additional runtime palette tokens.
- **Don't** inherit dormant legacy theme values as the visual authority; the later shared travel stylesheet controls the active light system.

Not canonized or repaired: legacy dark/chart/sidebar defaults remain in the base stylesheet; `--amber` is declared but unused directly; the unused orange-outline action is not a new component tier. These are source drift, not instructions for future surfaces. This documentation does not assert final visual approval or validate factual claims.
