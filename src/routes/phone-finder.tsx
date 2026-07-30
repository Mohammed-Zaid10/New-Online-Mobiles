import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { mobiles } from "@/data/mobiles";
import { usedPhones } from "@/data/used";
import { findPhones } from "@/lib/gemini";
import { SHOP, inr, wa } from "@/lib/shop";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { 
  Check, X, ChevronRight, ChevronLeft, Sparkles, 
  Smartphone, Battery, Camera, Gamepad2, Monitor, 
  HardDrive, Signal, Zap, RefreshCw, Search, 
  Star, ArrowRight, Loader2 
} from "lucide-react";

export const Route = createFileRoute("/phone-finder")({
  head: () => ({
    meta: [
      { title: "AI Phone Finder — Online Mobiles" },
      { name: "description", content: "Let our AI find the perfect phone for you based on your needs and budget." },
    ],
  }),
  component: PhoneFinderPage,
});

const BUDGET_OPTIONS = ["Under ₹10K", "₹10K-20K", "₹20K-35K", "₹35K-50K", "₹50K-75K", "₹75K-1L", "Above ₹1L"];
const BRAND_OPTIONS = ["Apple", "Samsung", "Google", "Vivo", "Oppo", "Xiaomi", "OnePlus", "Realme", "Motorola", "Nothing", "Honor", "Any"];
const DISPLAY_OPTIONS = ["Small (under 6.1\")", "Medium (6.1-6.5\")", "Large (6.5\"+)", "Any"];
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB+"];
const YES_NO_CARE = ["Yes", "No", "Don't Care"];
const CONDITION_OPTIONS = ["New Only", "Refurbished OK", "Both"];

function PhoneFinderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    budgetRange: "₹20K-35K",
    brand: "Any",
    gaming: 3,
    camera: 3,
    battery: 3,
    displaySize: "Any",
    storage: "128GB",
    requires5g: "Don't Care",
    fastCharging: "Don't Care",
    condition: "New Only"
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 10;
  const isLastStep = step === totalSteps;

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleFind();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFind = async () => {
    setLoading(true);
    setError(null);
    try {
      let min, max;
      switch(formData.budgetRange) {
        case "Under ₹10K": min = 0; max = 10000; break;
        case "₹10K-20K": min = 10000; max = 20000; break;
        case "₹20K-35K": min = 20000; max = 35000; break;
        case "₹35K-50K": min = 35000; max = 50000; break;
        case "₹50K-75K": min = 50000; max = 75000; break;
        case "₹75K-1L": min = 75000; max = 100000; break;
        case "Above ₹1L": min = 100000; max = undefined; break;
        default: min = undefined; max = undefined;
      }
      
      const res = await findPhones({
        data: {
          budgetMin: min,
          budgetMax: max,
          brand: formData.brand === "Any" ? undefined : formData.brand,
          gaming: formData.gaming,
          camera: formData.camera,
          battery: formData.battery,
          displaySize: formData.displaySize,
          storage: formData.storage,
          requires5g: formData.requires5g === "Yes",
          fastCharging: formData.fastCharging === "Yes",
          condition: formData.condition
        }
      });
      setResults(res);
    } catch (err: any) {
      setError(err.message || "Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPhoneData = (id: string) => {
    const newPhone = mobiles.find(m => m.id === id);
    if (newPhone) return { ...newPhone, isUsed: false };
    const usedPhone = usedPhones.find(m => m.id === id);
    if (usedPhone) return { ...usedPhone, isUsed: true };
    return null;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Smartphone className="text-primary"/> What's your budget?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BUDGET_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("budgetRange", opt)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.budgetRange === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Search className="text-primary"/> Any brand preference?</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {BRAND_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("brand", opt)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    formData.brand === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Gamepad2 className="text-primary"/> How important is gaming?</h3>
            <p className="text-muted-foreground text-sm">1 = Not important, 5 = Very important (Pro Gamer)</p>
            <div className="flex justify-between gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => updateField("gaming", num)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
                    formData.gaming === num 
                      ? "border-primary bg-primary text-primary-foreground font-bold scale-110" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Camera className="text-primary"/> How important is the camera?</h3>
            <p className="text-muted-foreground text-sm">1 = Basic snaps, 5 = Professional quality</p>
            <div className="flex justify-between gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => updateField("camera", num)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
                    formData.camera === num 
                      ? "border-primary bg-primary text-primary-foreground font-bold scale-110" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Battery className="text-primary"/> How important is battery life?</h3>
            <p className="text-muted-foreground text-sm">1 = Casual use, 5 = Needs to last 2 days</p>
            <div className="flex justify-between gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => updateField("battery", num)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
                    formData.battery === num 
                      ? "border-primary bg-primary text-primary-foreground font-bold scale-110" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Monitor className="text-primary"/> Preferred display size?</h3>
            <div className="flex flex-col gap-3">
              {DISPLAY_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("displaySize", opt)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.displaySize === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><HardDrive className="text-primary"/> How much storage do you need?</h3>
            <div className="grid grid-cols-2 gap-3">
              {STORAGE_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("storage", opt)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.storage === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Signal className="text-primary"/> Do you need 5G?</h3>
            <div className="grid grid-cols-3 gap-3">
              {YES_NO_CARE.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("requires5g", opt)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.requires5g === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Zap className="text-primary"/> Fast charging required?</h3>
            <div className="grid grid-cols-3 gap-3">
              {YES_NO_CARE.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("fastCharging", opt)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.fastCharging === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold flex items-center gap-2"><RefreshCw className="text-primary"/> New or Refurbished?</h3>
            <div className="flex flex-col gap-3">
              {CONDITION_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField("condition", opt)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.condition === opt 
                      ? "border-primary bg-primary/10 text-primary font-medium" 
                      : "border-border/60 hover:border-primary/50 bg-card"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="bg-muted py-6 mb-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Phone Finder", to: "/phone-finder" },
            ]}
          />
          <PageHeader
            title="AI Phone Finder"
            description="Let our AI assist you in discovering the perfect smartphone matching your lifestyle, preferences, and budget."
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {!loading && !results && (
          <div className="glass p-6 md:p-8 rounded-2xl shadow-lg border border-border/60">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">Step {step} of {totalSteps}</span>
                <span className="text-sm font-medium text-primary">{Math.round((step / totalSteps) * 100)}% Completed</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
              </div>
            </div>

            <div className="min-h-[250px] flex flex-col justify-center">
              {renderStepContent()}
            </div>

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-border/50">
              <button 
                onClick={prevStep} 
                disabled={step === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-foreground/80 hover:bg-muted disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6B4F3B] text-white font-medium hover:bg-[#6B4F3B]/90 transition-colors"
              >
                {isLastStep ? (
                  <>Find My Phone <Sparkles className="w-4 h-4" /></>
                ) : (
                  <>Next <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="glass p-12 rounded-2xl shadow-lg border border-border/60 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Analyzing Your Needs
              </h2>
              <p className="text-muted-foreground">Scanning our entire inventory to find your perfect matches...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="glass p-8 rounded-2xl border border-red-500/30 bg-red-50/50 text-center space-y-4 animate-in fade-in duration-500">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <X className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-red-700">Something went wrong</h2>
            <p className="text-red-600/80">{error}</p>
            <button 
              onClick={() => { setError(null); setResults(null); setStep(1); }}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {results && !loading && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                Your Top Matches
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based on your preferences, we've found these incredible devices that perfectly match what you're looking for.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((result: any, i: number) => {
                const phone = getPhoneData(result.id);
                if (!phone) return null;
                
                return (
                  <div 
                    key={result.id} 
                    className="glass rounded-2xl overflow-hidden shadow-lg border border-border/60 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="relative p-6 flex justify-center bg-white">
                      <img 
                        src={phone.isUsed ? phone.image : phone.images[0]} 
                        alt={`${phone.brand} ${phone.model}`}
                        className="h-48 object-contain drop-shadow-md"
                      />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold border border-border shadow-sm flex items-center gap-1">
                        <span className="text-primary">{result.matchScore}%</span> Match
                      </div>
                      {phone.isUsed && (
                        <div className="absolute top-4 left-4 bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-xs font-bold border border-amber-200 shadow-sm">
                          Refurbished
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg mb-1">{phone.brand} {phone.model}</h3>
                      <div className="text-2xl font-bold text-primary mb-4">{inr(phone.price)}</div>
                      
                      <div className="bg-primary/5 rounded-xl p-4 mb-4 border border-primary/10">
                        <p className="text-sm leading-relaxed">{result.reason}</p>
                      </div>

                      <div className="space-y-4 mb-6 flex-1">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-1"><Check className="w-3 h-3"/> Pros</h4>
                          <ul className="space-y-1.5">
                            {result.pros.map((pro: string, j: number) => (
                              <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2 flex items-center gap-1"><X className="w-3 h-3"/> Cons</h4>
                          <ul className="space-y-1.5">
                            {result.cons.map((con: string, j: number) => (
                              <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <Link 
                          to="/compare"
                          search={{ ids: [result.id] }}
                          className="flex items-center justify-center py-2.5 rounded-xl border-2 border-border hover:bg-muted font-medium transition-colors text-sm"
                        >
                          Compare
                        </Link>
                        <a 
                          href={wa(`Hi, I found the ${phone.brand} ${phone.model} using your AI Phone Finder. I'm interested in buying it.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#6B4F3B] text-white font-medium hover:bg-[#6B4F3B]/90 transition-colors text-sm"
                        >
                          Buy Now <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => { setResults(null); setStep(1); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border hover:bg-muted font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
