import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  BadgeCheck, Battery, Camera, Check, Cpu, MessageCircle, ShieldCheck,
  Smartphone, Star, Wifi, Zap, ChevronLeft, ChevronRight, Package,
  Truck, RotateCcw, Award, ArrowRight, Heart, Share2, Maximize2
} from "lucide-react";
import { brands } from "@/data/brands";
import { brandMobiles, getMobile, mobiles, type Mobile } from "@/data/mobiles";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { PhoneColorChanger } from "@/components/site/PhoneColorChanger";
import { SHOP, inr, wa } from "@/lib/shop";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mobiles/$brand/$model")({
  loader: ({ params }): { brand: typeof brands[number]; product: NonNullable<ReturnType<typeof getMobile>>; similar: ReturnType<typeof brandMobiles> } => {
    const brand = brands.find((b) => b.slug === params.brand);
    const product = getMobile(params.brand, params.model);
    if (!brand || !product) throw notFound();
    const similar = brandMobiles(params.brand).filter((m) => m.slug !== params.model).slice(0, 4);
    return { brand, product, similar };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Product — Online Mobiles" }] };
    const p = loaderData.product;
    const title = `${p.model} — ${inr(p.price)} | Online Mobiles`;
    const desc = `Buy ${loaderData.brand.name} ${p.model} at ${inr(p.price)}. ${p.highlights.slice(0, 2).join(". ")}. EMI from ${inr(p.emiFrom)}/mo. ${p.warranty}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:image", content: p.images[0] },
        { property: "og:url", content: `${SHOP.siteUrl}/mobiles/${params.brand}/${params.model}` },
      ],
      links: [{ rel: "canonical", href: `${SHOP.siteUrl}/mobiles/${params.brand}/${params.model}` }],
    };
  },
  component: ProductPage,
});

const SPEC_ICONS: Record<string, any> = {
  display: Smartphone, processor: Cpu, ram: Cpu, camera: Camera,
  battery: Battery, os: Smartphone, network: Wifi, weight: Package,
};

const SPEC_LABELS: Record<string, string> = {
  display: "Display", processor: "Processor", ram: "RAM",
  camera: "Camera System", battery: "Battery", os: "Operating System",
  network: "Connectivity", weight: "Weight",
};

// Fake but realistic reviews for demo
const REVIEWS = [
  { id: 1, name: "Arjun Sharma", rating: 5, date: "2 weeks ago", verified: true, title: "Absolutely stunning device!", body: "The build quality and performance are top-notch. Camera results are incredible in all lighting conditions. Highly recommended for photography enthusiasts.", avatar: "AS" },
  { id: 2, name: "Priya Mehta", rating: 5, date: "1 month ago", verified: true, title: "Worth every rupee", body: "Battery life is exceptional — easily lasts a full day with heavy usage. Display is gorgeous and the smooth 120Hz makes everything buttery.", avatar: "PM" },
  { id: 3, name: "Rohan Kapoor", rating: 4, date: "3 weeks ago", verified: true, title: "Great phone, minor nitpick", body: "Performance is blazing fast with no heating issues. Only wish it came with a charger in the box, but otherwise it's perfect.", avatar: "RK" },
  { id: 4, name: "Sneha Iyer", rating: 5, date: "1 week ago", verified: true, title: "Exceeded my expectations", body: "Switched from a different brand and this is leagues ahead. The UI is polished and the camera zooms are truly impressive.", avatar: "SI" },
];

// Sample accessories
const ACCESSORIES = [
  { id: "acc1", name: "Clear Case", desc: "Show off your colour", price: 1499, image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&q=80" },
  { id: "acc2", name: "Tempered Glass Screen Guard", desc: "9H hardness, anti-glare", price: 599, image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400&q=80" },
  { id: "acc3", name: "65W Fast Charger", desc: "GaN Technology, foldable plug", price: 1999, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80" },
  { id: "acc4", name: "Leather Flip Cover", desc: "Premium vegan leather", price: 2199, image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&q=80" },
];

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function ProductPage() {
  const { brand, product, similar } = Route.useLoaderData();
  const [imgIdx, setImgIdx] = useState(0);
  const [storage, setStorage] = useState(product.storage[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [wishlisted, setWishlisted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);

  // Recently viewed (persist in localStorage)
  useEffect(() => {
    try {
      const key = "om_recently_viewed";
      const current = JSON.parse(localStorage.getItem(key) || "[]");
      const filtered = current.filter((id: string) => id !== product.id);
      const updated = [product.id, ...filtered].slice(0, 8);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {}
  }, [product.id]);

  const [recentlyViewed, setRecentlyViewed] = useState<Mobile[]>([]);
  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem("om_recently_viewed") || "[]");
      const phones = ids
        .filter((id: string) => id !== product.id)
        .map((id: string) => mobiles.find((m) => m.id === id))
        .filter(Boolean)
        .slice(0, 4);
      setRecentlyViewed(phones);
    } catch (e) {}
  }, [product.id]);

  // Sticky Buy bar — show when hero buy button scrolls out of view
  useEffect(() => {
    const onScroll = () => {
      if (!buyRef.current) return;
      const rect = buyRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waMsg = `Hi! I'm interested in the ${product.model} (${storage}, ${color}) at ${inr(product.price)}.`;
  const discount = product.mrp && product.mrp > product.price
    ? Math.round((1 - product.price / product.mrp) * 100)
    : 0;

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const specSection = useIntersection(0.15);
  const reviewSection = useIntersection(0.15);
  const featureSection = useIntersection(0.15);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-white" style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.85), rgba(8,8,8,0.95)), url('/backgrounds/shop-bg.jpg')" }}>

      {/* ─── Sticky Buy Now Bar ─── */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-[#E8E2DC] bg-white/95 backdrop-blur-xl shadow-sm transition-all duration-300",
          showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <img src={product.images[0]} alt="" className="h-10 w-10 rounded-xl object-contain bg-[#F2EDE8] p-1" />
            <div className="min-w-0">
              <div className="font-display text-sm font-bold truncate">{product.model}</div>
              <div className="text-xs text-[#8C6D5A]">{storage} · {color}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-display text-lg font-bold text-[#2D1F17]">{inr(product.price)}</div>
            <a
              href={wa(waMsg)}
              target="_blank" rel="noreferrer"
              className="rounded-full bg-[#6B4F3B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5A3F2E] transition-all active:scale-95"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* ─── Breadcrumbs ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        <Breadcrumbs items={[
          { label: "New Mobiles", to: "/mobiles" },
          { label: brand.name, to: "/mobiles/$brand" as any },
          { label: product.model },
        ]} />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:gap-16 items-start">

          {/* Left — Phone Color Configurator Stage */}
          <div>
            <PhoneColorChanger
              modelName={product.model}
              brandName={brand.name}
              defaultImage={product.images[0]}
              defaultColors={product.colors}
            />
          </div>

          {/* Right — Product Info */}
          <div className="space-y-6 lg:sticky lg:top-[80px]">
            {/* Brand badge + wishlist */}
            <div className="flex items-start justify-between">
              <span className="inline-block rounded-full border border-[#E8E2DC] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8C6D5A]">
                {brand.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWishlisted(v => !v)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
                    wishlisted
                      ? "border-rose-400 bg-rose-50 text-rose-500"
                      : "border-[#E8E2DC] bg-white text-[#8C6D5A] hover:border-rose-300"
                  )}
                >
                  <Heart className={cn("h-4 w-4", wishlisted && "fill-rose-500")} />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E2DC] bg-white text-[#8C6D5A] hover:border-[#C4A88A] transition-all">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Title + Rating */}
            <div>
              <h1 className="font-display text-3xl font-bold text-[#2D1F17] leading-tight sm:text-4xl">{product.model}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={cn("h-4 w-4", s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-[#E8E2DC] text-[#E8E2DC]")} />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-[#2D1F17]">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-[#8C6D5A]">({product.reviews} verified reviews)</span>
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  product.inStock
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                )}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", product.inStock ? "bg-emerald-500" : "bg-red-500")} />
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="rounded-2xl border border-[#E8E2DC] bg-white p-5 shadow-sm space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="font-display text-4xl font-black text-[#2D1F17]">{inr(product.price)}</div>
                {product.mrp && product.mrp > product.price && (
                  <>
                    <div className="text-lg text-[#C4A88A] line-through">{inr(product.mrp)}</div>
                    <div className="rounded-full bg-[#6B4F3B]/10 px-2.5 py-0.5 text-xs font-bold text-[#6B4F3B]">
                      Save {inr(product.mrp - product.price)}
                    </div>
                  </>
                )}
              </div>
              <div className="text-sm text-[#8C6D5A]">
                EMI from <span className="font-bold text-[#2D1F17]">{inr(product.emiFrom)}/mo</span> · No-cost EMI on select cards
              </div>
            </div>

            {/* Storage Picker */}
            <div>
              <div className="mb-2.5 text-xs font-bold uppercase tracking-widest text-[#8C6D5A]">Storage</div>
              <div className="flex flex-wrap gap-2">
                {product.storage.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setStorage(s)}
                    className={cn(
                      "rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all",
                      storage === s
                        ? "border-[#6B4F3B] bg-[#6B4F3B] text-white shadow-md"
                        : "border-[#E8E2DC] bg-white text-[#2D1F17] hover:border-[#C4A88A]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <div className="mb-2.5 text-xs font-bold uppercase tracking-widest text-[#8C6D5A]">
                Color — <span className="font-semibold text-[#2D1F17]">{color}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c: { name: string; hex: string }) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={cn(
                      "relative h-10 w-10 rounded-full border-2 transition-all",
                      color === c.name
                        ? "border-[#6B4F3B] scale-110 shadow-md ring-2 ring-[#6B4F3B]/20 ring-offset-2"
                        : "border-[#E8E2DC] hover:scale-105"
                    )}
                    style={{ backgroundColor: c.hex }}
                  >
                    {color === c.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white drop-shadow" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={buyRef} className="flex flex-wrap gap-3">
              <a
                href={wa(waMsg)}
                target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#6B4F3B] py-4 text-sm font-extrabold text-white shadow-lg hover:bg-[#5A3F2E] transition-all hover:shadow-xl active:scale-[0.98] min-w-[140px]"
              >
                Buy Now
              </a>
              <a
                href={wa(waMsg)}
                target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500 bg-emerald-50 py-4 text-sm font-extrabold text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all active:scale-[0.98] min-w-[140px]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link
                to="/compare"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E8E2DC] bg-white px-5 py-4 text-sm font-semibold text-[#2D1F17] hover:bg-[#F2EDE8] hover:border-[#C4A88A] transition-all"
              >
                Compare
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: product.warranty, sub: "Manufacturer" },
                { icon: Truck, label: "Same Day", sub: "In-store Pickup" },
                { icon: BadgeCheck, label: "100% Genuine", sub: "Sealed Pack" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#E8E2DC] bg-white p-3 text-center shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2EDE8]">
                    <Icon className="h-4 w-4 text-[#6B4F3B]" />
                  </div>
                  <div className="text-[11px] font-bold text-[#2D1F17] leading-tight">{label}</div>
                  <div className="text-[10px] text-[#8C6D5A] leading-tight">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature Highlights Cards ─── */}
      <section ref={featureSection.ref} className="bg-white border-y border-[#E8E2DC]">
        <div className={cn(
          "mx-auto max-w-7xl px-4 py-16 md:px-6 transition-all duration-700",
          featureSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-[#2D1F17]">Why You'll Love It</h2>
            <p className="mt-2 text-[#8C6D5A] text-sm">Key features that make the {product.model} stand out</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.highlights.map((h: string, i: number) => {
              const icons = [Camera, Cpu, Battery, Zap, ShieldCheck, Award];
              const Icon = icons[i % icons.length];
              const gradients = [
                "from-amber-50 to-orange-50",
                "from-blue-50 to-indigo-50",
                "from-emerald-50 to-teal-50",
                "from-rose-50 to-pink-50",
                "from-violet-50 to-purple-50",
                "from-[#F2EDE8] to-[#E8E0D8]",
              ];
              const colors = ["text-amber-700", "text-blue-700", "text-emerald-700", "text-rose-700", "text-violet-700", "text-[#6B4F3B]"];
              const bgs = ["bg-amber-100", "bg-blue-100", "bg-emerald-100", "bg-rose-100", "bg-violet-100", "bg-[#F2EDE8]"];
              return (
                <div
                  key={h}
                  className={cn(
                    "flex flex-col gap-4 rounded-3xl border border-[#E8E2DC] bg-gradient-to-br p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md",
                    gradients[i % gradients.length]
                  )}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", bgs[i % bgs.length])}>
                    <Icon className={cn("h-5 w-5", colors[i % colors.length])} />
                  </div>
                  <p className="text-sm font-semibold text-[#2D1F17] leading-relaxed">{h}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Animated Specifications ─── */}
      <section ref={specSection.ref} className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className={cn(
          "transition-all duration-700",
          specSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-[#2D1F17]">Full Specifications</h2>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#E8E2DC] bg-white shadow-md">
            {Object.entries(product.specs).map(([k, v], i) => {
              const Icon = SPEC_ICONS[k] ?? Smartphone;
              const label = SPEC_LABELS[k] ?? k.charAt(0).toUpperCase() + k.slice(1);
              return (
                <div
                  key={k}
                  className="group grid grid-cols-[auto_1fr] gap-0 border-b border-[#F2EDE8] last:border-0 transition-colors hover:bg-[#FAFAF9]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-3 border-r border-[#F2EDE8] bg-[#FAF8F6] p-5 pr-6">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F2EDE8]">
                      <Icon className="h-4 w-4 text-[#6B4F3B]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D5A] whitespace-nowrap">{label}</span>
                  </div>
                  <div className="flex items-center p-5 text-sm font-medium text-[#2D1F17] leading-relaxed">
                    {String(v)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Parallax Feature Banner ─── */}
      <div className="relative overflow-hidden bg-[#2D1F17] py-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${product.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">{product.model}</h2>
          <p className="mt-4 text-[#C4A88A] text-lg font-medium">Engineered for those who demand the best.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-sm">
              <div className="font-display text-2xl font-black text-white">{inr(product.price)}</div>
              <div className="text-xs text-[#C4A88A] font-semibold uppercase tracking-wider">Starting Price</div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-sm">
              <div className="font-display text-2xl font-black text-white">{inr(product.emiFrom)}/mo</div>
              <div className="text-xs text-[#C4A88A] font-semibold uppercase tracking-wider">No-cost EMI</div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-sm">
              <div className="font-display text-2xl font-black text-white">{product.rating.toFixed(1)} ★</div>
              <div className="text-xs text-[#C4A88A] font-semibold uppercase tracking-wider">{product.reviews} Reviews</div>
            </div>
          </div>
          <a
            href={wa(waMsg)}
            target="_blank" rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border-2 border-[#C4A88A] bg-transparent px-8 py-3.5 text-sm font-bold text-[#C4A88A] hover:bg-[#C4A88A] hover:text-[#2D1F17] transition-all"
          >
            Get Yours Today <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ─── Customer Reviews ─── */}
      <section ref={reviewSection.ref} className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className={cn(
          "transition-all duration-700",
          reviewSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#2D1F17]">Customer Reviews</h2>
              <div className="mt-2 flex items-center gap-2">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 font-bold text-[#2D1F17]">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-[#8C6D5A]">based on {product.reviews} reviews</span>
              </div>
            </div>
            <a
              href={wa(`I'd like to leave a review for the ${product.model}`)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#C4A88A] bg-[#F2EDE8] px-4 py-2 text-xs font-bold text-[#6B4F3B] hover:bg-[#6B4F3B] hover:text-white transition-all"
            >
              <Star className="h-3.5 w-3.5" /> Write a Review
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((review, i) => (
              <div
                key={review.id}
                className="flex flex-col gap-4 rounded-3xl border border-[#E8E2DC] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6B4F3B] text-xs font-black text-white">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2D1F17]">{review.name}</div>
                    <div className="text-xs text-[#8C6D5A]">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={cn("h-3.5 w-3.5", s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-[#E8E2DC] text-[#E8E2DC]")} />
                  ))}
                  {review.verified && (
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Verified</span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2D1F17] mb-1">{review.title}</div>
                  <p className="text-xs text-[#8C6D5A] leading-relaxed">{review.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recommended Accessories ─── */}
      <section className="bg-[#FAF8F6] border-y border-[#E8E2DC]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl font-bold text-[#2D1F17]">Recommended Accessories</h2>
            <Link to="/accessories" className="text-xs font-bold text-[#6B4F3B] hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ACCESSORIES.map((acc) => (
              <Link
                key={acc.id}
                to="/accessories"
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#E8E2DC] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-[#C4A88A]"
              >
                <div className="aspect-square overflow-hidden bg-[#FAF8F6]">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80"; }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs font-bold text-[#2D1F17] mb-0.5">{acc.name}</div>
                  <div className="text-[11px] text-[#8C6D5A] mb-2">{acc.desc}</div>
                  <div className="font-display text-base font-bold text-[#6B4F3B]">{inr(acc.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Products ─── */}
      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#2D1F17]">More from {brand.name}</h2>
              <p className="mt-1 text-sm text-[#8C6D5A]">Explore other models in the lineup</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((m: Mobile) => <ProductCard key={m.id} m={m} />)}
          </div>
        </section>
      )}

      {/* ─── Recently Viewed ─── */}
      {recentlyViewed.length > 0 && (
        <section className="border-t border-[#E8E2DC] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl font-bold text-[#2D1F17]">Recently Viewed</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recentlyViewed.map((m: Mobile) => <ProductCard key={m.id} m={m} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
