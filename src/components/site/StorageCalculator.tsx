import { useState, useMemo } from "react";
import { HardDrive, Image, Film, AppWindow, Gamepad2, Music, FileText, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  { label: "128GB", value: 128, color: "from-sky-500 to-blue-600" },
  { label: "256GB", value: 256, color: "from-emerald-500 to-teal-600" },
  { label: "512GB", value: 512, color: "from-violet-500 to-purple-600" },
  { label: "1TB", value: 1024, color: "from-amber-500 to-orange-600" },
];

const INPUTS = [
  { id: "photos", label: "Photos", icon: Image, unit: "photos", perUnit: 0.005, placeholder: "e.g. 5000", hint: "~5 MB each (iPhone/Samsung)" },
  { id: "videos", label: "Videos (minutes)", icon: Film, unit: "min", perUnit: 0.35, placeholder: "e.g. 120", hint: "~350 MB per min (4K)" },
  { id: "apps", label: "Apps", icon: AppWindow, unit: "apps", perUnit: 0.2, placeholder: "e.g. 40", hint: "~200 MB average" },
  { id: "games", label: "Games", icon: Gamepad2, unit: "games", perUnit: 2.5, placeholder: "e.g. 8", hint: "~2.5 GB average" },
  { id: "music", label: "Songs", icon: Music, unit: "songs", perUnit: 0.008, placeholder: "e.g. 500", hint: "~8 MB each (320kbps)" },
  { id: "docs", label: "Documents & Files (GB)", icon: FileText, unit: "GB", perUnit: 1, placeholder: "e.g. 5", hint: "Direct GB input" },
];

const OS_OVERHEAD = 15; // GB reserved for OS

export function StorageCalculator() {
  const [values, setValues] = useState<Record<string, number>>({
    photos: 0, videos: 0, apps: 0, games: 0, music: 0, docs: 0,
  });

  const update = (id: string, raw: string) => {
    const n = parseFloat(raw);
    setValues(prev => ({ ...prev, [id]: isNaN(n) ? 0 : Math.max(0, n) }));
  };

  const breakdown = useMemo(() => {
    return INPUTS.map(inp => ({
      ...inp,
      gb: +(values[inp.id] * inp.perUnit).toFixed(1),
    }));
  }, [values]);

  const usedGB = useMemo(() => {
    return breakdown.reduce((sum, b) => sum + b.gb, 0) + OS_OVERHEAD;
  }, [breakdown]);

  const recommended = useMemo(() => {
    return TIERS.find(t => t.value >= usedGB) || TIERS[TIERS.length - 1];
  }, [usedGB]);

  const hasInput = Object.values(values).some(v => v > 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 max-h-[80vh] overflow-y-auto p-4">

      {/* Input Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INPUTS.map(inp => {
          const Icon = inp.icon;
          const gb = (values[inp.id] * inp.perUnit);
          return (
            <div key={inp.id} className="bg-card border border-border/50 rounded-2xl p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-sm">{inp.label}</p>
                  <p className="text-[11px] text-muted-foreground">{inp.hint}</p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                placeholder={inp.placeholder}
                value={values[inp.id] || ""}
                onChange={e => update(inp.id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              {values[inp.id] > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  ≈ <span className="font-bold text-foreground">{gb.toFixed(1)} GB</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Results */}
      {hasInput && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Visual Storage Bar */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-5 overflow-x-auto">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-accent" />
              Storage Breakdown
            </h3>

            {/* Stacked bar */}
            <div className="space-y-3 min-w-[600px]">
              <div className="h-8 w-full bg-muted/30 rounded-full overflow-hidden flex">
                {/* OS */}
                <div
                  className="h-full bg-slate-400/70 transition-all duration-700 ease-out flex items-center justify-center"
                  style={{ width: `${Math.max((OS_OVERHEAD / recommended.value) * 100, 3)}%` }}
                >
                  <span className="text-[9px] font-black text-white/80 truncate px-1">OS</span>
                </div>
                {breakdown.filter(b => b.gb > 0).map(b => {
                  const pct = Math.max((b.gb / recommended.value) * 100, 2);
                  const colors = [
                    "bg-blue-500", "bg-rose-500", "bg-emerald-500",
                    "bg-violet-500", "bg-amber-500", "bg-cyan-500"
                  ];
                  const idx = INPUTS.findIndex(i => i.id === b.id);
                  return (
                    <div
                      key={b.id}
                      className={cn("h-full transition-all duration-700 ease-out flex items-center justify-center", colors[idx])}
                      style={{ width: `${pct}%` }}
                      title={`${b.label}: ${b.gb} GB`}
                    >
                      <span className="text-[9px] font-black text-white/90 truncate px-1">{b.gb > 3 ? b.label : ""}</span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-slate-400/70" />
                  <span className="text-[11px] text-muted-foreground font-medium">OS ({OS_OVERHEAD} GB)</span>
                </div>
                {breakdown.filter(b => b.gb > 0).map(b => {
                  const colors = [
                    "bg-blue-500", "bg-rose-500", "bg-emerald-500",
                    "bg-violet-500", "bg-amber-500", "bg-cyan-500"
                  ];
                  const idx = INPUTS.findIndex(i => i.id === b.id);
                  return (
                    <div key={b.id} className="flex items-center gap-1.5">
                      <div className={cn("w-3 h-3 rounded-sm", colors[idx])} />
                      <span className="text-[11px] text-muted-foreground font-medium">{b.label} ({b.gb} GB)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <span className="text-sm font-semibold text-muted-foreground">Estimated Total</span>
              <span className="text-2xl font-display font-bold">{usedGB.toFixed(1)} GB</span>
            </div>
          </div>

          {/* Recommendation Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map(tier => {
              const isRec = tier.label === recommended.label;
              const fits = tier.value >= usedGB;
              const freeSpace = tier.value - usedGB;
              const usedPct = Math.min((usedGB / tier.value) * 100, 100);

              return (
                <div
                  key={tier.label}
                  className={cn(
                    "relative rounded-2xl p-5 border-2 transition-all duration-300",
                    isRec
                      ? "border-accent bg-accent/5 shadow-lg scale-[1.02]"
                      : fits
                        ? "border-border/50 bg-card hover:border-accent/30"
                        : "border-red-500/20 bg-red-500/5 opacity-60"
                  )}
                >
                  {isRec && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-wider shadow-md">
                      Recommended
                    </div>
                  )}

                  <h4 className="text-2xl font-display font-bold mt-1">{tier.label}</h4>

                  {/* Mini progress bar */}
                  <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden mt-4 mb-2">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r",
                        fits ? tier.color : "from-red-500 to-red-600"
                      )}
                      style={{ width: `${usedPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{usedGB.toFixed(0)} GB used</span>
                    <span>{tier.value} GB total</span>
                  </div>

                  {fits ? (
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-bold">{freeSpace.toFixed(0)} GB free</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs font-bold">Not enough</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tip */}
          <div className="flex items-start gap-3 bg-muted/20 border border-border/40 rounded-2xl p-5">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Pro Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Always pick one tier above your estimated usage. Storage fills up faster than expected — OS updates, cached data, and temporary files can consume 10–20 GB over time.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
