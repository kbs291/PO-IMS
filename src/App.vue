<script setup>
import { RouterView } from 'vue-router';
import Header from './components/layout/Header.vue';
</script>

<template>
  <Header></Header>
  <div class="container">
    <RouterView />
  </div>
</template>
