export const statusInfo = {
  today: { color: "#E76832", bg: "#FFF0E8", icon: "flame" },
  soon: { color: "#C98415", bg: "#FFF6DD", icon: "time" },
  ok: { color: "#278657", bg: "#E9F7EF", icon: "checkmark-circle" },
};

export function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getProductStatus(expiry) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((parseDate(expiry) - today) / 86400000);
  return days <= 0 ? "today" : days <= 3 ? "soon" : "ok";
}

export function getDueText(expiry) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((parseDate(expiry) - today) / 86400000);
  if (days < 0)
    return `Venceu há ${Math.abs(days)} dia${Math.abs(days) > 1 ? "s" : ""}`;
  if (days === 0) return "Vence hoje";
  if (days === 1) return "Vence amanhã";
  return `Vence em ${days} dias`;
}

export function currentDateLabel() {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" })
    .format(new Date())
    .replace(".", "");
}

export function isValidISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = parseDate(value);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function defaultExpiryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().slice(0, 10);
}

export function dateAfterDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
