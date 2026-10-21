# Section 2: animated color studies

Preview: `previews/color-studies.html?art=pigment#color-study`.

The owner requested several experimental backgrounds for the second homepage section, using supplied abstract-art references as inspiration, with the cat removed. This is a separate, full-page preview. The published homepage and earlier previews remain unchanged.

## Four directions

- **03 Moving planes** (`art=planes`): GBY Blazing Flame, Blush Pop, Bright Amber and Laser Blue edge bars, with an Emerald hairline, slowly slide around the site's calm paper field (`#F4ECDC`). Inspired by the Knoebel references, it gives the typography the quietest background.
- **04 Stained color** (`art=stains`): original irregular SVG washes using GBY Blush Pop, Bright Amber, Turquoise and Violet, with a Blazing Flame line. Translucent shapes drift and overlap around the same paper center (`#F4ECDC`), exploring the Frankenthaler direction.
- **05 Pigment pools** (`art=pigment`, default): eight irregular, softly blurred pools using the exact GBY palette collect and overlap around an open paper reading area. Different phases, scales and 22–34-second movements suggest a working surface whose color remains unresolved. Stronger grain responds to the owner's latest soft-pigment reference.
- **06 Dispersion** (`art=dispersion`): eleven translucent vertical ribbons stretch, drift and blend through different color sequences, responding to the owner's subsequent vertical-dispersion reference. The owner requested slightly faster motion: `--dispersion-speed: 1.3` divides the original 24–36-second cycles and their phase offsets, making movement 30% faster (about 18.5–27.7-second loops) while preserving the initial composition. Grain is stronger and the paper center remains quiet.

The owner explicitly requested keeping directions 3 and 4 unchanged while removing 1 and 2. Their HTML geometry, palette and motion CSS were compared byte-for-byte before publishing. The new references refined the proposed working-canvas direction into 5 and 6. Directions 1 and 2 are removed from the selector, HTML and CSS. Old query links fall back to Pigment pools. The main homepage remains unchanged.

No reference paintings or attachment images are published or used as backgrounds. All compositions are original CSS/SVG geometry with a 9,192-byte neutral grain tile generated once locally. No external animation libraries, remote runtime dependencies or continuous JavaScript rendering loop are needed.

## Preview behavior

The lower comparison toolbar selects one treatment at a time and has a separate Pause/Resume control. It updates the `art` query parameter so each direction has a shareable link. These are temporary review controls, not part of the homepage design. They appear only while Section 2 is uncovered and visible. The existing hero Pause control keeps its original scope.

The cat, yarn, speech bubble, cat controller and cat-only stylesheet references are removed from this preview. The heading, paragraphs, scroll-forth copy, existing fonts, hero and subsequent sections are preserved. The copy/footer group is centered in ordinary flex flow without reserving the former cat slot.

The animation runs only for the selected visible layer, pauses behind the hero curtain, offscreen, when explicitly paused, or when the browser tab is hidden. Reduced motion shows a static composition, disables motion controls and keeps all four choices available. Without JavaScript, Pigment pools remains static and the preview toolbar is hidden. Scrolling and both earlier curtain reveals remain native.

Mobile uses 24px content gutters, a more compact selector and bottom clearance so the toolbar can coexist with the copy. Long sections scroll naturally.

Files: `site/previews/color-studies.html`, `site/styles/color-studies.css`, `site/scripts/color-studies.js`, `site/assets/images/color-studies/grain.webp`.

## Tuning

Each treatment has a dedicated CSS block containing its colors, shape geometry, keyframe poses and slow looping durations. CSS `.art-running` gates all motion. The controller contains the four human-readable names, URL selection and visibility/pause logic. No changes should be promoted to `site/index.html` until the owner chooses a direction.
