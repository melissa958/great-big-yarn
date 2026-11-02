# Case study template

Preview: `/previews/case-study-template/`, sourced from `site/previews/case-study-template/index.html` and `site/styles/case-study-template.css`. This is a reusable placeholder template requested by the owner, not a published client case study. Keep it noindex until real project content is supplied. The owner subsequently requested the five clean project URLs; current homepage project photos now link to their explicitly in-progress pages. See case-study-content-workflow.md.

The page reuses the current site header, logo, responsive navigation, cream/black palette, Romie title, Be Vietnam copy and compact footer. The logo returns to the public homepage and section navigation returns to the public homepage anchors. Contact uses the clean `/contact/` route. No case-study-specific JavaScript is needed.

The intro contains one h1 project title, a description area with two short paragraphs, a list of services and a native details/summary Credits accordion. Replace placeholder services and credit roles/names with real supplied content. Credits are initially closed and support click/tap, Enter/Space and no-JavaScript use. The plus becomes a minus when open. Keep visible focus on the summary and links.

Images follow all introductory content in a single 1320px-maximum column. The intro uses the same container. The layout has 60px desktop gutters, 32px below 1200px and 24px on phones. Description and metadata stack below 1000px; title/copy size adapts on phones. Images render at full available container width with automatic height, preserving each original ratio. The two neutral SVG slots are deliberate placeholders, not client artwork.

Each image is a figure with an img and, optionally, a figcaption. Add as many figures as needed. Omit figcaption entirely when there is no caption, avoiding an empty caption gap. Supply accurate alt text and intrinsic width/height for real images; use responsive optimized local assets and lazy loading for later images. The first example includes a caption and the second deliberately does not.

To create a real project page, copy this index into `site/work/project-slug/index.html`, replace title, metadata, description, services, credits and images with owner-supplied material, and remove the preview noindex directive. Both locations are two directories below site root, so their existing asset/navigation paths work without rebasing. The resulting URL is `/work/project-slug/`. Current projects are already linked to their in-progress destinations at the owner’s request; replace their pending content as it is supplied.

The content structure maps directly to future CMS fields: project title; description paragraphs; services list; credits role/name list; an ordered sequence of image blocks (source, dimensions, alt, optional caption) and text blocks (subheading and body paragraphs). No CMS or account is set up as part of this template.

Validation/build and Edge (1920, 1440, 768, 390, 320px) / WebKit (1440, 390px) checks passed for exact image column widths, original image ratios, optional captions, Credits keyboard/focus behavior, no-JavaScript expansion, clean contact/navigation paths and horizontal overflow. Desktop/mobile screenshots were inspected.

## Subheadings and body copy throughout

The owner requested repeatable subheading/body-copy sections in addition to captions. Insert `.case-study-text` sections anywhere among `.case-study-gallery` figures. Each has an h2 with a unique ID, referenced by aria-labelledby, followed by one or more body paragraphs. No JavaScript or CMS is required to add or reorder these blocks. They may appear before the first image, between images or after the last image. Do not insert empty placeholder blocks into client pages.

Text uses a left-aligned 740px maximum reading width inside the unchanged 1320px image container. Subheadings are Romie Bold at 36px/1.2, body is Be Vietnam Light at 18px/1.6 with 24px paragraph gaps. Below 600px, subheadings become 28px and paragraphs 16px. Generous block spacing distinguishes the story copy from the smaller image captions. The template demonstrates a two-paragraph section between the images and a second section after them, using generic placeholder text. Its gallery landmark is labeled Project story to include both content types.
