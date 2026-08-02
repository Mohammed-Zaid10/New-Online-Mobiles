import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Wrench, RefreshCw,
  Smartphone, Battery, Camera, Volume2, Zap, ShieldAlert, Box, Cable, ArrowRight, Activity
} from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { brands } from "@/data/brands";
import {
  calculatePhoneHealth,
  type PhoneHealthInput,
  type ScreenCondition,
  type BodyCondition,
  type SensorStatus,
  type WaterDamageStatus,
} from "@/lib/tradeIn";
import { SHOP, inr, wa } from "@/lib/shop";

export const Route = createFileRoute("/trade-in")({
  head: () => ({
    meta: [
      { title: "Phone Health Checker & Trade-In Calculator — Online Mobiles" },
      { name: "description", content: "Check your phone's health score (0-100), get instant resale estimate, repair suggestions, and trade-in recommendation." },
      { property: "og:url", content: `${SHOP.siteUrl}/trade-in` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/trade-in` }],
  }),
  component: TradeInPage,
});

function TradeInPage() {
  const [input, setInput] = useState<PhoneHealthInput>({
    brand: "Apple",
    model: "iPhone 14 Pro",
    storage: "128GB",
    batteryHealth: 88,
    screenCondition: "Flawless",
    bodyCondition: "Like New",
    cameraWorking: true,
    speakerWorking: true,
    chargingWorking: true,
    faceUnlockWorking: "Working",
    fingerprintWorking: "Not Supported",
    waterDamage: "None",
    originalBox: true,
    accessoriesIncluded: true,
  });

  const result = calculatePhoneHealth(input);

  const whatsappMessage = `Hi Online Mobiles! I checked my ${input.brand} ${input.model} (${input.storage}) on your Phone Health Checker.

📊 Health Score: ${result.healthScore}/100 (Grade ${result.tradeInRecommendation.grade})
🔋 Battery: ${input.batteryHealth}% | Screen: ${input.screenCondition}
💰 Estimated Resale Value: ${inr(result.estimatedResaleValue)}

I would like to proceed with selling / trading in my phone!`;

  return (
    <div 
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.75), rgba(8,8,8,0.95)), url('/backgrounds/trade-in-bg.jpg')" }}
    >
      <PageHeader
        eyebrow="AI Diagnostics & Trade-In"
        title="Phone Health Checker"
        subtitle="Answer 11 quick questions to analyze hardware condition, get your 0-100 Health Score, resale value & repair ROI recommendations."
      />

      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <Breadcrumbs items={[{ label: "Phone Health & Trade-In" }]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Interactive Questionnaire Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Device Info */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">1. Device & Specs</h3>
                  <p className="text-xs text-zinc-400">Select model and storage capacity</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Brand</label>
                  <select
                    value={input.brand}
                    onChange={(e) => setInput({ ...input, brand: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  >
                    {brands.map((b) => (
                      <option key={b.slug} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Model</label>
                  <input
                    type="text"
                    value={input.model}
                    onChange={(e) => setInput({ ...input, model: e.target.value })}
                    placeholder="e.g. iPhone 14 Pro"
                    className="w-full rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Storage</label>
                  <select
                    value={input.storage}
                    onChange={(e) => setInput({ ...input, storage: e.target.value as any })}
                    className="w-full rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  >
                    {["64GB", "128GB", "256GB", "512GB", "1TB"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Physical & Screen Condition */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                  <Battery className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">2. Physical Health & Battery</h3>
                  <p className="text-xs text-zinc-400">Battery health %, glass condition and body wear</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Battery Health Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Battery Health: <span className="text-white font-bold text-sm ml-1">{input.batteryHealth}%</span>
                    </label>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      input.batteryHealth >= 85 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                      input.batteryHealth >= 75 ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                      "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}>
                      {input.batteryHealth >= 85 ? "Optimal" : input.batteryHealth >= 75 ? "Normal" : "Service Required"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={100}
                    value={input.batteryHealth}
                    onChange={(e) => setInput({ ...input, batteryHealth: Number(e.target.value) })}
                    className="w-full accent-white bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                    <span>50% (Degraded)</span>
                    <span>75% (Fair)</span>
                    <span>100% (New)</span>
                  </div>
                </div>

                {/* Screen Condition */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Screen Condition</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["Flawless", "Minor Scratches", "Cracked Glass", "Broken Display"] as ScreenCondition[]).map((sc) => (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => setInput({ ...input, screenCondition: sc })}
                        className={`rounded-xl border p-3 text-left transition text-xs font-medium ${
                          input.screenCondition === sc
                            ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                            : "border-white/10 bg-[#18181b] text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Condition */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Body & Frame Condition</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["Like New", "Minor Wear", "Dents & Scratches", "Bended / Damaged"] as BodyCondition[]).map((bc) => (
                      <button
                        key={bc}
                        type="button"
                        onClick={() => setInput({ ...input, bodyCondition: bc })}
                        className={`rounded-xl border p-3 text-left transition text-xs font-medium ${
                          input.bodyCondition === bc
                            ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                            : "border-white/10 bg-[#18181b] text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        {bc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Hardware Functionality & Liquid Damage */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">3. Hardware & Sensor Tests</h3>
                  <p className="text-xs text-zinc-400">Cameras, charging, audio, biometric sensors & liquid exposure</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Cameras */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Camera className="h-4 w-4 text-zinc-400" /> Cameras Working?
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, cameraWorking: true })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        input.cameraWorking ? "bg-white text-black font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, cameraWorking: false })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        !input.cameraWorking ? "bg-rose-500 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Speaker */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Volume2 className="h-4 w-4 text-zinc-400" /> Speaker Working?
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, speakerWorking: true })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        input.speakerWorking ? "bg-white text-black font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, speakerWorking: false })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        !input.speakerWorking ? "bg-rose-500 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Charging */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Zap className="h-4 w-4 text-zinc-400" /> Charging Port?
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, chargingWorking: true })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        input.chargingWorking ? "bg-white text-black font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, chargingWorking: false })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        !input.chargingWorking ? "bg-rose-500 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Water Damage */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <ShieldAlert className="h-4 w-4 text-zinc-400" /> Water Damage?
                  </span>
                  <select
                    value={input.waterDamage}
                    onChange={(e) => setInput({ ...input, waterDamage: e.target.value as WaterDamageStatus })}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-xs text-white"
                  >
                    <option value="None">None</option>
                    <option value="Minor">Minor</option>
                    <option value="Severe">Severe</option>
                  </select>
                </div>

                {/* Face Unlock */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="text-xs font-semibold text-zinc-200">Face Unlock?</span>
                  <select
                    value={input.faceUnlockWorking}
                    onChange={(e) => setInput({ ...input, faceUnlockWorking: e.target.value as SensorStatus })}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-xs text-white"
                  >
                    <option value="Working">Working</option>
                    <option value="Defective">Defective</option>
                    <option value="Not Supported">Not Supported</option>
                  </select>
                </div>

                {/* Fingerprint */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="text-xs font-semibold text-zinc-200">Fingerprint?</span>
                  <select
                    value={input.fingerprintWorking}
                    onChange={(e) => setInput({ ...input, fingerprintWorking: e.target.value as SensorStatus })}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-xs text-white"
                  >
                    <option value="Working">Working</option>
                    <option value="Defective">Defective</option>
                    <option value="Not Supported">Not Supported</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Accessories & Original Box */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                  <Box className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">4. Packaging & Accessories</h3>
                  <p className="text-xs text-zinc-400">Original box & charging cable/adapters</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Box className="h-4 w-4 text-zinc-400" /> Original Box Available?
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, originalBox: true })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        input.originalBox ? "bg-white text-black font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, originalBox: false })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        !input.originalBox ? "bg-rose-500 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#18181b] p-3.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Cable className="h-4 w-4 text-zinc-400" /> Accessories Included?
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, accessoriesIncluded: true })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        input.accessoriesIncluded ? "bg-white text-black font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput({ ...input, accessoriesIncluded: false })}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        !input.accessoriesIncluded ? "bg-rose-500 text-white font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Keynote Health Scorecard & Results (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Health Score Meter Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#18181b] to-[#0d0d0f] p-8 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Overall Diagnostics</span>
                <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-white">
                  Grade {result.tradeInRecommendation.grade}
                </span>
              </div>

              {/* Radial Glowing Meter */}
              <div className="relative my-8 flex items-center justify-center">
                <div className="relative h-44 w-44 flex items-center justify-center rounded-full border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {/* Glowing inner accent */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-white transition-all duration-700"
                    style={{
                      clipPath: `inset(0 0 ${100 - result.healthScore}% 0)`,
                      filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))"
                    }}
                  />
                  <div className="text-center z-10">
                    <div className="font-display text-5xl font-black text-white tracking-tight">
                      {result.healthScore}
                      <span className="text-xl font-medium text-zinc-500">/100</span>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Health Score</div>
                  </div>
                </div>
              </div>

              {/* Score breakdown metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Battery</div>
                  <div className="text-sm font-bold text-white">{result.breakdown.batteryScore}%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Display & Body</div>
                  <div className="text-sm font-bold text-white">{result.breakdown.displayBodyScore}%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Hardware</div>
                  <div className="text-sm font-bold text-white">{result.breakdown.functionalScore}%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Packaging</div>
                  <div className="text-sm font-bold text-white">{result.breakdown.accessoriesScore}%</div>
                </div>
              </div>

              {/* Estimated Resale Value Box */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <div className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">Estimated Resale Payout</div>
                <div className="mt-1 font-display text-4xl font-extrabold text-white tracking-tight">
                  {inr(result.estimatedResaleValue)}
                </div>
                <div className="mt-1 text-xs text-zinc-400 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  + ₹2,000 extra exchange credit if upgrading today
                </div>

                <a
                  href={wa(whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-zinc-200 transition shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                  Sell / Trade In on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Trade-In Recommendation Box */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                <ShieldCheck className="h-4 w-4" /> {result.tradeInRecommendation.badgeText}
              </div>
              <h4 className="font-display text-lg font-bold text-white">{result.tradeInRecommendation.title}</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{result.tradeInRecommendation.description}</p>
            </div>

            {/* Repair Suggestions & ROI Analysis */}
            {result.repairSuggestions.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                  <Wrench className="h-5 w-5 text-white" />
                  <h4 className="font-display text-base font-bold text-white">Recommended Pre-Sale Repairs</h4>
                </div>

                <div className="space-y-3">
                  {result.repairSuggestions.map((rec, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-[#18181b] p-3.5 text-xs">
                      <div className="flex items-center justify-between font-bold text-white mb-1">
                        <span>{rec.issue}</span>
                        <span className="text-emerald-400">+ {inr(rec.potentialValueIncrease)} Resale</span>
                      </div>
                      <p className="text-zinc-400 mb-2">{rec.description}</p>
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 border-t border-white/5 pt-2">
                        <span>Repair Cost: ~{inr(rec.estimatedRepairCost)}</span>
                        <span className="font-semibold text-zinc-300">Net Gain: +{inr(rec.potentialValueIncrease - rec.estimatedRepairCost)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
