import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Gift, Sparkles, Copy, Check, Lock, Clock, Trophy, Tag, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { useAuth, Coupon } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export interface RewardOption {
  id: string;
  label: string;
  short: string;
  icon: any;
  color: string;
  bgColor: string;
}

const REWARDS: RewardOption[] = [
  { id: "5off", label: "5% Discount", short: "5% OFF", icon: Tag, color: "#f59e0b", bgColor: "#fef3c7" },
  { id: "10off", label: "10% Discount", short: "10% OFF", icon: Tag, color: "#8b5cf6", bgColor: "#ede9fe" },
  { id: "screen", label: "Screen Guard", short: "FREE GUARD", icon: ShieldCheck, color: "#10b981", bgColor: "#d1fae5" },
  { id: "case", label: "Free Case", short: "FREE CASE", icon: Smartphone, color: "#ec4899", bgColor: "#fce7f3" },
  { id: "repair", label: "Repair Coupon", short: "REPAIR OFF", icon: Zap, color: "#3b82f6", bgColor: "#dbeafe" },
  { id: "accessory", label: "Accessory Coupon", short: "ACC. COUPON", icon: Gift, color: "#6366f1", bgColor: "#e0e7ff" },
];

export const SpinWheel: React.FC = () => {
  const { user, openAuthModal, canSpinToday, recordSpin, userCoupons } = useAuth();
  
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonCoupon, setWonCoupon] = useState<Coupon | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Countdown timer to midnight for next spin
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hours.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    // Secondary burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  const handleSpin = () => {
    if (!user) {
      openAuthModal("signin");
      return;
    }

    if (!canSpinToday() || spinning) return;

    setSpinning(true);
    setWonCoupon(null);

    // Pick random reward segment (0 to 5)
    const selectedIndex = Math.floor(Math.random() * REWARDS.length);
    const selectedReward = REWARDS[selectedIndex];

    // Calculate rotation angle
    // Each segment is 360 / 6 = 60 degrees.
    // Pointer is at TOP (270deg or 0deg depending on SVG orientation).
    // Let's do 5 full spins (1800 deg) plus target offset
    const segmentAngle = 360 / REWARDS.length;
    // Segment 0 center is at 30 deg, Segment 1 is 90 deg, etc.
    const targetSegmentCenter = selectedIndex * segmentAngle + segmentAngle / 2;
    // To align selected segment center with pointer at top (0 deg / 360 deg), we rotate counter-clockwise or 360 - target
    const finalRotation = rotation + 1800 + (360 - (rotation % 360)) + (360 - targetSegmentCenter);

    setRotation(finalRotation);

    // Wait for spin animation duration (4.5s)
    setTimeout(() => {
      setSpinning(false);
      try {
        const coupon = recordSpin(selectedReward.label);
        setWonCoupon(coupon);
        triggerConfetti();
      } catch (e) {
        console.error(e);
      }
    }, 4500);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const canSpin = user && canSpinToday();

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-16">
      
      {/* Main Wheel Grid */}
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        
        {/* Left Column: Interactive Spin Wheel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          
          {/* Wheel Pointer Ticker (At Top) */}
          <div className="z-20 -mb-5 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-accent filter drop-shadow-md animate-bounce" />
          </div>

          {/* Wheel Container */}
          <div className="relative p-4 rounded-full bg-card border-4 border-accent/20 shadow-2xl shadow-accent/10">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-8 border-accent shadow-inner">
              
              {/* SVG Wheel Render */}
              <svg
                viewBox="0 0 360 360"
                className="w-full h-full transform transition-transform duration-[4500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {REWARDS.map((reward, index) => {
                  const angle = 360 / REWARDS.length;
                  const startAngle = index * angle;
                  const endAngle = (index + 1) * angle;
                  
                  // Calculate SVG arc path
                  const x1 = 180 + 180 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 180 + 180 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 180 + 180 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 180 + 180 * Math.sin((Math.PI * endAngle) / 180);

                  const pathData = `M 180 180 L ${x1} ${y1} A 180 180 0 0 1 ${x2} ${y2} Z`;

                  // Text rotation
                  const textAngle = startAngle + angle / 2;

                  return (
                    <g key={reward.id}>
                      <path d={pathData} fill={reward.bgColor} stroke="#ffffff" strokeWidth="2" />
                      <g transform={`rotate(${textAngle}, 180, 180)`}>
                        <text
                          x="290"
                          y="185"
                          fill={reward.color}
                          fontWeight="800"
                          fontSize="13"
                          fontFamily="sans-serif"
                          textAnchor="end"
                          transform={`rotate(90, 280, 180)`}
                        >
                          {reward.short}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Center Spinning Hub / Button */}
              <div className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-card border-4 border-accent shadow-xl flex flex-col items-center justify-center z-10 p-2">
                {user ? (
                  <button
                    onClick={handleSpin}
                    disabled={!canSpin || spinning}
                    className={cn(
                      "w-full h-full rounded-full flex flex-col items-center justify-center transition-all font-display font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-md",
                      canSpin && !spinning
                        ? "bg-accent text-accent-foreground hover:scale-105 active:scale-95 animate-pulse"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-80"
                    )}
                  >
                    <Sparkles className="h-5 w-5 mb-0.5" />
                    <span>{spinning ? "Spinning..." : canSpin ? "SPIN!" : "SPUN"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openAuthModal("signin")}
                    className="w-full h-full rounded-full bg-accent text-accent-foreground flex flex-col items-center justify-center transition-transform hover:scale-105 font-display font-extrabold text-[10px] uppercase text-center p-1 cursor-pointer"
                  >
                    <Lock className="h-4 w-4 mb-0.5" />
                    <span>SIGN IN TO SPIN</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Status beneath wheel */}
          <div className="mt-6 text-center">
            {!user ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Sign in or Sign up with Google to unlock daily spins!</span>
              </div>
            ) : canSpinToday() ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ready to spin! Click SPIN to claim today's reward.</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-5 py-2 text-xs font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>Next spin available in: <strong className="text-foreground">{timeLeft}</strong></span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Rewards List & Winning Coupon Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Won Coupon Highlight Card */}
          {wonCoupon && (
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/5 p-6 shadow-xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 rounded-full bg-emerald-500/10 p-8">
                <Trophy className="h-16 w-16 text-emerald-500/30" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Congratulations! 🎉</div>
                  <h3 className="font-display text-xl font-black">{wonCoupon.reward}</h3>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-4">
                Your reward coupon code has been generated and added to your account. Present this code at checkout or at our physical store!
              </p>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-card p-3 shadow-inner">
                <span className="font-mono text-base font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
                  {wonCoupon.code}
                </span>
                <button
                  onClick={() => handleCopy(wonCoupon.code)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  {copiedCode === wonCoupon.code ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground text-center">
                Valid until {wonCoupon.expiresAt} • 1 use per customer
              </div>
            </div>
          )}

          {/* Available Rewards Overview */}
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Gift className="h-5 w-5 text-accent" /> Spin Wheel Rewards
              </h3>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">6 Sectors</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {REWARDS.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 rounded-2xl border border-border/40 p-3 bg-muted/20 transition-all hover:bg-muted/40"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold"
                      style={{ backgroundColor: r.bgColor, color: r.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">{r.label}</div>
                      <div className="text-[10px] text-muted-foreground">Daily Chance</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User's Won Coupons History */}
          {user && userCoupons.length > 0 && (
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Tag className="h-5 w-5 text-accent" /> My Active Coupons ({userCoupons.length})
              </h3>
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {userCoupons.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-muted/10 p-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-foreground">{c.reward}</div>
                      <div className="font-mono text-[11px] text-accent font-semibold">{c.code}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(c.code)}
                      className="rounded-lg border border-border/50 bg-card px-2.5 py-1.5 text-[11px] font-bold hover:bg-muted transition-colors"
                    >
                      {copiedCode === c.code ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
