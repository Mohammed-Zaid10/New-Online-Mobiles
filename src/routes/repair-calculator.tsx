import { createFileRoute } from "@tanstack/react-router";
import { RepairCalculator } from "@/components/site/RepairCalculator";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/repair-calculator")({
  head: () => ({
    meta: [
      { title: `Instant Mobile Repair Cost Calculator — ${SHOP.name}` },
      { name: "description", content: "Get instant repair cost estimates for Screen, Battery, Speaker, Charging Port, Camera, Water Damage, Back Glass, and Motherboard repairs with warranty." },
    ],
  }),
  component: RepairCalculatorPage,
});

function RepairCalculatorPage() {
  return (
    <div className="space-y-8 pb-16">
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Repair Cost Calculator" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="Precision Repair Estimation"
          title="Instant Repair Cost Calculator"
          description="Select your phone brand, exact model, and repair issue to get an instant cost quote, estimated turnaround time, warranty terms, and direct repair booking."
        />

        <div className="mt-8">
          <RepairCalculator />
        </div>
      </div>
    </div>
  );
}
