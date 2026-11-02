# November homepage promotion

On November 2, 2026, the owner approved publishing the complete current homepage-refresh design as the main homepage, including its connected contact page. This approval supersedes older draft-only instructions and the previous main homepage presentation. Older independent previews and assets remain available.

`site/index.html` is copied from the approved `site/previews/homepage-refresh.html`, with asset/style/script paths rebased from ../ to ./, a public page title/description, and the preview robots directive removed. The public homepage preserves every selected element: latest hero headline without asterisk, office and portrait with office annotation, Samwise/Hermione/big ears notes, five selected projects, overlapping Services with pointer motion, About, three supplied testimonials, centered CTA and footer drawing animation. Both header variants and the closing CTA link to contact.html.

`site/contact.html` is copied from the approved contact preview with corresponding root-relative-file adjustments. Header/footer section links return to ./#studio, ./#case-studies, ./#services and ./#testimonials; its logo returns directly to ./. Keep the public Formspree endpoint, field requirements, helper text, direct-email option, native POST fallback and local official Ajax SDK unchanged. No live test inquiry was sent.

The two retained preview HTML files keep noindex and their preview-scoped navigation, allowing continued review. Shared styles and controllers retain their existing names and behavior; no asset or controller renaming is needed. Old assets/previews are not deleted. Custom domains and DNS are unchanged.

Validation and the standard build produce only dist for GitHub Pages. Public pages use the same automatic content-based stylesheet/script versions as previews. Verify at the project URL, not a local server.

Checks cover Edge at 1920/1440/390px and WebKit at 1440/390px: original assets decode from public paths, section navigation and mobile menu, public contact routes from header/CTA, contact navigation back to homepage sections, titles/indexability, no horizontal overflow, and successful mocked Formspree submission without emailing the owner. The retained previews remain noindex. Previously verified motion, reduced-motion and form-error behavior is shared unchanged.

The owner subsequently requested removing #main from all current header/footer logo destinations. Public homepage/contact logos use ./; the two retained current previews use ../ to reach the public homepage. Skip links and Back to top keep their intended anchors.

Native hash navigation could focus main/section anchor targets and draw the global blue outline across their full width. The shared current-design stylesheet suppresses outlines only on focused main/section containers with tabindex=-1. Destination focus and scroll behavior remain intact, as do visible focus styles for links, buttons, form fields and form feedback.
