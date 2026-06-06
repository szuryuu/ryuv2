<script setup lang="ts">
import { ref, computed } from "vue";
import {
  fullStackSkills,
  devOpsSkills,
  cyberSecuritySkills,
  skillUrl,
} from "@/utils/skills";
import { certificateArray } from "@/utils/certificates";
import { usePageEnter } from "~/composables/usePageEnter";
import { useScrollSpy } from "~/composables/useScrollSpy";

const pageRef = usePageEnter({ y: 20, duration: 0.6 });

const { activeId } = useScrollSpy([
  "certificates",
  "fullstack",
  "devops",
  "security",
]);

const filterItems = ["All", "FullStack", "DevOps", "CyberSec"];
const selectedFilter = ref("All");

const filteredCertificates = computed(() => {
  let certs = [...certificateArray];
  if (selectedFilter.value !== "All") {
    certs = certs.filter((c) => c.skill === selectedFilter.value);
  }
  return certs.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
});
</script>

<template>
  <div
    class="w-full min-h-screen flex flex-col lg:flex-row pt-24 gap-8 max-w-7xl mx-auto"
    ref="pageRef"
  >
    <aside class="w-full hidden lg:block">
      <div class="flex items-start flex-col justify-between fixed">
        <div class="flex items-start text-ink">
          <span class="[writing-mode:vertical-lr] text-2xl font-decoration">スキル</span>
          <span class="[writing-mode:vertical-lr] text-lg font-display">Skills & Certs</span>
        </div>

        <nav class="hidden lg:flex flex-col gap-4 mt-12 text-sm font-display">
          <a
            href="#certificates"
            class="transition-colors flex items-center gap-3 group uppercase tracking-widest"
            :class="activeId === 'certificates' ? 'text-ink' : 'text-muted hover:text-ink'"
          >
            <span
              class="h-px transition-all duration-300"
              :class="activeId === 'certificates' ? 'w-12 bg-ink' : 'w-8 bg-hairline-strong group-hover:w-12'"
            ></span>
            Certificates
          </a>
          <a
            href="#fullstack"
            class="transition-colors flex items-center gap-3 group uppercase tracking-widest"
            :class="activeId === 'fullstack' ? 'text-ink' : 'text-muted hover:text-ink'"
          >
            <span
              class="h-px transition-all duration-300"
              :class="activeId === 'fullstack' ? 'w-12 bg-ink' : 'w-8 bg-hairline-strong group-hover:w-12'"
            ></span>
            Full Stack
          </a>
          <a
            href="#devops"
            class="transition-colors flex items-center gap-3 group uppercase tracking-widest"
            :class="activeId === 'devops' ? 'text-ink' : 'text-muted hover:text-ink'"
          >
            <span
              class="h-px transition-all duration-300"
              :class="activeId === 'devops' ? 'w-12 bg-ink' : 'w-8 bg-hairline-strong group-hover:w-12'"
            ></span>
            DevOps
          </a>
          <a
            href="#security"
            class="transition-colors flex items-center gap-3 group uppercase tracking-widest"
            :class="activeId === 'security' ? 'text-ink' : 'text-muted hover:text-ink'"
          >
            <span
              class="h-px transition-all duration-300"
              :class="activeId === 'security' ? 'w-12 bg-ink' : 'w-8 bg-hairline-strong group-hover:w-12'"
            ></span>
            Security
          </a>
        </nav>
      </div>
    </aside>

    <main class="w-full lg:min-w-5xl max-w-5xl space-y-12 pb-32 mx-auto">
      <section id="certificates" class="relative group">
        <div
          class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"
        ></div>
        <h2
          class="text-xs font-display text-muted uppercase tracking-widest mb-12 pl-4"
        >
          01 / Certificates
        </h2>

        <div class="space-y-8">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filter in filterItems"
              :key="filter"
              @click="selectedFilter = filter"
              class="px-4 py-2 rounded-full text-sm font-display transition-all duration-300 border"
              :class="selectedFilter === filter ? 'bg-ink text-canvas border-ink' : 'bg-canvas-2 text-ink border-hairline hover:bg-canvas'"
            >
              {{ filter }}
            </button>
          </div>

          <div
            v-if="filteredCertificates.length === 0"
            class="bg-canvas-2 backdrop-blur-sm rounded-xl p-12 border border-hairline text-center"
          >
            <p class="text-lg font-display text-ink mb-2">No certificates found</p>
          </div>

          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <CertificateCard
              v-for="cert in filteredCertificates"
              :key="cert.id"
              :certificate="cert"
            />
          </div>
        </div>
      </section>

      <section id="fullstack" class="relative group">
        <div
          class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"
        ></div>
        <h2
          class="text-xs font-display text-muted uppercase tracking-widest mb-12 pl-4"
        >
          02 / Full Stack
        </h2>

        <div class="space-y-6">
          <p class="text-sm font-display text-ink-2 max-w-2xl leading-relaxed">
            Building scalable web applications from frontend UI to backend APIs,
            database design, and deployment.
          </p>
          <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <div
              v-for="skill in fullStackSkills"
              :key="skill"
              class="group/skill relative bg-canvas-2 border border-hairline rounded-xl p-4 flex items-center justify-center hover:bg-canvas hover:border-hairline-strong transition-colors"
            >
              <img
                :src="`${skillUrl}?i=${skill}`"
                :alt="skill"
                class="w-8 h-8 transition-transform duration-300 group-hover/skill:scale-110"
                loading="lazy"
              />
              <div
                class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity bg-canvas-2 border border-hairline text-ink text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 font-display"
              >
                {{ skill }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devops" class="relative group">
        <div
          class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"
        ></div>
        <h2
          class="text-xs font-display text-muted uppercase tracking-widest mb-12 pl-4"
        >
          03 / DevOps
        </h2>

        <div class="space-y-6">
          <p class="text-sm font-display text-ink-2 max-w-2xl leading-relaxed">
            Automating deployments, container orchestration, CI/CD pipelines,
            and infrastructure as code.
          </p>
          <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <div
              v-for="skill in devOpsSkills"
              :key="skill"
              class="group/skill relative bg-canvas-2 border border-hairline rounded-xl p-4 flex items-center justify-center hover:bg-canvas hover:border-hairline-strong transition-colors"
            >
              <img
                :src="`${skillUrl}?i=${skill}`"
                :alt="skill"
                class="w-8 h-8 transition-transform duration-300 group-hover/skill:scale-110"
                loading="lazy"
              />
              <div
                class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity bg-canvas-2 border border-hairline text-ink text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 font-display"
              >
                {{ skill }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="security" class="relative group">
        <div
          class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"
        ></div>
        <h2
          class="text-xs font-display text-muted uppercase tracking-widest mb-12 pl-4"
        >
          04 / Security
        </h2>

        <div class="space-y-6">
          <p class="text-sm font-display text-ink-2 max-w-2xl leading-relaxed">
            Network security, penetration testing, security audits, and
            implementing secure coding practices.
          </p>
          <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <div
              v-for="skill in cyberSecuritySkills"
              :key="skill"
              class="group/skill relative bg-canvas-2 border border-hairline rounded-xl p-4 flex items-center justify-center hover:bg-canvas hover:border-hairline-strong transition-colors"
            >
              <img
                :src="`${skillUrl}?i=${skill}`"
                :alt="skill"
                class="w-8 h-8 transition-transform duration-300 group-hover/skill:scale-110"
                loading="lazy"
              />
              <div
                class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity bg-canvas-2 border border-hairline text-ink text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 font-display"
              >
                {{ skill }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
