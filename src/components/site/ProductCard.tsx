import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Mobile } from "@/data/mobiles";
import { getVariantsForModel } from "@/data/phoneVariants";
import { inr } from "@/lib/shop";

export function ProductCard({ m }: { m: Mobile }) {
  const catalogVariants = getVariantsForModel(m.model);
  const colors = catalogVariants.length > 0
    ? catalogVariants
    : m.colors.map(c => ({ name: c.name, hex: c.hex, image: m.images[0] }));

  const [activeColorIdx, setActiveColorIdx] = useState(0);

  const activeImage = colors[activeColorIdx]?.image || m.images[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        to="/mobiles/$brand/$model"
        params={{ brand: m.brand, model: m.slug }}
        className="relative aspect-square overflow-hidden bg-stone-50 p-4 block"
      >
        <img
          key={activeImage}
          src={activeImage}
          alt={m.model}
          loading="lazy"
          className="h-full w-full object-contain transition-all duration-300 group-hover:scale-105"
        />

        {m.mrp && m.mrp > m.price && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-800 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {Math.round((1 - m.price / m.mrp) * 100)}% OFF
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
            {m.brand === "google" ? "Google" : m.brand.charAt(0).toUpperCase() + m.brand.slice(1)}
          </div>

          {/* Mini Color Swatches */}
          {colors.length > 1 && (
            <div className="flex items-center gap-1">
              {colors.slice(0, 4).map((c, idx) => (
                <button
                  key={c.name + idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveColorIdx(idx);
                  }}
                  title={c.name}
                  className={`h-3.5 w-3.5 rounded-full border border-stone-400 shadow-xs transition-all ${
                    idx === activeColorIdx ? "ring-2 ring-stone-900 scale-110 shadow-sm" : "hover:scale-110 opacity-75"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-[10px] text-stone-400 font-medium">+{colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        <Link
          to="/mobiles/$brand/$model"
          params={{ brand: m.brand, model: m.slug }}
          className="mt-1 font-display text-base font-bold text-stone-900 leading-tight hover:text-amber-800 transition"
        >
          {m.model}
        </Link>

        <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-stone-800">{m.rating.toFixed(1)}</span>
          <span>({m.reviews})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <div className="font-display text-lg font-bold text-stone-900">{inr(m.price)}</div>
          {m.mrp && m.mrp > m.price && (
            <div className="text-xs text-stone-400 line-through">{inr(m.mrp)}</div>
          )}
        </div>
        <div className="mt-1 text-[11px] text-stone-500">EMI from {inr(m.emiFrom)}/mo</div>
      </div>
    </div>
  );
}
