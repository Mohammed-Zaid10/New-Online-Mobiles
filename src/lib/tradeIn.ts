export type ScreenCondition = "Flawless" | "Minor Scratches" | "Cracked Glass" | "Broken Display";
export type BodyCondition = "Like New" | "Minor Wear" | "Dents & Scratches" | "Bended / Damaged";
export type SensorStatus = "Working" | "Defective" | "Not Supported";
export type WaterDamageStatus = "None" | "Minor" | "Severe";

export type PhoneHealthInput = {
  brand: string;
  model: string;
  storage: "64GB" | "128GB" | "256GB" | "512GB" | "1TB";
  batteryHealth: number; // 50 to 100
  screenCondition: ScreenCondition;
  bodyCondition: BodyCondition;
  cameraWorking: boolean;
  speakerWorking: boolean;
  chargingWorking: boolean;
  faceUnlockWorking: SensorStatus;
  fingerprintWorking: SensorStatus;
  waterDamage: WaterDamageStatus;
  originalBox: boolean;
  accessoriesIncluded: boolean;
};

// Legacy interface for simple trade-in calculations
export type TradeInInput = {
  brand: string;
  model: string;
  condition: "Superb" | "Excellent" | "Good" | "Fair";
  batteryHealth: number; // %
  storage: "64GB" | "128GB" | "256GB" | "512GB" | "1TB";
};

const brandBase: Record<string, number> = {
  apple: 60000,
  samsung: 45000,
  oneplus: 32000,
  google: 35000,
  vivo: 25000,
  oppo: 24000,
  xiaomi: 22000,
  realme: 18000,
  motorola: 19000,
  nothing: 26000,
  honor: 20000,
  tecno: 12000,
  infinix: 10000,
};

const conditionMul = { Superb: 0.9, Excellent: 0.75, Good: 0.6, Fair: 0.4 } as const;
const storageMul = { "64GB": 0.85, "128GB": 1, "256GB": 1.15, "512GB": 1.3, "1TB": 1.5 } as const;

export function estimateTradeIn(i: TradeInInput): number {
  const base = brandBase[i.brand.toLowerCase()] ?? 18000;
  const batteryMul = Math.max(0.5, Math.min(1, i.batteryHealth / 100));
  const modelMul = 0.85 + Math.min(0.3, i.model.length * 0.01);
  const raw = base * conditionMul[i.condition] * storageMul[i.storage] * batteryMul * modelMul;
  return Math.max(1500, Math.round(raw / 500) * 500);
}

export type PhoneHealthResult = {
  healthScore: number; // 0 - 100
  estimatedResaleValue: number; // INR
  repairSuggestions: {
    issue: string;
    estimatedRepairCost: number;
    potentialValueIncrease: number;
    description: string;
  }[];
  tradeInRecommendation: {
    grade: "S" | "A" | "B" | "C" | "D";
    title: string;
    description: string;
    badgeText: string;
    actionPrompt: string;
  };
  breakdown: {
    batteryScore: number;
    displayBodyScore: number;
    functionalScore: number;
    accessoriesScore: number;
  };
};

export function calculatePhoneHealth(input: PhoneHealthInput): PhoneHealthResult {
  let batteryScore = Math.max(0, Math.min(100, (input.batteryHealth - 50) * 2)); // 100% -> 100, 80% -> 60, 50% -> 0
  
  // Screen Score (max 25)
  let screenPoints = 25;
  if (input.screenCondition === "Minor Scratches") screenPoints = 20;
  else if (input.screenCondition === "Cracked Glass") screenPoints = 10;
  else if (input.screenCondition === "Broken Display") screenPoints = 2;

  // Body Score (max 25)
  let bodyPoints = 25;
  if (input.bodyCondition === "Minor Wear") bodyPoints = 20;
  else if (input.bodyCondition === "Dents & Scratches") bodyPoints = 12;
  else if (input.bodyCondition === "Bended / Damaged") bodyPoints = 3;

  const displayBodyScore = Math.round(((screenPoints + bodyPoints) / 50) * 100);

  // Functional Hardware Score (max 40)
  let funcPoints = 0;
  const totalFuncChecks = 5;
  if (input.cameraWorking) funcPoints += 1;
  if (input.speakerWorking) funcPoints += 1;
  if (input.chargingWorking) funcPoints += 1;
  if (input.faceUnlockWorking === "Working" || input.faceUnlockWorking === "Not Supported") funcPoints += 1;
  if (input.fingerprintWorking === "Working" || input.fingerprintWorking === "Not Supported") funcPoints += 1;

  let funcScore = (funcPoints / totalFuncChecks) * 100;
  if (input.waterDamage === "Minor") funcScore *= 0.7;
  if (input.waterDamage === "Severe") funcScore *= 0.3;

  const functionalScore = Math.round(funcScore);

  // Extras Score (max 10)
  let extrasPoints = 0;
  if (input.originalBox) extrasPoints += 50;
  if (input.accessoriesIncluded) extrasPoints += 50;
  const accessoriesScore = extrasPoints;

  // Total Health Score (Weighted)
  // Battery: 25%, Display/Body: 35%, Functional: 30%, Extras: 10%
  const totalScore = Math.round(
    (batteryScore * 0.25) +
    (displayBodyScore * 0.35) +
    (functionalScore * 0.30) +
    (accessoriesScore * 0.10)
  );

  const healthScore = Math.max(5, Math.min(100, totalScore));

  // Base Resale Price calculation
  const base = brandBase[input.brand.toLowerCase()] ?? 20000;
  const sMul = storageMul[input.storage] ?? 1.0;
  const healthMultiplier = 0.2 + (healthScore / 100) * 0.8; // 20% to 100% of base value
  const modelMul = 0.9 + Math.min(0.25, input.model.length * 0.008);

  const rawResale = base * sMul * healthMultiplier * modelMul;
  const estimatedResaleValue = Math.max(1200, Math.round(rawResale / 500) * 500);

  // Repair suggestions & ROI analysis
  const repairSuggestions: PhoneHealthResult["repairSuggestions"] = [];

  if (input.batteryHealth < 80) {
    repairSuggestions.push({
      issue: "Battery Replacement",
      estimatedRepairCost: 2499,
      potentialValueIncrease: 5000,
      description: "Battery health is below 80%. Replacing it improves overall performance and raises trade-in grade.",
    });
  }

  if (input.screenCondition === "Cracked Glass" || input.screenCondition === "Broken Display") {
    repairSuggestions.push({
      issue: "Screen Repair / Outer Glass Replacement",
      estimatedRepairCost: input.screenCondition === "Cracked Glass" ? 3499 : 6999,
      potentialValueIncrease: input.screenCondition === "Cracked Glass" ? 7500 : 12000,
      description: "Screen damage heavily penalizes trade-in value. Repairing the glass yields a net gain on trade-in.",
    });
  }

  if (!input.chargingWorking) {
    repairSuggestions.push({
      issue: "Charging Port Cleaning & Repair",
      estimatedRepairCost: 899,
      potentialValueIncrease: 3500,
      description: "Non-functional charging restricts full trade-in value. Quick port replacement restores charging functionality.",
    });
  }

  if (!input.speakerWorking) {
    repairSuggestions.push({
      issue: "Earpiece / Speaker Mesh Servicing",
      estimatedRepairCost: 699,
      potentialValueIncrease: 2500,
      description: "Low or muffled audio output reduces functional grade. Servicing speakers restores full sound clarity.",
    });
  }

  if (input.waterDamage === "Severe") {
    repairSuggestions.push({
      issue: "Motherboard De-oxidation & Ultrasonic Clean",
      estimatedRepairCost: 1999,
      potentialValueIncrease: 6000,
      description: "Severe liquid exposure degrades internal components. Professional chemical cleaning prevents short circuits.",
    });
  }

  // Recommendations
  let tradeInRecommendation: PhoneHealthResult["tradeInRecommendation"];

  if (healthScore >= 85) {
    tradeInRecommendation = {
      grade: "S",
      title: "Pristine Device — Max Value Trade-In",
      description: "Your phone is in top-tier condition. Lock in maximum trade-in credits or exchange bonus today before market depreciation.",
      badgeText: "TOP GRADE TRADE-IN",
      actionPrompt: "Trade-In Now for Top Payout",
    };
  } else if (healthScore >= 70) {
    tradeInRecommendation = {
      grade: "A",
      title: "Great Condition — Recommended for Direct Exchange",
      description: "High resale potential. You can trade in immediately for instant store credit or upgrade bonus.",
      badgeText: "HIGH RESALE VALUE",
      actionPrompt: "Claim Direct Exchange Bonus",
    };
  } else if (healthScore >= 50) {
    tradeInRecommendation = {
      grade: "B",
      title: "Moderate Condition — Minor Maintenance Suggested",
      description: repairSuggestions.length > 0 
        ? `Addressing minor issues like ${repairSuggestions[0].issue.toLowerCase()} can boost your trade-in payout by ₹${repairSuggestions[0].potentialValueIncrease.toLocaleString('en-IN')}.`
        : "Good candidate for trade-in. Minor cosmetic wear noted.",
      badgeText: "DECENT VALUE",
      actionPrompt: "Trade In or Repair First",
    };
  } else if (healthScore >= 30) {
    tradeInRecommendation = {
      grade: "C",
      title: "Substantial Wear / Minor Faults — Repair First Recommended",
      description: "Consider performing quick repairs at our service desk before selling to unlock up to 60% higher exchange value.",
      badgeText: "REPAIR RECOMMENDED",
      actionPrompt: "Schedule Pre-Sale Repair",
    };
  } else {
    tradeInRecommendation = {
      grade: "D",
      title: "Heavily Damaged Device — Recycle & Parts Value",
      description: "Your phone has severe physical or functional defects. Trade in for instant recycling credit or spare parts valuation.",
      badgeText: "RECYCLING CREDIT",
      actionPrompt: "Get Scrap & Parts Valuation",
    };
  }

  return {
    healthScore,
    estimatedResaleValue,
    repairSuggestions,
    tradeInRecommendation,
    breakdown: {
      batteryScore,
      displayBodyScore,
      functionalScore,
      accessoriesScore,
    },
  };
}
