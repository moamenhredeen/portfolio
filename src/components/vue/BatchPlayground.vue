<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

type Batch = { id: number; items: number[] }
const queue = ref<number[]>([])
const batches = ref<Batch[]>([])
let itemId = 0
let batchId = 0
let flushTimer: ReturnType<typeof setTimeout> | undefined
let burstTimer: ReturnType<typeof setInterval> | undefined

function add() {
  queue.value.push(++itemId)
  if (!flushTimer) flushTimer = setTimeout(flush, 700)
}
function flush() {
  if (queue.value.length) batches.value.unshift({ id: ++batchId, items: [...queue.value] })
  queue.value = []
  flushTimer = undefined
}
function burst() {
  let count = 0
  burstTimer = setInterval(() => {
    add()
    if (++count === 10) { clearInterval(burstTimer); burstTimer = undefined }
  }, 70)
}
function reset() {
  if (flushTimer) clearTimeout(flushTimer)
  if (burstTimer) clearInterval(burstTimer)
  flushTimer = burstTimer = undefined
  queue.value = []; batches.value = []; itemId = batchId = 0
}
onBeforeUnmount(reset)
</script>

<template>
  <section class="demo" aria-labelledby="batch-title">
    <header><div><small>Batching</small><h3 id="batch-title">Preserve every item, reduce the overhead</h3></div><div><button @click="add">Add item</button><button @click="burst">Add 10 quickly</button><button @click="reset">Reset</button></div></header>
    <div class="queue"><b>Waiting</b><span v-if="!queue.length">Queue is empty</span><i v-for="item in queue" :key="item">{{ item }}</i></div>
    <div class="results"><p v-if="!batches.length">Completed batches will appear here.</p><div v-for="batch in batches.slice(0, 3)" :key="batch.id"><b>Batch {{ batch.id }}</b><span>{{ batch.items.join(' · ') }}</span></div></div>
  </section>
</template>

<style scoped>
.demo{width:100%;padding:1.1rem;border:1px solid var(--rule-dark);background:var(--paper-raised)}header{display:flex;justify-content:space-between;gap:1rem;margin-bottom:.9rem}h3{margin:.1rem 0;font-size:1rem}small{color:var(--accent);font:700 .62rem "JetBrains Mono",monospace;text-transform:uppercase}header div:last-child{display:flex;flex-wrap:wrap;justify-content:end;gap:.35rem}button{border:1px solid var(--ink);padding:.35rem .55rem;background:transparent;font:700 .62rem "JetBrains Mono",monospace;cursor:pointer}.queue{display:flex;align-items:center;gap:.35rem;min-height:3.2rem;padding:.65rem;border:1px dashed var(--rule-dark)}.queue b{margin-right:.4rem;font-size:.72rem}.queue span,.results p{margin:0;color:var(--muted);font-size:.72rem}.queue i{display:grid;width:1.65rem;height:1.65rem;place-items:center;border-radius:50%;color:white;background:var(--accent);font:normal 600 .6rem "JetBrains Mono",monospace;animation:arrive .2s ease-out}.results{display:grid;gap:.4rem;margin-top:.7rem}.results div{display:grid;grid-template-columns:5rem 1fr;padding:.45rem .6rem;background:var(--code-bg);font-size:.7rem}.results span{font-family:"JetBrains Mono",monospace}@keyframes arrive{from{transform:scale(.3);opacity:0}}@media(max-width:600px){header{display:block}header div:last-child{justify-content:start;margin-top:.6rem}.queue{flex-wrap:wrap}}
</style>
