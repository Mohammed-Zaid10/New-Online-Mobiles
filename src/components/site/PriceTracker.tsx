import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle2, Info, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PHONES = [
  {
    id: "iphone15pro",
    name: "iPhone 15 Pro (256GB)",
    msrp: 144900,
    history: [
      { date: "Oct", price: 144900 },
      { date: "Nov", price: 144900 },
      { date: "Dec", price: 139900 },
      { date: "Jan", price: 136500 },
      { date: "Feb", price: 134000 },
      { date: "Mar", price: 134000 },
      { date: "Apr", price: 129000 },
      { date: "May", price: 127500 },
      { date: "Jun", price: 124999 },
    ],
    color: "#3b82f6",
  },
  {
    id: "s24ultra",
    name: "Galaxy S24 Ultra (512GB)",
    msrp: 139999,
    history: [
      { date: "Jan", price: 139999 },
      { date: "Feb", price: 139999 },
      { date: "Mar", price: 132000 },
      { date: "Apr", price: 128500 },
      { date: "May", price: 124000 },
      { date: "Jun", price: 119999 },
    ],
    color: "#10b981",
  },
  {
    id: "pixel8pro",
    name: "Pixel 8 Pro (256GB)",
    msrp: 113999,
    history: [
      { date: "Oct", price: 113999 },
      { date: "Nov", price: 105000 },
      { date: "Dec", price: 99999 },
      { date: "Jan", price: 99999 },
      { date: "Feb", price: 94500 },
      { date: "Mar", price: 92000 },
      { date: "Apr", price: 88999 },
      { date: "May", price: 84999 },
      { date: "Jun", price: 79999 },
    ],
    color: "#f59e0b",
  }
];

export function PriceTracker() {
  const [activePhone, setActivePhone] = useState(PHONES[0]);

  // Calculations
  const data = activePhone.history;
  const currentPrice = data[data.length - 1].price;
  const highestPrice = Math.max(...data.map(d => d.price));
  const lowestPrice = Math.min(...data.map(d => d.price));
  
  const discountFromHigh = highestPrice - currentPrice;
  const discountPercent = ((discountFromHigh / highestPrice) * 100).toFixed(0);

  // Best Time to Buy Logic
  // If current price is within 3% of the all-time low, it's a great time to buy.
  const isBestTime = currentPrice <= lowestPrice * 1.03;
  // If it just dropped recently (last 2 months)
  const previousPrice = data[data.length - 2]?.price || highestPrice;
  const justDropped = currentPrice < previousPrice;

  const formatPrice = (p: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="w-full bg-card rounded-3xl border border-border/70 p-6 md:p-8 shadow-luxe overflow-hidden relative">
      
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2">
            <TrendingDown className="h-6 w-6 text-emerald-500" />
            Dynamic Price Tracker
          </h2>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Track historical price drops and find the perfect time to buy.</p>
        </div>

        <div className="flex flex-wrap gap-2 bg-muted/30 p-1 rounded-full border border-border/50">
          {PHONES.map(phone => (
            <button
              key={phone.id}
              onClick={() => setActivePhone(phone)}
              className={cn(
                "px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300",
                activePhone.id === phone.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {phone.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          
          <div className="bg-muted/20 border border-border/50 rounded-2xl p-5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Today's Price</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-display font-bold text-foreground">{formatPrice(currentPrice)}</h3>
            </div>
            {justDropped && (
              <p className="text-xs text-emerald-500 font-bold mt-2 flex items-center gap-1 bg-emerald-500/10 w-fit px-2 py-1 rounded-full">
                <ArrowDown className="h-3 w-3" /> Price recently dropped!
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/20 border border-border/50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Highest</p>
              <p className="text-base font-bold">{formatPrice(highestPrice)}</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Lowest</p>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">{formatPrice(lowestPrice)}</p>
            </div>
          </div>

          <div className={cn(
            "rounded-2xl p-5 border relative overflow-hidden",
            isBestTime 
              ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/5 border-emerald-500/30" 
              : "bg-gradient-to-br from-amber-500/20 to-orange-500/5 border-amber-500/30"
          )}>
            <div className="flex items-start gap-3 relative z-10">
              {isBestTime ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="h-6 w-6 text-amber-500 shrink-0" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {isBestTime ? "Best Time to Buy!" : "Wait for a Drop"}
                </p>
                <p className="text-xs mt-1 opacity-80">
                  {isBestTime 
                    ? `Currently at its lowest price ever, saving you ${formatPrice(discountFromHigh)} (${discountPercent}% off MSRP).` 
                    : `Prices might drop further. It is currently ${formatPrice(currentPrice - lowestPrice)} above its all-time low.`}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Chart Column */}
        <div className="lg:col-span-3 bg-card border border-border/50 rounded-2xl p-4 md:p-6 h-[400px]">
          <h3 className="font-bold text-sm mb-4 text-muted-foreground">Price History (Last 9 Months)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activePhone.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={activePhone.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12 }} 
                dy={10} 
                stroke="currentColor" 
                className="opacity-50"
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12 }} 
                dx={-10}
                stroke="currentColor" 
                className="opacity-50"
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(150,150,150,0.2)', padding: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
                formatter={(value: number) => [formatPrice(value), "Price"]}
                labelStyle={{ color: '#888', marginBottom: '4px' }}
              />
              {/* Highlight All-Time Low Line */}
              <ReferenceLine y={lowestPrice} stroke="#10b981" strokeDasharray="4 4" strokeOpacity={0.5}>
              </ReferenceLine>

              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={activePhone.color} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: activePhone.color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
