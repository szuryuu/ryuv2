<script setup lang="ts"></script>

<template>
  <div class="skill-preview">
    <section class="split">
      <article class="bezel-card pane">
        <div class="core">
          <div class="line-head">
            <span>03</span>
            <div class="line" />
          </div>

          <h3>Certifications</h3>

          <p class="font-decoration jp">証明書</p>
          <p class="desc">
            Professional credentials in architecture, DevOps automation, and security.
          </p>

          <NuxtLink to="/about/skill" class="cta">
            <span>View All</span>
            <LucideChevronRight class="w-3 h-3" />
          </NuxtLink>
        </div>
      </article>

      <article class="bezel-card pane">
        <div class="core">
          <div class="line-head alt">
            <span>03</span>
            <div class="line" />
          </div>

          <h3>Tech Stack</h3>

          <p class="font-decoration jp">技術スタック</p>
          <p class="desc">
            Battle-tested tools and frameworks used in production systems.
          </p>

          <NuxtLink to="/about/skill" class="cta">
            <span>Explore</span>
            <LucideChevronRight class="w-3 h-3" />
          </NuxtLink>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.skill-preview {
  width: 100%;
}

.split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.pane .core {
  padding: 20px;
}

.line-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.line-head.alt {
  flex-direction: row-reverse;
}

.line-head .line {
  height: 1px;
  flex: 1;
  background: var(--hairline-strong);
}

.line-head span {
  color: var(--muted);
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}

.pane h3 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(32px, 4.2vw, 58px);
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.jp {
  margin: 10px 0 0;
  color: var(--ink);
  opacity: 0.42;
}

.desc {
  margin: 6px 0 0;
  color: var(--ink-2);
  font-size: 14px;
  max-width: 34ch;
  line-height: 1.55;
}

.cta {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  background: var(--canvas-2);
  color: var(--ink);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 14px;
}

@media (max-width: 1100px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
