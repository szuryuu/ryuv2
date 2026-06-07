<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

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

let io: IntersectionObserver | null = null

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
      redirectTo: `${window.location.origin}/guestbook`
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

onMounted(() => {
  fetchEntries()

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = document.querySelectorAll<HTMLElement>('.reveal')

  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('is-in'))
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  )

  reveals.forEach(el => io?.observe(el))
})

onBeforeUnmount(() => {
  io?.disconnect()
})
</script>

<template>
  <div class="guestbook-page">
    <div class="wrap">
      <header class="page-head bezel-card reveal">
        <div class="core">
          <div class="head-row">
            <div>
              <span class="eyebrow"><span class="dot" />芳名帳 · questbook</span>
              <h1>Sign the guest log.</h1>
              <p>Leave note, thought, feedback, or say hi. Public record.</p>
            </div>
            <button v-if="user" @click="logout" class="logout-btn">
              <LucideLogOut class="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <section class="form-section bezel-card reveal">
        <div class="core">
          <div v-if="!user" class="login-card">
            <div class="login-icon">
              <LucideShieldCheck class="w-8 h-8" />
            </div>
            <h3>Authentication Required</h3>
            <p>Sign in with GitHub to post. Bot protection active.</p>
            <button @click="loginWithGithub" class="pill">
              <span>Sign in with GitHub</span>
              <span class="icon-wrap">
                <LucideGithub class="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          <div v-else class="signed-form">
            <div class="user-badge">
              <img :src="user.user_metadata.avatar_url" class="user-avatar" alt="Avatar">
              <div class="user-info">
                <span class="user-label">Signing as</span>
                <strong>{{ user.user_metadata.full_name || user.user_metadata.user_name }}</strong>
              </div>
            </div>

            <div class="textarea-wrap">
              <textarea
                v-model="form.message"
                maxlength="300"
                rows="4"
                placeholder="Leave a note, thought, or just say hi..."
                :disabled="submitting"
              />
              <div class="textarea-footer">
                <span class="char-count">{{ form.message.length }} / 300</span>
              </div>
            </div>

            <div v-if="submitError" class="alert error-alert">
              <LucideAlertCircle class="w-4 h-4" />
              {{ submitError }}
            </div>

            <div v-if="submitDone" class="alert success-alert">
              <LucideCheck class="w-4 h-4" />
              Message recorded. <span class="font-decoration">ありがとう</span>
            </div>

            <button @click="handleSubmit" :disabled="submitting || !form.message.trim()" class="pill submit-pill">
              <span v-if="submitting">
                <LucideLoader2 class="w-3.5 h-3.5 animate-spin inline" />
                Signing...
              </span>
              <span v-else>Sign Questbook</span>
              <span class="icon-wrap" v-if="!submitting">
                <LucidePenLine class="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section class="entries-section reveal">
        <div class="entries-head">
          <div>
            <span class="section-label">{{ entries.length }} signatures</span>
            <h2>Guest Log</h2>
          </div>
          <span class="font-decoration vertical-text">記録</span>
        </div>

        <div v-if="loadingList" class="loading-grid">
          <div v-for="i in 6" :key="i" class="skeleton-card bezel-card">
            <div class="core skeleton-shimmer" />
          </div>
        </div>

        <div v-else-if="entries.length === 0" class="empty-state bezel-card">
          <div class="core">
            <LucideInbox class="empty-icon" />
            <p class="font-decoration empty-jp">まだ誰もいない</p>
            <span>Be first to sign questbook.</span>
          </div>
        </div>

        <div v-else class="entries-grid">
          <article v-for="entry in entries" :key="entry.id" class="entry-card bezel-card">
            <div class="core">
              <div class="entry-head">
                <img v-if="entry.avatar_url" :src="entry.avatar_url" :alt="entry.name" class="entry-avatar">
                <div v-else class="entry-avatar fallback">{{ entry.name.charAt(0) }}</div>

                <div class="entry-meta">
                  <strong>{{ entry.name }}</strong>
                  <time>{{ formatEntryDate(entry.created_at) }}</time>
                </div>
              </div>

              <p class="entry-message">{{ entry.message }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.guestbook-page {
  width: 100%;
  min-height: 100svh;
  padding: 96px 0 120px;
}

.wrap {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 28px;
  display: grid;
  gap: 24px;
}

.page-head .core {
  padding: 32px;
}

.head-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 0 0 1px var(--hairline);
  font-family: ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2f6a4a;
  box-shadow: 0 0 0 4px rgba(47, 106, 74, 0.18);
}

.page-head h1 {
  margin: 14px 0 8px;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.035em;
}

.page-head p {
  margin: 0;
  color: var(--muted);
  font-size: 17px;
  max-width: 48ch;
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--hairline);
  background: var(--canvas-2);
  color: #b91c1c;
  font-size: 12px;
  transition: background 700ms var(--ease);
}

.logout-btn:hover {
  background: var(--canvas);
}

.form-section .core {
  padding: 32px;
}

.login-card {
  text-align: center;
  padding: 40px 20px;
}

.login-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: rgba(47, 106, 74, 0.12);
  display: grid;
  place-items: center;
  color: #2f6a4a;
}

.login-card h3 {
  margin: 0 0 8px;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.login-card p {
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 15px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 10px 10px 18px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--canvas);
  font: 600 14px/1 var(--font-display);
  cursor: pointer;
  border: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: transform 700ms var(--ease);
}

.pill:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pill .icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 360ms var(--ease-spring), background 700ms var(--ease);
}

.pill:hover:not(:disabled) .icon-wrap {
  transform: translate(1px, -1px) scale(1.05);
  background: rgba(255, 255, 255, 0.22);
}

.pill:active:not(:disabled) {
  transform: scale(0.98);
}

.signed-form {
  display: grid;
  gap: 16px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid var(--hairline);
  background: var(--canvas);
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--hairline);
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.user-info strong {
  color: var(--ink);
  font-size: 15px;
}

.textarea-wrap {
  border-radius: 16px;
  border: 1px solid var(--hairline);
  background: var(--canvas);
  overflow: hidden;
}

textarea {
  width: 100%;
  border: none;
  background: transparent;
  padding: 16px;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.6;
  resize: none;
}

textarea:focus {
  outline: none;
}

textarea::placeholder {
  color: var(--muted);
  opacity: 0.6;
}

.textarea-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--hairline);
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: flex-end;
}

.char-count {
  font-size: 11px;
  color: var(--muted);
  font-family: ui-monospace, monospace;
}

.alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
}

.error-alert {
  background: rgba(185, 28, 28, 0.08);
  color: #b91c1c;
  border: 1px solid rgba(185, 28, 28, 0.2);
}

.success-alert {
  background: rgba(31, 106, 78, 0.08);
  color: #1f6a4e;
  border: 1px solid rgba(31, 106, 78, 0.2);
}

.submit-pill {
  justify-self: start;
}

.entries-section {
  margin-top: 24px;
}

.entries-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  gap: 20px;
}

.section-label {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.entries-head h2 {
  margin: 6px 0 0;
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1;
  letter-spacing: -0.03em;
}

.vertical-text {
  writing-mode: vertical-rl;
  font-size: 20px;
  opacity: 0.3;
}

.loading-grid,
.entries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

.skeleton-card .core {
  height: 140px;
  background: linear-gradient(90deg, var(--canvas-2) 25%, rgba(255,255,255,0.6) 50%, var(--canvas-2) 75%);
  background-size: 200% 100%;
}

.skeleton-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.empty-state .core {
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--muted);
  opacity: 0.5;
  margin: 0 auto 16px;
}

.empty-jp {
  margin: 0 0 4px;
  font-size: 18px;
  color: var(--muted);
}

.empty-state span {
  color: var(--muted);
  font-size: 14px;
}

.entry-card .core {
  padding: 20px;
  display: grid;
  gap: 12px;
}

.entry-head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.entry-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--hairline);
  object-fit: cover;
  flex-shrink: 0;
}

.entry-avatar.fallback {
  display: grid;
  place-items: center;
  background: var(--canvas);
  color: var(--ink);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

.entry-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.entry-meta strong {
  color: var(--ink);
  font-size: 14px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-meta time {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.entry-message {
  margin: 0;
  color: var(--ink-2);
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
}

.reveal {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(8px);
  transition: opacity 800ms var(--ease), transform 800ms var(--ease), filter 800ms var(--ease);
}

.reveal.is-in {
  opacity: 1;
  transform: none;
  filter: none;
}

@media (max-width: 767px) {
  .guestbook-page {
    padding: 74px 0 90px;
  }

  .wrap {
    padding: 0 16px;
  }

  .page-head .core,
  .form-section .core {
    padding: 20px;
  }

  .head-row {
    flex-direction: column;
    gap: 14px;
  }

  .logout-btn {
    align-self: flex-start;
  }

  .loading-grid,
  .entries-grid {
    grid-template-columns: 1fr;
  }

  .entries-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .vertical-text {
    writing-mode: horizontal-tb;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }

  .skeleton-shimmer {
    animation: none;
  }
}
</style>
