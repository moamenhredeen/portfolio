<script setup lang="ts">
import { ref, onMounted } from "vue";

// The post this thread belongs to, e.g. "/blog/typescript/extends-never/".
// Passed down from PostLayout so comments attach to the right page.
const props = defineProps<{ slug: string }>();

interface Comment {
  id: number;
  author: string;
  body: string;
  created_at: string;
}

const comments = ref<Comment[]>([]);
const loading = ref(true);
const loadError = ref(false);

// Form state. The form stays collapsed until the reader chooses to write,
// so the page reads as pure paper by default.
const showForm = ref(false);
const author = ref("");
const body = ref("");
const website = ref(""); // honeypot — kept empty by real users
const submitting = ref(false);
const submitError = ref("");
const submitted = ref(false);

const dateFmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });
const formatDate = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : dateFmt.format(d);
};

async function load() {
  loading.value = true;
  loadError.value = false;
  try {
    const res = await fetch(
      `/api/comments?slug=${encodeURIComponent(props.slug)}`,
    );
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { comments: Comment[] };
    comments.value = data.comments ?? [];
  } catch {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

async function submit() {
  submitError.value = "";
  if (!author.value.trim()) {
    submitError.value = "Please add a name.";
    return;
  }
  if (!body.value.trim()) {
    submitError.value = "Your note is empty.";
    return;
  }
  submitting.value = true;
  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        slug: props.slug,
        author: author.value,
        body: body.value,
        website: website.value,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok && res.status !== 202) {
      submitError.value = data.error || "Something went wrong. Please try again.";
      return;
    }
    submitted.value = true;
    author.value = "";
    body.value = "";
  } catch {
    submitError.value = "Couldn't reach the server. Please try again.";
  } finally {
    submitting.value = false;
  }
}

onMounted(load);
</script>

<template>
  <section class="correspondence" aria-labelledby="correspondence-title">
    <h2 id="correspondence-title">Correspondence</h2>

    <p v-if="loading" class="corr-status">Loading…</p>
    <p v-else-if="loadError" class="corr-status">
      Comments are unavailable right now.
    </p>
    <p v-else-if="comments.length === 0" class="corr-status">
      No correspondence yet.
    </p>

    <ol v-else class="corr-list">
      <li v-for="c in comments" :key="c.id" class="corr-item">
        <p class="corr-body">
          {{ c.body }}
          <span class="corr-sig">
            — <span class="corr-author">{{ c.author }}</span>,
            <span class="corr-date">{{ formatDate(c.created_at) }}</span>
          </span>
        </p>
      </li>
    </ol>

    <!-- Post-submit notice replaces the invitation entirely. -->
    <p v-if="submitted" class="corr-notice">
      Thank you — your note has been received and will appear once reviewed.
    </p>

    <!-- Collapsed invitation: keeps the page pure paper until a reader writes. -->
    <button
      v-else-if="!showForm"
      type="button"
      class="corr-invite"
      @click="showForm = true"
    >
      Add to the correspondence →
    </button>

    <form v-else class="corr-form" @submit.prevent="submit">
      <div class="corr-field">
        <label for="corr-name">Name</label>
        <input
          id="corr-name"
          v-model="author"
          type="text"
          maxlength="80"
          autocomplete="name"
          :disabled="submitting"
        />
      </div>

      <div class="corr-field corr-field--note">
        <label for="corr-note">Note</label>
        <textarea
          id="corr-note"
          v-model="body"
          rows="3"
          maxlength="5000"
          :disabled="submitting"
        ></textarea>
      </div>

      <!-- Honeypot: off-screen; bots fill it, humans don't. -->
      <div class="corr-hp" aria-hidden="true">
        <label>
          Website
          <input v-model="website" type="text" tabindex="-1" autocomplete="off" />
        </label>
      </div>

      <p v-if="submitError" class="corr-error">{{ submitError }}</p>

      <div class="corr-actions">
        <button type="submit" class="corr-submit" :disabled="submitting">
          {{ submitting ? "Sending…" : "Submit →" }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.correspondence {
  max-width: 43rem;
  margin: 3.5rem auto 0;
  padding-top: 1rem;
  border-top: 1px solid var(--rule-dark);
  font-variant-numeric: oldstyle-nums proportional-nums;
}

.correspondence h2 {
  margin: 0 0 1.5rem;
  color: var(--ink);
  font-family: "Latin Modern Caps";
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.corr-status {
  margin: 0 0 2rem;
  color: var(--muted);
  font-size: 0.9rem;
  font-style: italic;
}

/* Comments read as numbered notes, signed at the end like letters. */
.corr-list {
  margin: 0 0 2.5rem;
  padding-left: 1.6rem;
  list-style: decimal;
}

.corr-item {
  margin: 0 0 1.1rem;
  padding-left: 0.35rem;
}

.corr-item::marker {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.corr-body {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.72;
  text-align: justify;
  hyphens: auto;
  -webkit-hyphens: auto;
  white-space: pre-wrap;
}

.corr-sig {
  white-space: normal;
  color: var(--muted);
}

.corr-author {
  font-family: "Latin Modern Caps";
  font-style: normal;
  letter-spacing: 0.02em;
}

.corr-date {
  font-size: 0.85em;
}

/* Quiet, typographic invitation — no button chrome. */
.corr-invite {
  display: inline;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent);
  font: inherit;
  font-style: italic;
  cursor: pointer;
}

.corr-invite:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.corr-notice {
  margin: 0;
  color: var(--muted);
  font-style: italic;
}

/* Fields set as ruled fill-in lines rather than boxed web inputs. */
.corr-form {
  margin-top: 0.5rem;
}

.corr-field {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  margin-bottom: 1.1rem;
}

.corr-field--note {
  align-items: flex-start;
}

.corr-field label {
  flex: 0 0 auto;
  padding-top: 0.15rem;
  color: var(--muted);
  font-family: "Latin Modern Caps";
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.corr-field input,
.corr-field textarea {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.15rem 0.1rem;
  border: 0;
  border-bottom: 1px solid var(--rule);
  background: transparent;
  color: var(--ink);
  font: inherit;
  font-size: 0.96rem;
  line-height: 1.72;
}

.corr-field textarea {
  resize: vertical;
}

.corr-field input:focus,
.corr-field textarea:focus {
  outline: none;
  border-bottom-color: var(--rule-dark);
}

/* Honeypot: off-screen but still focusable by autofill bots. */
.corr-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.corr-error {
  margin: 0 0 0.85rem;
  color: var(--accent);
  font-size: 0.85rem;
}

.corr-actions {
  text-align: right;
}

/* Submit as a typographic link, matching the invitation. */
.corr-submit {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent);
  font: inherit;
  font-style: italic;
  cursor: pointer;
}

.corr-submit:hover:not(:disabled) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.corr-submit:disabled {
  opacity: 0.55;
  cursor: default;
}
</style>
