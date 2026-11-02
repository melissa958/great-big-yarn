# Current mobile navigation

The owner requested a black hamburger icon instead of the former Menu box, a full-screen menu sliding in from the right, and all menu links centered. This applies to the current shared header on the homepage, contact page, project pages and retained current previews through `refresh-navigation.js` and `homepage-refresh.css`. Historical previews using other headers remain unchanged.

Below 1000px, the existing navigation and its toggle move into a native modal dialog while open. This preserves the actual links, gives the menu a top-layer surface and makes the background inert. The paper panel fills the dynamic viewport, with horizontally and vertically centered links, and slides from the right over 420ms. Its transparent, borderless 44px toggle has three black bars when closed and an X when open. It retains accessible Open/Close labels, aria-expanded and aria-controls; keyboard focus outlines are deliberately preserved.

The menu locks background scrolling, contains keyboard Tab/Shift+Tab focus, closes with Escape or its close button, and returns focus to the hamburger. Choosing a link closes immediately before normal navigation so homepage anchors remain usable. Resizing to desktop restores the original header links and removes the lock. Reduced motion removes the slide transition. Without JavaScript, all links remain visible in the existing inline responsive header.

The owner also removed the office annotation from phone layouts: `.refresh-office-note` and its child arrow are hidden below 700px, collapsing their space naturally. Wider layouts retain the annotation.

Verification covers Edge and WebKit phone/tablet/short-screen layouts, full viewport coverage, centered links, black icon styles, focus containment/return, Escape and anchor dismissal, resizing to desktop, no horizontal overflow, contact/project/current-preview navigation, and reduced-motion behavior. The first screenshot's blue outline during keyboard tests is the intentional focus indicator, not the removed blue menu button.
