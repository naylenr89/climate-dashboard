export function cToF(c: number) {
  return (c * 9) / 5 + 32;
}

export function formatTemp(c: number, unit: "c" | "f") {
  const value = unit === "c" ? c : cToF(c);
  return `${Math.round(value)}°${unit.toUpperCase()}`;
}

export function formatDayLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" });
}