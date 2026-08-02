import { createFileRoute } from "@tanstack/react-router";
import { PriceTracker } from "@/components/site/PriceTracker";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/price-tracker")({
  head: () => ({
    meta: [
      { title: `Price Tracker — ${SHOP.name}` },
      { name: "description", content: "Track historical price trends for popular smartphones and find the best time to buy." },
    ],
  }),
  component: PriceTrackerPage,
});

function PriceTrackerPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        eyebrow="Smart Shopping"
        title="Price Tracker"
        subtitle="Track price history, spot discounts and find the perfect time to buy your next phone."
      />

      <div className="container px-4">
        <Breadcrumbs items={[{ label: "Price Tracker" }]} />
      </div>

      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <PriceTracker />
        </div>
      </div>
    </div>
  );
}
