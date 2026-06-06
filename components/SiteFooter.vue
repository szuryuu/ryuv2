<template>
  <footer class="site-footer">
    <div class="row">
      <span>
        Shafwan Ilham Dzaky · DevOps Engineer · Yogyakarta · v2026
        <span class="font-decoration" style="opacity: 0.28">士</span>
        <span class="font-decoration" style="opacity: 0.7"> · 改善と継続</span>
      </span>
      <span>
        <NuxtLink to="/about">About</NuxtLink> ·
        <NuxtLink to="/project">Projects</NuxtLink> ·
        <NuxtLink to="/writing">Writing</NuxtLink> ·
        <NuxtLink to="/contact">Contact</NuxtLink> ·
        <a href="https://github.com/szuryuu" target="_blank" rel="noopener noreferrer">GitHub</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 36px 28px 28px;
  border-top: 1px solid var(--hairline);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.06em;
  position: relative;
  z-index: 1;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.site-footer a {
  color: var(--muted);
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--ink);
}

@media (max-width: 767px) {
  .site-footer {
    padding: 28px 16px 20px;
  }

  .row {
    padding: 0 6px;
  }
}
</style>
