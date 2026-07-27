import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Clock, ShieldCheck, Tag, Cpu, Instagram, Wrench } from "lucide-react";
import { getRepair, type RepairService } from "@/data/repair";
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
      {/* Dark Repair Header with Background Phone Repairing Workstation */}
      <section className="relative overflow-hidden bg-[#07060c] text-white py-14 border-b border-amber-500/20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/repair-1.png"
            alt="Phone repairing workstation background"
            className="h-full w-full object-cover filter contrast-125 brightness-75 scale-105"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#07060c] via-[#07060c]/90 to-[#07060c]/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 text-amber-400" />
            Certified Technicians · Hyderabad Workstation
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl text-white">
            {r.name}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300 text-base">
            {r.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Repair", to: "/repair" }, { label: r.name }]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Key specs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <Tag className="h-5 w-5 text-amber-500" />
              <div className="mt-2 text-xs text-muted-foreground">Price range</div>
              <div className="font-display font-bold text-lg">{r.priceRange}</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <Clock className="h-5 w-5 text-amber-500" />
              <div className="mt-2 text-xs text-muted-foreground">Estimated time</div>
              <div className="font-display font-bold text-lg">{r.time}</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <div className="mt-2 text-xs text-muted-foreground">Warranty</div>
              <div className="font-display font-bold text-lg text-emerald-500">{r.warranty}</div>
            </div>
          </div>

          {/* Supported Brands */}
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Supported Brands & Models</h2>
            <p className="mt-1 text-sm text-muted-foreground">We stock genuine parts for all major brand flagships and mid-range devices.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.brands.map((b: string) => (
                <span key={b} className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium">{b}</span>
              ))}
            </div>
          </div>

          {/* Real Workstation Photo Feature */}
          <div className="rounded-2xl border border-amber-500/30 bg-card p-6 shadow-soft">
            <h3 className="font-display font-bold text-lg">Our Workstation & Technology</h3>
            <p className="mt-1 text-sm text-muted-foreground">Every repair is conducted under high-power magnification stereo microscopes to protect sensitive circuit boards.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-border aspect-video bg-slate-950">
                <img src="/repair-1.png" alt="Workstation microscope repair" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl border border-border aspect-video bg-slate-950">
                <img src="/repair-3.png" alt="New back glass panel fitting" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Booking Card */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-amber-500/40 bg-card p-6 shadow-luxe space-y-4">
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-amber-500/15 text-amber-500">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">Book {r.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">Instant confirmation via WhatsApp & Email.</p>
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Written warranty provided
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" /> Free diagnosis & price quote
              </div>
            </div>

            <Link
              to="/book-repair"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition"
            >
              <Wrench className="h-4 w-4" /> Book Repair Now
            </Link>

            <a
              href={SHOP.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2.5 text-xs font-semibold text-pink-400 hover:bg-pink-500/20 transition"
            >
              <Instagram className="h-3.5 w-3.5 text-pink-400" /> Watch Reel @{SHOP.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
