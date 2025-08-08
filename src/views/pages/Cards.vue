<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/cards';
import CardsTable from '@/components/table/CardsTable.vue';

const cardsStore = useCardsStore();
const { cards } = storeToRefs(cardsStore);

onMounted(async () => await cardsStore.fetchCards());
</script>

<template>
  <div class="card">
    <div class="card-title">Cards</div>
    <div class="card-content">
      <CardsTable :cards />
    </div>
  </div>
</template>