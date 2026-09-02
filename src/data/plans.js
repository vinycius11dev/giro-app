export const PLAN_LIMITS = {
  free: {
    label: "Giro Essencial",
    shortLabel: "Grátis",
    maxActiveProducts: 30,
    monthlyRegistrations: 60,
    monthlyActions: 30,
    establishments: 1,
  },
  pro: {
    label: "Giro Pro",
    shortLabel: "Pro",
    maxActiveProducts: Infinity,
    monthlyRegistrations: Infinity,
    monthlyActions: Infinity,
    establishments: 5,
  },
};

export function currentMonthKey() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}

export function freshUsage() {
  return { month: currentMonthKey(), registrations: 0, actions: 0 };
}

export function normalizeUsage(usage) {
  if (!usage || usage.month !== currentMonthKey()) return freshUsage();
  return {
    month: usage.month,
    registrations: Number(usage.registrations) || 0,
    actions: Number(usage.actions) || 0,
  };
}
