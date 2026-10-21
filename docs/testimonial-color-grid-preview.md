# Testimonial color grid draft

Preview: `previews/testimonial-color-grid.html#testimonials`.

The owner asked to retain the approved +60% Yarn color fields in Section 2 and try a static background for testimonials, inspired by a supplied softly painted color-grid reference. This is a separate full-page preview. The homepage and earlier drafts remain unchanged.

The original SVG artwork uses equal square tiles with softly varied GBY-derived tones: yellow/green across the top, blush/violet and turquoise around the middle, cooler blue below, and coral near the lower right. Color values are original mixtures of the seven GBY colors, paper and ink; the reference image is not copied or published. A subtle shared grain tile adds a paper texture. A light radial paper wash supports the heading and text contrast.

The landscape grid has 20 × 12 tiles. Below 600px a separately composed 10 × 20 portrait grid keeps the squares and color balance suited to a narrow screen, using cover sizing instead of stretching. The texture stays static. A draft-only controller loads the same SVG inline and gently shifts up to three randomly selected squares toward related GBY hues, returning each to its original fill over 7.2–8.8 seconds. New squares start roughly every 2.8–4 seconds. There is no continuous JavaScript frame loop. The bottom-right tiles graduate through blush/coral into exact GBY red #F73F12 on both compositions. Five landscape tiles and four portrait tiles in the upper yellow area use exact GBY Bright Amber #FDCE08, interspersed with the softer tones.

Preserve the existing testimonial heading, dashed eyebrow, 32%-white frosted panel, portrait, quote, attribution, four manual selections, keyboard support and studio curtain reveal. The draft adds no new copy and changes no content geometry or controller logic. Section 2 retains the original eleven ribbons, +60% speed, off-white reading veil and grain, with no quilt treatment.

Files:

- `site/previews/testimonial-color-grid.html`
- `site/styles/testimonial-color-grid.css`
- `site/scripts/testimonial-color-grid.js`
- `site/assets/images/testimonials/color-grid-landscape.svg`
- `site/assets/images/testimonials/color-grid-portrait.svg`

The SVGs remain static local fallback assets; the stylesheet and controller are scoped to this draft. A local paper-pill Pause/Resume control matches the other page controls and appears only when the studio curtain has fully cleared. Color changes pause offscreen, behind the curtain and in hidden tabs, preserving the visitor’s Pause state. Reduced motion, no JavaScript or a failed SVG load show the static pattern. Keep this separate until the owner selects a background for the homepage.
