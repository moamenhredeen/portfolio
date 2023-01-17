<script>
  import { Card, Button } from "spaper";
</script>

<svelte:head>
  <title>Posts</title>
</svelte:head>

<div class="posts">
  <Card class="posts__card"
        title="My awesome Paper card!"
        image="https://picsum.photos/768">
    Card Content
    <a href="/posts/post/algorithms">read more</a>
  </Card>
</div>

<style>
    .posts {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .posts__card {
    }

</style>

