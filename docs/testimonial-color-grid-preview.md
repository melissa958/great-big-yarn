# Approved testimonial color grid

Preview: `previews/testimonial-color-grid.html#testimonials`.

The owner asked to retain the approved +60% Yarn color fields in Section 2 and try a static background for testimonials, inspired by a supplied softly painted color-grid reference. On October 21, the owner approved the refined color grid and requested promotion to the homepage. The homepage now shares the artwork, styles and controller with the retained full-page preview. Earlier independent previews remain unchanged.

The original SVG artwork uses equal square tiles with softly varied GBY-derived tones: yellow/green across the top, blush/violet and turquoise around the middle, cooler blue below, and coral near the lower right. Color values are original mixtures of the seven GBY colors, paper and ink; the reference image is not copied or published. A subtle shared grain tile adds a paper texture. A light radial paper wash supports the heading and text contrast.

The landscape grid has 20 × 12 tiles. Below 600px a separately composed 10 × 20 portrait grid keeps the squares and color balance suited to a narrow screen, using cover sizing instead of stretching. The texture stays static. A shared controller loads the same SVG inline and gently shifts up to three randomly selected squares toward related GBY hues, returning each to its original fill over 7.2–8.8 seconds. New squares start roughly every 2.8–4 seconds. There is no continuous JavaScript frame loop. The bottom-right tiles graduate through blush/coral into exact GBY red #F73F12 on both compositions. The upper yellow area has one exact GBY Bright Amber #FDCE08 core on each composition. A smooth elliptical tonal falloff blends the surrounding squares through softer gold and cream into the existing green and cooler colors, preserving the painted variation instead of isolated high-contrast accents.

Preserve the existing testimonial heading, dashed eyebrow, 32%-white frosted panel, portrait, quote, attribution, four manual selections, keyboard support and studio curtain reveal. The draft adds no new copy and changes no content geometry or controller logic. Section 2 retains the original eleven ribbons, +60% speed, off-white reading veil and grain, with no quilt treatment.

Files:

- `site/index.html`
- `site/previews/testimonial-color-grid.html`
- `site/styles/testimonial-color-grid.css`
- `site/scripts/testimonial-color-grid.js`
- `site/assets/images/testimonials/color-grid-landscape.svg`
- `site/assets/images/testimonials/color-grid-portrait.svg`

The SVGs remain static local fallback assets; the stylesheet and controller are scoped to `.testimonial-color-grid` on the homepage and retained preview. The owner subsequently requested removing the testimonial Pause button; neither the homepage nor retained grid preview displays it. Color changes still pause offscreen, behind the curtain and in hidden tabs. Reduced motion, no JavaScript or a failed SVG load show the static pattern. The previous testimonial gradient remains the fallback design for other standalone previews.
