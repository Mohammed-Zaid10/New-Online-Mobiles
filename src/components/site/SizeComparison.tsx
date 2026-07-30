import React, { useState, useMemo } from "react";
import { 
  Ruler, RotateCw, Layers, ArrowLeftRight, Scale, Smartphone, Shirt
} from "lucide-react";

export interface PhoneDimensionData {
  id: string;
  name: string;
  brand: string;
  heightMm: number;
  widthMm: number;
  thicknessMm: number;
  weightG: number;
  screenSizeInches: number;
  screenToBodyRatio: number;
  bezelMm: number;
  colorHex: string;
  image: string;
  pocketFit: {
    jeansFront: { status: "Fits Easily" | "Tight Fit" | "Protrudes Slightly"; text: string };
    jeansBack: { status: "Fits Easily" | "Tight Fit" | "Protrudes"; text: string };
    jacket: { status: "Fits Easily" | "Fits"; text: string };
  };
}

export const PHONE_DIMENSIONS: Record<string, PhoneDimensionData> = {
  "iphone-16-pro-max": {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    heightMm: 163.0,
    widthMm: 77.6,
    thicknessMm: 8.25,
    weightG: 227,
    screenSizeInches: 6.9,
    screenToBodyRatio: 91.4,
    bezelMm: 1.36,
    colorHex: "#C8BFA6",
    image: "/phones/iphone17-pro-max.jpg",
    pocketFit: {
      jeansFront: { status: "Protrudes Slightly", text: "Extends ~12mm out of standard slim jeans pockets." },
      jeansBack: { status: "Fits Easily", text: "Fits comfortably in regular rear jeans pockets." },
      jacket: { status: "Fits Easily", text: "Fits with ample room in standard jacket pockets." }
    }
  },
  "samsung-s25-ultra": {
    id: "samsung-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    heightMm: 162.8,
    widthMm: 77.6,
    thicknessMm: 8.2,
    weightG: 219,
    screenSizeInches: 6.9,
    screenToBodyRatio: 91.2,
    bezelMm: 1.4,
    colorHex: "#22252A",
    image: "/phones/samsung-s26-ultra.jpg",
    pocketFit: {
      jeansFront: { status: "Tight Fit", text: "Fits snug in front pockets; boxy corners can be felt while seated." },
      jeansBack: { status: "Fits Easily", text: "Slips smoothly into back jeans pockets." },
      jacket: { status: "Fits Easily", text: "Fits comfortably in interior jacket pockets." }
    }
  },
  "google-pixel-9-pro-xl": {
    id: "google-pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    heightMm: 162.8,
    widthMm: 76.6,
    thicknessMm: 8.5,
    weightG: 221,
    screenSizeInches: 6.8,
    screenToBodyRatio: 88.0,
    bezelMm: 1.8,
    colorHex: "#545C52",
    image: "/phones/pixel9-pro-xl.jpg",
    pocketFit: {
      jeansFront: { status: "Tight Fit", text: "Camera visor bar can catch slightly on pocket rim during entry." },
      jeansBack: { status: "Fits Easily", text: "Fits comfortably in rear pockets." },
      jacket: { status: "Fits Easily", text: "Fits effortlessly in jacket pockets." }
    }
  },
  "nothing-phone-2a-plus": {
    id: "nothing-phone-2a-plus",
    name: "Nothing Phone (2a) Plus",
    brand: "Nothing",
    heightMm: 161.7,
    widthMm: 76.3,
    thicknessMm: 8.5,
    weightG: 190,
    screenSizeInches: 6.7,
    screenToBodyRatio: 87.6,
    bezelMm: 2.1,
    colorHex: "#1A1A1A",
    image: "/phones/nothing-phone-2a-plus.jpg",
    pocketFit: {
      jeansFront: { status: "Fits Easily", text: "Lightweight 190g body makes it feel comfortable in front pockets." },
      jeansBack: { status: "Fits Easily", text: "Fits with zero protrusion in rear pockets." },
      jacket: { status: "Fits Easily", text: "Spacious fit in jacket pockets." }
    }
  },
  "iphone-16": {
    id: "iphone-16",
    name: "iPhone 16",
    brand: "Apple",
    heightMm: 147.6,
    widthMm: 71.6,
    thicknessMm: 7.8,
    weightG: 170,
    screenSizeInches: 6.1,
    screenToBodyRatio: 86.8,
    bezelMm: 2.0,
    colorHex: "#3B82F6",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80",
    pocketFit: {
      jeansFront: { status: "Fits Easily", text: "Compact size sits completely inside front jeans pocket." },
      jeansBack: { status: "Fits Easily", text: "Deep fit in back pockets." },
      jacket: { status: "Fits Easily", text: "Extremely lightweight and discreet." }
    }
  },
  "samsung-s24": {
    id: "samsung-s24",
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    heightMm: 147.0,
    widthMm: 70.6,
    thicknessMm: 7.6,
    weightG: 167,
    screenSizeInches: 6.2,
    screenToBodyRatio: 90.9,
    bezelMm: 1.5,
    colorHex: "#EAB308",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
    pocketFit: {
      jeansFront: { status: "Fits Easily", text: "One of the most pocketable flagships on the market." },
      jeansBack: { status: "Fits Easily", text: "Vanishes completely in back pockets." },
      jacket: { status: "Fits Easily", text: "Fits any pocket with zero drag." }
    }
  }
};

export function SizeComparison() {
  const [phoneAId, setPhoneAId] = useState<string>("iphone-16-pro-max");
  const [phoneBId, setPhoneBId] = useState<string>("samsung-s25-ultra");
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"side-by-side" | "overlay" | "pocket">("side-by-side");
  const [showRuler, setShowRuler] = useState<boolean>(true);
  const [pocketType, setPocketType] = useState<"jeansFront" | "jeansBack" | "jacket">("jeansFront");

  const phoneA = PHONE_DIMENSIONS[phoneAId] || PHONE_DIMENSIONS["iphone-16-pro-max"];
  const phoneB = PHONE_DIMENSIONS[phoneBId] || PHONE_DIMENSIONS["samsung-s25-ultra"];

  // Scale factor: 1 mm = 1.95px for a clean, proportional real-size display without header overlap
  const PIXELS_PER_MM = 1.95;

  const diffs = useMemo(() => {
    const heightDiff = +(phoneA.heightMm - phoneB.heightMm).toFixed(1);
    const widthDiff = +(phoneA.widthMm - phoneB.widthMm).toFixed(1);
    const thicknessDiff = +(phoneA.thicknessMm - phoneB.thicknessMm).toFixed(1);
    const weightDiff = +(phoneA.weightG - phoneB.weightG).toFixed(0);
    const screenDiff = +(phoneA.screenSizeInches - phoneB.screenSizeInches).toFixed(1);
    const ratioDiff = +(phoneA.screenToBodyRatio - phoneB.screenToBodyRatio).toFixed(1);

    return { heightDiff, widthDiff, thicknessDiff, weightDiff, screenDiff, ratioDiff };
  }, [phoneA, phoneB]);

  return (
    <div className="w-full space-y-6">
      {/* Header & Selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/80 p-6 rounded-3xl border border-border/70 shadow-luxe backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Ruler className="h-4 w-4" /> 1:1 Scale Dimension Lab
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Real Size Phone Comparison</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-life product photography scaled to exact millimeter dimensions.</p>
        </div>

        {/* Controls & Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground block">Phone A (Left)</label>
            <select
              value={phoneAId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === phoneBId) setPhoneBId(phoneAId);
                setPhoneAId(val);
              }}
              className="bg-background border border-border/80 rounded-xl px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.values(PHONE_DIMENSIONS).map(p => (
                <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground self-end mb-0.5">
            <ArrowLeftRight className="h-4 w-4" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground block">Phone B (Right)</label>
            <select
              value={phoneBId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === phoneAId) setPhoneAId(phoneBId);
                setPhoneBId(val);
              }}
              className="bg-background border border-border/80 rounded-xl px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.values(PHONE_DIMENSIONS).map(p => (
                <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* View Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("side-by-side")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === "side-by-side" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Smartphone className="h-4 w-4" /> Side by Side
          </button>
          <button
            onClick={() => setViewMode("overlay")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === "overlay" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Layers className="h-4 w-4" /> Ghost Overlay
          </button>
          <button
            onClick={() => setViewMode("pocket")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === "pocket" ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Shirt className="h-4 w-4" /> Fits in Pocket
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotated(r => !r)}
            className="flex items-center gap-1.5 bg-card border border-border/60 hover:bg-muted px-3.5 py-2 rounded-xl text-xs font-bold text-foreground transition"
          >
            <RotateCw className={`h-4 w-4 transition-transform duration-300 ${isRotated ? "rotate-90 text-primary" : ""}`} />
            <span>{isRotated ? "Landscape (90°)" : "Portrait (0°)"}</span>
          </button>

          <button
            onClick={() => setShowRuler(r => !r)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
              showRuler ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border/60 text-muted-foreground"
            }`}
          >
            <Ruler className="h-4 w-4" /> Ruler Ticks
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {viewMode !== "pocket" ? (
        <div className="relative w-full min-h-[420px] md:min-h-[460px] bg-gradient-to-b from-card to-muted/30 rounded-3xl border border-border/70 p-6 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Ruler Grid Background */}
          {showRuler && (
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute left-6 top-0 bottom-0 w-8 border-r border-dashed border-primary/40 flex flex-col justify-between py-6">
                {[0, 40, 80, 120, 160].map((mm) => (
                  <div key={mm} className="relative flex items-center">
                    <div className="w-3 h-px bg-primary/60" />
                    <span className="ml-1 text-[9px] font-mono text-primary font-bold">{mm}mm</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Side by Side View */}
          {viewMode === "side-by-side" && (
            <div className={`flex items-end justify-center gap-12 md:gap-20 transition-all duration-500 ${isRotated ? "flex-col items-center" : "flex-row"}`}>
              {/* Phone A Render - Clean Image without extra artificial border boxes */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{phoneA.brand}</span>
                  <h4 className="text-sm font-bold text-foreground">{phoneA.name}</h4>
                  <span className="text-[11px] font-semibold text-muted-foreground">{phoneA.heightMm} × {phoneA.widthMm} × {phoneA.thicknessMm} mm</span>
                </div>

                <div
                  className="relative transition-all duration-500 flex items-center justify-center filter drop-shadow-2xl"
                  style={{
                    width: (isRotated ? phoneA.heightMm : phoneA.widthMm) * PIXELS_PER_MM,
                    height: (isRotated ? phoneA.widthMm : phoneA.heightMm) * PIXELS_PER_MM,
                  }}
                >
                  <img
                    src={phoneA.image}
                    alt={phoneA.name}
                    className="w-full h-full object-contain rounded-2xl"
                  />

                  {/* Floating Specs Pill */}
                  <div className="absolute bottom-3 bg-black/85 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-lg backdrop-blur-sm pointer-events-none">
                    {phoneA.screenSizeInches}" ({phoneA.screenToBodyRatio}%)
                  </div>

                  {/* Height Ruler Tag */}
                  {showRuler && (
                    <div className="absolute -right-8 top-0 bottom-0 flex flex-col justify-between items-center text-[9px] font-mono font-bold text-primary pointer-events-none">
                      <span className="bg-background/90 px-1 rounded border border-primary/30 shadow-xs">{phoneA.heightMm}mm</span>
                    </div>
                  )}
                </div>

                <div className="text-center text-xs font-medium text-muted-foreground">
                  Weight: <strong className="text-foreground font-bold">{phoneA.weightG}g</strong>
                </div>
              </div>

              {/* Phone B Render - Clean Image without extra artificial border boxes */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{phoneB.brand}</span>
                  <h4 className="text-sm font-bold text-foreground">{phoneB.name}</h4>
                  <span className="text-[11px] font-semibold text-muted-foreground">{phoneB.heightMm} × {phoneB.widthMm} × {phoneB.thicknessMm} mm</span>
                </div>

                <div
                  className="relative transition-all duration-500 flex items-center justify-center filter drop-shadow-2xl"
                  style={{
                    width: (isRotated ? phoneB.heightMm : phoneB.widthMm) * PIXELS_PER_MM,
                    height: (isRotated ? phoneB.widthMm : phoneB.heightMm) * PIXELS_PER_MM,
                  }}
                >
                  <img
                    src={phoneB.image}
                    alt={phoneB.name}
                    className="w-full h-full object-contain rounded-2xl"
                  />

                  {/* Floating Specs Pill */}
                  <div className="absolute bottom-3 bg-black/85 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-lg backdrop-blur-sm pointer-events-none">
                    {phoneB.screenSizeInches}" ({phoneB.screenToBodyRatio}%)
                  </div>

                  {/* Height Ruler Tag */}
                  {showRuler && (
                    <div className="absolute -right-8 top-0 bottom-0 flex flex-col justify-between items-center text-[9px] font-mono font-bold text-primary pointer-events-none">
                      <span className="bg-background/90 px-1 rounded border border-primary/30 shadow-xs">{phoneB.heightMm}mm</span>
                    </div>
                  )}
                </div>

                <div className="text-center text-xs font-medium text-muted-foreground">
                  Weight: <strong className="text-foreground font-bold">{phoneB.weightG}g</strong>
                </div>
              </div>
            </div>
          )}

          {/* Overlay View (Ghost Mode - Scaled Real Photos) */}
          {viewMode === "overlay" && (
            <div className="relative flex items-center justify-center min-h-[350px]">
              {/* Phone A (Underneath) */}
              <div
                className="absolute transition-all duration-500 opacity-70 filter drop-shadow-xl"
                style={{
                  width: (isRotated ? phoneA.heightMm : phoneA.widthMm) * PIXELS_PER_MM,
                  height: (isRotated ? phoneA.widthMm : phoneA.heightMm) * PIXELS_PER_MM,
                }}
              >
                <img src={phoneA.image} alt={phoneA.name} className="w-full h-full object-contain rounded-2xl" />
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold text-[10px] px-2 py-0.5 rounded-full shadow">
                  {phoneA.name} ({phoneA.heightMm}mm)
                </div>
              </div>

              {/* Phone B (Overlayed with Semi-Transparency) */}
              <div
                className="absolute transition-all duration-500 opacity-80 filter drop-shadow-xl"
                style={{
                  width: (isRotated ? phoneB.heightMm : phoneB.widthMm) * PIXELS_PER_MM,
                  height: (isRotated ? phoneB.widthMm : phoneB.heightMm) * PIXELS_PER_MM,
                }}
              >
                <img src={phoneB.image} alt={phoneB.name} className="w-full h-full object-contain rounded-2xl" />
                <div className="absolute bottom-2 right-2 bg-amber-500 text-black font-bold text-[10px] px-2 py-0.5 rounded-full shadow">
                  {phoneB.name} ({phoneB.heightMm}mm)
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Pocket Visualization Stage */
        <div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-luxe">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Shirt className="h-5 w-5 text-primary" /> Pocket Fit Simulator
              </h3>
              <p className="text-xs text-muted-foreground">Select pocket type to test physical fit and protrusion.</p>
            </div>

            {/* Pocket Type Buttons */}
            <div className="flex items-center gap-2">
              {(["jeansFront", "jeansBack", "jacket"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setPocketType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                    pocketType === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type === "jeansFront" ? "Jeans Front" : type === "jeansBack" ? "Jeans Back" : "Jacket Inner"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone A Pocket Card */}
            <div className="bg-muted/30 rounded-2xl p-5 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{phoneA.brand}</span>
                  <h4 className="text-base font-bold text-foreground">{phoneA.name}</h4>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  phoneA.pocketFit[pocketType].status === "Fits Easily" 
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" 
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}>
                  {phoneA.pocketFit[pocketType].status}
                </span>
              </div>

              {/* Graphic Pocket Outline */}
              <div className="relative h-44 bg-blue-900/10 border-2 border-dashed border-blue-500/40 rounded-b-3xl rounded-t-lg p-4 flex items-end justify-center overflow-hidden">
                <div
                  className="rounded-2xl border border-primary/50 shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden"
                  style={{
                    width: phoneA.widthMm * 1.3,
                    height: phoneA.heightMm * 0.95,
                  }}
                >
                  <img src={phoneA.image} alt={phoneA.name} className="w-full h-full object-contain" />
                </div>
                <div className="absolute top-2 text-[10px] font-mono text-muted-foreground">Pocket Opening</div>
              </div>

              <p className="text-xs text-muted-foreground">{phoneA.pocketFit[pocketType].text}</p>
            </div>

            {/* Phone B Pocket Card */}
            <div className="bg-muted/30 rounded-2xl p-5 border border-border/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{phoneB.brand}</span>
                  <h4 className="text-base font-bold text-foreground">{phoneB.name}</h4>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  phoneB.pocketFit[pocketType].status === "Fits Easily" 
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" 
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}>
                  {phoneB.pocketFit[pocketType].status}
                </span>
              </div>

              {/* Graphic Pocket Outline */}
              <div className="relative h-44 bg-blue-900/10 border-2 border-dashed border-blue-500/40 rounded-b-3xl rounded-t-lg p-4 flex items-end justify-center overflow-hidden">
                <div
                  className="rounded-2xl border border-amber-500/50 shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden"
                  style={{
                    width: phoneB.widthMm * 1.3,
                    height: phoneB.heightMm * 0.95,
                  }}
                >
                  <img src={phoneB.image} alt={phoneB.name} className="w-full h-full object-contain" />
                </div>
                <div className="absolute top-2 text-[10px] font-mono text-muted-foreground">Pocket Opening</div>
              </div>

              <p className="text-xs text-muted-foreground">{phoneB.pocketFit[pocketType].text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Specs Comparison Table */}
      <div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Exact Spec Comparison Table</h3>
              <p className="text-xs text-muted-foreground">Millimeter and gram precision breakdown.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-bold">Dimension Metric</th>
                <th className="py-3 px-4 font-bold text-primary">{phoneA.name}</th>
                <th className="py-3 px-4 font-bold text-primary">{phoneB.name}</th>
                <th className="py-3 px-4 font-bold">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-muted-foreground">Height</td>
                <td className="py-3.5 px-4 font-bold">{phoneA.heightMm} mm</td>
                <td className="py-3.5 px-4 font-bold">{phoneB.heightMm} mm</td>
                <td className="py-3.5 px-4 font-bold text-primary">
                  {diffs.heightDiff > 0 ? `+${diffs.heightDiff} mm taller` : diffs.heightDiff < 0 ? `${diffs.heightDiff} mm shorter` : "Same height"}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-muted-foreground">Width</td>
                <td className="py-3.5 px-4 font-bold">{phoneA.widthMm} mm</td>
                <td className="py-3.5 px-4 font-bold">{phoneB.widthMm} mm</td>
                <td className="py-3.5 px-4 font-bold text-primary">
                  {diffs.widthDiff > 0 ? `+${diffs.widthDiff} mm wider` : diffs.widthDiff < 0 ? `${diffs.widthDiff} mm narrower` : "Same width"}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-muted-foreground">Thickness</td>
                <td className="py-3.5 px-4 font-bold">{phoneA.thicknessMm} mm</td>
                <td className="py-3.5 px-4 font-bold">{phoneB.thicknessMm} mm</td>
                <td className="py-3.5 px-4 font-bold text-primary">
                  {diffs.thicknessDiff > 0 ? `+${diffs.thicknessDiff} mm thicker` : diffs.thicknessDiff < 0 ? `${diffs.thicknessDiff} mm thinner` : "Same thickness"}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-muted-foreground">Weight</td>
                <td className="py-3.5 px-4 font-bold">{phoneA.weightG} g</td>
                <td className="py-3.5 px-4 font-bold">{phoneB.weightG} g</td>
                <td className="py-3.5 px-4 font-bold text-primary">
                  {diffs.weightDiff > 0 ? `+${diffs.weightDiff} g heavier` : diffs.weightDiff < 0 ? `${diffs.weightDiff} g lighter` : "Same weight"}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-muted-foreground">Screen Size</td>
                <td className="py-3.5 px-4 font-bold">{phoneA.screenSizeInches} inches</td>
                <td className="py-3.5 px-4 font-bold">{phoneB.screenSizeInches} inches</td>
                <td className="py-3.5 px-4 font-bold text-primary">
                  {diffs.screenDiff > 0 ? `+${diffs.screenDiff}" larger` : diffs.screenDiff < 0 ? `${diffs.screenDiff}" smaller` : "Same screen size"}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-muted-foreground">Screen-to-Body Ratio</td>
                <td className="py-3.5 px-4 font-bold">{phoneA.screenToBodyRatio}%</td>
                <td className="py-3.5 px-4 font-bold">{phoneB.screenToBodyRatio}%</td>
                <td className="py-3.5 px-4 font-bold text-primary">
                  {diffs.ratioDiff > 0 ? `+${diffs.ratioDiff}% higher` : diffs.ratioDiff < 0 ? `${diffs.ratioDiff}% lower` : "Same ratio"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
