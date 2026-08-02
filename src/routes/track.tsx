import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { STAGES, estimatedReady, stageFor } from "@/lib/trackDemo";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Repair — Online Mobiles" },
      { name: "description", content: "Enter your Repair ID and phone number to see the live status of your repair." },
      { property: "og:url", content: `${SHOP.siteUrl}/track` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/track` }],
  }),
  component: TrackPage,
});

function TrackPage() {
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<{ id: string; phone: string; stage: number } | null>(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.8), rgba(8,8,8,0.95)), url('/backgrounds/services-bg.jpg')" }}
    >
      <PageHeader eyebrow="Repair" title="Track your repair" />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Track" }]} />
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setResult({ id, phone, stage: stageFor(id, phone) }); }}
        className="mx-auto grid max-w-xl gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft sm:grid-cols-2 md:px-6"
      >
        <label className="block"><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Repair ID</div>
          <input required value={id} onChange={(e) => setId(e.target.value)} className={inp} placeholder="OM-123456" />
        </label>
        <label className="block"><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Phone number</div>
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} className={inp} placeholder="+91 ..." />
        </label>
        <button className="sm:col-span-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-luxe hover:opacity-90">Check status</button>
      </form>

      {result && (
        <div className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
          <div className="mt-8 rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <div className="text-sm text-muted-foreground">Repair {result.id}</div>
            <div className="mt-1 font-display text-xl font-bold">Ready by {estimatedReady(result.id)}</div>
            <ol className="mt-6 space-y-3">
              {STAGES.map((s, i) => {
                const done = i <= result.stage;
                const active = i === result.stage;
                return (
                  <li key={s} className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${active ? "border-accent bg-accent/10" : done ? "border-success/50" : "border-border"}`}>
                    {done ? <Check className="h-4 w-4 text-success" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                    <span className={done ? "font-semibold" : "text-muted-foreground"}>{s}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm";
