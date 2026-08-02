import { createFileRoute } from "@tanstack/react-router";
import { AiRepair } from "@/components/site/AiRepair";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/ai-repair")({
  head: () => ({
    meta: [
      { title: `AI Repair Assistant — ${SHOP.name}` },
      { name: "description", content: "Get instant AI diagnosis for your mobile phone issues and book a repair." },
    ],
  }),
  component: AiRepairPage,
});

function AiRepairPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        eyebrow="Smart Diagnosis"
        title="AI Repair Assistant"
        subtitle="Tell us what's wrong with your phone and get an instant estimated diagnosis, cost, and time."
      />

      <div className="container px-4">
        <Breadcrumbs items={[{ label: "AI Repair Assistant" }]} />
      </div>

      <div className="container px-4">
        <AiRepair />
      </div>
    </div>
  );
}
