// Cat test tuning. Home coordinates are the center of the cat, in CSS pixels.
// Figma 150:4722: 190 × 127 reference at (300, 613), in a 1440 × 836 section.
// Shorter layouts keep the cat below the existing copy without adding height.
const CAT_CONFIG = {
  size: { width: 180, tabletWidth: 116, smallWidth: 84, tabletBreakpoint: 1200, smallBreakpoint: 760 },
  colors: { ink: '#080808', cream: '#f4ecdc' },
  home: { offsetFromCenter: -325, bottom: 159.5, tabletBottom: 51, smallLeft: 66, smallBottom: 40, edge: 12, textGap: 8 },
  tracking: { distance: 420, pupilX: 2.1, pupilY: 2, headTilt: 1.1, response: 4, deadzone: 4 },
  reactions: { nearBodyLengths: 1.1, firstAfter: 3, cooldown: [10, 18], pawDuration: 1.25, pawLift: 4, pawAngle: 12, response: 9, pounceChance: .22, pounceCooldown: [38, 55], pounceDuration: 1, bounce: 3, crouch: .035 },
  idle: { blinkGap: [3.5, 7], blinkDuration: .18, tailGap: [6, 12], tailDuration: 1.2, tailSwing: 1.2, tailTipSwing: 7 },
  bubble: { width: 180, sayings: ['let’s follow this thread', 'feed me ideas and treats'], firstAfter: 3.5, gap: [15, 25], duration: 5, fade: .45, catGap: 16, edge: 14, textGap: 12, placementHold: .3 },
};

const section = document.querySelector('.messy-section');
const scene = section?.querySelector('.cat-scene');
if (scene) createCat();

function createCat() {
  const cfg = CAT_CONFIG;
  const hero = document.querySelector('.curtain-hero');
  const content = section.querySelector('.messy-content');
  const label = section.querySelector('.section-eyebrow');
  const actor = scene.querySelector('.cat-position');
  const pose = scene.querySelector('.cat-pose');
  const head = scene.querySelector('.cat-head');
  const eyes = scene.querySelector('.cat-eyes');
  const pupils = scene.querySelector('.cat-pupils');
  const tail = scene.querySelector('.cat-tail');
  const tip = scene.querySelector('.cat-tail-tip');
  const paws = [...scene.querySelectorAll('.cat-paw-left, .cat-paw-right')];
  const bubble = scene.querySelector('.cat-bubble');
  const bubbleText = bubble.querySelector('p');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const coarsePointer = matchMedia('(any-pointer: coarse)');
  const smallScreen = matchMedia(`(max-width: ${cfg.size.smallBreakpoint - 1}px)`);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const random = range => range[0] + Math.random() * (range[1] - range[0]);
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const inflate = (r, n) => ({ left: r.left - n, top: r.top - n, right: r.right + n, bottom: r.bottom + n });
  const staticMode = () => smallScreen.matches || reduced.matches || !finePointer.matches || coarsePointer.matches || navigator.maxTouchPoints > 0;
  const paused = () => document.hidden || document.body.classList.contains('animations-paused');
  let geometry, pointer = null, active = false, frame = 0, layoutFrame = 0, lastTime = 0, clock = 0;
  let gaze = { x: 0, y: 0 }, paw = 0, pawSide = 1;
  let nextBlink = random(cfg.idle.blinkGap), blinkStart = -Infinity;
  let nextTail = random(cfg.idle.tailGap), tailStart = -Infinity;
  let nextReaction = cfg.reactions.firstAfter, pawStart = -Infinity, pounceStart = -Infinity;
  let nextPounce = random(cfg.reactions.pounceCooldown);
  let nextBubble = cfg.bubble.firstAfter, bubbleStart = -Infinity, sayingIndex = -1;
  let bubbleSide = 'left', sideChanged = -Infinity, bubblePosition = null;

  scene.style.setProperty('--cat-ink', cfg.colors.ink);
  scene.style.setProperty('--cat-cream', cfg.colors.cream);
  bubble.style.width = `${cfg.bubble.width}px`;

  // Cache layout only on scroll, resize, font/phrase changes; frames use transforms.
  function measure() {
    layoutFrame = 0;
    const r = section.getBoundingClientRect();
    const small = innerWidth < cfg.size.smallBreakpoint;
    const tablet = innerWidth < cfg.size.tabletBreakpoint;
    const width = small ? cfg.size.smallWidth : tablet ? cfg.size.tabletWidth : cfg.size.width;
    const height = width * 127 / 190;
    const local = el => ({ left: el.offsetLeft, top: el.offsetTop, right: el.offsetLeft + el.offsetWidth, bottom: el.offsetTop + el.offsetHeight });
    const protectedRects = [local(content), local(label)];
    const home = {
      x: clamp(small ? cfg.home.smallLeft : r.width / 2 + cfg.home.offsetFromCenter, width / 2 + cfg.home.edge, r.width - width / 2 - cfg.home.edge),
      y: r.height - (small ? cfg.home.smallBottom : tablet ? cfg.home.tabletBottom : cfg.home.bottom),
    };
    // The reference's larger silhouette uses only existing footer space.
    // Keep its full motion envelope clear of the paragraph and dashed label.
    if (home.x + width / 2 > protectedRects[1].left && home.x - width / 2 < protectedRects[1].right) {
      home.x = Math.max(width / 2 + cfg.home.edge, protectedRects[1].left - width / 2 - cfg.home.textGap);
    }
    if (home.x + width / 2 > protectedRects[0].left && home.x - width / 2 < protectedRects[0].right) {
      home.y = Math.max(home.y, protectedRects[0].bottom + cfg.home.textGap + height / 2);
    }
    home.y = Math.min(home.y, r.height - cfg.home.edge - height / 2);
    const cat = { left: home.x - width / 2, right: home.x + width / 2, top: home.y - height / 2, bottom: home.y + height / 2 };
    const visible = { left: Math.max(0, -r.left), right: Math.min(r.width, innerWidth - r.left), top: Math.max(0, -r.top, (hero?.getBoundingClientRect().bottom ?? 0) - r.top), bottom: Math.min(r.height, innerHeight - r.top) };
    geometry = { width, height, home, cat, visible, protectedRects, top: r.top, left: r.left, bubbleWidth: bubble.offsetWidth, bubbleHeight: bubble.offsetHeight };
    scene.style.setProperty('--cat-width', `${width}px`);
    scene.style.setProperty('--cat-height', `${height}px`);
    scene.style.setProperty('--cat-scale', width / 190);
    actor.style.left = actor.style.top = '0';
    actor.style.transform = `translate3d(${cat.left.toFixed(2)}px,${cat.top.toFixed(2)}px,0)`;
    syncActivity();
    if (active) updateBubble(0); // Immediately conceal an unsafe bubble during scrolling.
  }
  function scheduleMeasure() { if (!layoutFrame) layoutFrame = requestAnimationFrame(measure); }

  function rest() {
    gaze = { x: 0, y: 0 }; paw = 0; pointer = null;
    for (const el of [pose, head, eyes, pupils, tail, tip, ...paws]) el.style.transform = '';
    bubble.style.opacity = '0';
  }
  function syncActivity() {
    if (!geometry) return;
    const { cat, visible: v } = geometry;
    // Timing begins only when the cat itself has scrolled naturally into view.
    const inView = cat.top >= v.top && cat.bottom <= v.bottom && cat.left >= v.left && cat.right <= v.right;
    const next = inView && !staticMode() && !paused();
    scene.dataset.active = String(next);
    if (next !== active) {
      active = next;
      if (active) { lastTime = 0; frame = requestAnimationFrame(tick); }
      else { cancelAnimationFrame(frame); frame = 0; }
    }
    if (!inView || staticMode()) bubble.style.opacity = '0';
    if (staticMode()) rest();
  }

  // The bubble cannot cover the cat, either text block, the curtain, or screen edges.
  function bubbleSafe(p) {
    const r = { left: p.x, top: p.y, right: p.x + geometry.bubbleWidth, bottom: p.y + geometry.bubbleHeight };
    const v = geometry.visible, edge = cfg.bubble.edge;
    return r.left >= v.left + edge && r.right <= v.right - edge && r.top >= v.top + edge && r.bottom <= v.bottom - edge && !overlaps(r, inflate(geometry.cat, 6)) && !geometry.protectedRects.some(o => overlaps(r, inflate(o, cfg.bubble.textGap)));
  }
  function updateBubble(dt) {
    if (clock >= nextBubble) {
      sayingIndex = (sayingIndex + 1) % cfg.bubble.sayings.length;
      bubbleText.textContent = cfg.bubble.sayings[sayingIndex];
      bubbleStart = clock;
      nextBubble = clock + cfg.bubble.duration + random(cfg.bubble.gap);
      scheduleMeasure();
    }
    const elapsed = clock - bubbleStart;
    if (elapsed > cfg.bubble.duration) { bubble.style.opacity = '0'; return; }
    const { home: c, cat, bubbleWidth: w, bubbleHeight: h } = geometry, gap = cfg.bubble.catGap;
    const options = {
      left: { x: cat.left - gap - w, y: c.y - h / 2 },
      right: { x: cat.right + gap, y: c.y - h / 2 },
      above: { x: c.x - w / 2, y: cat.top - gap - h },
      below: { x: c.x - w / 2, y: cat.bottom + gap },
    };
    const side = [bubbleSide, 'left', 'right', 'above', 'below'].find(s => bubbleSafe(options[s]));
    if (!side) { bubble.style.opacity = '0'; return; }
    if (side !== bubbleSide) { bubbleSide = side; sideChanged = clock; bubblePosition = null; }
    const target = options[side];
    if (!bubblePosition) bubblePosition = { ...target };
    const blend = 1 - Math.exp(-12 * dt);
    bubblePosition.x += (target.x - bubblePosition.x) * blend;
    bubblePosition.y += (target.y - bubblePosition.y) * blend;
    const fade = Math.min(clamp(elapsed / cfg.bubble.fade, 0, 1), clamp((cfg.bubble.duration - elapsed) / cfg.bubble.fade, 0, 1), clamp((clock - sideChanged - cfg.bubble.placementHold) / cfg.bubble.fade, 0, 1));
    bubble.dataset.side = bubbleSide;
    bubble.style.transform = `translate3d(${bubblePosition.x.toFixed(2)}px,${bubblePosition.y.toFixed(2)}px,0)`;
    bubble.style.opacity = bubbleSafe(bubblePosition) ? String(fade) : '0';
  }

  function tick(now) {
    if (!active) return;
    const dt = lastTime ? Math.min((now - lastTime) / 1000, .05) : 0;
    lastTime = now; clock += dt;
    const dx = pointer ? pointer.x - geometry.left - geometry.home.x : 0;
    const dy = pointer ? pointer.y - geometry.top - geometry.home.y : 0;
    const d = Math.hypot(dx, dy), strength = pointer ? Math.min(1, d / cfg.tracking.distance) : 0;
    const blend = 1 - Math.exp(-cfg.tracking.response * dt);
    gaze.x += ((d ? dx / d * strength : 0) - gaze.x) * blend;
    gaze.y += ((d ? dy / d * strength : 0) - gaze.y) * blend;
    pupils.style.transform = `translate(${(gaze.x * cfg.tracking.pupilX).toFixed(3)}px,${(gaze.y * cfg.tracking.pupilY).toFixed(3)}px)`;
    head.style.transform = `rotate(${(gaze.x * cfg.tracking.headTilt).toFixed(3)}deg)`;

    if (clock >= nextBlink) { blinkStart = clock; nextBlink = clock + cfg.idle.blinkDuration + random(cfg.idle.blinkGap); }
    const blinkProgress = (clock - blinkStart) / cfg.idle.blinkDuration;
    const blink = blinkProgress < 1 ? Math.sin(Math.PI * blinkProgress) : 0;
    eyes.style.transform = `scaleY(${(1 - blink * .96).toFixed(3)})`;
    if (clock >= nextTail) { tailStart = clock; nextTail = clock + cfg.idle.tailDuration + random(cfg.idle.tailGap); }
    const t = (clock - tailStart) / cfg.idle.tailDuration;
    const twitch = t < 1 ? Math.sin(t * Math.PI * 4) * Math.sin(t * Math.PI) : 0;
    tail.style.transform = `rotate(${(twitch * cfg.idle.tailSwing).toFixed(3)}deg)`;
    tip.style.transform = `rotate(${(twitch * cfg.idle.tailTipSwing).toFixed(3)}deg)`;

    const near = pointer && d < geometry.width * cfg.reactions.nearBodyLengths;
    if (near && clock >= nextReaction) {
      nextReaction = clock + random(cfg.reactions.cooldown);
      if (clock >= nextPounce && Math.random() < cfg.reactions.pounceChance) {
        pounceStart = clock;
        nextPounce = clock + random(cfg.reactions.pounceCooldown);
      } else { pawStart = clock; pawSide = dx < 0 ? 0 : 1; }
    }
    const reachTime = (clock - pawStart) / cfg.reactions.pawDuration;
    const reach = pointer && reachTime < 1 ? Math.sin(reachTime * Math.PI) ** 2 : 0;
    paw += (reach - paw) * (1 - Math.exp(-cfg.reactions.response * dt));
    paws.forEach((el, i) => { el.style.transform = i === pawSide ? `translateY(${(-paw * cfg.reactions.pawLift).toFixed(3)}px) rotate(${(paw * cfg.reactions.pawAngle * (i ? -1 : 1)).toFixed(3)}deg)` : ''; });
    const p = (clock - pounceStart) / cfg.reactions.pounceDuration;
    const crouch = p < .4 ? Math.sin(p / .4 * Math.PI) * cfg.reactions.crouch : 0;
    const jump = p >= .4 && p < 1 ? Math.sin((p - .4) / .6 * Math.PI) * cfg.reactions.bounce : 0;
    pose.style.transform = `translateY(${-jump.toFixed(3)}px) scaleY(${(1 - crouch).toFixed(4)})`;
    updateBubble(dt);
    frame = requestAnimationFrame(tick);
  }

  section.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || staticMode()) return;
    const next = { x: event.clientX, y: event.clientY };
    if (!pointer || Math.hypot(next.x - pointer.x, next.y - pointer.y) >= cfg.tracking.deadzone) pointer = next;
  }, { passive: true });
  section.addEventListener('pointerleave', () => { pointer = null; });
  addEventListener('scroll', scheduleMeasure, { passive: true });
  addEventListener('resize', scheduleMeasure, { passive: true });
  document.addEventListener('visibilitychange', syncActivity);
  new MutationObserver(syncActivity).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  const observer = new ResizeObserver(scheduleMeasure);
  for (const el of [section, content, label, bubble]) observer.observe(el);
  for (const media of [reduced, finePointer, coarsePointer, smallScreen]) media.addEventListener('change', scheduleMeasure);
  document.fonts.ready.then(scheduleMeasure);
  measure();
}
