<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const rawEvents = ref(0)
const renderedFrames = ref(0)
const pointer = ref({ x: 50, y: 50 })
let frame: number | undefined
let latest = { x: 50, y: 50 }

function move(event: PointerEvent) {
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect()
  latest = {
    x: ((event.clientX - bounds.left) / bounds.width) * 100,
    y: ((event.clientY - bounds.top) / bounds.height) * 100,
  }
  rawEvents.value++

  if (frame !== undefined) return
  frame = requestAnimationFrame(() => {
    pointer.value = latest
    renderedFrames.value++
    frame = undefined
  })
}

function reset() {
  rawEvents.value = 0
  renderedFrames.value = 0
}

onBeforeUnmount(() => frame !== undefined && cancelAnimationFrame(frame))
</script>

<template>
  <section class="demo" aria-labelledby="frame-title">
    <header><div><small>requestAnimationFrame</small><h3 id="frame-title">Move faster than the screen can paint</h3></div><button @click="reset">Reset</button></header>
    <div class="stage" @pointermove="move">
      <span class="cursor" :style="{ left: `${pointer.x}%`, top: `${pointer.y}%` }" />
      <p>Move your pointer here</p>
    </div>
    <div class="stats">
      <p><strong>{{ rawEvents }}</strong> pointer events</p>
      <p><strong>{{ renderedFrames }}</strong> visual updates</p>
      <p><strong>{{ rawEvents - renderedFrames }}</strong> calls coalesced</p>
    </div>
  </section>
</template>

<style scoped>
.demo{width:100%;padding:1.1rem;border:1px solid var(--rule-dark);background:var(--paper-raised)}header{display:flex;align-items:start;justify-content:space-between;gap:1rem;margin-bottom:.8rem}h3{margin:.1rem 0;font-size:1rem}small{color:var(--accent);font:700 .62rem "JetBrains Mono",monospace;text-transform:uppercase}button{border:1px solid var(--ink);padding:.35rem .6rem;background:transparent;font:700 .68rem "JetBrains Mono",monospace;cursor:pointer}.stage{position:relative;height:10rem;overflow:hidden;border:1px solid var(--rule);background:repeating-linear-gradient(0deg,transparent 0,transparent 23px,var(--code-rule) 24px),repeating-linear-gradient(90deg,transparent 0,transparent 23px,var(--code-rule) 24px);touch-action:none}.stage p{display:grid;height:100%;place-items:center;color:var(--muted);font-size:.8rem;pointer-events:none}.cursor{position:absolute;width:1rem;height:1rem;border:2px solid var(--accent);border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 18%,transparent);pointer-events:none}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-top:.7rem}.stats p{margin:0;color:var(--muted);font-size:.68rem;text-align:center}.stats strong{display:block;color:var(--ink);font:700 1rem "JetBrains Mono",monospace}@media(max-width:520px){.stats{grid-template-columns:1fr}.stage{height:8rem}}
</style>
