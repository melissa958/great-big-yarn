# About page

Updated November 6, 2026.

The owner requested a separate About page, then removed the entire About section from the homepage and retained current homepage-refresh preview. The homepage flows directly from Services to testimonials. Do not restore the previous biography section or its arrows/More button.

## Page and copy

The current right column begins with the owner's first-person quotation about Adam Mastroianni and finding her work as a designer, with “writes” linked to the supplied Experimental History article. Its top aligns with the left heading. Use semantic blockquote markup, Romie 28px/1.4 (24px on phones), and 32px before the three biography paragraphs. The latest career paragraph begins “Melissa has worked in design for 20 years…” and includes freelance design, The Marshall Project and Caban. Preserve the exact source copy, existing light body styling, portrait and mobile order. This supersedes earlier career paragraphs below.

Latest revision: use “About Great Big Yarn” above the portrait in the left column, with three supplied paragraphs in the right column. The opening paragraph begins “Great Big Yarn is the independent studio…”; the second begins “Melissa has spent 20 years…”; the last keeps the family details and now says “for her clients.” The old eyebrow and body Let’s chat button are removed. Desktop uses a 56px heading, 32px gap above the image, and 18px/300 body with 24px paragraph spacing. Mobile retains heading, copy, then portrait. Shared header contact links remain. This supersedes the first page layout described below.

site/about/index.html provides the clean /about/ URL. It uses the existing studio heading, the two exact supplied biography paragraphs beginning “We focus on design, creative direction, and strategy…” and “These days, Melissa lives…”, and the approved about-portrait-640/-1000 WebPs. No additional biography or client claims were invented.

The page uses the shared paper background, Romie/Be Vietnam typography, header, mobile menu and footer. The headline is centered above the portrait/bio grid. Desktop places the portrait left and copy right; below 1000px copy precedes the portrait, with 16px phone body text. Let’s chat links to ../contact/. about-page.css contains the page layout; there is no carousel or page-specific JavaScript.

## Navigation

Header/footer About links, the hero’s Read more about me button, and About navigation on current contact, project and retained current preview/template pages all point to the public /about/ page with relative clean URLs. Work, Services and Kind words still use homepage sections. Logos return to the homepage without #main. Historical comparison previews retain their original local sections.

The shared homepage entrance controller handles the absent #studio as an uncovered state, keeping testimonials and other entrances functional. Original About assets/controller/styles remain available for historical previews.

## Checks

Validate local links and build versioned dist output. Check desktop/mobile in Edge and WebKit: no homepage About section or dangling #studio link, all six Services cards and three quotes retained, normal-motion testimonial entrance, desktop and full-screen mobile About navigation to /about/, biography retained, and no horizontal overflow or page errors. No contact-form submission.
