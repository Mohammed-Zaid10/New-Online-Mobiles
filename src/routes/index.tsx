import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Wrench, Zap,
  MessageCircle, Star, ChevronRight,
} from "lucide-react";

import { mobiles } from "@/data/mobiles";
import { brands } from "@/data/brands";
import { offers } from "@/data/offers";
import { ProductCard } from "@/components/site/ProductCard";
import { Section } from "@/components/site/Section";
import { SHOP, wa } from "@/lib/shop";
import { Fold3D } from "@/components/site/Fold3D";

/** Simple video element — suppressHydrationWarning silences SSR mismatch for media elements */
function HeroVideo({ className }: { className?: string }) {
  return (
    // @ts-ignore
    <video
      className={className}
      src="/hero-logo-video.mp4"
      autoPlay
      loop
      muted
      playsInline
      suppressHydrationWarning
    />
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online Mobiles — Premium Mobiles, Repairs & Accessories" },
      { name: "description", content: "Buy new iPhones, Samsung, OnePlus, Vivo, Oppo & more. Certified pre-owned phones, expert repairs, accessories, EMI & exchange offers." },
      { property: "og:title", content: "Online Mobiles — Premium Mobiles, Repairs & Accessories" },
      { property: "og:description", content: "Genuine devices, honest prices, warranty on every service." },
      { property: "og:url", content: `${SHOP.siteUrl}/` },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ba4d210a-4094-4f47-827e-889a51622945/id-preview-27f3a78d--f27092da-c492-4639-901d-06963332790e.lovable.app-1784816276683.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ba4d210a-4094-4f47-827e-889a51622945/id-preview-27f3a78d--f27092da-c492-4639-901d-06963332790e.lovable.app-1784816276683.png" },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/` }],
  }),
  component: Home,
});

const perks = [
  { icon: BadgeCheck, title: "100% Genuine", desc: "Authorised distributors only." },
  { icon: Sparkles, title: "Best Prices", desc: "Everyday low prices + EMI." },
  { icon: ShieldCheck, title: "Written Warranty", desc: "On every purchase & repair." },
  { icon: Zap, title: "Same-Day Repairs", desc: "Most fixes done in hours." },
];

function Home() {
  const featured = mobiles.slice(0, 8);
  return (
    <>
      {/* Keynote Hero Section with Podium Background */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#080808] text-white px-4 py-20"
        style={{
          backgroundImage: "url('/backgrounds/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
        }}
      >
        {/* Soft Volumetric Vignette & Gradient Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-8 animate-reveal mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#080808]/70 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-200 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            The Keynote Collection · Online Mobiles
          </div>

          <h1 className="font-display text-5xl font-black uppercase tracking-tight sm:text-7xl lg:text-8xl text-white leading-[1.02] drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            ENGINEERED TO INSPIRE.
          </h1>

          <p className="mx-auto max-w-3xl font-sans text-base sm:text-xl font-medium tracking-wide text-zinc-300 uppercase leading-relaxed border-y border-white/15 py-4 backdrop-blur-sm bg-black/20">
            Flagship Smartphones • Certified Pre-Owned Devices • Accessories • Expert Repairs
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/mobiles"
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-zinc-200 hover:scale-105 transition duration-300"
            >
              Explore Devices <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/phone-finder"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            >
              <Sparkles className="h-4 w-4 text-white" /> AI Phone Finder
            </Link>
            <Link
              to="/trade-in"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition duration-300"
            >
              <Wrench className="h-4 w-4 text-white" /> Phone Health & Trade-In
            </Link>
          </div>

          {/* Keynote Highlights */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="rounded-2xl border border-white/15 bg-black/60 p-5 backdrop-blur-xl">
              <div className="font-display text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-zinc-300 font-medium uppercase tracking-wider mt-1">Authentic Guarantee</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
              <div className="font-display text-3xl font-extrabold text-white">15k+</div>
              <div className="text-xs text-zinc-300 font-medium uppercase tracking-wider mt-1">Delighted Clients</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
              <div className="font-display text-3xl font-extrabold text-white">4.9★</div>
              <div className="text-xs text-zinc-300 font-medium uppercase tracking-wider mt-1">Keynote Rating</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
              <div className="font-display text-3xl font-extrabold text-white">Same-Day</div>
              <div className="text-xs text-zinc-300 font-medium uppercase tracking-wider mt-1">Express Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-6">
          {perks.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands & Galaxy Z Fold */}
      <section id="samsung-section" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Section eyebrow="Shop by brand" title="All the brands you love" subtitle="From flagship iPhones to value-packed Redmi and everything between." />
            <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {brands.map((b) => (
                <Link
                  key={b.slug}
                  to="/mobiles/$brand"
                  params={{ brand: b.slug }}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card p-4 text-center shadow-soft hover:-translate-y-0.5 hover:shadow-luxe transition"
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: b.logoBg }}
                  >
                    <img
                      src={b.logo}
                      alt={b.name}
                      className="h-full w-full object-contain filter invert brightness-200"
                    />
                  </div>
                  <div className="text-sm font-semibold">{b.name}</div>
                  <div className="text-[11px] text-muted-foreground">{b.tagline}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Embedded 3D Galaxy Z Fold 8 Ultra showcase positioned right beside brands */}
          <div className="flex justify-center items-center border-t border-border/40 pt-8 lg:border-t-0 lg:pt-0 lg:pl-6 bg-black rounded-2xl">
            <Fold3D />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section 
        id="featured-mobiles" 
        className="relative mx-auto px-4 py-16 md:px-6 mt-8 overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/backgrounds/featured-bg.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-black/60 dark:bg-black/70 backdrop-blur-[2px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <Section eyebrow="Featured" title="Trending smartphones" />
            <Link to="/mobiles" className="hidden text-sm font-semibold text-accent hover:underline sm:inline-flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((m) => <ProductCard key={m.id} m={m} />)}
          </div>
        </div>
      </section>

      {/* Category promos */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <SlideshowPromoCard
            title="Our Mobile Collection"
            desc="Hundreds of smartphones from top brands — Apple, Samsung, OnePlus, Vivo, Oppo & more at honest prices."
            images={[
              "/shop/shop-accessories-wall.jpg",
              "/shop/shop-used-counter.jpg",
              "/shop/shop-karbonn-jio.jpg",
              "/shop/shop-cases-cables.jpg",
            ]}
            to="/mobiles"
            cta="Shop all mobiles"
          />
          <PromoCard title="Certified Pre-Owned" desc="Glass counter full of quality-checked used phones — Samsung, Oppo & more with price tags & warranty." img="/shop-2.jpg" to="/used" cta="Shop used mobiles" />
          <PromoCard title="Cases & Accessories" desc="Massive wall of phone cases, covers, cables, earbuds, chargers & everything your phone needs." img="/shop-4.jpg" to="/accessories" cta="Browse accessories" />
        </div>
      </section>

      {/* Our Shop Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Section center eyebrow="Visit us in person" title="Step inside our shop" subtitle="12+ years of trusted mobile retail — every shelf stocked with genuine products at honest prices." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { img: "/shop/shop-accessories-wall.jpg", label: "Mobile Showroom", desc: "Branded phones displayed with price & specs" },
            { img: "/shop/shop-used-counter.jpg", label: "Used Phones Counter", desc: "Quality-verified pre-owned phones with price tags" },
            { img: "/shop/shop-karbonn-jio.jpg", label: "Feature Phones & More", desc: "Karbonn, Jio, Nokia & budget phones" },
            { img: "/shop/shop-cases-cables.jpg", label: "Cases & Accessories", desc: "Hundreds of phone cases, cables & earphones" },
          ].map((s) => (
            <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-border/70 shadow-soft hover:shadow-luxe transition">
              <img src={s.img} alt={s.label} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <div className="font-display text-sm font-bold">{s.label}</div>
                <div className="mt-0.5 text-[11px] opacity-80">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden mt-10 rounded-3xl border border-border/60 bg-card/60 p-8 md:p-10">
          {/* Watermark Logo Background */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 flex items-center justify-center opacity-10 dark:opacity-15 z-0">
              <img src="/logo.png" alt="" className="h-[250px] w-[250px] rounded-full object-contain" />
          </div>
          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">About our shop</div>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Your trusted mobile destination since 12+ years</h3>
              <p className="mt-4 text-muted-foreground">
                We are a family-run mobile shop stocking the latest smartphones from Apple, Samsung, Vivo, Oppo, OnePlus, Realme, Xiaomi and more. Every device we sell is 100% genuine from authorised distributors.
              </p>
              <p className="mt-3 text-muted-foreground">
                Whether you need a brand-new flagship, a budget-friendly pre-owned phone, a quick same-day repair or just a quality case and charger — we have it all under one roof with written warranty on everything.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border border-border/70 bg-background p-3">
                  <div className="font-display text-2xl font-bold text-accent">15k+</div>
                  <div className="mt-1 text-xs text-muted-foreground">Happy customers</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background p-3">
                  <div className="font-display text-2xl font-bold text-accent">12+</div>
                  <div className="mt-1 text-xs text-muted-foreground">Years in business</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background p-3">
                  <div className="font-display text-2xl font-bold text-accent">4.9★</div>
                  <div className="mt-1 text-xs text-muted-foreground">Google rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/shop-3.jpg" alt="Inside our mobile shop" className="rounded-2xl object-cover shadow-luxe aspect-square w-full" />
              <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border/70 bg-card p-4 shadow-luxe md:block">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Open today — walk in welcome
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">Genuine products · Written warranty · EMI available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers strip */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Section eyebrow="Save more" title="Today's live offers" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {offers.slice(0, 3).map((o) => (
            <Link
              key={o.slug}
              to="/offers"
              className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br ${o.color} p-6 shadow-soft hover:shadow-luxe transition`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">{o.tagline}</div>
              <h3 className="mt-1 font-display text-2xl font-bold">{o.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                {o.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Section center eyebrow="Loved locally" title="Trusted by thousands of customers" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { name: "Ravi K.", quote: "Got my iPhone 13 screen replaced in 45 minutes with 6 months warranty. Fair price too.", stars: 5 },
            { name: "Anita S.", quote: "Bought a certified pre-owned S22 Ultra — looked brand new and came in original box.", stars: 5 },
            { name: "Mahesh B.", quote: "Best exchange value in the area and they set up my new phone completely before I left.", stars: 5 },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm">{t.quote}</p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-muted font-semibold">{t.name.charAt(0)}</div>
                <div className="font-semibold">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-luxe md:p-14">
          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">Not sure which phone to pick?</h3>
              <p className="mt-2 max-w-xl opacity-90">Compare specs side-by-side or WhatsApp us — a real human replies in minutes.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/compare" className="rounded-full bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary hover:opacity-90">Compare phones</Link>
              <Link to="/trade-in" className="rounded-full border border-primary-foreground/60 px-5 py-3 text-sm font-semibold hover:bg-primary-foreground/10">Trade-in value</Link>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
        </div>
      </section>

    </>
  );
}

function PromoCard({ title, desc, img, to, cta }: { title: string; desc: string; img: string; to: string; cta: string }) {
  return (
    <Link to={to as any} className="group relative overflow-hidden rounded-2xl border border-border/70 shadow-soft hover:shadow-luxe transition">
      <img src={img} alt={title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm opacity-90">{desc}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
          {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function SlideshowPromoCard({ title, desc, images, to, cta }: { title: string; desc: string; images: string[]; to: string; cta: string }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [current, images.length]);

  return (
    <Link to={to as any} className="group relative overflow-hidden rounded-2xl border border-border/70 shadow-soft hover:shadow-luxe transition">
      {/* Outgoing image fades out */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt={title}
          className="absolute inset-0 h-64 w-full object-cover animate-fade-out"
        />
      )}
      {/* Current image fades in */}
      <img
        key={`cur-${current}`}
        src={images[current]}
        alt={title}
        className="h-64 w-full object-cover animate-fade-in"
      />
      {/* Dot indicators */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm opacity-90">{desc}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
          {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
