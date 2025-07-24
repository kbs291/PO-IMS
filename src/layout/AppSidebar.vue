<script setup>
import Menu from 'primevue/menu';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const items = reactive([
  { 
    label: 'Home', 
    items: [
      { 
        label: 'Dashboard', 
        icon: 'pi pi-fw pi-home', 
        route: 'dashboard' 
      } 
    ]
  },
  {
    label: 'Transactions',
    items: [
      { 
        label: 'Sales', 
        icon: 'pi pi-fw pi-chart-line', 
        route: 'posales' 
      },
      { 
        label: 'Installments', 
        icon: 'pi pi-fw pi-calendar-clock', 
        route: 'installments' 
      }
    ]
  }
]);
</script>

<template>
  <div class="layout-sidebar">
    <Menu :model="items">
      <template #submenulabel="{ item }">
        <span>{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="{ name: item.route }" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>