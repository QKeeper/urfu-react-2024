export function toRelativeDate(date?: string) {
  if (!date) return "ошибка";

  let passed = (Date.now() - new Date(date).getTime()) / 1000;

  if (passed < 60) return "сейчас";
  passed /= 60;

  if (passed < 60) {
    const r = Math.round(passed);
    return `${r} ${declOfNum(r, ["минуту", "минуты", "минут"])} назад`;
  }
  passed /= 60;

  if (passed < 24) {
    const r = Math.round(passed);
    return `${r} ${declOfNum(r, ["час", "часа", "часов"])} назад`;
  }
  passed /= 24;

  return date;
}

export function declOfNum(n: number, titles: [string, string, string]) {
  return titles[
    n % 10 == 1 && n % 100 != 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
  ];
}

export function CompareDateStrings(
  date1?: string,
  date2?: string,
  reverse?: boolean,
) {
  if (!date1 || !date2) return 0;
  return (
    (reverse ? -1 : 1) * new Date(date2).getTime() - new Date(date1).getTime()
  );
}
