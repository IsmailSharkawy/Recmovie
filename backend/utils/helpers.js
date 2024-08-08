export const isWeekend = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6;
};
