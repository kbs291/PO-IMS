<script setup>
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
</script>

<template>
  <div class="layout-wrapper">
    <AppTopbar></AppTopbar>
    <AppSidebar></AppSidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
    </div>
  </div>
</template>
