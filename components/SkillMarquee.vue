<script setup lang="ts">
import { computed } from 'vue'
import { devOpsSkills, fullStackSkills } from '~/utils/skills'

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
</script>

<template>
  <section class="marquee">
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
</template>

<style scoped>
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

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
