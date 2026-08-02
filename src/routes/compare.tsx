import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Plus, Download, Cpu, Battery, Camera, Smartphone, Trophy, Star, ShieldCheck, Zap } from "lucide-react";
import QRCode from "react-qr-code";
import { mobiles, type Mobile } from "@/data/mobiles";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr } from "@/lib/shop";
import { cn } from "@/lib/utils";
import { generateCompareReport } from "@/lib/gemini";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Phones — Online Mobiles" },
      { name: "description", content: "Advanced side-by-side spec comparison between up to 4 smartphones with AI insights." },
      { property: "og:url", content: `${SHOP.siteUrl}/compare` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/compare` }],
  }),
  component: ComparePage,
});

type EnrichedSpec = {
  id: string;
  resolution: string;
  refreshRate: string;
  gpu: string;
  frontCamera: string;
  chargingSpeed: string;
  dimensions: string;
  wifiVersion: string;
  bluetoothVersion: string;
  nfc: string;
  waterResistance: string;
  fingerprintType: string;
  faceUnlock: string;
  simType: string;
  pros: string[];
  cons: string[];
  ratings: Record<string, number>;
};

type AIReport = {
  specs: EnrichedSpec[];
  summary: {
    bestCamera: { phoneId: string; reason: string };
    bestGaming: { phoneId: string; reason: string };
    bestBattery: { phoneId: string; reason: string };
    bestBudget: { phoneId: string; reason: string };
    overallWinner: { phoneId: string; reason: string };
  };
};

function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([mobiles[0].id, mobiles[1].id]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AIReport | null>(null);

  const selectedPhones = selectedIds.map(id => mobiles.find(m => m.id === id)!).filter(Boolean);

  const addPhone = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setPickerOpen(false);
    setReport(null);
  };

  const removePhone = (id: string) => {
    setSelectedIds(selectedIds.filter(x => x !== id));
    setReport(null);
  };

  const handleGenerate = async () => {
    if (selectedPhones.length < 2) return;
    setLoading(true);
    try {
      const data = await generateCompareReport({
        data: {
          phones: selectedPhones.map(p => ({
            id: p.id, brand: p.brand, model: p.model, price: p.price,
            processor: p.specs.processor, display: p.specs.display
          }))
        }
      });
      setReport(data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed pb-20"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,8,8,0.75), rgba(8,8,8,0.95)), url('/backgrounds/features-bg.jpg')" }}
    >
      <div className="no-print">
        <PageHeader eyebrow="Pro Tool" title="Compare Phones" subtitle="Select up to 4 phones for a deep spec comparison and AI analysis." />
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <Breadcrumbs items={[{ label: "Compare" }]} />
        </div>
      </div>

      {/* Print Header (Only visible in PDF) */}
      <div className="hidden print-only print-break-inside-avoid mb-8">
        <div className="flex items-center justify-between border-b-2 border-accent pb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt={SHOP.name} className="h-12 w-12 rounded-full object-contain bg-black" />
            <div>
              <h1 className="text-2xl font-bold font-display text-accent">{SHOP.name}</h1>
              <p className="text-sm text-muted-foreground">Your Trusted Mobile Store</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">Comparison Report</h2>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Phone Selector UI (No Print) */}
        <div className="no-print mb-8 flex flex-wrap items-center gap-4 bg-card p-4 rounded-2xl border border-border/60 shadow-soft">
          {selectedPhones.map(phone => (
            <div key={phone.id} className="relative flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 p-2 pr-4 transition-all">
              <img src={phone.images[0]} alt={phone.model} className="h-10 w-10 rounded-lg object-cover bg-white" />
              <div className="text-sm font-semibold">{phone.model}</div>
              {selectedPhones.length > 2 && (
                <button onClick={() => removePhone(phone.id)} className="absolute -right-2 -top-2 rounded-full bg-red-500 text-white p-1 hover:bg-red-600 shadow-md">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
          
          {selectedIds.length < 4 && (
            <div className="relative">
              <button 
                onClick={() => setPickerOpen(!pickerOpen)}
                className="flex items-center gap-2 rounded-xl border border-dashed border-accent/50 bg-accent/5 px-4 py-3 text-sm font-semibold text-accent hover:bg-accent/10 transition-colors"
              >
                <Plus className="h-4 w-4" /> Add Phone
              </button>
              {pickerOpen && (
                <div className="absolute top-full mt-2 left-0 z-50 w-64 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-2 shadow-xl shadow-black/10 max-h-[40vh] overflow-y-auto scrollbar-thin">
                  {mobiles.filter(m => !selectedIds.includes(m.id)).map(m => (
                    <button key={m.id} onClick={() => addPhone(m.id)} className="w-full flex items-center gap-3 rounded-lg p-2 hover:bg-muted text-left transition-colors">
                      <img src={m.images[0]} alt={m.model} className="h-8 w-8 rounded-md object-cover bg-white" />
                      <span className="text-sm font-medium">{m.model}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading || selectedPhones.length < 2}
              className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer shadow-md"
            >
              {loading ? "Analyzing..." : "Generate AI Insights"}
            </button>
            {report && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-105 shadow-md"
              >
                <Download className="h-4 w-4" /> Export PDF
              </button>
            )}
          </div>
        </div>

        {/* The Comparison Data */}
        <div className="space-y-12">
          
          {/* Main Table */}
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft print-break-inside-avoid">
            {/* Sticky Header */}
            <div className={cn(
              "grid border-b-2 border-border/80 bg-muted/30 sticky top-[73px] z-30",
              `grid-cols-${selectedPhones.length + 1} print-grid-cols-${selectedPhones.length + 1}`
            )}>
              <div className="p-4 flex items-center justify-center border-r border-border/40">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Compare</span>
              </div>
              {selectedPhones.map(phone => (
                <div key={phone.id} className="p-4 text-center border-r border-border/40 last:border-0 relative bg-card">
                  <img src={phone.images[0]} alt={phone.model} className="mx-auto h-32 w-32 rounded-xl object-contain mix-blend-multiply bg-transparent mb-3 transition-transform hover:scale-110" />
                  <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">{phone.brand}</div>
                  <h3 className="font-display text-base font-bold leading-tight mb-2">{phone.model}</h3>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{inr(phone.price)}</div>
                </div>
              ))}
            </div>

            {/* Basic Specs (Always available) */}
            <SpecRow label="Display" icon={Smartphone} phones={selectedPhones} getValue={p => p.specs.display} />
            <SpecRow label="Processor" icon={Cpu} phones={selectedPhones} getValue={p => p.specs.processor} />
            <SpecRow label="RAM" icon={Cpu} phones={selectedPhones} getValue={p => p.specs.ram} />
            <SpecRow label="Storage" icon={HardDriveIcon} phones={selectedPhones} getValue={p => p.storage.join(" / ")} />
            <SpecRow label="Camera" icon={Camera} phones={selectedPhones} getValue={p => p.specs.camera} />
            <SpecRow label="Battery" icon={Battery} phones={selectedPhones} getValue={p => p.specs.battery} />
            
            {/* AI Enriched Specs */}
            {report && (
              <>
                <SpecRow label="Refresh Rate" icon={Zap} phones={selectedPhones} getValue={p => report.specs.find(s => s.id === p.id)?.refreshRate} />
                <SpecRow label="Front Camera" icon={Camera} phones={selectedPhones} getValue={p => report.specs.find(s => s.id === p.id)?.frontCamera} />
                <SpecRow label="Charging Speed" icon={Zap} phones={selectedPhones} getValue={p => report.specs.find(s => s.id === p.id)?.chargingSpeed} />
                <SpecRow label="Water Resistance" icon={ShieldCheck} phones={selectedPhones} getValue={p => report.specs.find(s => s.id === p.id)?.waterResistance} />
                <SpecRow label="Security" icon={ShieldCheck} phones={selectedPhones} getValue={p => {
                  const s = report.specs.find(x => x.id === p.id);
                  return s ? `${s.fingerprintType} / ${s.faceUnlock}` : "";
                }} />
              </>
            )}
          </div>

          {/* AI Features (Ratings, Pros/Cons, Summary) */}
          {report && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Feature Cards (Pros/Cons) */}
              <div className="print-break-before print-break-inside-avoid">
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-accent" /> Pros & Cons
                </h3>
                <div className={cn("grid gap-6", `grid-cols-1 md:grid-cols-${selectedPhones.length} print-grid-cols-${selectedPhones.length}`)}>
                  {selectedPhones.map(phone => {
                    const spec = report.specs?.find(s => s.id === phone.id);
                    return (
                      <div key={phone.id} className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft flex flex-col h-full">
                        <div className="font-display font-bold text-lg mb-4 text-center">{phone.model}</div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Pros</div>
                            <ul className="space-y-2">
                              {spec?.pros?.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" /> <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">Cons</div>
                            <ul className="space-y-2">
                              {spec?.cons?.map((con, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <X className="h-4 w-4 shrink-0 text-red-500 mt-0.5" /> <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Summary Winners */}
              <div className="print-break-inside-avoid">
                <h3 className="font-display text-2xl font-bold mb-6">AI Verdict</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print-grid-cols-3">
                  <WinnerCard title="Best Camera" data={report.summary?.bestCamera} phones={selectedPhones} icon={Camera} color="text-rose-500" bg="bg-rose-500/10" />
                  <WinnerCard title="Best Gaming" data={report.summary?.bestGaming} phones={selectedPhones} icon={Cpu} color="text-violet-500" bg="bg-violet-500/10" />
                  <WinnerCard title="Best Battery" data={report.summary?.bestBattery} phones={selectedPhones} icon={Battery} color="text-emerald-500" bg="bg-emerald-500/10" />
                  <WinnerCard title="Best Value" data={report.summary?.bestBudget} phones={selectedPhones} icon={Zap} color="text-amber-500" bg="bg-amber-500/10" />
                  
                  <div className="sm:col-span-2 lg:col-span-2 print-grid-cols-2 rounded-2xl border-2 border-accent bg-accent/5 p-6 shadow-luxe flex flex-col sm:flex-row items-center gap-6">
                    <div className="shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-accent text-accent-foreground shadow-lg">
                      <Trophy className="h-10 w-10" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-1">Overall Winner</h4>
                      <h3 className="font-display text-2xl font-black mb-2">
                        {selectedPhones.find(p => p.id === report.summary?.overallWinner?.phoneId)?.model || "Tie"}
                      </h3>
                      <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                        {report.summary?.overallWinner?.reason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Ratings */}
              <div className="print-break-inside-avoid">
                <h3 className="font-display text-2xl font-bold mb-6">Visual Ratings</h3>
                <div className={cn("grid gap-4", `grid-cols-1 md:grid-cols-${selectedPhones.length} print-grid-cols-${selectedPhones.length}`)}>
                  {selectedPhones.map(phone => {
                    const spec = report.specs?.find(s => s.id === phone.id);
                    return (
                      <div key={phone.id} className="rounded-2xl border border-border/50 bg-card p-5 shadow-soft">
                        <div className="font-display font-bold text-center mb-4 pb-4 border-b border-border/40">{phone.model}</div>
                        <div className="space-y-3">
                          <RatingRow label="Camera" value={spec?.ratings?.camera || 0} />
                          <RatingRow label="Gaming" value={spec?.ratings?.gaming || 0} />
                          <RatingRow label="Battery" value={spec?.ratings?.battery || 0} />
                          <RatingRow label="Display" value={spec?.ratings?.display || 0} />
                          <RatingRow label="Value" value={spec?.ratings?.value || 0} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photo Galleries & QR Codes */}
              <div className="print-break-before print-break-inside-avoid">
                <h3 className="font-display text-2xl font-bold mb-6">Gallery & Store Links</h3>
                <div className="space-y-12">
                  {selectedPhones.map(phone => (
                    <div key={phone.id} className="rounded-3xl border border-border/50 bg-muted/10 p-6 flex flex-col md:flex-row gap-8 items-center print-break-inside-avoid">
                      <div className="flex-1">
                        <h4 className="font-display text-xl font-bold mb-4">{phone.model}</h4>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                          {phone.images.slice(0, 4).map((img, i) => (
                            <img key={i} src={img} alt="" className="h-40 w-auto rounded-xl object-cover bg-card shadow-sm border border-border/40" />
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-border/40">
                        <QRCode value={`${SHOP.siteUrl}/mobiles/${phone.brand}/${phone.slug}`} size={120} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">Scan to Buy</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Print Footer */}
        <div className="hidden print-only mt-16 pt-8 border-t border-border/60 text-center">
          <p className="font-display font-bold text-lg">{SHOP.name}</p>
          <p className="text-sm text-muted-foreground mt-1">{SHOP.siteUrl} • {SHOP.phone} • {SHOP.email}</p>
          <p className="text-xs text-muted-foreground/60 mt-4">© {new Date().getFullYear()} {SHOP.name}. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}

function HardDriveIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>;
}

function SpecRow({ label, icon: Icon, phones, getValue }: { label: string; icon: any; phones: Mobile[]; getValue: (p: Mobile) => string | undefined }) {
  return (
    <div className={cn("grid border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors", `grid-cols-${phones.length + 1} print-grid-cols-${phones.length + 1}`)}>
      <div className="p-4 flex items-center gap-2 border-r border-border/40 bg-muted/5">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {phones.map(phone => (
        <div key={phone.id} className="p-4 text-sm text-muted-foreground border-r border-border/40 last:border-0 flex items-center justify-center text-center">
          {getValue(phone) || "—"}
        </div>
      ))}
    </div>
  );
}

function RatingRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} className={cn("h-3.5 w-3.5", star <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted/30")} />
        ))}
      </div>
    </div>
  );
}

function WinnerCard({ title, data, phones, icon: Icon, color, bg }: { title: string; data?: { phoneId: string; reason: string }; phones: Mobile[]; icon: any; color: string; bg: string }) {
  const phone = phones.find(p => p.id === data?.phoneId);
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 mb-3">
        <div className={cn("p-1.5 rounded-lg", bg)}><Icon className={cn("h-4 w-4", color)} /></div>
        <h4 className="text-sm font-bold uppercase tracking-wider">{title}</h4>
      </div>
      <div className="font-display font-bold text-lg mb-2">{phone ? phone.model : "N/A"}</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{data?.reason}</p>
    </div>
  );
}
