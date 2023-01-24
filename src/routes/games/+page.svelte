<script>
  import MemoryGame from "$lib/components/games/memory-game.svelte";
  import SnakeGame from "$lib/components/games/snake-game.svelte";
  import { Tab, Tabs } from "spaper";
</script>

<Tabs placement="center">
  <Tab label="Snake">
    <SnakeGame />
  </Tab>
  <Tab label="Memory">
    <MemoryGame />
  </Tab>
</Tabs>

<style>
</style>
