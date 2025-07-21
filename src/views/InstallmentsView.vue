<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { formatDate } from '@/utils/formatDate';
import { useInstallmentsStore } from '@/stores/installments';
import { useSalesStore } from '@/stores/sales';
import { storeToRefs } from 'pinia';
import InstallmentsTable from '@/components/InstallmentsTable.vue';

const installmentsStore = useInstallmentsStore();
const salesStore = useSalesStore();
const { installments } = storeToRefs(installmentsStore);
const tab = ref('all');
const datePicker = ref(formatDate(new Date()));

onMounted(async () => { 
  /** 
   * Notes:
   * - Temporarily added fetchSales() to address empty table on page refresh
   * - Will remove this function once backend is ready
   */
  await salesStore.fetchSales();
  await installmentsStore.fetchInstallments();
});

const installmentsArray = computed(() => {
  let sortedInstallments = reactive([]);
  
  if (tab.value === 'all') {
    const newArray = Map.groupBy(installments.value, installment => installment.saleId);
    const keyIndex = [ 'first', 'second', 'third', 'fourth' ];
    
    newArray.forEach((arr) => {
      arr.sort((a, b) => { return new Date(a.dueDate) - new Date(b.dueDate) })
    });

    newArray.forEach((value, key) => {
      let installmentObj = reactive({});
      let totalAmount = 0;
      const id = key;

      const dueDate = reactive({});
      const status = reactive({});
      const amountDue = reactive({});
      const paymentDate = reactive({});
      const installmentId = reactive({});
    
      value.forEach((element, index) => {
        dueDate[keyIndex[index]] = element.dueDate;
        status[keyIndex[index]] = element.status;
        amountDue[keyIndex[index]] = element.amountDue;
        paymentDate[keyIndex[index]] = element.paymentDate;
        installmentId[keyIndex[index]] = element.id;
        installmentObj = { ...element };
        totalAmount += element.amountDue;
      });
      
      sortedInstallments.push({ ...installmentObj, id, dueDate, status, amountDue, paymentDate, installmentId, totalAmount });
    });
  } else{
    const selectedDate = tab.value === 'upcoming' ? new Date() : new Date(datePicker.value);
    const date = reactive({
      month: selectedDate.getMonth(),
      day: selectedDate.getDate(),
      year: selectedDate.getFullYear()
    });
    const firstDue = new Date(date.year, date.month, 15);
    const secondDue = new Date(date.year, date.month + 1, 0);

    if (selectedDate.getDate() <= firstDue.getDate()) {
      sortedInstallments = installments.value.filter((installment) => {
        return installment.dueDate.toISOString() === firstDue.toISOString();
      });
    } else {
      sortedInstallments = installments.value.filter((installment) => {
        return installment.dueDate.toISOString() === secondDue.toISOString();
      });
    }
  }
  
  return sortedInstallments;
});
</script>

<template>
  <div>
    <h4>Installments</h4>
    <div class="btn-group">
      <button type="button" :class="{ 'active': tab === 'all' }" @click="tab = 'all'">All</button>
      <button type="button" :class="{ 'active': tab === 'upcoming' }" @click="tab = 'upcoming'">Upcoming</button>
      <button type="button" :class="{ 'active': tab === 'due date' }" @click="tab = 'due date'">By Due Date</button>
    </div>
  </div>

  <div v-if="tab === 'due date'">
    <input type="date" v-model="datePicker">
  </div>
  <InstallmentsTable :installments="installmentsArray" :tab="tab" />
</template>

<style scoped>
.btn-group button {
  color: var(--bs-secondary);
  background: none;
  &.active {
    color: rgba(0, 0, 0, 1);
  }
}
</style>