import { createFileRoute } from "@tanstack/react-router";
import { CameraComparison } from "@/components/site/CameraComparison";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/camera-compare")({
  head: () => ({
    meta: [
      { title: `Camera Comparison Simulator — ${SHOP.name}` },
      { name: "description", content: "Compare mobile phone cameras side-by-side across Daylight, Night, Portrait, Zoom, Macro, Selfie, and Video with our interactive split-screen simulator." },
    ],
  }),
  component: CameraComparePage,
});

function CameraComparePage() {
  return (
    <div className="space-y-8 pb-16">
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Camera Compare" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="Interactive Camera Lab"
          title="Camera Comparison Simulator"
          subtitle="Drag the real-time split screen slider to analyze photo detail, low light capability, zoom sharpness, portrait edge detection, and video stabilization between top flagship smartphones."
        />

        <div className="mt-8">
          <CameraComparison />
        </div>
      </div>
    </div>
  );
}

