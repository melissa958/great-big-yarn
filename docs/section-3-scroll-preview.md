# Section 3 scroll layout test

Preview: https://melissa958.github.io/great-big-yarn/previews/section-3-scroll.html#opportunity

This isolated copy of the homepage tests the owner's October 16 layout request. The homepage and existing case-study preview remain unchanged. It retains all existing copy, imagery, services, selected work, cat, and client logos.

At 1000px and wider, Section 3 has two columns within the existing 1108px / 1320px content widths. The eyebrow and Romie headline stay pinned at left while three borderless points scroll at right. Each point reserves at least one small viewport height (and at least 32rem for short windows), with its heading and paragraph centered vertically. The headline leaves after the third point, before the original logo strip. Below 1000px the headline and points stack, without pinning or forced viewport-height points.

`site/styles/opportunity-scroll.css` and `site/scripts/opportunity-scroll.js` are loaded only by this preview. A one-viewport sticky wrapper and a measured margin preserve the Section 2 curtain reveal without trapping or intercepting wheel, touch, or keyboard scrolling. ResizeObserver updates the space after font, viewport, and logo-layout changes. The existing Scroll forth link still targets the uncovered start of Section 3.

The three article elements remain semantic HTML in reading order. Desktop opacity is calculated only on requested animation frames after scrolling/resizing. Tuning is grouped in OPPORTUNITY_SCROLL: a 1000px breakpoint, a fully visible region within .22 viewport heights of center, and a fade ending at .46 viewport heights. Only one point has visible opacity at a time. There is no timed slideshow, snapping, or scroll interception. Work pauses offscreen and in hidden tabs.

Reduced motion disables the fades and curtain wrapper; all points remain visible with natural scrolling. Without JavaScript, all content is visible in normal document flow. Mobile retains the original once-on-entry fades and accessible reading order. The original homepage CSS and JavaScript files are unmodified by this experiment.
