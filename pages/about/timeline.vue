<script setup lang="ts">
import { ref } from 'vue'
import { useTimeline } from '~/composables/useTimeline'
import { usePageEnter } from '~/composables/usePageEnter'

const { events } = useTimeline()
const pageRef = usePageEnter({ y: 20, duration: 0.6 })

const expandedRoles = ref<Record<string, boolean>>({})

function toggleRole(id: string) {
  expandedRoles.value[id] = !expandedRoles.value[id]
}
</script>

<template>
  <div ref="pageRef" class="timeline-page">
    <header class="timeline-head bezel-card">
      <div class="core">
        <NuxtLink to="/about" class="back-link">
          <LucideArrowLeft class="w-4 h-4" />
          Back to About
        </NuxtLink>

        <span class="eyebrow"><span class="dot" />03 · timeline</span>
        <h1>Career log with parallel technical tracks.</h1>
        <p>
          Main path and side branches visualized like git history.
          <span class="font-decoration"> 経験 </span>
        </p>
      </div>
    </header>

    <div class="timeline-wrap">
      <div
        v-for="event in events"
        :key="event.id"
        class="event-row"
      >
        <div class="event-rail">
          <div class="line" />

          <div
            v-if="!event.isMain && event.status === 'ongoing'"
            class="tail"
          />

          <svg
            v-if="!event.isMain"
            class="curve-a"
            viewBox="0 0 48 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 100 C 0 50, 48 50, 48 0"
              fill="none"
              class="rail-path"
              vector-effect="non-scaling-stroke"
            />
          </svg>

          <svg
            v-if="!event.isMain && event.status === 'merged'"
            class="curve-b"
            viewBox="0 0 48 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 48 100 C 48 50, 0 50, 0 0"
              fill="none"
              class="rail-path"
              vector-effect="non-scaling-stroke"
            />
          </svg>

          <div
            class="event-dot"
            :class="[
              event.color,
              event.isMain
                ? 'main-dot'
                : 'branch-dot'
            ]"
          />
        </div>

        <article class="event-card bezel-card">
          <div class="core">
            <div class="event-meta">
              <div
                v-if="event.logo"
                class="logo-wrap"
              >
                <img
                  :src="event.logo"
                  :alt="event.title"
                  class="logo"
                >
              </div>

              <div class="meta-copy">
                <div class="title-row">
                  <h3>{{ event.title }}</h3>

                  <span
                    v-if="event.status === 'merged'"
                    class="tag sky"
                  >
                    <LucideGitMerge class="w-3 h-3" />
                    Merged
                  </span>
                  <span
                    v-else-if="!event.isMain"
                    class="tag green"
                  >
                    <LucideGitBranch class="w-3 h-3" />
                    Active Branch
                  </span>
                  <span v-else class="tag neutral">
                    <LucideGitCommit class="w-3 h-3" />
                    Main
                  </span>
                </div>
              </div>
            </div>

            <div class="roles">
              <div
                v-for="(role, index) in event.roles"
                :key="index"
                class="role-item"
              >
                <svg class="role-line" fill="none">
                  <line
                    v-if="index !== event.roles.length - 1"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    class="role-stem"
                  />
                  <path
                    d="M 0 0 V 20 C 0 28, 8 28, 24 28"
                    class="role-bend"
                  />
                </svg>

                <div
                  class="role-dot"
                  :class="index === 0 ? event.color : 'bg-[var(--hairline-strong)]'"
                />

                <div class="role-card">
                  <div class="role-head">
                    <span class="role-title">{{ role.title }}</span>
                    <time>{{ role.date }}</time>
                  </div>

                  <p
                    :class="!expandedRoles[`${event.id}-${index}`] ? 'line-clamp-2 md:line-clamp-none' : ''"
                  >
                    {{ role.description }}
                  </p>

                  <button
                    @click="toggleRole(`${event.id}-${index}`)"
                    class="mobile-toggle"
                  >
                    {{ expandedRoles[`${event.id}-${index}`] ? 'Show Less' : 'Read More' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-page {
  min-height: 100svh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 96px 20px 110px;
  display: grid;
  gap: 24px;
}

.timeline-head .core {
  padding: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
  margin-bottom: 12px;
}

.back-link:hover {
  color: var(--ink);
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
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2f6a4a;
  box-shadow: 0 0 0 4px rgba(47, 106, 74, 0.18);
}

.timeline-head h1 {
  margin: 14px 0 8px;
  font-size: clamp(30px, 4.2vw, 54px);
  line-height: 1;
  letter-spacing: -0.03em;
}

.timeline-head p {
  margin: 0;
  color: var(--muted);
}

.timeline-wrap {
  display: grid;
  gap: 6px;
}

.event-row {
  display: flex;
  min-height: 150px;
}

.event-rail {
  position: relative;
  width: 96px;
  flex-shrink: 0;
}

.line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--hairline-strong);
  opacity: 0.9;
}

.tail {
  position: absolute;
  left: 72px;
  top: 0;
  bottom: 50%;
  width: 2px;
  background: linear-gradient(to top, var(--hairline-strong), transparent);
  opacity: 0.9;
}

.rail-path {
  stroke: var(--hairline-strong);
  stroke-width: 2.3;
  opacity: 0.95;
}

.curve-a {
  position: absolute;
  top: 50%;
  left: 24px;
  width: 48px;
  height: 50%;
}

.curve-b {
  position: absolute;
  bottom: 50%;
  left: 24px;
  width: 48px;
  height: 50%;
}

.event-dot {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 3px solid var(--canvas);
  transform: translate(-50%, -50%);
}

.main-dot {
  left: 24px;
}

.branch-dot {
  left: 72px;
}

.event-card {
  flex: 1;
  margin-bottom: 12px;
}

.event-card .core {
  padding: 24px;
}

.event-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--hairline);
}

.logo-wrap {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--canvas);
  border: 1px solid var(--hairline);
  display: grid;
  place-items: center;
  padding: 8px;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.meta-copy {
  flex: 1;
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.title-row h3 {
  margin: 0;
  font-size: 24px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.tag.sky {
  color: #0284c7;
  background: rgba(2, 132, 199, 0.12);
}

.tag.green {
  color: #059669;
  background: rgba(5, 150, 105, 0.12);
}

.tag.neutral {
  color: var(--ink-2);
  background: rgba(34, 34, 34, 0.1);
}

.roles {
  margin-top: 10px;
}

.role-item {
  position: relative;
  padding-left: 42px;
  padding-top: 7px;
  padding-bottom: 7px;
}

.role-line {
  position: absolute;
  top: 0;
  left: 14px;
  width: 32px;
  height: 100%;
}

.role-stem {
  stroke: var(--hairline-strong);
  stroke-width: 1.8;
}

.role-bend {
  stroke: var(--ink-2);
  opacity: 0.5;
  stroke-width: 1.8;
}

.role-dot {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  box-shadow: 0 0 0 4px var(--canvas);
  transform: translate(-50%, -50%);
}

.role-card {
  border-radius: 16px;
  border: 1px solid var(--hairline);
  background: var(--canvas);
  padding: 14px;
}

.role-head {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 8px;
}

.role-title {
  color: var(--ink);
  font-weight: 600;
  font-size: 15px;
}

.role-head time {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.role-card p {
  margin: 0;
  color: var(--ink-2);
  font-size: 14px;
  line-height: 1.55;
}

.mobile-toggle {
  display: none;
}

@media (max-width: 767px) {
  .timeline-page {
    padding: 74px 16px 86px;
  }

  .event-rail {
    width: 74px;
  }

  .line,
  .main-dot,
  .curve-a,
  .curve-b {
    left: 18px;
  }

  .tail,
  .branch-dot {
    left: 56px;
  }

  .event-card .core {
    padding: 18px;
  }

  .title-row h3 {
    font-size: 20px;
  }

  .mobile-toggle {
    display: inline-flex;
    margin-top: 8px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0;
  }
}
</style>
