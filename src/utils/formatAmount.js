export function formatAmount(amount = 0) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(amount);
}
