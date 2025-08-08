<script setup>
import { useCardsStore } from '@/stores/cards';
import { inject, reactive } from 'vue';

const cardsStore = useCardsStore();
const dialogRef = inject('dialogRef');

const initialValues = reactive({
  quantity: 1,
  addedDate: new Date()
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.quantity) {
    errors.quantity = [{ message: 'Quantity is required.' }];
  }
  if (!values.addedDate) {
    errors.addedDate = [{ message: 'Added Date is required.' }];
  }

  return { values,  errors };
};

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    for (let index = 0; index < values.quantity; index++) {
      const cardObj = reactive({
        code: generateRandomAlphanumeric(10),
        availability: true,
        addedDate: values.addedDate,
        purchaseDate: ''
      });

      cardsStore.addCards({ ...cardObj });
    }

    dialogRef.value.close({
      status: 'success'
    });
  }
}

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
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <InputNumber name="quantity" inputId="quantity" mode="decimal" showButtons :min="1" :invalid="$form.quantity?.invalid" fluid />
          <label for="quantity">Number of Cards</label>
        </FloatLabel>
        <Message v-if="$form.quantity?.invalid" severity="error" size="small" variant="simple">{{ $form.quantity.error?.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <DatePicker name="addedDate" inputId="addedDate" iconDisplay="input" :invalid="$form.addedDate?.invalid" showIcon fluid />
          <label for="addedDate">Added Date</label>
        </FloatLabel>
        <Message v-if="$form.addedDate?.invalid" severity="error" size="small" variant="simple">{{ $form.addedDate.error?.message }}</Message>
      </div>
    </div>

    <div class="button-group">
      <Button type="submit" label="Submit" severity="success" />
    </div>
  </Form>
</template>