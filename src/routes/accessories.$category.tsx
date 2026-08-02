import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { byCategory, getCategory, type Accessory } from "@/data/accessories";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr, wa } from "@/lib/shop";

export const Route = createFileRoute("/accessories/$category")({
  loader: ({ params }): { cat: NonNullable<ReturnType<typeof getCategory>>; items: Accessory[] } => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return { cat, items: byCategory(params.category) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Accessories — Online Mobiles" }] };
    return {
      meta: [
        { title: `${loaderData.cat.name} — Online Mobiles` },
        { name: "description", content: `Buy ${loaderData.cat.name.toLowerCase()} — genuine products at honest prices with warranty.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16 text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.8), rgba(8,8,8,0.95)), url('/backgrounds/shop-bg.jpg')" }}
    >
      <PageHeader eyebrow="Category" title={cat.name} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Accessories", to: "/accessories" }, { label: cat.name }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((a: Accessory) => (
          <div key={a.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxe">
            <Link
              to="/accessories/$category/$id"
              params={{ category: a.category, id: a.id }}
              className="block bg-muted/30"
            >
              <img
                src={a.image}
                alt={a.name}
                loading="lazy"
                className="aspect-square w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1541877590-a1885d1cf9d5?w=800&q=80";
                }}
              />
            </Link>
            <div className="flex flex-1 flex-col p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{a.brand}</div>
              <Link to="/accessories/$category/$id" params={{ category: a.category, id: a.id }}>
                <h3 className="mt-0.5 font-display text-sm font-semibold leading-tight hover:text-accent">{a.name}</h3>
              </Link>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.description}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="font-display text-lg font-bold">{inr(a.price)}</div>
                {a.mrp && a.mrp > a.price && <div className="text-xs text-muted-foreground line-through">{inr(a.mrp)}</div>}
              </div>
              <div className="mt-1 text-[11px] text-success">{a.inStock ? "In Stock" : "Out of stock"}</div>
              <div className="mt-4 flex gap-2">
                <Link
                  to="/accessories/$category/$id"
                  params={{ category: a.category, id: a.id }}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-muted"
                >
                  View
                </Link>
                <a
                  href={wa(`Hi! I want to buy ${a.name} (${a.brand}) at ${inr(a.price)}.`)}
                  target="_blank" rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-success px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Chat
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
