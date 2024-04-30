import { Currencies } from "./currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

// Format Mata Uang
export function GetFormatterForCurrency(currency: string) {
  const locate = Currencies.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locate, {
    style: "currency",
    currency,
  });
}
