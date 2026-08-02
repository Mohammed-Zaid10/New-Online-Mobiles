import { createFileRoute } from "@tanstack/react-router";
import { SizeComparison } from "@/components/site/SizeComparison";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/size-compare")({
  head: () => ({
    meta: [
      { title: `Real Size Phone Comparison — ${SHOP.name}` },
      { name: "description", content: "Compare exact 1:1 physical phone dimensions, height, width, thickness, weight, screen-to-body ratio, and pocket fit visualization." },
    ],
  }),
  component: SizeComparePage,
});

function SizeComparePage() {
  return (
    <div className="space-y-8 pb-16">
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Size Compare" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="1:1 Dimensional Lab"
          title="Real Size Phone Comparison Tool"
          subtitle="Compare physical smartphone height, width, thickness, weight, screen-to-body ratio, and test how phones fit in standard pockets with millimeter accurate scaling."
        />

        <div className="mt-8">
          <SizeComparison />
        </div>
      </div>
    </div>
  );
}

