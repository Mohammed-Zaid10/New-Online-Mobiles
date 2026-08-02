import { createFileRoute } from "@tanstack/react-router";
import { IntelligentFilters } from "@/components/site/IntelligentFilters";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/mobiles/")({
  head: () => ({
    meta: [
      { title: `Smart Product Catalog — ${SHOP.name}` },
      { name: "description", content: "Instant real-time filtering by Brand, Price, RAM, Storage, Refresh Rate, Processor, Battery, Camera & 5G." },
      { property: "og:url", content: `${SHOP.siteUrl}/mobiles` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/mobiles` }],
  }),
  component: MobilesIndex,
});

function MobilesIndex() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed space-y-6 pb-16"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.7), rgba(8,8,8,0.95)), url('/backgrounds/features-bg.jpg')" }}
    >
      <PageHeader
        eyebrow="Smart Catalog"
        title="Explore Smartphones"
        subtitle="Filter instantly by Brand, Price, RAM, Storage, Refresh Rate, Processor, Battery, Camera & 5G with live animated results."
      />

      <div className="container max-w-7xl px-4">
        <Breadcrumbs items={[{ label: "Smart Catalog" }]} />
      </div>

      <IntelligentFilters />
    </div>
  );
}
