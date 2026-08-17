<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

type Request = {
  id: number
  query: string
  state: 'pending' | 'aborted' | 'resolved'
  delay: number
  progress: number
}
const requests = ref<Request[]>([])
const result = ref('No result yet')
const cancelPrevious = ref(true)
let controller: AbortController | undefined
let id = 0

function fakeRequest(query: string, delay: number, signal: AbortSignal) {
  const request: Request = { id: ++id, query, state: 'pending', delay, progress: 0 }
  const startedAt = performance.now()
  requests.value.push(request)

  return new Promise<string>((resolve, reject) => {
    const progressTimer = setInterval(() => {
      request.progress = Math.min(100, ((performance.now() - startedAt) / delay) * 100)
    }, 16)
    const timer = setTimeout(() => {
      clearInterval(progressTimer)
      resolve(query)
    }, delay)

    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
      reject(new DOMException('Aborted', 'AbortError'))
    }, { once: true })
  }).then(value => {
    request.progress = 100
    request.state = 'resolved'
    result.value = value
  }).catch(error => {
    if (error.name === 'AbortError') request.state = 'aborted'
  })
}

function runRace() {
  requests.value = []; result.value = 'Waiting…'; id = 0
  const scenarios = [{ query: 'g', delay: 1000 }, { query: 'ge', delay: 650 }, { query: 'germany', delay: 250 }]
  scenarios.forEach((scenario, index) => setTimeout(() => {
    if (cancelPrevious.value) controller?.abort()
    controller = new AbortController()
    fakeRequest(scenario.query, scenario.delay, controller.signal)
  }, index * 120))
}
onBeforeUnmount(() => controller?.abort())
</script>

<template>
  <section class="demo" aria-labelledby="race-title">
    <header><div><small>Async cancellation</small><h3 id="race-title">Three requests, deliberately out of order</h3></div><button @click="runRace">Run request race</button></header>
    <label><input v-model="cancelPrevious" type="checkbox"> Abort the previous request</label>
    <div class="requests">
      <p v-if="!requests.length">The first request will be slowest; the last will be fastest.</p>
      <div v-for="request in requests" :key="request.id" class="request" :class="request.state">
        <div class="request__meta">
          <code>{{ request.query }}</code>
          <span>{{ request.delay }} ms</span>
          <b>{{ request.state }}</b>
        </div>
        <div
          class="progress"
          role="progressbar"
          :aria-label="`Request for ${request.query}`"
          :aria-valuenow="Math.round(request.progress)"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span :style="{ width: `${request.progress}%` }" />
        </div>
      </div>
    </div>
    <p class="result">Rendered result: <strong>{{ result }}</strong></p>
  </section>
</template>

<style scoped>
.demo{width:100%;padding:1.1rem;border:1px solid var(--rule-dark);background:var(--paper-raised)}header{display:flex;align-items:start;justify-content:space-between;gap:1rem}h3{margin:.1rem 0;font-size:1rem}small{color:var(--accent);font:700 .62rem "JetBrains Mono",monospace;text-transform:uppercase}button{border:1px solid var(--ink);padding:.4rem .6rem;background:var(--ink);color:white;font:700 .62rem "JetBrains Mono",monospace;cursor:pointer}label{display:block;margin:.7rem 0;font-size:.72rem}.requests{display:grid;gap:.45rem;min-height:6rem}.requests>p{color:var(--muted);font-size:.75rem}.request{padding:.45rem .6rem;border-left:3px solid var(--color-warning);background:var(--code-bg);font-size:.68rem}.request__meta{display:grid;grid-template-columns:1fr 1fr 1fr;margin-bottom:.4rem}.request__meta b{text-align:right}.progress{height:.38rem;overflow:hidden;background:var(--code-rule)}.progress span{display:block;height:100%;background:var(--color-warning);transition:width 50ms linear}.requests .resolved{border-color:var(--color-tip)}.resolved .progress span{background:var(--color-tip)}.requests .aborted{border-color:var(--rule);color:var(--muted)}.aborted .request__meta{text-decoration:line-through}.aborted .progress span{background:var(--rule);opacity:.7}.result{margin:.7rem 0 0;padding-top:.6rem;border-top:1px solid var(--rule);font-size:.78rem}@media(max-width:520px){header{display:block}button{margin-top:.5rem;width:100%}}
</style>
