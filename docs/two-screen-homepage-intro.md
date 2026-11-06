# Two-screen homepage opening

Requested November 6, 2026, on the current homepage and retained homepage-refresh preview.

## Flow

1. The navigation remains in normal flow. The first .refresh-intro contains only the existing h1 and short supporting paragraph with the Samwise/Hermione notes. Its minimum height is the viewport minus the measured header space, centering the text in the area below navigation. The previous Creative direction & strategy eyebrow is omitted to match the request for heading/copy only.
2. A separate #introduction section follows, containing the unchanged office/portrait pair, full studio paragraph and big-ears note, then the existing About and Services links. The complete group is vertically centered in a minimum viewport-height section.
3. Selected work begins immediately after this section. Scrolling is native; there is no scroll interception, forced paging, pinning or snap behavior.

## Fit and fallback

The photo pair keeps its full 1320/863 ratio, equal halves, exact local photos, rounded outer frame and portrait edge clipping. It retains the 1320px maximum below 1920px and 1600px maximum at larger widths. The actual width can be smaller because the complete group must fit the available viewport height. Paragraphs retain their existing independent type/width limits.

The homepage-refresh.js controller measures the header, paragraph and button group after font loading and on resize. It subtracts their height, margins and section padding from the section's viewport minimum to bound the photo width. ResizeObservers watch only the header and text/button groups, keeping the photo measurement independent and stable. No continuous animation loop or scroll-driven fitting is used.

Below 700px the section uses the existing phone gutters and text sizes, 32px outer padding and 24px gaps. Photos remain at least roughly 180px high when vertical space is tight, so very short screens may need a little extra natural scrolling. Short desktop windows also scale the opening headline to preserve its fit. No-JavaScript pages retain the same sequence, readable text, static artwork and working links, with the second section allowed to grow naturally. Reduced motion keeps the layout and disables existing entrance motion.

The existing one-time reveal selector includes each new introduction child. Note behavior, focus, footer artwork/Pause, Services, About, case studies and testimonials are unchanged.

Completed opening-section entrances are marked finished, including when keyboard focus enters an item. This prevents Safari's button-focus behavior from restarting a paragraph's animation while moving between tooltip controls. Other sections keep their existing entrance behavior.

## Verification

Edge geometry checks covered 1920×1080, 1440×900, 1440×700, 1024×768, 768×1024, 390×844 and 375×667. Both sections fit a screen at the normal desktop/phone sizes; the 375×667 second section grows by about 14px for readability. Desktop and mobile screenshots were visually reviewed. Samwise, Hermione and big-ears notes retain click/Escape behavior, and no-JavaScript content/links are checked separately. Validate and build before publication.

WebKit normal-motion checks at 1440×900 and 390×844 also passed the viewport sequence, overflow and all three tooltip click/Escape checks after the focus fix.
