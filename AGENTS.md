# AGENTS.md — Personal Website Redesign Guide v2

# Read this entire file before touching any code.

---

## Project Overview

Nuxt 3 personal portfolio — Shafwan Ilham Dzaky, DevOps Engineer.
Stack: Nuxt 3, Vue 3, Tailwind CSS v4, @nuxt/content, @nuxtjs/supabase, @nuxt/ui.

**Mission:** Redesign the entire site to follow `.pi/skills/web-prototype-taste-soft/example.html`
as the layout and visual reference. Tweak with Japanese accent and replace all content
with the site's actual content. Every page follows the same design language.

---

## The Visual Reference

The source of truth for all visual decisions is:
`.pi/skills/web-prototype-taste-soft/example.html`

Read it in full before editing any file. It defines:

- Exact CSS variable names and values
- Exact component structure (nav-shell → nav, b-card → core, etc.)
- Exact motion and shadow rules
- Exact typography scale

---

## Design Tokens (already in assets/css/main.css — do not change)

```
--canvas: #F2F2F0        background
--canvas-2: #FDFBF7      card inner background
--ink: #222222           primary text
--ink-2: #434343         secondary text
--muted: #8d8d7b         muted text
--hairline: #e5e5dc      borders
--hairline-strong: #b3b3a5
--innerlight: #faf9f7    inner card highlight
--ease: cubic-bezier(0.32,0.72,0,1)
--ease-spring: cubic-bezier(0.16,1.16,0.3,1)
--shell-radius: 2.25rem
--core-radius: 1.85rem
--font-display: "Plus Jakarta Sans"
--font-decoration: "Zen Old Mincho"   ← NEVER remove this
```

---

## Japanese Accent Rules (NEVER remove)

These elements must appear on every relevant page:

1. Kanji labels on all sidebar vertical text using `font-decoration` class
2. `writing-mode: vertical-rl` on sidebar labels (class `.upside` or inline style)
3. Kanji ornament near brand in navbar (small, low opacity)
4. Section kanji subtitles (e.g. `経験`, `プロジェクト`, `技術記事`, `連絡先`)
5. Japanese text in footer monospace area
6. `font-decoration` class on ALL kanji text — never remove it

---

## Global Layout Structure (follows example.html)

Every page must have this shell:

```
<div class="mesh" />              ← ambient mesh blob (fixed, pointer-events-none)
<nav class="nav-shell">           ← floating pill navbar
  <header class="nav">
    Brand (Sz + kanji ornament)
    Nav links (About Projects Writing Contact) ← hidden on mobile
    CTA button (pill with button-in-button arrow)
    Mobile: hamburger → dropdown pill (NOT full-screen overlay)
  </header>
</nav>
<NuxtPage />                      ← page content
<footer>                          ← monospace, hairline above, follows example.html
```

---

## File: `app.vue`

- Remove `<LoadingScreen>` entirely
- Remove `LoadingScreen` import
- Remove all loading/curtain state: `isLoading`, `isClosing`, `isInitialLoad`,
  `resolveNavigation`, `onCloseDone`, `onCurtainOpened`
- Remove `router.beforeEach` navigation hook
- Remove `nuxtApp.hook("page:finish")`
- Keep `<UApp>`, `<NuxtLayout>`, `<NuxtPage>`
- Add `<div class="mesh" aria-hidden="true" />` as first child inside UApp
- Remove `<Circle>` from app.vue (ambient mesh replaces it)
- Add page transition: simple `opacity` fade using Nuxt `<NuxtPage :transition>`:
  ```vue
  <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
  ```
  Add to main.css:
  ```css
  .page-enter-active,
  .page-leave-active {
    transition: opacity 400ms var(--ease);
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
  ```

---

## File: `components/LoadingScreen.vue`

DELETE this file entirely. Do not keep it.

---

## File: `components/Circle.vue`

DELETE this file entirely. Ambient mesh in app.vue replaces it.
After deleting, remove ALL references to `<Circle>` in every Vue file.

---

## File: `assets/css/main.css`

Add these after existing variables:

```css
/* Ambient mesh */
.mesh {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.mesh::before,
.mesh::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  will-change: transform;
}
.mesh::before {
  width: 720px;
  height: 720px;
  background: radial-gradient(circle at 30% 30%, #8fa8c8, transparent 60%);
  top: -180px;
  left: -160px;
  animation: drift1 28s var(--ease) infinite alternate;
}
.mesh::after {
  width: 560px;
  height: 560px;
  background: radial-gradient(circle at 60% 60%, #c9b79a, transparent 60%);
  top: 120px;
  right: -140px;
  animation: drift2 36s var(--ease) infinite alternate;
}
@keyframes drift1 {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(80px, 60px, 0);
  }
}
@keyframes drift2 {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-60px, 40px, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .mesh::before,
  .mesh::after {
    animation: none;
  }
}

/* Double-bezel utility */
.bezel-card {
  padding: 8px;
  border-radius: var(--shell-radius);
  background: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 0 var(--innerlight),
    0 0 0 1px var(--hairline),
    0 24px 48px -28px rgba(10, 10, 10, 0.18);
}
.bezel-card .core {
  border-radius: var(--core-radius);
  background: var(--canvas-2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    inset 0 0 0 1px var(--hairline);
  padding: 32px;
  height: 100%;
}
```

Keep ALL existing rules. Do not remove `.upside`, `.text-reveal`, `.text-gradient-base`,
`.text-reveal-overlay`, scrollbar hiding, texture overlay, scroll-margin-top rules.

---

## File: `layouts/default.vue`

Replace entirely with floating pill navbar that follows example.html EXACTLY.
Structure must be:

```
nav-shell (sticky top-6 z-50, rounded-full, backdrop-blur)
└── nav (flex, rounded-full, glass)
    ├── brand: "Sz" + kanji ornament 士 (font-decoration, opacity-30)
    ├── ul: links (About /about, Projects /project, Writing /writing, Contact /contact)
    │   hidden on mobile (< 768px)
    ├── pill CTA button: "Contact" with button-in-button arrow → /contact
    └── mobile-only: hamburger icon button
        opens: small dropdown pill below nav
        dropdown contains: same nav links stacked vertically
        close on NuxtLink click
```

CSS classes must mirror example.html `.nav-shell`, `.nav`, `.pill` exactly.
Primary CTA pill: `background: var(--ink); color: var(--canvas)`.

Remove `<Menu>` component usage from layout entirely.
Remove `isOpen`, `isHovered` refs (replaced by mobile dropdown state).
Keep `<slot />` inside `<main>`.
Add `position: relative; z-index: 1;` on main to sit above mesh.

---

## File: `pages/index.vue` (Home)

This page must follow example.html section-by-section EXACTLY.
Replace `<Hero />` component. Build all sections directly in this page.

### Section 1: Hero (min-h-[100dvh])

```
Asymmetric grid: 1.05fr 0.95fr
Left column:
  - Eyebrow tag (pill, mono, uppercase): "インフラ · SEC · 2026 · Yogyakarta"
    with green pulse dot
  - h1: clamp(48px,7vw,92px), weight 700, line-height 0.96, letter-spacing -0.038em
    "INFRA & SEC" or "Shafwan Ilham Dzaky" — bold display
  - p.lede: DevOps Engineer description, max-w-[52ch]
  - Two CTAs: primary pill (Download CV, button-in-button arrow)
              ghost pill (View Projects)

Right column:
  - Double-bezel preview card (follows .hero-preview / .core from example.html)
    Inside show:
    - Name: Shafwan Ilham Dzaky
    - Role badge: DevOps Engineer / INFRA & SEC
    - Status: green pulse + "Available for work"
    - Stats: 2+ Years | {githubCommits} Commits
    - Keep useLazyAsyncData("github-commits") fetch
```

### Section 2: Bento Grid (id="projects")

```
Eyebrow: "02 · projects"
Section head (2-col grid): h2 + description paragraph
Bento grid (6-col):
  - span-3 row-2: Featured project card (CloudOps or VMSS)
    with codeblock showing key tech snippet
  - span-3: Second featured project
  - span-3 dark: Third featured project
  - span-2 + span-2 + span-2: Three more projects
Pull from useAsyncData("projects") queryCollection — show featured ones first.
Each b-card: .b-card structure from example.html exactly.
```

### Section 3: Marquee

```
Tech stack marquee — use devOpsSkills + fullStackSkills from utils/skills.ts
Format: "Go · Terraform · Azure · Kubernetes · Nuxt · Laravel · ..."
Duplicate track for infinite scroll. Pause on hover.
```

### Section 4: Closing Band

```
Dark inverted surface (follows .closing from example.html exactly)
margin: 56px 28px 28px; border-radius: 40px;
h2: "Ready to build something that ships."
p: brief availability/collaboration pitch
CTA pill: "Get in Touch" → /contact (pill with button-in-button, light colors)
Japanese accent: small kanji 連絡 near or below CTA at low opacity
```

### Section 5: Footer

```
Follows example.html footer EXACTLY:
font-family: var(--mono); font-size: 11px; color: var(--muted);
padding: 36px 28px 28px;
Two-column row (justify-between):
  Left:  "Shafwan Ilham Dzaky · DevOps Engineer · Yogyakarta · v2026"
  Right: links → About · Projects · Writing · Contact · GitHub
Hairline border above footer.
Japanese accent: add "職人" or "士" in the left area at very low opacity.
```

---

## File: `components/Hero.vue`

DELETE this file. Its content is now built directly in `pages/index.vue`.

---

## Pages: about, project, writing, contact, [slug] pages

These pages keep their routing, logic, data fetching, and composables UNCHANGED.
Only update the visual layer to match the design language from example.html:

**Rules for all inner pages:**

- No `<Circle>` references (already deleted)
- Sidebar vertical kanji text: keep using `.upside` + `font-decoration`
- Section headers: follow eyebrow tag pattern from example.html
- Cards: use `.bezel-card > .core` pattern (from global CSS above)
- Buttons: use `.pill` pattern for primary, ghost pill for secondary
- Colors: `var(--ink)`, `var(--canvas)`, `var(--muted)`, `var(--hairline)` only
- No `text-white`, `bg-primary`, `bg-black`, `bg-white/5` anywhere
- Inner page prose (writing/[slug], project/[slug]): keep `prose-invert` for now
  BUT change background to canvas, update prose colors to ink

**Specific fixes per file:**

`pages/about/skill.vue`:

- Sidebar: update to ink palette (currently still has `text-white`)
- Filter buttons: pill style, ink/canvas
- Skill icon grid: canvas-2 background, hairline border

`pages/about/timeline.vue`:

- Full redesign to ink/canvas palette
- Timeline dots: keep colors but update card backgrounds to canvas-2/hairline

`error.vue`:

- Update to light canvas palette
- 404 number: `text-ink/10` instead of `text-white/10`
- Quick nav links: bezel-card style

`components/Menu.vue`:

- DELETE this file (nav is now in layout directly)

`components/LinkButton.vue`:

- Update: remove `bg-primary border-accent` references
- Use: `border border-hairline bg-canvas-2 text-ink hover:bg-canvas`

---

## Responsive Rules (apply to ALL files)

```
Mobile < 768px:
  - hero: single column, mesh blobs smaller
  - bento grid: grid-cols-1, all span-* reset to span-1
  - nav: hide ul links, show mobile dropdown
  - closing: margin 16px, padding 80px 0
  - sidebar aside: hidden (lg:block stays)

Tablet 768-1024px:
  - hero: single column or tight 2-col
  - bento: grid-cols-2

Desktop > 1024px:
  - full layout as designed
```

---

## Motion Rules (follow example.html exactly)

- Transitions: `transition: transform 700ms cubic-bezier(0.32,0.72,0,1)` minimum
- Hover CTA: outer pill `scale(0.98)` on `:active`, inner icon circle `translate(+1px,-1px) scale(1.05)` on hover
- Scroll entry: `translateY(16px) blur(8px) opacity(0)` → revealed via IntersectionObserver
- Marquee: `transform: translateX(-50%)` over `30s linear` infinite, pause on hover
- Mesh blob: 28s+ drift, `opacity` and `transform` only
- Bento card hover: `translateY(-3px)`, no width/height animation
- BANNED: `ease-in-out`, `linear` (except marquee), `width` animation, `height` animation

---

## What to Remove Completely

These must not exist anywhere after this redesign:

- `LoadingScreen.vue` — delete file
- `Circle.vue` — delete file
- `<LoadingScreen>` in app.vue
- `<Circle>` in any file
- Any reference to `--color-primary`, `bg-primary`, `text-primary`
- `isLoading`, `isClosing`, `isInitialLoad` state
- `router.beforeEach` navigation guard in app.vue
- `Menu.vue` component (full-screen overlay menu)
- `gsap` in app.vue (keep only in files that still use it: none after LoadingScreen deleted)
- Green flash during navigation (caused by old curtain using bg-primary which had no value)
- `text-white`, `bg-black`, `bg-white/5` in page/layout files

---

## PRESERVED — Never Touch

1. All NuxtLink `:to` values
2. All `<script setup>` logic in page files
3. All `useAsyncData`, `queryCollection`, `$fetch` calls
4. All Supabase calls (guestbook, article_reads)
5. `usePageEnter`, `useScrollSpy`, `useTimeline` composables
6. All `defineProps` interfaces
7. `<ContentRenderer :value="...">` in slug pages
8. Section `id` attributes used by useScrollSpy
9. All kanji text content
10. `font-decoration` class on all kanji

---

## Order of Work

```
Step 1: assets/css/main.css          — add mesh + bezel utility classes
Step 2: app.vue                      — remove LoadingScreen, add mesh div, add page transition
Step 3: DELETE LoadingScreen.vue     — rm components/LoadingScreen.vue
Step 4: DELETE Circle.vue            — rm components/Circle.vue
Step 5: DELETE components/Menu.vue   — rm components/Menu.vue
Step 6: layouts/default.vue          — rebuild navbar following example.html exactly
Step 7: pages/index.vue              — rebuild home following example.html section by section
Step 8: DELETE components/Hero.vue   — rm components/Hero.vue
Step 9: components/LinkButton.vue    — update to canvas/ink palette
Step 10: pages/about/skill.vue       — update sidebar + filter to ink palette
Step 11: pages/about/timeline.vue    — update to canvas palette
Step 12: error.vue                   — update to canvas palette
Step 13: pages/project/[slug].vue    — update prose area colors
Step 14: pages/writing/[slug].vue    — update prose area colors
```

After each step, run `bun run dev` and verify in browser.
Do not continue to next step until current step renders without console errors.

---

## Critical: No Hallucination Checklist

Before saving any file, verify:

- [ ] No `bg-primary` or `text-white` in page/layout files
- [ ] No `<Circle>` or `<LoadingScreen>` references
- [ ] No `<Menu>` component
- [ ] Every NuxtLink still has correct `:to`
- [ ] Section IDs unchanged (intro, journey, skill, overview, filter, showcase, articles, guestbook)
- [ ] `ref="pageRef"` still on root element of each page
- [ ] `font-decoration` on all kanji text
- [ ] No `<style>` block inside `<template>`
- [ ] `<ContentRenderer>` still present in slug pages
- [ ] Footer present on home page (pages/index.vue)
