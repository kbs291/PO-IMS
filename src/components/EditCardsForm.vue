<script setup>
import { inject, onBeforeMount, reactive } from 'vue';
import { useCardsStore } from '@/stores/cards';

const dialogRef = inject('dialogRef');
const cardsStore = useCardsStore();
const initialValues = reactive({
  id: null,
  code: '',
  availability: '',
  status: '',
  addedDate: null,
  purchaseDate: null
});

onBeforeMount(() => {
  const { card } = dialogRef.value.data;
  Object.assign(initialValues, card);
  initialValues.status = initialValues.availability ? 'Available' : 'Unavailable';
})

const resolver = ({ values }) => {
  const errors = {};

  if (!values.code) {
    errors.code = [{ message: 'Code is required.' }]
  }

  return { values, errors };
};

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    cardsStore.updateCard(values);
    dialogRef.value.close({
      status: 'success'
    });
  }
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
    <InputText name="id" hidden />
    <InputText name="availability" hidden />
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <InputText name="code" type="text" id="code" :invalid="$form.code?.invalid" fluid />
          <label for="code">Code</label>
        </FloatLabel>
        <Message v-if="$form.code?.invalid" severity="error" size="small" variant="simple">{{ $form.code.error?.message }}</Message>
      </div>
    </div>
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <InputText name="status" type="text" id="status" :invalid="$form.status?.invalid" disabled fluid />
          <label for="status">Status</label>
        </FloatLabel>
        <Message v-if="$form.status?.invalid" severity="error" size="small" variant="simple">{{ $form.status.error?.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <DatePicker name="addedDate" inputId="addedDate" iconDisplay="input" :invalid="$form.addedDate?.invalid" showIcon disabled fluid />
          <label for="addedDate">Added Date</label>
        </FloatLabel>
        <Message v-if="$form.addedDate?.invalid" severity="error" size="small" variant="simple">{{ $form.addedDate.error?.message }}</Message>
      </div>
    </div>

    <div class="button-group">
      <Button type="submit" label="Update" severity="info" />
    </div>
  </Form>
</template>