<script setup lang="ts">
// import { Home, User, Code2, Mail, ArrowLeft } from "lucide-vue-next";

const error = useError();

const quickLinks = [
  { to: "/", label: "Home", icon: "i-custom-house" },
  { to: "/about", label: "About", icon: "i-custom-user" },
  { to: "/project", label: "Project", icon: "i-custom-code-xml" },
  { to: "/writing", label: "Writing", icon: "i-custom-pen" },
  { to: "/contact", label: "Contact", icon: "i-custom-mail" },
];

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div
    class="h-screen w-full flex items-center justify-center relative overflow-hidden bg-canvas"
  >
    <!-- Content -->
    <div class="max-w-2xl w-full px-6 text-center space-y-8">
      <!-- 404 Number -->
      <div class="space-y-2">
        <h1
          class="text-9xl md:text-[12rem] font-display font-bold text-ink/10 leading-none"
        >
          404
        </h1>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px flex-1 bg-hairline"></div>
          <p class="text-2xl font-decoration text-ink/40">
            ページが見つかりません
          </p>
          <div class="h-px flex-1 bg-hairline"></div>
        </div>
      </div>

      <!-- Message -->
      <div class="space-y-4">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-ink">
          Page Not Found
        </h2>
        <p class="text-ink-2 font-display max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
      </div>

      <!-- Quick Navigation -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="bezel-card group p-1"
        >
          <div
            class="core flex flex-col items-center justify-center gap-2 p-4 hover:bg-canvas transition-colors"
          >
            <UIcon
              :name="link.icon"
              class="w-6 h-6 text-ink-2 group-hover:text-ink group-hover:scale-110 transition-all"
            />
            <span
              class="text-sm font-display text-ink-2 group-hover:text-ink transition-colors"
            >
              {{ link.label }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Primary CTA -->
      <div class="pt-4">
        <button
          @click="handleError"
          class="inline-flex items-center gap-2 px-8 py-4 bg-ink text-canvas rounded-lg text-sm font-display font-semibold hover:bg-ink/90 transition-colors group"
        >
          <LucideArrowLeft
            :size="16"
            class="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </button>
      </div>

      <!-- Error Code (if available) -->
      <div v-if="error?.statusCode" class="pt-8">
        <p class="text-xs text-muted font-display uppercase tracking-wider">
          Error Code: {{ error.statusCode }}
          <span v-if="error?.statusMessage"> - {{ error.statusMessage }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
