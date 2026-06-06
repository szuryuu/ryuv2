# AGENTS.md — Personal Website Redesign Guide

# Read this file before touching any code.

## Project Overview

This is a Nuxt 3 personal portfolio website for Shafwan Ilham Dzaky — a DevOps Engineer.
Stack: Nuxt 3, Vue 3, Tailwind CSS v4, GSAP, @nuxt/content, @nuxtjs/supabase, @nuxt/ui.

You are performing a **visual redesign only**. Business logic, routing, data fetching,
composables, and content must not change. Only visual presentation changes.

---

## Active Design Skill

Read and follow `.pi/skills/web-prototype-taste-soft/SKILL.md` before writing any code.
That skill defines the full design system. This file adds project-specific constraints
on top of it.

---

## Non-Negotiable Rules

### PRESERVE — Never remove or modify these:

1. **All NuxtLink `to` props** — routing must work identically after redesign
2. **All `<script setup>` logic** — composables, refs, computed, watchers, emits
3. **All data fetching** — `useAsyncData`, `useLazyAsyncData`, `$fetch`, `queryCollection`
4. **All composable calls** — `usePageEnter`, `useScrollSpy`, `useTimeline`, `useSupabaseClient`
5. **All Supabase calls** — guestbook read/write, article_reads rpc
6. **All `defineProps` and `defineEmits`** — component contracts must not break
7. **Nuxt UI components** — `UApp`, `UButton`, `UCard`, `USeparator`, `UIcon` stay
8. **Lucide icons** — all `<LucideXxx>` components stay, only size/class may change
9. **`@nuxt/content` ContentRenderer** — `<ContentRenderer :value="...">` must stay
10. **`ref="pageRef"`** — all page refs used by `usePageEnter` must stay on root element
11. **`id` attributes on sections** — used by `useScrollSpy`, do not remove or rename
12. **Supabase auth flow** — GitHub OAuth login in contact.vue must not break

### PRESERVE — Japanese Aesthetic Elements:

These are core to the site identity. Never remove them:

1. **Kanji labels** — all Japanese text strings (e.g. `私について`, `プロジェクト`, `経験`,
   `証明書`, `コンタクト`, `書く`, `ホーム`, `読み込み中`, `芳名帳`, `目次`, etc.)
2. **`font-decoration` class** — used for Zen Old Mincho font, keep on all kanji text
3. **`writing-mode: vertical-rl`** — keep `.upside` class and all `[writing-mode:vertical-lr]`
   inline styles on sidebar labels
4. **`text-orientation: upright`** — keep on Japanese upright text
5. **Vertical sidebar navigation** — the aside with vertical Japanese text stays,
   only visual styling may update
6. **Japanese navigation items** — `item.japanese` fields in navigationItems stay
7. **Section numbering** — `01 /`, `02 /` prefix format on section headings stays

### REPLACE — Visual Layer Only:

1. **Color palette** — replace dark `#2e2e2e` background with light canvas `#F2F2F0`
   - `--color-primary: #2e2e2e` → `--canvas: #F2F2F0`
   - `--color-accent: #505050` → use `--hairline` and `--ink` variables
   - All `bg-primary`, `bg-black`, `bg-white/5` etc. → remap to light equivalents
   - Text: white/muted → `var(--ink)` / `var(--muted)`

2. **Display font** — replace Marcellus with Plus Jakarta Sans
   - `--font-display: "Marcellus"` → `--font-display: "Plus Jakarta Sans"`
   - Keep `--font-decoration: "Zen Old Mincho"` unchanged
   - Add Google Fonts import for Plus Jakarta Sans if not present

3. **Layout patterns** — apply skill patterns:
   - Floating pill navbar (replace current fixed top bar)
   - Double-bezel cards (outer shell + inner core with concentric radii)
   - Button-in-button CTAs
   - Ambient mesh blob in hero
   - Bento grid for feature sections
   - Scroll reveal with IntersectionObserver

4. **Motion** — replace all `ease-in-out` and `linear` with:
   - `cubic-bezier(0.32, 0.72, 0, 1)` for standard transitions
   - `cubic-bezier(0.16, 1.16, 0.3, 1)` for spring/bounce
   - Keep GSAP where it already exists (LoadingScreen.vue) — do not remove gsap imports

5. **Border/shadow style** — replace hard borders with:
   - `ring-1 ring-black/5` or `border border-black/8`
   - Diffuse shadows: `0 20px 40px -15px rgba(0,0,0,0.05)`
   - No `shadow-md`, `shadow-lg`

---

## File-by-File Constraints

### `assets/css/main.css`

- Keep `@import` for Zen Old Mincho from Google Fonts
- Add `@import` for Plus Jakarta Sans (weights: 400, 500, 600, 700, 800)
- Replace `--font-display` value only, not the variable name
- Keep `.upside`, `.text-reveal`, `.text-gradient-base`, `.text-reveal-overlay`
  — these may be restyled but not removed
- Keep texture overlay (`body::after`) — reduce opacity to 0.04
- Keep `scrollbar-width: none` and related scrollbar hiding rules
- Add all CSS variables from the skill: `--canvas`, `--canvas-2`, `--ink`, `--ink-2`,
  `--muted`, `--hairline`, `--hairline-strong`, `--innerlight`, `--ease`,
  `--ease-spring`, `--shell-radius`, `--core-radius`

### `layouts/default.vue`

- Replace the current fixed top bar with a floating pill navbar
- Keep `isOpen`, `isHovered` refs and toggle logic exactly as-is
- Keep `<Menu>` component rendering when `isOpen` is true
- Keep `<main>` with `<slot>` when `!isOpen`
- Keep brand text "Sz"
- Add a small kanji ornament near brand (e.g. `司` or `士`) using `font-decoration`
  at low opacity as decoration — this is new, do not remove existing content

### `components/Hero.vue`

- Keep `useLazyAsyncData("github-commits")` fetch
- Keep both NuxtLink buttons (Download CV → `/cv-2026.pdf`, View Projects → `/project`)
- Keep display of `githubData?.totalCommits`
- Apply asymmetric 2-column grid layout from skill
- Right column: double-bezel preview card showing:
  - Name: Shafwan Ilham Dzaky
  - Role: DevOps Engineer / INFRA & SEC
  - Status: Available for work (green pulse dot)
  - Stats: 2+ years, git commits count
- Ambient mesh blob behind hero
- Eyebrow tag: keep Japanese text as ornament

### `pages/about/index.vue`

- Keep `usePageEnter` and `useScrollSpy(["intro", "journey", "skill"])`
- Keep all three `<section id="intro">`, `<section id="journey">`, `<section id="skill">`
  with exact same IDs
- Keep sidebar `<aside>` with vertical Japanese text — restyle only
- Keep `<AboutIntro>`, `<AboutExperience>`, `<AboutSkill>` component rendering

### `pages/project/index.vue`

- Keep `usePageEnter` and `useScrollSpy(["overview", "filter", "showcase"])`
- Keep all filter logic: `selectedFilter`, `selectedTech`, `filteredProjects` computed
- Keep `<ProjectCard>` rendering loop with all prop mappings
- Section IDs `overview`, `filter`, `showcase` must not change

### `pages/writing/index.vue`

- Keep `usePageEnter` and `useScrollSpy(["overview", "articles"])`
- Keep tag filter logic and `filtered` computed
- Keep `readingTime()` and `formatDate()` functions
- Section IDs `overview`, `articles` must not change

### `pages/contact.vue`

- Keep entire Supabase guestbook implementation untouched
  (fetchEntries, loginWithGithub, logout, handleSubmit)
- Keep all contact links with exact `href` values
- Keep `useScrollSpy(["email", "github", "linkedin", "cv", "guestbook"])`
- Keep `id` attributes on all contact sections and `#guestbook`

### `components/CertificateCard.vue`

- Keep all props interface unchanged
- Apply double-bezel card pattern
- Keep pinned badge logic (`v-if="certificate.pinned"`)
- Keep NuxtImg with all existing attributes

### `components/project/ProjectCard.vue`

- Keep all props interface unchanged
- Remove UCard dependency — rebuild as plain div with double-bezel
- Keep featured badge logic
- Keep NuxtImg with all existing attributes
- Keep both LinkButton slots (Live Demo + Repo)

### `components/LoadingScreen.vue`

- DO NOT TOUCH this file
- GSAP animations are complex and functional — leave as-is

### `components/Circle.vue`

- This can be removed or kept as ambient mesh — but if removed,
  make sure no other component breaks (it's used in multiple places)

---

## Output Requirements

When you edit a file:

1. Output the **complete file** — no partial diffs, no "rest stays the same"
2. All imports must be at the top
3. All `<script setup>` logic before `<template>`
4. Test mentally: would `npm run dev` work after this change?
5. Check: does every `NuxtLink :to` still point to the correct route?
6. Check: does every section `id` match what `useScrollSpy` expects?

---

## What "Hallucination" Looks Like — Avoid These:

- Removing a `useAsyncData` call because "it's not needed for the UI"
- Changing `/cv-2026.pdf` to `/cv.pdf` because it "looks cleaner"
- Replacing `<ContentRenderer>` with hardcoded content
- Adding new routes or pages not in the original
- Removing `defineProps` fields because they "seem unused"
- Changing section `id` values (e.g. `id="intro"` → `id="introduction"`)
- Importing new external libraries not already in `package.json`
- Using `localStorage` or `sessionStorage` directly in components
  (Supabase handles auth state)
- Removing the `ref="pageRef"` on root elements

---

## Order of Work

Do not skip steps. Complete and verify each before moving to the next.

```
Step 1: assets/css/main.css          — tokens and variables
Step 2: layouts/default.vue          — global navbar
Step 3: components/Hero.vue          — homepage hero
Step 4: pages/about/index.vue        — about page shell
Step 5: components/about/Intro.vue   — intro section
Step 6: components/about/Experience.vue
Step 7: components/about/Skill.vue
Step 8: pages/project/index.vue
Step 9: components/project/ProjectCard.vue
Step 10: pages/writing/index.vue
Step 11: pages/contact.vue
Step 12: components/CertificateCard.vue
Step 13: pages/project/[slug].vue    — project detail
Step 14: pages/writing/[slug].vue    — writing detail
```

After each step, run `npm run dev` and verify in browser before proceeding.
