# Design Section — Video Collage Redesign

**Date:** 2026-06-02  
**Branch:** feat-map-timeline  
**Scope:** `section.frame.design` in `default.component.html / .scss / .ts`

---

## Overview

Replace the single-image building-shot in the `#design` section with two stacked sub-sections, each presenting a video collage. Videos fade in as the section enters the viewport and begin autoplaying with a staggered offset.

---

## Layout

### Section 1 — `#design-a` — Left-large / Right-small

Replaces the existing `section.frame.design#design`.

```
┌─ section.frame.design#design-a ──────────────────────────────┐
│  col-narrow (sticky)        │  col-wide                       │
│  eyebrow: THE CLUBHOUSE     │  .vg-left-wide (CSS grid)       │
│  「獨棟公設，               │  ┌──────────┬──────┐           │
│    讓你的家，               │  │          │ [V2] │           │
│    只是你的家。」           │  │  [V1]    ├──────┤           │
│  副文案: 一條動線…          │  │          │ [V3] │           │
└─────────────────────────────┴──┴──────────┴──────┘           │
```

Grid:
- `[V1]` (garden-01.webm placeholder): `grid-column: 1`, `grid-row: 1 / 3`, height 78vh
- `[V2]` (pool.webm placeholder): `grid-column: 2`, `grid-row: 1`, height ~50% of grid
- `[V3]` (bar.webm placeholder): `grid-column: 2`, `grid-row: 2`, height ~50% of grid
- Captions: `GARDEN · 花園`, `THE POOL · 泳池`, `THE BAR · 酒吧`

### Section 2 — `#design-b` — Top-large / Bottom-small

New `section.frame.design` appended after `#design-a`.

```
┌─ section.frame.design#design-b ──────────────────────────────┐
│  col-narrow (sticky)        │  col-wide                       │
│  eyebrow: (TBD)             │  .vg-top-wide (CSS grid)        │
│  標題: (placeholder)        │  ┌──────────────────────┐      │
│                             │  │       [V4]           │      │
│                             │  └──────────────────────┘      │
│                             │  ┌───────────┬──────────┐      │
│                             │  │   [V5]   │   [V6]  │      │
│                             │  └───────────┴──────────┘      │
└─────────────────────────────┴────────────────────────────────┘
```

Grid:
- `[V4]`: full-width, height 56vh — placeholder
- `[V5]`: left half, height 38vh — placeholder
- `[V6]`: right half, height 38vh — placeholder
- Captions, eyebrow, and heading text: all placeholder for now

---

## Animation

### Scroll Fade-in (GSAP ScrollTrigger)

Use the existing GSAP ScrollTrigger pattern in `ngAfterViewInit`.

```ts
gsap.from('.vg-card', {
  opacity: 0,
  y: 30,
  duration: 0.9,
  ease: 'power2.out',
  stagger: 0.25,
  scrollTrigger: {
    trigger: '#design-a', // or #design-b
    start: 'top 75%',
  },
});
```

Run the same block for `#design-b` cards separately so each section triggers independently.

### Video Autoplay Stagger

On `onEnter` of each ScrollTrigger, query the section's `<video>` elements and play them with `setTimeout` stagger:

```ts
onEnter: () => {
  const videos = Array.from(section.querySelectorAll('video'));
  videos.forEach((v, i) => setTimeout(() => v.play(), i * 350));
}
```

All `<video>` elements: `muted loop playsinline`. No `autoplay` attribute — play is triggered by scroll.

---

## HTML Structure

```html
<!-- Section 1: left-large / right-small -->
<section class="frame design" id="design-a">
  <div class="inner">
    <div class="col-narrow">
      <!-- eyebrow, h3, p — existing text -->
    </div>
    <div class="col-wide">
      <div class="video-grid vg-left-wide">
        <div class="vg-card vg-card--main">
          <video muted loop playsinline src="assets/video/garden-01.webm"></video>
          <div class="caption-fade">GARDEN · 花園</div>
        </div>
        <div class="vg-card vg-card--side">
          <video muted loop playsinline src="assets/video/pool.webm"></video>
          <div class="caption-fade">THE POOL · 泳池</div>
        </div>
        <div class="vg-card vg-card--side">
          <video muted loop playsinline src="assets/video/bar.webm"></video>
          <div class="caption-fade">THE BAR · 酒吧</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section 2: top-large / bottom-small -->
<section class="frame design" id="design-b">
  <div class="inner">
    <div class="col-narrow">
      <div class="eyebrow">
        <span class="num">THE AMENITIES · 公設精選</span>
      </div>
      <div style="height: 4rem"></div>
      <h3 class="pull-zh">每一個角落，<br />都是你的<br />私人領地。</h3>
      <p class="text-base mt-10 leading-normal">
        — 文案待補 —
      </p>
    </div>
    <div class="col-wide">
      <div class="video-grid vg-top-wide">
        <div class="vg-card vg-card--top">
          <video muted loop playsinline src="assets/video/pool.webm"></video>
          <div class="caption-fade">THE POOL · 泳池</div>
        </div>
        <div class="vg-card vg-card--bot">
          <video muted loop playsinline src="assets/video/bar.webm"></video>
          <div class="caption-fade">THE BAR · 酒吧</div>
        </div>
        <div class="vg-card vg-card--bot">
          <video muted loop playsinline src="assets/video/garden-01.webm"></video>
          <div class="caption-fade">GARDEN · 花園</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## SCSS

### `.vg-left-wide`

```scss
.vg-left-wide {
  display: grid;
  grid-template-columns: 1.85fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  height: 78vh;
  min-height: 540px;

  .vg-card--main {
    grid-column: 1;
    grid-row: 1 / 3;
  }
  .vg-card--side {
    grid-column: 2;
  }
}
```

### `.vg-top-wide`

```scss
.vg-top-wide {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 56vh 38vh;
  gap: 0.5rem;

  .vg-card--top {
    grid-column: 1 / 3;
  }
  .vg-card--bot {
    grid-column: span 1;
  }
}
```

### `.vg-card`

```scss
.vg-card {
  position: relative;
  overflow: hidden;
  background: #1a1a18; // fallback while video loads

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .caption-fade {
    // reuse existing .caption-fade styles
  }
}
```

### RWD < 900px

```scss
@media (max-width: 900px) {
  .vg-left-wide,
  .vg-top-wide {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;

    .vg-card--main,
    .vg-card--top { height: 56vw; }
    .vg-card--side,
    .vg-card--bot  { height: 40vw; }
  }
}
```

---

## Files to Change

| File | Change |
|------|--------|
| `default.component.html` | Replace `section.frame.design` with two new sections; first keeps `id="design"` (nav target), second gets `id="design-b"` |
| `default.component.scss` | Add `.video-grid`, `.vg-left-wide`, `.vg-top-wide`, `.vg-card` styles; remove `.design .building-shot` and `.design .arc-essay` blocks |
| `default.component.ts` | Remove GSAP blocks targeting `.design .building-shot`, `.design .arc-essay`, `.design .building-shot .quote-overlay .q` (lines ~551–665); add new ScrollTrigger blocks for `#design` and `#design-b` `.vg-card` elements with `onEnter` video play stagger |

### Nav ID note

`navItems` at line 117 uses `{ id: 'design', label: '大師巨作' }`. The first new section **must keep `id="design"`** — rename the spec's `#design-a` to just `id="design"` in implementation.

---

## Out of Scope

- No sound controls / mute toggle UI
- No video progress indicator
- Section 2 copy/eyebrow text — left as placeholder, filled in later
- Actual final video file assignment — all 6 slots use the 3 available files as placeholders
