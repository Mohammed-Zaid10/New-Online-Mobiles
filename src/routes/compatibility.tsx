import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityChecker } from "@/components/site/CompatibilityChecker";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/compatibility")({
  head: () => ({
    meta: [
      { title: `Accessory Compatibility Checker — ${SHOP.name}` },
      { name: "description", content: "Find every compatible case, charger, cable, power bank and earbud for your phone instantly." },
    ],
  }),
  component: CompatibilityPage,
});

function CompatibilityPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        eyebrow="Smart Accessories"
        title="Compatibility Checker"
        subtitle="Select your phone and instantly see every compatible accessory — no guesswork needed."
      />

      <div className="container px-4">
        <Breadcrumbs items={[{ label: "Compatibility Checker" }]} />
      </div>

      <div className="container px-4">
        <CompatibilityChecker />
      </div>
    </div>
  );
}
