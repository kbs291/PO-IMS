<script setup>
import { inject, onBeforeMount, reactive, ref } from 'vue';
import { useSalesStore } from '@/stores/sales';

const salesStore = useSalesStore();
const dialogRef = inject('dialogRef');

const mode = ref('add');
const initialValues = reactive({
  name: '',
  purchaseDate: new Date(),
  numberOfCards: 1
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.name) {
    errors.name = [{ message: 'Name is required.' }];
  }
  if (!values.purchaseDate) {
    errors.purchaseDate = [{ message: 'Purchase Date is required.' }];
  }
  if (!values.purchaseDate) {
    errors.numberOfCards = [{ message: 'Number of Cards is required.' }];
  }

  return { values, errors };
};

onBeforeMount(() => {
  const { sales, transactionType } = dialogRef.value.data;
  if (transactionType === 'edit') {
    Object.assign(initialValues, sales);
    mode.value = transactionType
  }
})

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    if (mode.value === 'add') {
      const salesObj = {
        cardCode: generateRandomAlphanumeric(10),
        name: values.name,
        purchaseDate: values.purchaseDate,
        numberOfCards: values.numberOfCards,
        addedDate: new Date()
      };

      salesStore.addSales({ ...salesObj });
    } else {
      salesStore.updateSales(values);
    }
    
    dialogRef.value.close({
      status: 'success'
    });
  }
};

const generateRandomAlphanumeric = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
</script>

<template>
  <Form 
    v-slot="$form" 
    :initialValues 
    :resolver 
    @submit="onFormSubmit" 
    class="form"
  >
    <InputText name="id" hidden v-if="initialValues.id" />
    <div>
      <FloatLabel variant="on">
        <InputText name="name" type="text" id="name" :invalid="$form.name?.invalid" fluid />
        <label for="name">Name</label>
      </FloatLabel>
      <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
    </div>
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <DatePicker name="purchaseDate" inputId="purchaseDate" iconDisplay="input" :invalid="$form.purchaseDate?.invalid" showIcon fluid :disabled="mode === 'edit'" />
          <label for="purchaseDate">Purchase Date</label>
        </FloatLabel>
        <Message v-if="$form.purchaseDate?.invalid" severity="error" size="small" variant="simple">{{ $form.purchaseDate.error?.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <InputNumber name="numberOfCards" inputId="numberOfCards" mode="decimal" showButtons :min="1" :invalid="$form.numberOfCards?.invalid" fluid />
          <label for="numberOfCards">Number of Cards</label>
        </FloatLabel>
        <Message v-if="$form.numberOfCards?.invalid" severity="error" size="small" variant="simple">{{ $form.numberOfCards.error?.message }}</Message>
      </div>
    </div>
    
    <div class="button-group">
      <Button type="submit" :label="mode === 'edit' ? 'Update' : 'Submit'" :severity="mode === 'edit' ? 'info' : 'success'" />
    </div>
  </Form>
</template>