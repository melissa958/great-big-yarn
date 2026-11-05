# Hero sizing refresh — November 5, 2026

Source: Figma Brand Assets, Website 59:2 → New Homepage 303:673. The requested work is limited to the hero and its following introductory paragraph.

## Desktop

- Headline 303:674: Romie Bold 100px, 1.06 line height, 1213px maximum, three supplied lines. At 1440px its top is 252px and its height is 318px.
- Supporting copy 303:675: existing exact copy and Samwise/Hermione tooltips, 22px Light, 997px maximum, top 607px.
- Photo group 304:759: 1320×863 at x60/y748 in the 1440px frame. Office 304:760 and desk portrait 304:761 occupy equal 660×863 halves. Outer corners use 18.154px rounding; the inner seam is square. No overlap or shadow.
- Intro paragraph 303:737: existing copy and big-ears tooltip, 22px Light/1.55, 1047px maximum, top 1701px. Buttons remain the existing destinations and sit 70px below the paragraph.

Both current homepage sources share homepage-refresh.css. The larger heading is scoped to .refresh-intro; shared contact and case-study heading typography remains unchanged.

## Assets

The two original image assets were downloaded from the Figma context into ignored QA inputs and optimized as local WebPs. Office: hero-office-pair-400/-800 (original 800×1066). Portrait: hero-melissa-desk-360/-1024 (original 1024×768). The supplied portrait asset is already proportioned for Figma's fill sizing; preserve the specified fill behavior in the tall slot to match the reference. Keep the small edge overscan inside the clipped frame. No temporary Figma URLs are used at runtime. Older hero assets remain available for retained history/previews.

## Responsive behavior and verification

The image pair scales together at its 1320/863 ratio, retaining the equal halves on tablet and phone. Below 1200px, headline lines wrap naturally, paragraph type returns to 16px and existing smaller-screen spacing applies. Below 700px, retain the existing 40–58px headline and 18px supporting copy, with 12px outer photo corners.

Edge checks at 1440, 1920, 1024, 768 and 390px confirmed matching desktop geometry, loaded local image sources and no horizontal overflow. Desktop and phone screenshots were reviewed against the Figma reference. Validation and the versioned dist build are required before publishing.
