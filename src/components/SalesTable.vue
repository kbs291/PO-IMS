<script setup>
import { defineProps, ref } from 'vue';
import { formatDate } from '@/utils/formatDate';
import { formatAmount } from '@/utils/formatAmount';
import { calculateTotal } from '@/utils/calculateTotal';

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
});
const month = ref(formatDate(new Date(), 'm-y'));
const salesData = props.sales;


const filterSales = () => {
  console.log(month.value);
  salesData.pop()
}

</script>

<template>
  <div class="d-flex align-items-center justify-content-between">
    <h4 class="m-0">PO Card Sales</h4>
    <nav>
      <div class="nav nav-tabs justify-content-end border-0" id="nav-tab" role="tablist">
        <button class="nav-link border-0 active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">All</button>
        <button class="nav-link border-0" id="nav-due-dates-tab" data-bs-toggle="tab" data-bs-target="#nav-due-dates" type="button" role="tab" aria-controls="nav-due-dates" aria-selected="false">By Month</button>
      </div>
    </nav>
  </div>

  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabindex="0">
      <div class="table-responsive" v-if="sales.length > 0">
        <table class="table table-hover align-middle mt-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Purchase Date</th>
              <th scope="col">Number of Cards</th>
              <th scope="col" class="text-end">Total Amount</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="sale in salesData" :key="sale.id">
              <td>{{ sale.id }}</td>
              <td>{{ sale.name }}</td>
              <td>{{ formatDate(sale.purchaseDate) }}</td>
              <td>{{ sale.numberOfCards }}</td>
              <td class="text-end">{{ formatAmount(sale.totalAmount) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">&nbsp;</td>
              <td class="text-end">{{ formatAmount(calculateTotal(sales, 'totalAmount')) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="p-5 text-center border rounded empty" v-else>No Data</div>
    </div>

    <div class="tab-pane fade" id="nav-due-dates" role="tabpanel" aria-labelledby="nav-due-dates-tab" tabindex="0">
      <div class="d-flex justify-content-end mt-3">
        <input type="month" v-model="month" @change="filterSales(month)">
      </div>

      <div class="table-responsive" v-if="sales.length > 0">
        <table class="table table-hover align-middle mt-2">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Purchase Date</th>
              <th scope="col">Number of Cards</th>
              <th scope="col" class="text-end">Total Amount</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="sale in salesData" :key="sale.id">
              <td>{{ sale.id }}</td>
              <td>{{ sale.name }}</td>
              <td>{{ formatDate(sale.purchaseDate) }}</td>
              <td>{{ sale.numberOfCards }}</td>
              <td class="text-end">{{ formatAmount(sale.totalAmount) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">&nbsp;</td>
              <td class="text-end">{{ formatAmount(calculateTotal(sales, 'totalAmount')) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="p-5 text-center border rounded empty" v-else>No Data</div>
    </div>
  </div>
</template>