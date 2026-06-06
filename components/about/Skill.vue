<script setup lang="ts"></script>

<template>
  <div class="h-full z-20 flex items-center max-w-7xl w-full px-4">
    <div class="w-full space-y-24">
      <!-- CERTIFICATIONS SECTION styled soft, pastel -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <!-- Left -->
        <div class="space-y-8">
          <!-- Number indicator -->
          <div class="flex items-center gap-4">
            <span class="text-5xl font-display text-hairline font-bold inline-block -scale-x-100" aria-hidden="true">03</span>
            <div class="h-px flex-1 bg-hairline"></div>
          </div>

          <!-- Reveal Title -->
          <h2 class="text-reveal font-display uppercase group cursor-pointer text-ink text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.04]">
            <span class="text-gradient-base">Certifi<br />cations</span>
            <span class="text-reveal-overlay">Certifi<br />cations</span>
          </h2>

          <!-- Meta info -->
          <div class="space-y-2 pl-1">
            <p class="font-decoration text-ink/28">証明書</p>
            <p class="text-xs text-ink/45 max-w-xs font-display leading-relaxed">
              Professional credentials in architecture, DevOps automation, security.
            </p>
            <!-- CTA -->
            <NuxtLink
              to="/about/skill"
              class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink rounded-full bg-hairline/60 px-5 py-2.5 mt-4 font-display font-semibold shadow-none hover:bg-hairline transition-all duration-700 group/link"
              aria-label="View all certifications"
            >
              <span class="border-b border-hairline group-hover/link:border-ink/60">View All</span>
              <LucideChevronRight class="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-700" />
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-8 lg:text-right">
          <!-- Number indicator -->
          <div class="flex lg:flex-row-reverse items-center gap-4">
            <span class="text-5xl font-display text-hairline font-bold">03</span>
            <div class="h-px flex-1 bg-hairline"></div>
          </div>

          <!-- Reveal Title -->
          <h2 class="text-reveal font-display uppercase group cursor-pointer text-ink lg:text-right text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.04]">
            <span class="text-gradient-base">Tech<br />Stack</span>
            <span class="text-reveal-overlay">Tech<br />Stack</span>
          </h2>

          <!-- Meta info -->
          <div class="space-y-2 pr-1 lg:flex lg:flex-col lg:items-end">
            <p class="font-decoration text-ink/28">技術スタック</p>
            <p class="text-xs text-ink/45 max-w-xs font-display leading-relaxed lg:text-right">
              Battle-tested tools and frameworks. Production proven.
            </p>
            <!-- CTA -->
            <NuxtLink
              to="/about/skill"
              class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink rounded-full bg-hairline/60 px-5 py-2.5 mt-4 font-display font-semibold shadow-none hover:bg-hairline transition-all duration-700 group/link"
              aria-label="View all tech stack"
            >
              <span class="border-b border-hairline group-hover/link:border-ink/60">Explore</span>
              <LucideChevronRight class="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-700" />
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
