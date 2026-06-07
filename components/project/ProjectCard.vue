<script setup lang="ts">
import LinkButton from "~/components/LinkButton.vue";

defineProps<{
  project: {
    name: string;
    type: string;
    year: string;
    path: string;
    image?: string;
    projectDetailUrl: string;
    liveDemoUrl?: string;
    githubUrl?: string;
    featured?: boolean;
  };
}>();
</script>

<template>
  <article class="project-card bezel-card">
    <div class="core">
      <div class="card-image-wrap">
        <NuxtImg
          v-if="project.image"
          :src="project.image"
          :alt="project.name"
          class="card-image"
          width="400"
          height="240"
          format="webp"
          loading="lazy"
        />
        <div v-else class="card-image-empty">
          <LucideImage class="w-10 h-10" />
        </div>

        <div v-if="project.featured" class="featured-badge">
          <LucideStar class="w-3 h-3" />
          Featured
        </div>
      </div>

      <div class="card-content">
        <div class="card-meta">
          <span class="meta-type">{{ project.type }}</span>
          <span class="meta-year">{{ project.year }}</span>
        </div>

        <NuxtLink :to="project.path" class="card-title">
          {{ project.name }}
        </NuxtLink>

        <div class="card-actions">
          <LinkButton
            v-if="project.liveDemoUrl"
            :to="project.liveDemoUrl"
            aria-label="View live demo"
            target="_blank"
            class="action-btn"
          >
            <LucideExternalLink class="w-3.5 h-3.5" />
            Live
          </LinkButton>
          <LinkButton
            v-if="project.githubUrl"
            :to="project.githubUrl"
            aria-label="View repository"
            target="_blank"
            class="action-btn"
          >
            <UIcon name="i-custom-github2" class="w-3.5 h-3.5" />
            Repo
          </LinkButton>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  height: 100%;
  transition: transform 700ms var(--ease), box-shadow 700ms var(--ease);
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow:
    inset 0 1px 0 var(--innerlight),
    0 0 0 1px var(--hairline),
    0 30px 70px -22px rgba(10, 10, 10, 0.22);
}

.project-card .core {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  height: 100%;
}

.card-image-wrap {
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: var(--core-radius) var(--core-radius) 0 0;
  overflow: hidden;
  background: var(--canvas);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-image-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--muted);
  opacity: 0.3;
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(47, 106, 74, 0.9);
  backdrop-filter: blur(8px);
  color: var(--canvas);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(47, 106, 74, 0.3);
}

.featured-badge svg {
  fill: currentColor;
}

.card-content {
  padding: 0 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.meta-type,
.meta-year {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.card-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.3;
  color: var(--ink);
  text-decoration: none;
  transition: color 700ms var(--ease);
  min-height: 48px;
}

.card-title:hover {
  color: var(--ink-2);
}

.card-actions {
  display: flex;
  gap: 6px;
  margin-top: auto;
}

.action-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  padding: 8px 10px !important;
}
</style>
