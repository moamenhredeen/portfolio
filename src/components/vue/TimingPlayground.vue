<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

type Lane = 'event' | 'throttle' | 'debounce'
type Mark = { id: number; lane: Lane; label: string }

const wait = ref(500)
const marks = ref<Mark[]>([])
const running = ref(false)
const counts = ref<Record<Lane, number>>({ event: 0, throttle: 0, debounce: 0 })

let sequence = 0
let lastThrottleCall = 0
let throttleTimer: ReturnType<typeof setTimeout> | undefined
let debounceTimer: ReturnType<typeof setTimeout> | undefined
let burstTimer: ReturnType<typeof setInterval> | undefined
let latestLabel = ''

const lanes: { id: Lane; name: string; note: string }[] = [
  { id: 'event', name: 'No control', note: 'Runs for every event' },
  { id: 'throttle', name: 'Throttle', note: 'At most once per interval' },
  { id: 'debounce', name: 'Debounce', note: 'After the events stop' },
]

const intervalLabel = computed(() => `${wait.value} ms`)

function addMark(lane: Lane, label: string) {
  const id = ++sequence
  marks.value.push({ id, lane, label })
  counts.value[lane]++

  window.setTimeout(() => {
    marks.value = marks.value.filter(mark => mark.id !== id)
  }, 3600)
}

function runThrottle(label: string) {
  latestLabel = label
  const remaining = wait.value - (performance.now() - lastThrottleCall)

  if (remaining <= 0) {
    if (throttleTimer) clearTimeout(throttleTimer)
    throttleTimer = undefined
    lastThrottleCall = performance.now()
    addMark('throttle', label)
    return
  }

  if (!throttleTimer) {
    throttleTimer = setTimeout(() => {
      lastThrottleCall = performance.now()
      throttleTimer = undefined
      addMark('throttle', latestLabel)
    }, remaining)
  }
}

function runDebounce(label: string) {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => addMark('debounce', label), wait.value)
}

function emitEvent(label = String(counts.value.event + 1)) {
  addMark('event', label)
  runThrottle(label)
  runDebounce(label)
}

function runBurst() {
  if (running.value) return

  running.value = true
  let emitted = 0
  emitEvent(String(++emitted))

  burstTimer = setInterval(() => {
    emitEvent(String(++emitted))
    if (emitted === 12) {
      clearInterval(burstTimer)
      burstTimer = undefined
      running.value = false
    }
  }, 100)
}

function reset() {
  if (throttleTimer) clearTimeout(throttleTimer)
  if (debounceTimer) clearTimeout(debounceTimer)
  if (burstTimer) clearInterval(burstTimer)

  throttleTimer = undefined
  debounceTimer = undefined
  burstTimer = undefined
  lastThrottleCall = 0
  running.value = false
  marks.value = []
  counts.value = { event: 0, throttle: 0, debounce: 0 }
}

onBeforeUnmount(reset)
</script>

<template>
  <section class="playground" aria-labelledby="timing-playground-title">
    <header class="playground__header">
      <div>
        <p class="eyebrow">Interactive event stream</p>
        <h2 id="timing-playground-title">One burst, three behaviours</h2>
      </div>
      <p class="instructions">Run a burst of 12 events, 100 ms apart. Each moving dot is a function call.</p>
    </header>

    <div class="controls">
      <button type="button" :disabled="running" @click="runBurst">
        {{ running ? 'Burst running…' : 'Run event burst' }}
      </button>
      <button type="button" class="button--quiet" @click="emitEvent()">Emit one</button>
      <button type="button" class="button--quiet" @click="reset">Reset</button>
      <label>
        Interval <output>{{ intervalLabel }}</output>
        <input v-model.number="wait" type="range" min="200" max="1000" step="100">
      </label>
    </div>

    <div class="legend" aria-hidden="true">
      <span>now</span>
      <span>3 seconds ago</span>
    </div>

    <div class="lanes" aria-live="polite">
      <div v-for="lane in lanes" :key="lane.id" class="lane">
        <div class="lane__label">
          <strong>{{ lane.name }}</strong>
          <span>{{ lane.note }}</span>
        </div>
        <div class="track">
          <i
            v-for="mark in marks.filter(item => item.lane === lane.id)"
            :key="mark.id"
            class="mark"
            :class="`mark--${lane.id}`"
            :title="`Call ${mark.label}`"
          >{{ mark.label }}</i>
        </div>
        <output class="count">{{ counts[lane.id] }}</output>
      </div>
    </div>

    <p class="takeaway">
      Throttle emits <em>during</em> sustained activity. Debounce waits for quiet.
    </p>
  </section>
</template>

<style scoped>
.playground {
  width: 100%;
  padding: 1.25rem;
  border: 1px solid var(--rule-dark);
  color: var(--ink);
  background: var(--paper-raised);
  font-family: Georgia, "Times New Roman", serif;
}

.playground__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--rule);
}

.playground h2 { margin: 0; font-size: 1.25rem; }
.eyebrow { margin: 0 0 .2rem; color: var(--accent); font: 700 .65rem/1.2 "JetBrains Mono", monospace; letter-spacing: .1em; text-transform: uppercase; }
.instructions { margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.45; }

.controls { display: flex; flex-wrap: wrap; align-items: center; gap: .55rem; padding: 1rem 0; }
button { padding: .48rem .7rem; border: 1px solid var(--ink); color: var(--paper-raised); background: var(--ink); font: 700 .72rem "JetBrains Mono", monospace; cursor: pointer; }
button:disabled { cursor: wait; opacity: .55; }
.button--quiet { color: var(--ink); background: transparent; }
label { display: grid; grid-template-columns: auto auto; gap: 0 .5rem; margin-left: auto; color: var(--muted); font-size: .72rem; }
label output { color: var(--ink); text-align: right; }
input { grid-column: 1 / -1; width: 10rem; accent-color: var(--accent); }

.legend { display: flex; justify-content: space-between; margin: 0 2.3rem .35rem 8.5rem; color: var(--muted); font: .6rem "JetBrains Mono", monospace; }
.lanes { border-block: 1px solid var(--rule); }
.lane { display: grid; grid-template-columns: 8rem 1fr 1.8rem; gap: .5rem; align-items: center; min-height: 4.25rem; }
.lane + .lane { border-top: 1px solid var(--rule); }
.lane__label { display: flex; flex-direction: column; }
.lane__label strong { font-size: .82rem; }
.lane__label span { color: var(--muted); font-size: .65rem; line-height: 1.25; }
.track { position: relative; height: 2.15rem; overflow: hidden; border-left: 1px solid var(--rule-dark); background: repeating-linear-gradient(90deg, transparent 0, transparent calc(25% - 1px), var(--rule) 25%); }
.mark { position: absolute; top: .3rem; right: -.9rem; display: grid; place-items: center; width: 1.55rem; height: 1.55rem; border-radius: 50%; color: white; background: var(--muted); font: 700 .56rem "JetBrains Mono", monospace; animation: travel 3.5s linear forwards; }
.mark--throttle { background: #2f5d80; }
.mark--debounce { background: var(--accent); }
.count { font: 700 .75rem "JetBrains Mono", monospace; text-align: right; }
.takeaway { margin: 1rem 0 0; font-size: .82rem; text-align: center; }

@keyframes travel { to { transform: translateX(calc(-100% - 30rem)); opacity: .15; } }

@media (max-width: 600px) {
  .playground__header { grid-template-columns: 1fr; }
  label { width: 100%; margin: .4rem 0 0; }
  input { width: 100%; }
  .legend { margin-left: 6.5rem; }
  .lane { grid-template-columns: 6rem 1fr 1.5rem; }
}
</style>
