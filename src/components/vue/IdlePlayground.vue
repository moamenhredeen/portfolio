<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const queued = ref(0)
const processed = ref(0)
const status = ref('No work queued')
let handle: number | undefined

type IdleWindow = Window & { requestIdleCallback?: (callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }

function schedule() {
  queued.value += 20
  status.value = 'Waiting for idle time…'
  if (handle !== undefined) return
  const browser = window as IdleWindow

  if (!browser.requestIdleCallback) {
    handle = window.setTimeout(() => process({ timeRemaining: () => 50, didTimeout: true }), 50)
    return
  }
  handle = browser.requestIdleCallback(process, { timeout: 1000 })
}

function process(deadline: { timeRemaining: () => number; didTimeout: boolean }) {
  handle = undefined
  let allowance = Math.max(1, Math.floor(deadline.timeRemaining() / 2))
  while (queued.value > 0 && allowance-- > 0) { queued.value--; processed.value++ }
  status.value = queued.value ? 'Yielded; waiting for another idle period…' : 'Queue complete'
  if (queued.value) scheduleNext()
}

function scheduleNext() {
  const browser = window as IdleWindow
  handle = browser.requestIdleCallback ? browser.requestIdleCallback(process, { timeout: 1000 }) : window.setTimeout(() => process({ timeRemaining: () => 50, didTimeout: true }), 50)
}

function reset() {
  const browser = window as IdleWindow
  if (handle !== undefined) { browser.cancelIdleCallback?.(handle); clearTimeout(handle) }
  handle = undefined; queued.value = 0; processed.value = 0; status.value = 'No work queued'
}
onBeforeUnmount(reset)
</script>

<template>
  <section class="demo" aria-labelledby="idle-title">
    <header><div><small>Idle scheduling</small><h3 id="idle-title">Do optional work when the browser has room</h3></div><button @click="schedule">Queue 20 tasks</button><button @click="reset">Reset</button></header>
    <div class="meter"><span :style="{ width: `${processed / Math.max(1, processed + queued) * 100}%` }" /></div>
    <div class="stats"><b>{{ processed }} processed</b><b>{{ queued }} waiting</b><span>{{ status }}</span></div>
  </section>
</template>

<style scoped>
.demo{width:100%;padding:1.1rem;border:1px solid var(--rule-dark);background:var(--paper-raised)}header{display:flex;align-items:start;gap:.4rem;margin-bottom:1rem}header div{margin-right:auto}h3{margin:.1rem 0;font-size:1rem}small{color:var(--accent);font:700 .62rem "JetBrains Mono",monospace;text-transform:uppercase}button{border:1px solid var(--ink);padding:.35rem .55rem;background:transparent;font:700 .62rem "JetBrains Mono",monospace;cursor:pointer}.meter{height:1rem;border:1px solid var(--rule-dark);background:var(--code-bg)}.meter span{display:block;height:100%;background:var(--accent);transition:width .2s}.stats{display:flex;gap:1rem;margin-top:.55rem;font-size:.68rem}.stats b{font-family:"JetBrains Mono",monospace}.stats span{margin-left:auto;color:var(--muted)}@media(max-width:600px){header{flex-wrap:wrap}header div{width:100%}.stats{flex-wrap:wrap}.stats span{width:100%;margin:0}}
</style>
