// Six authored, continuous gestures. Every curve follows the same draw / hold /
// erase rhythm; the paths and palette are shared by both layout experiments.
const gestures = [
  { color: '#fdce08', d: 'M 156 330 C 50 132 289 104 533 244 C 841 421 967 212 729 146 C 499 83 613 566 866 442 C 1019 366 814 267 520 299 C 101 345 1 513 241 583 C 454 648 809 526 687 364 C 554 190 177 264 171 464 C 164 668 449 731 798 562 C 1042 444 817 338 501 429 C 176 523 320 684 598 572 C 909 447 633 250 405 320 C 190 386 290 562 783 386 C 929 333 842 244 645 293 C 424 348 407 506 649 484 C 822 468 724 414 495 522' },
  // Start blue in the upper loops: this is the scrolling preview's opening
  // gesture, so the drawing should be expressive before visitors scroll.
  { color: '#0a5fe6', d: 'M 420 190 C 336 72 125 93 166 188 C 214 278 439 160 321 104 C 228 60 198 248 385 254 C 594 262 620 74 473 91 C 315 110 475 312 672 224 C 862 141 768 51 631 105 C 483 163 716 320 871 224 C 1016 133 847 61 781 145 C 658 275 965 365 934 196 C 910 60 385 247 267 159 C 91 26 79 327 294 294 C 514 263 426 101 306 204 C 177 314 499 403 669 191 C 782 67 566 91 556 225 C 535 478 982 571 909 434 C 845 254 257 292 148 452 C 17 645 516 719 750 550 C 962 397 710 244 485 294 C 220 351 188 590 569 637 C 902 678 1026 392 728 364 C 409 334 196 461 396 550 C 675 671 883 225 651 190 C 379 145 568 568 876 499 C 925 488 858 468 786 477' },
  { color: '#f73f12', d: 'M 130 229 C 341 59 715 225 760 477 C 802 716 391 681 191 540 C -11 397 260 245 595 329 C 1013 434 1003 607 784 655 C 601 696 402 503 491 285 C 602 12 888 122 862 303 C 829 536 176 636 108 460 C 48 302 591 364 813 467 C 994 553 757 724 470 535 C 224 373 343 160 546 205 C 767 254 552 600 248 541 C 64 504 258 404 651 437 C 901 458 935 352 718 328' },
  { color: '#0abe72', d: 'M 115 415 C 73 213 291 82 445 214 C 634 376 685 615 866 555 C 1046 494 850 140 655 144 C 482 148 535 551 815 620 C 1041 676 833 739 537 596 C 188 428 12 367 113 587 C 218 819 693 533 742 361 C 785 208 283 221 256 415 C 213 715 917 574 926 380 C 937 162 702 409 476 489 C 166 599 193 348 387 326 C 638 297 704 655 536 645 C 349 635 398 491 790 454' },
  { color: '#00ded3', d: 'M 189 191 C 435 71 568 255 420 469 C 249 715 63 559 139 365 C 224 155 662 249 821 494 C 950 692 572 715 370 550 C 138 360 455 132 734 165 C 1007 197 927 496 635 563 C 289 644 87 592 200 446 C 365 232 758 281 866 402 C 1034 590 687 609 538 383 C 376 140 694 56 810 232 C 939 427 414 682 250 566 C 104 463 414 421 720 487 C 960 539 798 583 648 571' },
  { color: '#dc8ae7', d: 'M 93 428 C 170 180 529 221 771 406 C 1044 614 726 729 476 572 C 220 412 114 151 307 146 C 551 140 641 555 863 574 C 1032 589 943 273 670 252 C 310 223 107 516 327 657 C 558 806 930 537 871 374 C 810 206 429 348 226 516 C 49 661 24 413 363 390 C 772 363 1014 476 783 604 C 512 754 473 315 686 197 C 871 94 961 311 659 455 C 419 568 322 517 447 465' }
];

const stage = document.querySelector('.scribble-stage');
const svg = stage.querySelector('svg');
const line = svg.querySelector('.scribble-line');
const pauseButton = document.querySelector('[data-pause]');
const nextButton = document.querySelector('[data-next]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const firstGesture = document.body.dataset.layout === 'scroll' ? 1 : 0;
const drawDuration = 2400;
const holdDuration = 1600;
const eraseDuration = 1800;
const blankDuration = 300;
const cycleDuration = drawDuration + holdDuration + eraseDuration + blankDuration;
let elapsed = 0;
let lastTime = null;
let frame = null;
let visible = false;
let paused = false;
let current = -1;
let length = 0;
let framingDirty = true;

function render() {
  const index = (Math.floor(elapsed / cycleDuration) + firstGesture) % gestures.length;
  const phase = elapsed % cycleDuration;
  if (index !== current) {
    current = index;
    line.setAttribute('d', gestures[index].d);
    line.setAttribute('stroke', gestures[index].color);
    length = line.getTotalLength();
    framingDirty = true;
    stage.dataset.gesture = String(index);
  }
  if (framingDirty && document.body.dataset.layout === 'scroll' && stage.classList.contains('is-animated')) {
    // Hidden SVGs may return empty bounds. Frame after the animation layer
    // is visible, including on first load and when motion is re-enabled.
    const bounds = line.getBBox();
    svg.setAttribute('viewBox', `0 ${bounds.y - 12} 1000 670`);
    framingDirty = false;
  }
  let start = 0;
  let end = length;
  if (phase < drawDuration) {
    // A slight acceleration feels like a continuous hand gesture.
    end = length * Math.pow(phase / drawDuration, 0.9);
    stage.dataset.phase = 'drawing';
  } else if (phase < drawDuration + holdDuration) {
    stage.dataset.phase = 'holding';
  } else if (phase < drawDuration + holdDuration + eraseDuration) {
    start = length * ((phase - drawDuration - holdDuration) / eraseDuration);
    stage.dataset.phase = 'erasing';
  } else {
    start = length;
    stage.dataset.phase = 'blank';
  }
  line.style.strokeDasharray = `${Math.max(0, end - start)} ${length + 1}`;
  line.style.strokeDashoffset = String(-start);
  line.style.visibility = end - start < 1 ? 'hidden' : 'visible';
}

function tick(time) {
  if (lastTime !== null) elapsed += time - lastTime;
  lastTime = time;
  render();
  frame = requestAnimationFrame(tick);
}

function sync() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  lastTime = null;
  const motionAllowed = !reducedMotion.matches;
  stage.classList.toggle('is-animated', motionAllowed);
  if (motionAllowed) render();
  pauseButton.hidden = !motionAllowed;
  nextButton.hidden = !motionAllowed;
  if (motionAllowed && visible && !paused && !document.hidden) frame = requestAnimationFrame(tick);
}

pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Resume' : 'Pause';
  pauseButton.setAttribute('aria-label', paused ? 'Resume scribble animation' : 'Pause scribble animation');
  sync();
});
nextButton.addEventListener('click', () => {
  elapsed = (Math.floor(elapsed / cycleDuration) + 1) * cycleDuration + drawDuration;
  lastTime = null;
  render();
});
reducedMotion.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  sync();
}, { threshold: 0.05 }).observe(stage);
render();
sync();
