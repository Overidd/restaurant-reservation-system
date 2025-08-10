export const validDateReservation = (dateStr) => {
   const inputDate = new Date(dateStr);
   const now = new Date();

   const normalizeDate = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

   const today = normalizeDate(now);
   const yesterday = new Date(today);
   yesterday.setDate(today.getDate() - 1);

   const target = normalizeDate(inputDate);

   return target >= yesterday;
}
