<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageEnter } from '~/composables/usePageEnter'
import { useScrollSpy } from '~/composables/useScrollSpy'

const pageRef = usePageEnter({ y: 20, duration: 0.6 })
const { activeId } = useScrollSpy(['overview', 'articles'])

const { data: articles } = await useAsyncData('writing', () =>
  queryCollection('writing').order('order', 'ASC').all()
)

const allTags = computed(() => {
  if (!articles.value) return []
  const set = new Set<string>()
  articles.value.forEach((a) => a.tags?.forEach((t: string) => set.add(t)))
  return ['All', ...Array.from(set).sort()]
})

const selectedTag = ref('All')

const filtered = computed(() => {
  if (!articles.value) return []
  let result = articles.value

  if (selectedTag.value !== 'All') {
    result = result.filter((a) => a.tags?.includes(selectedTag.value))
  }

  return result.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })
})

function readingTime(body: unknown): string {
  const text = JSON.stringify(body ?? '')
  const words = text.split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div ref="pageRef" class="writing-page">
    <aside class="writing-aside">
      <div class="bezel-card sticky-shell">
        <div class="core">
          <div class="aside-title">
            <span class="upside font-decoration">書く</span>
            <span class="upside">Writing</span>
          </div>

          <nav class="aside-nav">
            <a href="#overview" :class="activeId === 'overview' ? 'is-active' : ''">Overview</a>
            <a href="#articles" :class="activeId === 'articles' ? 'is-active' : ''">Articles</a>
          </nav>
        </div>
      </div>
    </aside>

    <main class="writing-main">
      <header id="overview" class="hero bezel-card">
        <div class="core">
          <span class="eyebrow"><span class="dot" />01 · writing</span>
          <h1>Technical notes from production and incident flow.</h1>
          <p>
            Systems, DevOps, observability, and security learnings.
            <span class="font-decoration"> 技術記事 </span>
          </p>

          <div class="stats-grid">
            <div class="stat-box">
              <strong>{{ articles?.length ?? 0 }}</strong>
              <span>Articles</span>
            </div>
            <div class="stat-box">
              <strong>{{ allTags.length - 1 }}</strong>
              <span>Topics</span>
            </div>
          </div>
        </div>
      </header>

      <section id="articles" class="section">
        <div class="section-head">
          <span class="section-index">02 / Articles</span>
          <span class="font-decoration kanji">記録</span>
        </div>

        <div class="tag-row bezel-card">
          <div class="core">
            <div class="pills">
              <button
                v-for="tag in allTags"
                :key="tag"
                @click="selectedTag = tag"
                class="tag-pill"
                :class="selectedTag === tag ? 'is-active' : ''"
                type="button"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="!filtered.length" class="empty bezel-card">
          <div class="core">
            <p>No articles yet.</p>
          </div>
        </div>

        <div v-else class="list bezel-card">
          <div class="core list-core">
            <NuxtLink
              v-for="(article, index) in filtered"
              :key="article.path"
              :to="article.path"
              class="item"
            >
              <span class="num">{{ String(index + 1).padStart(2, '0') }}</span>

              <div class="copy">
                <div class="badges">
                  <span v-if="article.featured" class="badge featured">
                    <LucideStar class="w-3 h-3" />
                    Featured
                  </span>
                  <span v-for="tag in article.tags" :key="tag" class="badge">{{ tag }}</span>
                </div>

                <h3>{{ article.title }}</h3>
                <p>{{ article.description }}</p>
              </div>

              <div class="meta">
                <span>{{ formatDate(article.date) }}</span>
                <span>{{ readingTime(article.body) }}</span>
              </div>

              <LucideChevronRight class="chev" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.writing-page {
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
  min-height: 320px;
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

.writing-main { display: grid; gap: 28px; }
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

.stats-grid { margin-top: 16px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; max-width: 360px; }
.stat-box { border: 1px solid var(--hairline); border-radius: 14px; background: var(--canvas-2); padding: 12px; }
.stat-box strong { font-size: 28px; line-height: 1; color: var(--ink); display: block; }
.stat-box span { font-size: 12px; color: var(--ink-2); }

.section { border-top: 1px solid var(--hairline); padding-top: 14px; }
.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.section-index { color: var(--muted); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
.kanji { font-size: 14px; opacity: 0.35; }

.tag-row .core { padding: 12px; }
.pills { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-pill {
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  color: var(--ink-2);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 11px;
}
.tag-pill.is-active { background: var(--ink); color: var(--canvas); border-color: var(--ink); }

.empty .core { padding: 20px; }
.empty p { margin: 0; color: var(--ink-2); }

.list .core { padding: 10px 16px; }
.item {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto 16px;
  gap: 14px;
  align-items: start;
  padding: 12px 0;
  border-bottom: 1px solid var(--hairline);
  text-decoration: none;
}
.item:last-child { border-bottom: none; }
.num { color: var(--hairline-strong); font-size: 11px; padding-top: 3px; }

.copy { min-width: 0; }
.badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
.badge {
  border: 1px solid var(--hairline);
  color: var(--muted);
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.badge.featured {
  border-color: rgba(31,106,78,.35);
  color: #1f6a4e;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.copy h3 {
  margin: 0;
  color: var(--ink);
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: -0.015em;
}
.copy p {
  margin: 6px 0 0;
  color: var(--ink-2);
  font-size: 13px;
  line-height: 1.55;
}

.meta {
  display: grid;
  gap: 2px;
  text-align: right;
  color: var(--muted);
  font-size: 11px;
  padding-top: 4px;
}
.chev { width: 14px; height: 14px; color: var(--hairline-strong); align-self: center; }

@media (max-width: 1024px) {
  .writing-page { grid-template-columns: 1fr; padding-top: 84px; }
  .writing-aside { display: none; }
}
@media (max-width: 767px) {
  .writing-page { padding: 74px 16px 90px; }
  .item { grid-template-columns: 24px minmax(0, 1fr); }
  .meta, .chev { display: none; }
}
</style>
