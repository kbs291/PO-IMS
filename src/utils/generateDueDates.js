export function generateDueDates(purchaseDate = new Date()) {
  const date = new Date(purchaseDate);
      
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  const dueDates = {
    first: '',
    second: '',
    third: '',
    fourth: '',
  };

  if (day < 15) {
    dueDates.first = new Date(year, month, 15);
    dueDates.second = new Date(year, month + 1, 0);
    dueDates.third = new Date(year, month + 1, 15);
    dueDates.fourth = new Date(year, month + 2, 0);
  } else if (day === lastDay.value) {  
    dueDates.first = new Date(year, month + 1, 15);
    dueDates.second = new Date(year, month + 2, 0);
    dueDates.third = new Date(year, month + 2, 15);
    dueDates.fourth = new Date(year, month + 3, 0);
  } else {
    dueDates.first = new Date(year, month + 1, 0);
    dueDates.second = new Date(year, month + 1, 15);
    dueDates.third = new Date(year, month + 2, 0);
    dueDates.fourth = new Date(year, month + 2, 15);
  }

  return dueDates;
}