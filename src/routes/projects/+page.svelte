<script lang="ts">
  import { Button, Card } from "spaper";
  import { projects } from "./projects";
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<h1>Projects</h1>
<h3>Side Projects i'm currently working on</h3>

<div class="container">
  {#each projects as project}
    <Card 
    title={project.title} 
    image={project.image}
    subTitle={project.subtitle}>
      <!-- <a slot="bottom" href={project.href}>more info</a> -->
    </Card>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
</style>
