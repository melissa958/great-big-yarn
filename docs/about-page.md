# About page and homepage biography

Requested November 6, 2026.

## Homepage

Both site/index.html and the retained homepage-refresh directory preview use the owner's exact new paragraphs: the clean-energy/technology career biography and the upstate New York/family/studio paragraph. Keep the existing heading and original About portrait. Text remains 16px/300, with the existing line height and a 24px gap between paragraphs. Let the section grow naturally with the longer text.

The two arrow buttons and live status group are removed from the markup. The current pages no longer load about-carousel.js. Existing .refresh-about-carousel / slide wrappers still supply the approved desktop image-left/copy-right grid and mobile copy-before-image order, but the portrait occupies one row rather than reserving a controls row. Original arrow assets and controller remain available as history.

The black “More? Click here” link sits 28px below the biography and uses the shared off-white button text. Its public destination is about/ from the homepage and ../../about/ from the retained preview.

## New page

The owner explicitly requested a new About page after choosing this button. The first version lives at site/about/index.html → /about/. It reuses the existing studio heading, both supplied paragraphs and the approved portrait; no additional biography or client claims have been invented.

The page uses the shared paper background, Romie/Be Vietnam typography, header, mobile menu and footer. The headline is centered above the portrait/bio grid. Desktop places the portrait left and copy right; below 1000px the copy precedes the portrait, with 16px phone body text. A standard Let’s chat link leads to ../contact/. Navigation remains linked to homepage sections as previously requested, and logo links return directly to ../ without #main.

about-page.css contains only this page's layout. There is no carousel or page-specific JavaScript. Content and links remain available without JavaScript; the shared menu retains keyboard/focus and reduced-motion support.

## Checks

Validate all local links and build the versioned dist output. Review the homepage section and new About page at 1440px and 390px, checking two exact matching bio paragraphs, zero arrow controls, the More link's actual navigation, local portrait loading, no horizontal overflow and mobile reading order. No contact-form submission is part of these checks.
