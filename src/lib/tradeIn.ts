export type TradeInInput = {
  brand: string;
  model: string;
  condition: "Superb" | "Excellent" | "Good" | "Fair";
  batteryHealth: number; // %
  storage: "64GB" | "128GB" | "256GB" | "512GB" | "1TB";
};

const brandBase: Record<string, number> = {
  apple: 55000,
  samsung: 38000,
  oneplus: 30000,
  google: 32000,
  vivo: 22000,
  oppo: 21000,
  xiaomi: 20000,
  realme: 15000,
  motorola: 16000,
  nothing: 22000,
  honor: 18000,
  tecno: 10000,
  infinix: 9000,
};

const conditionMul = { Superb: 0.9, Excellent: 0.75, Good: 0.6, Fair: 0.4 } as const;
const storageMul = { "64GB": 0.85, "128GB": 1, "256GB": 1.15, "512GB": 1.3, "1TB": 1.5 } as const;

export function estimateTradeIn(i: TradeInInput): number {
  const base = brandBase[i.brand.toLowerCase()] ?? 15000;
  const batteryMul = Math.max(0.5, Math.min(1, i.batteryHealth / 100));
  // model length adds mild variation so different models differ
  const modelMul = 0.85 + Math.min(0.3, i.model.length * 0.01);
  const raw = base * conditionMul[i.condition] * storageMul[i.storage] * batteryMul * modelMul;
  return Math.max(1500, Math.round(raw / 500) * 500);
}
