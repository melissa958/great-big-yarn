// All creative tuning lives here. Coordinates refer to the fish's center.
// Figma: 117 × 69 fish at (355, 671) in a 1440 × 836 section.
const FISH_CONFIG = {
  size: { width: 117, smallWidth: 84, smallBreakpoint: 760 },
  colors: { ink: '#080808', cream: '#f4ecdc' },
  home: { offsetFromCenter: -306.5, bottom: 130.5, tabletBottom: 58, smallLeft: 66, smallBottom: 45 },
  swim: { speed: 132, response: 3.8, approach: 2.1, followDistance: 90, pointerDeadzone: 9, maxTilt: 10, turnResponse: 5, flipResponse: 14, bob: 2.5, bobPeriod: 3.4, edge: 8, textGap: 10 },
  tail: { period: 1500, swing: 6, finPeriod: 2100, finSwing: 4 },
  bubble: { width: 180, sayings: ['just keep scrolling', 'it’s murky in the middle', 'we’ll find our way'], firstAfter: 3.5, duration: 5, fade: .45, gapMin: 15, gapMax: 25, fishGap: 14, edge: 14, textGap: 12, placementHold: .3 },
};

const section = document.querySelector('.messy-section');
const scene = section?.querySelector('.fish-scene');
if (scene) createFish();

function createFish() {
  const cfg = FISH_CONFIG;
  const hero = document.querySelector('.curtain-hero');
  const content = section.querySelector('.messy-content');
  const label = section.querySelector('.section-eyebrow');
  const actor = scene.querySelector('.fish-position');
  const turn = scene.querySelector('.fish-turn');
  const facing = scene.querySelector('.fish-facing');
  const bubble = scene.querySelector('.fish-bubble');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const coarsePointer = matchMedia('(any-pointer: coarse)');
  const state = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, facing: 1, mirror: 1 };
  let geometry;
  let pointer = null;
  let inside = false;
  let initialized = false;
  let firstSeen = false;
  let active = false;
  let frame = 0;
  let layoutFrame = 0;
  let lastTime = 0;
  let clock = 0;
  let needsPlan = true;
  let waypoints = [];
  let nextBubble = cfg.bubble.firstAfter;
  let bubbleStart = -Infinity;
  let bubbleSide = 'left';
  let sideChanged = -Infinity;
  let bubblePosition = null;
  let sayingIndex = -1;

  scene.style.setProperty('--fish-ink', cfg.colors.ink);
  scene.style.setProperty('--fish-cream', cfg.colors.cream);
  scene.style.setProperty('--fish-tail-duration', `${cfg.tail.period}ms`);
  scene.style.setProperty('--fish-tail-swing', `${cfg.tail.swing}deg`);
  scene.style.setProperty('--fish-fin-duration', `${cfg.tail.finPeriod}ms`);
  scene.style.setProperty('--fish-fin-swing', `${cfg.tail.finSwing}deg`);
  bubble.style.width = `${cfg.bubble.width}px`;

  const clamp = (v, low, high) => Math.max(low, Math.min(high, v));
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const contains = (r, p) => p.x > r.left && p.x < r.right && p.y > r.top && p.y < r.bottom;
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const inflate = (r, x, y = x) => ({ left: r.left - x, right: r.right + x, top: r.top - y, bottom: r.bottom + y });
  const staticMode = () => reduced.matches || !finePointer.matches || coarsePointer.matches || navigator.maxTouchPoints > 0;
  const paused = () => document.hidden || document.body.classList.contains('animations-paused');

  // Measurements are event-driven, never part of the swimming frame loop.
  function measure() {
    layoutFrame = 0;
    const r = section.getBoundingClientRect();
    const small = innerWidth < cfg.size.smallBreakpoint;
    const width = small ? cfg.size.smallWidth : cfg.size.width;
    const height = 69 * width / 117;
    const home = { x: small ? cfg.home.smallLeft : r.width / 2 + cfg.home.offsetFromCenter, y: r.height - (small ? cfg.home.smallBottom : innerWidth < 1200 ? cfg.home.tabletBottom : cfg.home.bottom) };
    const localRect = el => ({ left: el.offsetLeft, top: el.offsetTop, right: el.offsetLeft + el.offsetWidth, bottom: el.offsetTop + el.offsetHeight });
    const protectedRects = [localRect(content), localRect(label)];
    const tilt = cfg.swim.maxTilt * Math.PI / 180;
    const rx = (width * Math.cos(tilt) + height * Math.sin(tilt)) / 2;
    const ry = (height * Math.cos(tilt) + width * Math.sin(tilt)) / 2;
    const uncoveredTop = Math.max(0, -r.top, (hero?.getBoundingClientRect().bottom ?? 0) - r.top);
    const visible = { left: Math.max(0, -r.left), right: Math.min(r.width, innerWidth - r.left), top: uncoveredTop, bottom: Math.min(r.height, innerHeight - r.top) };
    const bounds = { left: visible.left + rx + cfg.swim.edge, right: visible.right - rx - cfg.swim.edge, top: visible.top + ry + cfg.swim.edge, bottom: visible.bottom - ry - cfg.swim.edge };
    geometry = { width, height, rx, ry, home, visible, bounds, top: r.top, left: r.left, protectedRects, obstacles: protectedRects.map(o => inflate(o, rx + cfg.swim.textGap, ry + cfg.swim.textGap)), bubbleWidth: bubble.offsetWidth, bubbleHeight: bubble.offsetHeight };
    scene.style.setProperty('--fish-width', `${width}px`);
    scene.style.setProperty('--fish-height', `${height}px`);
    scene.style.setProperty('--fish-scale', width / 117);
    if (!initialized || staticMode()) {
      state.x = home.x; state.y = home.y; state.vx = state.vy = state.angle = 0;
      state.facing = state.mirror = 1;
      initialized = true;
      actor.style.left = actor.style.top = '0';
      render(0);
    }
    // Do not pull a fish whose home is below the screen up into view.
    if (home.y >= bounds.top && home.y <= bounds.bottom) firstSeen = true;
    if (pointer && !contains(visible, { x: pointer.x - r.left, y: pointer.y - r.top })) { inside = false; pointer = null; }
    needsPlan = true;
    syncActivity();
  }

  function scheduleMeasure() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(measure);
  }

  function syncActivity() {
    if (!geometry) return;
    const { bounds } = geometry;
    const next = firstSeen && !staticMode() && !paused() && bounds.bottom > bounds.top && bounds.right > bounds.left;
    scene.style.setProperty('--fish-play-state', next ? 'running' : 'paused');
    scene.dataset.active = String(next);
    if (next === active) return;
    active = next;
    if (active) {
      lastTime = 0;
      needsPlan = true;
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      if (staticMode()) {
        inside = false; pointer = null;
        state.x = geometry.home.x; state.y = geometry.home.y;
        state.vx = state.vy = state.angle = 0; state.facing = state.mirror = 1;
        bubble.style.opacity = '0';
        render(0);
      }
    }
  }

  function inBounds(p) {
    const b = geometry.bounds;
    return p.x >= b.left && p.x <= b.right && p.y >= b.top && p.y <= b.bottom;
  }

  function safe(p) { return inBounds(p) && !geometry.obstacles.some(r => contains(r, p)); }

  function constrain(p) {
    const b = geometry.bounds;
    return { x: clamp(p.x, b.left, b.right), y: clamp(p.y, b.top, b.bottom) };
  }

  function project(p) {
    const q = constrain(p);
    if (safe(q)) return q;
    const candidates = [];
    for (const r of geometry.obstacles) {
      candidates.push({ x: r.left - 1, y: q.y }, { x: r.right + 1, y: q.y }, { x: q.x, y: r.top - 1 }, { x: q.x, y: r.bottom + 1 });
    }
    return candidates.map(constrain).filter(safe).sort((a, b) => distance(a, q) - distance(b, q))[0] ?? { x: state.x, y: state.y };
  }

  function segmentClear(a, b) {
    return !geometry.obstacles.some(r => {
      let enter = 0, exit = 1;
      for (const [axis, low, high] of [['x', r.left, r.right], ['y', r.top, r.bottom]]) {
        const delta = b[axis] - a[axis];
        if (Math.abs(delta) < .0001) {
          if (a[axis] <= low || a[axis] >= high) return false;
        } else {
          const t1 = (low - a[axis]) / delta, t2 = (high - a[axis]) / delta;
          enter = Math.max(enter, Math.min(t1, t2)); exit = Math.min(exit, Math.max(t1, t2));
          if (enter >= exit) return false;
        }
      }
      return exit > 0 && enter < 1 && enter < exit;
    });
  }

  // A tiny visibility graph routes around the copy instead of crossing it.
  // Recomputed only for a meaningful pointer move, exit, or geometry change.
  function plan() {
    needsPlan = false;
    const start = project(state);
    if (distance(start, state) > .5) { state.x = start.x; state.y = start.y; state.vx = state.vy = 0; }
    let goal = geometry.home;
    if (inside && pointer) {
      const cursor = { x: pointer.x - geometry.left, y: pointer.y - geometry.top };
      const d = distance(state, cursor);
      const ux = d > 1 ? (state.x - cursor.x) / d : -state.facing;
      const uy = d > 1 ? (state.y - cursor.y) / d : 0;
      goal = { x: cursor.x + ux * cfg.swim.followDistance, y: cursor.y + uy * cfg.swim.followDistance };
    }
    goal = project(goal);
    const nodes = [start, goal];
    for (const r of geometry.obstacles) for (const x of [r.left - 4, r.right + 4]) for (const y of [r.top - 4, r.bottom + 4]) {
      const p = { x, y }; if (safe(p)) nodes.push(p);
    }
    const cost = nodes.map(() => Infinity), previous = nodes.map(() => -1), done = new Set();
    cost[0] = 0;
    while (done.size < nodes.length) {
      let at = -1;
      for (let i = 0; i < nodes.length; i++) if (!done.has(i) && (at < 0 || cost[i] < cost[at])) at = i;
      if (at < 0 || !Number.isFinite(cost[at])) break;
      if (at === 1) break;
      done.add(at);
      for (let j = 0; j < nodes.length; j++) {
        if (done.has(j) || !segmentClear(nodes[at], nodes[j])) continue;
        const next = cost[at] + distance(nodes[at], nodes[j]);
        if (next < cost[j]) { cost[j] = next; previous[j] = at; }
      }
    }
    waypoints = [];
    if (Number.isFinite(cost[1])) for (let i = 1; i > 0; i = previous[i]) waypoints.unshift(nodes[i]);
  }

  function render(bob) {
    actor.style.transform = `translate3d(${(state.x - geometry.width / 2).toFixed(2)}px,${(state.y - geometry.height / 2 + bob).toFixed(2)}px,0)`;
    turn.style.transform = `rotate(${state.angle.toFixed(2)}deg)`;
    facing.style.transform = `scaleX(${state.mirror.toFixed(3)})`;
  }

  function bubbleRect(x, y) { return { left: x, top: y, right: x + geometry.bubbleWidth, bottom: y + geometry.bubbleHeight }; }
  function bubbleSafe(p) {
    const r = bubbleRect(p.x, p.y), v = geometry.visible, edge = cfg.bubble.edge;
    const fish = { left: state.x - geometry.rx - 6, right: state.x + geometry.rx + 6, top: state.y - geometry.ry - 6, bottom: state.y + geometry.ry + 6 };
    return r.left >= v.left + edge && r.right <= v.right - edge && r.top >= v.top + edge && r.bottom <= v.bottom - edge && !overlaps(r, fish) && !geometry.protectedRects.some(o => overlaps(r, inflate(o, cfg.bubble.textGap)));
  }

  function updateBubble(dt) {
    if (clock >= nextBubble) {
      sayingIndex = (sayingIndex + 1) % cfg.bubble.sayings.length;
      bubble.querySelector('p').textContent = cfg.bubble.sayings[sayingIndex];
      scheduleMeasure();
      bubbleStart = clock;
      nextBubble = clock + cfg.bubble.duration + cfg.bubble.gapMin + Math.random() * (cfg.bubble.gapMax - cfg.bubble.gapMin);
    }
    const elapsed = clock - bubbleStart;
    if (elapsed > cfg.bubble.duration) { bubble.style.opacity = '0'; return; }
    const w = geometry.bubbleWidth, h = geometry.bubbleHeight, gap = cfg.bubble.fishGap;
    const options = {
      left: { x: state.x - geometry.rx - gap - w, y: state.y - h / 2 },
      right: { x: state.x + geometry.rx + gap, y: state.y - h / 2 },
      above: { x: state.x - w / 2, y: state.y - geometry.ry - gap - h },
      below: { x: state.x - w / 2, y: state.y + geometry.ry + gap },
    };
    const side = [bubbleSide, 'left', 'right', 'above', 'below'].find(key => bubbleSafe(options[key]));
    if (!side) { bubble.style.opacity = '0'; return; }
    if (side !== bubbleSide) { bubbleSide = side; sideChanged = clock; bubblePosition = null; }
    const target = options[side];
    if (!bubblePosition) bubblePosition = { ...target };
    const blend = 1 - Math.exp(-12 * dt);
    bubblePosition.x += (target.x - bubblePosition.x) * blend;
    bubblePosition.y += (target.y - bubblePosition.y) * blend;
    const v = geometry.visible, edge = cfg.bubble.edge;
    bubblePosition.x = clamp(bubblePosition.x, v.left + edge, v.right - edge - w);
    bubblePosition.y = clamp(bubblePosition.y, v.top + edge, v.bottom - edge - h);
    const fade = Math.min(clamp(elapsed / cfg.bubble.fade, 0, 1), clamp((cfg.bubble.duration - elapsed) / cfg.bubble.fade, 0, 1), clamp((clock - sideChanged - cfg.bubble.placementHold) / cfg.bubble.fade, 0, 1));
    bubble.dataset.side = bubbleSide;
    bubble.style.transform = `translate3d(${bubblePosition.x.toFixed(2)}px,${bubblePosition.y.toFixed(2)}px,0)`;
    bubble.style.opacity = bubbleSafe(bubblePosition) ? String(fade) : '0';
  }

  function tick(now) {
    if (!active) return;
    const dt = lastTime ? Math.min((now - lastTime) / 1000, .05) : 0;
    lastTime = now; clock += dt;
    if (needsPlan) plan();
    let target = waypoints[0] ?? state;
    if (waypoints.length > 1 && distance(state, target) < 5) { waypoints.shift(); target = waypoints[0]; }
    const dx = target.x - state.x, dy = target.y - state.y, d = Math.hypot(dx, dy);
    const speed = Math.min(cfg.swim.speed, d * cfg.swim.approach);
    const blend = 1 - Math.exp(-cfg.swim.response * dt);
    state.vx += ((d > .2 ? dx / d * speed : 0) - state.vx) * blend;
    state.vy += ((d > .2 ? dy / d * speed : 0) - state.vy) * blend;
    const next = { x: state.x + state.vx * dt, y: state.y + state.vy * dt };
    if (safe(next) && segmentClear(state, next)) { state.x = next.x; state.y = next.y; }
    else { state.vx *= .25; state.vy *= .25; }
    if (waypoints.length === 1 && d < .15 && Math.hypot(state.vx, state.vy) < .5) {
      state.x = target.x; state.y = target.y; state.vx = state.vy = 0; waypoints = [];
    }
    if (Math.abs(state.vx) > 12) state.facing = state.vx > 0 ? 1 : -1;
    state.mirror += (state.facing - state.mirror) * (1 - Math.exp(-cfg.swim.flipResponse * dt));
    const angle = Math.hypot(state.vx, state.vy) > 8 ? clamp(Math.atan2(state.vy, Math.abs(state.vx) + 25) * 180 / Math.PI * state.facing, -cfg.swim.maxTilt, cfg.swim.maxTilt) : 0;
    state.angle += (angle - state.angle) * (1 - Math.exp(-cfg.swim.turnResponse * dt));
    const bob = Math.sin(clock * Math.PI * 2 / cfg.swim.bobPeriod) * cfg.swim.bob;
    render(bob);
    updateBubble(dt);
    frame = requestAnimationFrame(tick);
  }

  section.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || staticMode()) return;
    inside = true;
    const next = { x: event.clientX, y: event.clientY };
    if (!pointer || distance(next, pointer) >= cfg.swim.pointerDeadzone) { pointer = next; needsPlan = true; }
  }, { passive: true });
  section.addEventListener('pointerleave', () => { inside = false; pointer = null; needsPlan = true; });
  addEventListener('scroll', scheduleMeasure, { passive: true });
  addEventListener('resize', scheduleMeasure, { passive: true });
  document.addEventListener('visibilitychange', syncActivity);
  new MutationObserver(syncActivity).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  const observer = new ResizeObserver(scheduleMeasure);
  for (const el of [section, content, label, bubble]) observer.observe(el);
  for (const media of [reduced, finePointer, coarsePointer]) media.addEventListener('change', scheduleMeasure);
  document.fonts.ready.then(scheduleMeasure);
  measure();
}
