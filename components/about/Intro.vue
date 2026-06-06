<script setup lang="ts"></script>

<template>
  <div class="intro-wrap">
    <section class="intro-block bezel-card">
      <div class="core">
        <div class="line-head">
          <div class="line" />
          <span>01</span>
        </div>

        <h2 class="title">
          Shafwan<br>
          Ilham<br>
          Dzaky
        </h2>

        <div class="meta">
          <p class="font-decoration jp">開発者</p>
          <p class="desc">
            DevOps Engineer with DevSecOps focus. Build automated infra, resilient systems,
            and security-first architecture.
          </p>

          <div class="status">
            <span class="pulse" />
            <span>Available for work</span>
          </div>

          <NuxtLink to="/project" class="cta">
            <span>View Work</span>
            <LucideChevronRight class="w-3 h-3" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro-wrap {
  width: 100%;
}

.line-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.line-head .line {
  height: 1px;
  flex: 1;
  background: var(--hairline-strong);
}

.line-head span {
  color: var(--muted);
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
}

.title {
  margin: 0;
  color: var(--ink);
  font-size: clamp(42px, 6vw, 76px);
  line-height: 0.95;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.meta {
  margin-top: 16px;
  display: grid;
  gap: 8px;
}

.jp {
  margin: 0;
  color: var(--ink);
  opacity: 0.45;
}

.desc {
  margin: 0;
  color: var(--ink-2);
  max-width: 44ch;
  font-size: 14px;
  line-height: 1.6;
}

.status {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1f6a4e;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pulse {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #1f6a4e;
  box-shadow: 0 0 0 0 rgba(31, 106, 78, 0.36);
  animation: pulse 2.4s var(--ease) infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(31, 106, 78, 0.36); }
  70% { box-shadow: 0 0 0 10px rgba(31, 106, 78, 0); }
  100% { box-shadow: 0 0 0 0 rgba(31, 106, 78, 0); }
}

.cta {
  margin-top: 8px;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  background: var(--canvas-2);
  color: var(--ink);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 14px;
  transition: transform 700ms var(--ease), background 700ms var(--ease);
}

.cta:hover {
  transform: translateY(-2px);
  background: var(--canvas);
}
</style>
