<script setup>
defineProps({
  cards: {
    type: Array,
    required: true
  }
});

const formatDate = (value) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>

<template>
  <DataTable 
    tableStyle="min-width: 50rem"
    :value="cards" 
    :paginator="true" 
    :rows="10" 
    :rowsPerPageOptions="[5, 10, 15, 20]"
    showGridlines
    stripedRows
  >
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