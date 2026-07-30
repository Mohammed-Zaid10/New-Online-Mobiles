import React, { useState, useMemo } from "react";
import { 
  Battery, BatteryCharging, Zap, Sun, Wifi, Gamepad2, Video, 
  Share2, Camera, Clock, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, RefreshCw
} from "lucide-react";
import { mobiles } from "@/data/mobiles";

export interface PhoneBatteryProfile {
  id: string;
  name: string;
  brand: string;
  capacityMah: number;
  fastChargingWatts: number;
  wirelessChargingWatts?: number;
  chipEfficiencyFactor: number; // multiplier (e.g. Apple 1.15x, Snapdragon 8 Gen 3 1.10x)
}

export const POPULAR_BATTERY_PHONES: PhoneBatteryProfile[] = [
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "Apple", capacityMah: 4685, fastChargingWatts: 45, wirelessChargingWatts: 25, chipEfficiencyFactor: 1.22 },
  { id: "samsung-s25-ultra", name: "Samsung Galaxy S25 Ultra", brand: "Samsung", capacityMah: 5000, fastChargingWatts: 45, wirelessChargingWatts: 15, chipEfficiencyFactor: 1.15 },
  { id: "google-pixel-9-pro-xl", name: "Google Pixel 9 Pro XL", brand: "Google", capacityMah: 5060, fastChargingWatts: 37, wirelessChargingWatts: 23, chipEfficiencyFactor: 1.05 },
  { id: "nothing-phone-2a-plus", name: "Nothing Phone (2a) Plus", brand: "Nothing", capacityMah: 5000, fastChargingWatts: 50, wirelessChargingWatts: 0, chipEfficiencyFactor: 1.08 },
  { id: "oneplus-12", name: "OnePlus 12", brand: "OnePlus", capacityMah: 5400, fastChargingWatts: 100, wirelessChargingWatts: 50, chipEfficiencyFactor: 1.18 },
  { id: "custom", name: "Custom 5000 mAh Phone", brand: "Generic", capacityMah: 5000, fastChargingWatts: 33, wirelessChargingWatts: 15, chipEfficiencyFactor: 1.00 },
];

export function BatteryCalculator() {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>("iphone-16-pro-max");
  const [customCapacity, setCustomCapacity] = useState<number>(5000);

  // User Usage Inputs (Hours per day)
  const [gamingHours, setGamingHours] = useState<number>(1.5);
  const [videoHours, setVideoHours] = useState<number>(2.5);
  const [socialHours, setSocialHours] = useState<number>(3.0);
  const [cameraHours, setCameraHours] = useState<number>(0.5);

  // Brightness (25%, 50%, 75%, 100%)
  const [brightnessLevel, setBrightnessLevel] = useState<number>(50);

  // 5G Usage Mode ("wifi" | "mixed" | "heavy5g")
  const [networkMode, setNetworkMode] = useState<"wifi" | "mixed" | "heavy5g">("mixed");

  const phone = POPULAR_BATTERY_PHONES.find(p => p.id === selectedPhoneId) || POPULAR_BATTERY_PHONES[0];
  const batteryCapacity = selectedPhoneId === "custom" ? customCapacity : phone.capacityMah;

  // Real-time calculation formula
  const calculations = useMemo(() => {
    // Energy cost per hour in mAh
    // Gaming: High GPU/CPU load ~ 650-850 mAh/hr
    // Camera: Continuous 4K processing ~ 750-900 mAh/hr
    // Video streaming: ~ 250-350 mAh/hr
    // Social Media / Web: ~ 300-400 mAh/hr

    const brightnessMultiplier = 1 + (brightnessLevel - 50) * 0.005; // 0.875x at 25% up to 1.25x at 100%
    const networkMultiplier = networkMode === "wifi" ? 0.90 : networkMode === "mixed" ? 1.05 : 1.25;

    const baseGamingRate = 720 * brightnessMultiplier * (networkMode === "heavy5g" ? 1.15 : 1.0);
    const baseCameraRate = 800 * brightnessMultiplier;
    const baseVideoRate = 300 * brightnessMultiplier * networkMultiplier;
    const baseSocialRate = 340 * brightnessMultiplier * networkMultiplier;

    const activeGamingDrain = gamingHours * baseGamingRate;
    const activeCameraDrain = cameraHours * baseCameraRate;
    const activeVideoDrain = videoHours * baseVideoRate;
    const activeSocialDrain = socialHours * baseSocialRate;

    const totalActiveScreenOnHours = gamingHours + videoHours + socialHours + cameraHours;
    const totalActiveDrainMah = activeGamingDrain + activeCameraDrain + activeVideoDrain + activeSocialDrain;

    // Apply phone chip efficiency bonus
    const effectiveCapacityMah = batteryCapacity * (selectedPhoneId === "custom" ? 1.0 : phone.chipEfficiencyFactor);

    // Standby drain: ~1.2% per hour when screen is off (15-20 mAh/hr)
    const averageHourlyDrainRate = totalActiveScreenOnHours > 0
      ? totalActiveDrainMah / totalActiveScreenOnHours
      : 300;

    // Estimated Screen-On Time (SOT) if used continuously
    const estimatedSOTHours = (effectiveCapacityMah / averageHourlyDrainRate);
    const sotHrsInt = Math.floor(estimatedSOTHours);
    const sotMinsInt = Math.round((estimatedSOTHours - sotHrsInt) * 60);

    // Full day estimate (assuming active screen hours + remaining standby time)
    const remainingBatteryAfterActiveUserDay = Math.max(0, effectiveCapacityMah - totalActiveDrainMah);
    const standbyHoursRemaining = remainingBatteryAfterActiveUserDay / 20; // 20 mAh standby drain
    const totalDayDurationHours = totalActiveScreenOnHours + (standbyHoursRemaining * 0.6);
    const dayRatio = (totalDayDurationHours / 16).toFixed(1); // Assuming 16 awake hours = 1 full day

    // Calculate percentage breakdown for visual progress bar
    const totalCalcDrain = Math.max(1, totalActiveDrainMah);
    const gamingPct = Math.round((activeGamingDrain / totalCalcDrain) * 100);
    const cameraPct = Math.round((activeCameraDrain / totalCalcDrain) * 100);
    const videoPct = Math.round((activeVideoDrain / totalCalcDrain) * 100);
    const socialPct = Math.round((activeSocialDrain / totalCalcDrain) * 100);

    // Charging time calculation (minutes to 80% and 100%)
    const chargingWatts = selectedPhoneId === "custom" ? 33 : phone.fastChargingWatts;
    const minsTo80 = Math.round((batteryCapacity * 0.8 * 3.7) / (chargingWatts * 1000) * 60 * 1.2);
    const minsTo100 = Math.round(minsTo80 * 1.45);

    return {
      estimatedSOTHours,
      sotHrsInt,
      sotMinsInt,
      totalActiveScreenOnHours,
      totalActiveDrainMah,
      remainingBatteryPct: Math.max(0, Math.round(((effectiveCapacityMah - totalActiveDrainMah) / effectiveCapacityMah) * 100)),
      dayRatio,
      totalDayDurationHours: Math.round(totalDayDurationHours),
      gamingPct,
      cameraPct,
      videoPct,
      socialPct,
      chargingWatts,
      minsTo80,
      minsTo100
    };
  }, [gamingHours, videoHours, socialHours, cameraHours, brightnessLevel, networkMode, selectedPhoneId, customCapacity, phone, batteryCapacity]);

  return (
    <div className="w-full space-y-8">
      {/* Header & Device Selection */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/80 p-6 rounded-3xl border border-border/70 shadow-luxe backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Zap className="h-4 w-4" /> Real-Time Power Simulation
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Battery Usage & Life Calculator</h2>
          <p className="text-sm text-muted-foreground mt-1">Estimate screen-on-time (SOT), full day duration, and charging speed based on your daily habits.</p>
        </div>

        {/* Device Dropdown */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground block">Select Phone Model</label>
          <select
            value={selectedPhoneId}
            onChange={(e) => setSelectedPhoneId(e.target.value)}
            className="bg-background border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {POPULAR_BATTERY_PHONES.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name} ({p.capacityMah} mAh)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Inputs vs Real-Time Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User Input Sliders & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-4">
              <Clock className="h-5 w-5 text-primary" /> Daily Activity Hours
            </h3>

            {/* Custom Capacity input if custom selected */}
            {selectedPhoneId === "custom" && (
              <div className="space-y-2 bg-muted/40 p-4 rounded-2xl border border-border/50">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Custom Battery Capacity</span>
                  <span className="text-primary font-bold">{customCapacity} mAh</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={7000}
                  step={100}
                  value={customCapacity}
                  onChange={(e) => setCustomCapacity(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            )}

            {/* Gaming Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-2 text-foreground">
                  <Gamepad2 className="h-4 w-4 text-purple-500" /> Gaming (3D Games / High FPS)
                </span>
                <span className="font-mono text-sm font-bold text-primary">{gamingHours} hrs</span>
              </div>
              <input
                type="range"
                min={0}
                max={8}
                step={0.5}
                value={gamingHours}
                onChange={(e) => setGamingHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Video Streaming Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-2 text-foreground">
                  <Video className="h-4 w-4 text-rose-500" /> Video Streaming (YouTube / Netflix / Movies)
                </span>
                <span className="font-mono text-sm font-bold text-primary">{videoHours} hrs</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={videoHours}
                onChange={(e) => setVideoHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Social Media Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-2 text-foreground">
                  <Share2 className="h-4 w-4 text-sky-500" /> Social Media & Web (Instagram, Reels, Browser)
                </span>
                <span className="font-mono text-sm font-bold text-primary">{socialHours} hrs</span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                step={0.5}
                value={socialHours}
                onChange={(e) => setSocialHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Camera Usage Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-2 text-foreground">
                  <Camera className="h-4 w-4 text-emerald-500" /> Camera & Video Recording
                </span>
                <span className="font-mono text-sm font-bold text-primary">{cameraHours} hrs</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.25}
                value={cameraHours}
                onChange={(e) => setCameraHours(parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="pt-4 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Display Brightness Control */}
              <div className="space-y-2 bg-muted/30 p-4 rounded-2xl border border-border/40">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Sun className="h-4 w-4 text-amber-500" /> Screen Brightness
                  </span>
                  <span className="font-bold text-primary">{brightnessLevel}%</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={100}
                  step={25}
                  value={brightnessLevel}
                  onChange={(e) => setBrightnessLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* 5G Network Mode Control */}
              <div className="space-y-2 bg-muted/30 p-4 rounded-2xl border border-border/40">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Wifi className="h-4 w-4 text-blue-500" /> Network Mode
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1">
                  {(["wifi", "mixed", "heavy5g"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setNetworkMode(m)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg capitalize transition ${
                        networkMode === m ? "bg-primary text-primary-foreground shadow-xs" : "bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {m === "wifi" ? "Wi-Fi" : m === "mixed" ? "Mixed" : "5G Heavy"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Animated Results & Charging Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Animated Battery Status Card */}
          <div className="bg-gradient-to-b from-card via-card to-primary/5 border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-luxe relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{phone.name}</span>
                <h4 className="text-lg font-bold text-foreground">Battery Simulation Result</h4>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <BatteryCharging className="h-5 w-5" />
              </div>
            </div>

            {/* Interactive Animated Battery Icon */}
            <div className="flex flex-col items-center justify-center py-4 space-y-3">
              <div className="relative w-44 h-24 border-4 border-foreground/80 rounded-2xl p-1.5 flex items-center shadow-xl bg-background">
                {/* Battery Cap */}
                <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-3 h-8 bg-foreground/80 rounded-r-md" />
                
                {/* Battery Fill Bar with Glowing Green Gradient */}
                <div
                  className={`h-full rounded-xl transition-all duration-700 flex items-center justify-center font-bold text-xs shadow-inner ${
                    calculations.remainingBatteryPct > 50 
                      ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white" 
                      : calculations.remainingBatteryPct > 20 
                      ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black" 
                      : "bg-gradient-to-r from-rose-600 to-red-500 text-white animate-pulse"
                  }`}
                  style={{ width: `${Math.max(8, calculations.remainingBatteryPct)}%` }}
                >
                  {calculations.remainingBatteryPct}% Left
                </div>
              </div>

              <span className="text-xs text-muted-foreground font-medium">
                {batteryCapacity} mAh Capacity · {phone.chipEfficiencyFactor}x Chip Efficiency
              </span>
            </div>

            {/* Core Metrics: Screen-on-Time & Full Day Duration */}
            <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50 text-center">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Est. Screen-on-Time</span>
                <span className="text-2xl font-black text-primary font-mono">
                  {calculations.sotHrsInt}h {calculations.sotMinsInt}m
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Est. Full-Day Usage</span>
                <span className="text-2xl font-black text-foreground font-mono">
                  {calculations.dayRatio} <span className="text-xs font-normal text-muted-foreground">Days</span>
                </span>
              </div>
            </div>

            {/* Activity Drain Breakdown Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-foreground">Daily Power Drain Breakdown</span>
                <span className="text-muted-foreground font-mono">{calculations.totalActiveDrainMah} mAh</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                <div style={{ width: `${calculations.gamingPct}%` }} className="bg-purple-500 h-full" title={`Gaming: ${calculations.gamingPct}%`} />
                <div style={{ width: `${calculations.videoPct}%` }} className="bg-rose-500 h-full" title={`Video: ${calculations.videoPct}%`} />
                <div style={{ width: `${calculations.socialPct}%` }} className="bg-sky-500 h-full" title={`Social: ${calculations.socialPct}%`} />
                <div style={{ width: `${calculations.cameraPct}%` }} className="bg-emerald-500 h-full" title={`Camera: ${calculations.cameraPct}%`} />
              </div>
              <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" /> Gaming ({calculations.gamingPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Video ({calculations.videoPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> Social ({calculations.socialPct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Camera ({calculations.cameraPct}%)</span>
              </div>
            </div>
          </div>

          {/* Charging Recommendations Card */}
          <div className="bg-card border border-border/70 rounded-3xl p-6 space-y-4 shadow-sm">
            <h4 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Zap className="h-4 w-4 text-amber-500" /> Charging & Battery Health Tips
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/40">
                <span className="text-muted-foreground font-medium">Recommended Fast Charger:</span>
                <span className="font-bold text-primary">{calculations.chargingWatts}W USB-C PD Charger</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/40">
                <span className="text-muted-foreground font-medium">0% to 80% Charge Time:</span>
                <span className="font-mono font-bold text-foreground">~{calculations.minsTo80} Mins</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/40">
                <span className="text-muted-foreground font-medium">0% to 100% Full Charge:</span>
                <span className="font-mono font-bold text-foreground">~{calculations.minsTo100} Mins</span>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <ShieldCheck className="h-4 w-4" /> Battery Longevity Advice
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                For maximum battery lifespan, maintain your battery between <strong>20% and 80%</strong>. Avoid playing heavy 3D games while fast-charging to prevent thermal degradation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
