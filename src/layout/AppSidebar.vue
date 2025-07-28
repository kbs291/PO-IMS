<script setup>
import Menu from 'primevue/menu'
import { computed } from 'vue'

const items = computed(() => [
  { 
    label: 'Home', 
    items: [
      { 
        label: 'Dashboard', 
        icon: 'pi pi-fw pi-home', 
        to: { name: 'dashboard' }
      } 
    ]
  },
  {
    label: 'Transactions',
    items: [
      { 
        label: 'PO Sales', 
        icon: 'pi pi-fw pi-chart-line', 
        to: { name: 'posales' }
      },
      { 
        label: 'Installments', 
        icon: 'pi pi-fw pi-calendar-clock', 
        to: { name: 'installments' }
      }
    ]
  }
])
</script>

<template>
  <div class="layout-sidebar">
    <Menu :model="items">
      <template #submenulabel="{ item }">
        <span>{{ item.label }}</span>
      </template>

      <template #item="{ item, props }">
        <router-link v-if="item.to" v-slot="{ href, navigate, isExactActive }" :to="item.to" custom>
          <a :href="href" v-bind="props.action" @click="navigate" :class="{ 'active-route': isExactActive }">
            <span :class="item.icon"></span>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </div>
</template>
