import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { SHOP } from "@/lib/shop";

const NAV = [
  { label: "Home", to: "/" },
  { label: "New Mobiles", to: "/mobiles" },
  { label: "Used Mobiles", to: "/used" },
  { label: "Accessories", to: "/accessories" },
  { label: "Repairs", to: "/repair" },
  { label: "Software", to: "/software" },
  { label: "Offers", to: "/offers" },
  { label: "Compare", to: "/compare" },
  { label: "Trade-In", to: "/trade-in" },
  { label: "Track", to: "/track" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt={SHOP.name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-amber-400/80 shadow-md transition-transform hover:scale-105"
          />
          <div className="hidden sm:block">
            <div className="font-display text-base font-bold leading-tight">{SHOP.name}</div>
            <div className="text-[11px] text-muted-foreground">Software & Hardware Solutions · 20+ Yrs</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active =
              n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((v) => !v)}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/60 text-foreground/70 hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/book-repair"
            className="hidden md:inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
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
        <div className="lg:hidden border-t border-border/60 bg-background/95">
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-1.5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-lg px-3 py-2 text-sm font-medium bg-muted/60 hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book-repair"
              className="col-span-2 rounded-lg bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-foreground"
            >
              Book Repair
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
