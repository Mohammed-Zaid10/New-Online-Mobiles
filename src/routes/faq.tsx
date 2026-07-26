import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

const FAQS = [
  { q: "Are your phones 100% original?", a: "Yes. Every new device is sourced from authorised distributors and comes sealed with the brand's official India warranty." },
  { q: "Do you offer EMI?", a: "Yes, no-cost EMI is available on 3, 6, 9 and 12 month plans through HDFC, ICICI, SBI, Axis and Bajaj Finserv." },
  { q: "Do you buy old phones?", a: "Yes, we accept trade-ins. Use our online calculator for an instant estimate; final value confirmed after in-store inspection." },
  { q: "What warranty do repairs carry?", a: "Screen and battery repairs are covered by 6 months warranty. Other repairs carry 3 months (15 days for software work)." },
  { q: "How long does a screen repair take?", a: "Most screen replacements are completed in 30 – 90 minutes while you wait." },
  { q: "Do you offer doorstep pickup?", a: "Yes, we provide free pickup for repairs above ₹2,000 within city limits." },
  { q: "Can I return a used phone?", a: "Yes, all certified pre-owned phones carry a 7-day no-questions return." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Online Mobiles" },
      { name: "description", content: "Answers to common questions about warranty, EMI, trade-in, repairs and returns." },
      { property: "og:url", content: `${SHOP.siteUrl}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/faq` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHeader eyebrow="Support" title="Frequently asked questions" />
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "FAQ" }]} />
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border/70 bg-card">
          {FAQS.map((f, i) => (
            <div key={i} className="p-5">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between text-left font-semibold">
                {f.q}
                {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
              {open === i && <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
