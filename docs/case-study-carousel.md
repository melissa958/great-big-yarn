# Selected work preview

Preview: `https://melissa958.github.io/great-big-yarn/previews/case-studies.html#case-studies`

This is a copy of the approved four-section homepage, with selected work appended after the services cards and a client-logo strip below the Section 3 cards. It does not change the homepage or Cat test. After comparing three visual concepts, the owner selected the editorial grid to replace the initial project carousel. The existing preview URL is preserved.

## Content and links

Project articles are in `site/previews/case-studies.html`, in this approved reading order:

1. Caban Energy
2. Ohmium
3. Ric Benefits
4. NextWave Energy Monitoring
5. Latitude Media

Case-study arrow buttons are disabled until real case-study pages are ready. Replace each button with a real link when its destination exists; do not create placeholder pages or dead links. No CMS has been connected. The static articles can later be generated from structured project content.

## Editorial layout

`site/styles/case-study-grid.css` gives the work the full available section width (max-width: 100%), retaining 60px desktop / 32px tablet / 24px phone outer gutters, beneath the dashed “SELECTED WORK” eyebrow. Caban anchors the left column across two rows; Ohmium and Ric stack beside it. NextWave and Latitude occupy two wider images on the next row. Black Romie titles and compact off-white arrow buttons sit below each image, leaving the photography unobscured. Desktop gaps are 44px between rows and 40px between columns, reducing to 36px/32px on tablets. The first picture flexes to align the top group's bottom captions while allowing titles to wrap.

Below 700px the five projects stack in their reading order with 24px outer gutters and 36px gaps. Caban retains a taller image; the remaining projects use landscape crops. The grid is semantic static HTML with no carousel script, horizontal dragging, clones, hidden projects or carousel announcements. All projects are available with or without JavaScript and under reduced motion. The older `case-studies.css` and `case-studies.js` remain unused by this preview; the client-logo carousel is independent and unchanged.

## Image optimization

The owner supplied all five images. Originals remain outside the published site. WebP derivatives were made with Sharp at quality 84, effort 6, normalized orientation and sRGB output, with metadata removed. No source was enlarged. The grid reuses responsive landscape derivatives on every device; image `sizes` reflects each column and the taller Caban crop. Portrait alternatives from the earlier carousel remain available but are not requested by the grid.

| Project | Original | Largest landscape WebP | Retained portrait alternative |
| --- | ---: | ---: | ---: |
| Caban Energy | 2,872,400 B | 144,644 B | 69,558 B |
| Ohmium | 230,082 B | 223,816 B | 72,150 B |
| Ric Benefits | 3,633,347 B | 356,996 B | 185,688 B |
| NextWave Energy Monitoring | 2,052,437 B | 235,214 B | 123,554 B |
| Latitude Media | 1,850,340 B | 75,670 B | 41,658 B |
| Total | 10,638,606 B | 1,036,340 B | 492,608 B |

The largest landscape set is about 90% smaller than the originals. Each browser chooses one suitable variant per image through `srcset` and `sizes`, based on screen size and pixel density. These totals are comparisons, not an upfront page download: images are lazy-loaded below the fold. Explicit image dimensions and reserved picture proportions prevent image-related layout shifts.

Ohmium's source is already WebP and only 1200px wide, so its full-size file has a smaller saving and cannot gain additional original detail on very large displays. Keep the original files for future case-study detail pages.

## Client logos

The owner supplied eight transparent dark-background PNGs: ZETA, Caban Energy, GreenieRE Coalition, Ric Benefits, Latitude Media, NextWave Energy Monitoring, Ohmium and Scale. Trimmed, lossless WebP assets preserve transparency and original colors, and total 63,228 bytes. The `-dark.webp` filenames also prevent browsers from reusing the previous black-lettered logos from their cache. CSS constrains each logo within a common optical area without distorting its proportions. The strip uses the same black ink token as Section 3, with white caption, Pause control and keyboard focus outline. Original brand color accents remain intact.

`site/styles/client-logos.css` groups duration (65s desktop / 60s phone), logo width and gap as CSS custom properties. `site/scripts/client-logos.js` makes one inert, screen-reader-hidden duplicate for a seamless CSS transform loop. Hover, keyboard focus or the dedicated Pause button stops the loop. Offscreen, covered-curtain and hidden-tab states also pause it. The hero Pause control stays independent. Reduced motion and no JavaScript show all eight originals in a static grid; changing the motion preference live removes or restores the duplicate. These are decorative client marks, not invented destination links.
