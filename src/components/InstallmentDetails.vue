<script setup>
import { inject, onBeforeMount, reactive } from 'vue';
import { useInstallmentsStore } from '@/stores/installments';
import { formatAmount } from '@/utils/formatAmount';

const installmentsStore = useInstallmentsStore();

const dialogRef = inject('dialogRef');
const installment = reactive({});

onBeforeMount(() => {
  Object.assign(installment, dialogRef.value.data.installment);
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = [{ message: 'Name is required.' }];
  }
  if (!values.cardCode) {
    errors.cardCode = [{ message: 'Card Code is required.' }];
  }
  if (values.numberOfCards === null || values.numberOfCards === undefined) {
    errors.numberOfCards = [{ message: 'Number of Cards is required.' }];
  } else if (values.numberOfCards < 1) {
    errors.numberOfCards = [{ message: 'Number of Cards must be at least 1.' }];
  }
  if (!values.purchaseDate) {
    errors.purchaseDate = [{ message: 'Purchase Date is required.' }];
  }
  if (values.totalAmount === null || values.totalAmount === undefined) {
    errors.totalAmount = [{ message: 'Total Amount is required.' }];
  }
  else if (values.totalAmount <= 0) {
    errors.totalAmount = [{ message: 'Total Amount must be greater than 0.' }];
  }

  return {
    values,
    errors
  };
};

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    installmentsStore.updateInstallmentStatus(values.id);
    dialogRef.value.close({ status: 'success', data: values });
  }
};

const onCancel = () => {
  dialogRef.value.close();
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
  <Form v-slot="$form" :initial-values="installment" :resolver="resolver" @submit="onFormSubmit" class="form">
    <InputText name="id" hidden />
    <div>
      <FloatLabel variant="on">
        <InputText id="name" name="name" :invalid="$form.name?.invalid" disabled fluid />
        <label for="name">Name</label>
      </FloatLabel>
      <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
    </div>
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <InputText id="cardCode" name="cardCode" :invalid="$form.cardCode?.invalid" disabled fluid />
          <label for="cardCode">Card Code</label>
        </FloatLabel>
        <Message v-if="$form.cardCode?.invalid" severity="error" size="small" variant="simple">{{ $form.cardCode.error?.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <InputNumber inputId="numberOfCards" name="numberOfCards" :invalid="$form.numberOfCards?.invalid" :min="1" showButtons disabled fluid />
          <label for="numberOfCards">Number of Cards</label>
        </FloatLabel>
        <Message v-if="$form.numberOfCards?.invalid" severity="error" size="small" variant="simple">{{ $form.numberOfCards.error?.message }}</Message>
      </div>
    </div>
    <div class="form-group">
      <div>
        <FloatLabel variant="on">
          <DatePicker id="purchaseDate" name="purchaseDate" showIcon iconDisplay="input" :invalid="$form.purchaseDate?.invalid" disabled fluid />
          <label for="purchaseDate">Purchase Date</label>
        </FloatLabel>
        <Message v-if="$form.purchaseDate?.invalid" severity="error" size="small" variant="simple">{{ $form.purchaseDate.error?.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="on">
          <InputNumber inputId="totalAmount" name="totalAmount" :invalid="$form.totalAmount?.invalid" mode="currency" currency="PHP" disabled fluid />
          <label for="totalAmount">Total Amount</label>
        </FloatLabel>
        <Message v-if="$form.totalAmount?.invalid" severity="error" size="small" variant="simple">{{ $form.totalAmount.error?.message }}</Message>
      </div>
    </div>
    <div class="form-group card-grid">
      <Card v-for="(sale, index) in installment.saleGroup" :key="index" :class="{ 'selected-due-date' : sale.dueDate === installment.dueDate }">
        <template #content>
          <strong>{{ formatDate(sale.dueDate) }}</strong>
          <div class="card-content">
            <span>{{ formatAmount(sale.amountDue) }}</span>
            <Tag :value="sale.status" :severity="sale.status === 'pending' ? 'warn' : 'success'"></Tag>
          </div>
        </template>
      </Card>
    </div>
    
    <div class="button-group" v-if="installment.status !== 'paid'">
      <Button type="button" label="Cancel" severity="secondary" @click="onCancel"></Button>
      <Button type="submit" label="Pay Installment" severity="success"></Button>
    </div>
  </Form>
</template>