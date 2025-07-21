<script setup>
import { reactive } from 'vue';
import { useSalesStore } from '@/stores/sales';
import { formatDate } from '@/utils/formatDate';

const salesStore = useSalesStore();
const salesObj = reactive({
  name: '',
  purchaseDate: formatDate(),
  numberOfCards: 1,
});

function salesSubmit() {
  salesStore.addSales({ ...salesObj });
  salesObj.name = '';
  salesObj.purchaseDate = formatDate();
  salesObj.numberOfCards = 1;
}
</script>

<template>
  <h4>Add PO Card Sales</h4>
  <form @submit.prevent="salesSubmit">
    <div>
      <div>
        <label for="name">Name</label>
        <input 
          type="text" id="name"   
          v-model="salesObj.name" 
          required 
        />
      </div>
      <div>
        <label for="date">Purchase Date</label>
        <input 
          type="date" id="date"  
          v-model="salesObj.purchaseDate" 
          required
        />
      </div>
      <div>
        <label for="number-of-cards">Number of cards</label>
        <input 
          type="number" id="number-of-cards" 
          v-model="salesObj.numberOfCards" 
          required 
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </div>
  </form>
</template>