<script setup lang="ts">
import { ref } from 'vue'

const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <div class="site-shell">
    <nav class="nav-shell">
      <header class="nav">
        <NuxtLink to="/" class="brand" @click="closeMobile">
          <span>Sz</span>
          <span class="font-decoration brand-kanji" aria-hidden="true">士</span>
        </NuxtLink>

        <ul>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/project">Projects</NuxtLink></li>
          <li><NuxtLink to="/writing">Writing</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>

        <NuxtLink to="/contact#guestbook" class="pill" @click="closeMobile">
          <span>Questbook</span>
          <span class="icon-wrap">
            <svg viewBox="0 0 12 12" stroke-width="1.6">
              <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" />
            </svg>
          </span>
        </NuxtLink>

        <button
          class="menu-btn"
          type="button"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </header>

      <div v-if="mobileOpen" class="mobile-dropdown">
        <NuxtLink to="/about" @click="closeMobile">About</NuxtLink>
        <NuxtLink to="/project" @click="closeMobile">Projects</NuxtLink>
        <NuxtLink to="/writing" @click="closeMobile">Writing</NuxtLink>
        <NuxtLink to="/contact" @click="closeMobile">Contact</NuxtLink>
        <NuxtLink to="/contact#guestbook" class="mobile-questbook" @click="closeMobile">Questbook</NuxtLink>
      </div>
    </nav>

    <main class="site-main">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.site-shell {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: clip;
}

.nav-shell {
  position: sticky;
  top: 24px;
  z-index: 50;
  margin: 24px auto 0;
  padding: 6px;
  width: max-content;
  max-width: calc(100% - 56px);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: saturate(160%) blur(22px);
  -webkit-backdrop-filter: saturate(160%) blur(22px);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.45) inset,
    0 0 0 1px rgba(10, 10, 10, 0.05),
    0 12px 36px -18px rgba(10, 10, 10, 0.18);
}

.nav {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 6px 8px 6px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.02em;
}

.brand-kanji {
  font-size: 14px;
  opacity: 0.3;
  transform: translateY(-1px);
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 6px;
  margin: 0;
  padding: 0;
}

.nav ul a {
  display: inline-block;
  padding: 9px 14px;
  border-radius: 999px;
  color: var(--ink);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: background 700ms var(--ease);
}

.nav ul a:hover {
  background: rgba(10, 10, 10, 0.05);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 7px 7px 16px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--canvas);
  font: 600 13px/1 var(--font-display);
  cursor: pointer;
  border: none;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: transform 700ms var(--ease);
}

.pill .icon-wrap {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 360ms var(--ease-spring), background 700ms var(--ease);
}

.pill:hover .icon-wrap {
  transform: translate(1px, -1px) scale(1.05);
  background: rgba(255, 255, 255, 0.22);
}

.pill:active {
  transform: scale(0.98);
}

.pill svg {
  width: 12px;
  height: 12px;
  stroke: currentColor;
  fill: none;
}

.menu-btn {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--hairline);
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink);
}

.menu-btn svg {
  width: 18px;
  height: 18px;
  margin: auto;
}

.mobile-dropdown {
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  transform: translateX(-50%);
  width: min(260px, calc(100vw - 32px));
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 0 0 1px var(--hairline),
    0 18px 40px -24px rgba(10, 10, 10, 0.24);
  padding: 10px;
  display: grid;
  gap: 4px;
}

.mobile-dropdown a {
  text-decoration: none;
  color: var(--ink);
  font-size: 13px;
  font-weight: 500;
  border-radius: 999px;
  padding: 9px 12px;
}

.mobile-dropdown a:hover {
  background: rgba(10, 10, 10, 0.05);
}

.mobile-questbook {
  background: var(--ink);
  color: var(--canvas) !important;
}

.site-main {
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 980px) {
  .nav ul,
  .nav > .pill {
    display: none;
  }

  .menu-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nav {
    padding-right: 6px;
  }
}
</style>
