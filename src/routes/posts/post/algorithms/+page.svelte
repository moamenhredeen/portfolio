<script>
  import {Carousel, CarouselItem} from "spaper";
</script>

<svelte:head>
  <title>Algorithms</title>
</svelte:head>

<div class="post">
  <Carousel --min-height="300px">
    <CarouselItem>
      <img src="https://picsum.photos/id/10/600/300">
    </CarouselItem>
    <CarouselItem>
      <img src="https://picsum.photos/id/22/600/300">
    </CarouselItem>
    <CarouselItem>
      <img src="https://picsum.photos/id/25/600/300">
    </CarouselItem>
    <CarouselItem>
      <img src="https://picsum.photos/id/43/600/300">
    </CarouselItem>
    <CarouselItem>
      <img src="https://picsum.photos/id/45/600/300">
    </CarouselItem>
  </Carousel>
</div>

<style>
  .post{
      display: flex;
      justify-content: center;
  }
</style>
