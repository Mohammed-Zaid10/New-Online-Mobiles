import { createFileRoute } from "@tanstack/react-router";
import { SpinWheel } from "@/components/site/SpinWheel";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/spin-wheel")({
  head: () => ({
    meta: [
      { title: `Spin & Win Rewards — ${SHOP.name}` },
      { name: "description", content: "Spin the daily lucky wheel to win discounts, free screen guards, cases, and repair coupons!" },
      { property: "og:url", content: `${SHOP.siteUrl}/spin-wheel` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/spin-wheel` }],
  }),
  component: SpinWheelPage,
});

function SpinWheelPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        eyebrow="Daily Lucky Rewards"
        title="Spin & Win"
        subtitle="Sign in daily with Google to spin the wheel and win guaranteed discounts, screen guards, cases & repair coupons!"
      />

      <div className="container px-4">
        <Breadcrumbs items={[{ label: "Spin & Win" }]} />
      </div>

      <div className="container px-4">
        <SpinWheel />
      </div>
    </div>
  );
}
