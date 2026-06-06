<script setup lang="ts">
import { ref, computed } from "vue";
import ProjectCard from "~/components/project/ProjectCard.vue";
import { usePageEnter } from "~/composables/usePageEnter";
import { useScrollSpy } from "~/composables/useScrollSpy";

const pageRef = usePageEnter({ y: 20, duration: 0.6 });

const { activeId } = useScrollSpy(["overview", "filter", "showcase"]);

const { data: projects } = await useAsyncData("projects", () =>
  queryCollection("projects").order("order", "ASC").all(),
);

if (!projects.value || projects.value.length === 0) {
  console.warn("No projects found. Add content to /content/project/");
}

const filters = [
  "All",
  "Team Project",
  "Solo Project",
  "Intern Project",
  "Exam Project",
];
const selectedFilter = ref("All");
const selectedTech = ref<string | null>(null);

const allTech = computed(() => {
  if (!projects.value) return [];
  const techSet = new Set<string>();
  projects.value.forEach((project) => {
    project.tech?.forEach((t: string) => techSet.add(t));
  });
  return Array.from(techSet).sort();
});

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  let filtered = projects.value;

  if (selectedFilter.value !== "All") {
    filtered = filtered.filter((p) => p.type === selectedFilter.value);
  }

  if (selectedTech.value) {
    filtered = filtered.filter((p) => p.tech?.includes(selectedTech.value!));
  }

  return filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
});

const stats = computed(() => {
  if (!projects.value) return { total: 0, featured: 0, completed: 0 };
  return {
    total: projects.value.length,
    featured: projects.value.filter((p) => p.featured).length,
    completed: projects.value.filter((p) => p.status === "Completed").length,
  };
});
</script>

<template>
  <div
    class="w-full min-h-[100svh] flex flex-col lg:flex-row pt-24 gap-8 max-w-7xl mx-auto"
    ref="pageRef"
  >
    <Circle
      class="!fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 -z-10"
    />

    <aside class="w-full hidden lg:block relative">
      <div class="flex flex-col select-none px-6 pt-8 gap-10 fixed top-32">
        <div class="flex flex-col gap-3 items-center justify-start">
          <span class="upside font-decoration text-2xl text-ink mb-2">プロジェクト</span>
          <span class="upside font-display text-lg text-ink/40">Projects</span>
        </div>
        <nav class="flex flex-col gap-5 mt-8 text-sm font-display">
          <a
            href="#overview"
            class="flex items-center gap-3 group transition-all duration-700 tracking-widest text-ink/40 hover:text-ink"
            :class="activeId === 'overview' ? 'text-ink font-semibold' : ''"
          >
            <span class="w-9 h-0.5 rounded-full transition-all duration-700 shrink-0"
              :class="activeId === 'overview' ? 'bg-ink/70 w-11' : 'bg-hairline group-hover:w-11'"
            ></span>
            Overview
          </a>
          <a
            href="#filter"
            class="flex items-center gap-3 group transition-all duration-700 tracking-widest text-ink/40 hover:text-ink"
            :class="activeId === 'filter' ? 'text-ink font-semibold' : ''"
          >
            <span class="w-9 h-0.5 rounded-full transition-all duration-700 shrink-0"
              :class="activeId === 'filter' ? 'bg-ink/70 w-11' : 'bg-hairline group-hover:w-11'"
            ></span>
            Filter
          </a>
          <a
            href="#showcase"
            class="flex items-center gap-3 group transition-all duration-700 tracking-widest text-ink/40 hover:text-ink"
            :class="activeId === 'showcase' ? 'text-ink font-semibold' : ''"
          >
            <span class="w-9 h-0.5 rounded-full transition-all duration-700 shrink-0"
              :class="activeId === 'showcase' ? 'bg-ink/70 w-11' : 'bg-hairline group-hover:w-11'"
            ></span>
            Showcase
          </a>
        </nav>
      </div>
    </aside>
    <main class="w-full max-w-5xl space-y-16 pb-32 mx-auto px-1">
      <section id="overview" class="relative group">
        <h2 class="text-[13px] font-display text-ink/40 uppercase tracking-widest mb-12 pl-2 select-none">
          01 / Overview
        </h2>
        <div class="space-y-10">
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px flex-1 bg-hairline"></div>
            <span class="text-5xl font-display text-hairline font-bold">01</span>
          </div>
          <h1 class="text-reveal font-display uppercase group cursor-pointer text-ink text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.01]">
            <span class="text-gradient-base">Project<br />Archive</span>
            <span class="text-reveal-overlay">Project<br />Archive</span>
          </h1>
          <div class="space-y-2 pl-1">
            <p class="font-decoration text-ink/30">作品集</p>
            <p class="text-xs text-ink/45 max-w-xs font-display leading-relaxed">
              Production systems, internal tools, and open-source contributions.
              Each project solved real problems with measurable impact.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div class="double-bezel-card h-full">
              <div class="bezel-shell">
                <div class="bezel-core px-6 py-6 flex flex-col items-center gap-2">
                  <div class="text-3xl md:text-4xl font-display font-bold text-ink mb-1">{{ stats.total }}</div>
                  <div class="text-xs md:text-sm font-display text-ink-2">Total Projects</div>
                </div>
              </div>
            </div>
            <div class="double-bezel-card h-full">
              <div class="bezel-shell">
                <div class="bezel-core px-6 py-6 flex flex-col items-center gap-2">
                  <div class="text-3xl md:text-4xl font-display font-bold text-ink mb-1">{{ stats.featured }}</div>
                  <div class="text-xs md:text-sm font-display text-ink-2">Featured</div>
                </div>
              </div>
            </div>
            <div class="double-bezel-card h-full">
              <div class="bezel-shell">
                <div class="bezel-core px-6 py-6 flex flex-col items-center gap-2">
                  <div class="text-3xl md:text-4xl font-display font-bold text-ink mb-1">{{ stats.completed }}</div>
                  <div class="text-xs md:text-sm font-display text-ink-2">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="filter" class="relative group">
        <h2 class="text-[13px] font-display text-ink/40 uppercase tracking-widest mb-8 pl-2 select-none">
          02 / Filter
        </h2>
        <div class="space-y-6">
          <div>
            <p class="text-sm font-display text-ink/60 mb-3 uppercase tracking-wider">
              Project Type
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="filter in filters"
                :key="filter"
                @click="selectedFilter = filter"
                class="px-4 py-2 rounded-full text-sm font-display transition-all duration-300 border border-hairline shadow-none"
                :class="
                  selectedFilter === filter
                    ? 'bg-ink text-canvas font-semibold scale-[1.07] shadow-[0_2px_8px_-2px_rgba(60,70,80,0.04)]'
                    : 'bg-hairline/40 text-ink hover:bg-hairline/90'
                "
              >
                {{ filter }}
              </button>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-display text-ink/60 uppercase tracking-wider">
                Technology Stack
              </p>
              <button
                v-if="selectedTech"
                @click="selectedTech = null"
                class="text-xs font-display text-ink/35 hover:text-ink/80 uppercase"
              >
                Clear Filter
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tech in allTech"
                :key="tech"
                @click="selectedTech = selectedTech === tech ? null : tech"
                class="px-3 py-1.5 rounded-full text-xs font-display border border-hairline shadow-none transition-all duration-250"
                :class="
                  selectedTech === tech
                    ? 'bg-ink text-canvas font-semibold scale-[1.05]'
                    : 'bg-hairline/40 text-ink hover:bg-hairline/90'
                "
              >
                {{ tech }}
              </button>
            </div>
          </div>
          <div
            v-if="selectedFilter !== 'All' || selectedTech"
            class="bg-hairline/60 rounded-full px-5 py-3 border border-hairline max-w-md mx-auto flex items-center justify-between gap-4 mt-4 shadow-none"
          >
            <div class="flex items-center gap-2">
              <LucideFilter :size="16" class="text-ink/70" />
              <span class="text-sm font-display text-ink/60">Active Filters:</span>
              <span class="text-sm font-display text-ink font-semibold">
                {{ selectedFilter !== "All" ? selectedFilter : "" }}
                {{ selectedFilter !== "All" && selectedTech ? '+' : '' }}
                {{ selectedTech || '' }}
              </span>
            </div>
            <span class="text-sm font-display text-ink/40">
              {{ filteredProjects.length }} results
            </span>
          </div>
        </div>
      </section>

      <section id="showcase" class="relative group">
        <h2 class="text-[13px] font-display text-ink/40 uppercase tracking-widest mb-8 pl-2 select-none">
          03 / Showcase
        </h2>
        <div v-if="filteredProjects.length === 0"
          class="bg-hairline/35 rounded-2xl p-12 border border-hairline text-center">
          <LucideSearchX :size="48" class="mx-auto mb-4 text-ink/40" />
          <p class="text-lg font-display text-ink mb-2">No projects found</p>
          <p class="text-sm font-display text-ink/55">
            Try adjusting your filters or
            <button
              @click="
                () => {
                  selectedFilter = 'All';
                  selectedTech = null;
                }
              "
              class="text-ink underline hover:text-ink/80"
            >
              clear all filters
            </button>
          </p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group/card"
          >
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
        <div v-if="selectedFilter !== 'All' || selectedTech" class="mt-12 text-center">
          <button
            @click="
              () => {
                selectedFilter = 'All';
                selectedTech = null;
              }"
            class="inline-flex items-center gap-2 px-6 py-3 bg-hairline/40 border border-hairline text-ink rounded-full text-sm font-display font-semibold hover:bg-hairline/80 transition-colors duration-500"
          >
            View All Projects
            <LucideArrowRight :size="16" />
          </button>
        </div>
      </section>

      <section class="relative group">
        <div class="bg-hairline/30 rounded-[2.5rem] p-10 md:p-14 border border-hairline">
          <h3 class="text-2xl font-display font-bold text-ink mb-4">Want to Build Something?</h3>
          <p class="text-sm text-ink/60 font-display mb-6">
            These projects represent my approach: understand the problem, build the right solution, ship it to production. If you have a project in mind, let's talk.
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas rounded-full text-sm font-display font-semibold hover:bg-ink-2 transition-colors duration-500"
            >
              Get in Touch
              <LucideArrowRight :size="16" />
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="inline-flex items-center gap-2 px-6 py-3 border border-hairline text-ink rounded-full text-sm font-display hover:bg-hairline transition-colors duration-500"
            >
              View Experience
              <LucideUser :size="16" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
