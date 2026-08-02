import { useState } from "react";
import { Smartphone, ShieldCheck, Zap, Cable, Battery, Headphones, Monitor, ChevronDown, Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Accessory = {
  id: string;
  name: string;
  price: number;
  category: string;
  compatibleWith: string[];
  image: string | null;
};

const PHONES = [
  { id: "iphone15pro", name: "iPhone 15 Pro", brand: "Apple" },
  { id: "iphone15promax", name: "iPhone 15 Pro Max", brand: "Apple" },
  { id: "iphone14", name: "iPhone 14", brand: "Apple" },
  { id: "s24ultra", name: "Galaxy S24 Ultra", brand: "Samsung" },
  { id: "s24plus", name: "Galaxy S24+", brand: "Samsung" },
  { id: "s23fe", name: "Galaxy S23 FE", brand: "Samsung" },
  { id: "pixel8pro", name: "Pixel 8 Pro", brand: "Google" },
  { id: "pixel8", name: "Pixel 8", brand: "Google" },
  { id: "op12", name: "OnePlus 12", brand: "OnePlus" },
  { id: "op12r", name: "OnePlus 12R", brand: "OnePlus" },
];

const ACCESSORIES: Accessory[] = [
  // Cases
  { id: "c1", name: "MagSafe Clear Case", price: 4900, category: "Cases", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14"], image: "/bundle/case_clear.jpg" },
  { id: "c2", name: "Leather Wallet Case", price: 5900, category: "Cases", compatibleWith: ["iphone15pro", "iphone15promax"], image: "/bundle/case_leather.jpg" },
  { id: "c3", name: "Rugged Armor Case", price: 1499, category: "Cases", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/case_rugged.jpg" },
  { id: "c4", name: "Galaxy Silicone Cover", price: 2499, category: "Cases", compatibleWith: ["s24ultra", "s24plus", "s23fe"], image: "/compat/case_samsung.svg" },
  { id: "c5", name: "Pixel Bellroy Case", price: 3999, category: "Cases", compatibleWith: ["pixel8pro", "pixel8"], image: "/compat/case_pixel.svg" },
  { id: "c6", name: "OnePlus Sandstone Bumper", price: 1999, category: "Cases", compatibleWith: ["op12", "op12r"], image: "/compat/case_oneplus.svg" },

  // Chargers
  { id: "ch1", name: "20W USB-C Adapter", price: 1900, category: "Chargers", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/charger_20w.jpg" },
  { id: "ch2", name: "65W GaN Dual Port", price: 3499, category: "Chargers", compatibleWith: ["iphone15pro", "iphone15promax", "s24ultra", "s24plus", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/charger_65w.jpg" },
  { id: "ch3", name: "MagSafe 15W Wireless Pad", price: 4500, category: "Chargers", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14"], image: "/bundle/charger_wireless.svg" },
  { id: "ch4", name: "100W SUPERVOOC Charger", price: 2999, category: "Chargers", compatibleWith: ["op12", "op12r"], image: "/compat/charger_supervooc.svg" },
  { id: "ch5", name: "25W Samsung Super Fast", price: 1499, category: "Chargers", compatibleWith: ["s24ultra", "s24plus", "s23fe"], image: "/compat/charger_samsung.svg" },

  // Cables
  { id: "cb1", name: "USB-C to USB-C (1m)", price: 990, category: "Cables", compatibleWith: ["iphone15pro", "iphone15promax", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/compat/cable_usbc.svg" },
  { id: "cb2", name: "USB-C to USB-C (2m Braided)", price: 1490, category: "Cables", compatibleWith: ["iphone15pro", "iphone15promax", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/compat/cable_braided.svg" },
  { id: "cb3", name: "Lightning to USB-C", price: 1900, category: "Cables", compatibleWith: ["iphone14"], image: "/compat/cable_lightning.svg" },
  { id: "cb4", name: "Thunderbolt 4 Cable", price: 6900, category: "Cables", compatibleWith: ["iphone15pro", "iphone15promax", "pixel8pro"], image: "/compat/cable_thunderbolt.svg" },

  // Power Banks
  { id: "pb1", name: "MagSafe Battery Pack", price: 9500, category: "Power Banks", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14"], image: "/bundle/pb_magsafe.svg" },
  { id: "pb2", name: "10000mAh Slim PD", price: 2499, category: "Power Banks", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/pb_slim.svg" },
  { id: "pb3", name: "20000mAh 65W PD Pro", price: 4999, category: "Power Banks", compatibleWith: ["iphone15pro", "iphone15promax", "s24ultra", "s24plus", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/pb_pro.svg" },

  // Earbuds
  { id: "e1", name: "AirPods Pro 2nd Gen", price: 24900, category: "Earbuds", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14"], image: "/bundle/earbuds_airpods.jpg" },
  { id: "e2", name: "Galaxy Buds3 Pro", price: 17999, category: "Earbuds", compatibleWith: ["s24ultra", "s24plus", "s23fe"], image: "/bundle/earbuds_galaxy.jpg" },
  { id: "e3", name: "Pixel Buds Pro 2", price: 19999, category: "Earbuds", compatibleWith: ["pixel8pro", "pixel8"], image: "/compat/earbuds_pixel.svg" },
  { id: "e4", name: "Nothing Ear (a)", price: 6999, category: "Earbuds", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/earbuds_nothing.jpg" },
  { id: "e5", name: "OnePlus Buds 3", price: 5499, category: "Earbuds", compatibleWith: ["op12", "op12r", "s24ultra", "s24plus", "pixel8pro", "pixel8"], image: "/compat/earbuds_oneplus.svg" },

  // Tempered Glass
  { id: "tg1", name: "HD Clear Tempered Glass", price: 699, category: "Tempered Glass", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/glass_clear.jpg" },
  { id: "tg2", name: "Privacy Screen Guard", price: 1299, category: "Tempered Glass", compatibleWith: ["iphone15pro", "iphone15promax", "s24ultra", "s24plus", "pixel8pro"], image: "/bundle/glass_privacy.jpg" },
  { id: "tg3", name: "Matte Anti-Glare Guard", price: 999, category: "Tempered Glass", compatibleWith: ["iphone15pro", "iphone15promax", "iphone14", "s24ultra", "s24plus", "s23fe", "pixel8pro", "pixel8", "op12", "op12r"], image: "/bundle/glass_matte.jpg" },
];

const CATEGORIES = ["Cases", "Chargers", "Cables", "Power Banks", "Earbuds", "Tempered Glass"];
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Cases: ShieldCheck,
  Chargers: Zap,
  Cables: Cable,
  "Power Banks": Battery,
  Earbuds: Headphones,
  "Tempered Glass": Monitor,
};

export function CompatibilityChecker() {
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const phone = PHONES.find(p => p.id === selectedPhone);

  const compatible = ACCESSORIES.filter(a =>
    selectedPhone ? a.compatibleWith.includes(selectedPhone) : false
  );

  const filteredByCategory = activeCategory
    ? compatible.filter(a => a.category === activeCategory)
    : compatible;

  const categoryCounts = CATEGORIES.map(cat => ({
    name: cat,
    count: compatible.filter(a => a.category === cat).length,
  }));

  const filteredPhones = PHONES.filter(p =>
    `${p.brand} ${p.name}`.toLowerCase().includes(searchQ.toLowerCase())
  );

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">

      {/* Phone Selector */}
      <div className="relative max-w-md mx-auto">
        <button
          onClick={() => setDropdownOpen(v => !v)}
          className={cn(
            "w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border transition-all text-left",
            selectedPhone
              ? "bg-card border-accent/40 shadow-md"
              : "bg-muted/30 border-border/50 hover:border-accent/40"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Smartphone className="h-5 w-5 text-accent" />
            </div>
            <div>
              {phone ? (
                <>
                  <p className="font-bold text-sm">{phone.name}</p>
                  <p className="text-xs text-muted-foreground">{phone.brand}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground font-medium">Select a phone to check compatibility…</p>
              )}
            </div>
          </div>
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", dropdownOpen && "rotate-180")} />
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border/60 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-3 border-b border-border/40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search phones…"
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {filteredPhones.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No phones found</p>
              )}
              {filteredPhones.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPhone(p.id); setDropdownOpen(false); setSearchQ(""); setActiveCategory(null); }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm transition-colors",
                    selectedPhone === p.id ? "bg-accent/10 text-accent font-bold" : "hover:bg-muted/50"
                  )}
                >
                  <span><span className="text-muted-foreground mr-2">{p.brand}</span>{p.name}</span>
                  {selectedPhone === p.id && <Check className="h-4 w-4 text-accent" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {selectedPhone && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Summary Bar */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-bold text-foreground">{compatible.length}</span> compatible accessories for <span className="font-bold text-foreground">{phone?.name}</span>
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                !activeCategory ? "bg-accent text-accent-foreground border-accent shadow-md" : "bg-muted/20 border-border/50 hover:border-accent/40 text-muted-foreground"
              )}
            >
              All ({compatible.length})
            </button>
            {categoryCounts.map(cat => {
              const Icon = CATEGORY_ICONS[cat.name];
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5",
                    activeCategory === cat.name
                      ? "bg-accent text-accent-foreground border-accent shadow-md"
                      : cat.count > 0
                        ? "bg-muted/20 border-border/50 hover:border-accent/40 text-foreground"
                        : "bg-muted/10 border-border/30 text-muted-foreground/50 cursor-not-allowed"
                  )}
                  disabled={cat.count === 0}
                >
                  <Icon className="h-3.5 w-3.5" /> {cat.name}
                  <span className={cn(
                    "ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black",
                    cat.count > 0 ? "bg-foreground/10" : "bg-transparent"
                  )}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredByCategory.map((acc, idx) => {
              const Icon = CATEGORY_ICONS[acc.category];
              return (
                <div
                  key={acc.id}
                  className="group bg-card border border-border/50 rounded-2xl p-4 hover:border-accent/40 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "backwards" }}
                >
                  {/* Image / Placeholder */}
                  <div className="w-full aspect-[4/3] rounded-xl bg-muted/20 mb-4 overflow-hidden flex items-center justify-center">
                    {acc.image ? (
                      <img src={acc.image} alt={acc.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Icon className="h-12 w-12 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-accent font-bold uppercase tracking-wider mb-1">{acc.category}</p>
                      <h4 className="font-bold text-sm leading-tight">{acc.name}</h4>
                    </div>
                    <p className="text-sm font-bold shrink-0">{formatPrice(acc.price)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-emerald-500">
                    <Check className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold">Compatible with {phone?.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredByCategory.length === 0 && (
            <div className="text-center py-16">
              <X className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-bold text-muted-foreground">No compatible accessories in this category</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try selecting a different category above.</p>
            </div>
          )}

        </div>
      )}

      {/* Empty State */}
      {!selectedPhone && (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Smartphone className="h-10 w-10 text-accent" />
          </div>
          <h3 className="text-xl font-display font-bold mb-2">Select a phone above</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Choose your device and we'll instantly show you every compatible case, charger, cable, power bank, earbud and screen guard.
          </p>
        </div>
      )}
    </div>
  );
}
