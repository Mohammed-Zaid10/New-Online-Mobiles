import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, Battery, Camera, Flame, Cpu, Smartphone, VolumeX, ArrowRight, Zap, CheckCircle2, AlertTriangle, Clock, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeRepair } from "@/lib/gemini";

const ISSUES = [
  { id: "Battery drains fast", icon: Battery },
  { id: "Phone heating", icon: Flame },
  { id: "No charging", icon: Zap },
  { id: "Broken screen", icon: Smartphone },
  { id: "No sound", icon: VolumeX },
  { id: "Camera issue", icon: Camera },
];

export function AiRepair() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    possibleCause: string;
    estimatedRepair: string;
    repairTime: string;
    precautions: string[];
  } | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!brand || !model || !issue) return;
    
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await analyzeRepair({ data: { brand, model, issue } });
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Input Section */}
      <div className="rounded-3xl border border-border/50 bg-card p-6 md:p-8 shadow-soft">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Brand</label>
              <input
                type="text"
                placeholder="e.g. Apple, Samsung"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-3 text-sm font-medium transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Model</label>
              <input
                type="text"
                placeholder="e.g. iPhone 13 Pro"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-3 text-sm font-medium transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">What's wrong?</label>
            <div className="grid grid-cols-2 gap-2">
              {ISSUES.map(i => {
                const Icon = i.icon;
                const active = issue === i.id;
                return (
                  <button
                    key={i.id}
                    onClick={() => setIssue(i.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border p-3 text-left text-[13px] font-semibold transition-all cursor-pointer",
                      active 
                        ? "border-accent bg-accent/10 text-accent shadow-sm" 
                        : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/30"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{i.id}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={!brand || !model || !issue || loading}
            className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
          >
            {loading ? (
              <>
                <Activity className="h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                Analyze Issue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm font-medium text-red-500 animate-in fade-in zoom-in-95">
          {error}
        </div>
      )}

      {/* Results Section */}
      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Cause */}
            <div className="col-span-full rounded-2xl border border-border/50 bg-card p-6 shadow-soft sm:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-display text-lg font-bold">Diagnosis</h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground/90">{result.possibleCause}</p>
            </div>

            {/* Cost & Time */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Wrench className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-display text-lg font-bold">Estimated Repair</h3>
              </div>
              <p className="text-sm font-medium text-foreground/90">{result.estimatedRepair}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft sm:col-span-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                <h3 className="font-bold text-sm">Time Needed</h3>
              </div>
              <p className="text-xl font-display font-black text-foreground">{result.repairTime}</p>
            </div>
            
            {/* Precautions */}
            <div className="col-span-full rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                </div>
                <h3 className="font-display text-lg font-bold text-amber-700 dark:text-amber-400">Immediate Precautions</h3>
              </div>
              <ul className="space-y-3">
                {result.precautions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-amber-800/80 dark:text-amber-200/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-center pt-4">
            <Link
              to="/book-repair"
              className="group flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Book Repair Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
