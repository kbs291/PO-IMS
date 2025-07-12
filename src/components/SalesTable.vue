<script setup>
import { defineProps } from 'vue';

defineProps({
  sales: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <h4 class="mb-3">Sales</h4>
  
  <section v-if="sales.length > 0">
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Number of Cards</th>
          <th scope="col">Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sale, index) in sales" :key="index">
          <td scope="row">{{ index + 1 }}</td>
          <td>{{ sale.name }}</td>
          <td>{{ sale.date }}</td>
          <td>{{ sale.numberOfCards }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-else>
    <div class="p-5 text-center border rounded empty">No Data</div>
  </section>
</template>

<style scoped>
.empty {
  border-style: dashed !important;
  font-size: 14px;
}
</style>