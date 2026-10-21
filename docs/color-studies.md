# Section 2: animated color studies

Preview: `previews/color-studies.html?art=fields#color-study`.

The owner requested several experimental backgrounds for the second homepage section, using supplied abstract-art references as inspiration, with the cat removed. This is a separate, full-page preview. The published homepage and earlier previews remain unchanged.

## Four directions

- **Color fields** (`art=fields`): feathered apricot, blush and turquoise bands, with a violet edge. Broad bands breathe slowly and independently, suggesting layered pigment and the supplied Rothko references.
- **Nested color** (`art=squares`): off-center squares in amber, peach and cream, with a fine outline. Scale, position and subtle color relationships shift over 40–56-second loops, taking a geometric direction from the Albers references. The square is framed more tightly on phones so the nesting remains visible.
- **Moving planes** (`art=planes`): GBY Blazing Flame, Blush Pop, Bright Amber and Laser Blue edge bars, with an Emerald hairline, slowly slide around the site's calm paper field (`#F4ECDC`). Inspired by the Knoebel references, it gives the typography the quietest background.
- **Stained color** (`art=stains`): original irregular SVG washes using GBY Blush Pop, Bright Amber, Turquoise and Violet, with a Blazing Flame line. Translucent shapes drift and overlap around the same paper center (`#F4ECDC`), exploring the Frankenthaler direction.

The owner selected directions 3 and 4 for further exploration and requested the GBY palette with the existing off-white center. Both now reuse the exact shared brand tokens. Stains retain translucent layering; Violet opacity is .85. Directions 1 and 2, motion, geometry, copy and the main homepage remain unchanged.

No reference paintings or attachment images are published or used as backgrounds. All compositions are original CSS/SVG geometry with a 9,192-byte neutral grain tile generated once locally. No external animation libraries, remote runtime dependencies or continuous JavaScript rendering loop are needed.

## Preview behavior

The lower comparison toolbar selects one treatment at a time and has a separate Pause/Resume control. It updates the `art` query parameter so each direction has a shareable link. These are temporary review controls, not part of the homepage design. They appear only while Section 2 is uncovered and visible. The existing hero Pause control keeps its original scope.

The cat, yarn, speech bubble, cat controller and cat-only stylesheet references are removed from this preview. The heading, paragraphs, scroll-forth copy, existing fonts, hero and subsequent sections are preserved. The copy/footer group is centered in ordinary flex flow without reserving the former cat slot.

The animation runs only for the selected visible layer, pauses behind the hero curtain, offscreen, when explicitly paused, or when the browser tab is hidden. Reduced motion shows a static composition, disables motion controls and keeps all four choices available. Without JavaScript, the first composition remains static and the preview toolbar is hidden. Scrolling and both earlier curtain reveals remain native.

Mobile uses 24px content gutters, a more compact selector and bottom clearance so the toolbar can coexist with the copy. Long sections scroll naturally.

Files: `site/previews/color-studies.html`, `site/styles/color-studies.css`, `site/scripts/color-studies.js`, `site/assets/images/color-studies/grain.webp`.

## Tuning

Each treatment has a dedicated CSS block containing its colors, shape geometry, keyframe poses and 32–56-second durations. CSS `.art-running` gates all motion. The controller contains the four human-readable names, URL selection and visibility/pause logic. No changes should be promoted to `site/index.html` until the owner chooses a direction.
