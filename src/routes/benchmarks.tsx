import { createFileRoute } from "@tanstack/react-router";
import { BenchmarkCharts } from "@/components/site/BenchmarkCharts";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/benchmarks")({
  head: () => ({
    meta: [
      { title: `Performance Benchmarks — ${SHOP.name}` },
      { name: "description", content: "Compare flagship smartphone performance, sustained gaming FPS, and capability scores." },
    ],
  }),
  component: BenchmarksPage,
});

function BenchmarksPage() {
  return (
    <div className="space-y-8 pb-16 bg-[#07060c] min-h-screen">
      <div className="container px-4 py-4 md:py-6">
        <Breadcrumbs items={[{ label: "Performance Benchmarks" }]} />
      </div>

      <div className="container px-4">
        <PageHeader
          eyebrow="Data Driven Insights"
          title="Performance Benchmarks"
          subtitle="Interactive performance lab comparing CPU, GPU, Gaming, and AI capabilities of the latest flagship smartphones."
        />

        <div className="mt-8 mx-auto max-w-6xl">
          <BenchmarkCharts />
        </div>
      </div>
    </div>
  );
}

