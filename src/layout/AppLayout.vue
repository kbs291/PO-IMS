<script setup>
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="layout-wrapper">
    <AppTopbar></AppTopbar>
    <AppSidebar></AppSidebar>
    <div>
      <RouterView />
    </div>
  </div>
</template>
