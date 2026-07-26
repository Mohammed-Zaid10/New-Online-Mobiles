import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { repairServices } from "@/data/repair";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/repair")({
  head: () => ({
    meta: [
      { title: "Mobile Repair Services — Screen, Battery, Motherboard & More" },
      { name: "description", content: "12+ expert mobile repair services with warranty. Same-day screen, battery, camera, water damage & motherboard repair." },
      { property: "og:title", content: "Mobile Repair Services — Online Mobiles" },
      { property: "og:url", content: `${SHOP.siteUrl}/repair` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/repair` }],
  }),
  component: RepairHub,
});

function RepairHub() {
  return (
    <>
      <PageHeader eyebrow="Repair services" title="Fix your phone the right way" subtitle="Certified technicians · Genuine parts · Written warranty on every job." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Repair Services" }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {repairServices.map((r) => {
          const Icon = (Icons as any)[r.icon] ?? Icons.Wrench;
          return (
            <Link
              key={r.slug} to="/repair/$service" params={{ service: r.slug }}
              className="group rounded-2xl border border-border/70 bg-card p-6 shadow-soft hover:-translate-y-1 hover:shadow-luxe transition"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{r.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-muted px-2.5 py-1">{r.priceRange}</span>
                <span className="rounded-full bg-muted px-2.5 py-1">{r.time}</span>
                <span className="rounded-full bg-success/15 px-2.5 py-1 text-success">Warranty {r.warranty}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
