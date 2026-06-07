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
  <div class="double-bezel-card flex flex-col h-full">
    <div class="bezel-shell flex-1 flex flex-col">
      <div class="bezel-core flex flex-col gap-4 px-0 pt-6 pb-6 h-full">
        <div class="flex justify-between items-start w-full gap-2">
          <!-- Image/featured badge -->
          <div class="relative image-wrap">
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              alt="Project Image"
              class="project-image"
              height="130"
              width="144"
              format="webp"
              preload
            />
            <div v-else class="image-empty">No Image</div>
            <div
              v-if="project.featured"
              class="absolute top-2 right-2 flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] uppercase px-2 py-0.5 rounded font-display tracking-widest shadow-none"
            >
              <LucideStar class="w-3 h-3 fill-green-400/50" />
              Featured
            </div>
          </div>
          <!-- Type/year vertical -->
          <div class="flex flex-col justify-between items-center h-36 pl-2 [writing-mode:vertical-lr]">
            <span class="uppercase text-xs text-muted tracking-wide">{{ project.type }}</span>
            <span class="text-xs text-muted tracking-wide">{{ project.year }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-between items-center mt-4 gap-3 px-3">
          <NuxtLink
            :to="project.path"
            class="text-center font-display font-semibold line-clamp-2 min-h-[40px] flex items-center text-ink hover:text-ink-2 transition-colors duration-500"
          >
            {{ project.name }}
          </NuxtLink>
          <div class="flex justify-between w-full gap-2 mt-1">
            <LinkButton
              v-if="project.liveDemoUrl"
              :to="project.liveDemoUrl"
              aria-label="Open Live Demo"
              class="flex gap-2 items-center justify-center w-full"
              target="_blank"
            >
              Live Demo
            </LinkButton>
            <LinkButton
              v-if="project.githubUrl"
              :to="project.githubUrl"
              aria-label="Open GitHub"
              class="flex gap-2 items-center justify-center w-full"
              target="_blank"
            >
              <UIcon name="i-custom-github2" class="size-3" /> Repo
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.double-bezel-card {
  padding: 10px;
  border-radius: var(--shell-radius);
  background: var(--canvas-2);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
  border: 1.5px solid var(--hairline);
  display: flex;
  transition: transform 0.7s var(--ease), box-shadow 0.7s var(--ease);
}
.double-bezel-card:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 20px 48px -12px rgba(170,177,135,0.14);
}
.bezel-shell {
  background: var(--hairline);
  border-radius: calc(var(--shell-radius) - 0.19rem);
  padding: 0.07rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.bezel-core {
  background: var(--innerlight);
  border-radius: var(--core-radius);
  box-shadow: 0 3px 12px 0 rgba(180,180,171,0.06), 0 1px 5px 0 rgba(221,221,215,0.06);
  flex: 1;
  min-height: 230px;
  display: flex;
  flex-direction: column;
}

.image-wrap {
  width: 144px;
  height: 136px;
  border-radius: 14px;
  background: var(--canvas-2);
  border: 1px solid var(--hairline);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.image-empty {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
</style>
