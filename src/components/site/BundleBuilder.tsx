import { useState, useMemo } from "react";
import { Plus, Minus, Check, ShoppingBag, ArrowRight, Trash2, Smartphone, Shield, Zap, Battery, Headphones, Watch, CheckCircle2, ShieldCheck, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type Category = "Phone" | "Case" | "Glass" | "Charger" | "Power Bank" | "Earbuds" | "Watch";

interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  color?: string;
  description?: string;
}

// Mock Data
const PRODUCTS: Product[] = [
  // Phones
  { id: "p1", name: "Apple iPhone 17 Pro Max", price: 159900, category: "Phone", image: "/bundle/iphone.jpg" },
  { id: "p2", name: "Samsung Galaxy S26 Ultra", price: 129999, category: "Phone", image: "/bundle/samsung.jpg" },
  { id: "p3", name: "Google Pixel 9 Pro XL", price: 106999, category: "Phone", image: "/bundle/pixel.jpg" },
  
  // Cases
  { id: "c1", name: "MagSafe Clear Case", price: 4900, category: "Case", image: "/bundle/case_clear.jpg" },
  { id: "c2", name: "Premium Leather Folio", price: 5900, category: "Case", image: "/bundle/case_leather.jpg" },
  { id: "c3", name: "Rugged Armor Case", price: 2500, category: "Case", image: "/bundle/case_rugged.jpg" },

  // Glass
  { id: "g1", name: "9H Edge-to-Edge Glass", price: 999, category: "Glass", image: "/bundle/glass_clear.jpg" },
  { id: "g2", name: "Privacy Tempered Glass", price: 1499, category: "Glass", image: "/bundle/glass_privacy.jpg" },
  { id: "g3", name: "Matte Gaming Glass", price: 1299, category: "Glass", image: "/bundle/glass_matte.jpg" },

  // Charger
  { id: "ch1", name: "20W Fast Charger adapter", price: 1900, category: "Charger", image: "/bundle/charger_20w.jpg" },
  { id: "ch2", name: "65W GaN Dual Port", price: 3499, category: "Charger", image: "/bundle/charger_65w.jpg" },
  { id: "ch3", name: "15W Wireless Charging Pad", price: 4500, category: "Charger", image: "/bundle/charger_wireless.jpg" },

  // Power Bank
  { id: "pb1", name: "MagSafe Battery Pack", price: 9500, category: "Power Bank", image: "/bundle/pb_magsafe.jpg" },
  { id: "pb2", name: "10000mAh Ultra Slim", price: 2499, category: "Power Bank", image: "/bundle/pb_slim.jpg" },
  { id: "pb3", name: "20000mAh 65W PD Bank", price: 4999, category: "Power Bank", image: "/bundle/pb_pro.jpg" },

  // Earbuds
  { id: "e1", name: "AirPods Pro (2nd Gen)", price: 24900, category: "Earbuds", image: "/bundle/earbuds_airpods.jpg" },
  { id: "e2", name: "Galaxy Buds 2 Pro", price: 14999, category: "Earbuds", image: "/bundle/earbuds_galaxy.jpg" },
  { id: "e3", name: "Nothing Ear (2)", price: 9999, category: "Earbuds", image: "/bundle/earbuds_nothing.jpg" },

  // Watch
  { id: "w1", name: "Apple Watch Series 9", price: 41900, category: "Watch", image: "/bundle/watch_apple.jpg" },
  { id: "w2", name: "Galaxy Watch 6 Classic", price: 36999, category: "Watch", image: "/bundle/watch_galaxy.jpg" },
  { id: "w3", name: "Pixel Watch 2", price: 39900, category: "Watch", image: "/bundle/watch_pixel.jpg" },
];

const CATEGORIES: { id: Category; icon: any; label: string; description: string }[] = [
  { id: "Phone", icon: Smartphone, label: "Select Phone", description: "Start with your dream device" },
  { id: "Case", icon: Shield, label: "Add a Case", description: "Protect your investment" },
  { id: "Glass", icon: ShieldCheck, label: "Screen Guard", description: "Keep the display pristine" },
  { id: "Charger", icon: Zap, label: "Power Brick", description: "Fast charging adapter" },
  { id: "Power Bank", icon: Battery, label: "Power Bank", description: "Juice up on the go" },
  { id: "Earbuds", icon: Headphones, label: "Wireless Audio", description: "Immersive sound experience" },
  { id: "Watch", icon: Watch, label: "Smartwatch", description: "Stay connected anywhere" },
];

export function BundleBuilder() {
  const [selectedItems, setSelectedItems] = useState<Record<string, Product>>({});
  const [activeTab, setActiveTab] = useState<Category>("Phone");

  const handleSelect = (product: Product) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[product.category]?.id === product.id) {
        delete next[product.category]; // Toggle off if already selected
      } else {
        next[product.category] = product; // Set new
      }
      return next;
    });
  };

  const handleRemove = (category: Category) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      delete next[category];
      return next;
    });
  };

  const selectedArray = Object.values(selectedItems);
  const itemCount = selectedArray.length;
  
  const subtotal = selectedArray.reduce((acc, item) => acc + item.price, 0);
  
  // Dynamic Discount Logic
  // 1 item: 0%
  // 2 items: 5%
  // 3-4 items: 10%
  // 5-6 items: 15%
  // 7 items (full bundle): 20%
  const discountPercent = useMemo(() => {
    if (itemCount === 7) return 0.20;
    if (itemCount >= 5) return 0.15;
    if (itemCount >= 3) return 0.10;
    if (itemCount === 2) return 0.05;
    return 0;
  }, [itemCount]);

  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount;

  // Formatting helper
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel: Catalog Selection */}
        <div className="flex-1 space-y-8">
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSelected = !!selectedItems[cat.id];
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[100px] p-3 rounded-2xl border-2 transition-all snap-center shrink-0",
                    isActive 
                      ? "border-amber-500 bg-amber-500/10 text-amber-500" 
                      : isSelected 
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10" 
                        : "border-border bg-card hover:border-amber-500/30 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="relative mb-2">
                    <Icon className="h-6 w-6" />
                    {isSelected && (
                      <div className="absolute -top-1 -right-2 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-background">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">{cat.id}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Products */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-display font-bold">
                {CATEGORIES.find(c => c.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                {CATEGORIES.find(c => c.id === activeTab)?.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {PRODUCTS.filter(p => p.category === activeTab).map((product) => {
                const isSelected = selectedItems[activeTab]?.id === product.id;
                
                return (
                  <div 
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className={cn(
                      "group relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                      isSelected 
                        ? "border-amber-500 bg-amber-500/5" 
                        : "border-border bg-card hover:border-amber-500/40"
                    )}
                  >
                    <div className="h-20 w-20 shrink-0 rounded-xl bg-muted overflow-hidden flex items-center justify-center p-2 mr-4">
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-tight line-clamp-2">{product.name}</h4>
                      <p className="mt-2 text-sm font-semibold text-amber-500">{formatPrice(product.price)}</p>
                    </div>
                    <div className={cn(
                      "ml-3 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                      isSelected ? "border-amber-500 bg-amber-500" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="h-3.5 w-3.5 text-slate-950 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: The Bundle Cart */}
        <div className="lg:w-[400px] shrink-0">
          <div className="sticky top-24 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-luxe p-6 flex flex-col max-h-[calc(100vh-7rem)] z-10">
            
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h3 className="font-display font-bold text-xl flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-500" />
                Your Bundle
              </h3>
              <div className="text-xs font-bold bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full">
                {itemCount} Items
              </div>
            </div>

            {/* Added Items List with Animation */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-6 scrollbar-thin scrollbar-thumb-border min-h-0">
              {itemCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-2xl opacity-50">
                  <ShoppingBag className="h-10 w-10 mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium">Your bundle is empty</p>
                  <p className="text-xs text-muted-foreground mt-1">Select a phone to start building</p>
                </div>
              ) : (
                <div className="space-y-3 flex flex-col justify-end">
                  {CATEGORIES.map(cat => {
                    const item = selectedItems[cat.id];
                    if (!item) return null;
                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border animate-in fade-in slide-in-from-right-4 duration-300"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="h-10 w-10 rounded-lg bg-muted p-1 shrink-0">
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                          </div>
                          <div className="truncate pr-2">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">{cat.id}</p>
                            <p className="text-sm font-semibold truncate">{item.name}</p>
                            <p className="text-xs font-medium text-amber-500">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemove(cat.id)}
                          className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="space-y-3 border-t border-border pt-6 shrink-0">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-sm text-emerald-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4" /> Bundle Discount ({(discountPercent * 100).toFixed(0)}%)
                  </span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {itemCount < 7 && itemCount > 0 && (
                <p className="text-[11px] text-amber-500/80 font-medium text-center bg-amber-500/10 rounded-lg p-2">
                  Add {7 - itemCount} more items to unlock the maximum 20% discount!
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                <span className="font-bold">Total</span>
                <span className="font-display text-2xl font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              disabled={itemCount === 0}
              className="mt-6 w-full shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:grayscale group"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount === 0 ? "Build Bundle to Checkout" : "Checkout Bundle"}
              {itemCount > 0 && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            {itemCount > 0 && (
              <p className="text-center text-xs text-muted-foreground mt-4 shrink-0 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                All items include original manufacturer warranty
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
