<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useDialog, useToast } from 'primevue';
import { FilterOperator, FilterMatchMode, FilterService } from '@primevue/core/api';
import { useCustomersStore } from '@/stores/customers';
import AddCustomersForm from '../AddCustomersForm.vue';

const props = defineProps({
  customers: {
    type: Array,
    required: true
  }
});
const customersStore = useCustomersStore();
const dialog = useDialog();
const toast = useToast();
const filters = ref([]);
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    addedDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: 'monthIs' }] },
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

    const addDate = new Date(value);
    const filterDate = new Date(filter);

    return addDate.getMonth() === filterDate.getMonth() && addDate.getFullYear() === filterDate.getFullYear();
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

  initFilters()
});

const clearFilter = () => {
    initFilters();
};

const sortedCustomers = computed(() => props.customers.sort((a, b) => b.addedDate - a.addedDate))

const showAddCustomerForm = (dialogType, values) => {
  dialog.open(AddCustomersForm, {
    props: {
      header: 'Add Customers',
      style: {
        width: '30vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true,
      position: 'top',
    },
    data: {
      mode: dialogType,
      customer: dialogType === 'edit' && values
    },
    onClose: (opt) => {
      const callbackParams = opt.data;

      if (callbackParams && callbackParams.status === 'success') {
        toast.add({
          severity: 'success',
          summary: callbackParams.mode === 'add' ? 'A customer has been added.' : 'A customer has been updated.',
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
    tableStyle="min-width: 50rem"
    v-model:filters="filters"
    filterDisplay="menu" 
    :value="sortedCustomers"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[5, 10, 15, 20]"
    :globalFilterFields="['fullName', 'contactNumber']"
    removableSort
    showGridlines
    stripedRows
  >
    <template #header>
      <div class="custom-table-header">
        <Button type="button" label="Add" icon="pi pi-plus" variant="outlined" @click="showAddCustomerForm('add')" />
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

    <Column field="id" header="ID"></Column>
    <Column field="fullName" header="Customer Name" sortable></Column>
    <Column field="contactNumber" header="Contact Number">
      <template #body="{ data }">
        {{ `0${data.contactNumber}` }}
      </template>
    </Column>
    <Column 
      header="Added Date"
      filterField="addedDate"
      dataType="date"
      :show-filter-match-modes="false"
    >
      <template #body="{ data }">
        {{ formatDate(data.addedDate) }}
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
    <Column>
      <template #body="{ data }">
        <Button icon="pi pi-pencil" outlined rounded @click="showAddCustomerForm('edit', data)" />
        <Button icon="pi pi-trash" severity="warn" outlined rounded style="margin-left: 0.5rem" @click="customersStore.deleteCustomer(data)" />
      </template>
    </Column>
  </DataTable>
</template>