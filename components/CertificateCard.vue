<script setup lang="ts">
defineProps<{
  certificate: {
    id: number;
    Image: string;
    title: string;
    description: string;
    skill: string;
    pinned?: boolean;
    url?: string;
  };
}>();
</script>

<template>
  <div
    class="double-bezel-card flex flex-col transition-all duration-400 group/card h-full"
    :class="certificate.pinned ? 'shadow-lg shadow-green-300/10' : ''"
  >
    <div class="bezel-shell">
      <div class="bezel-core flex flex-col overflow-hidden h-full p-0">
        <div class="relative overflow-hidden rounded-t-[calc(var(--core-radius,1.5rem))]">
          <NuxtImg
            :src="certificate.Image"
            class="w-full h-48 object-cover transition-transform duration-700 group-hover/card:scale-105"
            width="400"
            height="300"
            format="webp"
            loading="lazy"
            :alt="certificate.title"
          />
          <div
            v-if="certificate.pinned"
            class="absolute top-3 right-3 bg-ink/85 border border-hairline-strong text-canvas text-[10px] uppercase px-2 py-1 rounded font-display tracking-widest flex items-center gap-1 shadow-lg backdrop-blur-md"
          >
            <LucidePin class="w-3 h-3 text-green-600 fill-green-400/20" />
            Pinned
          </div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-lg font-display font-semibold text-ink leading-tight mb-2">
            {{ certificate.title }}
          </h3>
          <p class="text-xs text-ink-2 font-display line-clamp-3 mb-6 flex-1 leading-relaxed">
            {{ certificate.description }}
          </p>

          <div class="flex items-center justify-between mt-auto pt-4 border-t border-hairline">
            <a
              :href="certificate.url || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-display text-ink-2 hover:text-ink uppercase tracking-widest flex items-center gap-2 transition-colors soft-tag-filter"
            >
              Verify
              <LucideExternalLink class="w-3 h-3" />
            </a>
            <span
              class="text-[10px] font-display text-ink-2 uppercase tracking-widest border border-hairline px-2 py-1 rounded bg-canvas-2"
            >
              {{ certificate.skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
