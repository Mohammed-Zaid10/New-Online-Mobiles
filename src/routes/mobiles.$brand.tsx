import { createFileRoute, notFound } from "@tanstack/react-router";
import { brands } from "@/data/brands";
import { brandMobiles, type Mobile } from "@/data/mobiles";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/mobiles/$brand")({
  loader: ({ params }): { brand: typeof brands[number]; items: ReturnType<typeof brandMobiles> } => {
    const brand = brands.find((b) => b.slug === params.brand);
    if (!brand) throw notFound();
    return { brand, items: brandMobiles(params.brand) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Brand — Online Mobiles" }] };
    const title = `${loaderData.brand.name} Mobiles — Online Mobiles`;
    return {
      meta: [
        { title },
        { name: "description", content: `Shop the full ${loaderData.brand.name} lineup with EMI, exchange and warranty. ${loaderData.items.length} models available.` },
        { property: "og:title", content: title },
        { property: "og:url", content: `${SHOP.siteUrl}/mobiles/${params.brand}` },
      ],
      links: [{ rel: "canonical", href: `${SHOP.siteUrl}/mobiles/${params.brand}` }],
    };
  },
  component: BrandPage,
});

function BrandPage() {
  const { brand, items } = Route.useLoaderData();
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-16"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.8), rgba(8,8,8,0.95)), url('/backgrounds/shop-bg.jpg')" }}
    >
      <PageHeader eyebrow="Brand" title={`${brand.name} smartphones`} subtitle={brand.tagline} />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "New Mobiles", to: "/mobiles" }, { label: brand.name }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No models listed yet — WhatsApp us for stock.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((m: Mobile) => <ProductCard key={m.id} m={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
