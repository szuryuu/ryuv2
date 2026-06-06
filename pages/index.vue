<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { usePageEnter } from '~/composables/usePageEnter'
import { devOpsSkills, fullStackSkills } from '~/utils/skills'

const pageRef = usePageEnter({ y: 20, duration: 0.6 })
const { data: githubData } = await useLazyAsyncData('github-commits', () =>
  $fetch('/api/github/commits')
)

const { data: projects } = await useAsyncData('projects-home', () =>
  queryCollection('projects').order('order', 'ASC').all()
)

const skillLabelMap: Record<string, string> = {
  js: 'JavaScript',
  typescript: 'TypeScript',
  vue: 'Vue',
  nuxtjs: 'Nuxt',
  php: 'PHP',
  laravel: 'Laravel',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  git: 'Git',
  npm: 'NPM',
  bun: 'Bun',
  vercel: 'Vercel',
  vite: 'Vite',
  ansible: 'Ansible',
  arch: 'Arch Linux',
  azure: 'Azure',
  bash: 'Bash',
  docker: 'Docker',
  githubactions: 'GitHub Actions',
  go: 'Go',
  kubernetes: 'Kubernetes',
  linux: 'Linux',
  nginx: 'Nginx',
  prometheus: 'Prometheus',
  rust: 'Rust',
  terraform: 'Terraform'
}

const marqueeSkills = computed(() => {
  const set = new Set([...devOpsSkills, ...fullStackSkills])
  return Array.from(set).map(skill => skillLabelMap[skill] ?? skill)
})

const orderedProjects = computed(() => {
  const list = projects.value ?? []
  return [...list].sort((a, b) => {
    if (a.featured === b.featured) return a.order - b.order
    return a.featured ? -1 : 1
  })
})

const bentoProjects = computed(() => orderedProjects.value.slice(0, 6))

const bentoClasses = [
  'span-3 row-2',
  'span-3',
  'span-3 dark',
  'span-2',
  'span-2',
  'span-2'
]

let io: IntersectionObserver | null = null

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = document.querySelectorAll<HTMLElement>('.reveal')

  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('is-in'))
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  )

  reveals.forEach(el => io?.observe(el))
})

onBeforeUnmount(() => {
  io?.disconnect()
})
</script>

<template>
  <div ref="pageRef" class="page-root">
    <section class="wrap hero reveal">
      <div>
        <span class="eyebrow">
          <span class="dot" />
          <span class="font-decoration">インフラ</span> · SEC · 2026 · Yogyakarta
        </span>

        <h1>Shafwan Ilham Dzaky</h1>

        <p class="lede">
          DevOps Engineer focused on cloud infrastructure, platform security, and reliable delivery.
          I build automation that ships fast, scales cleanly, and stays resilient in production.
        </p>

        <div class="actions">
          <NuxtLink to="/cv.pdf" target="_blank" class="pill">
            <span>Download CV</span>
            <span class="icon-wrap">
              <svg viewBox="0 0 12 12" stroke-width="1.6">
                <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" />
              </svg>
            </span>
          </NuxtLink>

          <NuxtLink to="/project" class="ghost">
            <span>View Projects</span>
          </NuxtLink>
        </div>
      </div>

      <aside class="hero-preview">
        <div class="core">
          <div class="preview-bar"><span /><span /><span /></div>

          <div class="preview-grid">
            <div class="pv-cell span2">
              <div class="meta">profile · live</div>
              <div class="row" style="justify-content: space-between; align-items: center">
                <div>
                  <h4 style="font-size: 14px">Shafwan Ilham Dzaky</h4>
                  <p style="margin: 0; font-size: 11px">DevOps Engineer / INFRA &amp; SEC</p>
                </div>
                <div class="ring" aria-hidden="true" />
              </div>
            </div>

            <div class="pv-cell">
              <div class="meta">status</div>
              <div class="row" style="margin-top: 4px">
                <span class="pulse" />
                <p style="margin: 0; font-size: 11px">Available for work</p>
              </div>
            </div>

            <div class="pv-cell">
              <div class="meta">stats</div>
              <div class="num">2+<small>Years</small></div>
              <div class="num">{{ githubData?.totalCommits || '500+' }}<small>Commits</small></div>
            </div>

            <div class="pv-cell span2">
              <div class="meta">location</div>
              <p style="font-size: 11.5px; line-height: 1.6">
                Yogyakarta, Indonesia · <span class="font-decoration">クラフト精神 職人</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <section id="projects" class="block reveal">
      <div class="wrap">
        <div class="section-head">
          <div>
            <span class="eyebrow"><span class="dot" />02 · projects</span>
            <p class="font-decoration section-kanji">プロジェクト</p>
          </div>
          <p>
            Infrastructure and security projects built with automation-first workflows.
            Production mindset, measurable reliability, and practical delivery.
          </p>
        </div>

        <div class="section-head" style="margin-bottom: 56px">
          <h2>
            Featured builds for cloud, security,
            <span style="color: var(--muted); font-weight: 500">and shipping velocity.</span>
          </h2>
          <span />
        </div>

        <div class="bento">
          <article
            v-for="(project, i) in bentoProjects"
            :key="project.path || i"
            :class="['b-card', bentoClasses[i] ?? 'span-2']"
          >
            <div class="core">
              <div class="meta">0{{ i + 1 }} · {{ project.type }} · {{ project.year }}</div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>

              <div v-if="i === 0" class="codeblock">
                <span class="c">// infra delivery snippet</span><br>
                <span class="k">pipeline</span>.deploy({<br>
                &nbsp;&nbsp;cloud: <span class="s">'Azure'</span>,<br>
                &nbsp;&nbsp;iac: <span class="s">'Terraform'</span>,<br>
                &nbsp;&nbsp;orchestrator: <span class="s">'Kubernetes'</span><br>
                })
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="marquee reveal">
      <div class="marquee-track">
        <span class="marquee-item">
          <template v-for="(skill, i) in marqueeSkills" :key="i">
            {{ skill }}<em v-if="i < marqueeSkills.length - 1">·</em>
          </template>
        </span>
        <span class="marquee-item" aria-hidden="true">
          <template v-for="(skill, i) in marqueeSkills" :key="`dup-${i}`">
            {{ skill }}<em v-if="i < marqueeSkills.length - 1">·</em>
          </template>
        </span>
      </div>
    </section>

    <section class="closing reveal">
      <div class="closing-inner">
        <h2>Ready to build something that ships.</h2>
        <p>
          Open for collaboration on DevOps, cloud migration, and secure platform delivery.
          Let us ship fast with clear reliability standards.
        </p>

        <NuxtLink to="/contact" class="pill">
          <span>Get in Touch</span>
          <span class="icon-wrap">
            <svg viewBox="0 0 12 12" stroke-width="1.6">
              <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" />
            </svg>
          </span>
        </NuxtLink>

        <p class="font-decoration" style="opacity: 0.24; margin-top: 14px; margin-bottom: 0">連絡</p>
      </div>
    </section>


  </div>
</template>

<style scoped>
.page-root {
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.hero {
  min-height: 100dvh;
  padding: 96px 0 120px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2f6a4a;
  box-shadow: 0 0 0 4px rgba(47, 106, 74, 0.18);
}

h1 {
  font-size: clamp(48px, 7vw, 92px);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.038em;
  margin: 22px 0 28px;
  max-width: 14ch;
}

.lede {
  color: var(--muted);
  font-size: 18px;
  max-width: 52ch;
  margin: 0 0 34px;
  line-height: 1.55;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 7px 7px 16px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--canvas);
  font: 600 13px/1 var(--font-display);
  cursor: pointer;
  border: none;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: transform 700ms var(--ease);
}

.pill .icon-wrap {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 360ms var(--ease-spring), background 700ms var(--ease);
}

.pill:hover .icon-wrap {
  transform: translate(1px, -1px) scale(1.05);
  background: rgba(255, 255, 255, 0.22);
}

.pill:active {
  transform: scale(0.98);
}

.pill svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  fill: none;
}

.ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0 0 0 1px var(--hairline-strong);
  font: 500 13.5px/1 var(--font-display);
  color: var(--ink);
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: background 700ms var(--ease), transform 700ms var(--ease);
}

.ghost:hover {
  background: rgba(255, 255, 255, 0.85);
}

.ghost:active {
  transform: scale(0.98);
}

.hero-preview {
  position: relative;
  padding: 10px;
  border-radius: var(--shell-radius);
  background: rgba(255, 255, 255, 0.45);
  box-shadow:
    inset 0 1px 0 var(--innerlight),
    0 0 0 1px var(--hairline),
    0 30px 60px -28px rgba(10, 10, 10, 0.22),
    0 12px 24px -16px rgba(10, 10, 10, 0.1);
}

.hero-preview .core {
  position: relative;
  border-radius: var(--core-radius);
  background: linear-gradient(180deg, #fafaf7 0%, #efefeb 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px var(--hairline);
  padding: 22px;
  overflow: hidden;
}

.preview-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
}

.preview-bar span {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.1);
}

.preview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.pv-cell {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 0 1px var(--hairline), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 14px;
}

.pv-cell.span2 {
  grid-column: span 2;
}

.pv-cell h4 {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.pv-cell p {
  margin: 0;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
}

.pv-cell .meta {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 9.5px;
  color: var(--muted);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.pv-cell .num {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-top: 4px;
}

.pv-cell .num small {
  font-size: 12px;
  color: var(--muted);
  margin-left: 4px;
  font-weight: 500;
}

.ring {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: conic-gradient(#2f6a4a 0 67%, rgba(10, 10, 10, 0.08) 67% 100%);
  mask: radial-gradient(circle 14px, transparent 12px, black 13px);
  -webkit-mask: radial-gradient(circle 14px, transparent 12px, black 13px);
  margin-top: 6px;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #2f6a4a;
  box-shadow: 0 0 0 0 rgba(47, 106, 74, 0.4);
  animation: pulse 2.4s var(--ease) infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(47, 106, 74, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(47, 106, 74, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(47, 106, 74, 0);
  }
}

.block {
  padding: 112px 0;
  position: relative;
}

.section-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: end;
  margin-bottom: 56px;
}

.section-head h2 {
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 16px 0 0;
  max-width: 14ch;
}

.section-head p {
  color: var(--muted);
  font-size: 16.5px;
  max-width: 46ch;
  margin: 0;
  line-height: 1.55;
}

.section-kanji {
  margin: 10px 0 0;
  font-size: 12px;
  letter-spacing: 0.18em;
  opacity: 0.35;
}

.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.b-card {
  padding: 8px;
  border-radius: var(--shell-radius);
  background: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 0 var(--innerlight),
    0 0 0 1px var(--hairline),
    0 24px 48px -28px rgba(10, 10, 10, 0.18);
  transition: transform 700ms var(--ease), box-shadow 700ms var(--ease);
}

.b-card:hover {
  transform: translateY(-3px);
  box-shadow:
    inset 0 1px 0 var(--innerlight),
    0 0 0 1px var(--hairline),
    0 30px 70px -22px rgba(10, 10, 10, 0.22);
}

.b-card .core {
  border-radius: var(--core-radius);
  background: #fcfcfa;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px var(--hairline);
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.b-card.dark .core {
  background: linear-gradient(180deg, #2a2a2a 0%, #171717 100%);
  color: #ececea;
}

.b-card.dark .core .meta,
.b-card.dark .core p {
  color: rgba(255, 255, 255, 0.62);
}

.b-card .meta {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 18px;
}

.b-card h3 {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 10px;
}

.b-card p {
  font-size: 14px;
  color: var(--muted);
  margin: 0;
  line-height: 1.55;
  max-width: 36ch;
}

.codeblock {
  margin-top: auto;
  padding: 18px;
  border-radius: 18px;
  background: #181818;
  color: #ececea;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.65;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.codeblock .k {
  color: #87a687;
}

.codeblock .s {
  color: #d0ba93;
}

.codeblock .c {
  color: rgba(236, 236, 234, 0.45);
}

.span-3 {
  grid-column: span 3;
}

.span-2 {
  grid-column: span 2;
}

.row-2 {
  grid-row: span 2;
}

.marquee {
  padding: 56px 0;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
}

.marquee-track {
  display: flex;
  gap: 64px;
  width: max-content;
  animation: track 30s linear infinite;
  will-change: transform;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes track {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.marquee-item {
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--ink);
  opacity: 0.55;
  white-space: nowrap;
}

.marquee-item em {
  font-style: normal;
  color: var(--muted);
  margin: 0 12px;
}

.closing {
  padding: 112px 0;
  margin: 56px 28px 28px;
  border-radius: 40px;
  background: linear-gradient(180deg, #212121 0%, #101010 100%);
  color: #f2f2f0;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 30px 80px -40px rgba(10, 10, 10, 0.6);
}

.closing::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(700px 360px at 30% 0%, rgba(115, 139, 168, 0.24), transparent 70%);
  pointer-events: none;
}

.closing-inner {
  position: relative;
  max-width: 1040px;
  padding: 0 32px;
  margin: 0 auto;
  text-align: center;
}

.closing h2 {
  font-size: clamp(40px, 5.5vw, 76px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 0 0 18px;
  max-width: 18ch;
  margin-inline: auto;
}

.closing p {
  color: rgba(242, 242, 240, 0.7);
  font-size: 17px;
  margin: 0 auto 32px;
  max-width: 48ch;
  line-height: 1.55;
}

.closing .pill {
  background: var(--canvas);
  color: var(--ink);
}

.closing .pill .icon-wrap {
  background: rgba(10, 10, 10, 0.08);
}


.reveal {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(8px);
  transition: opacity 800ms var(--ease), transform 800ms var(--ease), filter 800ms var(--ease);
}

.reveal.is-in {
  opacity: 1;
  transform: none;
  filter: none;
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding-top: 72px;
    padding-bottom: 90px;
  }

  .section-head {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .bento {
    grid-template-columns: repeat(2, 1fr);
  }

  .span-3,
  .span-2 {
    grid-column: span 1;
  }

  .row-2 {
    grid-row: auto;
  }
}

@media (max-width: 767px) {
  .wrap {
    padding: 0 16px;
  }

  .hero {
    padding-top: 60px;
    padding-bottom: 72px;
    gap: 30px;
  }

  .lede {
    font-size: 16px;
  }

  .bento {
    grid-template-columns: 1fr;
  }

  .closing {
    margin: 16px;
    padding: 80px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }

  .pulse,
  .marquee-track {
    animation: none;
  }
}
</style>
