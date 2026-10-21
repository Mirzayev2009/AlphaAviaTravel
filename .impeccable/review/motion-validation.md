# Motion verification — 2026-10-21

Implemented MOTION_PLAN.md using installed GSAP and the React integration, without new dependencies or assets.

- Production build, scoped lint, chat behavior/format checks, translation checks, tour URL checks, and diff whitespace checks passed.
- Playback regression checks passed for hidden tabs, offscreen state, pointer hover, manual pause, reduced motion, touch hover, listener cleanup, and Swiper destruction before React cleanup.
- Initial JavaScript: 722,075 → 679,137 bytes raw; 239,224 → 221,952 bytes gzip (7.2% smaller compressed). Chat and map remain outside the initial import graph.
- Live browser verification at 1365×900 and 390×844: destination changes, home category changes, catalog category changes and empty results, mobile menu keyboard access, chat open/close/reopen, prompt focus, expansion preserving the draft, no duplicate launcher on the full page, and no horizontal overflow.
- Mobile dialog measured 390×844, with the composer inside the viewport. Tab focus wraps, Escape returns focus to the launcher, scroll lock releases, and the closed panel leaves the DOM.
- Fixed the carousel cleanup issue discovered during live checking and added its regression case. Fixed menu Escape focus return and confirmed it live.
- Final route/filter check produced no new browser errors. Temporary viewport overrides were reset; preview returned to Home and test drafts cleared.

Visual evidence: motion-chat-desktop.jpg and motion-chat-mobile.jpg. Reduced-motion behavior was checked in source and playback tests; preference emulation, physical-phone frame rate, the actual on-screen keyboard, and live AI replies were not measured. No AI query or booking form was submitted.
