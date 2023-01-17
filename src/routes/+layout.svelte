<script>
  import "papercss/dist/paper.min.css";
  import "./styles.css";

  import { Navbar, Button } from "spaper";
</script>

<svelte:head>
  <title>Moamen Hraden</title>
</svelte:head>

<div class="container">
  <Navbar border={false}>
    <h3 slot="brand">
      <a href="/">Home</a>
    </h3>
    <ul class="inline">
      <li><a href="/posts">Posts</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/whoami">whoami</a></li>
    </ul>
  </Navbar>

  <main>
    <slot />
  </main>

  <footer>
  </footer>
</div>


<style>
  /**{*/
  /*    background: rgba(0, 0, 0, 0.1);*/
  /*    outline: 1px solid lightgreen;*/
  /*}*/
</style>