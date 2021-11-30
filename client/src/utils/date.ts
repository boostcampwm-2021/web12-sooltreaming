export const filterDate = (dateString: string): string => {
  const targetDate = new Date(dateString);
  const targetString = targetDate.toString();
  const year = targetString.slice(11, 15);
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const day = targetString.slice(8, 10);
  const hour = targetString.slice(16, 18);
  const minute = targetString.slice(19, 21);
  const second = targetString.slice(22, 24);

  return `
    ${year}년 ${month}월 ${day}일
    ${hour}:${minute}:${second}
  `;
};
