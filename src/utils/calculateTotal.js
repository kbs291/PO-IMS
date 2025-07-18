export function calculateTotal(dataArr, key) {
  let sum = 0;
  dataArr.forEach(data => sum += data[key]);
  return sum;
}