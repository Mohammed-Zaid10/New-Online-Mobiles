import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, RotateCcw, Check, Sparkles, Filter, ShieldCheck, Zap } from "lucide-react";
import { mobiles, type Mobile } from "@/data/mobiles";
import { usedPhones, type UsedPhone } from "@/data/used";
import { ProductCard } from "@/components/site/ProductCard";
import { inr } from "@/lib/shop";
import { cn } from "@/lib/utils";

// Combine new and used inventory for complete intelligent filtering
export type CombinedPhone = Mobile & {
  conditionType: "New" | "Used";
  conditionDetail?: string;
};

const ALL_PHONES: CombinedPhone[] = [
  ...mobiles.map((m) => ({ ...m, conditionType: "New" as const })),
  ...usedPhones.map((u) => ({
    id: u.id,
    brand: u.brand,
    model: u.model,
    slug: u.model.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    price: u.price,
    mrp: u.originalPrice,
    storage: [u.storage],
    colors: [{ name: u.color, hex: "#666666" }],
    images: [u.image],
    inStock: true,
    emiFrom: Math.round(u.price / 12),
    warranty: u.warranty,
    rating: 4.6,
    reviews: 12,
    specs: {
      display: "6.7\" OLED 120Hz",
      processor: "Flagship Octa-Core",
      ram: "8GB",
      camera: "50MP Triple Camera",
      battery: "4800 mAh",
      os: "Android / iOS",
      network: "5G",
      weight: "185g",
    },
    highlights: [`Condition: ${u.condition}`, `Color: ${u.color}`, `Battery Health: ${u.batteryHealth}`],
    conditionType: "Used" as const,
    conditionDetail: u.condition,
  })),
];

const BRANDS = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "google", label: "Google" },
  { id: "vivo", label: "Vivo" },
  { id: "oppo", label: "Oppo" },
  { id: "oneplus", label: "OnePlus" },
  { id: "realme", label: "Realme" },
  { id: "xiaomi", label: "Xiaomi" },
  { id: "motorola", label: "Motorola" },
  { id: "nothing", label: "Nothing" },
  { id: "honor", label: "Honor" },
];

const RAM_OPTIONS = ["4GB", "6GB", "8GB", "12GB", "16GB"];
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const REFRESH_RATES = ["60Hz", "90Hz", "120Hz", "144Hz"];
const BATTERY_RANGES = [
  { id: "under4500", label: "Under 4500 mAh" },
  { id: "4500-5000", label: "4500 – 5000 mAh" },
  { id: "above5000", label: "Above 5000 mAh" },
];
const DISPLAY_SIZES = [
  { id: "compact", label: "Compact (< 6.3\")" },
  { id: "medium", label: "Medium (6.3\" – 6.7\")" },
  { id: "large", label: "Large (6.7\"+)" },
];
const PROCESSORS = [
  { id: "apple", label: "Apple A-Series" },
  { id: "snapdragon8", label: "Snapdragon 8 Gen Series" },
  { id: "snapdragon7", label: "Snapdragon 7 / 6 Series" },
  { id: "dimensity", label: "MediaTek Dimensity" },
  { id: "tensor", label: "Google Tensor" },
];

export function IntelligentFilters() {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedRefresh, setSelectedRefresh] = useState<string[]>([]);
  const [selectedBattery, setSelectedBattery] = useState<string | null>(null);
  const [selectedDisplay, setSelectedDisplay] = useState<string | null>(null);
  const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null);
  const [camera50MP, setCamera50MP] = useState(false);
  const [only5G, setOnly5G] = useState(false);
  const [conditionFilter, setConditionFilter] = useState<"All" | "New" | "Used">("All");

  // Price slider range state
  const [maxPrice, setMaxPrice] = useState<number>(180000);
  const [minPrice, setMinPrice] = useState<number>(0);

  // Sorting
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");
  
  // Mobile drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleArrayFilter = (arr: string[], val: string, setter: (res: string[]) => void) => {
    if (arr.includes(val)) {
      setter(arr.filter((x) => x !== val));
    } else {
      setter([...arr, val]);
    }
  };

  const resetAllFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedRam([]);
    setSelectedStorage([]);
    setSelectedRefresh([]);
    setSelectedBattery(null);
    setSelectedDisplay(null);
    setSelectedProcessor(null);
    setCamera50MP(false);
    setOnly5G(false);
    setConditionFilter("All");
    setMinPrice(0);
    setMaxPrice(180000);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (selectedRam.length > 0) count += selectedRam.length;
    if (selectedStorage.length > 0) count += selectedStorage.length;
    if (selectedRefresh.length > 0) count += selectedRefresh.length;
    if (selectedBattery) count++;
    if (selectedDisplay) count++;
    if (selectedProcessor) count++;
    if (camera50MP) count++;
    if (only5G) count++;
    if (conditionFilter !== "All") count++;
    if (minPrice > 0 || maxPrice < 180000) count++;
    return count;
  }, [
    search, selectedBrands, selectedRam, selectedStorage, selectedRefresh,
    selectedBattery, selectedDisplay, selectedProcessor, camera50MP, only5G,
    conditionFilter, minPrice, maxPrice
  ]);

  // Instant real-time filtering calculation
  const filteredPhones = useMemo(() => {
    return ALL_PHONES.filter((phone) => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const text = `${phone.brand} ${phone.model} ${phone.specs.processor} ${phone.specs.camera}`.toLowerCase();
        if (!text.includes(query)) return false;
      }

      // Condition
      if (conditionFilter !== "All" && phone.conditionType !== conditionFilter) {
        return false;
      }

      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(phone.brand)) {
        return false;
      }

      // Price
      if (phone.price < minPrice || phone.price > maxPrice) {
        return false;
      }

      // RAM
      if (selectedRam.length > 0) {
        const phoneRam = phone.specs.ram.toUpperCase();
        const hasRamMatch = selectedRam.some((r) => phoneRam.includes(r.toUpperCase()));
        if (!hasRamMatch) return false;
      }

      // Storage
      if (selectedStorage.length > 0) {
        const hasStorage = selectedStorage.some((s) => phone.storage.includes(s));
        if (!hasStorage) return false;
      }

      // Refresh Rate
      if (selectedRefresh.length > 0) {
        const disp = phone.specs.display;
        const hasRefresh = selectedRefresh.some((rate) => disp.includes(rate));
        if (!hasRefresh) return false;
      }

      // 5G
      if (only5G) {
        const net = phone.specs.network.toUpperCase();
        if (!net.includes("5G")) return false;
      }

      // Camera 50MP+
      if (camera50MP) {
        const cam = phone.specs.camera;
        if (!cam.includes("48MP") && !cam.includes("50MP") && !cam.includes("108MP") && !cam.includes("200MP")) {
          return false;
        }
      }

      // Battery
      if (selectedBattery) {
        const battText = phone.specs.battery;
        const match = battText.match(/(\d{4})/);
        if (match) {
          const mAh = parseInt(match[1], 10);
          if (selectedBattery === "under4500" && mAh >= 4500) return false;
          if (selectedBattery === "4500-5000" && (mAh < 4500 || mAh > 5000)) return false;
          if (selectedBattery === "above5000" && mAh <= 5000) return false;
        }
      }

      // Processor
      if (selectedProcessor) {
        const proc = phone.specs.processor.toLowerCase();
        if (selectedProcessor === "apple" && !proc.includes("a1") && !proc.includes("apple") && !proc.includes("bionic")) return false;
        if (selectedProcessor === "snapdragon8" && (!proc.includes("snapdragon 8") && !proc.includes("8 gen"))) return false;
        if (selectedProcessor === "snapdragon7" && (!proc.includes("snapdragon 7") && !proc.includes("snapdragon 6"))) return false;
        if (selectedProcessor === "dimensity" && !proc.includes("dimensity")) return false;
        if (selectedProcessor === "tensor" && !proc.includes("tensor")) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [
    search, conditionFilter, selectedBrands, minPrice, maxPrice, selectedRam,
    selectedStorage, selectedRefresh, only5G, camera50MP, selectedBattery,
    selectedProcessor, sortBy
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
      
      {/* Top Controls Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border border-border/60 bg-card p-4 shadow-soft">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model, brand, processor, camera..."
            className="w-full rounded-2xl border border-border/50 bg-muted/20 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Right side stats & sort controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{filteredPhones.length} Phones Found</span>
            </span>

            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Clear ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="rounded-xl border border-border/50 bg-muted/20 px-3 py-2 text-xs font-bold text-foreground focus:outline-none"
            >
              <option value="popular">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-md"
            >
              <Filter className="h-4 w-4" /> Filters ({activeFilterCount})
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        
        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside
          className={cn(
            "space-y-6 md:block",
            mobileFilterOpen
              ? "fixed inset-0 z-50 block overflow-y-auto bg-card p-6 shadow-2xl animate-in slide-in-from-left duration-300"
              : "hidden"
          )}
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between md:hidden pb-4 border-b border-border/50">
            <h3 className="font-display text-lg font-bold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-accent" /> Intelligent Filters
            </h3>
            <button onClick={() => setMobileFilterOpen(false)} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Condition Filter */}
          <FilterSection title="Condition">
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-muted/30 p-1">
              {(["All", "New", "Used"] as const).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={cn(
                    "rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer",
                    conditionFilter === cond
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cond}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Price Range Slider & Presets */}
          <FilterSection title={`Price Range: ₹${minPrice.toLocaleString()} – ₹${maxPrice.toLocaleString()}`}>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="180000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Under ₹20K", max: 20000 },
                  { label: "₹20K – ₹40K", min: 20000, max: 40000 },
                  { label: "₹40K – ₹80K", min: 40000, max: 80000 },
                  { label: "Above ₹80K", min: 80000, max: 180000 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setMinPrice(preset.min || 0);
                      setMaxPrice(preset.max);
                    }}
                    className="rounded-full border border-border/40 bg-muted/20 px-2.5 py-1 text-[11px] font-semibold hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection title="Brand">
            <div className="flex flex-wrap gap-1.5">
              {BRANDS.map((b) => {
                const active = selectedBrands.includes(b.id);
                return (
                  <button
                    key={b.id}
                    onClick={() => toggleArrayFilter(selectedBrands, b.id, setSelectedBrands)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                      active
                        ? "border-accent bg-accent text-accent-foreground shadow-sm"
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* RAM Filter */}
          <FilterSection title="RAM">
            <div className="flex flex-wrap gap-1.5">
              {RAM_OPTIONS.map((r) => {
                const active = selectedRam.includes(r);
                return (
                  <button
                    key={r}
                    onClick={() => toggleArrayFilter(selectedRam, r, setSelectedRam)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                      active
                        ? "border-accent bg-accent text-accent-foreground shadow-sm"
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Storage Filter */}
          <FilterSection title="Storage">
            <div className="flex flex-wrap gap-1.5">
              {STORAGE_OPTIONS.map((s) => {
                const active = selectedStorage.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleArrayFilter(selectedStorage, s, setSelectedStorage)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                      active
                        ? "border-accent bg-accent text-accent-foreground shadow-sm"
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Display Refresh Rate */}
          <FilterSection title="Refresh Rate">
            <div className="flex flex-wrap gap-1.5">
              {REFRESH_RATES.map((rate) => {
                const active = selectedRefresh.includes(rate);
                return (
                  <button
                    key={rate}
                    onClick={() => toggleArrayFilter(selectedRefresh, rate, setSelectedRefresh)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                      active
                        ? "border-accent bg-accent text-accent-foreground shadow-sm"
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    {rate}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Processor Filter */}
          <FilterSection title="Processor Architecture">
            <div className="space-y-1.5">
              {PROCESSORS.map((p) => {
                const active = selectedProcessor === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProcessor(active ? null : p.id)}
                    className={cn(
                      "w-full text-left rounded-xl border p-2.5 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between",
                      active
                        ? "border-accent bg-accent/10 text-accent font-bold"
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    <span>{p.label}</span>
                    {active && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Battery Capacity */}
          <FilterSection title="Battery Capacity">
            <div className="space-y-1.5">
              {BATTERY_RANGES.map((b) => {
                const active = selectedBattery === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBattery(active ? null : b.id)}
                    className={cn(
                      "w-full text-left rounded-xl border p-2.5 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between",
                      active
                        ? "border-accent bg-accent/10 text-accent font-bold"
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    <span>{b.label}</span>
                    {active && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Toggles: 5G & 50MP+ Camera */}
          <FilterSection title="Special Features">
            <div className="space-y-2">
              <label className="flex items-center justify-between rounded-xl border border-border/40 p-2.5 text-xs font-semibold cursor-pointer hover:bg-muted/20">
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" /> 5G Support
                </span>
                <input
                  type="checkbox"
                  checked={only5G}
                  onChange={(e) => setOnly5G(e.target.checked)}
                  className="accent-accent h-4 w-4 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-border/40 p-2.5 text-xs font-semibold cursor-pointer hover:bg-muted/20">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" /> 48MP / 50MP+ Pro Camera
                </span>
                <input
                  type="checkbox"
                  checked={camera50MP}
                  onChange={(e) => setCamera50MP(e.target.checked)}
                  className="accent-accent h-4 w-4 rounded cursor-pointer"
                />
              </label>
            </div>
          </FilterSection>

        </aside>

        {/* Product Cards Animated Grid */}
        <main>
          {filteredPhones.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/70 p-12 text-center bg-card">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="font-display text-lg font-bold mb-1">No matching phones found</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Try loosening your filters or resetting search keywords.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-accent-foreground shadow-md hover:scale-105 transition-transform"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in zoom-in-95 duration-300">
              {filteredPhones.map((phone) => (
                <div key={phone.id} className="relative group">
                  {phone.conditionType === "Used" && (
                    <div className="absolute top-3 left-3 z-20 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-extrabold uppercase text-slate-950 shadow-md">
                      Pre-Owned ({phone.conditionDetail})
                    </div>
                  )}
                  <ProductCard m={phone} />
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}
