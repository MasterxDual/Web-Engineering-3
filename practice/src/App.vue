
<template>
  <h1>Tienda FastClient</h1>
  <RegisterClient />
</template>

<script setup lang="ts">
  import RegisterClient from "./components/RegisterClient.vue";
</script>

<style scoped>
  h1 {
    text-align: center;
    color: #333;
    margin-top: 20px;
  }

  @media (max-width: 280px) {
    h1 {
      font-size: 0.8rem;
    }
  }
</style>
