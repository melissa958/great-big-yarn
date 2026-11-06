# About page

Updated November 6, 2026, from Figma About page 316:2 / group 323:111 on Website 59:2 in Brand Assets (oIV91BuTH2ouyVi5pHCDDv).

## Current composition

The owner requested matching the new Figma About composition and retaining the general site footer. At 1440px, the main content begins at x76/y180 and is 1288px wide: a 613px photo grouping, 96px column gap and 579px copy column. The heading and all text now occupy the right column.

The left grouping contains the portrait at 613×414, then a 41px gap and a 613×414 grid: projection photograph 373×414, with the EV-charger image 220×111 above the family image 220×287, separated by 20px horizontally / 16px vertically. All have 15px corners. Exact Figma source images, including the overlapping family layers, and the 579×1 divider SVG are downloaded to site/assets/images/about. Preserve the supplied image transforms/crops; do not replace them with generic cover crops. They are static, with descriptive alt text; the fully covered rear family layer is decorative.

The right column uses a 56px Romie heading, a 22px/1.42 Romie bold italic first-person quote with “writes” linked to the supplied Experimental History article, then a 1px divider. Biography is the owner's three exact current paragraphs at 16px/300/1.44, separated by one line. The lower italic note begins “Oh, and the GBY name?” and ends “I’m excited to help tell yours.” Fresh Yarn links to https://freshyarn.com/ in a new tab with noopener/noreferrer. The note sits at the bottom of the photo grouping with a natural minimum gap. Load the existing Be Vietnam Light Italic font for it.

Below 1000px, the complete text precedes the photo grouping, matching the previous mobile reading order. Keep photo proportions, reduce gaps on phones, and let the note follow the biography naturally. The header/mobile navigation and general footer remain shared; there is no body Let’s chat button. Main content uses normal document flow without page-specific JavaScript.

## Homepage and navigation

The About section is removed from the main homepage and retained current homepage-refresh preview. Services flows directly into testimonials. Current header/footer About links, the hero’s Read more about me button, and About navigation on contact, project and current preview/template pages point to /about/ with relative clean URLs. Work, Services and Kind words retain homepage section destinations. Logos return to the homepage without #main. Historical comparison previews retain their original local sections.

The shared homepage entrance controller handles absent #studio as uncovered so testimonials continue to appear. Original carousel assets/controller/styles remain for history only.

## Verification

Validate local references and build only dist with versioned styles. Compare the desktop render against the Figma screenshot, checking every image/layer, crop, 1440px slot geometry, italic font, divider and footer. Check mobile and WebKit for loaded/decoded images, no horizontal overflow, copy-first order and working article/Fresh Yarn/About links. Offscreen images may need scrolling into view before screenshot capture; a loaded naturalWidth alone does not guarantee paint. Do not submit the contact form during checks.
