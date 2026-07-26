import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { mobiles } from "@/data/mobiles";
import { brands } from "@/data/brands";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/mobiles/")({
  head: () => ({
    meta: [
      { title: "All New Mobiles — Filter by brand, price & storage" },
      { name: "description", content: "Complete catalog of latest smartphones with brand, price range and storage filters." },
    ],
  }),
  component: MobilesIndex,
});

const STORAGE = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const PRICES = [
  { label: "Under ₹15,000", min: 0, max: 15000 },
  { label: "₹15,000 – ₹30,000", min: 15000, max: 30000 },
  { label: "₹30,000 – ₹60,000", min: 30000, max: 60000 },
  { label: "₹60,000 – ₹1,00,000", min: 60000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

function MobilesIndex() {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [priceIdx, setPriceIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return mobiles.filter((m) => {
      if (q && !`${m.model} ${m.brand}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (brand && m.brand !== brand) return false;
      if (storage && !m.storage.includes(storage)) return false;
      if (priceIdx !== null) {
        const p = PRICES[priceIdx];
        if (m.price < p.min || m.price > p.max) return false;
      }
      return true;
    });
  }, [q, brand, storage, priceIdx]);

  return (
    <>
      <PageHeader eyebrow="Catalog" title="All new mobiles" subtitle="Filter by brand, price or storage. Every phone ships with warranty, EMI and exchange." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "New Mobiles" }]} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 md:grid-cols-[260px_1fr] md:px-6">
        <aside className={`${open ? "block" : "hidden md:block"} space-y-6`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search phones..."
              className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-3 text-sm"
            />
          </div>
          <FilterGroup title="Brand">
            <button onClick={() => setBrand(null)} className={pill(brand === null)}>All</button>
            {brands.map((b) => (
              <button key={b.slug} onClick={() => setBrand(b.slug)} className={pill(brand === b.slug)}>
                {b.name}
              </button>
            ))}
          </FilterGroup>
          <FilterGroup title="Price">
            <button onClick={() => setPriceIdx(null)} className={pill(priceIdx === null)}>Any</button>
            {PRICES.map((p, i) => (
              <button key={p.label} onClick={() => setPriceIdx(i)} className={pill(priceIdx === i)}>{p.label}</button>
            ))}
          </FilterGroup>
          <FilterGroup title="Storage">
            <button onClick={() => setStorage(null)} className={pill(storage === null)}>Any</button>
            {STORAGE.map((s) => (
              <button key={s} onClick={() => setStorage(s)} className={pill(storage === s)}>{s}</button>
            ))}
          </FilterGroup>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{filtered.length} phones</div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No phones match those filters.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => <ProductCard key={m.id} m={m} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 font-display text-sm font-semibold">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
function pill(active: boolean) {
  return `rounded-full border px-3 py-1.5 text-xs transition ${
    active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"
  }`;
}
