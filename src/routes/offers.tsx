import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { offers } from "@/data/offers";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, wa } from "@/lib/shop";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Deals — Online Mobiles" },
      { name: "description", content: "Today's deals, festival sale, student discount, exchange bonus, EMI plans and bank cashback." },
      { property: "og:url", content: `${SHOP.siteUrl}/offers` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/offers` }],
  }),
  component: OffersPage,
});

function OffersPage() {
  return (
    <>
      <PageHeader eyebrow="Save more" title="Live offers & deals" />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Offers" }]} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <div key={o.slug} className={`rounded-2xl border border-border/70 bg-gradient-to-br ${o.color} p-6 shadow-soft`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">{o.tagline}</div>
            <h3 className="mt-1 font-display text-2xl font-bold">{o.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {o.perks.map((p) => (
                <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> {p}</li>
              ))}
            </ul>
            <a href={wa(`Hi! Tell me more about "${o.title}".`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">{o.cta}</a>
          </div>
        ))}
      </div>
    </>
  );
}
