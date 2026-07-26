import { createFileRoute, notFound } from "@tanstack/react-router";
import { Battery, Check, MessageCircle, ShieldCheck, X } from "lucide-react";
import { getUsed, type UsedPhone } from "@/data/used";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr, wa } from "@/lib/shop";

export const Route = createFileRoute("/used/$id")({
  loader: ({ params }): { p: UsedPhone } => {
    const p = getUsed(params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Used phone — Online Mobiles" }] };
    return {
      meta: [
        { title: `${loaderData.p.model} (Used) — ${inr(loaderData.p.price)}` },
        { name: "description", content: `Certified pre-owned ${loaderData.p.model}, ${loaderData.p.condition} condition, ${loaderData.p.batteryHealth}% battery, ${loaderData.p.warranty}.` },
        { property: "og:image", content: loaderData.p.image },
      ],
    };
  },
  component: UsedDetail,
});

function Row({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3 text-sm">
      {ok ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-destructive" />}
      {label}
    </div>
  );
}

function UsedDetail() {
  const { p } = Route.useLoaderData();
  const msg = `Hi! I'd like to buy the used ${p.model} (${p.storage}, ${p.color}) at ${inr(p.price)}.`;
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <Breadcrumbs items={[{ label: "Used Mobiles", to: "/used" }, { label: p.model }]} />
      </div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2 md:px-6">
        <img src={p.image} alt={p.model} className="aspect-square w-full rounded-3xl border border-border/70 bg-card object-contain p-8 shadow-soft" />
        <div>
          <div className="text-xs uppercase text-muted-foreground">Certified Pre-Owned</div>
          <h1 className="mt-1 font-display text-3xl font-bold">{p.model}</h1>
          <div className="mt-2 text-sm text-muted-foreground">{p.storage} · {p.color} · {p.age}</div>
          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-display text-4xl font-bold">{inr(p.price)}</div>
            <div className="text-lg text-muted-foreground line-through">{inr(p.originalPrice)}</div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Row ok={true} label={`Battery Health ${p.batteryHealth}%`} />
            <Row ok={true} label={`Condition: ${p.condition}`} />
            <Row ok={p.hasBill} label="Original Bill" />
            <Row ok={p.hasBox} label="Original Box" />
            <Row ok={p.hasCharger} label="Charger Included" />
            <Row ok={true} label={p.warranty} />
            <Row ok={p.imeiVerified} label="IMEI Verified" />
            <Row ok={p.technicianTested} label="Tested by Technician" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa(msg)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-luxe hover:opacity-90">Buy Now</a>
            <a href={wa(msg)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-sm font-semibold text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp Inquiry</a>
          </div>
        </div>
      </section>
    </>
  );
}
