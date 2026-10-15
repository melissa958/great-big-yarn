# Great Big Yarn

A progressively built brand and content website, using approved Figma designs.

- Repository: https://github.com/melissa958/great-big-yarn
- Live Pages address: https://melissa958.github.io/great-big-yarn/
- Design: https://www.figma.com/design/oIV91BuTH2ouyVi5pHCDDv/Brand-Assets?node-id=143-3846
- Stack: semantic HTML and CSS, self-hosted fonts, and minimal JavaScript for the scribble loop; static artwork remains available without JavaScript.

## Project layout

`site/` contains the publishable website. `site/styles/main.css` holds the reusable design tokens and responsive styles. `site/assets/` contains the original Figma artwork and licensed fonts. `scripts/validate.mjs` checks local references, empty assets, basic HTML requirements, and temporary development markers.

`scripts/build.mjs` copies `site/` into an ignored `dist/` directory and versions local stylesheet and script URLs on every HTML page using content hashes. Only `dist/` is uploaded to Pages. Project documentation and workflow files are not part of the deployed site. The build uses only Node.js built-ins; no dependency installation is needed.

## Publishing

The account's GitHub Free plan cannot host Pages from a private repository. On October 9, 2026, the owner explicitly authorized a public repository to use GitHub Pages. This replaces the original private-repository requirement.

**Settings → Pages → Build and deployment → Source → GitHub Actions** is configured. Push small completed changes to `main`; the **Validate and publish website** workflow validates the website, prepares `dist/`, and deploys only after validation and preparation pass. Pull requests validate and prepare without deploying. A failed validation leaves the prior deployment in place.

No local development server is needed. Run the lightweight check with:

```sh
node scripts/validate.mjs
```

Review the Actions result and deployed website after each push. Do not assume a successful push means publishing succeeded. GitHub Actions provides the actual deployment URL. To undo a published change, revert its commit and push the revert; do not force push.

## Current homepage — October 14, 2026

After confirming that the optimized preview loads perfectly on her iPhone, the owner selected the **frosted hero and curtain reveal** page as the main homepage. It preserves the approved preview exactly: oversized scribbles behind the frosted copy, staggered page-load entrances, a curtain reveal into the second section, and the 55-second yellow / blush / violet / turquoise background cycle. Red opens the scribble loop, blue finishes it, and only blue is lowered by 75 CSS pixels.

The homepage includes the mobile hamburger menu, full-height mobile artwork, and the cached-grain canvas renderer that the owner confirmed performs well on her iPhone with Chrome. Pause/Resume controls the animations; keyboard users can access content immediately. Reduced-motion and JavaScript-disabled visitors retain static artwork and readable content. The page retains the original title and description and is indexable. Preview pages remain available separately for comparison and retain their `noindex` metadata.

Navigation and the contact button remain inactive until their approved page designs are ready. Tablet and mobile retain the selected preview's responsive layout. Relative asset paths work at the GitHub Pages project subpath and at a future domain root.

Following the owner's large-desktop refinement, at viewport widths of 1920px and above the frosted panel has the same 1320px maximum width and outer gutters as the header/navigation. Paragraphs in both the hero and second section use 20px type at those widths. The hero copy has an 890px maximum width so its continuous paragraph fits on two lines. Smaller desktop/laptop, tablet, and phone layouts retain their existing panel sizing, body font sizes, and copy constrained by available space.

The subsequent Romie update follows the ready frame `126:2868`: mixed-case Romie Bold (700) for both headings, Romie Bold Italic (700) for “wonderful place,” and Figma's alternate letterform settings on “messy.” The desktop hero heading is 105px with three lines; the second-section heading is 65px with two lines. Responsive sizes and natural wrapping fit smaller panels. Hero supporting copy now has an 890px maximum width, constrained by the panel's available space. The owner confirmed that its two sentences should flow continuously, replacing the earlier forced break. The second-section paragraph also retains the owner's continuous wording. Body copy remains Be Vietnam Light, with Be Vietnam SemiBold Italic on “live.”

The two Romie WOFF2 files were supplied by the owner and are self-hosted unchanged. They are separate from the Be Vietnam fonts and are not covered by the Be Vietnam SIL Open Font License. Both heading font faces are preloaded on the homepage and curtain preview. The approved artwork, drawing timing, curtain behavior, 55-second palette cycle, and mobile rendering remain unchanged.

On October 15, the owner added the eyebrow “For the nerds and doers in energy and tech,” then refined its styling in replacement Figma frame `143:3846`. The homepage and curtain preview show it in a transparent rectangular label above the headline: 334 × 36px on desktop, a 1px black dashed border, and Be Vietnam Semibold (600) at 11px, uppercase with 0.99px tracking. The exact normal Semibold font is self-hosted from the Google Fonts Be Vietnam v10 distribution under the included Be Vietnam license. At 1440px, the label starts at y=220, the headline at y=280, and the supporting copy at y=614, matching Figma. The panel's 625px minimum height and spacing accommodate the addition while retaining the previously approved responsive widths. On phones, the label is constrained to the available content width and its text wraps. It joins the existing entrance, pause, keyboard, and reduced-motion behavior.

## Original hero and approved adaptations (historical)

- The desktop hero is the only supplied, ready design.
- Original background texture and all four logo layers are downloaded from Figma.
- Original **Be Vietnam** Light, Medium, Bold, and ExtraBold font files are self-hosted, not replaced with Be Vietnam Pro. Files were obtained from Google Fonts' Be Vietnam v10 distribution; the upstream SIL Open Font License and author notice are included in `site/assets/fonts/`.
- The owner approved changing the two hero supporting paragraphs to **Be Vietnam Light (300)** and supplied the current first-person wording. The page description uses the same wording.
- `Projecrs` was corrected to `Projects` with the owner's approval.
- Approach, Projects, About, and Insights are intentionally inactive text until their pages are designed.
- The owner approved keeping **Let's chat** visible but disabled until a contact-page design is ready. There is no contact form or submission service yet.
- On tablets, navigation moves to a second row. On phones, the heading uses additional lines and the panel's height follows its content.
- Desktop panels are centered horizontally and vertically in the browser viewport. Symmetric padding reserves room for the header; shorter windows scroll without overlapping the header. Tablet and phone placement remains unchanged.
- Above 1440px, a shared fluid unit grows the panel, headline, supporting copy, spacing, corner radius, and backdrop blur proportionally. Following the owner's feedback, growth is gentler: 1.5× at 2560px, capped at 1.65× on wider screens. The 1440px panel and typography retain their original dimensions. Header spacing and the artwork crop use their established desktop scaling independently.
- Following the owner's October 13 feedback, the background artwork is displayed at 85% of its previous size around the same center, revealing more of the yarn on desktop, tablet, and phone layouts. The original image and its proportions are preserved.
- Relative asset paths support the repository subpath and a future custom-domain root.

## Review checklist

Compare the published page to the 1440px Figma desktop frame. Also inspect tablet, 390px phone, and 320px narrow layouts, plus browser zoom. Verify no horizontal scrolling or clipped text, all five images and four font weights load, and the skip link and home link work with the keyboard. Confirm inactive navigation and contact behavior is intentional.

Static validation does not establish visual fidelity or accessibility compliance. Record only checks actually performed.

### Verified October 9, 2026

- The first GitHub Actions validation and deployment jobs succeeded.
- The live desktop rendering was compared with the Figma reference at 1440 × 1192.
- Phone layouts at 320 × 700 and 390 × 844 and a tablet layout at 768 × 1024 were inspected; page and headline measurements showed no horizontal overflow.
- All five artwork files and the 500, 700, and 800 font weights loaded on the live site.
- Keyboard Tab revealed the skip link; Enter moved focus to the main content. The logo navigated to the homepage under the correct repository subpath.
- The contact button is disabled and the four unfinished navigation labels have no destinations, as approved. No console errors or warnings were reported during review.
- Browser zoom and other browser engines have not been verified.

### Large-screen update verified October 9, 2026

- Static validation and the production build passed; GitHub Actions deployed commit `e172915` successfully.
- Live layouts were inspected at 1440 × 900, 1920 × 1080, 2560 × 1440, and 3840 × 2160, plus 768 × 1024, 390 × 844, and 320 × 700. None had horizontal overflow.
- At 1440px the panel remains approximately 1133 × 570px, with a 116px headline and 20px supporting copy. Its vertical placement is now centered.
- The initial 2560 × 1440 pass used a 2015 × 1013px panel. The owner subsequently requested more breathing room; the revised target is approximately 1700 × 855px, centered at (1280, 720), with a 174px headline and 30px supporting copy.
- A 1440 × 600 window scrolls to fit the hero while keeping it below the header. All five images and three font weights loaded; the keyboard skip link moved focus to main content. No browser errors or warnings were reported.
- After reviewing a second preview inspired by https://noho.ink/, the owner selected the **Noho-inspired reveal**, replacing **MESSY settles**. The CSS-only entrance opens with a blue curtain lifting away, the header and panel rise into place, headline lines reveal through masks, and Medium supporting copy follows. The sequence finishes in 2.05 seconds and plays once per page load. Reduced-motion visitors see the static hero immediately; keyboard focus clears the curtain, and the skip link bypasses delayed content. Headline and supporting-copy fonts are preloaded. The final sizing, centering, original assets, and text are preserved.

## Hero experiments — October 13, 2026

Two separate preview pages implement the owner's updated Figma ideas. The owner subsequently selected the After scroll layout for the homepage:

- [Scribble in the hero](https://melissa958.github.io/great-big-yarn/previews/hero-inline.html), based on Desktop - New Version 2 (`100:1669`). Following the owner's size correction, the artwork uses Figma's large overlapping crop: a 1244 × 1171px stage at x=460 / y=-132 on a 1440px desktop, extending past the right screen edge behind the left-aligned copy. On tablets and phones, the scribble stacks after the copy at 180% of the viewport width, with both sides cropped.
- [Scribble after the hero](https://melissa958.github.io/great-big-yarn/previews/hero-scroll.html), based on Desktop - New Version 1 (`95:43`). The copy is centered; following the owner's spacing feedback, the scribble starts directly after the copy with a slight 16px overlap, with the copy layered above the artwork. Each gesture's empty top margin is cropped to its ink bounds and the static fallback is aligned to the top of its stage. Artwork is 140.38% of the page width, matching Figma's approximately 2021px-wide gesture on a 1440px canvas, and 190% on phones. Both edges extend beyond the screen. The unused blank remainder of the Figma canvas is not implemented as a new section.

Both use the Figma paper color `#f4ecdc`, black original logo layers, black text, and the black button with white copy. The headline uses the actual Be Vietnam Pro Light (300) font from the updated Figma, self-hosted with its license; supporting copy retains Be Vietnam Light (300). As requested, “I learn how your company works…” begins on a new line in both preview paragraphs. Desktop type is capped at the Figma size rather than continuing the original homepage's large-screen scaling.

The animated experiment uses six newly authored continuous vector gestures, informed by the owner's Cy Twombly reference. Both previews now run in this order: Blazing Flame (red), Emerald, Turquoise, Violet, Bright Amber, and Laser Blue. Blue retains its broad, open loops and a line length comparable to red and green, giving it a similar drawing pace within the shared timing. Only blue is shifted 75 CSS pixels down to avoid overlapping the copy. The other gestures retain their exact shapes, positions, and timing. The textured lines draw for 2.4 seconds, hold for 1.6 seconds, erase for 1.8 seconds, and leave a 0.3-second gap before the next gesture. The full loop lasts 36.6 seconds. Animation pauses when outside the viewport or the tab is hidden. Reduced-motion and JavaScript-disabled visitors see the original Figma vector scribble instead.

The preview controls allow layout switching, pause/resume, and advancing to the next scribble. They are comparison controls for these test pages. Navigation labels and the contact button remain inactive until their approved page designs are ready. Preview pages are marked `noindex`.

The enlarged artwork is clipped at the page boundaries, so its intentional cropping does not introduce horizontal scrolling. Static reduced-motion and JavaScript-disabled artwork uses the same oversized treatment.

## Frosted hero and curtain preview — October 14, 2026

[Separate preview](https://melissa958.github.io/great-big-yarn/previews/hero-curtain.html) implements the owner's updated Desktop - New Version 1 frame (`95:43`), including the new second section (`116:2493`). This was introduced as a separate experiment; the owner subsequently approved it as the homepage. This preview remains marked `noindex` and uses its own stylesheet and controller while reusing the approved scribble loop.

The scribbles now sit behind the hero copy. At 1440px, the frosted panel is approximately 1086 × 611px at x=177 / y=176, with Figma's 32% white fill, 21.226px backdrop blur, and 18.097px corner radius. The original violet Figma vector is the static fallback. The existing red-first, blue-last animated loop retains its shapes, timing, and blue-only 75px offset.

The hero scrolls upward over a sticky second section, revealing it from underneath without intercepting scrolling. The section originally used a Be Vietnam Pro Light heading; the subsequent Romie update is described above. It retains the supplied copy, Be Vietnam Light body, and Be Vietnam SemiBold Italic emphasis on “live.” The Be Vietnam italic font is self-hosted under its existing license.

The second section begins yellow and transitions gradually through Blush Pop, Violet, and Turquoise in a 55-second cycle. Color changes run only while the section is revealed and the tab is visible. Pause/Resume controls both animations. Reduced-motion visitors see static violet artwork, a static yellow second section, and ordinary sequential scrolling. Without JavaScript, static artwork and the native CSS curtain reveal remain available.

Responsive adaptations: the glass panel follows its content on tablets and phones, typography wraps, and artwork remains oversized. The second section expands to at least the viewport height for the reveal and grows further where its text needs room; shorter windows can continue scrolling to read all of it. Large screens center the glass panel without growing the hero beyond the larger of the Figma height and viewport height.

The preview also has one-time load entrances: logo and navigation stagger in, the glass panel gently rises and settles, and the headline and two supporting paragraphs follow. The sequence finishes within 1.51 seconds. Second-section headings and paragraphs fade upward only after the curtain uncovers their actual positions, with a small stagger between paragraphs. Entrances remain completed when scrolling back. Pause/Resume also controls these animations; keyboard focus exposes content immediately, and reduced-motion visitors see content without entrances. These approved entrances now also run on the main homepage.

Below 600px, the scribbles cover the full hero height with proportional cropping at the sides. Each animated gesture is framed to its ink bounds, with extra coverage preserving the blue-only 75px offset; static artwork is scaled through its wrapper. A hamburger button opens the four existing navigation labels and the disabled Let's chat button in a compact panel. It supports Space/Enter, Escape with focus return, outside clicks, and resets when crossing the desktop breakpoint. Without JavaScript, the navigation remains visible. Desktop artwork and navigation retain their existing layout.

For mobile performance, the preview paints the same SVG paths and draw/erase progress into a canvas limited to 1.5× pixel density. A preloaded 128px grain tile supplies cached texture instead of recalculating the large SVG noise/displacement filter every frame. The bitmap is bounded to the visible hero width and skips redraws during unchanged hold/blank states. Path data, order, timing, blue offset, full-height coverage, and the frosted panel are retained. Desktop keeps the original SVG texture filter. The SVG remains the animation source and a fallback if the canvas or grain cannot load; reduced-motion/no-JavaScript visitors retain the original static Figma artwork.

Windows WebKit tests at a simulated 390 × 844 / 3× density reproduced long stalls with the previous SVG filter, while the bounded canvas avoided those stalls. Edge checks also passed. These are browser-engine checks on the desktop test machine. The owner subsequently confirmed that the optimized page looks great and loads perfectly on her iPhone with Chrome.

Local validation, production build, and Edge browser checks passed at 1440 × 900, 1440 × 1196, 2560 × 1440, 768 × 1024, 390 × 844, 320 × 700, and 1440 × 600. Checks covered panel geometry, native curtain movement, palette states, pausing, asset and font loading, keyboard skip navigation, reduced motion, no-JavaScript fallback, and horizontal overflow. Other browser engines remain unverified.

## Second-section fish and footer eyebrow — October 15, 2026

The bottom of the second section follows the updated Figma `143:4253`: a 459 × 36px dashed eyebrow reading “SO, HOW DO WE WORK TOGETHER? GREAT QUESTION! SCROLL FORTH.” The owner approved correcting Figma's original typo and subsequently added “SCROLL FORTH.” The fish's 117 × 69px home is to its left: center x = section center − 306.5px, center y = section bottom − 130.5px (x=355, y=671 in Figma's 1440 × 836 frame). Both are overlays within the existing section padding, leaving the heading, body layout, and section height unchanged. Tablet and phone placements use the existing smaller bottom padding; below 760px the fish is 84px wide beside a wrapping label.

`site/assets/images/editorial-fish.svg` is a transparent vector recreation of the fish illustration in Figma, with separate body, tail, and fin groups. It retains the rounded irregular black silhouette, cream eye, smile, and simplified cream fin/tail markings. `site/styles/section-fish.css` provides the overlay, dashed footer label, and HTML speech bubble. `site/scripts/section-fish.js` has one `FISH_CONFIG` section for fish size, colors, home position, swimming speed, following distance, bob/turn/tail movement, and bubble timing.

Fine-pointer visitors can attract the fish while their pointer is within the section. Time-based movement uses gentle acceleration and slowing, ignores small pointer movements, and routes around the copy and footer label. It returns home after the pointer leaves. The bubble appears when the pointer enters a small invisible hover area around the fish, and lasts about 5 seconds including fades. It finishes speaking if the pointer moves away. A 2.5-second cooldown after each saying and an exit buffer prevent repeated restarts while the pointer lingers or the fish bobs; leaving and returning reveals the next saying. Hover padding, exit buffer, and cooldown are configurable alongside the other bubble settings. Its real HTML text cycles through “just keep scrolling,” “it’s murky in the middle,” and “we’ll find our way”; this list is editable in `FISH_CONFIG.bubble.sayings`. Text wraps naturally. Placement stays on the same side until that side cannot fit safely; unsafe bubbles are hidden rather than covering text or the fish's face. Geometry is cached on layout/scroll changes; swimming frames only update transforms and opacity, with a one-time HTML text update per bubble appearance. Offscreen, hidden-tab, and global Pause states stop movement and bubble time. Touch, reduced-motion, and JavaScript-disabled visitors retain a static fish without a bubble. Both fish and bubble are decorative and cannot receive pointer interactions.

The fish update was checked in Edge for cursor following, obstacle clearance, return-home motion, bubble placement, pausing, reduced motion, and overflow from 320px phones through desktop. Controlled-clock checks covered hover activation, all three sayings, the five-second duration, cooldown, held-hover suppression, click-through behavior, and paused time for offscreen and hidden-tab signals. WebKit checks confirmed the static SVG on simulated touch and with JavaScript disabled. Comparison against the prior homepage confirmed unchanged section height and main content geometry at desktop, short-desktop, and phone sizes.

## Future work

Implement new sections and pages only when their designs are supplied. Replace inactive navigation with real destinations as those pages become available. Connect the custom domain only when explicitly requested; DNS and custom-domain settings have not been configured.
