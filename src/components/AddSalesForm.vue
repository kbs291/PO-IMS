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
  <h4 class="mb-3">Add Sales</h4>
  <form @submit.prevent="salesSubmit">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="name" class="mb-1">Name</label>
        <input 
          type="text" id="name" class="form-control"   
          v-model="salesObj.name" 
          required 
        />
      </div>
      <div class="col-md-3 mb-3">
        <label for="date" class="mb-1">Purchase Date</label>
        <input 
          type="date" id="date" class="form-control"  
          v-model="salesObj.purchaseDate" 
          required
        />
      </div>
      <div class="col-md-3 mb-3">
        <label for="number-of-cards" class="mb-1">Number of cards</label>
        <input 
          type="number" id="number-of-cards" class="form-control" 
          v-model="salesObj.numberOfCards" 
          required 
        />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>
</template>