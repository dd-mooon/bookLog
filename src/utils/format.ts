export function formatDate(date: string | Date, locale = 'ko-KR') {
  const value = typeof date === 'string' ? new Date(date) : date;

  if (Number.isNaN(value.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(value);
}

export function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}…`;
}
