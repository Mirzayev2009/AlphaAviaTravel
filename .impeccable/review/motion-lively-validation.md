# Visible motion refinement — 2026-10-21

User requested more noticeable GSAP animation after the first motion pass.

- Added a staggered hero headline, finite active-photo settle, initial action/control entrance, selected homepage media arrivals, page introductions, and stronger tour/chat transitions.
- Production build, scoped lint, chat checks, translation/tour URL checks, motion playback/lifecycle checks, and diff whitespace checks passed.
- Live desktop inspection at 1365×900 observed independent word transforms/opacities and a settling active photograph. On a later slide change, only Bukhara's active photograph had a transform; both inactive photographs were still.
- Homepage destination/photo content remained readable after scrolling, without horizontal overflow. The observer uses once-only targets rather than continuous scroll updates.
- At 390×844, the Chinese headline fit within its 339px container with no horizontal overflow. English was restored afterward.
- The phone chat measured 844px high. Prompt buttons showed staggered transforms, selecting a prompt focused the composer, and Escape closed the dialog. Test draft was cleared; no AI message was sent.
- No browser errors were recorded. Temporary viewport override was reset and the homepage carousel left playing. Screenshot: motion-lively-home.jpg.
- Compressed initial JavaScript: 222,697 bytes, 745 bytes above the preceding motion pass and 6.9% below the original baseline. Chat/map remain lazy. No packages, fonts, or media were added.

Reduced motion was verified from source and playback tests. Physical-phone frame rate and the actual on-screen keyboard were not measured.
