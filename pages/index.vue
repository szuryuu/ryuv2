<script setup lang="ts">
import { computed } from 'vue'
import { usePageEnter } from '~/composables/usePageEnter'
import { devOpsSkills, fullStackSkills } from '~/utils/skills'

const pageRef = usePageEnter({ y: 20, duration: 0.6 })
const { data: githubData } = await useLazyAsyncData("github-commits", () =>
  $fetch("/api/github/commits")
)

// Merge/uniq for marquee
const marqueeSkills = computed(() => {
  const set = new Set([...devOpsSkills, ...fullStackSkills])
  return Array.from(set)
})

const { data: projects } = await useAsyncData("projects-home", () =>
  queryCollection("projects").order("order", "ASC").all())
</script>

<template>
  <div ref="pageRef" class="w-full min-h-[100svh] flex flex-col">
    <!-- HERO -->
    <section class="wrap hero reveal">
      <div>
        <span class="eyebrow">
          <span class="dot" />インフラ · SEC · 2026 · Yogyakarta
        </span>
        <h1>
          Shafwan Ilham Dzaky
        </h1>
        <p class="lede">
          DevOps Engineer obsessed with infra, security, and speed. I craft cloud automation, defense-in-depth, and continuous shipping pipelines. Building next-gen ops with Japanese craft.
        </p>
        <div class="actions">
          <NuxtLink to="/cv.pdf" target="_blank" class="pill">
            <span>Download CV</span>
            <span class="icon-wrap">
              <svg viewBox="0 0 12 12" stroke-width="1.6"><path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" /></svg>
            </span>
          </NuxtLink>
          <NuxtLink to="/project" class="ghost">
            <span>View Projects</span>
          </NuxtLink>
        </div>
      </div>
      <aside class="hero-preview">
        <div class="core">
          <div class="preview-bar"><span></span><span></span><span></span></div>
          <div class="preview-grid">
            <div class="pv-cell span2">
              <div class="meta">name · role</div>
              <div class="row" style="justify-content:space-between;align-items:center">
                <div>
                  <h4 style="font-size:14px">Shafwan Ilham Dzaky</h4>
                  <div class="row" style="margin-top:4px">
                    <span class="pulse"></span>
                    <p style="margin:0;font-size:11px">DevOps Engineer / INFRA & SEC</p>
                  </div>
                </div>
                <div class="ring" aria-hidden="true"></div>
              </div>
            </div>
            <div class="pv-cell">
              <div class="meta">status</div>
              <div class="row" style="align-items:center;gap:5px;">
                <span class="pulse"></span>
                Available for work
              </div>
            </div>
            <div class="pv-cell">
              <div class="meta">STATS</div>
              <div class="num">2+<small>Years</small></div>
              <div class="num">{{ githubData?.totalCommits || '500+' }}<small>Commits</small></div>
            </div>
            <div class="pv-cell span2">
              <div class="meta">location</div>
              <p style="font-size:11.5px;line-height:1.6">Yogyakarta, Indonesia. 日本のクラフト精神 — <span class="font-decoration">職人</span></p>
            </div>
          </div>
        </div>
      </aside>
    </section>

    <!-- PROJECTS BENTO GRID -->
    <section class="block reveal" id="projects">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">
            <span class="dot"></span>02 · projects
          </span>
          <p>
            Featured automation, security, and cloud systems. All infra-as-code, battle-tested at scale. <span class="font-decoration text-[1.1em] opacity-40 ml-1">計画</span>
          </p>
        </div>
        <div class="section-head" style="margin-bottom:56px">
          <h2>Deploy. Defend. Ship faster. <span class="font-decoration opacity-35 ml-1">経験</span></h2>
          <span></span>
        </div>
        <div class="bento">
          <template v-for="(project, i) in (projects ?? []).slice(0, 6)" :key="project.path || i">
            <div class="b-card">
              <div class="core">
                <div class="meta">{{ project.type }} · {{ project.year }}</div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div v-if="project.tech" class="mt-3 text-sm text-[0.95em]">
                  {{ Array.isArray(project.tech) ? project.tech.join(' · ') : project.tech }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <section class="marquee reveal">
      <div class="marquee-track">
        <span class="marquee-item">
          <template v-for="(skill, i) in marqueeSkills" :key="i">
            {{ skill }}<em v-if="i<marqueeSkills.length-1">·</em>
          </template>
        </span>
        <span class="marquee-item" aria-hidden="true">
          <template v-for="(skill, i) in marqueeSkills" :key="'dup'+i">
            {{ skill }}<em v-if="i<marqueeSkills.length-1">·</em>
          </template>
        </span>
      </div>
    </section>

    <!-- CLOSING BAND -->
    <section class="closing reveal">
      <div class="closing-inner">
        <h2>Ready to build something that ships.</h2>
        <p>Available for freelance, contracts, or full-time. Let’s ship safer systems with full velocity.</p>
        <NuxtLink to="/contact" class="pill">
          <span>Get in Touch</span>
          <span class="icon-wrap">
            <svg viewBox="0 0 12 12" stroke-width="1.6"><path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" /></svg>
          </span>
        </NuxtLink>
        <div class="font-decoration mt-2 opacity-25 text-sm select-none">連絡</div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer>
      <div class="row">
        <span>Shafwan Ilham Dzaky · DevOps Engineer · Yogyakarta · v2026 <span class="font-decoration opacity-15 ml-2">職人</span></span>
        <span>
          <NuxtLink to="/about">About</NuxtLink> ·
          <NuxtLink to="/project">Projects</NuxtLink> ·
          <NuxtLink to="/writing">Writing</NuxtLink> ·
          <NuxtLink to="/contact">Contact</NuxtLink> ·
          <a href="https://github.com/szuryuu" target="_blank">GitHub</a>
        </span>
      </div>
    </footer>
  </div>
</template>
