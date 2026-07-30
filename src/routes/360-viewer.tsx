import { createFileRoute } from "@tanstack/react-router";
import { ProductViewer360, SAMPLE_360_PRODUCTS } from "@/components/site/ProductViewer360";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";
import { Compass, Sparkles, Smartphone, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/360-viewer")({
  head: () => ({
    meta: [
      { title: "360° Interactive Product Viewer — Online Mobiles" },
      { name: "description", content: "Inspect smartphones in 360 degrees. Drag to rotate, zoom in on camera details, and view every color." },
    ],
  }),
  component: Viewer360Page,
});

function Viewer360Page() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader 
        eyebrow="Interactive Experience" 
        title="360° Product Studio" 
        subtitle="Explore smartphones from every angle. Drag to spin, pinch or double-tap to zoom in on design details."
      />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "360° Product Studio" }]} />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ProductViewer360 />

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 border border-border/60 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-base mb-2">360° Drag & Spin</h3>
            <p className="text-sm text-muted-foreground">
              Smooth 60FPS canvas acceleration with inertia physics. Rotate the device smoothly with touch gestures or mouse drag.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-border/60 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-base mb-2">Macro Zoom & Details</h3>
            <p className="text-sm text-muted-foreground">
              Double-tap or use wheel zoom to inspect camera lens modules, metallic frame finishes, and screen bezels up close.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-border/60 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-base mb-2">Real Color Finish</h3>
            <p className="text-sm text-muted-foreground">
              Switch between factory color finishes in real-time to preview Titanium Gold, Natural Titanium, Space Black, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
