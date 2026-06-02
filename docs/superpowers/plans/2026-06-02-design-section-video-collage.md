# Design Section Video Collage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single building-shot image in the design section with two video collage sub-sections — Section 1 (left-large / right-small, 3 videos) and Section 2 (full-width header + 2×2 grid, 5 videos) — each with scroll-triggered fade-in and staggered autoplay.

**Architecture:** Pure HTML/SCSS/TS changes inside `default.component.*`. No new files. GSAP ScrollTrigger handles fade-in; `HTMLVideoElement.play()` with `setTimeout` stagger handles autoplay. Videos are muted/loop/playsinline — no autoplay attribute.

**Tech Stack:** Angular 16, GSAP + ScrollTrigger (already in project), CSS Grid, webm video

---

## File Map

| File | Action |
|------|--------|
| `apps/web/src/app/modules/home/pages/default/default.component.html` | Replace `section.frame.design` block (lines 106–167) |
| `apps/web/src/app/modules/home/pages/default/default.component.scss` | Remove `.design .building-shot` / `.cap` / `.arc-essay` blocks (lines 1583–1654); add `.vg-card`, `.vg-left-wide`, `.vg-top-wide` |
| `apps/web/src/app/modules/home/pages/default/default.component.ts` | Update `sectionEntries` (line 551); remove 2 selectors from `revealSelectors` (lines 592–593); remove building-shot quote animation block (lines 652–663); clean `.building-shot .ph-img` from zoom selector (line 621); add 2 new ScrollTrigger blocks with video play stagger |

---

## Task 1: HTML — Replace design section

**Files:**
- Modify: `apps/web/src/app/modules/home/pages/default/default.component.html:106-167`

- [ ] **Step 1: Delete the existing design section and insert two new sections**

Replace lines 106–167 (the entire `<!-- 06 · The Design -->` block) with:

```html
<!-- Section 1 · THE CLUBHOUSE — left-large / right-small (3 videos) -->
<section class="frame design" id="design">
  <div class="inner">
    <div class="col-narrow">
      <div class="eyebrow">
        <span class="num">THE CLUBHOUSE · 獨棟會館</span>
      </div>
      <div style="height: 4rem"></div>
      <h3 class="pull-zh">獨棟公設，<br />讓你的家，<br />只是你的家。</h3>
      <p class="text-base mt-10 leading-normal">
        一條動線屬於生活，<br/>一條動線屬於招待
      </p>
    </div>

    <div class="col-wide">
      <div class="video-grid vg-left-wide">
        <div class="vg-card vg-card--main">
          <video muted loop playsinline src="assets/video/garden-02.webm"></video>
          <div class="caption-fade">OUTDOOR GROVE · 戶外林蔭</div>
        </div>
        <div class="vg-card vg-card--side">
          <video muted loop playsinline src="assets/video/garden-01.webm"></video>
          <div class="caption-fade">GARDEN PATH · 花園弧形步道</div>
        </div>
        <div class="vg-card vg-card--side">
          <video muted loop playsinline src="assets/video/pool.webm"></video>
          <div class="caption-fade">THE POOL · 游泳池</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section 2 · THE AMENITIES — full-width header + 2×2 grid (5 videos) -->
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
          <video muted loop playsinline src="assets/video/main-gate.webm"></video>
          <div class="caption-fade">LOBBY · 門廳</div>
        </div>
        <div class="vg-card vg-card--bot">
          <video muted loop playsinline src="assets/video/restaurant.webm"></video>
          <div class="caption-fade">DINING · 食憩</div>
        </div>
        <div class="vg-card vg-card--bot">
          <video muted loop playsinline src="assets/video/theater.webm"></video>
          <div class="caption-fade">THEATER · 多功能視聽室</div>
        </div>
        <div class="vg-card vg-card--bot">
          <video muted loop playsinline src="assets/video/elevator.webm"></video>
          <div class="caption-fade">ELEVATOR HALL · 電梯廳</div>
        </div>
        <div class="vg-card vg-card--bot">
          <video muted loop playsinline src="assets/video/bar.webm"></video>
          <div class="caption-fade">SKY LOUNGE · 星空酒吧</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify the file compiles**

```bash
npx nx build web --skip-nx-cache 2>&1 | tail -20
```

Expected: no template errors. If TypeScript errors appear, they are in `.ts` (not yet changed) — ignore for now.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/modules/home/pages/default/default.component.html
git commit -m "feat: replace design section with two-section video collage HTML"
```

---

## Task 2: SCSS — Remove old styles, add video grid styles

**Files:**
- Modify: `apps/web/src/app/modules/home/pages/default/default.component.scss:1583-1654`

- [ ] **Step 1: Remove the old `.design` block and its RWD override**

Delete the entire block from `/* Design */` (line 1583) through the closing `}` of the `@media (max-width: 900px) .design` block (line 1654), inclusive:

```scss
/* Design */
.design {
  .building-shot { ... }
  .cap { ... }
  .arc-essay { ... }
}
@media (max-width: 900px) {
  .design {
    .arc-essay { ... }
    .building-shot { ... }
  }
}
```

- [ ] **Step 2: Insert new video grid styles in place of the deleted block**

Insert the following at the same position (between the end of springs-bays styles and `/* Contact */`):

```scss
/* Video grid — design sections */
.vg-card {
  position: relative;
  overflow: hidden;
  background: #1a1a18;

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

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

.vg-top-wide {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 52vh 36vh 36vh;
  gap: 0.5rem;

  .vg-card--top {
    grid-column: 1 / 3;
  }

  .vg-card--bot {
    grid-column: span 1;
  }
}

@media (max-width: 900px) {
  .vg-left-wide {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;

    .vg-card--main {
      grid-row: auto;
      height: 56vw;
    }

    .vg-card--side {
      height: 40vw;
    }
  }

  .vg-top-wide {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;

    .vg-card--top {
      height: 52vw;
    }

    .vg-card--bot {
      height: 36vw;
    }
  }
}
```

- [ ] **Step 3: Verify no SCSS compilation errors**

```bash
npx nx build web --skip-nx-cache 2>&1 | grep -i "error\|warning" | head -20
```

Expected: 0 SCSS errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/app/modules/home/pages/default/default.component.scss
git commit -m "feat: add video grid SCSS, remove obsolete building-shot styles"
```

---

## Task 3: TS — Update GSAP animations

**Files:**
- Modify: `apps/web/src/app/modules/home/pages/default/default.component.ts`

- [ ] **Step 1: Update `sectionEntries` to cover both design sections**

Find (around line 547–553):
```ts
const sectionEntries: Array<[string, string]> = [
  ['.trust', '.trust .builder-deep'],
  ['#whynow', '#whynow .inner'],
  ['.spec', '.spec .head'],
  ['.design', '.design .inner'],
  ['.contact', '.contact .pre'],
];
```

Replace the `['.design', '.design .inner']` line with two entries:
```ts
const sectionEntries: Array<[string, string]> = [
  ['.trust', '.trust .builder-deep'],
  ['#whynow', '#whynow .inner'],
  ['.spec', '.spec .head'],
  ['#design', '#design .inner'],
  ['#design-b', '#design-b .inner'],
  ['.contact', '.contact .pre'],
];
```

- [ ] **Step 2: Remove obsolete selectors from `revealSelectors`**

Find (around lines 591–593) inside the `revealSelectors` array:
```ts
        '.design .col-narrow > *',
        '.design .building-shot',
        '.design .arc-essay > *',
```

Remove `.design .building-shot` and `.design .arc-essay > *`. Keep `.design .col-narrow > *` (still valid for both new sections):
```ts
        '.design .col-narrow > *',
```

- [ ] **Step 3: Remove `.building-shot .ph-img` from the image zoom selector**

Find (around line 621):
```ts
        '.bd-img .ph-img, .group-img .ph-img, .building-shot .ph-img'
```

Replace with:
```ts
        '.bd-img .ph-img, .group-img .ph-img'
```

- [ ] **Step 4: Remove the building-shot quote animation block**

Find and delete the entire block (around lines 652–663):
```ts
      // ───── Building-shot quote subtle rise ─────
      gsap.from('.design .building-shot .quote-overlay .q', {
        y: 40,
        opacity: 0,
        duration: 1.4,
        ease,
        scrollTrigger: {
          trigger: '.design .building-shot',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
```

- [ ] **Step 5: Add new ScrollTrigger blocks for video card fade-in and autoplay stagger**

Insert the following immediately before the `// ── Refresh after fonts/layout settle ──` comment (around line 665):

```ts
      // ───── Design sections — video card fade-in + staggered autoplay ─────
      (['#design', 350] as const).concat([['#design-b', 250]] as any).forEach(
        ([sectionId, delay]: [string, number]) => {
          const cards = gsap.utils.toArray<HTMLElement>(
            `${sectionId} .vg-card`
          );
          if (!cards.length) return;
          gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: 'power2.out',
            stagger: sectionId === '#design' ? 0.25 : 0.2,
            scrollTrigger: {
              trigger: sectionId,
              start: 'top 75%',
              toggleActions: 'play none none none',
              onEnter: () => {
                const videos = Array.from(
                  document.querySelectorAll<HTMLVideoElement>(
                    `${sectionId} video`
                  )
                );
                videos.forEach((v, i) =>
                  setTimeout(() => v.play().catch(() => {}), i * delay)
                );
              },
            },
          });
        }
      );
```

> Note: `v.play().catch(() => {})` silences the browser's "play() interrupted by pause()" DOMException that fires during page unload or rapid scroll.

- [ ] **Step 6: Verify TypeScript compiles cleanly**

```bash
npx nx build web --skip-nx-cache 2>&1 | grep -i "error" | head -20
```

Expected: 0 TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/app/modules/home/pages/default/default.component.ts
git commit -m "feat: update GSAP animations for video collage design sections"
```

---

## Task 4: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npx nx serve web --open
```

- [ ] **Step 2: Verify Section 1 (left-large / right-small)**

Scroll down to the `#design` section and confirm:
- `garden-02.webm` fills the large left card (~65% width, full height)
- `garden-01.webm` and `pool.webm` fill the two right stacked cards
- Cards fade in sequentially as the section enters the viewport (opacity 0 → 1, slight upward motion)
- Videos begin playing with a staggered offset (~350 ms between each)
- Captions appear at bottom-left of each card
- At viewport < 900px: all three cards stack vertically

- [ ] **Step 3: Verify Section 2 (top-large / 2×2 grid)**

Scroll to `#design-b` and confirm:
- `main-gate.webm` spans full width at top (~52vh tall)
- `restaurant`, `theater`, `elevator`, `bar` fill a 2×2 grid below (each ~36vh)
- Fade-in and video play stagger fire independently from Section 1
- At viewport < 900px: top card at 52vw, grid cards at 36vw (2-column layout retained)

- [ ] **Step 4: Commit final**

```bash
git add -p  # confirm no unintended changes
git commit -m "feat: design section video collage complete"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Section 1 left-large layout ✓ | Section 2 top+2×2 layout ✓ | All 8 video files mapped ✓ | All captions matched ✓ | Scroll fade-in ✓ | Staggered autoplay ✓ | RWD ✓ | `id="design"` nav target preserved ✓
- [x] **No placeholders:** All code blocks are complete and runnable
- [x] **Type consistency:** `vg-card--main / --side / --top / --bot` used consistently across HTML and SCSS; `#design` / `#design-b` consistent across HTML and TS
- [x] **Old GSAP dead code removed:** `.building-shot`, `.arc-essay`, `.quote-overlay .q` animation blocks all targeted for deletion
