import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: `Blog & Guides — ${SHOP.name}` },
      { name: "description", content: "Expert smartphone guides, buying tips, trade-in advice and tech insights from Online Mobiles." },
    ],
  }),
  component: () => <Outlet />,
});
