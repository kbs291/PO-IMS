<script setup>
import { useDialog } from 'primevue';
import { useToast } from 'primevue';
import AddCardsForm from '../AddCardsForm.vue';

defineProps({
  cards: {
    type: Array,
    required: true
  }
});
const dialog = useDialog();
const toast = useToast();

const showAddCardsForm = () => {
  dialog.open(AddCardsForm, {
    props: {
      header: 'Add PO Cards',
      style: {
        width: '30vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true,
      position: 'top'
    },
    onClose: (opt) => {
      const callbackParams = opt.data;

      if (callbackParams && callbackParams.status === 'success') {
        toast.add({
          severity: 'success',
          summary: 'A record has been added.',
          life: 3000
        });
      }
    }
  })
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
    :value="cards" 
    :paginator="true" 
    :rows="10" 
    :rowsPerPageOptions="[5, 10, 15, 20]"
    showGridlines
    stripedRows
  >
    <template #header>
      <div class="custom-table-header">
        <Button type="button" label="Add" icon="pi pi-plus" variant="outlined" @click="showAddCardsForm" />
      </div>
    </template>
    <template #empty>
      <div class="empty-data">No data found.</div>
    </template>
    
    <Column field="code" header="Code"></Column>
    <Column field="addedDate" header="Added Date">
      <template #body="{ data }">
        {{ formatDate(data.addedDate) }}
      </template>
    </Column>
    <Column field="status" header="Status">
      <template #body="{ data }">
        <Tag :value="data.status" :severity="data.availability ? 'success' : 'warn'">
          {{ data.availability ? 'Available' : 'Unavailable' }}
        </Tag>
      </template>
    </Column>
    <Column field="purchaseDate" header="Purchase Date">
      <template #body="{ data }">
        {{ data.purchaseDate && formatDate(data.purchaseDate) }}
      </template>
    </Column>
  </DataTable>
</template>