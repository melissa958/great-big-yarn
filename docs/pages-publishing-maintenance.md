# Pages publishing action maintenance

November 5, 2026: investigated the DEP0040 punycode warning in the Pages deploy job at the owner's request.

## Finding

The warning comes from the official actions/deploy-pages bundle, not the website's source. Its latest released v5.0.1 still contains `require("punycode")`. The open upstream dependency issue is https://github.com/actions/deploy-pages/issues/413. Merely upgrading the action does not remove that import.

## Local workaround

- Upgrade actions/configure-pages from v5 to v6.0.0 and actions/deploy-pages from v4 to v5.0.1, both explicitly supporting Node 24.
- Set `NODE_OPTIONS: --disable-warning=DEP0040` only on the deploy step. This hides the specific known deprecation message. It does not repair or replace the upstream dependency, disable other warnings, suppress deployment failures, or change the 10-minute deployment timeout.
- Keep the current permissions, environment restrictions, artifact upload and dist-only publishing behavior.

Remove the filter when GitHub ships a release that no longer imports the deprecated built-in module. Do not replace it with NODE_NO_WARNINGS or a blanket --no-warnings option.

## Verification

Use Node 24 to verify the selective filter hides DEP0040 while another warning and an actual thrown error still appear. Validate/build the site and parse the workflow, then inspect the real Actions job log. A clean warning log is separate from whether GitHub Pages completes publication; report both results honestly.
