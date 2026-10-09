# Great Big Yarn project instructions

## Repository and workflow
- This folder is the local working copy. GitHub is the source of truth.
- The confirmed GitHub owner is `melissa958`; the repository is named `great-big-yarn`.
- The user explicitly changed the original privacy requirement on October 9, 2026: make the repository PUBLIC to enable GitHub Pages on GitHub Free. This supersedes the initial private-repository plan. Do not commit secrets or private account information.
- Completed increments may be committed and pushed directly to `main`; additional per-push approval is not needed. Preserve unrelated changes and never force push.
- Edit locally, validate without a local server, and let GitHub Actions publish. The user reviews the deployed URL, not localhost.
- Leave the custom domain and DNS alone until explicitly requested.
- Publish only the `dist/` copy produced from `site/` by `node scripts/build.mjs`. This adds automatic stylesheet cache versioning. Never publish the entire repository, documentation, or credentials.

## Design
- Implement only Figma designs identified as ready. Do not invent sections, pages, or marketing copy.
- Current source: https://www.figma.com/design/oIV91BuTH2ouyVi5pHCDDv/Brand-Assets?node-id=62-5 (Desktop hero, inside Website page 59:2).
- Use semantic HTML, CSS, and minimal JavaScript. Reuse existing assets and CSS tokens.
- Read the Figma design-to-code skill before retrieving design context. Obtain a design screenshot, use original assets and actual font weights, and download assets locally.
- Adapt desktop designs for tablet and mobile while preserving hierarchy; report significant adaptations.
- Keep accessible landmarks, heading order, alt text, keyboard focus, and reduced-motion support.
- The user approved correcting `Projecrs` to `Projects` and showing Approach, Projects, About, and Insights as inactive labels until those pages are ready.
- `Let's chat` is intended to lead to a contact page. The user approved leaving the button visible but inactive until that page's design is ready. Do not invent that page.
- Paths must work at a GitHub Pages project subpath and a future domain root.

## Verification and handoff
- Run `node scripts/validate.mjs` before committing deployable work.
- Wait for GitHub Actions and verify the live URL before claiming deployment success.
- Compare desktop and mobile renderings to Figma; check overflow, fonts, asset geometry, keyboard behavior, and links.
- Report changes, checks actually performed, remaining limitations, and the verified live URL.
- First milestone: repository connected, successful publishing, and a verified responsive homepage hero. Future designs and the domain connection are separate milestones.
