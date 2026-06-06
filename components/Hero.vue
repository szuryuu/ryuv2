<script setup lang="ts">
const { data: githubData } = await useLazyAsyncData("github-commits", () =>
  $fetch("/api/github/commits"),
);
</script>

<template>
  <div
    class="min-h-[100svh] w-full flex flex-col justify-center items-center relative overflow-hidden px-6"
  >
    <!-- Ambient mesh blob -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[320px] md:w-[580px] md:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full opacity-[0.17] bg-gradient-radial from-[#bcc9e5]/60 via-[#e6e0e8]/50 to-transparent blur-[82px] will-change-transform animate-[softblob_24s_ease-in-out_infinite]"></div>

    <div class="z-10 w-full flex flex-col md:flex-row max-w-6xl mx-auto gap-12 md:gap-5 items-center justify-center md:items-stretch md:justify-between pt-20 pb-12">
      <!-- Left column -->
      <div class="flex flex-col max-w-[52ch] gap-4 md:gap-7 flex-shrink min-w-[260px]">
        <!-- Eyebrow: Japanese ornament tag -->
        <span class="inline-flex items-center justify-center text-[10px] tracking-[0.20em] uppercase font-mono bg-hairline text-ink rounded-full px-3 py-1 mb-2 select-none font-semibold">
          私について
        </span>
        <h1 class="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold leading-[0.97] tracking-[-0.03em] text-ink drop-shadow-none">
          Shafwan Ilham Dzaky
        </h1>
        <p class="mt-3 text-lg md:text-xl font-display text-ink-2 max-w-[46ch]">
          DevOps Engineer specializing in scalable infrastructure, automated deployments, expanding in security ops.
        </p>
        <div class="flex flex-row gap-3 pt-3">
          <NuxtLink
            to="/cv-2026.pdf"
            target="_blank"
            class="button-cta flex items-center h-12 group"
            tabindex="0"
          >
            <span class="button-cta-label">Download CV</span>
            <span class="button-cta-icon">
              <svg viewBox="0 0 16 16" class="w-4 h-4" fill="none" stroke="currentColor">
                <path d="M8 3v7m0 0l-3-3m3 3l3-3M2 13h12" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NuxtLink>
          <NuxtLink
            to="/project"
            class="text-ink hover:text-ink-2 hover:bg-hairline rounded-full border border-hairline px-6 py-2.5 text-xs font-semibold font-display tracking-widest transition-all duration-700"
            tabindex="0"
          >
            View Projects
          </NuxtLink>
        </div>
      </div>
      <!-- Right column: double-bezel preview card -->
      <div class="flex flex-col flex-1 max-w-sm items-center md:items-end">
        <div class="double-bezel-card w-full max-w-sm">
          <div class="bezel-shell">
            <div class="bezel-core flex flex-col gap-4 px-8 pt-8 pb-6">
              <div class="flex items-center gap-2 pb-2">
                <span class="text-2xl md:text-3xl font-display font-bold tracking-tight text-ink">
                  Shafwan Ilham Dzaky
                </span>
                <span class="font-decoration text-md text-ink/40 mb-1 select-none">士</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-base text-ink-2 font-semibold">DevOps Engineer</span>
                <span class="text-[11px] font-mono tracking-wide uppercase px-2 py-px rounded bg-hairline text-ink/70">INFRA & SEC</span>
              </div>
              <div class="flex items-center gap-2 mt-2">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span class="text-sm text-ink-2">Available for work</span>
              </div>
              <div class="flex flex-row items-center gap-7 mt-3">
                <div class="flex flex-col items-center gap-0.5">
                  <span class="text-xl font-bold text-ink">2+</span>
                  <span class="text-[11px] uppercase text-muted tracking-widest">Years Exp</span>
                </div>
                <div class="border-l border-hairline h-10 mx-1"></div>
                <div class="flex flex-col items-center gap-0.5">
                  <span class="text-xl font-bold text-ink">{{ githubData?.totalCommits || '500+' }}</span>
                  <span class="text-[11px] uppercase text-muted tracking-widest">Git Commits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .double-bezel-card {
    padding: 9px;
    border-radius: var(--shell-radius);
    background: var(--canvas-2);
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
    border: 1.5px solid var(--hairline);
    display: flex;
  }
  .bezel-shell {
    background: var(--hairline);
    border-radius: calc(var(--shell-radius) - 0.18rem);
    padding: 0.05rem;
    flex: 1;
    display: flex;
  }
  .bezel-core {
    background: var(--innerlight);
    border-radius: var(--core-radius);
    box-shadow: 0 2px 8px 0 rgba(180,180,171,0.06), 0 1.5px 7px 0 rgba(221,221,215,0.06);
    flex: 1;
  }
  .button-cta {
    position: relative;
    background: var(--ink);
    color: var(--canvas);
    border-radius: 999px;
    font-size: 0.93rem;
    font-weight: 700;
    padding: 0 2.3rem 0 1.5rem;
    letter-spacing: 0.16em;
    transition: transform 0.7s var(--ease), background 0.28s var(--ease);
    box-shadow: 0 8px 24px -10px rgba(60,70,80,0.09);
    overflow: hidden;
  }
  .button-cta:active {
    transform: scale(0.98);
  }
  .button-cta-label {
    z-index: 2;
  }
  .button-cta-icon {
    display: flex; align-items: center; justify-content: center;
    position: absolute; right: 0.45rem; top: 50%; transform: translateY(-50%) scale(1);
    width: 2rem; height: 2rem;
    background: var(--hairline);
    border-radius: 50%;
    color: var(--ink);
    transition: transform 0.5s var(--ease-spring);
  }
  .button-cta:hover .button-cta-icon {
    transform: translateY(-50%) scale(1.05) translate(2px, -2px);
  }
  .button-cta:focus-visible {
    outline: 2px solid var(--hairline-strong);
    outline-offset: 2px;
  }
</style>
