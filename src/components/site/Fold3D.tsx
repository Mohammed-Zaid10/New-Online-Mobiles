import React, { useState, useEffect } from "react";

const STAGES = [
  {
    id: "back",
    label: "01 · Back Camera & Panel",
    title: "Forest Green Back",
    img: "/fold-back.png",
    aspect: "aspect-[2/3]",
  },
  {
    id: "cover",
    label: "02 · Phone Unfolding",
    title: "Unfolding Cover View",
    img: "/fold-cover.png",
    aspect: "aspect-[4/5]",
  },
  {
    id: "inner",
    label: "03 · Galaxy Z Fold Interface",
    title: "Unfolded Main Display",
    img: "/fold-inner.png",
    aspect: "aspect-[4/5]",
  },
];

export function Fold3D() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % STAGES.length);
    }, 2800); // Transitions every 2.8 seconds

    return () => clearInterval(timer);
  }, [isHovered]);

  const activeStage = STAGES[currentStage];

  const handleClick = () => {
    const elem = document.getElementById("samsung-section") || document.getElementById("featured-mobiles");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer select-none py-2 transition-all duration-500 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Click to explore Samsung Galaxy Z Fold & Foldables"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        className="absolute inset-0 -z-10 rounded-full bg-emerald-500/15 blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.35 : 0.18,
          transform: "scale(1.3)",
        }}
      />

      {/* Dynamic Status Badge */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/90 px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-lg backdrop-blur-md transition-all duration-300">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        {activeStage.label}
      </div>

      {/* Frame Container for the 3 Images */}
      <div className="relative w-[280px] h-[330px] sm:w-[320px] sm:h-[370px] flex items-center justify-center overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-950/70 p-4 shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(16,185,129,0.3)]">
        
        {STAGES.map((stage, idx) => {
          const isActive = idx === currentStage;
          return (
            <div
              key={stage.id}
              className={`absolute inset-4 flex items-center justify-center transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
            >
              <img
                src={stage.img}
                alt={stage.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-500"
              />
            </div>
          );
        })}

        {/* Bottom subtle gradient vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />

        {/* Floating title overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-center z-20">
          <div className="text-xs font-bold text-white tracking-wide">{activeStage.title}</div>
          <div className="text-[10px] text-emerald-400/80">Galaxy Z Fold 8 Ultra</div>
        </div>
      </div>

      {/* 3 Step Indicators */}
      <div className="mt-4 flex items-center gap-2">
        {STAGES.map((s, idx) => (
          <button
            key={s.id}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentStage(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentStage
                ? "w-7 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
            title={s.title}
          />
        ))}
      </div>
    </div>
  );
}
