import { createFileRoute } from "@tanstack/react-router";
import { BatteryCalculator } from "@/components/site/BatteryCalculator";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/battery-calculator")({
  head: () => ({
    meta: [
      { title: `Battery Usage Calculator — ${SHOP.name}` },
      { name: "description", content: "Calculate estimated Screen-on-Time (SOT), full-day battery duration, power drain breakdown, and fast charging speeds for any smartphone." },
    ],
  }),
  component: BatteryCalculatorPage,
});

function BatteryCalculatorPage() {
  return (
    <div className="space-y-8 pb-16">
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Battery Calculator" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="Power Simulation Lab"
          title="Battery Usage & Life Calculator"
          subtitle="Adjust your daily gaming, video streaming, social media, camera usage, display brightness, and 5G cellular mode to calculate exact screen-on-time, battery drain breakdown, and charging recommendations."
        />

        <div className="mt-8">
          <BatteryCalculator />
        </div>
      </div>
    </div>
  );
}

