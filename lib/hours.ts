// Opening hours as published on bounc.uk, evaluated in UK time.
// Windows run past midnight, so "close" is expressed in minutes from the day's start (> 1440).

type Window = { open: number; close: number };

const WEEKDAY: Window = { open: 6 * 60, close: 26 * 60 }; // 06:00 → 02:00
const WEEKEND: Window = { open: 5 * 60, close: 27 * 60 }; // 05:00 → 03:00

const DAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function windowFor(day: number) {
  return day === 0 || day === 6 ? WEEKEND : WEEKDAY;
}

function londonParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: DAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function fmt(mins: number) {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const suffix = h < 12 ? "am" : "pm";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mm = m % 60;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ""}${suffix}`;
}

export type OpenStatus = { open: boolean; label: string };

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = londonParts(date);
  const today = windowFor(day);
  const yesterday = windowFor((day + 6) % 7);

  // Still inside last night's late window
  if (minutes < yesterday.close - 1440) {
    return { open: true, label: `Open now · until ${fmt(yesterday.close)}` };
  }
  if (minutes >= today.open) {
    return { open: true, label: `Open now · until ${fmt(today.close)}` };
  }
  return { open: false, label: `Closed · opens ${fmt(today.open)}` };
}
