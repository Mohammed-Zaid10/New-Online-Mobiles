import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Online Mobiles" },
      { name: "description", content: "12+ years of mobile retail and repair experience. Genuine devices, warranty on every service, thousands of happy customers." },
      { property: "og:url", content: `${SHOP.siteUrl}/about` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/about` }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="About" title="A neighbourhood shop, done properly." subtitle="Twelve years, thousands of customers, and a stubborn belief that mobile retail should feel warm and honest — never pushy." />
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "About" }]} />
        <div className="prose prose-neutral mt-8 text-muted-foreground">
          <p>Online Mobiles started in 2013 as a single-counter repair kiosk. Today we run a full-service store selling authentic smartphones from every major brand, a certified pre-owned line, a well-stocked accessories catalog and a workshop that handles everything from screen swaps to component-level board rework.</p>
          <p>Everything we sell is genuine. Every repair is warrantied in writing. Every customer gets the same fair price — no seasonal shuffling.</p>
        </div>
      </div>
    </>
  ),
});
