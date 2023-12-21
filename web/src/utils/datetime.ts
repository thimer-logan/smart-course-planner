export const formatTime = (date: Date) : string => {
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  return `${hours}:${minutes}`;
}