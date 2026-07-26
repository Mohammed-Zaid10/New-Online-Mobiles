import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck, Battery, Camera, Check, Cpu, MessageCircle, ShieldCheck,
  Smartphone, Star, Wifi, Zap,
} from "lucide-react";
import { brands } from "@/data/brands";
import { brandMobiles, getMobile, type Mobile } from "@/data/mobiles";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { SHOP, inr, wa } from "@/lib/shop";

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

const ICONS: Record<string, any> = {
  display: Smartphone, processor: Cpu, ram: Cpu, camera: Camera,
  battery: Battery, os: Smartphone, network: Wifi, weight: Smartphone,
};

function ProductPage() {
  const { brand, product, similar } = Route.useLoaderData();
  const [imgIdx, setImgIdx] = useState(0);
  const [storage, setStorage] = useState(product.storage[0]);
  const [color, setColor] = useState(product.colors[0].name);

  const waMsg = `Hi! I'm interested in the ${product.model} (${storage}, ${color}) at ${inr(product.price)}.`;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <Breadcrumbs items={[
          { label: "New Mobiles", to: "/mobiles" },
          { label: brand.name, to: "/mobiles/$brand" as any },
          { label: product.model },
        ]} />
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
            <img src={product.images[imgIdx]} alt={product.model} className="aspect-square w-full object-contain p-8" />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((im: string, i: number) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`overflow-hidden rounded-xl border-2 transition ${i === imgIdx ? "border-accent" : "border-transparent"}`}
              >
                <img src={im} alt="" className="aspect-square w-full bg-muted/30 object-contain p-2" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{brand.name}</div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{product.model}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
            <span className="inline-flex items-center gap-1 text-success">
              <BadgeCheck className="h-4 w-4" /> {product.inStock ? "In Stock" : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-display text-4xl font-bold">{inr(product.price)}</div>
            {product.mrp && product.mrp > product.price && (
              <>
                <div className="text-lg text-muted-foreground line-through">{inr(product.mrp)}</div>
                <div className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                  Save {inr(product.mrp - product.price)}
                </div>
              </>
            )}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            EMI from <span className="font-semibold text-foreground">{inr(product.emiFrom)}/mo</span> · No-cost EMI available
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold">Storage</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.storage.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setStorage(s)}
                  className={`rounded-full border px-4 py-2 text-sm ${storage === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold">Color: <span className="font-normal text-muted-foreground">{color}</span></div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c: { name: string; hex: string }) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-accent scale-110" : "border-border"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa(waMsg)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-luxe hover:opacity-90"
            >
              Buy Now
            </a>
            <a
              href={wa(waMsg)}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
            </a>
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted"
            >
              Compare
            </Link>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> {product.warranty}</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Same-day pickup available at store</div>
            <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-accent" /> 100% authentic — sealed pack</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <h2 className="font-display text-2xl font-bold">Highlights</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {product.highlights.map((h: string) => (
            <div key={h} className="flex items-start gap-2 rounded-2xl border border-border/70 bg-card p-4 text-sm">
              <Check className="mt-0.5 h-4 w-4 text-success" /> {h}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <h2 className="font-display text-2xl font-bold">Full specifications</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-card">
          {Object.entries(product.specs).map(([k, v]) => {
            const Icon = ICONS[k] ?? Smartphone;
            return (
              <div key={k} className="grid grid-cols-[1fr_2fr] gap-4 border-b border-border/60 p-4 last:border-b-0">
                <div className="flex items-center gap-2 text-sm font-medium capitalize">
                  <Icon className="h-4 w-4 text-accent" /> {k}
                </div>
                <div className="text-sm text-muted-foreground">{String(v)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <h2 className="font-display text-2xl font-bold">Similar products</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {similar.map((m: Mobile) => <ProductCard key={m.id} m={m} />)}
          </div>
        </section>
      )}
    </>
  );
}
