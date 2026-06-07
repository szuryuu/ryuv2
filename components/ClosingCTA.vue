<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  kanji?: string
}>()
</script>

<template>
  <section class="closing-wrapper">
    <div class="closing reveal">
      <div class="closing-inner">
        <h2>{{ title || 'Ready to build something that ships.' }}</h2>
        <p>
          {{ description || 'Open for collaboration on DevOps, cloud migration, and secure platform delivery. Let us ship fast with clear reliability standards.' }}
        </p>

        <NuxtLink :to="ctaLink || '/contact'" class="pill">
          <span>{{ ctaText || 'Get in Touch' }}</span>
          <span class="icon-wrap">
            <svg viewBox="0 0 12 12" stroke-width="1.6">
              <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" />
            </svg>
          </span>
        </NuxtLink>

        <p class="font-decoration" style="opacity: 0.24; margin-top: 14px; margin-bottom: 0">
          {{ kanji || '連絡' }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.closing-wrapper {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.closing {
  padding: 112px 0;
  margin: 56px 0 0;
  border-radius: 40px;
  background: linear-gradient(180deg, #212121 0%, #101010 100%);
  color: #f2f2f0;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 30px 80px -40px rgba(10, 10, 10, 0.6);
}

.closing::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(700px 360px at 30% 0%, rgba(115, 139, 168, 0.24), transparent 70%);
  pointer-events: none;
}

.closing-inner {
  position: relative;
  max-width: 1040px;
  padding: 0 32px;
  margin: 0 auto;
  text-align: center;
}

.closing h2 {
  font-size: clamp(40px, 5.5vw, 76px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 0 0 18px;
  max-width: 18ch;
  margin-inline: auto;
}

.closing p {
  color: rgba(242, 242, 240, 0.7);
  font-size: 17px;
  margin: 0 auto 32px;
  max-width: 48ch;
  line-height: 1.55;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 10px 10px 18px;
  border-radius: 999px;
  background: var(--canvas);
  color: var(--ink);
  font: 600 14px/1 var(--font-display);
  cursor: pointer;
  border: none;
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: transform 700ms var(--ease);
}

.pill .icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 360ms var(--ease-spring), background 700ms var(--ease);
}

.pill:hover .icon-wrap {
  transform: translate(1px, -1px) scale(1.05);
  background: rgba(10, 10, 10, 0.12);
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

.reveal {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(8px);
  transition: opacity 800ms var(--ease), transform 800ms var(--ease), filter 800ms var(--ease);
}

.reveal.is-in {
  opacity: 1;
  transform: none;
  filter: none;
}

@media (max-width: 767px) {
  .closing-wrapper {
    padding: 0 16px;
  }

  .closing {
    margin: 28px 0 0;
    padding: 80px 0;
    border-radius: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
