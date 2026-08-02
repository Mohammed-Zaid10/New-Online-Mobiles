import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { softwareServices } from "@/data/software";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, wa } from "@/lib/shop";

export const Route = createFileRoute("/software")({
  head: () => ({
    meta: [
      { title: "Mobile Software Services — Flashing, Unlock, Recovery" },
      { name: "description", content: "Android flashing, iPhone restore, FRP unlock, MI unlock, data recovery, backup and more software services." },
      { property: "og:url", content: `${SHOP.siteUrl}/software` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/software` }],
  }),
  component: SoftwarePage,
});

function SoftwarePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.7), rgba(8,8,8,0.95)), url('/backgrounds/services-bg.jpg')" }}
    >
      <PageHeader eyebrow="Software" title="Mobile software services" subtitle="From FRP unlock to full data recovery — safe, legal and fast." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Software Services" }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {softwareServices.map((s) => {
          const Icon = (Icons as any)[s.icon] ?? Icons.Settings;
          return (
            <div key={s.slug} className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-muted px-2.5 py-1">{s.price}</span>
                <span className="rounded-full bg-muted px-2.5 py-1">{s.time}</span>
              </div>
              <a href={wa(`Hi! I need help with ${s.name}.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-success px-4 py-2 text-xs font-semibold text-white hover:opacity-90">Request via WhatsApp</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
