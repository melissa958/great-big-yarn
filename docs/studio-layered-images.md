# Homepage studio image layers

Approved source: Brand Assets oIV91BuTH2ouyVi5pHCDDv, Website 59:2, Homepage 214:2, NEW Section 4 214:194.

The owner requested replacing the previous full-panel portrait with the new background (214:196, New-About-Background-Image) and centered headshot (226:2, Melissa-headshot). Both are original Figma images downloaded locally. The screenshot is a visual reference, not a production asset.

The owner subsequently replaced only background 214:196 with the yellow/pink painted texture. Match its updated Figma fill: stretch to the existing right-side slot, bottom-aligned, with no inset or overscan. The foreground occupies 411/720 of its width and has a 411/331 aspect ratio, centered in both directions. Its image uses the original Figma source crop: 138.42% width, 113.92% height, left .11%, top -6.06%. The photo has the original 7px horizontal / 6px vertical / 5.6px blur shadow at 40% black. Keeping the source uncropped allows the same composition at every breakpoint.

The latest October 27 revision adds a second image fill over the painted base within 214:196: loose blue, coral, pink and charcoal painted strokes. Preserve both original image fills, in Figma order, below the centered headshot. Both background images stretch to the same full-panel slot with bottom alignment. The added fill retains its transparency.

Local assets in site/assets/images/studio are studio-painted-background-480.webp / -768.webp, studio-expressive-overlay-480.webp / -768.webp and melissa-headshot-640.webp / -960.webp / -1440.webp / -1920.webp. These responsive WebPs preserve the supplied image content; no temporary Figma URL is published. Each background fill is optimized at 480px and its native 768px width; headshot options still range from 23KB to 84KB. Both background fills are decorative; the foreground has descriptive alternative text.

All three image layers scroll together in the original slot. Below 1000px the scene stacks beneath the copy in the existing 716/820 slot ratio. Preserve the two updated body paragraphs, heading, button, copy entrance and native studio/testimonial curtain. Keep the earlier original portrait assets for retained standalone snapshots. Styles are scoped to .studio-layered in studio-section.css; only the homepage opts in.
