<script setup lang="ts">
import { computed, ref } from "vue";

const longitude = ref(0);
const dragging = ref(false);
let dragStartX = 0;
let dragStartLongitude = 0;

const CX = 310;
const CY = 125;
const R = 92;

function meridianPath(degrees: number) {
  const longitudeRadians = degrees * Math.PI / 180;
  const points: string[] = [];

  for (let latitude = -90; latitude <= 90; latitude += 3) {
    const latitudeRadians = latitude * Math.PI / 180;
    const x = CX + R * Math.sin(longitudeRadians) * Math.cos(latitudeRadians);
    const y = CY - R * Math.sin(latitudeRadians);
    points.push(`${latitude === -90 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

const selectedMeridian = computed(() => meridianPath(longitude.value));
const selectedX = computed(() => CX + R * Math.sin(longitude.value * Math.PI / 180));
const isBehindEarth = computed(() => Math.cos(longitude.value * Math.PI / 180) < 0);

const longitudeLabel = computed(() => {
  if (longitude.value === 0) return "0°";
  return `${Math.abs(longitude.value)}° ${longitude.value < 0 ? "W" : "E"}`;
});

const solarTimeLabel = computed(() => {
  const solarMinutes = longitude.value * 4;
  const minutes = Math.abs(solarMinutes);
  const sign = solarMinutes < 0 ? "−" : solarMinutes > 0 ? "+" : "±";
  return `${sign}${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
});

function startDragging(event: PointerEvent) {
  const svg = event.currentTarget as SVGSVGElement;
  dragging.value = true;
  dragStartX = event.clientX;
  dragStartLongitude = longitude.value;
  svg.setPointerCapture(event.pointerId);
}

function move(event: PointerEvent) {
  if (!dragging.value) return;
  const svg = event.currentTarget as SVGSVGElement;
  const delta = (event.clientX - dragStartX) / svg.getBoundingClientRect().width * 420;
  const next = Math.max(-180, Math.min(180, dragStartLongitude + delta));
  longitude.value = Math.round(next / 5) * 5;
}

function stopDragging() {
  dragging.value = false;
}
</script>

<template>
  <figure class="longitude-time">
    <figcaption>Drag the red meridian around the Earth</figcaption>

    <svg
      viewBox="0 0 620 245"
      role="img"
      :aria-label="`${longitudeLabel}: approximate solar-time difference ${solarTimeLabel}`"
      @pointerdown="startDragging"
      @pointermove="move"
      @pointerup="stopDragging"
      @pointercancel="stopDragging"
    >
      <defs>
        <radialGradient id="longitude-globe" cx="36%" cy="30%">
          <stop offset="0" stop-color="#ead99a" />
          <stop offset="0.68" stop-color="#477b89" />
          <stop offset="1" stop-color="#2d5570" />
        </radialGradient>
        <clipPath id="longitude-globe-clip">
          <circle :cx="CX" :cy="CY" :r="R" />
        </clipPath>
      </defs>

      <circle class="earth" :cx="CX" :cy="CY" :r="R" fill="url(#longitude-globe)" />

      <g class="grid" clip-path="url(#longitude-globe-clip)">
        <path v-for="value in [-60, -30, 0, 30, 60]" :key="value" :d="meridianPath(value)" />
        <line :x1="CX - R" :y1="CY" :x2="CX + R" :y2="CY" />
        <line :x1="CX - R * 0.866" :y1="CY - R * 0.5" :x2="CX + R * 0.866" :y2="CY - R * 0.5" />
        <line :x1="CX - R * 0.866" :y1="CY + R * 0.5" :x2="CX + R * 0.866" :y2="CY + R * 0.5" />
      </g>

      <path
        class="selected-meridian"
        :class="{ behind: isBehindEarth }"
        :d="selectedMeridian"
      />
      <circle class="marker" :cx="selectedX" :cy="CY" r="6" />

      <text class="pole-label" :x="CX" y="18" text-anchor="middle">North Pole</text>
      <text class="equator-label" :x="CX + R + 14" :y="CY + 4">Equator</text>
      <text class="direction west" x="115" :y="CY + 4" text-anchor="middle">West</text>
      <text class="direction east" x="505" :y="CY + 4" text-anchor="middle">East</text>
    </svg>

    <div class="result" aria-live="polite">
      <output>{{ longitudeLabel }}</output>
      <span aria-hidden="true">→</span>
      <output>{{ solarTimeLabel }}</output>
      <small>solar time from 0°</small>
    </div>

    <label class="slider">
      <span class="sr-only">Longitude</span>
      <input v-model.number="longitude" type="range" min="-180" max="180" step="5" />
    </label>
  </figure>
</template>

<style scoped>
.longitude-time {
  width: 100%;
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--rule-dark);
  color: var(--ink);
  background: var(--paper-raised);
}

figcaption {
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--rule);
  font-size: 0.9rem;
  font-style: italic;
  text-align: center;
}

svg {
  display: block;
  width: 100%;
  height: auto;
  touch-action: none;
  cursor: ew-resize;
  user-select: none;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
}

.earth { stroke: var(--ink); stroke-width: 1.5; }
.grid :is(path, line) { fill: none; stroke: color-mix(in srgb, var(--paper-raised) 62%, var(--ink)); stroke-width: 1; }
.selected-meridian { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linecap: round; }
.selected-meridian.behind { stroke-dasharray: 5 5; opacity: 0.65; }
.marker { fill: var(--accent); stroke: var(--paper-raised); stroke-width: 2; }
svg text { fill: var(--muted); }
.direction { font-size: 12px; }
.pole-label, .equator-label { font-size: 10px; }

.result {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--rule);
  font-family: "JetBrains Mono", monospace;
}

.result output { font-size: 1rem; font-weight: 700; }
.result span { color: var(--accent); }
.result small { color: var(--muted); font-size: 0.65rem; }
.slider { display: block; max-width: 24rem; margin: 0.65rem auto 0; }
input[type="range"] { width: 100%; accent-color: var(--accent); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 540px) {
  .result { flex-wrap: wrap; gap: 0.35rem 0.6rem; }
  .result small { flex-basis: 100%; text-align: center; }
}
</style>
