<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const mobileOpen = ref(false)
const router = useRouter()

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <div class="min-h-[100svh] flex flex-col relative overflow-x-clip">
    <nav class="nav-shell">
      <header class="nav">
        <!-- Brand + Kanji ornament -->
        <div class="flex items-center gap-2 pl-4 select-none">
          <span class="font-display font-bold text-2xl md:text-3xl tracking-tight text-ink">Sz</span>
          <span class="font-decoration text-md md:text-xl opacity-30 -ml-1 mt-0.5 select-none">士</span>
        </div>
        <!-- Nav links (hidden on mobile) -->
        <ul class="hidden md:flex gap-2 px-4">
          <li><NuxtLink to="/about" class="nav-link">About <span class="font-decoration text-xs align-sub opacity-40 ml-1">経験</span></NuxtLink></li>
          <li><NuxtLink to="/project" class="nav-link">Projects <span class="font-decoration text-xs align-sub opacity-40 ml-1">計画</span></NuxtLink></li>
          <li><NuxtLink to="/writing" class="nav-link">Writing <span class="font-decoration text-xs align-sub opacity-40 ml-1">記事</span></NuxtLink></li>
          <li><NuxtLink to="/contact" class="nav-link">Contact <span class="font-decoration text-xs align-sub opacity-40 ml-1">連絡</span></NuxtLink></li>
        </ul>
        <!-- CTA pill -->
        <NuxtLink to="/contact" class="pill flex items-center gap-1 text-base px-5 py-2 rounded-full font-semibold shadow-sm ml-1 mr-3 bg-ink text-canvas group hover:scale-98 transition-transform duration-700"
          tabindex="0" aria-label="Contact">
          <span>Contact</span>
          <span class="inline-block ml-2 bg-canvas/50 rounded-full w-7 h-7 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </NuxtLink>
        <!-- Mobile hamburger -->
        <button class="inline-flex md:hidden items-center justify-center mr-1 p-2 bg-canvas-2 border border-hairline rounded-full ring-1 ring-hairline shadow-sm hover:bg-innerlight transition-all duration-700" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen">
          <span class="sr-only">Menu</span>
          <svg v-if="!mobileOpen" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="7" x2="18" y2="7"/><line x1="4" y1="11" x2="18" y2="11"/><line x1="4" y1="15" x2="18" y2="15"/></svg>
          <svg v-else width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="16" y2="16"/><line x1="6" y1="16" x2="16" y2="6"/></svg>
        </button>
      </header>
      <!-- Mobile dropdown -->
      <div v-if="mobileOpen" class="md:hidden absolute left-1/2 top-full z-20 -translate-x-1/2 mt-2 min-w-[180px] w-max px-2">
        <div class="bezel-card bg-white/85 py-3 px-4 rounded-2xl shadow-xl">
          <div class="core py-1 px-2 rounded-2xl bg-canvas-2 flex flex-col gap-1 w-full">
            <NuxtLink to="/about" class="block py-1 w-full text-left nav-link flex items-center" @click="closeMobile">About <span class="font-decoration text-xs opacity-40 ml-1">経験</span></NuxtLink>
            <NuxtLink to="/project" class="block py-1 w-full text-left nav-link flex items-center" @click="closeMobile">Projects <span class="font-decoration text-xs opacity-40 ml-1">計画</span></NuxtLink>
            <NuxtLink to="/writing" class="block py-1 w-full text-left nav-link flex items-center" @click="closeMobile">Writing <span class="font-decoration text-xs opacity-40 ml-1">記事</span></NuxtLink>
            <NuxtLink to="/contact" class="block py-1 w-full text-left nav-link flex items-center" @click="closeMobile">Contact <span class="font-decoration text-xs opacity-40 ml-1">連絡</span></NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <main class="flex-1 relative z-1 flex flex-col px-0 md:px-9 pt-0">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.nav-shell {
  position: sticky;
  top: 1.5rem;
  z-index: 50;
  border-radius: var(--shell-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 920px;
  margin: 0 auto 0 auto;
}
.nav {
  display: flex;
  align-items: center;
  border-radius: var(--shell-radius);
  padding: 0.6rem 0.5rem 0.6rem 0.5rem;
  background: rgba(246,246,242,0.92);
  box-shadow:
    0 2px 16px -3px rgba(180,180,164,0.06),
    0 0 0 1.5px var(--hairline-strong);
  backdrop-filter: blur(17px);
  width: 100%;
}
.pill {
  border-radius: 9999px;
  background: var(--ink);
  color: var(--canvas);
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.01em;
  display: inline-flex;
  align-items: center;
  border: none;
  outline: none;
  box-shadow: 0 4px 20px -6px rgba(36,45,60,0.10);
  transition: transform 700ms var(--ease);
}
.pill:active {
  transform: scale(0.98);
}
.nav-link {
  padding: 0.35rem 1.0rem 0.35rem 0.9rem;
  border-radius: 0.875rem;
  font-weight: 500;
  font-size: 1rem;
  color: var(--ink-2);
  transition: background 180ms var(--ease), color 180ms var(--ease);
}
.nav-link:hover,
.nav-link:focus {
  background: var(--canvas-2);
  color: var(--ink);
}
</style>
