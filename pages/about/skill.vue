<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  fullStackSkills,
  devOpsSkills,
  cyberSecuritySkills,
  skillUrl
} from '@/utils/skills'
import { certificateArray } from '@/utils/certificates'
import { usePageEnter } from '~/composables/usePageEnter'
import { useScrollSpy } from '~/composables/useScrollSpy'

const pageRef = usePageEnter({ y: 20, duration: 0.6 })

const { activeId } = useScrollSpy([
  'certificates',
  'fullstack',
  'devops',
  'security'
])

const filterItems = ['All', 'FullStack', 'DevOps', 'CyberSec']
const selectedFilter = ref('All')

const filteredCertificates = computed(() => {
  let certs = [...certificateArray]
  if (selectedFilter.value !== 'All') {
    certs = certs.filter((c) => c.skill === selectedFilter.value)
  }
  return certs.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })
})
</script>

<template>
  <div ref="pageRef" class="skill-page">
    <aside class="skill-aside">
      <div class="bezel-card sticky-shell">
        <div class="core">
          <div class="aside-title">
            <span class="upside font-decoration">スキル</span>
            <span class="upside">Skills & Certs</span>
          </div>

          <nav class="aside-nav">
            <a href="#certificates" :class="activeId === 'certificates' ? 'is-active' : ''">Certificates</a>
            <a href="#fullstack" :class="activeId === 'fullstack' ? 'is-active' : ''">Full Stack</a>
            <a href="#devops" :class="activeId === 'devops' ? 'is-active' : ''">DevOps</a>
            <a href="#security" :class="activeId === 'security' ? 'is-active' : ''">Security</a>
          </nav>
        </div>
      </div>
    </aside>

    <main class="skill-main">
      <header class="head bezel-card">
        <div class="core">
          <span class="eyebrow"><span class="dot" />02 · capability</span>
          <h1>Skills, certifications, and delivery stack.</h1>
          <p>
            Practical tooling for frontend, backend, infrastructure, and defense.
            <span class="font-decoration"> 技術と改善 </span>
          </p>
        </div>
      </header>

      <section id="certificates" class="block">
        <div class="block-head">
          <span class="index">01 / Certificates</span>
          <span class="font-decoration kanji">証明書</span>
        </div>

        <div class="filters">
          <button
            v-for="filter in filterItems"
            :key="filter"
            @click="selectedFilter = filter"
            class="filter-pill"
            :class="selectedFilter === filter ? 'is-active' : ''"
          >
            {{ filter }}
          </button>
        </div>

        <div v-if="filteredCertificates.length === 0" class="empty bezel-card">
          <div class="core">
            <p>No certificates found.</p>
          </div>
        </div>

        <div v-else class="cert-grid">
          <CertificateCard
            v-for="cert in filteredCertificates"
            :key="cert.id"
            :certificate="cert"
          />
        </div>
      </section>

      <section id="fullstack" class="block">
        <div class="block-head">
          <span class="index">02 / Full Stack</span>
          <span class="font-decoration kanji">開発</span>
        </div>
        <p class="sub">Building full web systems from UI to APIs and data layers.</p>
        <div class="icon-grid">
          <div v-for="skill in fullStackSkills" :key="skill" class="icon-cell">
            <img :src="`${skillUrl}?i=${skill}`" :alt="skill" loading="lazy">
            <span>{{ skill }}</span>
          </div>
        </div>
      </section>

      <section id="devops" class="block">
        <div class="block-head">
          <span class="index">03 / DevOps</span>
          <span class="font-decoration kanji">運用</span>
        </div>
        <p class="sub">Automating CI/CD, cloud operations, observability, and IaC.</p>
        <div class="icon-grid">
          <div v-for="skill in devOpsSkills" :key="skill" class="icon-cell">
            <img :src="`${skillUrl}?i=${skill}`" :alt="skill" loading="lazy">
            <span>{{ skill }}</span>
          </div>
        </div>
      </section>

      <section id="security" class="block">
        <div class="block-head">
          <span class="index">04 / Security</span>
          <span class="font-decoration kanji">防御</span>
        </div>
        <p class="sub">Security baseline, hardening, and defensive engineering practices.</p>
        <div class="icon-grid">
          <div v-for="skill in cyberSecuritySkills" :key="skill" class="icon-cell">
            <img :src="`${skillUrl}?i=${skill}`" :alt="skill" loading="lazy">
            <span>{{ skill }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.skill-page {
  width: 100%;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 20px 120px;
}

.sticky-shell {
  position: sticky;
  top: 132px;
}

.sticky-shell .core {
  min-height: 430px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.aside-title {
  display: flex;
  gap: 6px;
}

.aside-title .upside:first-child {
  font-size: 18px;
}

.aside-title .upside:last-child {
  font-size: 14px;
  opacity: 0.45;
}

.aside-nav {
  display: grid;
  gap: 10px;
}

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
  transition: width 700ms var(--ease), background 700ms var(--ease);
}

.aside-nav a:hover,
.aside-nav a.is-active {
  color: var(--ink);
}

.aside-nav a:hover::before,
.aside-nav a.is-active::before {
  width: 40px;
  background: var(--ink);
}

.skill-main {
  display: grid;
  gap: 44px;
}

.head .core {
  padding: 26px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2f6a4a;
  box-shadow: 0 0 0 4px rgba(47, 106, 74, 0.18);
}

.head h1 {
  margin: 14px 0 10px;
  font-size: clamp(30px, 4vw, 52px);
  line-height: 1;
  letter-spacing: -0.03em;
}

.head p {
  margin: 0;
  color: var(--muted);
}

.block {
  border-top: 1px solid var(--hairline);
  padding-top: 16px;
}

.block-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.index {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.kanji {
  font-size: 14px;
  opacity: 0.35;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.filter-pill {
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  color: var(--ink);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  transition: transform 700ms var(--ease), background 700ms var(--ease), color 700ms var(--ease);
}

.filter-pill:hover {
  background: var(--canvas);
}

.filter-pill.is-active {
  background: var(--ink);
  color: var(--canvas);
  border-color: var(--ink);
}

.empty .core p {
  margin: 0;
  color: var(--muted);
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.sub {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 14px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 10px;
}

.icon-cell {
  border-radius: 16px;
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  min-height: 82px;
  display: grid;
  place-items: center;
  gap: 7px;
  padding: 10px 6px;
  transition: transform 700ms var(--ease), border-color 700ms var(--ease);
}

.icon-cell:hover {
  transform: translateY(-3px);
  border-color: var(--hairline-strong);
}

.icon-cell img {
  width: 28px;
  height: 28px;
}

.icon-cell span {
  font-size: 10px;
  color: var(--muted);
  text-transform: capitalize;
  text-align: center;
}

@media (max-width: 1024px) {
  .skill-page {
    grid-template-columns: 1fr;
    padding-top: 84px;
  }

  .skill-aside {
    display: none;
  }

  .cert-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .icon-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .skill-page {
    padding: 74px 16px 90px;
  }

  .cert-grid {
    grid-template-columns: 1fr;
  }

  .icon-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
