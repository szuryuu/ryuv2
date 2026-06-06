<script setup lang="ts">
import { ref, computed } from "vue";
import Menu from "~/components/Menu.vue";

const isOpen = ref(false);
const isHovered = ref(false);

function handleClick() {
  isOpen.value = !isOpen.value;
}

const buttonVariant = computed(() => (isHovered.value ? "solid" : "outline"));
</script>

<template>
  <div class="min-h-[100svh] flex flex-col relative overflow-x-clip">
    <!-- Floating pill navbar -->
    <nav
      class="fixed left-1/2 top-6 z-30 -translate-x-1/2 backdrop-blur-2xl bg-white/70 border border-black/8 ring-1 ring-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-full px-6 sm:px-10 py-2 flex items-center gap-6 w-max mx-auto"
    >
      <div class="flex items-center gap-3 select-none">
        <h1 class="text-2xl md:text-3xl font-display font-bold tracking-tight text-ink">Sz</h1>
        <!-- Kanji ornament, faint, decorative -->
        <span class="font-decoration text-[1.1rem] md:text-xl opacity-30 -ml-1 mt-0.5 hidden sm:inline-block tracking-tighter align-top select-none">士</span>
      </div>
      <UButton
        color="neutral"
        :variant="buttonVariant"
        class="rounded-full font-display text-xs md:text-sm px-5 py-2 flex items-center font-semibold border-none ring-1 ring-black/5 bg-white/60 hover:bg-innerlight shadow-none text-ink hover:text-ink-2 active:scale-98 duration-700 transition-all"
        @click="handleClick"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <span class="pr-2">{{ isOpen ? "Close" : "Menu" }}</span>
        <span class="hidden md:inline">&#x1F784;</span>
      </UButton>
    </nav>

    <div class="flex flex-col flex-1">
      <Menu v-if="isOpen" class="flex-1 flex" @close="isOpen = false" />
      <main v-if="!isOpen" class="flex-1 flex px-6 md:px-12">
        <slot />
      </main>
    </div>
  </div>
</template>
