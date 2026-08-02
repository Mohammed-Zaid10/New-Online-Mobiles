import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Wrench, ShieldCheck, Cpu, Instagram, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { repairServices } from "@/data/repair";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { RepairCalculator } from "@/components/site/RepairCalculator";
import { SHOP, wa } from "@/lib/shop";

export const Route = createFileRoute("/repair")({
  head: () => ({
    meta: [
      { title: "Mobile Repair Services & Instant Cost Calculator — Online Mobiles" },
      { name: "description", content: "Calculate instant repair costs and book expert mobile repairs with warranty. Screen, battery, camera, water damage & motherboard repairs." },
      { property: "og:title", content: "Mobile Repair Services & Instant Calculator — Online Mobiles" },
      { property: "og:url", content: `${SHOP.siteUrl}/repair` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/repair` }],
  }),
  component: RepairHub,
});

function RepairHub() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.8), rgba(8,8,8,0.95)), url('/backgrounds/services-bg.jpg')" }}
    >
      {/* Dark Phone Repairing Hero Banner */}
      <section className="relative overflow-hidden bg-[#07060c] text-white py-16 md:py-24 border-b border-amber-500/20">
        {/* Background repair workstation photo with dark vignette */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/backgrounds/services-bg.jpg"
            alt="Phone repairing workstation"
            className="h-full w-full object-cover filter contrast-125 brightness-75 scale-105"
          />
        </div>

        {/* Dark luxury gradient overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#07060c] via-[#07060c]/90 to-[#07060c]/75" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Cpu className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              Microscope Workstation & IC-Level Repairs
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-6xl text-white leading-tight">
              Expert Mobile Repairs.
              <br />
              <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">
                Precision & Original Parts.
              </span>
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              From cracked glass and OLED screen replacements to motherboard soldering, battery changes, and water damage recovery. Written warranty on every single fix.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.5)] transition hover:bg-amber-400 hover:scale-105"
              >
                <Wrench className="h-4 w-4" /> Calculate Repair Cost <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={SHOP.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-pink-400 backdrop-blur-md hover:bg-pink-500/10 transition"
              >
                <Instagram className="h-4 w-4 text-pink-400" /> Watch Repair Reels (@{SHOP.instagramHandle})
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Repair Services" }]} />
      </div>

      {/* Embedded Instant Repair Cost Calculator Section */}
      <section id="calculator" className="mx-auto max-w-7xl px-4 pb-14 md:px-6 scroll-mt-20">
        <RepairCalculator />
      </section>

      {/* Real Shop Repair Showcase Section */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-card to-card/60 p-6 md:p-10 shadow-luxe">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-500">
                <Sparkles className="h-3.5 w-3.5" /> Real Workstation Photos
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                See Our Real Phone Repair Work
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Actual photos from our repair bench in Hyderabad — iPhone back glass replacement, chip-level soldering, and precision microscope repairs.
              </p>
            </div>
            <a
              href={SHOP.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition shrink-0"
            >
              <Instagram className="h-4 w-4" /> Follow @{SHOP.instagramHandle} for live repair videos
            </a>
          </div>

          {/* 3 Real Repair Photos Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {/* Card 1: Shattered Back Glass */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-md transition hover:border-amber-500/50">
              <div className="aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src="/repair-2.png"
                  alt="Shattered iPhone Back Glass before repair"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-500 uppercase tracking-wide">
                  Before Repair
                </div>
                <h4 className="mt-2 font-display font-bold text-base">Cracked / Shattered Back Glass</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Heavy rear glass damage on iPhone Pro series — ready for laser removal & replacement.
                </p>
              </div>
            </div>

            {/* Card 2: Microscope Workstation */}
            <div className="group relative overflow-hidden rounded-2xl border border-amber-500/40 bg-background shadow-md transition hover:border-amber-500">
              <div className="aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src="/repair-1.png"
                  alt="Microscope repair workstation at Online Mobiles"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-500 uppercase tracking-wide">
                  Microscope Workstation
                </div>
                <h4 className="mt-2 font-display font-bold text-base">Precision Hardware Repair</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Specialized stereo microscope station at Online Mobiles for IC soldering & back glass removal.
                </p>
              </div>
            </div>

            {/* Card 3: Pristine New Back Panel */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-md transition hover:border-emerald-500/50">
              <div className="aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src="/repair-3.png"
                  alt="New original iPhone back panel ready for fitting"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-500 uppercase tracking-wide">
                  Original Replacement
                </div>
                <h4 className="mt-2 font-display font-bold text-base">Brand New Panel Fitted</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Genuine OEM finish back glass panel installed with factory-grade seal & written warranty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">All Repair Services</h2>
          <span className="text-xs text-muted-foreground">{repairServices.length} services available</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {repairServices.map((r) => {
            const Icon = (Icons as any)[r.icon] ?? Icons.Wrench;
            return (
              <Link
                key={r.slug}
                to="/repair/$service"
                params={{ service: r.slug }}
                className="group rounded-2xl border border-border/70 bg-card p-6 shadow-soft hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-luxe transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/15 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold group-hover:text-amber-500 transition">{r.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{r.priceRange}</span>
                  <span className="rounded-full bg-muted px-2.5 py-1">{r.time}</span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-500 font-semibold">Warranty {r.warranty}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
