<script setup>
import CardsTable from '@/components/table/CardsTable.vue';
import { reactive } from 'vue';

const cards = reactive([
  {
    id: 1,
    code: 'A72DJW5XQK',
    addedDate: new Date(),
    availability: true,
    purchaseDate: ''
  }
]);
</script>

<template>
  <div class="card">
    <div class="card-title">Cards</div>
    <div class="card-content">
      <CardsTable :cards />
    </div>
  </div>
</template>