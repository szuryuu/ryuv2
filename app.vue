<script setup lang="ts">
</script>

<template>
  <UApp>
    <div class="mesh" aria-hidden="true" />
    <NuxtLayout>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </NuxtLayout>
  </UApp>
</template>
