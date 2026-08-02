import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X, ChevronDown, Sparkles, User as UserIcon } from "lucide-react";
import { SHOP } from "@/lib/shop";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { label: "Home", to: "/" },
  {
    label: "Shop",
    children: [
      { label: "New Mobiles", to: "/mobiles" },
      { label: "Used Mobiles", to: "/used" },
      { label: "Accessories", to: "/accessories" },
      { label: "Offers & Deals", to: "/offers" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Mobile Repairs", to: "/repair" },
      { label: "AI Repair Assistant", to: "/ai-repair" },
      { label: "Software Fixes", to: "/software" },
      { label: "Trade-In Program", to: "/trade-in" },
      { label: "Track Order", to: "/track" },
    ],
  },
  { label: "Compare", to: "/compare" },
  { label: "Blog", to: "/blog" },
  {
    label: "Features",
    children: [
      { label: "Smart Filters ⚡", to: "/mobiles" },
      { label: "Phone Finder", to: "/phone-finder" },
      { label: "Spin & Win 🎁", to: "/spin-wheel" },
      { label: "360° View", to: "/360-viewer" },
      { label: "Virtual Unboxing", to: "/unboxing" },
      { label: "Performance Benchmarks", to: "/benchmarks" },
      { label: "Price Tracker", to: "/price-tracker" },
      { label: "Compatibility Checker", to: "/compatibility" },
      { label: "Camera Compare", to: "/camera-compare" },
      { label: "Size Compare", to: "/size-compare" },
      { label: "Battery Calculator", to: "/battery-calculator" },
      { label: "Bundle Builder", to: "/bundle-builder" },
      { label: "Storage Calculator", to: "/storage-calculator" },
    ],
  },
];

export function SiteHeader() {
  const { user, openAuthModal, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? "glass shadow-soft border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"
            alt={SHOP.name}
            className="h-11 w-11 rounded-full object-contain bg-black shadow-md transition-transform hover:scale-105"
          />
          <div className="hidden sm:block">
            <div className="font-display text-base font-bold leading-tight">{SHOP.name}</div>
            <div className="text-[11px] text-muted-foreground">Software & Hardware Solutions</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 justify-center flex-1 mx-4">
          {NAV.map((n) => {
            if (n.children) {
              const active = n.children.some(c => pathname.startsWith(c.to));
              return (
                <div key={n.label} className="relative group">
                  <button
                    className={`rounded-full px-3 py-2 text-[13px] font-semibold transition-colors flex items-center gap-1 ${
                      active
                        ? "bg-amber-500/10 text-amber-500"
                        : "text-foreground/80 hover:bg-muted"
                    }`}
                  >
                    {n.label} <ChevronDown className="h-3 w-3 opacity-70 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="w-56 max-h-[60vh] overflow-y-auto rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-2 shadow-xl shadow-black/10 scrollbar-thin scrollbar-thumb-border">
                      {n.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className={`block rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                            pathname === c.to ? "bg-amber-500/10 text-amber-500 font-bold" : "hover:bg-muted"
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to!);
            return (
              <Link
                key={n.to}
                to={n.to!}
                className={`rounded-full px-3 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/spin-wheel"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" /> Spin & Win
          </Link>

          <button
            onClick={() => setDark((v) => !v)}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/60 text-foreground/70 hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 p-1 pr-3 text-xs font-bold hover:bg-muted transition-colors">
                <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full object-cover" />
                <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-56 rounded-2xl border border-border/60 bg-card p-3 shadow-xl space-y-2">
                  <div className="px-2 py-1.5 border-b border-border/40">
                    <div className="font-bold text-xs truncate">{user.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
                  </div>
                  <Link
                    to="/spin-wheel"
                    className="block rounded-lg px-3 py-2 text-xs font-semibold hover:bg-muted transition-colors"
                  >
                    🎡 Daily Spin Wheel
                  </Link>
                  <Link
                    to="/book-repair"
                    className="block rounded-lg px-3 py-2 text-xs font-semibold hover:bg-muted transition-colors"
                  >
                    🛠️ Book a Repair
                  </Link>
                  <button
                    onClick={signOut}
                    className="w-full text-left rounded-lg px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("signin")}
              className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-2 text-xs font-bold text-accent hover:bg-accent/20 transition-all cursor-pointer"
            >
              <UserIcon className="h-3.5 w-3.5" /> Sign In
            </button>
          )}

          <Link
            to="/book-repair"
            className="hidden md:inline-flex items-center rounded-full bg-accent px-4 py-2 text-[13px] font-bold text-accent-foreground hover:opacity-90 transition-transform hover:scale-105 shadow-md"
          >
            Book Repair
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/60"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl absolute w-full max-h-[85vh] overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-4 grid gap-2">
            {NAV.map((n) => {
              if (n.children) {
                return (
                  <div key={n.label} className="space-y-1">
                    <div className="px-3 py-2 text-sm font-bold text-amber-500 uppercase tracking-wider">{n.label}</div>
                    <div className="grid grid-cols-2 gap-2 pl-2 border-l-2 border-border/50 ml-2">
                      {n.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="rounded-lg px-3 py-2 text-[13px] font-medium bg-muted/30 hover:bg-muted"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={n.to}
                  to={n.to!}
                  className="rounded-lg px-3 py-2.5 text-[14px] font-semibold bg-muted/60 hover:bg-muted"
                >
                  {n.label}
                </Link>
              );
            })}
            <Link
              to="/book-repair"
              className="mt-4 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-accent-foreground shadow-md"
            >
              Book Repair Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
