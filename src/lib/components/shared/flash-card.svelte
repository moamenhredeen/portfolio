<script lang="ts">
  import Icon from "../icon/Icon.svelte";
  import { createEventDispatcher } from "svelte";

  export let id: number;
  export let visible: boolean;
  export let disabled: boolean;
  const dispatch = createEventDispatcher<{flip: {id: number, visible: boolean}}>();

  function toggle() {
    if(!disabled){
        visible = !visible;
        dispatch("flip", {
          id,
          visible
        });
    }
  }
</script>

<div
  class="flip-box"
  on:click={toggle}
  on:keydown={toggle}
  class:flip-it={visible}
>
  <div class="flip-box-front">
    <Icon name="{disabled ? 'disabled-joker': 'joker'}" width="4rem" height="4rem" />
  </div>
  <div class="flip-box-back">
    <slot />
  </div>
</div>

<style lang="scss">
  .flip-box {
    height: 6rem;
    width: 6rem;
    cursor: pointer;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    transition: transform 0.4s;
    transform-style: preserve-3d;
    position: relative;
  }

  .flip-box-front,
  .flip-box-back {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border: 2px solid var(--primary);
    &:hover {
      border: 2px solid var(--secondary);
    }
  }

  .flip-box-back {
    transform: rotateY(180deg);
  }

  .flip-it {
    transform: rotateY(180deg);
  }

</style>
