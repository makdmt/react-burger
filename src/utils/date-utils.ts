export function relateDateToToday(date: string): string {
  const targetDate = Date.parse(date);
  const todayDate  = new Date();
  todayDate.setHours(0, 0, 0);

  const relativeDate = new Intl.RelativeTimeFormat('ru-RU', { style: "long" });
  const locatedDate = new Intl.DateTimeFormat('ru-RU', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(targetDate);

  const datesDiff = targetDate - todayDate.getTime();
  const datesDiffInDays = Math.floor(datesDiff / 1000 / 60 / 60 / 24);

  if (datesDiff >= 0) return 'Сегодня';
  if (datesDiffInDays >= -1) return 'Вчера'
  if (datesDiffInDays >= -6) return relativeDate.format(datesDiffInDays, 'day');
  if (datesDiffInDays >= -7) return relativeDate.format(-1, 'week');
  if (datesDiffInDays < -7) return locatedDate;

  return 'не известно'

}
