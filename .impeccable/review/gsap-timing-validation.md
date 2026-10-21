# GSAP timing validation — 2026-10-22

Follow-up: the user requested another 20% header speed increase using the preceding result as 100%. Only the intro and home entrance timelines now use GSAP `timeScale(1.2)`, proportionately scaling their durations, offsets, and staggers. Cards remain unchanged. Scoped lint, production build, and motion checks passed again; home and Tours headers completed once with cleared inline styles. The follow-up preview is `header-speed-120.png`. Numeric timings below describe the preceding review unless otherwise specified.

The existing GSAP controller now prepares offscreen cards before their first visible frame and animates toward their resting state once. It leaves content already visible when the lazy controller attaches settled. Category changes no longer animate the parent grid over child entrances. Route scroll resets immediately. Message and status tweens have separate lifecycles.

Cards retain the approved 0.95s sine.out entrance, 12px desktop / 8px phone, with a maximum 140ms row stagger. Following the user's final review, only header entrances were shortened about 20%: inner copy 0.8s, artwork 1s, contour lines 1.12s; home copy 0.85s and accent 0.92s. Authored page/card entrances use GSAP; existing modal exit retention and ordinary hover feedback remain intact.

## Browser evidence

- Desktop Tours card samples show opacity increasing from .55 through .6241, .6876, .7382, .7778, .8163, .8602 while travel decreases from 12px through 10.0249, 8.3296, 6.9806, 5.9257, 4.8985, 3.7278px. It subsequently completed with cleared inline styles and one run.
- Scrolling away and back preserved the completed card at one run. Rapid category changes left the parent grid without inline animation; visible cards ran once.
- At 390 × 844, cards prepared at 8px and completed once. Saved phone samples capture preparation, not intermediate playback.
- Navigation from scrolled Tours to Destinations returned directly to scroll position zero.
- Destination drawer and gallery viewer opened and closed; focus returned to their originating controls. Gallery next-image navigation and Escape close worked. Phone navigation and floating-chat open/close worked.
- After the final header adjustment, home and Tours headers completed once with cleared copy styles. The Tours preview is saved in `gsap-timing-tours-desktop.png`; card samples are in `gsap-timing-samples.json`.

## Checks and limits

Scoped lint, production build, motion checks, chat checks, catalog/interface validation, and whitespace checks passed. Initial JavaScript is 194,123 gzip bytes, below the existing 222,697-byte budget; deferred motion is 30,693 gzip bytes. No new dependency or asset was added. The build retains its existing large-chunk advisory.

Reduced-motion handling was checked in source and automated playback checks, without an OS-level emulation run. No physical-device frame-rate or profiler claim is made. No inquiry, contact form, or AI message was submitted. This work did not initiate a deployment, commit, or push.
