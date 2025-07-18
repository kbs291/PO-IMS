export function formatDate(date = new Date(), dateFormat) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1; // Month is 0-indexed
  let day = date.getDate();

  // Add leading zero if month or day is a single digit
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  if (dateFormat === 'm-y') {
    return `${year}-${month}`;
  }

  return `${year}-${month}-${day}`;
}