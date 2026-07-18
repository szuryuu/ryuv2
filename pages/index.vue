<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { timelineEvents, type TimelineEvent } from "~/utils/timeline";
import { projects } from "~/utils/projects";

const shortlistTitles = [
  "CloudOps: Azure GitOps Platform",
  "Dynamic VMSS Auto-Discovery & Mesh",
  "LaporCepat: AI-Powered Disaster Reporting",
  "MySQL Load Test",
  "Azure End-to-End DevOps Pipeline",
  "Dokku Nginx Path",
];

const shortlist = computed(() =>
  shortlistTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter(Boolean),
);

function stackFor(project: any): string[] {
  const tech = project.tech ?? [];
  const infra = tech.filter((t: string) =>
    /azure|aks|terraform|docker|kubernetes|github|nginx|envoy|prometheus|bash|cloud|bicep/i.test(
      t,
    ),
  );
  return infra.length >= 2 ? infra.slice(0, 4) : tech.slice(0, 4);
}

const activeTab = ref<"work" | "timeline">("work");
const year = new Date().getFullYear();

// Sort timeline events by latest role's end date, most recent first
function parseEndDate(role: TimelineEvent["roles"][number]): number {
  const endPart = role.date.includes(" - ")
    ? role.date.split(" - ")[1]
    : role.date;
  if (endPart === "Present") return Infinity;
  const m: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const parts = endPart.split(" ");
  if (parts.length === 2 && m[parts[0]] !== undefined) {
    return parseInt(parts[1]) * 12 + m[parts[0]];
  }
  return 0;
}

const sortedTimeline = computed(() =>
  [...timelineEvents].sort((a, b) => {
    const aLatest = Math.max(...a.roles.map(parseEndDate));
    const bLatest = Math.max(...b.roles.map(parseEndDate));
    return bLatest - aLatest;
  }),
);

function sortedRoles(event: TimelineEvent): TimelineEvent["roles"] {
  return [...event.roles].sort((a, b) => parseEndDate(b) - parseEndDate(a));
}

const ownerTime = ref("--:--:--");
const visitorTime = ref("--:--:--");
const visitorOffset = ref("GMT");

function fmtTime(d: Date): string {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function updateClock() {
  const now = new Date();
  const jakarta = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
  );
  ownerTime.value = fmtTime(jakarta);
  visitorTime.value = fmtTime(now);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  } as Intl.DateTimeFormatOptions)
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName");
  visitorOffset.value = parts ? parts.value : "GMT";
}

let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  updateClock();
  timer = setInterval(updateClock, 1000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="root">
    <div class="col-sticky">
      <div class="col-sticky-top">
        <section class="section identity">
          <div class="name-line">
            <span class="tag">C.</span>
            <span class="mono">{{ year }}</span>
            <span class="mono">Shafwan Ilham Dzaky</span>
          </div>

          <ClientOnly>
            <div class="clock">
              <div class="clock-row">
                <span class="tag">T.</span>
                <span class="mono clock-tz">YOG</span>
                <span class="mono clock-time">{{ ownerTime }}</span>
                <span class="mono clock-offset">GMT+7</span>
              </div>
              <div class="clock-row clock-row-you">
                <span class="tag tag-hidden">T.</span>
                <span class="mono clock-tz">YOU</span>
                <span class="mono clock-time">{{ visitorTime }}</span>
                <span class="mono clock-offset">{{ visitorOffset }}</span>
              </div>
            </div>
            <template #fallback>
              <div class="clock">
                <div class="clock-row">
                  <span class="tag">T.</span>
                  <span class="mono clock-tz">YOG</span>
                  <span class="mono clock-time">--:--:--</span>
                  <span class="mono clock-offset">GMT+7</span>
                </div>
                <div class="clock-row clock-row-you">
                  <span class="tag tag-hidden">T.</span>
                  <span class="mono clock-tz">YOU</span>
                  <span class="mono clock-time">--:--:--</span>
                  <span class="mono clock-offset">GMT</span>
                </div>
              </div>
            </template>
          </ClientOnly>
        </section>
      </div>

      <div class="col-sticky-bottom">
        <section class="section socials">
          <span class="tag">S.</span>
          <div class="socials-links">
            <a href="https://github.com/szuryuu" target="_blank" rel="noopener"
              >GitHub</a
            >
            <a
              href="https://linkedin.com/in/shafwan-ilham-dzaky"
              target="_blank"
              rel="noopener"
              >LinkedIn</a
            >
          </div>
        </section>

        <section class="section email">
          <span class="tag">E.</span>
          <a href="mailto:ilhamdzaky@gmail.com">ilhamdzaky@gmail.com</a>
        </section>
      </div>
    </div>

    <div class="col-scroll">
      <!-- Bio -->
      <section class="section bio">
        <p>
          I build automated infrastructure, resilient systems, and
          security-first architecture. Focused on cloud-native platforms, CI/CD
          pipelines, and production-grade service meshes.
        </p>
        <p>
          Previously focused on infrastructure automation, monitoring and
          observability with tools like Prometheus, Grafana, and the ELK stack.
          Experienced with multi-cloud environments and designing secure,
          scalable networks from the ground up.
        </p>
        <p>
          Previously interned as both a Full Stack Developer and DevOps Engineer
          at Botika, working across backend services, CI/CD automation, and
          infrastructure monitoring. Currently mentors developers as an external
          code reviewer, and holds an MTCNA certification in network
          administration and secure system design.
        </p>
      </section>

      <!-- Tabs: Selected work / Timeline -->
      <section class="section list-section">
        <div class="tab-header">
          <button
            class="tab-label"
            :class="{ active: activeTab === 'work' }"
            @click="activeTab = 'work'"
          >
            Selected work ({{ shortlist.length }})
          </button>
          <button
            class="tab-label"
            :class="{ active: activeTab === 'timeline' }"
            @click="activeTab = 'timeline'"
          >
            Timeline ({{ timelineEvents.length }})
          </button>
        </div>

        <!-- Work list -->
        <ol v-if="activeTab === 'work'" class="work-list">
          <li v-for="(p, i) in shortlist" :key="p.path ?? i" class="work-item list-item-row">
            <div class="work-num">
              {{ String(i + 1).padStart(2, "0") }}.
            </div>
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
                <span class="field-value">{{ p.description }}</span>
              </div>
              <div class="work-field">
                <span class="field-label">Stack.</span>
                <span class="field-value">{{ stackFor(p).join(", ") }}</span>
              </div>
              <div class="work-field">
                <span class="field-label">Year.</span>
                <span class="field-value">{{ p.year }}</span>
              </div>
            </div>
          </li>
        </ol>

        <!-- Timeline list -->
        <div v-else class="timeline-list">
          <div
            v-for="(event, i) in sortedTimeline"
            :key="event.id"
            class="tl-event list-item-row"
          >
            <div class="tl-rail">
              <div class="tl-dot"></div>
              <div v-if="i < sortedTimeline.length - 1" class="tl-line"></div>
            </div>
            <div class="tl-content">
              <span class="tl-title">{{ event.title }}</span>

              <template v-if="event.roles.length === 1">
                <div class="work-field">
                  <span class="field-label">Role.</span>
                  <span class="field-value">{{ event.roles[0].title }}</span>
                </div>
                <div class="work-field">
                  <span class="field-label">Info.</span>
                  <span class="field-value">{{
                    event.roles[0].description
                  }}</span>
                </div>
                <div class="work-field">
                  <span class="field-label">Period.</span>
                  <span class="field-value">{{ event.roles[0].date }}</span>
                </div>
              </template>

              <template v-else>
                <div class="tl-roles">
                  <div
                    v-for="(role, ri) in sortedRoles(event)"
                    :key="ri"
                    class="tl-role-item"
                    :class="{ 'tl-role-last': ri === event.roles.length - 1 }"
                  >
                    <div class="tl-rail-mini">
                      <div class="tl-dot-mini"></div>
                      <div
                        v-if="ri < event.roles.length - 1"
                        class="tl-line-mini"
                      ></div>
                    </div>
                    <div class="tl-role-content">
                      <div class="work-field">
                        <span class="field-label">Role.</span>
                        <span class="field-value">{{ role.title }}</span>
                      </div>
                      <div class="work-field">
                        <span class="field-label">Info.</span>
                        <span class="field-value">{{ role.description }}</span>
                      </div>
                      <div class="work-field">
                        <span class="field-label">Period.</span>
                        <span class="field-value">{{ role.date }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.root {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: clamp(48px, 6vw, 96px);
  padding: 0 24px 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.col-sticky {
  position: sticky;
  top: 0;
  align-self: start;
  order: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px);
  height: calc(100dvh - 90px);
  justify-content: space-between;
  padding-top: 140px;
  text-align: left;
  overflow: hidden;
}

.col-scroll {
  order: 2;
  padding-top: 140px;
}

.section {
  margin-bottom: 0;
}

.tag {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.name-line {
  font-size: var(--text-meta);
  line-height: var(--leading-meta);
  letter-spacing: var(--tracking-meta);
  margin: 0 0 10px;
}

.mono {
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-meta);
  font-weight: 400;
  color: var(--ink);
}

.name-line .mono {
  margin-left: 1.5ch;
}

.clock {
  font-size: var(--text-meta);
  line-height: var(--leading-meta);
  letter-spacing: var(--tracking-meta);
  margin-bottom: 0;
}

.clock-row {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap: 0;
}

.clock-row .tag {
  margin-right: 1.5ch;
}

.clock-tz {
  min-width: 3ch;
  text-align: left;
  margin-right: 1.5ch;
}

.clock-time {
  min-width: 8ch;
  text-align: right;
  margin-right: 1ch;
}

.clock-offset {
  color: var(--muted);
}

.clock-row-you {
  margin-top: 2px;
}

.tag-hidden {
  visibility: hidden;
}

/* Bio */
.bio p {
  color: var(--ink-2);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  letter-spacing: var(--tracking-body);
  margin: 0 0 1em;
}

.bio p:last-child {
  margin-bottom: 0;
}

.socials {
  display: flex;
  align-items: flex-start;
  gap: 0px;
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-meta);
  margin-bottom: 16px;
}

.email {
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-meta);
  margin-bottom: 16px;
}

.socials .tag,
.email .tag {
  margin-right: 10px;
}

.socials-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.socials a,
.email a {
  color: var(--ink);
  text-underline-offset: 3px;
}

.col-sticky-bottom .section {
  margin-bottom: 16px;
}

.col-sticky-bottom .section:last-of-type {
  margin-bottom: 0;
}

/* Tabs */
.list-section {
  margin-top: 32px;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 28px;
}

.tab-label {
  background: none;
  border: none;
  padding: 0;
  font-size: var(--text-body);
  letter-spacing: var(--tracking-body);
  font-family: inherit;
  color: var(--muted);
  cursor: pointer;
  text-underline-offset: 3px;
}

.tab-label.active {
  color: var(--ink);
  text-decoration: underline;
}

.tab-label:hover {
  color: var(--ink);
}

.work-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.work-item {
  /* layout handled by .list-item-row */
}

.work-num {
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-meta);
  color: var(--muted);
  width: 28px;
  flex-shrink: 0;
}

/* Shared list-item row (work + timeline) */
.list-item-row {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 25px 0;
  border-top: 1px solid var(--hairline);
}

.list-item-row:first-child {
  border-top: none;
}

.list-item-row:last-child {
  padding-bottom: 0;
}

.work-body {
  flex: 1;
  min-width: 0;
}

.work-title {
  font-size: 14px;
  font-weight: 400;
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
  font-size: var(--text-meta);
  color: var(--ink-2);
  margin-left: 2px;
}

.work-field {
  display: flex;
  align-items: baseline;
  font-size: var(--text-meta);
  color: var(--ink-2);
  line-height: var(--leading-meta);
  letter-spacing: var(--tracking-meta);
  margin-top: 10px;
}

.field-label {
  flex-shrink: 0;
  width: 68px;
  text-align: left;
}

.field-value {
  flex: 1;
  min-width: 0;
}

/* Timeline visual */
.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tl-event {
  /* layout handled by .list-item-row */
}

.tl-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 28px;
}

.tl-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--ink);
  flex-shrink: 0;
  margin-top: 6px;
}

.tl-line {
  width: 1px;
  flex: 1;
  background: var(--hairline);
  margin-top: 10px;
}

.tl-content {
  flex: 1;
  min-width: 0;
}

.tl-title {
  font-size: 14px;
  font-weight: 400;
  color: var(--ink);
}

/* Multi-role mini timeline */
.tl-roles {
  margin-top: 10px;
}

.tl-role-content .work-field:first-child {
  margin-top: 0;
}

.tl-role-item {
  display: flex;
  gap: 18px;
}

.tl-rail-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 6px;
  align-self: stretch;
}

.tl-dot-mini {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--muted);
  flex-shrink: 0;
  margin-top: 8px;
}

.tl-line-mini {
  width: 1px;
  flex: 1;
  min-height: 2px;
  background: var(--hairline);
  margin-top: 4px;
}

.tl-role-content {
  flex: 1;
  min-width: 0;
  padding-bottom: 8px;
}

.tl-role-last .tl-role-content {
  padding-bottom: 0;
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
    height: auto;
    display: block;
    padding-top: 0;
    text-align: left;
  }

  .col-scroll {
    order: 0;
    padding-top: 0;
  }

  .list-item-row {
    gap: 14px;
  }
}
</style>
