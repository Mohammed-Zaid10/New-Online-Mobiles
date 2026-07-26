import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/mobiles")({
  head: () => ({
    meta: [
      { title: "New Mobiles — Online Mobiles" },
      { name: "description", content: "Browse the latest iPhones, Samsung Galaxy, OnePlus, Vivo, Oppo, Xiaomi and more with EMI, exchange and warranty." },
      { property: "og:title", content: "New Mobiles — Online Mobiles" },
      { property: "og:description", content: "Full catalog of latest smartphones with filters, EMI and exchange." },
      { property: "og:url", content: `${SHOP.siteUrl}/mobiles` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/mobiles` }],
  }),
  component: () => <Outlet />,
});
