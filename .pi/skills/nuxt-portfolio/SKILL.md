---
name: nuxt-portfolio
description: Nuxt 3 best practices for szuryuu portfolio. Canvas/ink design system, bezel-card pattern, IntersectionObserver rules, Japanese accent preservation.
---

# Nuxt 3 Portfolio — Dev Patterns

## Stack

Nuxt 3 · Vue 3 · Tailwind CSS v4 · @nuxt/content v3 · @nuxtjs/supabase · @nuxt/ui · GSAP (pages only, not app.vue)

## CSS Token System

All color/spacing from CSS vars — NEVER hardcode:

```css
var(--canvas)        /* #F2F2F0 — page background */
var(--canvas-2)      /* #FDFBF7 — card inner */
var(--ink)           /* #222222 — primary text */
var(--ink-2)         /* #434343 — secondary text */
var(--muted)         /* #8d8d7b — placeholder/meta */
var(--hairline)      /* #e5e5dc — borders */
var(--hairline-strong)
var(--innerlight)    /* card highlight */
var(--shell-radius)  /* 2.25rem outer card */
var(--core-radius)   /* 1.85rem inner card */
var(--ease)          /* cubic-bezier(0.32,0.72,0,1) */
var(--ease-spring)   /* cubic-bezier(0.16,1.16,0.3,1) */
```

BANNED: `text-white` `bg-black` `bg-primary` `text-primary` `bg-white/5`

## Double-Bezel Card Pattern

Every card MUST follow:

```html
<div class="bezel-card">
  <div class="core">
    <!-- content -->
  </div>
</div>
```

`.bezel-card` and `.core` are global utilities in `assets/css/main.css`.
NEVER replicate their CSS inline.

## Japanese Accent Rules

NEVER remove:

- `class="font-decoration"` on ALL kanji text
- `class="upside"` for vertical sidebar labels
- Kanji ornament in navbar: 士
- Section subtitles: 経験 プロジェクト 技術記事 連絡先

## IntersectionObserver — SCOPED PATTERN

Always scope to page root, NEVER use document.querySelectorAll globally:

```typescript
// ✅ CORRECT — scoped to page root ref
const pageRoot = ref<HTMLElement | null>(null);

onMounted(() => {
  const reveals =
    pageRoot.value?.querySelectorAll<HTMLElement>(".reveal") ?? [];
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  reveals.forEach((el) => io?.observe(el));
});

onBeforeUnmount(() => io?.disconnect());
```

```html
<!-- Root element MUST have ref="pageRoot" -->
<template>
  <div ref="pageRoot" class="page-root">...</div>
</template>
```

❌ NEVER: `document.querySelectorAll('.reveal')`  
✅ ALWAYS: `pageRoot.value?.querySelectorAll('.reveal')`

## Data Fetching Patterns

```typescript
// Collections
const { data } = await useLazyAsyncData("key", () =>
  queryCollection("projects").order("order", "ASC").all(),
);

// Single
const { data } = await useAsyncData(`project-${slug}`, () =>
  queryCollection("projects").path(route.path).first(),
);

// External API
const { data } = await useLazyAsyncData("github-commits", () =>
  $fetch("/api/github/commits"),
);
```

## Page Transition

Defined in `app.vue`. Do NOT override per-page.

```vue
<NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
```

CSS in `assets/css/main.css`:

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

## useScrollSpy Composable

Usage:

```typescript
const { activeId } = useScrollSpy(["intro", "journey", "skill"]);
```

Bind: `:class="activeId === 'intro' ? 'is-active' : ''"`
Sections MUST have matching `id` attributes.

## Sidebar Layout Pattern

Used in: about, project, writing, contact, skill pages

```html
<div class="page-name-page">
  <!-- grid: 220px 1fr -->
  <aside class="page-name-aside">
    <div class="bezel-card sticky-shell">
      <div class="core">
        <!-- vertical kanji label + nav -->
      </div>
    </div>
  </aside>
  <main class="page-name-main">
    <!-- sections -->
  </main>
</div>
```

Aside hides on mobile (< 1024px).

## Preserved — NEVER TOUCH

- All `useAsyncData` / `queryCollection` calls
- All Supabase calls (guestbook, article_reads)
- `<ContentRenderer :value="...">` in slug pages
- Section `id` attributes used by useScrollSpy
- `composables/useScrollSpy.ts` logic
- `composables/useTimeline.ts` data
- `server/api/` routes
