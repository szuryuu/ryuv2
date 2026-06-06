<script setup lang="ts">
defineProps({
  to: String,
  ariaLabel: String,
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="border border-hairline rounded-lg p-2 bg-canvas-2 text-ink text-xs flex items-center hover:bg-canvas transition-all duration-400"
    :aria-label="ariaLabel"
  >
    <slot />
  </NuxtLink>
</template>
