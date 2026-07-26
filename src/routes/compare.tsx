import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { mobiles, type Mobile } from "@/data/mobiles";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr } from "@/lib/shop";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Phones — Online Mobiles" },
      { name: "description", content: "Side-by-side spec comparison between two smartphones." },
      { property: "og:url", content: `${SHOP.siteUrl}/compare` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/compare` }],
  }),
  component: ComparePage,
});

function Picker({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
        {mobiles.map((m) => <option key={m.id} value={m.id}>{m.model}</option>)}
      </select>
    </div>
  );
}

function ComparePage() {
  const [a, setA] = useState(mobiles[0].id);
  const [b, setB] = useState(mobiles[7].id);
  const A = mobiles.find((m) => m.id === a)!;
  const B = mobiles.find((m) => m.id === b)!;

  const rows: { label: string; a: string; b: string }[] = [
    { label: "Price", a: inr(A.price), b: inr(B.price) },
    { label: "Storage", a: A.storage.join(" / "), b: B.storage.join(" / ") },
    { label: "Display", a: A.specs.display, b: B.specs.display },
    { label: "Processor", a: A.specs.processor, b: B.specs.processor },
    { label: "RAM", a: A.specs.ram, b: B.specs.ram },
    { label: "Camera", a: A.specs.camera, b: B.specs.camera },
    { label: "Battery", a: A.specs.battery, b: B.specs.battery },
    { label: "OS", a: A.specs.os, b: B.specs.os },
    { label: "Network", a: A.specs.network, b: B.specs.network },
    { label: "Weight", a: A.specs.weight, b: B.specs.weight },
    { label: "Warranty", a: A.warranty, b: B.warranty },
    { label: "EMI from", a: `${inr(A.emiFrom)}/mo`, b: `${inr(B.emiFrom)}/mo` },
  ];

  return (
    <>
      <PageHeader eyebrow="Tool" title="Compare phones" subtitle="Pick any two phones to see spec-by-spec." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Compare" }]} />
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Picker value={a} onChange={setA} label="Phone A" />
          <Picker value={b} onChange={setB} label="Phone B" />
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-card">
          <div className="grid grid-cols-3 gap-4 border-b border-border/60 p-5">
            <div />
            <PhoneHeader m={A} />
            <PhoneHeader m={B} />
          </div>
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-3 gap-4 border-b border-border/60 p-4 text-sm last:border-b-0">
              <div className="font-medium">{r.label}</div>
              <div className="text-muted-foreground">{r.a}</div>
              <div className="text-muted-foreground">{r.b}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PhoneHeader({ m }: { m: Mobile }) {
  return (
    <div className="text-center">
      <img src={m.images[0]} alt={m.model} className="mx-auto h-28 w-28 rounded-xl object-cover" />
      <div className="mt-2 font-display text-sm font-bold">{m.model}</div>
    </div>
  );
}
