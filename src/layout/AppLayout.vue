<script setup>
import { RouterView } from 'vue-router';
import AppTopbar from './AppTopbar.vue';
</script>

<template>
  <div class="layout-wrapper">
    <AppTopbar></AppTopbar>
    <div>
      <RouterView />
    </div>
  </div>
</template>
