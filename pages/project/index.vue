<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ProjectCard from '~/components/project/ProjectCard.vue'
import { useScrollSpy } from '~/composables/useScrollSpy'

const { activeId } = useScrollSpy(['overview', 'filter', 'showcase'])

const pageRoot = ref<HTMLElement | null>(null)

const { data: projects } = await useLazyAsyncData('projects', () =>
  queryCollection('projects').order('order', 'ASC').all()
)

if (!projects.value || projects.value.length === 0) {
  console.warn('No projects found. Add content to /content/project/')
}

const filters = ['All', 'Team Project', 'Solo Project', 'Intern Project', 'Exam Project']
const selectedFilter = ref('All')
const selectedTech = ref<string | null>(null)

const allTech = computed(() => {
  if (!projects.value) return []
  const techSet = new Set<string>()
  projects.value.forEach((project) => {
    project.tech?.forEach((t: string) => techSet.add(t))
  })
  return Array.from(techSet).sort()
})

const filteredProjects = computed(() => {
  if (!projects.value) return []
  let filtered = projects.value

  if (selectedFilter.value !== 'All') {
    filtered = filtered.filter((p) => p.type === selectedFilter.value)
  }

  if (selectedTech.value) {
    filtered = filtered.filter((p) => p.tech?.includes(selectedTech.value!))
  }

  return filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })
})

const stats = computed(() => {
  if (!projects.value) return { total: 0, featured: 0, completed: 0 }
  return {
    total: projects.value.length,
    featured: projects.value.filter((p) => p.featured).length,
    completed: projects.value.filter((p) => p.status === 'Completed').length
  }
})

let io: IntersectionObserver | null = null

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = pageRoot.value?.querySelectorAll<HTMLElement>('.reveal') ?? []

  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('is-in'))
    return
  }

  // Immediately show above-fold content
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('is-in')
    }
  })

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

  reveals.forEach(el => {
    if (!el.classList.contains('is-in')) {
      io?.observe(el)
    }
  })
})

onBeforeUnmount(() => {
  io?.disconnect()
})
</script>

<template>
  <div ref="pageRoot" class="project-page">
    <aside class="project-aside">
      <div class="bezel-card sticky-shell">
        <div class="core">
          <div class="aside-title">
            <span class="upside font-decoration">プロジェクト</span>
            <span class="upside">Projects</span>
          </div>

          <nav class="aside-nav">
            <a href="#overview" :class="activeId === 'overview' ? 'is-active' : ''">Overview</a>
            <a href="#filter" :class="activeId === 'filter' ? 'is-active' : ''">Filter</a>
            <a href="#showcase" :class="activeId === 'showcase' ? 'is-active' : ''">Showcase</a>
          </nav>
        </div>
      </div>
    </aside>

    <main class="project-main">
      <header id="overview" class="hero bezel-card">
        <div class="core">
          <span class="eyebrow"><span class="dot" />01 · archive</span>
          <h1>Project archive with production-first mindset.</h1>
          <p>
            Real systems, measurable outcomes, practical delivery.
            <span class="font-decoration"> 作品集 </span>
          </p>

          <div class="stats-grid">
            <div class="stat-box">
              <strong>{{ stats.total }}</strong>
              <span>Total Projects</span>
            </div>
            <div class="stat-box">
              <strong>{{ stats.featured }}</strong>
              <span>Featured</span>
            </div>
            <div class="stat-box">
              <strong>{{ stats.completed }}</strong>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </header>

      <section id="filter" class="section">
        <div class="section-head">
          <span class="section-index">02 / Filter</span>
          <span class="font-decoration kanji">選別</span>
        </div>

        <div class="filter-wrap bezel-card">
          <div class="core">
            <div class="filter-block">
              <p>Project Type</p>
              <div class="pills">
                <button
                  v-for="filter in filters"
                  :key="filter"
                  @click="selectedFilter = filter"
                  class="pill-btn"
                  :class="selectedFilter === filter ? 'is-active' : ''"
                >
                  {{ filter }}
                </button>
              </div>
            </div>

            <div class="filter-block">
              <div class="row-title">
                <p>Technology Stack</p>
                <button v-if="selectedTech" @click="selectedTech = null" class="clear-btn">Clear Filter</button>
              </div>

              <div class="pills">
                <button
                  v-for="tech in allTech"
                  :key="tech"
                  @click="selectedTech = selectedTech === tech ? null : tech"
                  class="pill-btn small"
                  :class="selectedTech === tech ? 'is-active' : ''"
                >
                  {{ tech }}
                </button>
              </div>
            </div>

            <div v-if="selectedFilter !== 'All' || selectedTech" class="active-filter">
              <span>
                {{ selectedFilter !== 'All' ? selectedFilter : '' }}
                {{ selectedFilter !== 'All' && selectedTech ? ' + ' : '' }}
                {{ selectedTech || '' }}
              </span>
              <strong>{{ filteredProjects.length }} results</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="showcase" class="section">
        <div class="section-head">
          <span class="section-index">03 / Showcase</span>
          <span class="font-decoration kanji">実装</span>
        </div>

        <div v-if="filteredProjects.length === 0" class="empty bezel-card">
          <div class="core">
            <LucideSearchX :size="42" class="mx-auto mb-3 text-[var(--muted)]" />
            <p>No projects found.</p>
            <button
              @click="() => { selectedFilter = 'All'; selectedTech = null }"
              class="reset-btn"
            >
              Clear all filters
            </button>
          </div>
        </div>

        <div v-else class="project-grid">
          <div v-for="project in filteredProjects" :key="project.id">
            <ProjectCard
              :project="{
                name: project.title,
                type: project.type,
                year: project.year,
                path: project.path,
                image: project.image,
                projectDetailUrl: `/project/${project.slug}`,
                liveDemoUrl: project.live || '',
                githubUrl: project.github || '',
                featured: project.featured || false,
              }"
            />
          </div>
        </div>

        <div v-if="selectedFilter !== 'All' || selectedTech" class="center-btn">
          <button
            @click="() => { selectedFilter = 'All'; selectedTech = null }"
            class="reset-btn"
          >
            View All Projects
          </button>
        </div>
      </section>

      <section class="cta bezel-card">
        <div class="core">
          <h3>Want to build something meaningful?</h3>
          <p>
            Need infra, automation, or secure delivery pipeline.
            <span class="font-decoration"> 連絡 </span>
          </p>
          <div class="cta-row">
            <NuxtLink to="/contact" class="primary-link">
              Get in Touch
              <LucideArrowRight :size="16" />
            </NuxtLink>
            <NuxtLink to="/about" class="ghost-link">
              View Experience
              <LucideUser :size="16" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>

  <ClosingCTA
    title="Build systems that ship."
    description="Open for DevOps, cloud migration, and secure platform delivery."
    cta-text="Get in Touch"
    cta-link="/contact"
    kanji="連絡"
  />
</template>

<style scoped>
.project-page {
  width: 100%;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 20px 120px;
}

.sticky-shell { position: sticky; top: 132px; }
.sticky-shell .core {
  min-height: 380px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.aside-title { display: flex; gap: 6px; }
.aside-title .upside:first-child { font-size: 18px; }
.aside-title .upside:last-child { font-size: 14px; opacity: 0.45; }

.aside-nav { display: grid; gap: 10px; }
.aside-nav a {
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 700ms var(--ease);
}
.aside-nav a::before {
  content: '';
  width: 26px;
  height: 1px;
  background: var(--hairline-strong);
  transition: width 700ms var(--ease);
}
.aside-nav a:hover,
.aside-nav a.is-active { color: var(--ink); }
.aside-nav a:hover::before,
.aside-nav a.is-active::before { width: 40px; }

.project-main { display: grid; gap: 32px; }
.hero .core { padding: 26px; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.dot { width: 6px; height: 6px; border-radius: 999px; background: #2f6a4a; box-shadow: 0 0 0 4px rgba(47,106,74,.18); }

.hero h1 {
  margin: 14px 0 10px;
  font-size: clamp(32px, 4.4vw, 56px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.hero p { margin: 0; color: var(--ink-2); }

.stats-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.stat-box {
  border: 1px solid var(--hairline);
  border-radius: 14px;
  background: var(--canvas-2);
  padding: 12px;
  display: grid;
  gap: 2px;
}
.stat-box strong { font-size: 28px; line-height: 1; color: var(--ink); }
.stat-box span { font-size: 12px; color: var(--ink-2); }

.section { border-top: 1px solid var(--hairline); padding-top: 14px; }
.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.section-index { color: var(--muted); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
.kanji { font-size: 14px; opacity: 0.35; }

.filter-wrap .core { padding: 18px; }
.filter-block + .filter-block { margin-top: 14px; }
.filter-block p { margin: 0 0 8px; color: var(--ink-2); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; }
.row-title { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.clear-btn { border: none; background: transparent; color: var(--muted); font-size: 11px; text-transform: uppercase; }
.pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pill-btn {
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  color: var(--ink);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  transition: transform 700ms var(--ease), background 700ms var(--ease);
}
.pill-btn.small { padding: 6px 12px; font-size: 11px; }
.pill-btn:hover { background: var(--canvas); }
.pill-btn.is-active { background: var(--ink); color: var(--canvas); border-color: var(--ink); }

.active-filter {
  margin-top: 12px;
  border: 1px solid var(--hairline);
  border-radius: 12px;
  background: var(--canvas-2);
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--ink-2);
  font-size: 12px;
}
.active-filter strong { color: var(--ink); }

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.empty .core { padding: 24px; text-align: center; }
.empty p { margin: 0 0 10px; color: var(--ink-2); }

.center-btn { display: flex; justify-content: center; margin-top: 14px; }
.reset-btn {
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  color: var(--ink);
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
}

.cta .core { padding: 22px; }
.cta h3 { margin: 0; color: var(--ink); font-size: 28px; letter-spacing: -0.02em; }
.cta p { margin: 8px 0 0; color: var(--ink-2); }
.cta-row { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; }
.primary-link,
.ghost-link {
  text-decoration: none;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.primary-link { background: var(--ink); color: var(--canvas); }
.ghost-link { border: 1px solid var(--hairline); color: var(--ink); background: var(--canvas-2); }

@media (max-width: 1024px) {
  .project-page { grid-template-columns: 1fr; padding-top: 84px; }
  .project-aside { display: none; }
  .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .project-page { padding: 74px 16px 90px; }
  .stats-grid,
  .project-grid { grid-template-columns: 1fr; }
}
</style>
