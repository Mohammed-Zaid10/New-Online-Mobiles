import { createFileRoute } from "@tanstack/react-router";
import { StorageCalculator } from "@/components/site/StorageCalculator";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/storage-calculator")({
  head: () => ({
    meta: [
      { title: `Storage Calculator — ${SHOP.name}` },
      { name: "description", content: "Find the perfect storage size for your next phone based on your photos, videos, apps and games." },
    ],
  }),
  component: StorageCalculatorPage,
});

function StorageCalculatorPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        eyebrow="Smart Decision"
        title="Storage Calculator"
        subtitle="Enter your usage and we'll recommend the ideal storage tier for your next phone."
      />

      <div className="container px-4">
        <Breadcrumbs items={[{ label: "Storage Calculator" }]} />
      </div>

      <div className="container px-4">
        <StorageCalculator />
      </div>
    </div>
  );
}
