<script setup lang="ts">
import { computed } from "vue";

const { data: projects } = await useAsyncData("projects-home", () =>
  queryCollection("projects").order("order", "ASC").all(),
);

const shortlistTitles = [
  "CloudOps: Azure GitOps Platform",
  "Dynamic VMSS Auto-Discovery & Mesh",
  "LaporCepat: AI-Powered Disaster Reporting",
  "MySQL Load Test",
  "Azure End-to-End DevOps Pipeline",
  "Dokku Nginx Path",
];

const shortlist = computed(() => {
  const all = projects.value ?? [];
  return shortlistTitles
    .map((title) => all.find((p) => p.title === title))
    .filter(Boolean);
});

function stackFor(project: any): string[] {
  const tech = project.tech ?? [];
  const infra = tech.filter((t: string) =>
    /azure|aks|terraform|docker|kubernetes|github|nginx|envoy|prometheus|bash|cloud|bicep/i.test(t),
  );
  return infra.length >= 2 ? infra.slice(0, 4) : tech.slice(0, 4);
}
</script>

<template>
  <div class="root">
    <div class="col-sticky">
      <!-- S. Socials -->
      <section class="section socials">
        <span class="tag">S.</span>
        <a href="https://github.com/szuryuu" target="_blank" rel="noopener">GitHub</a>
        <span class="sep">·</span>
        <a href="https://linkedin.com/in/shafwan-ilham-dzaky" target="_blank" rel="noopener">LinkedIn</a>
      </section>

      <!-- E. Email -->
      <section class="section email">
        <span class="tag">E.</span>
        <a href="mailto:ilhamdzaky@gmail.com">ilhamdzaky@gmail.com</a>
      </section>


    </div>

    <div class="col-scroll">
      <!-- Bio -->
      <section class="section bio">
        <p>
          I build automated infrastructure, resilient systems, and
          security-first architecture. Focused on cloud-native platforms,
          CI/CD pipelines, and production-grade service meshes.
        </p>
      </section>

      <!-- W. Selected Work -->
      <section class="section work">
        <span class="tag">W.</span>
        <h2>Selected work ({{ shortlist.length }})</h2>

        <ol class="work-list">
          <li v-for="(p, i) in shortlist" :key="p.path ?? i" class="work-item">
            <div class="work-num">{{ String(i + 1).padStart(2, "0") }}.</div>
            <div class="work-body">
              <a
                v-if="p.github"
                :href="p.github"
                target="_blank"
                rel="noopener"
                class="work-title"
              >
                {{ p.title }}
                <span class="ext-link">&nearr;</span>
              </a>
              <span v-else class="work-title nolink">{{ p.title }}</span>

              <div class="work-field">
                <span class="field-label">Info.</span>
                {{ p.description }}
              </div>
              <div class="work-field">
                <span class="field-label">Stack.</span>
                {{ stackFor(p).join(", ") }}
              </div>
              <div class="work-field">
                <span class="field-label">Year.</span>
                {{ p.year }}
              </div>
            </div>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.root {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 80px 48px 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.col-sticky {
  position: sticky;
  top: 0;
  align-self: start;
  order: 2;
}

.col-scroll {
  order: 1;
}

.section {
  margin-bottom: 48px;
}

.tag {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

/* Identity */
/* Bio */
.bio p {
  max-width: 52ch;
  color: var(--ink-2);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

/* Socials + Email */
.socials,
.email {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  margin-bottom: 20px;
}

.socials .tag,
.email .tag {
  margin-right: 10px;
}

.socials a,
.email a {
  color: var(--ink);
  text-underline-offset: 3px;
}

/* Work */
.work h2 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 4px 0 28px;
}

.work-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.work-item {
  display: flex;
  gap: 20px;
  padding: 25px 0;
  border-top: 1px solid var(--hairline);
}

.work-item:last-child {
  padding-bottom: 0;
}

.work-num {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  color: var(--muted);
  min-width: 28px;
  padding-top: 1px;
}

.work-body {
  flex: 1;
  min-width: 0;
}

.work-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-decoration: none;
}

.work-title:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.work-title.nolink {
  cursor: default;
}

.ext-link {
  font-size: 12px;
  color: var(--muted);
  margin-left: 2px;
}

.work-field {
  font-size: 13.5px;
  color: var(--ink-2);
  line-height: 1.55;
  margin-top: 4px;
}

.field-label {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  margin-right: 6px;
}

@media (max-width: 767px) {
  .root {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 48px 16px 32px;
  }

  .col-sticky {
    position: static;
    order: 0;
  }

  .col-scroll {
    order: 0;
  }

  .section {
    margin-bottom: 36px;
  }

  .work-item {
    gap: 14px;
  }
}


</style>
