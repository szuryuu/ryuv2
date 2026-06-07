<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import LinkButton from "~/components/LinkButton.vue";
const route = useRoute();
const supabase = useSupabaseClient();

const { data: article } = await useAsyncData(
  `writing-${route.params.slug}`,
  () => queryCollection("writing").path(route.path).first(),
);

if (!article.value) {
  throw createError({ statusCode: 404, message: "Article not found" });
}

const { data: allArticles } = await useLazyAsyncData("all-writing", () =>
  queryCollection("writing").order("date", "DESC").all(),
);

const currentIndex = computed(
  () => allArticles.value?.findIndex((a) => a.path === route.path) ?? -1,
);
const prevArticle = computed(() =>
  currentIndex.value > 0 ? allArticles.value?.[currentIndex.value - 1] : null,
);
const nextArticle = computed(() =>
  currentIndex.value < (allArticles.value?.length ?? 0) - 1
    ? allArticles.value?.[currentIndex.value + 1]
    : null,
);

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
  ogImage: article.value.cover,
});

const pageRoot = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);
const activeId = ref("");
let observer: IntersectionObserver | null = null;

let startTime = 0;
let hasCountedRead = false;
const readCount = ref(0);

const fetchReadCount = async () => {
  const { data } = await supabase
    .from("article_reads")
    .select("read_count")
    .eq("slug", route.params.slug)
    .single();
  if (data) readCount.value = data.read_count;
};

watch(scrollProgress, async (newVal) => {
  if (hasCountedRead) return;

  const storageKey = `read_${route.params.slug}`;
  if (localStorage.getItem(storageKey)) {
    hasCountedRead = true;
    return;
  }

  const timeSpent = Date.now() - startTime;
  const minTimeRequired =
    getReadingTimeMins(article.value?.body) * 60000 * 0.25;

  if (newVal >= 80 && timeSpent >= minTimeRequired) {
    hasCountedRead = true;
    localStorage.setItem(storageKey, "true");

    await supabase.rpc("increment_read_count", {
      article_slug: route.params.slug as string,
    });
    readCount.value++;
  }
});

function onScroll() {
  const el = document.documentElement;
  const scrolled = el.scrollTop;
  const total = el.scrollHeight - el.clientHeight;
  scrollProgress.value = total > 0 ? (scrolled / total) * 100 : 0;
}

function getReadingTimeMins(body: unknown): number {
  const text = JSON.stringify(body ?? "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readingTime(body: unknown): string {
  return `${getReadingTimeMins(body)} min read`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

onMounted(() => {
  startTime = Date.now();
  fetchReadCount();

  window.addEventListener("scroll", onScroll, { passive: true });

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    { rootMargin: "0px 0px -80% 0px", threshold: 0.1 },
  );

  setTimeout(() => {
    pageRoot.value?.querySelectorAll(".prose h2, .prose h3").forEach((heading) => {
      if (heading.id) observer?.observe(heading);
    });
  }, 500);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  observer?.disconnect();
});
</script>

<template>
  <article v-if="article" ref="pageRoot" class="w-full min-h-screen relative">
    <div class="fixed top-0 left-0 right-0 z-20">
      <div class="h-px w-full bg-hairline">
        <div
          class="h-full bg-ink/30 transition-none"
          :style="{ width: scrollProgress + '%' }"
        ></div>
      </div>
    </div>

    <header class="relative flex mb-10 gap-8">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-10">
        <NuxtImg
          v-if="article.cover"
          :src="article.cover"
          :alt="article.title"
          class="w-full h-full object-cover opacity-20"
          width="1920"
          height="1080"
          format="webp"
          preload
        />
        <div class="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/90 to-transparent"></div>
      </div>

      <div class="w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 pt-32">
        <div class="flex items-center gap-4 mb-8">
          <span class="font-decoration text-2xl text-ink/40">技術記事</span>
          <div class="h-px flex-1 bg-gradient-to-r from-hairline to-transparent"></div>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="soft-tag-filter px-3 py-1 rounded-full bg-canvas-2 border border-hairline text-ink text-xs font-display"
          >
            {{ tag }}
          </span>
        </div>

        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-ink"
        >
          {{ article.title }}
        </h1>

        <p class="text-lg text-ink/70 max-w-2xl font-display mb-10">
          {{ article.description }}
        </p>

        <div
          class="flex flex-wrap items-center gap-6 text-xs font-display text-ink/40 uppercase tracking-wider"
        >
          <span class="flex items-center gap-2">
            <LucideCalendar class="w-3.5 h-3.5" />
            {{ formatDate(article.date) }}
          </span>
          <span class="flex items-center gap-2">
            <LucideClock class="w-3.5 h-3.5" />
            {{ readingTime(article.body) }}
          </span>
          <span class="flex items-center gap-2">
            <LucideEye class="w-3.5 h-3.5" />
            {{ readCount }} Reads
          </span>
        </div>
      </div>
    </header>

    <section class="max-w-7xl mx-auto px-6 md:px-12 pb-16 pt-4 relative">
      <div class="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        <div class="flex-1 min-w-0 w-full">
          <details
            v-if="article?.body?.toc?.links?.length"
            class="block lg:hidden mb-10 p-5 border border-hairline bg-canvas-2 rounded-xl text-ink"
          >
            <summary
              class="font-display font-bold cursor-pointer outline-none uppercase tracking-widest text-xs opacity-60"
            >
              Table of Contents
            </summary>
            <nav class="mt-5 flex flex-col gap-4 text-xs font-display">
              <a
                v-for="link in article.body.toc.links"
                :key="link.id"
                :href="`#${link.id}`"
                class="transition-colors text-ink/70 hover:text-ink uppercase tracking-widest"
                :class="[
                  link.depth === 3 ? 'ml-4' : '',
                  link.depth > 3 ? 'ml-8' : '',
                ]"
              >
                {{ link.text }}
              </a>
            </nav>
          </details>

          <main
            class="prose prose-lg max-w-none text-ink prose-headings:text-ink prose-p:text-ink prose-strong:text-ink prose-a:text-ink prose-a:decoration-hairline-strong prose-li:text-ink prose-code:text-ink-2 prose-pre:bg-canvas-2 prose-pre:text-ink prose-blockquote:text-ink-2"
          >
            <ContentRenderer class="text-ink" :value="article" />
          </main>
        </div>

        <aside class="hidden lg:block w-56 shrink-0 sticky top-32 self-start">
          <div class="flex flex-col">
            <div class="flex items-start text-ink mb-10 opacity-70">
              <span class="[writing-mode:vertical-lr] text-2xl font-decoration">目次</span>
              <span class="[writing-mode:vertical-lr] text-lg font-display uppercase tracking-widest text-ink/40">Contents</span>
            </div>
            <nav
              v-if="article?.body?.toc?.links?.length"
              class="flex flex-col gap-5 text-[11px] font-display"
            >
              <a
                v-for="link in article.body.toc.links"
                :key="link.id"
                :href="`#${link.id}`"
                class="transition-colors flex items-center gap-3 group uppercase tracking-widest"
                :class="
                  activeId === link.id
                    ? 'text-ink font-semibold'
                    : 'text-ink/40 hover:text-ink'
                "
              >
                <span
                  class="h-px transition-all duration-300"
                  :class="[
                    activeId === link.id ? 'bg-hairline-strong' : 'bg-hairline',
                    link.depth === 2
                      ? activeId === link.id
                        ? 'w-12'
                        : 'w-8 group-hover:w-12'
                      : '',
                    link.depth === 3
                      ? activeId === link.id
                        ? 'w-8 ml-4'
                        : 'w-4 group-hover:w-8 ml-4'
                      : '',
                    link.depth > 3
                      ? activeId === link.id
                        ? 'w-6 ml-8'
                        : 'w-2 group-hover:w-6 ml-8'
                      : '',
                  ]"
                ></span>
                <span class="line-clamp-2 leading-relaxed flex-1">{{
                  link.text
                }}</span>
              </a>
            </nav>
            <p
              v-else
              class="text-xs font-display text-ink/30 uppercase tracking-widest"
            >
              No contents available
            </p>
          </div>
        </aside>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 md:px-12 pb-24">
      <div
        class="pt-12 border-t border-hairline flex flex-col md:flex-row md:justify-between md:items-center gap-8"
      >
        <NuxtLink
          v-if="prevArticle"
          :to="prevArticle.path"
          class="flex flex-col items-start gap-2 group w-full md:w-1/3"
        >
          <span
            class="text-[10px] font-display text-ink/40 uppercase tracking-widest flex items-center gap-2"
          >
            <LucideArrowLeft
              class="w-3 h-3 group-hover:-translate-x-1 transition-transform"
            />
            Previous
          </span>
          <span
            class="text-sm font-display text-ink/80 group-hover:text-ink line-clamp-2"
            >{{ prevArticle.title }}</span
          >
        </NuxtLink>
        <div v-else class="w-full md:w-1/3"></div>

        <LinkButton
          to="/writing"
          aria-label="Back to Writing"
          class="shrink-0 flex items-center justify-center gap-2 group soft-tag-filter px-6 py-2 rounded-full bg-ink text-canvas font-display hover:bg-ink/90 hover:text-canvas transition-all duration-150"
        >
          <LucideGrid class="w-4 h-4" />
          <span class="font-display">All Articles</span>
        </LinkButton>

        <NuxtLink
          v-if="nextArticle"
          :to="nextArticle.path"
          class="flex flex-col items-end gap-2 group w-full md:w-1/3 text-right"
        >
          <span
            class="text-[10px] font-display text-ink/40 uppercase tracking-widest flex items-center gap-2"
          >
            Next
            <LucideArrowRight
              class="w-3 h-3 group-hover:translate-x-1 transition-transform"
            />
          </span>
          <span
            class="text-sm font-display text-ink/80 group-hover:text-ink line-clamp-2"
            >{{ nextArticle.title }}</span
          >
        </NuxtLink>
        <div v-else class="w-full md:w-1/3"></div>
      </div>
    </section>
  </article>
</template>
