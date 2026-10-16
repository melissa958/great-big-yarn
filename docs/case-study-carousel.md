# Case study carousel preview

Preview: `https://melissa958.github.io/great-big-yarn/previews/case-studies.html#case-studies`

This is a copy of the approved four-section homepage, with a carousel appended after the services cards and a client-logo strip below the Section 3 cards. It does not change the homepage or Cat test. The owner's supplied screenshot is the reference for these components: a large central image, neighboring slides, cream gutters, lower image gradient, white project names and off-white buttons.

## Content and links

Slides are in `site/previews/case-studies.html`, in this approved order:

1. Caban Energy
2. Ohmium
3. Ric Benefits
4. NextWave Energy Monitoring
5. Latitude Media

Case-study buttons are disabled until real case-study pages are ready. Replace each button with a real link when its destination exists; do not create placeholder pages or dead links. No CMS has been connected. The static articles can later be generated from structured project content without changing the carousel controller.

## Interaction

`site/scripts/case-studies.js` provides manual previous/next controls, edge looping, horizontal mouse/touch dragging and Left/Right/Home/End keys while the carousel viewport has focus. There is no autoplay. The adjacent edge copies are inert and hidden from screen readers, as are inactive originals; a live status announces the selected project. The controls have 44px or larger targets. Reduced motion removes slide transitions. Without JavaScript the five original slides remain available in a native horizontal scroll-snap strip.

`site/styles/case-studies.css` contains preview-only styles. Central slides use 72vw on desktop, 84vw on tablet and 88vw on phones. The phone crop is taller to preserve legible project titles and buttons. Sizes grow naturally with text zoom; the main page never gains horizontal overflow.

## Image optimization

The owner supplied all five images. Originals remain outside the published site. WebP derivatives were made with Sharp at quality 84, effort 6, normalized orientation and sRGB output, with metadata removed. No source was enlarged. Desktop derivatives retain their source proportions; portrait phone alternatives use a center crop at 3:4 to avoid downloading pixels that will be cropped offscreen.

| Project | Original | Largest desktop WebP | Largest phone WebP |
| --- | ---: | ---: | ---: |
| Caban Energy | 2,872,400 B | 144,644 B | 69,558 B |
| Ohmium | 230,082 B | 223,816 B | 72,150 B |
| Ric Benefits | 3,633,347 B | 356,996 B | 185,688 B |
| NextWave Energy Monitoring | 2,052,437 B | 235,214 B | 123,554 B |
| Latitude Media | 1,850,340 B | 75,670 B | 41,658 B |
| Total | 10,638,606 B | 1,036,340 B | 492,608 B |

The largest desktop set is about 90% smaller than the originals; the largest phone set is about 95% smaller. Each browser chooses one suitable variant per image through `picture`, `srcset` and `sizes`, based on screen size and pixel density. These totals are comparisons, not an upfront page download: images are lazy-loaded below the fold, with adjacent slides warmed when the carousel approaches the viewport. Duplicate edge slides reuse the browser cache. Explicit image dimensions and reserved slide heights prevent image-related layout shifts.

Ohmium's source is already WebP and only 1200px wide, so its full-size file has a smaller saving and cannot gain additional original detail on very large displays. Keep the original files for future case-study detail pages.

## Client logos

The owner supplied eight transparent PNGs: ZETA, Caban Energy, GreenieRE Coalition, Ric Benefits, Latitude Media, NextWave Energy Monitoring, Ohmium and Scale. Trimmed, lossless WebP assets preserve transparency and original colors, and total 62,460 bytes. CSS constrains each logo within a common optical area without distorting its proportions. The off-white strip keeps black marks legible within the black third section.

`site/styles/client-logos.css` groups duration (65s desktop / 60s phone), logo width and gap as CSS custom properties. `site/scripts/client-logos.js` makes one inert, screen-reader-hidden duplicate for a seamless CSS transform loop. Hover, keyboard focus or the dedicated Pause button stops the loop. Offscreen, covered-curtain and hidden-tab states also pause it. The hero Pause control stays independent. Reduced motion and no JavaScript show all eight originals in a static grid; changing the motion preference live removes or restores the duplicate. These are decorative client marks, not invented destination links.
