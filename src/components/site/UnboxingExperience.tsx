import { useState, useEffect } from "react";
import { Package, ChevronRight, Sparkles, RefreshCcw, Smartphone, Settings, BookOpen, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the unboxing items
const UNBOXING_ITEMS = [
  {
    id: "phone",
    name: "iPhone 17 Pro Max",
    desc: "Titanium design, A19 Pro chip, 48MP Pro camera system.",
    icon: <Smartphone className="h-10 w-10 text-white" />,
    image: "/bundle/iphone.jpg",
    transform: "translate-y-[-180px] scale-110 z-30",
    delay: "delay-[200ms]",
  },
  {
    id: "case",
    name: "MagSafe Clear Case",
    desc: "Thin, light, and easy to grip with built-in magnets.",
    icon: <Fingerprint className="h-10 w-10 text-white" />,
    image: "/bundle/case_clear.jpg",
    transform: "translate-x-[-160px] translate-y-[20px] -rotate-6 z-20",
    delay: "delay-[300ms]",
  },
  {
    id: "cable",
    name: "Braided USB-C Cable",
    desc: "1 meter woven design with fast-charging support.",
    icon: <Settings className="h-10 w-10 text-white" />,
    // We use a custom SVG for the cable below
    image: null,
    transform: "translate-x-[160px] translate-y-[0px] rotate-12 z-20",
    delay: "delay-[400ms]",
  },
  {
    id: "manual",
    name: "Documentation",
    desc: "Quick start guide & regulatory information.",
    icon: <BookOpen className="h-10 w-10 text-white" />,
    // Custom SVG for manual
    image: null,
    transform: "translate-x-[-100px] translate-y-[160px] -rotate-12 z-10",
    delay: "delay-[500ms]",
  },
  {
    id: "sim",
    name: "SIM Ejector Tool",
    desc: "Liquidmetal precision cut SIM tray pin.",
    icon: <Sparkles className="h-10 w-10 text-white" />,
    image: null,
    transform: "translate-x-[120px] translate-y-[140px] rotate-45 z-10",
    delay: "delay-[600ms]",
  },
];

export function UnboxingExperience() {
  const [unboxed, setUnboxed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Auto-activate phone when unboxed
  useEffect(() => {
    if (unboxed) {
      const timer = setTimeout(() => setActiveItem("phone"), 1000);
      return () => clearTimeout(timer);
    } else {
      setActiveItem(null);
    }
  }, [unboxed]);

  const activeData = UNBOXING_ITEMS.find((i) => i.id === activeItem);

  return (
    <div className="relative min-h-[800px] w-full overflow-hidden bg-[#07060c] text-white rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center">
      
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent transition-opacity duration-1000",
        unboxed ? "opacity-100" : "opacity-0"
      )} />

      {/* Header Info */}
      <div className={cn(
        "absolute top-8 left-8 transition-all duration-1000 transform",
        unboxed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          The Unboxing
        </h2>
        <p className="text-white/50 text-sm mt-1">Select an item to view details</p>
      </div>

      {/* Reset Button */}
      {unboxed && (
        <button 
          onClick={() => setUnboxed(false)}
          className="absolute top-8 right-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          <RefreshCcw className="h-4 w-4" /> Reset
        </button>
      )}

      {/* Stage Container */}
      <div className="relative w-full max-w-3xl aspect-square md:aspect-[4/3] flex items-center justify-center mt-12">
        
        {/* The Box Base */}
        <div className={cn(
          "absolute w-[220px] h-[320px] bg-white/5 rounded-2xl border border-white/10 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0",
          unboxed ? "scale-95 opacity-30 shadow-none translate-y-8" : "scale-100 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
        )} onClick={() => !unboxed && setUnboxed(true)}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none" />
        </div>

        {/* The Items */}
        {UNBOXING_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => unboxed && setActiveItem(item.id)}
              className={cn(
                "absolute flex items-center justify-center w-[160px] h-[240px] rounded-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:scale-105",
                unboxed ? item.transform : "translate-x-0 translate-y-0 scale-50 opacity-0 z-0",
                item.delay,
                !unboxed && "delay-0",
                isActive ? "ring-2 ring-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]" : "ring-1 ring-white/10 hover:ring-white/30"
              )}
            >
              {/* Item Visuals */}
              {item.image ? (
                <div className="w-full h-full bg-white/5 rounded-2xl overflow-hidden p-3 backdrop-blur-md">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain filter drop-shadow-xl" />
                </div>
              ) : item.id === "cable" ? (
                <div className="w-full h-full bg-[#111] rounded-2xl p-4 flex items-center justify-center border border-white/5 shadow-inner">
                  {/* Coiled Cable SVG */}
                  <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-white/80 fill-transparent stroke-[4]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20,80 C20,20 80,80 80,20 C80,80 50,80 50,50 C50,20 20,20 20,80 Z" />
                    <rect x="15" y="75" width="10" height="15" rx="2" fill="white" className="stroke-none" />
                    <rect x="75" y="10" width="10" height="15" rx="2" fill="white" className="stroke-none" />
                  </svg>
                </div>
              ) : item.id === "manual" ? (
                <div className="w-full h-full bg-[#e2e8f0] rounded-2xl p-6 flex flex-col items-center justify-center border border-white/20 shadow-xl relative overflow-hidden">
                  <div className="w-12 h-1 bg-black/20 rounded-full mb-8" />
                  <p className="text-black/40 text-[8px] uppercase tracking-widest font-bold text-center leading-tight">Designed by<br/>Online Mobiles<br/>in India</p>
                </div>
              ) : item.id === "sim" ? (
                <div className="w-full h-full bg-[#111] rounded-2xl p-4 flex items-center justify-center border border-white/5 shadow-inner">
                  {/* SIM Tool SVG */}
                  <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
                    <circle cx="50" cy="40" r="15" stroke="#94a3b8" strokeWidth="6" />
                    <line x1="50" y1="55" x2="50" y2="90" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </div>
              ) : null}

              {/* Active Item Indicator */}
              {isActive && (
                <div className="absolute -bottom-6 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
          );
        })}

        {/* The Box Lid */}
        <div className={cn(
          "absolute w-[224px] h-[324px] bg-[#111] rounded-2xl border-t border-l border-white/20 shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-40 cursor-pointer",
          unboxed ? "translate-y-[-100px] scale-110 opacity-0 pointer-events-none" : "translate-y-0 opacity-100 hover:scale-105"
        )} onClick={() => setUnboxed(true)}>
          {/* Logo on Box */}
          <Package className="h-12 w-12 text-white/20 mb-4" />
          <h3 className="text-white/40 font-display font-bold tracking-widest uppercase text-sm">Online Mobiles</h3>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] mt-1">Unbox Experience</p>

          {!unboxed && (
            <div className="absolute bottom-8 flex flex-col items-center animate-pulse">
              <span className="text-xs text-white/50 mb-2 font-semibold tracking-wider">TAP TO UNBOX</span>
              <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                <ChevronRight className="h-3 w-3 text-white/50 -rotate-90" />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Details Panel (Bottom) */}
      <div className={cn(
        "absolute bottom-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-700 transform",
        unboxed && activeData ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      )}>
        {activeData && (
          <div className="max-w-2xl mx-auto flex items-center gap-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-xl">
              {activeData.icon}
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-1">{activeData.name}</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">{activeData.desc}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
