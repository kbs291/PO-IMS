<script setup>
import { defineProps } from 'vue';

defineProps({
  salesList: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Date</th>
        <th scope="col">Number of Cards</th>
        <th scope="col">Due Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sale in salesList">
        <td>{{ sale.name }}</td>
        <td>{{ sale.date }}</td>
        <td>{{ sale.numberOfCards }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>