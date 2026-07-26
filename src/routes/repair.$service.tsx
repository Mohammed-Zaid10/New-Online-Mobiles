import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Clock, ShieldCheck, Tag } from "lucide-react";
import { getRepair, type RepairService } from "@/data/repair";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/repair/$service")({
  loader: ({ params }): { r: RepairService } => {
    const r = getRepair(params.service);
    if (!r) throw notFound();
    return { r };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Repair Service — Online Mobiles" }] };
    return {
      meta: [
        { title: `${loaderData.r.name} — ${loaderData.r.priceRange}` },
        { name: "description", content: loaderData.r.description },
      ],
    };
  },
  component: RepairDetail,
});

function RepairDetail() {
  const { r } = Route.useLoaderData();
  const Icon = (Icons as any)[r.icon] ?? Icons.Wrench;
  return (
    <>
      <PageHeader eyebrow="Repair" title={r.name} subtitle={r.description} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Repair", to: "/repair" }, { label: r.name }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card p-4"><Tag className="h-4 w-4 text-accent" /><div className="mt-2 text-xs text-muted-foreground">Price range</div><div className="font-display font-bold">{r.priceRange}</div></div>
            <div className="rounded-2xl border border-border/70 bg-card p-4"><Clock className="h-4 w-4 text-accent" /><div className="mt-2 text-xs text-muted-foreground">Estimated time</div><div className="font-display font-bold">{r.time}</div></div>
            <div className="rounded-2xl border border-border/70 bg-card p-4"><ShieldCheck className="h-4 w-4 text-success" /><div className="mt-2 text-xs text-muted-foreground">Warranty</div><div className="font-display font-bold">{r.warranty}</div></div>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Supported brands</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.brands.map((b: string) => (
                <span key={b} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm">{b}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-accent/15 text-accent"><Icon className="h-6 w-6" /></div>
            <div className="mt-4 font-display text-lg font-bold">Book this repair</div>
            <p className="mt-1 text-sm text-muted-foreground">Get a firm quote and time slot in minutes.</p>
            <Link to="/book-repair" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Book Repair</Link>
          </div>
        </div>
      </div>
    </>
  );
}
