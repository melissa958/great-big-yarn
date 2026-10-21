# Section 2: Dispersion motion comparison

Preview: `previews/color-studies.html?art=dispersion#color-study`.

The owner chose Dispersion from the abstract-art experiments and requested removing every other study. The separate full-page preview now compares two speeds and a mouse-driven treatment of the same grainy GBY composition, with the cat removed. On October 20, the owner approved Dispersion +60% for the main homepage. Earlier standalone previews remain available.

## Three treatments

- **Dispersion +30%** (`art=dispersion`, default): the previously reviewed speed. The original 24–36-second loops run at approximately 18.5–27.7 seconds (speed multiplier 1.3).
- **Dispersion +60%** (`art=dispersion-fast`): 60% faster than the original, approximately 15–22.5-second loops (multiplier 1.6). This is about 23% faster than the +30% example, allowing a meaningful comparison without a large jump.

- **Mouse mix** (`art=dispersion-mix`): no autonomous motion. A mouse or hovering pen stretches, shifts and widens nearby ribbons along its path, blending their colors. The result stays where the visitor leaves it, with no inertia, reset tween or idle loop. The two timed examples are preserved.

All three examples share eleven vertical ribbons, exact GBY color tokens, translucent blending, static grain, original keyframes and a calm #F4ECDC reading center. Their durations and negative phase offsets are divided by the multiplier, keeping their initial composition identical. Moving planes, Stained color and Pigment pools are removed from the selector, HTML and CSS. Old study URLs fall back to Dispersion +30% and are canonicalized.

No reference paintings or attachment images are published or used as backgrounds. The composition uses original CSS geometry and a 9,192-byte neutral grain tile generated once locally. No animation library or continuous JavaScript rendering loop is needed.

## Preview behavior

The lower toolbar selects one treatment at a time and has an independent Pause/Resume control. The art query parameter supplies shareable links. These are temporary review controls, visible only while Section 2 is uncovered and on screen. The existing hero Pause control retains its scope.

The preview preserves the original heading, paragraphs, scroll-forth link, fonts, hero and later sections. The copy group is centered in normal flex flow without reserving the former cat slot. Motion pauses when covered by the hero, offscreen, explicitly paused, or in a hidden browser tab. Reduced motion shows a static composition, disables Pause and keeps all three choices available. Without JavaScript, Dispersion +30% is static and the toolbar is hidden. Scrolling and curtain reveals remain native.

Mobile keeps 24px content gutters, a compact selector and bottom clearance. Long sections scroll naturally; the paper veil is stronger for legibility.

Files: `site/previews/color-studies.html`, `site/styles/color-studies.css`, `site/scripts/color-studies.js`, `site/assets/images/color-studies/grain.webp`.

## Tuning

`--dispersion-speed` controls the speed ratio for each .art-dispersion layer. Shared ribbon rules contain colors, geometry, keyframes and original cycle lengths. The .art-running class gates only the two timed treatments. Mouse mix uses eleven small ribbon wrappers around the same paused CSS composition, preserving its initial geometry and color phases. A passive pointermove handler coalesces writes into one requested frame per movement burst. A horizontal proximity falloff changes only nearby ribbons, with bounded translation, skew and widening; multiply blending preserves overlapping colors. No work is scheduled while the pointer is idle. Scroll/resize refresh cached geometry and clear the pending stroke; leave, cancel, Pause, selection changes, reduced motion and hidden/offscreen states clear pending input. Touch input never stirs or captures gestures, and no preventDefault is used. Touch-only, reduced-motion and no-JavaScript visitors see a static pattern. On hybrid laptops, any-hover/any-pointer media queries preserve mouse support while ignoring touch events. Reduced-motion or pointer capability changes reset accumulated deformation. The preview controller handles the treatment labels, URL selection and visibility/pause logic.

## Approved homepage promotion

The homepage now uses only Dispersion +60%, with no cat and no comparison toolbar or mouse interaction. The eleven ribbons, exact palette, paper veil, grain, responsive typography, copy and native curtain sequence match the approved treatment. The shared artwork and layout are in `site/styles/dispersion.css`, loaded directly by both pages so build-time cache hashes cover it. `color-studies.css` retains only comparison controls and mouse-mixing wrappers.

The production controller `site/scripts/dispersion.js` has no continuous rendering loop: it gates CSS motion on visibility, curtain coverage, reduced motion and document visibility. A small Pause/Resume button belongs to Section 2 independently of the existing hero Pause. It hides until the hero has completely scrolled away (hero bottom <= 1px, allowing fractional scroll rounding), and hides offscreen or under reduced motion. The hero control hides at that same boundary, preventing duplicate controls during the curtain reveal. Both homepage controls share the paper pill style, 999px radius, 13px type, 44px minimum height and focus/hover treatment; their pause states remain independent. No JavaScript means a static composition and hidden control. A direct #color-study URL uncovers the section at the hero boundary and sets focus.

Only toolbar-reserved bottom clearance is removed on the homepage (100px desktop, 80px mobile). Existing generous copy spacing remains. The separate comparison preview retains its reserved control space. All later homepage sections and standalone previews are preserved.
