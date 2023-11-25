export const getTargetYear = (day, month) => {
  const currentDate = new Date();
  const tempMonth = currentDate.getMonth();
  const tempDay = currentDate.getDate();
  if (
    month < currentDate.getMonth() ||
    (month === currentDate.getMonth() && day < currentDate.getDate())
  )
    return currentDate.getFullYear() + 1;
  else return currentDate.getFullYear();
};
