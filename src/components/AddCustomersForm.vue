<script setup>
import { useCustomersStore } from '@/stores/customers'
import { inject, onBeforeMount, onMounted, reactive, ref } from 'vue';

const customersStore = useCustomersStore();
const dialogRef = inject('dialogRef');

let mode = ref('');
const initialValues = reactive({
  firstName: '',
  lastName: '',
  contactNumber: null,
  addedDate: ''
});

onBeforeMount(() => {
  const params = dialogRef.value.data;
  mode.value = params.mode
 
  if (mode.value === 'edit') {
    Object.assign(initialValues, { ...params.customer });
  } else {
    initialValues.addedDate = new Date()
  }
})

const resolver = ({ values }) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = [{ message: 'First Name is required.' }]
  }
  if (!values.lastName) {
    errors.lastName = [{ message: 'Last Name is required.' }];
  }
  if (values.contactNumber == null) {
    errors.contactNumber = [{ message: 'Contact Number is required.' }];
  } else if (String(values.contactNumber).length < 10) {
    errors.contactNumber = [{ message: 'Contact number must be at least 11 digits.' }];
  }
  if (!values.addedDate) {
    errors.addedDate = [{ message: 'Added Date is required.' }];
  }

  return { values, errors };
};

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    if (mode.value === 'edit') {
      customersStore.editCustomer({ ...values });
    } else {
      customersStore.addCustomer({ ...values });
    }
  
    dialogRef.value.close({
      status: 'success',
      mode: mode.value
    });
  }
};
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
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <InputText name="firstName" type="text" id="firstName" :invalid="$form.firstName?.invalid" fluid />
          <label for="firstName">First Name</label>
        </FloatLabel>
        <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error?.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <InputText name="lastName" type="text" id="lastName" :invalid="$form.lastName?.invalid" fluid />
          <label for="lastName">Last Name</label>
        </FloatLabel>
        <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error?.message }}</Message>
      </div>
    </div>
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <InputNumber name="contactNumber" inputId="contactNumber" :useGrouping="false" :maxFractionDigits="0" :invalid="$form.contactNumber?.invalid" fluid />
          <label for="contactNumber">Contact Number</label>
        </FloatLabel>
        <Message v-if="$form.contactNumber?.invalid" severity="error" size="small" variant="simple">{{ $form.contactNumber.error?.message }}</Message>
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