<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const progress = ref(0);
const running = ref(false);

let frame: number | undefined;
let startedAt = 0;
let startedFrom = 0;

const DURATION = 10_000;
const ROTATION_END = 0.72;
// The real orbital movement during a day is about 0.986°. We use 18° so the
// resulting misalignment can be seen at this scale.
const DISPLAY_ORBIT_DEGREES = 18;

const firstTurn = computed(() => Math.min(progress.value / ROTATION_END, 1));
const extraTurn = computed(() => Math.max(
  0,
  (progress.value - ROTATION_END) / (1 - ROTATION_END),
));
const rotationDegrees = computed(() =>
  360 * firstTurn.value + DISPLAY_ORBIT_DEGREES * extraTurn.value,
);

const earth = computed(() => {
  const orbit = (-DISPLAY_ORBIT_DEGREES * firstTurn.value * Math.PI) / 180;
  return {
    x: 165 + 245 * Math.cos(orbit),
    y: 165 + 245 * Math.sin(orbit),
    orbit,
  };
});

const sunEdge = computed(() => {
  const angle = earth.value.orbit + Math.PI;
  return {
    x: earth.value.x + 60 * Math.cos(angle),
    y: earth.value.y + 60 * Math.sin(angle),
  };
});

const accessibleStage = computed(() => {
  if (progress.value === 0) return "The observer faces the Sun.";
  if (progress.value < ROTATION_END) return "Earth is completing one rotation while moving along its orbit.";
  if (progress.value < 1) return "One rotation is complete. The highlighted extra turn realigns the observer with the Sun.";
  return "The extra turn is complete and the observer faces the Sun again.";
});

function stop() {
  if (frame !== undefined) cancelAnimationFrame(frame);
  frame = undefined;
  running.value = false;
}

function tick(now: number) {
  progress.value = Math.min(1, startedFrom + (now - startedAt) / DURATION);
  if (progress.value >= 1) return stop();
  frame = requestAnimationFrame(tick);
}

function play() {
  if (running.value) return;
  if (progress.value >= 1) progress.value = 0;
  startedFrom = progress.value;
  startedAt = performance.now();
  running.value = true;
  frame = requestAnimationFrame(tick);
}

function reset() {
  stop();
  progress.value = 0;
}

function scrub(value: number) {
  stop();
  progress.value = value;
}

onBeforeUnmount(stop);
</script>

<template>
  <figure class="solar-day">
    <figcaption>One rotation, then the extra turn toward the Sun</figcaption>

    <svg
      class="diagram"
      viewBox="0 0 620 285"
      role="img"
      :aria-label="accessibleStage"
    >
      <defs>
        <radialGradient id="sun-glow">
          <stop offset="0" stop-color="#fff4b8" />
          <stop offset="0.55" stop-color="#e8a83c" />
          <stop offset="1" stop-color="#c56b24" />
        </radialGradient>
        <linearGradient id="earth-light" x1="0" x2="1">
          <stop offset="0" stop-color="#2d5570" />
          <stop offset="0.48" stop-color="#477b89" />
          <stop offset="0.52" stop-color="#c7b870" />
          <stop offset="1" stop-color="#ead99a" />
        </linearGradient>
        <clipPath id="earth-clip">
          <circle r="52" />
        </clipPath>
      </defs>

      <path class="orbit" d="M 410 165 A 245 245 0 0 0 398 89" />

      <g>
        <circle cx="165" cy="165" r="50" fill="url(#sun-glow)" />
        <text x="165" y="235" text-anchor="middle">Sun</text>
      </g>

      <line
        class="sun-line"
        x1="165"
        y1="165"
        :x2="sunEdge.x"
        :y2="sunEdge.y"
      />

      <g :transform="`translate(${earth.x} ${earth.y})`">
        <circle class="rotation-ring" r="67" />
        <path
          class="extra-arc"
          d="M -67 0 A 67 67 0 0 0 -63.7 20.7"
          pathLength="1"
          :style="{ strokeDashoffset: 1 - extraTurn }"
        />
        <circle class="earth" r="53" fill="url(#earth-light)" />
        <g
          class="surface"
          clip-path="url(#earth-clip)"
          :transform="`rotate(${-rotationDegrees})`"
        >
          <circle class="grid" r="18" />
          <circle class="grid" r="35" />
          <path class="grid" d="M -52 0 H 52 M 0 -52 V 52" />
          <path class="grid" d="M -37 -37 L 37 37 M 37 -37 L -37 37" />
          <path class="land" d="M -27 -31 L -8 -39 L 10 -29 L 3 -12 L 15 0 L 5 18 L -13 10 L -23 -5 Z" />
          <path class="land" d="M 25 12 L 43 20 L 37 39 L 17 35 L 13 22 Z" />
          <circle class="pole" r="2.5" />
          <circle class="observer" cx="-48" cy="0" r="6" />
        </g>
        <text x="0" y="91" text-anchor="middle">Earth</text>
      </g>

      <g class="legend" transform="translate(352 258)">
        <line class="legend-rotation" x1="0" y1="0" x2="23" y2="0" />
        <text x="31" y="4">one rotation</text>
        <line class="legend-extra" x1="128" y1="0" x2="151" y2="0" />
        <text x="159" y="4">extra turn</text>
      </g>
    </svg>

    <div class="controls">
      <button type="button" @click="running ? stop() : play()">
        {{ running ? "Pause" : progress >= 1 ? "Again" : "Play" }}
      </button>
      <button type="button" class="quiet" @click="reset">Reset</button>
      <label>
        <span class="sr-only">Move through the animation</span>
        <input
          :value="progress"
          type="range"
          min="0"
          max="1"
          step="0.001"
          @input="scrub(Number(($event.target as HTMLInputElement).value))"
        />
      </label>
    </div>
  </figure>
</template>

<style scoped>
.solar-day {
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

.diagram {
  display: block;
  width: 100%;
  height: auto;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
}

.orbit,
.sun-line,
.rotation-ring,
.surface .grid {
  fill: none;
  stroke: var(--rule-dark);
  stroke-width: 1.5;
}

.orbit,
.rotation-ring { stroke-dasharray: 4 5; }
.sun-line { stroke: color-mix(in srgb, var(--accent) 50%, transparent); stroke-dasharray: 3 5; }
.earth { stroke: var(--ink); stroke-width: 1.5; }
.surface .grid {
  stroke: color-mix(in srgb, var(--ink) 38%, transparent);
  stroke-width: 1;
}
.surface .land {
  fill: color-mix(in srgb, var(--accent) 32%, transparent);
  stroke: color-mix(in srgb, var(--accent) 60%, var(--ink));
}
.observer { fill: var(--accent); stroke: var(--paper-raised); stroke-width: 2; }
.pole { fill: var(--ink); }

.extra-arc {
  fill: none;
  stroke: var(--accent);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 1;
}

svg text { fill: var(--muted); }
.legend-rotation { stroke: var(--rule-dark); stroke-width: 2; stroke-dasharray: 4 4; }
.legend-extra { stroke: var(--accent); stroke-width: 6; stroke-linecap: round; }

.controls {
  display: grid;
  grid-template-columns: auto auto minmax(8rem, 1fr);
  align-items: center;
  gap: 0.55rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--rule);
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--ink);
  color: var(--paper-raised);
  background: var(--ink);
  font: 700 0.72rem "JetBrains Mono", monospace;
  cursor: pointer;
}

button.quiet { color: var(--ink); background: transparent; }
.controls label { margin-left: 0.4rem; }
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

@media (max-width: 620px) {
  .controls { grid-template-columns: auto 1fr; }
  .controls label { grid-column: 1 / -1; margin: 0.35rem 0 0; }
}
</style>
