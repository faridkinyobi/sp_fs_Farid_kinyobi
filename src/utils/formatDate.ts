export const FormatDate = (date: Date | string): string => {
  const newDate = new Date(date);
  const dateOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-US', dateOption)
    .format(newDate)
    .replace('at', '');
};
export const formattedDate = (date: Date | string): string => {
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) return '';
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
