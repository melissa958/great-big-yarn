# Hero transition comparison

Draft-only comparison at previews/hero-transitions.html. The homepage is unchanged. This snapshot retains the current hero, approved eleven-ribbon Yarn color fields +60%, paper reading veil and grain, all copy, and later sections.

Query options:
- transition=feather: the hero's hard lower edge becomes a broad feather as the visitor scrolls.
- transition=bloom (default): a duplicate of the original color-field artwork gradually appears behind the hero while the scribble recedes and the glass surface softens. The feather joins the two sections.
- transition=dissolve: the hero and scribble fade during ordinary scrolling, allowing Section 2 to emerge underneath.

All use native scrolling and the original curtain geometry. A draft-only comparison bar switches treatments and returns to the top. No scroll interception, wheel/touch capture, smooth-scroll library, idle JavaScript frame loop or homepage promotion. Existing Section 3 and studio/testimonial curtains remain untouched.

The controller uses one requested frame per scroll/resize/visibility change, and updates only draft styles. The duplicated artwork runs only for the visible bloom handoff, honors the hero Pause control and stops offscreen, under reduced motion and in a hidden tab. Reduced motion and no JavaScript fall back to the original readable flow. Keyboard focus exposes Section 2 copy immediately. Preserve the original grain .52 opacity and paper pseudo-element selectors.

Validated local references/assets and compared intermediate desktop/mobile frames in Edge and WebKit, full reveal, backward reset, mode controls, overflow and reduced-motion/no-JavaScript fallbacks. Preview-specific files are hero-transition-preview.css and hero-transition-preview.js.
