<script setup>
import { reactive } from 'vue';
import { useSalesStore } from '@/stores/sales';
import { getFormattedDate } from '@/utils/formattedDate';

const salesStore = useSalesStore();
const salesObj = reactive({
  name: '',
  date: getFormattedDate(),
  numberOfCards: 1,
});

function salesSubmit() {
  salesStore.addSales({ ...salesObj });
  salesObj.name = '';
  salesObj.date = getFormattedDate();
  salesObj.numberOfCards = 1;
}
</script>

<template>
  <h4 class="mb-3">Add Sales</h4>
  <form>
    <div class="row">
      <div class="col-12 mb-3">
        <label for="name" class="mb-1">Name</label>
        <input 
          type="text" id="name" class="form-control"   
          v-model="salesObj.name" 
          required 
        />
      </div>
      <div class="col-6 mb-3">
        <label for="date" class="mb-1">Date</label>
        <input 
          type="date" id="date" class="form-control"  
          v-model="salesObj.date" 
          required
        />
      </div>
      <div class="col-6 mb-3">
        <label for="number-of-cards" class="mb-1">Number of cards</label>
        <input 
          type="number" id="number-of-cards" class="form-control" 
          v-model="salesObj.numberOfCards" 
          required 
        />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" @click.prevent="salesSubmit">Submit</button>
      </div>
    </div>
  </form>
</template>