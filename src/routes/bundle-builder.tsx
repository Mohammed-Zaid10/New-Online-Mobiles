import { createFileRoute } from "@tanstack/react-router";
import { BundleBuilder } from "@/components/site/BundleBuilder";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/bundle-builder")({
  head: () => ({
    meta: [
      { title: `Interactive Bundle Builder — ${SHOP.name}` },
      { name: "description", content: "Build your perfect smartphone bundle. Add a case, charger, earbuds, and watch to unlock up to 20% bundle discount instantly." },
    ],
  }),
  component: BundleBuilderPage,
});

function BundleBuilderPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed space-y-8 pb-16 text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.8), rgba(8,8,8,0.95)), url('/backgrounds/shop-bg.jpg')" }}
    >
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Bundle Builder" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="Create Your Perfect Setup"
          title="Interactive Bundle Builder"
          subtitle="Select your phone and add essential accessories. The more you bundle, the more you save. Unlock up to 20% discount automatically."
        />

        <div className="mt-8 bg-slate-950/50 rounded-3xl border border-amber-500/10 overflow-hidden shadow-luxe">
          <BundleBuilder />
        </div>
      </div>
    </div>
  );
}

