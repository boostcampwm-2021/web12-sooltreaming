export const getTimeString = (): string => {
  const now = new Date();
  let part = 'AM';
  let nowHour = now.getHours();
  let nowMinute = now.getMinutes().toString().padStart(2, '0');
  if (nowHour > 12) {
    nowHour -= 12;
    part = 'PM';
  }
  return `${nowHour}:${nowMinute} ${part}`;
};
