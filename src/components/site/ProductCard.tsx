import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Mobile } from "@/data/mobiles";
import { inr } from "@/lib/shop";

export function ProductCard({ m }: { m: Mobile }) {
  return (
    <Link
      to="/mobiles/$brand/$model"
      params={{ brand: m.brand, model: m.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxe"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={m.images[0]}
          alt={m.model}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80";
          }}
        />

        {m.mrp && m.mrp > m.price && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-destructive-foreground">
            {Math.round((1 - m.price / m.mrp) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {m.brand === "google" ? "Google" : m.brand.charAt(0).toUpperCase() + m.brand.slice(1)}
        </div>
        <h3 className="mt-0.5 font-display text-base font-semibold leading-tight">{m.model}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {m.rating.toFixed(1)} ({m.reviews})
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <div className="font-display text-lg font-bold">{inr(m.price)}</div>
          {m.mrp && m.mrp > m.price && (
            <div className="text-xs text-muted-foreground line-through">{inr(m.mrp)}</div>
          )}
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">EMI from {inr(m.emiFrom)}/mo</div>
      </div>
    </Link>
  );
}
