# Caban Energy case study

Public route: `/work/caban-energy/`, source `site/work/caban-energy/index.html`. The page uses the approved case-study template and the owner’s supplied `Caban Case Study.docx` and `Caban Images.zip`. Preserve all supplied copy, captions, services, links and media order. The title is Caban Energy; the homepage display label remains Caban. The full case-study content replaces the pending page and removes its noindex/in-progress state. Other project placeholders remain unchanged.

## Content and credits

The summary is the supplied single paragraph. Services are Visual identity, Brand guidelines, Website design and Print collateral. The Powered On section contains the two original body paragraphs, including the Caban website link. The image-2 video caption, before/after logo captions, quote and Caban/LinkedIn attribution match the supplied document. The LinkedIn link retains its public post destination and omits account/tracking query parameters.

The owner supplied these credits separately in chat:

- Agency: DG+
- Creative Direction & Design: Melissa Stafford-Woodruff
- Copywriting: Julianne Waite
- Development: Nadia Johnson

Credits use the existing native expandable accordion and start closed. Do not add guessed contributors or roles.

## Source mapping

| Order | Supplied file | Treatment |
| --- | --- | --- |
| 1 | Caban_Cover_01.png | Full-width wave/monogram cover |
| Text | DOCX Powered On | Subheading and two body paragraphs |
| 2 | Caban_02_video.mp4 | Original muted looping MP4 with poster and supplied caption |
| 3 | Caban-03.png | Former logo, paired with 4; document uses an underscore in this filename |
| 4 | Caban-04.png | Refreshed logo, paired with 3; document uses an underscore in this filename |
| 5 | Caban_05.png | Full-width brand guideline overview |
| Quote | DOCX quote | Centered quote and LinkedIn attribution |
| 6 | Caban_06.png | Full-width website overview |
| 7 | Caban_07.png | Full-width business cards |
| 8 | Caban_08.gif | Wave animation paired with 9 |
| 9 | Caban_09.png | Brand message banner, vertically centered beside 8 |
| 10 | Caban_010.jpg | Full-width team/dashboard photograph; DOCX lists PNG but the ZIP supplies JPG |

Pairs are two columns from 700px and stack below that width. No images are cropped; full-width figures use the existing 1320px maximum. Captions are omitted where the owner left them blank. Original supplied ZIP/DOCX files are not copied into the public site.

## Assets and motion

Optimized local assets live in `site/assets/images/case-studies/caban`. Static WebPs use responsive variants without upscaling, up to 2640px. Original dimensions are preserved in markup. The original 914KB MP4 is copied unchanged; its poster comes from the first decoded frame. The owner subsequently requested automatic playback with no controls. The video now uses muted, playsinline and looping, with metadata preload. The shared media controller enables autoplay only when it is visible, the tab is active and reduced motion is off. It pauses offscreen/hidden and returns to the first frame when reduced motion becomes active.

The 13.7MB GIF is optimized as a 1024×576 animated WebP of about 1.77MB, retaining its full 2700ms loop (duplicate frames are coalesced). A first-frame WebP is the default image. `case-study-media.js` starts the animation only when visible and motion is allowed; the owner removed its Play/Pause button, so it runs automatically while visible. Hidden tabs/offscreen positions show the still. Reduced motion stays static. No JavaScript leaves the still and a link to the animation, and the video remains on its poster. Both media resume automatically when visible again if motion is allowed.

## Verification

Validation/build, Edge and WebKit at 1440px and 390px cover all ten media items, three captions, section order, paired/stacked layout, exact column widths, image loading, Credits and horizontal overflow. Edge checks muted automatic playback, looping, offscreen/hidden pausing and return, and reduced motion. Desktop and phone page screenshots are inspected throughout. Final credit/source-copy and no-JavaScript checks confirm the completed page before publishing.

The automatic-playback refinement is checked for muted inline video looping with no controls, automatic visible/offscreen/hidden-tab behavior for both animations, static reduced-motion/no-JavaScript fallbacks and removal of all GIF controls.

Playback verification: Edge desktop and phone-sized contexts confirm time advances automatically and the video wraps at its end. The Windows headless WebKit build does not decode this MP4 in the test harness (no media request reaches the routed loader), so WebKit checks cover the autoplay/muted/inline/loop attributes, visibility gating, GIF and reduced-motion behavior rather than decoded playback. Live browser playback is verified after deployment.
