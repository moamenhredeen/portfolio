<script setup>
import {RouterView} from "vue-router";
</script>

<template>
  <header>
    <h1>YU</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView></RouterView>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  border-bottom: var(--border);

  h1{
    padding: 0 2rem;
  }

  nav{
    display: flex;
    a {
      color: black;
      height: 100%;
      padding: 0 2rem;
      text-decoration: none;
      align-content: center;
      border-left: var(--border);
      &:hover{
        background-color: var(--primary-container);
      }
    }
  }
}
</style>