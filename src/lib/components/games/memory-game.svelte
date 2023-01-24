<script lang="ts">
  import { Button } from "spaper";
  import FlashCard from "../shared/flash-card.svelte";

  // a b c d  e f g h

  let rects = [
    { id:  1, content: "a", visible: false, disabled: false },
    { id:  2, content: "d", visible: false, disabled: false },
    { id:  3, content: "e", visible: false, disabled: false },
    { id:  4, content: "c", visible: false, disabled: false },
    { id:  5, content: "b", visible: false, disabled: false },
    { id:  6, content: "g", visible: false, disabled: false },
    { id:  7, content: "f", visible: false, disabled: false },
    { id:  8, content: "h", visible: false, disabled: false },

    { id:  9, content: "d", visible: false, disabled: false },
    { id: 10, content: "c", visible: false, disabled: false },
    { id: 11, content: "e", visible: false, disabled: false },
    { id: 12, content: "g", visible: false, disabled: false },
    { id: 13, content: "h", visible: false, disabled: false },
    { id: 14, content: "f", visible: false, disabled: false },
    { id: 15, content: "a", visible: false, disabled: false },
    { id: 16, content: "b", visible: false, disabled: false },
  ];

  let currentPair: number[] = [];

  function resetHandler(items: number[] = []) {
    rects = rects.map((el) => {
      if (items.length === 0 || (items.length > 0 && items.includes(el.id))) {
        return { ...el, visible: false };
      } else {
        return el;
      }
    });
    currentPair = [];
  }

  function flipHandler(event: CustomEvent<{ id: number; visible: boolean }>) {
    // only react to open card events
    if (!event.detail.visible) {
      return;
    }

    // add opened card to currentPair
    currentPair.push(event.detail.id);

    // do nothing if the only one item was opened
    if (currentPair.length < 2) {
      return;
    }

    // close card and reset if the same card was opened
    if (currentPair[0] === currentPair[1]) {
      resetHandler([currentPair[0]]);
      return;
    }

    // close and reset if the current pair are not equal
    const opendPair = rects.filter((el) => currentPair.includes(el.id));
    if (opendPair[0].content !== opendPair[1].content) {
      setTimeout(() => {
        resetHandler(currentPair)
      }, 1000);
    }else{
        currentPair = []
    }
  }
</script>

<div class="memory-game">
  <div class="settings">
    <Button type="danger" on:click={() => resetHandler()}>reset</Button>
  </div>
  <div class="board">
    {#each rects as { id, content, disabled, visible } (id)}
      <FlashCard {id} {disabled} bind:visible on:flip={flipHandler}>
        {content}
      </FlashCard>
    {/each}
  </div>
</div>

<style lang="scss">
  .memory-game {
    display: flex;
    justify-content: space-between;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
  }
</style>
