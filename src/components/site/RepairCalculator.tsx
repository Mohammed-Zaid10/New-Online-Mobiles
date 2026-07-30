import React, { useState, useMemo } from "react";
import { 
  Wrench, Smartphone, Battery, Volume2, Zap, Camera, Droplet, Layers, Cpu,
  Clock, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, AlertCircle, MessageCircle
} from "lucide-react";
import { inr, wa } from "@/lib/shop";
import { Link } from "@tanstack/react-router";

export interface RepairProblem {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  baseCost: number; // base cost in INR
  flagshipMultiplier: number;
  repairTime: string;
  warranty: string;
}

export const REPAIR_PROBLEMS: RepairProblem[] = [
  {
    id: "screen",
    name: "Screen Replacement",
    icon: Smartphone,
    description: "Cracked glass, dead touch, OLED lines, or black display.",
    baseCost: 1999,
    flagshipMultiplier: 4.8,
    repairTime: "30 – 60 Mins",
    warranty: "6 Months Warranty"
  },
  {
    id: "battery",
    name: "Battery Replacement",
    icon: Battery,
    description: "Fast draining battery, random shutdowns, or battery swelling.",
    baseCost: 1299,
    flagshipMultiplier: 2.2,
    repairTime: "30 – 45 Mins",
    warranty: "6 Months Warranty"
  },
  {
    id: "speaker",
    name: "Speaker Repair",
    icon: Volume2,
    description: "Low volume, crackling noise, muffled ear-piece, or silent speaker.",
    baseCost: 799,
    flagshipMultiplier: 1.8,
    repairTime: "30 – 60 Mins",
    warranty: "3 Months Warranty"
  },
  {
    id: "charging-port",
    name: "Charging Port Repair",
    icon: Zap,
    description: "Loose charging cable, slow charging, or no power connection.",
    baseCost: 899,
    flagshipMultiplier: 2.0,
    repairTime: "45 – 90 Mins",
    warranty: "3 Months Warranty"
  },
  {
    id: "camera",
    name: "Camera Repair",
    icon: Camera,
    description: "Blurry camera lens, autofocus failure, black camera app screen.",
    baseCost: 1499,
    flagshipMultiplier: 3.5,
    repairTime: "45 – 90 Mins",
    warranty: "3 Months Warranty"
  },
  {
    id: "water-damage",
    name: "Water Damage Service",
    icon: Droplet,
    description: "Liquid exposure, corrosion cleaning, ultrasonic motherboard wash.",
    baseCost: 1999,
    flagshipMultiplier: 2.5,
    repairTime: "24 – 48 Hours",
    warranty: "1 Month Warranty"
  },
  {
    id: "back-glass",
    name: "Back Glass Replacement",
    icon: Layers,
    description: "Shattered or cracked rear glass panel, laser removal.",
    baseCost: 1499,
    flagshipMultiplier: 3.0,
    repairTime: "60 – 120 Mins",
    warranty: "3 Months Warranty"
  },
  {
    id: "motherboard",
    name: "Motherboard Repair",
    icon: Cpu,
    description: "Dead phone, no boot, power IC micro-soldering, short circuit rework.",
    baseCost: 3499,
    flagshipMultiplier: 4.2,
    repairTime: "48 – 72 Hours",
    warranty: "3 Months Warranty"
  }
];

export interface PhoneBrandModels {
  brand: string;
  models: { name: string; tier: "budget" | "mid" | "flagship" }[];
}

export const PHONE_BRANDS: PhoneBrandModels[] = [
  {
    brand: "Apple",
    models: [
      { name: "iPhone 16 Pro Max", tier: "flagship" },
      { name: "iPhone 16 Pro", tier: "flagship" },
      { name: "iPhone 16", tier: "mid" },
      { name: "iPhone 15 Pro Max", tier: "flagship" },
      { name: "iPhone 15", tier: "mid" },
      { name: "iPhone 14 Pro Max", tier: "flagship" },
      { name: "iPhone 14", tier: "mid" },
      { name: "iPhone 13", tier: "mid" },
      { name: "iPhone 12", tier: "budget" },
      { name: "iPhone 11", tier: "budget" }
    ]
  },
  {
    brand: "Samsung",
    models: [
      { name: "Galaxy S25 Ultra", tier: "flagship" },
      { name: "Galaxy S24 Ultra", tier: "flagship" },
      { name: "Galaxy S24 / S24+", tier: "flagship" },
      { name: "Galaxy Z Fold 6", tier: "flagship" },
      { name: "Galaxy Z Flip 6", tier: "flagship" },
      { name: "Galaxy A55 5G", tier: "mid" },
      { name: "Galaxy A35 5G", tier: "mid" },
      { name: "Galaxy A15 5G", tier: "budget" },
      { name: "Galaxy S23 FE", tier: "mid" }
    ]
  },
  {
    brand: "Google",
    models: [
      { name: "Pixel 9 Pro XL", tier: "flagship" },
      { name: "Pixel 9 Pro", tier: "flagship" },
      { name: "Pixel 9", tier: "mid" },
      { name: "Pixel 8 Pro", tier: "flagship" },
      { name: "Pixel 8a", tier: "mid" },
      { name: "Pixel 7a", tier: "budget" }
    ]
  },
  {
    brand: "OnePlus",
    models: [
      { name: "OnePlus 12", tier: "flagship" },
      { name: "OnePlus 12R", tier: "mid" },
      { name: "OnePlus 11 5G", tier: "flagship" },
      { name: "OnePlus Nord 4", tier: "mid" },
      { name: "OnePlus Nord CE 4", tier: "budget" }
    ]
  },
  {
    brand: "Vivo",
    models: [
      { name: "Vivo X100 Pro", tier: "flagship" },
      { name: "Vivo V40 Pro", tier: "mid" },
      { name: "Vivo V30 5G", tier: "mid" },
      { name: "Vivo Y200 5G", tier: "budget" }
    ]
  },
  {
    brand: "Nothing",
    models: [
      { name: "Nothing Phone (2a) Plus", tier: "mid" },
      { name: "Nothing Phone (2a)", tier: "mid" },
      { name: "Nothing Phone (2)", tier: "flagship" },
      { name: "CMF Phone 1", tier: "budget" }
    ]
  },
  {
    brand: "Xiaomi",
    models: [
      { name: "Xiaomi 14 Ultra", tier: "flagship" },
      { name: "Xiaomi 14", tier: "flagship" },
      { name: "Redmi Note 13 Pro+", tier: "mid" },
      { name: "Redmi Note 13 5G", tier: "budget" }
    ]
  }
];

export function RepairCalculator() {
  const [selectedBrand, setSelectedBrand] = useState<string>("Apple");
  const [selectedModel, setSelectedModel] = useState<string>("iPhone 16 Pro Max");
  const [selectedProblemId, setSelectedProblemId] = useState<string>("screen");

  const currentBrandObj = PHONE_BRANDS.find(b => b.brand === selectedBrand) || PHONE_BRANDS[0];
  
  // Model list for selected brand
  const modelOptions = currentBrandObj.models;
  const currentModelObj = modelOptions.find(m => m.name === selectedModel) || modelOptions[0];

  const selectedProblem = REPAIR_PROBLEMS.find(p => p.id === selectedProblemId) || REPAIR_PROBLEMS[0];

  // Dynamic cost calculation based on tier and problem
  const estimatedCost = useMemo(() => {
    const tierMultiplier = currentModelObj.tier === "flagship" 
      ? selectedProblem.flagshipMultiplier 
      : currentModelObj.tier === "mid" 
      ? 1.7 
      : 1.0;
    return Math.round(selectedProblem.baseCost * tierMultiplier);
  }, [selectedProblem, currentModelObj]);

  // WhatsApp message for booking
  const whatsappMsg = `Hi, I checked the Repair Cost Calculator on Online Mobiles. I want to book a repair:\n- Brand: ${selectedBrand}\n- Model: ${currentModelObj.name}\n- Problem: ${selectedProblem.name}\n- Estimated Cost: ${inr(estimatedCost)}\n- Repair Time: ${selectedProblem.repairTime}\n- Warranty: ${selectedProblem.warranty}`;
  const whatsappLink = wa(whatsappMsg);

  return (
    <div className="w-full space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/80 p-6 rounded-3xl border border-border/70 shadow-luxe backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Wrench className="h-4 w-4" /> Instant Repair Calculator
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Mobile Repair Cost Estimator</h2>
          <p className="text-sm text-muted-foreground mt-1">Select your phone brand, model, and issue to get an instant cost & turnaround estimate.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-2 text-xs font-semibold text-primary flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Free 6-Month Warranty Included
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Animated Result (12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Selections (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Brand & Model */}
          <div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Smartphone className="h-4 w-4 text-primary" /> Step 1: Select Brand & Model
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Brand Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Select Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    const brand = e.target.value;
                    setSelectedBrand(brand);
                    const firstModel = (PHONE_BRANDS.find(b => b.brand === brand) || PHONE_BRANDS[0]).models[0].name;
                    setSelectedModel(firstModel);
                  }}
                  className="w-full bg-background border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {PHONE_BRANDS.map(b => (
                    <option key={b.brand} value={b.brand}>{b.brand}</option>
                  ))}
                </select>
              </div>

              {/* Model Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Select Model</label>
                <select
                  value={currentModelObj.name}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-background border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {modelOptions.map(m => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Select Problem / Issue */}
          <div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Wrench className="h-4 w-4 text-primary" /> Step 2: Select Problem / Issue
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REPAIR_PROBLEMS.map((problem) => {
                const Icon = problem.icon;
                const isSelected = selectedProblemId === problem.id;
                return (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblemId(problem.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/10 border-primary text-foreground shadow-md ring-1 ring-primary"
                        : "bg-muted/30 border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground leading-snug">{problem.name}</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">{problem.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Animated Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-card via-card to-primary/5 border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-luxe relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{selectedBrand} {currentModelObj.name}</span>
                <h3 className="text-lg font-bold text-foreground">Estimated Repair Summary</h3>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5 animate-spin-slow" />
              </div>
            </div>

            {/* Estimated Cost Highlight */}
            <div className="bg-background/80 rounded-2xl p-6 border border-border/60 text-center space-y-1 shadow-inner">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estimated Repair Cost</span>
              <div className="text-4xl sm:text-5xl font-black text-primary font-display tracking-tight transition-all duration-300">
                {inr(estimatedCost)}
              </div>
              <span className="text-[11px] text-muted-foreground block pt-1">Inclusive of original parts & technician labor</span>
            </div>

            {/* Turnaround Time & Warranty Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" /> Repair Time
                </div>
                <span className="text-sm font-bold text-foreground font-mono block">{selectedProblem.repairTime}</span>
              </div>

              <div className="bg-muted/40 p-4 rounded-2xl border border-border/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> Warranty
                </div>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono block">{selectedProblem.warranty}</span>
              </div>
            </div>

            {/* Selected Problem Overview */}
            <div className="bg-muted/20 p-4 rounded-2xl border border-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {selectedProblem.name}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedProblem.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition-all transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Book Repair via WhatsApp
              </a>

              <Link
                to="/book-repair"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition-all transform hover:scale-[1.02]"
              >
                Book Online Repair <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
