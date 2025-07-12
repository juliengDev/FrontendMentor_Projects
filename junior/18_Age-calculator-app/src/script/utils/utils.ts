export type Date = {
  day: string;
  month: string;
  year: string;
};

export function isValidDate({ day, month, year }: Date) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);

  const date = new Date(y, m - 1, d);

  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}
