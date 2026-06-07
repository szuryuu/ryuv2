<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useScrollSpy } from "~/composables/useScrollSpy";

const { activeId } = useScrollSpy(["intro", "journey", "skill"]);

const pageRoot = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const reveals = pageRoot.value?.querySelectorAll<HTMLElement>(".reveal") ?? [];

  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("is-in"));
    return;
  }

  // Immediately show above-fold content
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("is-in");
    }
  });

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  reveals.forEach((el) => {
    if (!el.classList.contains("is-in")) {
      io?.observe(el);
    }
  });
});

onBeforeUnmount(() => {
  io?.disconnect();
});
</script>

<template>
  <div ref="pageRoot" class="about-page">
    <aside class="about-aside">
      <div class="aside-inner bezel-card">
        <div class="core">
          <div class="aside-title">
            <span class="upside font-decoration">私について</span>
            <span class="upside">About</span>
          </div>

          <nav class="aside-nav">
            <a href="#intro" :class="activeId === 'intro' ? 'is-active' : ''"
              >Introduction</a
            >
            <a
              href="#journey"
              :class="activeId === 'journey' ? 'is-active' : ''"
              >Journey</a
            >
            <a href="#skill" :class="activeId === 'skill' ? 'is-active' : ''"
              >Skill</a
            >
          </nav>
        </div>
      </div>
    </aside>

    <main class="about-main">
      <header class="intro-head reveal is-in">
        <span class="eyebrow"><span class="dot" />01 · about</span>
        <h1>
          Personal profile,
          <span>craft mindset, and technical journey.</span>
        </h1>
        <p>
          DevOps and security path with Japanese craft influence. Focus on
          reliability, automation, and calm systems.
        </p>
      </header>

      <section id="intro" class="about-section">
        <div class="section-head">
          <span class="section-index">01 / Introduction</span>
          <span class="font-decoration section-kanji">紹介</span>
        </div>
        <AboutIntro />
      </section>

      <section id="journey" class="about-section">
        <div class="section-head">
          <span class="section-index">02 / Journey</span>
          <span class="font-decoration section-kanji">経験</span>
        </div>
        <AboutExperience />
      </section>

      <section id="skill" class="about-section">
        <div class="section-head">
          <span class="section-index">03 / Skill</span>
          <span class="font-decoration section-kanji">技術</span>
        </div>
        <AboutSkill />
      </section>
    </main>
  </div>

  <ClosingCTA
    title="Build systems that ship."
    description="Open for DevOps, cloud migration, and secure platform delivery."
    cta-text="Get in Touch"
    cta-link="/contact"
    kanji="連絡"
  />
</template>

<style scoped>
.about-page {
  width: 100%;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 20px 120px;
}

.about-aside {
  position: relative;
}

.aside-inner {
  position: sticky;
  top: 132px;
}

.aside-inner .core {
  padding: 24px 18px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.aside-title {
  display: flex;
  gap: 6px;
  color: var(--ink);
}

.aside-title .upside:first-child {
  font-size: 18px;
}

.aside-title .upside:last-child {
  font-size: 14px;
  opacity: 0.45;
}

.aside-nav {
  display: grid;
  gap: 10px;
}

.aside-nav a {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 700ms var(--ease);
}

.aside-nav a::before {
  content: "";
  width: 26px;
  height: 1px;
  background: var(--hairline-strong);
  transition:
    width 700ms var(--ease),
    background 700ms var(--ease);
}

.aside-nav a:hover,
.aside-nav a.is-active {
  color: var(--ink);
}

.aside-nav a:hover::before,
.aside-nav a.is-active::before {
  width: 40px;
  background: var(--ink);
}

.about-main {
  min-width: 0;
  display: grid;
  gap: 54px;
}

.intro-head {
  padding: 28px;
  border-radius: var(--shell-radius);
  background: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 0 var(--innerlight),
    0 0 0 1px var(--hairline);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2f6a4a;
  box-shadow: 0 0 0 4px rgba(47, 106, 74, 0.18);
}

.intro-head h1 {
  margin: 16px 0 12px;
  font-size: clamp(32px, 4vw, 54px);
  line-height: 1;
  letter-spacing: -0.03em;
}

.intro-head h1 span {
  color: var(--muted);
  font-weight: 500;
}

.intro-head p {
  margin: 0;
  color: var(--muted);
  max-width: 56ch;
}

.about-section {
  padding-top: 12px;
}

.section-head {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--hairline);
  padding-top: 14px;
}

.section-index {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.section-kanji {
  font-size: 14px;
  opacity: 0.35;
}

@media (max-width: 1024px) {
  .about-page {
    grid-template-columns: 1fr;
    padding-top: 84px;
    gap: 18px;
  }

  .about-aside {
    display: none;
  }
}

@media (max-width: 767px) {
  .about-page {
    padding: 74px 16px 90px;
  }

  .intro-head {
    padding: 20px;
  }
}
</style>
