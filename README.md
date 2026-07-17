# Szuryuu

Personal portfolio site. A single-page Nuxt 3 application with a two-column sticky layout, selected work list, and interactive career timeline.

## Features

- **Two-column sticky layout**
  Identity block, skills, and contact pinned on one side while the bio and work list scroll independently. Collapses to a single column on narrow viewports.
- **Live dual-timezone clock**
  Displays local time (Asia/Jakarta) and visitor time side by side in the identity block. Rendered client-side via `<ClientOnly>` to avoid SSR hydration mismatches.
- **Selected work list**
  Curated project shortlist sourced from `utils/projects.ts`. Each entry shows a one-line description, tech stack, year, and an external link to the repository.
- **Interactive career timeline**
  Dot-and-line rail with multi-role support for positions like Botika (two consecutive roles). Sorted by most recent end date.

## Tech Stack

| Category            | Technologies    |
| :------------------ | :-------------- |
| **Framework**       | Nuxt 3 (SSG)    |
| **UI**              | Vue 3, @nuxt/ui |
| **Styling**         | Tailwind CSS v4 |
| **Package Manager** | Bun             |
| **Runtime**         | Node.js         |

## Getting Started

### Prerequisites

- Bun (or Node.js with npm)
- Git

### Install

```bash
git clone git@github.com:szuryuu/ryuv2.git
cd ryuv2
bun install
```

### Develop

```bash
bun run dev
```

The dev server starts at `http://localhost:3000`.

### Build

```bash
bun run build
```

Generates a static site into `.output/public` via `nuxt generate`. The output is a single pre-rendered HTML page with no server runtime required.

### Preview

```bash
bun run preview
```

Serves the generated static output locally for verification.

## Project Structure

```
.
├── pages/
│   └── index.vue          # Single-page application entry
├── utils/
│   ├── projects.ts        # Project data (title, description, tech, links)
│   └── timeline.ts        # Career timeline events and roles
├── assets/
│   └── css/
│       └── main.css       # Global styles, CSS custom properties, Tailwind
├── public/
│   ├── favicon.ico
│   ├── logo.webp
│   ├── robots.txt
│   └── cv-2026.pdf
├── app.vue                # Root component, wraps page in UApp
├── error.vue              # Minimal 404 page with redirect to home
├── nuxt.config.ts         # Nuxt configuration (SSG, modules, prerender)
├── package.json
└── tsconfig.json
```
