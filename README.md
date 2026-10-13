# Great Big Yarn

A progressively built brand and content website, using approved Figma designs.

- Repository: https://github.com/melissa958/great-big-yarn
- Live Pages address: https://melissa958.github.io/great-big-yarn/
- Design: https://www.figma.com/design/oIV91BuTH2ouyVi5pHCDDv/Brand-Assets?node-id=62-5
- Stack: semantic HTML and CSS, self-hosted fonts, no runtime dependencies or JavaScript required for the current hero.

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

## Current scope and approved adaptations

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

Two separate preview pages implement the owner's updated Figma ideas, leaving the current homepage available for comparison:

- [Scribble in the hero](https://melissa958.github.io/great-big-yarn/previews/hero-inline.html), based on Desktop - New Version 2 (`100:1669`). Following the owner's size correction, the artwork uses Figma's large overlapping crop: a 1244 × 1171px stage at x=460 / y=-132 on a 1440px desktop, extending past the right screen edge behind the left-aligned copy. On tablets and phones, the scribble stacks after the copy at 180% of the viewport width, with both sides cropped.
- [Scribble after the hero](https://melissa958.github.io/great-big-yarn/previews/hero-scroll.html), based on Desktop - New Version 1 (`95:43`). The copy is centered; following the owner's spacing feedback, the scribble starts directly after the copy with a slight 16px overlap, with the copy layered above the artwork. Each gesture's empty top margin is cropped to its ink bounds and the static fallback is aligned to the top of its stage. Artwork is 140.38% of the page width, matching Figma's approximately 2021px-wide gesture on a 1440px canvas, and 190% on phones. Both edges extend beyond the screen. The unused blank remainder of the Figma canvas is not implemented as a new section.

Both use the Figma paper color `#f4ecdc`, black original logo layers, black text, and the black button with white copy. The headline uses the actual Be Vietnam Pro Light (300) font from the updated Figma, self-hosted with its license; supporting copy retains Be Vietnam Light (300). As requested, “I learn how your company works…” begins on a new line in both preview paragraphs. Desktop type is capped at the Figma size rather than continuing the original homepage's large-screen scaling.

The animated experiment uses six newly authored continuous vector gestures, informed by the owner's Cy Twombly reference. Colors are Bright Amber, Laser Blue, Blazing Flame, Emerald, Turquoise, and Violet from the supplied palette. The textured lines draw for 2.4 seconds, hold for 1.6 seconds, erase for 1.8 seconds, and leave a 0.3-second gap before the next gesture. The full loop lasts 36.6 seconds. Animation pauses when outside the viewport or the tab is hidden. Reduced-motion and JavaScript-disabled visitors see the original Figma vector scribble instead.

The preview controls allow layout switching, pause/resume, and advancing to the next scribble. They are comparison controls for these test pages. Navigation labels and the contact button remain inactive until their approved page designs are ready. Preview pages are marked `noindex`.

The enlarged artwork is clipped at the page boundaries, so its intentional cropping does not introduce horizontal scrolling. Static reduced-motion and JavaScript-disabled artwork uses the same oversized treatment.

## Future work

Implement new sections and pages only when their designs are supplied. Replace inactive navigation with real destinations as those pages become available. Connect the custom domain only when explicitly requested; DNS and custom-domain settings have not been configured.
