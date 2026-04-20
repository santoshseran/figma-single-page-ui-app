export function formatMonth(ym: string) {
  // Expecting YYYY-MM
  const [y, m] = ym.split("-").map((x) => Number(x));
  if (!y || !m) return ym;
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export function formatUSD(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

