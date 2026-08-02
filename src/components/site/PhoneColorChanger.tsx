import React, { useState, useRef } from "react";
import { getVariantsForModel, PHONE_VARIANTS, type PhoneColorOption } from "@/data/phoneVariants";
import { Check, Sparkles, Package, ZoomIn, Eye } from "lucide-react";

interface PhoneColorChangerProps {
  modelName: string;
  brandName?: string;
  defaultImage?: string;
  defaultColors?: { name: string; hex: string }[];
  className?: string;
}

export function PhoneColorChanger({
  modelName,
  brandName = "",
  defaultImage = "",
  defaultColors = [],
  className = "",
}: PhoneColorChangerProps) {
  // Try to find extracted catalog variants for this model
  const catalogVariants = getVariantsForModel(modelName);

  // Fallback variants if model not in extracted catalog
  const fallbackVariants: PhoneColorOption[] = defaultColors.map((c, i) => ({
    name: c.name,
    hex: c.hex,
    image: defaultImage,
    stock: 8 - i,
    inStock: true,
  }));

  const variants = catalogVariants.length > 0 ? catalogVariants : fallbackVariants;

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovered: false });

  const activeVariant = variants[selectedIdx] || {
    name: "Standard",
    hex: "#3b82f6",
    image: defaultImage,
    stock: 5,
    inStock: true,
  };

  const handleColorSelect = (index: number) => {
    if (index === selectedIdx) return;
    setIsAnimating(true);
    setSelectedIdx(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div className={`rounded-3xl border border-stone-200 bg-white p-6 shadow-xl transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800/70">
            {brandName} Studio Configurator
          </span>
          <h3 className="font-display text-lg font-bold text-stone-900">{modelName}</h3>
        </div>

        {/* Stock Badge */}
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Package className="h-3.5 w-3.5 text-emerald-600" />
          <span>{activeVariant.stock > 3 ? `In Stock (${activeVariant.stock} units)` : `Only ${activeVariant.stock} left in stock!`}</span>
        </div>
      </div>

      {/* Main Showcase Stage with Zoom & Sheen Animation */}
      <div
        className="relative group aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-stone-50 via-white to-stone-100/60 p-4 cursor-crosshair flex items-center justify-center border border-stone-100 shadow-inner"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle Sheen Reflection Sweep Effect */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform duration-700 ease-out z-10 ${
            isAnimating ? "translate-x-full" : "-translate-x-full"
          }`}
        />

        {/* Ambient Glow matching selected color */}
        <div
          className="absolute inset-1/4 rounded-full blur-3xl opacity-20 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: activeVariant.hex }}
        />

        {/* Phone Image with Zoom on Hover & Smooth Crossfade */}
        <div className="relative h-full w-full flex items-center justify-center">
          <img
            key={activeVariant.image}
            src={activeVariant.image || defaultImage}
            alt={`${modelName} in ${activeVariant.name}`}
            loading="lazy"
            width="800"
            height="800"
            className={`max-h-full max-w-full object-contain transition-all duration-500 ease-out ${
              isAnimating ? "opacity-30 scale-95 blur-[1px]" : "opacity-100 scale-100 blur-0"
            }`}
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: zoomPos.isHovered ? "scale(1.75)" : "scale(1)",
            }}
            onError={(e) => {
              if (defaultImage && e.currentTarget.src !== defaultImage) {
                e.currentTarget.src = defaultImage;
              }
            }}
          />
        </div>

        {/* Hover Zoom Indicator Badge */}
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-stone-900/80 backdrop-blur-md text-white px-3 py-1 text-[11px] font-medium opacity-70 group-hover:opacity-100 transition">
          <ZoomIn className="h-3.5 w-3.5" /> Hover to Inspect
        </div>
      </div>

      {/* Selected Color Label */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500">Selected Color:</span>
          <span className="font-display text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full inline-block" style={{ backgroundColor: activeVariant.hex }} />
            {activeVariant.name}
          </span>
        </div>
        <span className="text-xs text-stone-400 font-mono">{variants.length} finishes available</span>
      </div>

      {/* Circular Swatches Carousel / Grid */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {variants.map((v, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={v.name + idx}
              onClick={() => handleColorSelect(idx)}
              title={`${v.name} (${v.stock} in stock)`}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "ring-2 ring-stone-900 ring-offset-2 scale-110 shadow-md"
                  : "hover:scale-105 hover:shadow-sm opacity-80 hover:opacity-100"
              }`}
            >
              {/* Swatch Circle */}
              <span
                className="h-8 w-8 rounded-full border border-stone-300 shadow-inner transition-transform"
                style={{ backgroundColor: v.hex }}
              />

              {/* Checkmark Icon for Active Selection */}
              {isSelected && (
                <Check
                  className={`absolute h-4 w-4 ${
                    ["#F5F5F0", "#F8FAFC", "#E2E8F0", "#E5DED1", "#FFFFFF"].includes(v.hex.toUpperCase())
                      ? "text-stone-900"
                      : "text-white"
                  }`}
                />
              )}

              {/* Tooltip on Hover */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-900 text-white px-2 py-0.5 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition shadow-lg z-20">
                {v.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
