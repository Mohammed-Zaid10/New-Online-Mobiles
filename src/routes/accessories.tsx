import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { accessoryCategories, accessories } from "@/data/accessories";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Mobile Accessories — Cases, Chargers, Earbuds & More" },
      { name: "description", content: "Cases, tempered glass, chargers, earbuds, smart watches, power banks, cables and 20+ accessory categories." },
      { property: "og:title", content: "Mobile Accessories — Online Mobiles" },
      { property: "og:url", content: `${SHOP.siteUrl}/accessories` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/accessories` }],
  }),
  component: AccessoriesHub,
});

function AccessoriesHub() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url('/backgrounds/accessories-bg.jpg')" }}
    >
      <PageHeader eyebrow="Accessories" title="Everything for your phone" subtitle="20 curated categories, real prices, real stock." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Accessories" }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {accessoryCategories.map((c) => {
          const first = accessories.find((a) => a.category === c.slug);
          const count = accessories.filter((a) => a.category === c.slug).length;
          return (
            <Link
              key={c.slug} to="/accessories/$category" params={{ category: c.slug }}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft hover:-translate-y-1 hover:shadow-luxe transition"
            >
              {first && (
                <img
                  src={first.image}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full bg-muted/30 object-contain p-4 transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1541877590-a1885d1cf9d5?w=800&q=80";
                  }}
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-display font-semibold">{c.name}</div>
                  <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-xs text-muted-foreground">{count} products</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
