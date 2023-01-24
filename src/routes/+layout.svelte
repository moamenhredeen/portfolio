<script>
  import "papercss/dist/paper.min.css";
  import "./styles.css";
  import { base } from "$app/paths";
  import { Navbar } from "spaper";
</script>

<svelte:head>
  <title>Moamen Hraden</title>
</svelte:head>

<div class="container">
  <!-- TODO: fixed navbar layout -->
  <Navbar>
    <h3 slot="brand">
      <a href="{base}/">Home</a>
    </h3>
    <ul class="inline">
      <li><a href="{base}/posts">Posts</a></li>
      <li><a href="{base}/projects">Projects</a></li>
      <li><a href="{base}/games">Games  </a></li>
      <li><a href="{base}/cv">CV</a></li>
      <li><a href="{base}/whoami">whoami</a></li>
    </ul>
  </Navbar>

  <main>
    <slot />
  </main>
</div>


<style>
  .container{
    padding: 1rem;
  }

</style>