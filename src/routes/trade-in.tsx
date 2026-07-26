import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { brands } from "@/data/brands";
import { estimateTradeIn, type TradeInInput } from "@/lib/tradeIn";
import { SHOP, inr, wa } from "@/lib/shop";

export const Route = createFileRoute("/trade-in")({
  head: () => ({
    meta: [
      { title: "Trade-In Value Calculator — Online Mobiles" },
      { name: "description", content: "Get an instant estimate for your old phone by brand, model, condition, battery and storage." },
      { property: "og:url", content: `${SHOP.siteUrl}/trade-in` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/trade-in` }],
  }),
  component: TradeIn,
});

function TradeIn() {
  const [form, setForm] = useState<TradeInInput>({
    brand: "apple",
    model: "iPhone 13",
    condition: "Excellent",
    batteryHealth: 90,
    storage: "128GB",
  });
  const value = estimateTradeIn(form);
  const msg = `Hi! Trade-in estimate — ${form.brand} ${form.model}, ${form.storage}, ${form.condition}, ${form.batteryHealth}% battery. Estimated ${inr(value)}.`;

  return (
    <>
      <PageHeader eyebrow="Tool" title="Trade-in calculator" subtitle="Instant estimate. Actual value confirmed after in-store inspection." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Trade-In" }]} />
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 pb-16 md:grid-cols-[1fr_320px] md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <L label="Brand">
            <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={inp}>
              {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
            </select>
          </L>
          <L label="Model">
            <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className={inp} placeholder="e.g. iPhone 13" />
          </L>
          <L label="Condition">
            <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as any })} className={inp}>
              {["Superb", "Excellent", "Good", "Fair"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </L>
          <L label="Storage">
            <select value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value as any })} className={inp}>
              {["64GB", "128GB", "256GB", "512GB", "1TB"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </L>
          <L label={`Battery health: ${form.batteryHealth}%`}>
            <input type="range" min={50} max={100} value={form.batteryHealth} onChange={(e) => setForm({ ...form, batteryHealth: Number(e.target.value) })} className="w-full" />
          </L>
        </div>
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-amber-400/15 to-rose-500/15 p-6 shadow-soft">
          <Sparkles className="h-6 w-6 text-accent" />
          <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Estimated trade-in value</div>
          <div className="mt-1 font-display text-4xl font-extrabold">{inr(value)}</div>
          <div className="mt-1 text-xs text-muted-foreground">+ ₹2,000 exchange bonus if you buy today.</div>
          <a href={wa(msg)} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Confirm on WhatsApp</a>
        </div>
      </div>
    </>
  );
}
const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm";
function L({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block sm:col-span-1"><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</div>{children}</label>;
}
