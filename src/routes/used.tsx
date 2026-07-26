import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Battery, Box, Check, FileCheck, Package, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { usedPhones } from "@/data/used";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr } from "@/lib/shop";

export const Route = createFileRoute("/used")({
  head: () => ({
    meta: [
      { title: "Certified Pre-Owned Mobiles — Online Mobiles" },
      { name: "description", content: "Second-hand iPhones, Samsung, OnePlus and more. Battery health verified, IMEI checked, technician tested with warranty." },
      { property: "og:title", content: "Certified Pre-Owned Mobiles — Online Mobiles" },
      { property: "og:description", content: "Verified second-hand phones with warranty." },
      { property: "og:url", content: `${SHOP.siteUrl}/used` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/used` }],
  }),
  component: UsedList,
});

const CONDS = ["Superb", "Excellent", "Good", "Fair"] as const;

function UsedList() {
  const [cond, setCond] = useState<string | null>(null);
  const items = usedPhones.filter((p) => !cond || p.condition === cond);
  return (
    <>
      <PageHeader eyebrow="Second-hand" title="Certified pre-owned mobiles" subtitle="Every phone battery-tested, IMEI-verified and covered by shop warranty." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Used Mobiles" }]} />
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setCond(null)} className={pill(cond === null)}>All</button>
          {CONDS.map((c) => (
            <button key={c} onClick={() => setCond(c)} className={pill(cond === c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.id} to="/used/$id" params={{ id: p.id }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft hover:-translate-y-1 hover:shadow-luxe transition"
          >
            <div className="relative aspect-square overflow-hidden bg-muted/40">
              <img src={p.image} alt={p.model} loading="lazy" className="h-full w-full bg-muted/30 object-contain p-4 transition-transform group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">{p.condition}</span>
              <span className="absolute right-3 top-3 rounded-full bg-success px-2 py-1 text-[10px] font-bold text-white flex items-center gap-1">
                <Battery className="h-3 w-3" /> {p.batteryHealth}%
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-base font-semibold">{p.model}</h3>
              <div className="text-xs text-muted-foreground">{p.storage} · {p.color} · {p.age}</div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className="font-display text-lg font-bold">{inr(p.price)}</div>
                <div className="text-xs text-muted-foreground line-through">{inr(p.originalPrice)}</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                {p.hasBill && <Badge>Bill</Badge>}
                {p.hasBox && <Badge>Box</Badge>}
                {p.hasCharger && <Badge>Charger</Badge>}
                {p.imeiVerified && <Badge>IMEI ✓</Badge>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">{children}</span>;
}
function pill(active: boolean) {
  return `rounded-full border px-4 py-2 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`;
}
