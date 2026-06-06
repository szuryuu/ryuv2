<script setup lang="ts">
import { computed } from 'vue'
import { useTimeline } from '~/composables/useTimeline'
import { certificateArray } from '@/utils/certificates'

const { linearTimeline } = useTimeline()
const certificates = certificateArray

const { data: projects } = await useAsyncData('projects-count', () =>
  queryCollection('projects').all()
)

const items = computed(() => {
  return linearTimeline.value.map((item) => ({
    title: item.title,
    description: item.description,
    label: item.date
  }))
})

const stats = [
  {
    number: `${projects.value?.length ?? 0}+`,
    label: 'Projects',
    sublabel: 'Shipped to Production',
    link: '/project'
  },
  {
    number: `${certificates.length}+`,
    label: 'Certifications',
    sublabel: 'Full-Stack & Security',
    link: '/about/skill'
  },
  {
    number: '2+',
    label: 'Years',
    sublabel: 'Building & Learning',
    link: '/about/timeline'
  }
]
</script>

<template>
  <div class="exp-wrap">
    <section class="lead bezel-card">
      <div class="core">
        <div class="line-head">
          <div class="line" />
          <span>02</span>
        </div>

        <h2>The Journey</h2>

        <div class="meta">
          <p class="font-decoration jp">経験</p>
          <p>Architect solutions, secure networks, and ship scalable systems.</p>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      <NuxtLink
        v-for="(stat, index) in stats"
        :key="index"
        :to="stat.link"
        class="stat-card bezel-card"
      >
        <div class="core">
          <span class="num-mark">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="num">{{ stat.number }}</div>
          <div class="label">{{ stat.label }}</div>
          <div class="sub">{{ stat.sublabel }}</div>
        </div>
      </NuxtLink>
    </section>

    <section class="recent bezel-card">
      <div class="core">
        <div class="recent-head">
          <div>
            <h3>Career Path</h3>
            <p>Key milestones driving technical growth.</p>
          </div>
          <NuxtLink to="/about/timeline" class="see-all">
            View Full Git Log
            <LucideChevronRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="list">
          <NuxtLink
            to="/about/timeline"
            v-for="(item, i) in items"
            :key="i"
            class="item"
          >
            <div class="item-top">
              <p>{{ item.label }}</p>
              <LucideArrowUpRight class="w-3.5 h-3.5" />
            </div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.exp-wrap {
  display: grid;
  gap: 16px;
}

.lead .core {
  padding: 22px;
}

.line-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.line-head .line {
  height: 1px;
  flex: 1;
  background: var(--hairline-strong);
}

.line-head span {
  color: var(--muted);
  font-size: 42px;
  font-weight: 700;
  line-height: 1;
}

.lead h2 {
  margin: 12px 0 6px;
  font-size: clamp(38px, 5vw, 68px);
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.meta .jp {
  margin: 0;
  color: var(--ink);
  opacity: 0.45;
}

.meta p:last-child {
  margin: 4px 0 0;
  color: var(--ink-2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat-card {
  text-decoration: none;
}

.stat-card .core {
  position: relative;
  padding: 20px;
}

.num-mark {
  position: absolute;
  right: 16px;
  top: 12px;
  color: var(--hairline-strong);
  font-size: 28px;
  font-weight: 700;
}

.num {
  font-size: 38px;
  line-height: 1;
  color: var(--ink);
  font-weight: 700;
}

.label {
  color: var(--ink-2);
  margin-top: 4px;
  font-weight: 600;
}

.sub {
  color: var(--muted);
  margin-top: 3px;
  font-size: 12px;
}

.recent .core {
  padding: 20px;
}

.recent-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 12px;
  margin-bottom: 10px;
}

.recent-head h3 {
  margin: 0;
  color: var(--ink);
  font-size: 26px;
}

.recent-head p {
  margin: 4px 0 0;
  color: var(--ink-2);
  font-size: 13px;
}

.see-all {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ink);
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 11px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.list {
  border-top: 1px solid var(--hairline);
  margin-top: 10px;
}

.item {
  display: block;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--hairline);
  padding: 12px 4px;
}

.item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-top p {
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.item-top svg {
  color: var(--hairline-strong);
}

.item h4 {
  margin: 4px 0;
  color: var(--ink);
  font-size: 17px;
}

.item p:last-child {
  margin: 0;
  color: var(--ink-2);
  font-size: 13px;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .recent-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
