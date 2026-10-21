# Section 2: Dispersion speed comparison

Preview: `previews/color-studies.html?art=dispersion#color-study`.

The owner chose Dispersion from the abstract-art experiments and requested removing every other study. The separate full-page preview now compares two speeds of the same grainy GBY composition, with the cat removed. The main homepage and earlier previews remain unchanged.

## Two speeds

- **Dispersion +30%** (`art=dispersion`, default): the previously reviewed speed. The original 24–36-second loops run at approximately 18.5–27.7 seconds (speed multiplier 1.3).
- **Dispersion +60%** (`art=dispersion-fast`): 60% faster than the original, approximately 15–22.5-second loops (multiplier 1.6). This is about 23% faster than the +30% example, allowing a meaningful comparison without a large jump.

Both examples share eleven vertical ribbons, exact GBY color tokens, translucent blending, static grain, original keyframes and a calm #F4ECDC reading center. Their durations and negative phase offsets are divided by the multiplier, keeping their initial composition identical. Moving planes, Stained color and Pigment pools are removed from the selector, HTML and CSS. Old study URLs fall back to Dispersion +30% and are canonicalized.

No reference paintings or attachment images are published or used as backgrounds. The composition uses original CSS geometry and a 9,192-byte neutral grain tile generated once locally. No animation library or continuous JavaScript rendering loop is needed.

## Preview behavior

The lower toolbar selects one speed at a time and has an independent Pause/Resume control. The art query parameter supplies shareable links. These are temporary review controls, visible only while Section 2 is uncovered and on screen. The existing hero Pause control retains its scope.

The preview preserves the original heading, paragraphs, scroll-forth link, fonts, hero and later sections. The copy group is centered in normal flex flow without reserving the former cat slot. Motion pauses when covered by the hero, offscreen, explicitly paused, or in a hidden browser tab. Reduced motion shows a static composition, disables Pause and keeps both choices available. Without JavaScript, Dispersion +30% is static and the toolbar is hidden. Scrolling and curtain reveals remain native.

Mobile keeps 24px content gutters, a compact selector and bottom clearance. Long sections scroll naturally; the paper veil is stronger for legibility.

Files: `site/previews/color-studies.html`, `site/styles/color-studies.css`, `site/scripts/color-studies.js`, `site/assets/images/color-studies/grain.webp`.

## Tuning

`--dispersion-speed` controls the speed ratio for each .art-dispersion layer. Shared ribbon rules contain colors, geometry, keyframes and original cycle lengths. The .art-running class gates active motion. The controller handles the two speed labels, URL selection and visibility/pause logic. Keep this as a preview until the owner requests promotion to `site/index.html`.
