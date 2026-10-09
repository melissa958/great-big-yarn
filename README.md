# Great Big Yarn

A progressively built brand and content website, using approved Figma designs.

- Repository: https://github.com/melissa958/great-big-yarn
- Live Pages address: https://melissa958.github.io/great-big-yarn/
- Design: https://www.figma.com/design/oIV91BuTH2ouyVi5pHCDDv/Brand-Assets?node-id=62-5
- Stack: semantic HTML and CSS, self-hosted fonts, no runtime dependencies or JavaScript required for the current hero.

## Project layout

`site/` contains the publishable website. `site/styles/main.css` holds the reusable design tokens and responsive styles. `site/assets/` contains the original Figma artwork and licensed fonts. `scripts/validate.mjs` checks local references, empty assets, basic HTML requirements, and temporary development markers.

`scripts/build.mjs` copies `site/` into an ignored `dist/` directory and versions the stylesheet URL using its content hash. Only `dist/` is uploaded to Pages. Project documentation and workflow files are not part of the deployed site. The build uses only Node.js built-ins; no dependency installation is needed.

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
- Original **Be Vietnam** Medium, Bold, and ExtraBold font files are self-hosted, not replaced with Be Vietnam Pro. Files were obtained from Google Fonts' Be Vietnam v10 distribution; the upstream SIL Open Font License and author notice are included in `site/assets/fonts/`.
- `Projecrs` was corrected to `Projects` with the owner's approval.
- Approach, Projects, About, and Insights are intentionally inactive text until their pages are designed.
- The owner approved keeping **Let's chat** visible but disabled until a contact-page design is ready. There is no contact form or submission service yet.
- On tablets, navigation moves to a second row. On phones, the heading uses additional lines and the panel's height follows its content.
- Desktop panels are centered horizontally and vertically in the browser viewport. Symmetric padding reserves room for the header; shorter windows scroll without overlapping the header. Tablet and phone placement remains unchanged.
- Above 1440px, a shared fluid unit grows the panel, headline, supporting copy, spacing, corner radius, and backdrop blur proportionally. Growth stops at a 2880px composition; the 1440px panel and typography retain their original dimensions.
- Relative asset paths support the repository subpath and a future custom-domain root.

## Review checklist

Compare the published page to the 1440px Figma desktop frame. Also inspect tablet, 390px phone, and 320px narrow layouts, plus browser zoom. Verify no horizontal scrolling or clipped text, all five images and three font weights load, and the skip link and home link work with the keyboard. Confirm inactive navigation and contact behavior is intentional.

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
- At 2560 × 1440 the panel is approximately 2015 × 1013px, centered at (1280, 720), with a 206px headline and 35.6px supporting copy.
- A 1440 × 600 window scrolls to fit the hero while keeping it below the header. All five images and three font weights loaded; the keyboard skip link moved focus to main content. No browser errors or warnings were reported.
- Entrance animation comparisons are exploratory previews outside the published site. No entrance animation is enabled on the live homepage yet.

## Future work

Implement new sections and pages only when their designs are supplied. Replace inactive navigation with real destinations as those pages become available. Connect the custom domain only when explicitly requested; DNS and custom-domain settings have not been configured.
