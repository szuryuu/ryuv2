<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePageEnter } from '~/composables/usePageEnter'
import { useScrollSpy } from '~/composables/useScrollSpy'

const pageRef = usePageEnter({ y: 20, duration: 0.6 })

const { activeId } = useScrollSpy([
  'email',
  'github',
  'linkedin',
  'cv',
  'guestbook'
])

const contacts = [
  {
    id: 'email',
    label: 'Email',
    japanese: 'メール',
    value: 'ilhamdzaky@gmail.com',
    href: 'mailto:ilhamdzaky@gmail.com',
    icon: 'i-custom-mail',
    description: 'Best for project inquiries and collaboration'
  },
  {
    id: 'github',
    label: 'GitHub',
    japanese: 'ギットハブ',
    value: '@szuryuu',
    href: 'https://github.com/szuryuu',
    icon: 'i-custom-github2',
    description: 'Check out my code and contributions'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    japanese: 'リンクトイン',
    value: 'Shafwan Ilham Dzaky',
    href: 'https://linkedin.com/in/shafwan-ilham-dzaky',
    icon: 'i-custom-linkedin',
    description: 'Professional network and experience'
  },
  {
    id: 'cv',
    label: 'Resume/CV',
    japanese: '履歴書',
    value: 'Download PDF',
    href: '/cv.pdf',
    icon: 'i-custom-file-text',
    description: 'Full professional background and credentials'
  }
]

const hoveredContact = ref<string | null>(null)

interface GuestEntry {
  id: string
  name: string
  message: string
  avatar_url?: string
  created_at: string
}

const entries = ref<GuestEntry[]>([])
const loadingList = ref(true)
const submitting = ref(false)
const submitDone = ref(false)
const submitError = ref('')
const form = ref({ message: '' })
const supabase = useSupabaseClient()
const user = useSupabaseUser()

function formatEntryDate(dt: string) {
  return new Date(dt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function fetchEntries() {
  loadingList.value = true
  try {
    entries.value = await $fetch<GuestEntry[]>('/api/guestbook')
  } catch {
  } finally {
    loadingList.value = false
  }
}

async function loginWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/contact`
    }
  })
  if (error) console.error(error)
}

async function logout() {
  await supabase.auth.signOut()
}

async function handleSubmit() {
  submitError.value = ''
  if (!form.value.message.trim()) {
    submitError.value = 'Message cannot be empty.'
    return
  }

  submitting.value = true
  try {
    const entry = await $fetch<GuestEntry>('/api/guestbook', {
      method: 'POST',
      body: {
        message: form.value.message.trim()
      }
    })
    entries.value.unshift(entry)
    form.value = { message: '' }
    submitDone.value = true
    setTimeout(() => (submitDone.value = false), 3000)
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    submitError.value =
      err?.data?.message ?? 'Something went wrong. Try again.'
  } finally {
    submitting.value = false
  }
}

onMounted(() => fetchEntries())
</script>

<template>
  <div ref="pageRef" class="contact-page">
    <aside class="contact-aside">
      <div class="bezel-card sticky-shell">
        <div class="core">
          <div class="aside-title">
            <span class="upside font-decoration">コンタクト</span>
            <span class="upside">Contact</span>
          </div>

          <nav class="aside-nav">
            <a
              v-for="contact in contacts"
              :key="contact.id"
              :href="`#${contact.id}`"
              :class="activeId === contact.id ? 'is-active' : ''"
            >
              {{ contact.label }}
            </a>
            <a href="#guestbook" :class="activeId === 'guestbook' ? 'is-active' : ''">Questbook</a>
          </nav>
        </div>
      </div>
    </aside>

    <main class="contact-main">
      <header class="hero bezel-card">
        <div class="core">
          <span class="eyebrow"><span class="dot" />00 · contact</span>
          <h1>Let’s work together on reliable systems.</h1>
          <p>
            Open for freelance, full-time, and collaboration.
            <span class="font-decoration"> 連絡先 </span>
          </p>
        </div>
      </header>

      <section class="cards-grid">
        <article
          v-for="(contact, index) in contacts"
          :id="contact.id"
          :key="contact.id"
          class="contact-card bezel-card"
          @mouseenter="hoveredContact = contact.id"
          @mouseleave="hoveredContact = null"
        >
          <a :href="contact.href" target="_blank" rel="noopener noreferrer" class="core">
            <div class="top-row">
              <span class="index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="jp font-decoration">{{ contact.japanese }}</span>
            </div>

            <div class="icon-wrap">
              <UIcon :name="contact.icon" class="icon" />
            </div>

            <h3>{{ contact.label }}</h3>
            <p class="desc">{{ contact.description }}</p>

            <div class="value-row">
              <span>{{ contact.value }}</span>
              <LucideExternalLink class="w-4 h-4" />
            </div>

            <div class="hover-line" :class="hoveredContact === contact.id ? 'is-on' : ''" />
          </a>
        </article>
      </section>

      <section class="quick-info bezel-card">
        <div class="core">
          <div class="section-head">
            <span class="section-index">01 / Quick Info</span>
            <span class="font-decoration kanji">情報</span>
          </div>

          <div class="info-grid">
            <div class="cell">
              <p>Location</p>
              <strong>Yogyakarta, Indonesia</strong>
            </div>
            <div class="cell">
              <p>Timezone</p>
              <strong>WIB (UTC+7)</strong>
            </div>
            <div class="cell">
              <p>Response Time</p>
              <strong>Within 24 hours</strong>
            </div>
            <div class="cell">
              <p>Availability</p>
              <strong>Open for opportunities</strong>
            </div>
          </div>

          <div class="cta-row">
            <a href="mailto:ilhamdzaky@gmail.com" class="primary-link">
              Send Email
              <LucideMail class="w-4 h-4" />
            </a>
            <a href="/cv.pdf" target="_blank" class="ghost-link">
              <LucideDownload class="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section id="guestbook" class="guestbook bezel-card">
        <div class="core">
          <div class="section-head">
            <span class="section-index">02 / Questbook</span>
            <span class="font-decoration kanji">芳名帳</span>
          </div>

          <div class="form-wrap">
            <div class="head-row">
              <h3>Sign the Questbook</h3>
              <button
                v-if="user"
                @click="logout"
                class="tiny-btn"
              >
                Sign Out
              </button>
            </div>

            <div v-if="!user" class="login-box">
              <p>You must login to sign. Bot protection active.</p>
              <button @click="loginWithGithub" class="primary-link btn-as-btn">
                <LucideGithub class="w-4 h-4" />
                Sign in with GitHub
              </button>
            </div>

            <div v-else class="signed-box">
              <div class="user-row">
                <img :src="user.user_metadata.avatar_url" class="avatar" alt="Avatar">
                <span>
                  Signing as
                  <strong>{{ user.user_metadata.full_name || user.user_metadata.user_name }}</strong>
                </span>
              </div>

              <textarea
                v-model="form.message"
                maxlength="300"
                rows="3"
                placeholder="Leave a note, thought, or just say hi."
                :disabled="submitting"
              />
              <p class="count">{{ form.message.length }} / 300</p>

              <p v-if="submitError" class="error">{{ submitError }}</p>
              <p v-if="submitDone" class="ok">
                <LucideCheck class="w-3.5 h-3.5" />
                Your message has been recorded. ありがとう。
              </p>

              <button @click="handleSubmit" :disabled="submitting" class="primary-link btn-as-btn">
                <LucideLoader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
                {{ submitting ? 'Signing...' : 'Sign Questbook' }}
              </button>
            </div>
          </div>

          <div class="entries">
            <div v-if="loadingList" class="loading-list">
              <div v-for="i in 3" :key="i" class="skeleton" />
            </div>

            <div v-else-if="entries.length === 0" class="empty-note">
              <p class="font-decoration">まだ誰もいない</p>
              <span>Be the first to sign.</span>
            </div>

            <div v-else class="entry-list">
              <div v-for="entry in entries" :key="entry.id" class="entry-item">
                <img v-if="entry.avatar_url" :src="entry.avatar_url" :alt="entry.name" class="entry-avatar">
                <div v-else class="entry-avatar fallback">{{ entry.name.charAt(0) }}</div>

                <div class="entry-copy">
                  <div class="entry-head">
                    <strong>{{ entry.name }}</strong>
                    <span>{{ formatEntryDate(entry.created_at) }}</span>
                  </div>
                  <p>{{ entry.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.contact-page {
  width: 100%;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 20px 120px;
}

.sticky-shell { position: sticky; top: 132px; }
.sticky-shell .core {
  min-height: 450px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.aside-title { display: flex; gap: 6px; }
.aside-title .upside:first-child { font-size: 18px; }
.aside-title .upside:last-child { font-size: 14px; opacity: 0.45; }

.aside-nav { display: grid; gap: 10px; }
.aside-nav a {
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
.aside-nav a::before {
  content: '';
  width: 26px;
  height: 1px;
  background: var(--hairline-strong);
  transition: width 700ms var(--ease);
}
.aside-nav a:hover,
.aside-nav a.is-active { color: var(--ink); }
.aside-nav a:hover::before,
.aside-nav a.is-active::before { width: 40px; }

.contact-main { display: grid; gap: 20px; }
.hero .core { padding: 26px; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.dot { width: 6px; height: 6px; border-radius: 999px; background: #2f6a4a; box-shadow: 0 0 0 4px rgba(47,106,74,.18); }

.hero h1 { margin: 14px 0 10px; font-size: clamp(32px, 4.4vw, 56px); line-height: 1; letter-spacing: -0.03em; }
.hero p { margin: 0; color: var(--ink-2); }

.cards-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.contact-card .core {
  text-decoration: none;
  color: inherit;
  display: grid;
  gap: 8px;
  padding: 16px;
}
.top-row { display: flex; justify-content: space-between; align-items: center; }
.index { color: var(--hairline-strong); font-size: 28px; font-weight: 700; }
.jp { color: var(--ink); opacity: 0.35; }
.icon-wrap { width: 52px; height: 52px; border: 1px solid var(--hairline); border-radius: 12px; background: var(--canvas-2); display: grid; place-items: center; }
.icon { width: 26px; height: 26px; color: var(--ink); }
.contact-card h3 { margin: 0; color: var(--ink); font-size: 20px; }
.desc { margin: 0; color: var(--ink-2); font-size: 13px; line-height: 1.5; }
.value-row { margin-top: 4px; display: flex; justify-content: space-between; align-items: center; color: var(--ink); font-size: 13px; }
.hover-line { height: 2px; background: var(--ink); width: 0; transition: width 700ms var(--ease); }
.hover-line.is-on { width: 100%; }

.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.section-index { color: var(--muted); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
.kanji { font-size: 14px; opacity: 0.35; }

.quick-info .core,
.guestbook .core { padding: 18px; }
.info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.cell { border: 1px solid var(--hairline); border-radius: 12px; background: var(--canvas-2); padding: 10px; }
.cell p { margin: 0; color: var(--muted); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.cell strong { margin-top: 4px; color: var(--ink); display: block; font-size: 14px; }

.cta-row { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; }
.primary-link,
.ghost-link {
  text-decoration: none;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
}
.primary-link { background: var(--ink); color: var(--canvas); }
.ghost-link { border: 1px solid var(--hairline); color: var(--ink); background: var(--canvas-2); }
.btn-as-btn { cursor: pointer; }

.head-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.head-row h3 { margin: 0; color: var(--ink); font-size: 16px; }
.tiny-btn { border: none; background: transparent; color: #b91c1c; font-size: 11px; }

.login-box { margin-top: 10px; border: 1px solid var(--hairline); border-radius: 12px; background: var(--canvas-2); padding: 12px; }
.login-box p { margin: 0 0 10px; color: var(--ink-2); font-size: 13px; }

.signed-box { margin-top: 10px; display: grid; gap: 8px; }
.user-row { display: flex; align-items: center; gap: 8px; color: var(--ink-2); font-size: 13px; }
.avatar { width: 30px; height: 30px; border-radius: 999px; }

textarea {
  width: 100%;
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  border-radius: 12px;
  padding: 10px;
  color: var(--ink);
  font-size: 13px;
}
.count { margin: 0; text-align: right; color: var(--muted); font-size: 10px; }
.error { margin: 0; color: #b91c1c; font-size: 12px; }
.ok { margin: 0; color: #1f6a4e; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; }

.entries { margin-top: 16px; }
.loading-list { display: grid; gap: 8px; }
.skeleton { height: 52px; border-radius: 10px; background: var(--canvas-2); border: 1px solid var(--hairline); }

.empty-note { border: 1px solid var(--hairline); border-radius: 12px; text-align: center; padding: 20px; }
.empty-note p { margin: 0; color: var(--muted); }
.empty-note span { font-size: 12px; color: var(--muted); }

.entry-list { border-top: 1px solid var(--hairline); }
.entry-item { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--hairline); }
.entry-avatar { width: 30px; height: 30px; border-radius: 999px; border: 1px solid var(--hairline); object-fit: cover; }
.entry-avatar.fallback { display: grid; place-items: center; background: var(--canvas-2); color: var(--ink); font-size: 12px; text-transform: uppercase; }
.entry-copy { min-width: 0; }
.entry-head { display: flex; gap: 8px; align-items: baseline; }
.entry-head strong { color: var(--ink); font-size: 13px; }
.entry-head span { color: var(--muted); font-size: 11px; }
.entry-copy p { margin: 2px 0 0; color: var(--ink-2); font-size: 13px; }

@media (max-width: 1024px) {
  .contact-page { grid-template-columns: 1fr; padding-top: 84px; }
  .contact-aside { display: none; }
}
@media (max-width: 767px) {
  .contact-page { padding: 74px 16px 90px; }
  .cards-grid,
  .info-grid { grid-template-columns: 1fr; }
}
</style>
