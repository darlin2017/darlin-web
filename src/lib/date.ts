// Extracts date parts as seen in Asia/Tokyo, regardless of the server process's local timezone
// (microCMS dates are UTC strings, and Vercel's runtime defaults to UTC while local dev is JST —
// using Date's local getters like getFullYear()/getDate() would give different results per environment).
const JST_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'short',
});

export type JSTDateParts = {
  year: number;
  month: string;
  day: string;
  weekday: string;
};

export function getJSTParts(date: Date): JSTDateParts {
  const parts = JST_FORMATTER.formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';

  return {
    year: Number(get('year')),
    month: get('month'),
    day: get('day'),
    weekday: get('weekday'),
  };
}
