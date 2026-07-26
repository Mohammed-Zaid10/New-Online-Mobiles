export const STAGES = [
  "Received",
  "Diagnosing",
  "Repairing",
  "Quality Check",
  "Ready",
  "Delivered",
] as const;

export type Stage = typeof STAGES[number];

export function stageFor(repairId: string, phone: string): number {
  const src = `${repairId}${phone}`.replace(/\s+/g, "").toLowerCase();
  if (!src) return 0;
  let h = 0;
  for (let i = 0; i < src.length; i++) h = (h * 31 + src.charCodeAt(i)) >>> 0;
  return h % STAGES.length;
}

export function estimatedReady(repairId: string): string {
  let h = 0;
  for (let i = 0; i < repairId.length; i++) h = (h * 17 + repairId.charCodeAt(i)) >>> 0;
  const days = (h % 4) + 1;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}
