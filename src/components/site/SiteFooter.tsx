import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube, MessageCircle } from "lucide-react";
import { SHOP, wa } from "@/lib/shop";

const COL: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New Mobiles", to: "/mobiles" },
      { label: "Used Mobiles", to: "/used" },
      { label: "Accessories", to: "/accessories" },
      { label: "Offers", to: "/offers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Repair Services", to: "/repair" },
      { label: "Software Services", to: "/software" },
      { label: "Book Repair", to: "/book-repair" },
      { label: "Track Repair", to: "/track" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Compare Phones", to: "/compare" },
      { label: "Trade-In Calculator", to: "/trade-in" },
      { label: "Blog & Guides", to: "/blog" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer 
      className="mt-24 border-t border-border/60 bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url('/backgrounds/footer-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Contact CTA Strip */}
      <div className="border-b border-border/40 bg-amber-500/5">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display font-bold text-lg">Have a question? Reach us directly.</div>
              <div className="text-sm text-muted-foreground mt-0.5">📍 {SHOP.address} &nbsp;·&nbsp; Open {SHOP.hours}</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${SHOP.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-muted transition"
              >
                <Phone className="h-4 w-4 text-amber-500" /> {SHOP.phone}
              </a>
              <a
                href={wa("Hi Online Mobiles! I have a question.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition shadow-sm"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={SHOP.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-amber-500/20 px-4 py-2 text-sm font-semibold text-pink-400 hover:from-purple-600/30 hover:to-pink-600/30 transition shadow-sm"
              >
                <Instagram className="h-4 w-4 text-pink-400" /> @{SHOP.instagramHandle}
              </a>
              <a
                href={`mailto:${SHOP.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-500/20 transition"
              >
                <Mail className="h-4 w-4" /> Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={SHOP.name}
                className="h-12 w-12 rounded-full object-contain bg-black shadow-md"
              />
              <div>
                <div className="font-display text-lg font-bold">{SHOP.name}</div>
                <div className="text-xs text-muted-foreground">Near Charminar, Hyderabad</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Your one-stop premium mobile store. Genuine devices, certified repairs, honest prices — since 12+ years.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SHOP.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram @shakeelahmedonline"
                className="grid h-9 w-9 place-items-center rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-accent hover:text-accent-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-accent hover:text-accent-foreground">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COL.map((c) => (
            <div key={c.title}>
              <div className="font-display font-semibold">{c.title}</div>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-12 grid gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:grid-cols-2 md:grid-cols-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
            <span>{SHOP.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-amber-500" />
            <a href={`tel:${SHOP.phone}`} className="hover:text-foreground font-medium">{SHOP.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="h-4 w-4 text-pink-400" />
            <a href={SHOP.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground font-medium text-pink-400">@{SHOP.instagramHandle}</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-amber-500" />
            <a href={`mailto:${SHOP.email}`} className="hover:text-foreground break-all">{SHOP.email}</a>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SHOP.name}. All rights reserved. Prices in INR, taxes included.
        </div>
      </div>
    </footer>
  );
}

