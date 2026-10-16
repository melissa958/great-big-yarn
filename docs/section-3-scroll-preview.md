# Section 3 scrolling layout

Preview: https://melissa958.github.io/great-big-yarn/previews/section-3-scroll.html#opportunity

The owner approved this layout and its promotion to the homepage on October 16. The separate scroll preview remains available, and the existing case-study preview retains its earlier layout. It retains all existing copy, imagery, services, selected work, cat, and client logos.

At 1000px and wider, Section 3 has two columns within the existing 1108px / 1320px content widths. The eyebrow and Romie headline stay pinned at left while three borderless points scroll at right. Each point reserves at least one small viewport height (and at least 32rem for short windows), with its heading and paragraph centered vertically. The headline leaves after the third point, before the original logo strip. Below 1000px the headline and points stack, without pinning or forced viewport-height points.

`site/styles/opportunity-scroll.css` and `site/scripts/opportunity-scroll.js` are loaded by the homepage and scroll preview. A one-viewport sticky wrapper and a measured margin preserve the Section 2 curtain reveal without trapping or intercepting wheel, touch, or keyboard scrolling. ResizeObserver updates the space after font, viewport, and logo-layout changes. The existing Scroll forth link still targets the uncovered start of Section 3.

The three article elements remain semantic HTML in reading order. Desktop opacity is calculated only on requested animation frames after scrolling/resizing. Tuning is grouped in OPPORTUNITY_SCROLL: a 1000px breakpoint, a fully visible region within .22 viewport heights of center, and a fade ending at .46 viewport heights. Only one point has visible opacity at a time. There is no timed slideshow, snapping, or scroll interception. Work pauses offscreen and in hidden tabs.

Reduced motion disables the fades and curtain wrapper; all points remain visible with natural scrolling. Without JavaScript, all content is visible in normal document flow. Mobile retains the original once-on-entry fades and accessible reading order. Shared styles and controllers retain the previous layout on other previews.

## Kaleidoscope

The homepage and scroll preview include one decorative inline SVG above the first point's heading, aligned to the text. Its responsive circle is 128–176px wide (112px on short desktop windows), with 36px below it on desktop, 28px on mobile, and 24px in short windows. It moves with the first article and shares its fade; other points do not repeat it.

Four source shapes use the existing blush pink, yellow, coral/red and paper tokens against ink. The owner supplied Kaleidoscope.svg from Lottie as a motion reference. Its six formation poses and alternating 120-degree piece turns are adapted to eight independently moving instances of the four GBY shapes within six mirrored wedges (three reflected pairs). Each piece follows its own translation path, gathering into clusters, opening into a ring and recombining through the mirror edges. The overall pattern and circular frame do not rotate as a unit. The reference's six-second sequence is slowed to an 18-second loop for the website; matching endpoints preserve continuity. Circle size, geometric silhouettes and colors remain unchanged. The attached 197KB reference is not published and no Lottie runtime is loaded. Only the lightweight inline SVG and CSS are used; shapes and timing are in opportunity-scroll.css and the page markup.

The Section 3 controller starts motion only when the circle intersects the viewport and the preceding curtain has uncovered it. Hidden tabs and offscreen state pause CSS animation without resetting progress. Reduced motion and no JavaScript retain the static starting pattern. The decoration is hidden from assistive technology, is unfocusable, and does not intercept pointer input.
