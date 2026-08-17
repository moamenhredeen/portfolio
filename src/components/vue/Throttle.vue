<script setup lang="ts">
import { ref } from 'vue'
import { findCountryByName } from '@components/rest-countries.ts'

const value = ref('')
const output = ref('')

async function inputHandler(event: Event) {
  const target = event.target as HTMLInputElement
  const result = await findCountryByName(target.value)

  output.value = JSON.stringify(result)
  value.value = target.value
}
</script>

<template>
  <div class="flex flex-col items-center w-full p-4 gap-4">
    <input
      :value="value"
      class="w-full bg-zinc-100 p-4"
      type="text"
      placeholder="Search for a Country"
      @input="inputHandler"
    >
    <div class="w-full bg-white p-8 max-h-48 overflow-auto">
      {{ output }}
    </div>
  </div>
</template>
