<script setup>
import { computed, ref, onBeforeMount, watch, onMounted } from 'vue';
import { FilterOperator, FilterMatchMode, FilterService } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { useDialog } from 'primevue/usedialog';
import { formatAmount } from '@/utils/formatAmount';
import AddSalesForm from '@/components/AddSalesForm.vue';

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
});
const loading = ref(true);
const filters = ref(null);
const filteredData = ref([]);
const toast = useToast();
const dialog = useDialog();
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    purchaseDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: 'monthIs' }] },
  };
};

onBeforeMount(() => {
  FilterService.register('monthIs', (value, filter) => {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const saleDate = new Date(value);
    const filterDate = new Date(filter);

    return saleDate.getMonth() === filterDate.getMonth() && saleDate.getFullYear() === filterDate.getFullYear();
  });

  FilterService.register('dateIsBetween', (value, filter) => {
    if (filter === undefined || filter === null || !Array.isArray(filter) || filter.length !== 2 || filter[0] === null || filter[1] === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const rowDate = new Date(value);
    const startDate = new Date(filter[0]);
    const endDate = new Date(filter[1]);
    endDate.setHours(23, 59, 59, 999); // Make end date inclusive for the whole day

    return rowDate >= startDate && rowDate <= endDate;
  });

  initFilters();
});

onMounted(() => {
  loading.value = false;
});

// Watch for changes in the input 'sales' prop
watch(() => props.sales, (newSales) => {
  // When the base data changes, update our local copy.
  // If filters are active, DataTable will emit a 'value-change' event,
  // which will then update this ref with the filtered data.
  // This ensures the footer is correct on initial load and when props change.
  filteredData.value = newSales;
}, { immediate: true });

const onValueChange = (data) => (filteredData.value = data);

const clearFilter = () => {
    initFilters();
};

const sortedSales = computed(() => props.sales.sort((a, b) => b.addedDate - a.addedDate))

const totalSales = computed(() => {
  let total = 0;

  if (filteredData.value) {
    for (const sale of filteredData.value) {
      total += sale.totalAmount;
    }
  }

  return total.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
});

const showAddSalesForm = () => {
  dialog.open(AddSalesForm, {
    props: {
      header: 'Add PO Sale',
      style: {
          width: '30vw',
      },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      modal: true
    },
    onClose: (opt) => {
      const callbackParams = opt.data;

      if (callbackParams.status === 'success') {
        toast.add({
          severity: 'success',
          summary: 'A record has been added.',
          life: 3000
        });
      }
    }
  });
}

const formatDate = (value) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>

<template>
  <Toast />
  <DataTable 
    v-model:filters="filters"
    @value-change="onValueChange"
    filterDisplay="menu" 
    tableStyle="min-width: 50rem"
    paginator
    :rows="10" 
    :rowsPerPageOptions="[5, 10, 15, 20]"
    :value="sortedSales"
    showGridlines
    :globalFilterFields="['cardCode', 'name', 'totalAmount']"
    :loading="loading"
  >
    <template #header>
      <div class="custom-table-header">
        <Button type="button" label="Add" icon="pi pi-plus" variant="outlined" @click="showAddSalesForm" />
        <div class="global-filter-container">
          <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter" />
        </div>
      </div>
    </template>
    <template #empty>
      <div class="empty-data">No data found.</div>
    </template>
    <template #loading> 
      <div class="loading-data">Loading PO Sales data. Please wait.</div> 
    </template>

    <Column field="cardCode" header="Code" style="width: 15%"></Column>
    <Column field="name" header="Name" style="width: 30%"></Column>
    <Column field="numberOfCards" header="Quantity" style="width: 15%"></Column>
    <Column 
      header="Purchase Date" 
      filterField="purchaseDate"
      dataType="date" 
      :show-filter-match-modes="false"
    >
      <template #body="{ data }">
        {{ formatDate(data.purchaseDate) }}
      </template>
      <template #filter="{ filterModel }">
        <div class="custom-date-filter">
          <SelectButton
            :model-value="filterModel.matchMode"
            @update:model-value="(value) => { filterModel.matchMode = value; filterModel.value = null; }"
            :options="[
              { label: 'Month', value: 'monthIs' },
              { label: 'Range', value: 'dateIsBetween' }
            ]"
            optionLabel="label"
            optionValue="value"
            aria-labelledby="date-filter-type"
            fluid
          />
          <DatePicker
            v-if="filterModel.matchMode === 'monthIs'"
            v-model="filterModel.value"
            view="month"
            dateFormat="mm/yy"
            placeholder="Select a month"
          />
          <DatePicker
            v-if="filterModel.matchMode === 'dateIsBetween'"
            v-model="filterModel.value"
            selectionMode="range"
            dateFormat="mm/dd/yy"
            placeholder="Select a date range"
          />
        </div>
      </template>
    </Column>
    <Column field="totalAmount" header="Amount" style="width: 25%;">
      <template #body="{ data }">
        {{ formatAmount(data.totalAmount) }}
      </template>
    </Column>
    
    <ColumnGroup type="footer" v-if="filteredData && filteredData.length > 0">
      <Row>
        <Column footer="Total:" :colspan="4" footerStyle="text-align: right"></Column>
        <Column :footer="totalSales" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>