# AGENTS.md — Single-Page Redesign

## Read first

This file replaces the previous `AGENTS.md` entirely. The old one described a
multi-page Japanese-accent redesign (bento grids, kanji ornaments, mesh blobs,
dark closing band). That direction is DEAD. Do not reference it, do not carry
over any of its visual language (no `.mesh`, no `font-decoration`, no bento,
no dark inverted closing section) unless this file says so.

## Mission

Collapse the entire site into **one route (`/`)**. Do NOT fetch any external
URL for reference — the structural spec is captured below, already adapted.
Build against this spec only.

### Reference structure (captured from surya-aditya.com, adapted below)

The source is a freelance developer's one-pager. Actual structure observed:

```
[small corner mark]  "C."           ← tiny static label, top-left
[small corner mark]  "2026"          ← year, top-right
H1: "Surya Aditya"
[timestamp-style line: "T.00:00:00"] ← decorative label, ignore literal clock
[row of small work thumbnails, logo-only, no captions]
"S."  [Instagram] [LinkedIn] [Behance]     ← socials, single-letter tag + links
"E."  hello@surya-aditya.com               ← email, single-letter tag
[2–3 sentence bio paragraph, plain prose, no styling tricks]
"Selected works (13)"
  01. Company Name        (link)
      - Info.  one-line description
      - Feat.  press mentions (optional, omit if none)
      - With.  collaborator credit (omit — not applicable here)
      - Year.  20XX
  02. ... repeated, 13 entries total
"Recognitions"
  - list of awards, one line each, bullet + count prefix (e.g. "3× Award Name")
```

Key aesthetic signature to replicate: **single capital-letter tags** (`C.`,
`T.`, `S.`, `E.`) as compact section labels instead of icons or nav words.
Adapt this pattern for Shafwan's site as: `N.` (name/role block), `S.`
(socials), `E.` (email), `W.` (work count). No thumbnails-only row — this
site needs one-line tech context per project, not a bare logo strip, because
DevOps hiring managers judge on described substance, not visual polish (see
Tone below for why this deviates from the literal reference).

### Adapted section list for THIS site

1. Identity block — `N.` tag, name, role, location, one status line.
2. Bio — 2–3 sentences, condensed from `content/index.md` / current about page.
3. `S.` — GitHub / LinkedIn as plain text links.
4. `E.` — email as mailto link.
5. "Selected work (N)" — numbered list, see Section 3 below for exact fields.
6. Skills line — plain text, not a marquee.
7. Footer — name · role · location · year.

This is a DevOps/infra engineer's site, not a creative-dev agency site — keep
it credible for that audience (see Tone below).

## What this page contains, in order

1. **Header / identity** — name, role, one line of location/status. No nav
   bar with multiple links. No hamburger menu. This is not a multi-page site
   anymore — don't build navigation for pages that no longer exist.
2. **Short bio** — 2–3 sentences. Who Shafwan is, what he does, what stack.
   Pull from existing `content/index.md` / `pages/about/index.vue` content,
   condensed. Do not invent facts not present in the current codebase.
3. **Selected work list** — numbered list (01, 02, 03...), NOT a bento grid,
   NOT cards with hover-tilt animations. Each entry follows the reference's
   field pattern:

   ```
   01.  Project Title                    (link to repo, if public)
        Info.   one-line description of what it does
        Stack.  key tech (2-4 items, not the full frontmatter tag list)
        Year.   YYYY
   ```

   Source data from `content/project/*.md` frontmatter — reuse the fields,
   do not duplicate content by hand.

   **Curation is NOT the agent's call.** Do not silently pick 8–12 "best"
   projects. Instead: list ALL projects found in `content/project/` with
   their title/type/year/featured flag in a proposal, and stop for human
   confirmation on the final shortlist before writing it into `index.vue`.
   This list is a professional narrative choice, not a technical one.

4. **Skills line** — plain inline text or simple wrapped tags, not a
   marquee/carousel. Source from `utils/skills.ts`.
5. **Contact** — email as a mailto link, GitHub/LinkedIn as text links. No
   `/contact` page, no form.
6. **Footer** — name · role · location · year. That's it.

## Explicitly cut from the live site

State clearly to the user before deleting anything, but the target is:

- `/about/skill`, `/about/timeline`, `/about/index` — folded into the short
  bio + skills line above, or removed.
- `/writing` and all 11 articles in `content/writing/` — NOT part of the
  1-page site. Do not build a writing section into the homepage. If Shafwan
  wants these preserved, they need their own decision (separate subdomain,
  dev.to, GitHub README) — that is out of scope for this redesign. Do not
  silently delete the markdown files themselves; leave `content/writing/`
  on disk untouched, just unroute/unlink it.
- `/guestbook` and its Supabase-backed component — cut. A guestbook doesn't
  belong on a single-page professional portfolio. Comment out or remove the
  route; leave the Supabase schema/table alone (don't touch `database/` or
  `@nuxtjs/supabase` config — just stop rendering the page).
- `/project/[slug]` detail pages — cut from navigation. Either keep the
  files unrouted (dead code, acceptable short-term) or delete the route and
  point work-list items straight to external links instead.

## Tone / restraint rules (the actual hard part)

- No mesh gradients, no blurred blob animations, no kanji, no bento grid,
  no dark "closing CTA" band, no marquee ticker.
- Motion budget: fade/slide-in on scroll for list items, that's it. No
  parallax, no cursor-follow effects, no GSAP timelines.
- Typography carries the design. Pick one strong display weight for the
  name/headline, everything else is quiet. Whitespace > ornamentation.
- If you (the agent) are about to add a visual flourish that isn't in the
  reference site and isn't asked for here — stop and ask instead of adding
  it. Restraint is the actual design requirement, not a suggestion.

## Stack constraints

- Stay on Nuxt 3 / Vue 3 / Tailwind — do not migrate framework.
- You MAY delete: `LoadingScreen.vue`, `Circle.vue`, `Menu.vue`,
  `SkillMarquee.vue` (if not reused as plain text), `ClosingCTA.vue`.
- You MUST NOT delete: `content/project/*.md`, `content/writing/*.md`,
  `database/schema.sql`, Supabase config — these are data, not dead code,
  even if unrouted.
- `useAsyncData("projects", ...)` / `queryCollection("projects")` pattern
  stays — reuse it to drive the work list.

## Order of work (do NOT run this as one giant prompt)

1. **Recon + plan** — scout inventories the repo and every project's
   frontmatter, planner writes `plan.md` with a full project list and a
   PROPOSED shortlist. No code changes in this step.
2. **Human checkpoint** — confirm or edit the shortlist in `plan.md` before
   anything is implemented. Do not skip this.
3. Strip routing: remove nav links, delete/unroute `/about/*`, `/writing`,
   `/guestbook`, `/contact`, `/project/[slug]` per rules above.
4. Rebuild `layouts/default.vue` — minimal or remove layout chrome entirely.
5. Rebuild `pages/index.vue` section by section (identity → bio → work list
   → skills → contact → footer), using the CONFIRMED shortlist from
   `plan.md`, verifying each section renders before adding the next.
6. Clean `assets/css/main.css` — remove mesh/bento/kanji rules that are no
   longer used.
7. Final pass: check for dead imports, unused components, console errors.

## Non-negotiable checklist before calling any step done

- [ ] No leftover nav links to routes that no longer exist
- [ ] No `.mesh`, `.bento`, `.b-card`, `font-decoration` classes remain
      unless explicitly kept
- [ ] Every project shown links somewhere real (repo or nothing, not `#`)
- [ ] Site is legible and functional with JS disabled (no critical content
      hidden behind animation-only reveal)
- [ ] `bun run dev` runs with zero console errors
