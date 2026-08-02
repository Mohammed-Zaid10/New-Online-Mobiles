import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { byCategory, getAccessory, getCategory, type Accessory } from "@/data/accessories";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr, wa } from "@/lib/shop";

export const Route = createFileRoute("/accessories_/$category/$id")({
  loader: ({
    params,
  }): {
    cat: NonNullable<ReturnType<typeof getCategory>>;
    item: Accessory;
    related: Accessory[];
  } => {
    const cat = getCategory(params.category);
    const item = getAccessory(params.category, params.id);
    if (!cat || !item) throw notFound();
    return {
      cat,
      item,
      related: byCategory(params.category).filter((a) => a.id !== item.id).slice(0, 4),
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Accessory — Online Mobiles" }] };
    const { item } = loaderData;
    const title = `${item.name} — ${inr(item.price)} | Online Mobiles`;
    const desc = `${item.description} Genuine ${item.brand} product with warranty at Online Mobiles.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `${SHOP.siteUrl}/accessories/${params.category}/${params.id}` },
      ],
      links: [{ rel: "canonical", href: `${SHOP.siteUrl}/accessories/${params.category}/${params.id}` }],
    };
  },
  component: AccessoryPage,
});

function AccessoryPage() {
  const { cat, item, related } = Route.useLoaderData();
  const [idx, setIdx] = useState(0);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16 text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.8), rgba(8,8,8,0.95)), url('/backgrounds/shop-bg.jpg')" }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <Breadcrumbs
          items={[
            { label: "Accessories", to: "/accessories" },
            { label: cat.name, to: "/accessories/$category" as any },
            { label: item.name },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2 md:px-6">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
            <img src={item.images[idx]} alt={item.name} className="aspect-square w-full object-contain p-6" />
          </div>
          {item.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {item.images.map((im: string, i: number) => (
                <button
                  key={im + i}
                  onClick={() => setIdx(i)}
                  className={`overflow-hidden rounded-xl border-2 bg-card transition ${i === idx ? "border-accent" : "border-transparent"}`}
                >
                  <img src={im} alt="" className="aspect-square w-full object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.brand} · {cat.name}</div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{item.name}</h1>
          <p className="mt-3 text-muted-foreground">{item.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-display text-4xl font-bold">{inr(item.price)}</div>
            {item.mrp && item.mrp > item.price && (
              <>
                <div className="text-lg text-muted-foreground line-through">{inr(item.mrp)}</div>
                <div className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                  Save {inr(item.mrp - item.price)}
                </div>
              </>
            )}
          </div>
          <div className="mt-2 text-sm text-success">{item.inStock ? "In stock — ready for pickup" : "Out of stock"}</div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa(`Hi! I want to buy ${item.name} (${item.brand}) at ${inr(item.price)}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-sm font-semibold text-white shadow-luxe hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
            <a
              href={`tel:${SHOP.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted"
            >
              Call store
            </a>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm">
            <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-accent" /> 100% genuine {item.brand} product</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> Replacement warranty on manufacturing defects</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Same-day pickup at store, local delivery available</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <h2 className="font-display text-2xl font-bold">More in {cat.name}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {related.map((a: Accessory) => (
              <a
                key={a.id}
                href={`/accessories/${a.category}/${a.id}`}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxe"
              >
                <img src={a.image} alt={a.name} loading="lazy" className="aspect-square w-full object-contain p-4" />
                <div className="p-4 pt-0">
                  <div className="font-display text-sm font-semibold leading-tight">{a.name}</div>
                  <div className="mt-1 font-display font-bold">{inr(a.price)}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
