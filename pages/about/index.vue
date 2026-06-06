<script setup lang="ts">
import { usePageEnter } from "~/composables/usePageEnter";
import { useScrollSpy } from "~/composables/useScrollSpy";

const pageRef = usePageEnter({ y: 20, duration: 0.6 });

const { activeId } = useScrollSpy(["intro", "journey", "skill"]);
</script>

<template>
  <div
    class="w-full min-h-[100svh] flex flex-col lg:flex-row pt-24 gap-8 max-w-7xl mx-auto"
    ref="pageRef"
  >
    <Circle
      class="!fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 -z-10"
    />

    <!-- Vertical sidebar, Zen and modern, on left -->
    <aside class="w-full hidden lg:block relative">
      <div class="flex flex-col select-none px-6 pt-8 gap-10 fixed top-32">
        <div class="flex flex-col gap-3 items-center justify-start">
          <span class="upside font-decoration text-2xl text-ink mb-2">私について</span>
          <span class="upside font-display text-lg text-ink/40">About</span>
        </div>
        <nav class="flex flex-col gap-5 mt-8 text-sm font-display">
          <a
            href="#intro"
            class="flex items-center gap-3 group transition-all duration-700 tracking-widest text-ink/40 hover:text-ink"
            :class="activeId === 'intro' ? 'text-ink font-semibold' : ''"
          >
            <span class="w-9 h-0.5 rounded-full transition-all duration-700 shrink-0"
                  :class="activeId === 'intro' ? 'bg-ink/70 w-11' : 'bg-hairline group-hover:w-11'"></span>
            Introduction
          </a>
          <a
            href="#journey"
            class="flex items-center gap-3 group transition-all duration-700 tracking-widest text-ink/40 hover:text-ink"
            :class="activeId === 'journey' ? 'text-ink font-semibold' : ''"
          >
            <span class="w-9 h-0.5 rounded-full transition-all duration-700 shrink-0"
                  :class="activeId === 'journey' ? 'bg-ink/70 w-11' : 'bg-hairline group-hover:w-11'"></span>
            Journey
          </a>
          <a
            href="#skill"
            class="flex items-center gap-3 group transition-all duration-700 tracking-widest text-ink/40 hover:text-ink"
            :class="activeId === 'skill' ? 'text-ink font-semibold' : ''"
          >
            <span class="w-9 h-0.5 rounded-full transition-all duration-700 shrink-0"
                  :class="activeId === 'skill' ? 'bg-ink/70 w-11' : 'bg-hairline group-hover:w-11'"></span>
            Skill
          </a>
        </nav>
      </div>
    </aside>

    <main class="w-full max-w-5xl space-y-20 pb-32 mx-auto px-1">
      <section id="intro" class="relative group">
        <h2 class="text-[13px] font-display text-ink/40 uppercase tracking-widest mb-12 pl-2 select-none">
          01 / Introduction
        </h2>
        <AboutIntro />
      </section>

      <section id="journey" class="relative group">
        <h2 class="text-[13px] font-display text-ink/40 uppercase tracking-widest mb-12 pl-2 select-none">
          02 / Journey
        </h2>
        <AboutExperience />
      </section>

      <section id="skill" class="relative group">
        <h2 class="text-[13px] font-display text-ink/40 uppercase tracking-widest mb-12 pl-2 select-none">
          03 / Skill
        </h2>
        <AboutSkill />
      </section>
    </main>
  </div>
</template>
