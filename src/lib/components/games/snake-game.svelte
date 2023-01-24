<script lang="ts">
  import { Button, Form, Slider } from "spaper";
  import Icon from "../icon/Icon.svelte";

  // 0: empty
  // 1: apple
  //-1: pomp
  let matrix = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  // snake head position
  let current = 0;
  let snake: number[] = [];
  let started = false;
  let interval: number = 500;
  let intervalIds: NodeJS.Timer[] = [];
  let direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | string =
    "ArrowRight";

  function keyHandler(event: KeyboardEvent) {
    direction = event.code;
    move();
  }

  function move() {
    switch (direction) {
      case "ArrowUp":
        current -= 12;
        if (current < 0) {
          current = matrix.length + current;
        }
        break;
      case "ArrowDown":
        current += 12;
        if (current > matrix.length) {
          current = current - matrix.length;
        }
        break;
      case "ArrowLeft":
        current--;
        if (current < 0) {
          current = matrix.length;
        }
        break;
      case "ArrowRight":
        current++;
        if (current > matrix.length) {
          current = 0;
        }
        break;
      default:
        break;
    }

    if(matrix[current] === 1){
        snake = [...snake, current]
    }else if(matrix[current] === -1){
        snake = [current]
    }else {
        snake = [...snake.slice(1), current]
    }

    matrix[current] = 0
  }

  function generate(type: 'apple'| 'pomp'){
    const random = Math.floor(Math.random() * (matrix.length - 1))
    if(random > (matrix.length - 1) * 3 / 4){
        matrix[random] = -1;
    }else {
        matrix[random] = 1
    }
  }

  function start() {
    current = 0;
    snake = [current];
    started = true;
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = []
    intervalIds.push(setInterval(() => {
      move();
    }, interval));

    intervalIds.push(setInterval(() => {
        generate('apple')
    }, interval * 4))
  }

  function stop() {
    current = 0;
    snake = [];
    started = false;
    intervalIds.forEach(id => clearInterval(id))
  }
</script>

<svelte:window on:keydown={keyHandler} />
<div class="snake-game">
  <div class="settings">
    <Form>
      <div class="form-group">
        <Button on:click={start}>start</Button>
        <Button type="danger" on:click={stop}>stop</Button>
      </div>
      <div class="form-group">
        <Slider
          label="Interval"
          block
          step={50}
          bind:value={interval}
          min={100}
          max={1000}
          disabled={started}
          background={started ? "primary" : "secondary"}
        />
      </div>
    </Form>
  </div>
  <div class="board">
    {#each matrix as cell, index (index)}
      <div class="cell" class:tail={snake.includes(index)} class:head={current === index}>
        {#if matrix[index] === 1}
          <Icon name="apple" />
        {:else if matrix[index] === -1}
          <Icon name="pomp" />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .snake-game {
    display: flex;
    justify-content: space-around;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    gap: 0.1rem;

    .cell {
      background-color: lightgray;
      height: 2rem;
      width: 2rem;
      &:hover {
        background-color: yellow;
      }

      &.tail {
        background-color: salmon;
      }

      &.head {
        background-color: yellowgreen;
      }
    }
  }
</style>
