# Clean page URLs

The owner requested URLs without .html. Use a directory with index.html for each current/new page; GitHub Pages serves the index at the trailing-slash URL. All navigation/assets remain relative, supporting the project subpath and a future domain root without DNS changes.

| URL relative to the site root | Source |
| --- | --- |
| `/` | `site/index.html` |
| `/contact/` | `site/contact/index.html` |
| `/previews/homepage-refresh/` | `site/previews/homepage-refresh/index.html` |
| `/previews/contact/` | `site/previews/contact/index.html` |
| `/previews/case-study-template/` | `site/previews/case-study-template/index.html` |

Current page navigation uses these clean routes. Contact/preview assets were rebased for their added directory depth. Public contact links return to public homepage sections; preview contact returns to the retained homepage preview. Current logos return directly to the public homepage, without a fragment. The template is a separate noindex preview.

The previous `contact.html`, `previews/contact.html` and `previews/homepage-refresh.html` files are small noindex forwarding pages. Their JavaScript uses location.replace to preserve the original query string and fragment at the clean destination. Meta refresh and a visible link provide a no-JavaScript fallback. Do not replace these wrappers with full page implementations; edit their directory index sources. Other historical standalone previews are unchanged.

Future real case studies can use `site/work/project-slug/index.html` for `/work/project-slug/`; do not create real project pages or destinations without supplied content.

Edge and WebKit checks verified current navigation plus legacy redirects and query/hash preservation. Local validation resolves directory links through index.html, and the standard build versions nested page styles/scripts. No local web server or hosting rewrite configuration is required.
