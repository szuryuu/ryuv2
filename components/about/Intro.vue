<script setup lang="ts"></script>

<template>
  <div class="h-full z-20 flex items-center max-w-7xl w-full px-4">
    <div class="w-full space-y-12">
      <!-- NAME & ROLE SECTION, now soft-style -->
      <section class="grid grid-cols-1 gap-8 lg:gap-12 items-center">
        <div class="space-y-8">
          <!-- Indicator: section -->
          <div class="flex items-center gap-4">
            <div class="h-px flex-1 bg-hairline"></div>
            <span class="text-5xl font-display text-hairline font-bold">01</span>
          </div>

          <!-- Text Reveal -->
          <h1 class="text-reveal font-display uppercase group cursor-pointer text-ink text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.98]">
            <span class="text-gradient-base">
              Shafwan<br />Ilham<br />Dzaky
            </span>
            <span class="text-reveal-overlay">
              Shafwan<br />Ilham<br />Dzaky
            </span>
          </h1>

          <!-- Meta info -->
          <div class="space-y-2 pl-1">
            <p class="font-decoration text-ink/30">開発者</p>
            <p class="text-xs text-ink/45 max-w-xs font-display leading-relaxed">
              DevOps Engineer with strong DevSecOps focus. Bridge automated infra, reliable systems, security-first architecture.
            </p>

            <!-- Status -->
            <div class="flex items-center gap-2 pt-2">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span class="text-xs text-green-600 uppercase tracking-wider font-display">
                Available for work
              </span>
            </div>

            <!-- CTA: soft pill -->
            <NuxtLink
              to="/project"
              class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink rounded-full bg-hairline/60 px-5 py-2.5 mt-4 font-display font-semibold shadow-none hover:bg-hairline transition-all duration-700 group/link"
              aria-label="View projects"
            >
              <span class="border-b border-hairline group-hover/link:border-ink/60">View Work</span>
              <LucideChevronRight class="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-700" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
