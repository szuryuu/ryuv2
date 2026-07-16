<script setup lang="ts">
const error = useError();
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center bg-canvas">
    <div class="max-w-2xl w-full px-6 text-center space-y-8">
      <h1 class="text-9xl md:text-[12rem] font-display font-bold text-ink/10 leading-none">
        404
      </h1>

      <div class="space-y-4">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-ink">
          Page Not Found
        </h2>
        <p class="text-ink-2 font-display max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div class="pt-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-8 py-4 bg-ink text-canvas rounded-lg text-sm font-display font-semibold hover:bg-ink/90 transition-colors"
        >
          Back to Home
        </NuxtLink>
      </div>

      <div v-if="error?.statusCode" class="pt-8">
        <p class="text-xs text-muted font-display uppercase tracking-wider">
          Error Code: {{ error.statusCode }}
          <span v-if="error?.statusMessage"> - {{ error.statusMessage }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
