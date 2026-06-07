<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollSpy } from '~/composables/useScrollSpy'

const { activeId } = useScrollSpy([
  'email',
  'github',
  'linkedin',
  'cv'
])

const contacts = [
  {
    id: 'email',
    label: 'Email',
    japanese: 'メール',
    value: 'ilhamdzaky@gmail.com',
    href: 'mailto:ilhamdzaky@gmail.com',
    icon: 'i-custom-mail',
    description: 'Best for project inquiries and collaboration'
  },
  {
    id: 'github',
    label: 'GitHub',
    japanese: 'ギットハブ',
    value: '@szuryuu',
    href: 'https://github.com/szuryuu',
    icon: 'i-custom-github2',
    description: 'Check out my code and contributions'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    japanese: 'リンクトイン',
    value: 'Shafwan Ilham Dzaky',
    href: 'https://linkedin.com/in/shafwan-ilham-dzaky',
    icon: 'i-custom-linkedin',
    description: 'Professional network and experience'
  },
  {
    id: 'cv',
    label: 'Resume/CV',
    japanese: '履歴書',
    value: 'Download PDF',
    href: '/cv.pdf',
    icon: 'i-custom-file-text',
    description: 'Full professional background and credentials'
  }
]

const hoveredContact = ref<string | null>(null)


</script>

<template>
  <div class="contact-page">
    <aside class="contact-aside">
      <div class="bezel-card sticky-shell">
        <div class="core">
          <div class="aside-title">
            <span class="upside font-decoration">コンタクト</span>
            <span class="upside">Contact</span>
          </div>

          <nav class="aside-nav">
            <a
              v-for="contact in contacts"
              :key="contact.id"
              :href="`#${contact.id}`"
              :class="activeId === contact.id ? 'is-active' : ''"
            >
              {{ contact.label }}
            </a>

          </nav>
        </div>
      </div>
    </aside>

    <main class="contact-main">
      <header class="hero bezel-card">
        <div class="core">
          <span class="eyebrow"><span class="dot" />00 · contact</span>
          <h1>Let’s work together on reliable systems.</h1>
          <p>
            Open for freelance, full-time, and collaboration.
            <span class="font-decoration"> 連絡先 </span>
          </p>
        </div>
      </header>

      <section class="cards-grid">
        <article
          v-for="(contact, index) in contacts"
          :id="contact.id"
          :key="contact.id"
          class="contact-card bezel-card"
          @mouseenter="hoveredContact = contact.id"
          @mouseleave="hoveredContact = null"
        >
          <a :href="contact.href" target="_blank" rel="noopener noreferrer" class="core">
            <div class="top-row">
              <span class="index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="jp font-decoration">{{ contact.japanese }}</span>
            </div>

            <div class="icon-wrap">
              <UIcon :name="contact.icon" class="icon" />
            </div>

            <h3>{{ contact.label }}</h3>
            <p class="desc">{{ contact.description }}</p>

            <div class="value-row">
              <span>{{ contact.value }}</span>
              <LucideExternalLink class="w-4 h-4" />
            </div>

            <div class="hover-line" :class="hoveredContact === contact.id ? 'is-on' : ''" />
          </a>
        </article>
      </section>

      <section class="quick-info bezel-card">
        <div class="core">
          <div class="section-head">
            <span class="section-index">01 / Quick Info</span>
            <span class="font-decoration kanji">情報</span>
          </div>

          <div class="info-grid">
            <div class="cell">
              <p>Location</p>
              <strong>Yogyakarta, Indonesia</strong>
            </div>
            <div class="cell">
              <p>Timezone</p>
              <strong>WIB (UTC+7)</strong>
            </div>
            <div class="cell">
              <p>Response Time</p>
              <strong>Within 24 hours</strong>
            </div>
            <div class="cell">
              <p>Availability</p>
              <strong>Open for opportunities</strong>
            </div>
          </div>

          <div class="cta-row">
            <a href="mailto:ilhamdzaky@gmail.com" class="primary-link">
              Send Email
              <LucideMail class="w-4 h-4" />
            </a>
            <a href="/cv.pdf" target="_blank" class="ghost-link">
              <LucideDownload class="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section class="cta-section bezel-card">
        <div class="core">
          <div class="cta-content">
            <h3>Leave your mark</h3>
            <p>Sign the Questbook — leave note, thought, or just say hi.</p>
            <NuxtLink to="/guestbook" class="pill">
              <span>Open Questbook</span>
              <span class="icon-wrap">
                <LucidePenLine class="w-3.5 h-3.5" />
              </span>
            </NuxtLink>
          </div>
          <span class="font-decoration cta-kanji">芳名帳</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.contact-page {
  width: 100%;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 20px 120px;
}

.sticky-shell { position: sticky; top: 132px; }
.sticky-shell .core {
  min-height: 450px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.aside-title { display: flex; gap: 6px; }
.aside-title .upside:first-child { font-size: 18px; }
.aside-title .upside:last-child { font-size: 14px; opacity: 0.45; }

.aside-nav { display: grid; gap: 10px; }
.aside-nav a {
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
.aside-nav a::before {
  content: '';
  width: 26px;
  height: 1px;
  background: var(--hairline-strong);
  transition: width 700ms var(--ease);
}
.aside-nav a:hover,
.aside-nav a.is-active { color: var(--ink); }
.aside-nav a:hover::before,
.aside-nav a.is-active::before { width: 40px; }

.contact-main { display: grid; gap: 20px; }
.hero .core { padding: 26px; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.dot { width: 6px; height: 6px; border-radius: 999px; background: #2f6a4a; box-shadow: 0 0 0 4px rgba(47,106,74,.18); }

.hero h1 { margin: 14px 0 10px; font-size: clamp(32px, 4.4vw, 56px); line-height: 1; letter-spacing: -0.03em; }
.hero p { margin: 0; color: var(--ink-2); }

.cards-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.contact-card .core {
  text-decoration: none;
  color: inherit;
  display: grid;
  gap: 8px;
  padding: 16px;
}
.top-row { display: flex; justify-content: space-between; align-items: center; }
.index { color: var(--hairline-strong); font-size: 28px; font-weight: 700; }
.jp { color: var(--ink); opacity: 0.35; }
.icon-wrap { width: 52px; height: 52px; border: 1px solid var(--hairline); border-radius: 12px; background: var(--canvas-2); display: grid; place-items: center; }
.icon { width: 26px; height: 26px; color: var(--ink); }
.contact-card h3 { margin: 0; color: var(--ink); font-size: 20px; }
.desc { margin: 0; color: var(--ink-2); font-size: 13px; line-height: 1.5; }
.value-row { margin-top: 4px; display: flex; justify-content: space-between; align-items: center; color: var(--ink); font-size: 13px; }
.hover-line { height: 2px; background: var(--ink); width: 0; transition: width 700ms var(--ease); }
.hover-line.is-on { width: 100%; }

.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.section-index { color: var(--muted); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
.kanji { font-size: 14px; opacity: 0.35; }

.quick-info .core,
.guestbook .core { padding: 18px; }
.info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.cell { border: 1px solid var(--hairline); border-radius: 12px; background: var(--canvas-2); padding: 10px; }
.cell p { margin: 0; color: var(--muted); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.cell strong { margin-top: 4px; color: var(--ink); display: block; font-size: 14px; }

.cta-row { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; }
.primary-link,
.ghost-link {
  text-decoration: none;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
}
.primary-link { background: var(--ink); color: var(--canvas); }
.ghost-link { border: 1px solid var(--hairline); color: var(--ink); background: var(--canvas-2); }
.btn-as-btn { cursor: pointer; }

.cta-section .core {
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.cta-content h3 {
  margin: 0 0 8px;
  color: var(--ink);
  font-size: 24px;
  letter-spacing: -0.02em;
}

.cta-content p {
  margin: 0 0 16px;
  color: var(--ink-2);
  font-size: 14px;
  max-width: 42ch;
}

.cta-kanji {
  font-size: 48px;
  opacity: 0.15;
  writing-mode: vertical-rl;
  flex-shrink: 0;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 9px 9px 16px;
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

@media (max-width: 1024px) {
  .contact-page { grid-template-columns: 1fr; padding-top: 84px; }
  .contact-aside { display: none; }
}
@media (max-width: 767px) {
  .contact-page { padding: 74px 16px 90px; }
  .cards-grid,
  .info-grid { grid-template-columns: 1fr; }
  .cta-section .core {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }
  .cta-kanji {
    writing-mode: horizontal-tb;
  }
}
</style>
