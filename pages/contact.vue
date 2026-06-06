<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePageEnter } from "~/composables/usePageEnter";
import { useScrollSpy } from "~/composables/useScrollSpy";

const pageRef = usePageEnter({ y: 20, duration: 0.6 });

const { activeId } = useScrollSpy([
  "email",
  "github",
  "linkedin",
  "cv",
  "guestbook",
]);

const contacts = [
  {
    id: "email",
    label: "Email",
    japanese: "メール",
    value: "ilhamdzaky@gmail.com",
    href: "mailto:ilhamdzaky@gmail.com",
    icon: "i-custom-mail",
    description: "Best for project inquiries and collaboration",
  },
  {
    id: "github",
    label: "GitHub",
    japanese: "ギットハブ",
    value: "@szuryuu",
    href: "https://github.com/szuryuu",
    icon: "i-custom-github2",
    description: "Check out my code and contributions",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    japanese: "リンクトイン",
    value: "Shafwan Ilham Dzaky",
    href: "https://linkedin.com/in/shafwan-ilham-dzaky",
    icon: "i-custom-linkedin",
    description: "Professional network and experience",
  },
  {
    id: "cv",
    label: "Resume/CV",
    japanese: "履歴書",
    value: "Download PDF",
    href: "/cv.pdf",
    icon: "i-custom-file-text",
    description: "Full professional background and credentials",
  },
];

const hoveredContact = ref<string | null>(null);

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  avatar_url?: string;
  created_at: string;
}

const entries = ref<GuestEntry[]>([]);
const loadingList = ref(true);
const submitting = ref(false);
const submitDone = ref(false);
const submitError = ref("");
const form = ref({ message: "" });
const supabase = useSupabaseClient();
const user = useSupabaseUser();

function formatEntryDate(dt: string) {
  return new Date(dt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function fetchEntries() {
  loadingList.value = true;
  try {
    entries.value = await $fetch<GuestEntry[]>("/api/guestbook");
  } catch {
  } finally {
    loadingList.value = false;
  }
}

async function loginWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/contact`,
    },
  });
  if (error) console.error(error);
}

async function logout() {
  await supabase.auth.signOut();
}

async function handleSubmit() {
  submitError.value = "";
  if (!form.value.message.trim()) {
    submitError.value = "Message cannot be empty.";
    return;
  }

  submitting.value = true;
  try {
    const entry = await $fetch<GuestEntry>("/api/guestbook", {
      method: "POST",
      body: {
        message: form.value.message.trim(),
      },
    });
    entries.value.unshift(entry);
    form.value = { message: "" };
    submitDone.value = true;
    setTimeout(() => (submitDone.value = false), 3000);
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } };
    submitError.value =
      err?.data?.message ?? "Something went wrong. Try again.";
  } finally {
    submitting.value = false;
  }
}

onMounted(() => fetchEntries());
</script>

<template>
  <div
    class="w-full min-h-[100svh] flex flex-col lg:flex-row pt-24 gap-8 max-w-7xl mx-auto"
    ref="pageRef"
  >
    <Circle
      class="!fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 -z-10"
    />

    <aside class="w-full hidden lg:block">
      <div class="flex items-start flex-col justify-between fixed px-6 pt-10">
        <div class="flex items-start text-ink">
          <span class="[writing-mode:vertical-lr] text-2xl font-decoration select-none text-ink mb-2">コンタクト</span>
          <span class="[writing-mode:vertical-lr] text-lg font-display text-ink/40">Contact</span>
        </div>
        <nav class="hidden lg:flex flex-col gap-4 mt-12 text-sm font-display">
          <a
            v-for="contact in contacts"
            :key="contact.id"
            :href="`#${contact.id}`"
            class="transition-all flex items-center gap-3 group uppercase tracking-widest"
            :class="activeId === contact.id ? 'text-ink font-semibold' : 'text-ink/40 hover:text-ink'"
          >
            <span
              class="h-px transition-all duration-500"
              :class="activeId === contact.id ? 'w-12 bg-hairline-strong' : 'w-8 bg-hairline group-hover:w-12'"
            ></span>
            {{ contact.label }}
          </a>
          <a
            href="#guestbook"
            class="transition-all flex items-center gap-3 group uppercase tracking-widest"
            :class="activeId === 'guestbook' ? 'text-ink font-semibold' : 'text-ink/40 hover:text-ink'"
          >
            <span
              class="h-px transition-all duration-500"
              :class="activeId === 'guestbook' ? 'w-12 bg-hairline-strong' : 'w-8 bg-hairline group-hover:w-12'"
            ></span>
            Guestbook
          </a>
        </nav>
      </div>
    </aside>

    <main class="w-full lg:min-w-5xl max-w-5xl space-y-12 pb-32 mx-auto px-1">
      <section class="relative group">
        <div class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"></div>
        <h2 class="text-xs font-display text-ink/40 uppercase tracking-widest mb-12 pl-4">
          00 / Get in Touch
        </h2>

        <div class="space-y-6">
          <h1 class="text-reveal font-display uppercase group cursor-pointer text-ink text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.01]">
            <span class="text-gradient-base">Let's<br />Work<br />Together</span>
            <span class="text-reveal-overlay">Let's<br />Work<br />Together</span>
          </h1>

          <div class="space-y-2 pl-1">
            <p class="font-decoration text-ink/30">連絡先</p>
            <p class="text-xs text-ink/48 max-w-xs font-display leading-relaxed">
              Open to freelance projects, full-time opportunities, and collaborations. Response time: usually within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(contact, index) in contacts"
          :key="contact.id"
          :id="contact.id"
          class="relative group"
        >
          <div class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-400"></div>

          <div class="flex items-center gap-4 mb-4">
            <div class="h-px flex-1 bg-hairline"></div>
            <span class="text-4xl font-display text-hairline font-bold">{{ String(index + 1).padStart(2, "0") }}</span>
          </div>

          <a
            :href="contact.href"
            target="_blank"
            rel="noopener noreferrer"
            class="block double-bezel-card hover:shadow-xl transition-all duration-250 group/card"
            @mouseenter="hoveredContact = contact.id"
            @mouseleave="hoveredContact = null"
          >
            <div class="bezel-shell">
              <div class="bezel-core px-6 py-8 flex flex-col md:flex-row md:items-center gap-6">
                <div class="w-16 h-16 flex items-center justify-center bg-canvas-2 rounded-lg border border-hairline group-hover/card:border-hairline-strong transition-colors">
                  <UIcon
                    :name="contact.icon"
                    class="w-8 h-8 text-ink group-hover/card:scale-110 transition-transform"
                  />
                </div>

                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-xl font-display font-semibold text-ink">{{ contact.label }}</h3>
                    <span class="text-sm font-decoration text-ink/40">{{ contact.japanese }}</span>
                  </div>
                  <p class="text-sm text-ink/60 font-display mb-2">
                    {{ contact.description }}
                  </p>
                  <div class="flex items-center gap-2 text-ink">
                    <span class="font-display font-medium">{{ contact.value }}</span>
                    <LucideExternalLink
                      class="w-4 h-4 opacity-0 group-hover/card:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>

              <div
                class="mt-6 h-px bg-hairline rounded-full overflow-hidden transition-opacity duration-300"
                :class="hoveredContact === contact.id ? 'opacity-100' : 'opacity-0'"
              >
                <div
                  class="h-full bg-ink transition-all duration-400"
                  :style="{ width: hoveredContact === contact.id ? '100%' : '0%' }"
                ></div>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section class="relative group">
        <div class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"></div>

        <div class="double-bezel-card">
          <div class="bezel-shell">
            <div class="bezel-core p-8">
              <h3 class="text-2xl font-display font-bold text-ink mb-6">Quick Info</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <LucideMapPin class="w-4 h-4 text-ink/40" />
                    <p class="text-xs uppercase text-ink/40 font-display">Location</p>
                  </div>
                  <p class="text-ink font-display">Yogyakarta, Indonesia</p>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <LucideClock class="w-4 h-4 text-ink/40" />
                    <p class="text-xs uppercase text-ink/40 font-display">Timezone</p>
                  </div>
                  <p class="text-ink font-display">WIB (UTC+7)</p>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <LucideMessageSquare class="w-4 h-4 text-ink/40" />
                    <p class="text-xs uppercase text-ink/40 font-display">Response Time</p>
                  </div>
                  <p class="text-ink font-display">Within 24 hours</p>
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <LucideCalendar class="w-4 h-4 text-ink/40" />
                    <p class="text-xs uppercase text-ink/40 font-display">Availability</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p class="text-ink font-display">Open for opportunities</p>
                  </div>
                </div>
              </div>
              <div class="mt-8 pt-6 border-t border-hairline flex flex-wrap gap-3">
                <a
                  href="mailto:ilhamdzaky@gmail.com"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-sm font-display font-semibold ring-1 ring-ink/10 hover:bg-ink/90 hover:text-canvas transition-colors button-in-button-shadow"
                >
                  Send Email
                  <LucideMail class="w-4 h-4" />
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-6 py-3 border border-hairline bg-canvas text-ink rounded-full text-sm font-display hover:bg-canvas-2 hover:text-ink transition-colors"
                >
                  <LucideDownload class="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="flex items-center gap-6 pt-8">
        <div class="flex-1 h-px bg-hairline"></div>
        <span class="font-decoration text-ink/25 text-2xl">芳名帳</span>
        <div class="flex-1 h-px bg-hairline"></div>
      </div>

      <section id="guestbook" class="relative group space-y-8">
        <div class="absolute -left-4 top-0 bottom-0 w-px bg-hairline origin-top scale-y-0 transition-transform group-hover:scale-y-100 duration-500"></div>

        <div>
          <h2 class="text-xs font-display text-ink/40 uppercase tracking-widest mb-2 pl-4">
            Guestbook
          </h2>
          <p class="text-xs text-ink/30 font-display pl-4">You were here. Leave a mark.</p>
        </div>

        <div class="double-bezel-card">
          <div class="bezel-shell">
            <div class="bezel-core p-6">
              <div class="flex items-center justify-between mb-5">
                <h3 class="text-sm font-display font-semibold text-ink uppercase tracking-wider">Sign the Guestbook</h3>
                <button
                  v-if="user"
                  @click="logout"
                  class="text-xs text-red-500 hover:text-red-400 font-display transition-colors"
                >Sign Out</button>
              </div>
              <div v-if="!user" class="text-center py-6">
                <p class="text-sm font-display text-ink/40 mb-4">You must be logged in to sign the guestbook. This keeps the bots away.</p>
                <button
                  @click="loginWithGithub"
                  class="inline-flex items-center gap-3 px-6 py-3 bg-ink text-canvas rounded-full text-xs font-display font-semibold hover:bg-ink/90 transition-all"
                >
                  <LucideGithub class="w-4 h-4" />
                  Sign in with GitHub
                </button>
              </div>
              <div v-else class="space-y-4">
                <div class="flex items-center gap-3 mb-4">
                  <img
                    :src="user.user_metadata.avatar_url"
                    class="w-8 h-8 rounded-full bg-canvas-2"
                    alt="Avatar"
                  />
                  <span class="text-sm font-display text-ink"
                    >Signing in as
                    <strong>{{ user.user_metadata.full_name || user.user_metadata.user_name }}</strong>
                  </span>
                </div>
                <div>
                  <textarea
                    v-model="form.message"
                    maxlength="300"
                    rows="3"
                    placeholder="Leave a note, thought, or just say hi."
                    class="w-full bg-canvas-2 border border-hairline rounded-lg px-4 py-3 text-sm font-display text-ink placeholder-ink/20 focus:outline-none focus:border-hairline-strong transition-colors resize-none"
                    :disabled="submitting"
                  ></textarea>
                  <p class="text-right text-[10px] font-display text-ink/20 mt-1">{{ form.message.length }} / 300</p>
                </div>
                <p v-if="submitError" class="text-xs font-display text-red-500">{{ submitError }}</p>
                <Transition name="fade-up">
                  <p v-if="submitDone" class="text-xs font-display text-green-600 flex items-center gap-2">
                    <LucideCheck class="w-3.5 h-3.5" />
                    Your message has been recorded. ありがとう。
                  </p>
                </Transition>
                <button
                  @click="handleSubmit"
                  :disabled="submitting"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-ink text-canvas rounded-full text-xs font-display font-semibold hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <LucideLoader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
                  {{ submitting ? "Signing..." : "Sign Guestbook" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div v-if="loadingList" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-14 rounded-lg bg-canvas-2 animate-pulse"></div>
          </div>

          <div v-else-if="entries.length === 0" class="py-12 text-center border border-hairline rounded-xl">
            <p class="font-decoration text-ink/20 text-xl mb-1">まだ誰もいない</p>
            <p class="text-xs font-display text-ink/25">Be the first to sign.</p>
          </div>

          <div v-else class="flex flex-col">
            <div
              v-for="entry in entries"
              :key="entry.id"
              class="group/entry flex items-start gap-4 py-5 border-b border-hairline hover:border-hairline-strong transition-colors"
            >
              <img
                v-if="entry.avatar_url"
                :src="entry.avatar_url"
                :alt="entry.name"
                class="w-8 h-8 rounded-full bg-canvas-2 border border-hairline shrink-0 mt-0.5 object-cover"
              />
              <div
                v-else
                class="w-8 h-8 rounded-full bg-canvas-2 border border-hairline flex items-center justify-center text-xs font-display text-ink/60 shrink-0 mt-0.5 uppercase"
              >
                {{ entry.name.charAt(0) }}
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-3 mb-1">
                  <span class="text-sm font-display font-semibold text-ink">{{ entry.name }}</span>
                  <span class="text-[11px] font-display text-ink/25">{{ formatEntryDate(entry.created_at) }}</span>
                </div>
                <p class="text-sm text-ink/55 font-display leading-relaxed">{{ entry.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
