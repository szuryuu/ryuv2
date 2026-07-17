<script setup lang="ts">
const error = useError();
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center bg-canvas">
    <div class="max-w-lg w-full px-6 text-center space-y-6">
      <h1 class="text-8xl font-display font-bold text-ink/10 leading-none">
        404
      </h1>
      <p class="text-ink-2 text-sm font-display">
        This page doesn't exist.
      </p>
      <NuxtLink
        to="/"
        class="inline-block text-ink underline underline-offset-4 text-sm font-display hover:text-ink/70 transition-colors"
      >
        Back to home
      </NuxtLink>
      <p
        v-if="error?.statusCode"
        class="text-xs text-muted font-display pt-4"
      >
        Error: {{ error.statusCode }}
        <span v-if="error?.statusMessage"> &mdash; {{ error.statusMessage }}</span>
      </p>
    </div>
  </div>
</template>
