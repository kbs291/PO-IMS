<script setup></script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover align-middle mt-4">
      <thead>
        <tr>
          <th scope="col">Sale ID</th>
          <th scope="col">Name</th>
          <th scope="col">Purchase Date</th>
          <th scope="col">Number of Cards</th>
          <th scope="col" class="text-end">Amount Due</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Payment Date</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <!-- <tr v-for="(sale, index) in sales" :key="index">
          <td>{{ sale.name }}</td>
          <td>
            <span class="d-inline-block border rounded-pill p-2 px-3">{{ formatDate(sale.purchaseDate) }}</span>
          </td>
          <td>{{ sale.numberOfCards }}</td>
          <td>
            <span class="d-inline-block border rounded-pill p-2 px-3">{{ formatDate(sale.firstDueDate) }}</span>
          </td>
          <td class="text-end">{{ formatAmount(sale.totalAmount) }}</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>