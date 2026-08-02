import { createFileRoute } from "@tanstack/react-router";
import { UnboxingExperience } from "@/components/site/UnboxingExperience";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/unboxing")({
  head: () => ({
    meta: [
      { title: `Virtual Unboxing Experience — ${SHOP.name}` },
      { name: "description", content: "Experience the premium animated unboxing of the latest flagship smartphones." },
    ],
  }),
  component: UnboxingPage,
});

function UnboxingPage() {
  return (
    <div className="space-y-8 pb-16">
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Unboxing Experience" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="Interactive Experience"
          title="Virtual Unboxing"
          subtitle="Tap the box to start the premium unboxing sequence. Select any item to view its details."
        />

        <div className="mt-8 mx-auto max-w-5xl">
          <UnboxingExperience />
        </div>
      </div>
    </div>
  );
}

