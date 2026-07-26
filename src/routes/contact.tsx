import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, wa } from "@/lib/shop";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Online Mobiles" },
      { name: "description", content: `Visit us at ${SHOP.address}. Open ${SHOP.hours}. Call ${SHOP.phone} or WhatsApp for instant help.` },
      { property: "og:url", content: `${SHOP.siteUrl}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(`https://formsubmit.co/ajax/${SHOP.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `📩 New Website Enquiry from ${form.name} (${form.phone})`,
          _captcha: "false",
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          message: form.message,
        }),
      });
    } catch {
      // Fallback silently if offline
    }

    setSubmitting(false);
    setSent(true);
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="Come say hi 👋" />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Left: contact info cards */}
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5">
              <MapPin className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <div className="font-semibold">Store Address</div>
                <div className="text-sm text-muted-foreground mt-0.5">{SHOP.address}</div>
                <a
                  href="https://maps.google.com/?q=Charminar+Hyderabad"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-xs text-amber-600 hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5">
              <Phone className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <div className="font-semibold">Call Us</div>
                <a href={`tel:${SHOP.phone}`} className="text-sm text-muted-foreground hover:text-foreground font-medium">
                  {SHOP.phone}
                </a>
                <div className="mt-1 text-xs text-muted-foreground">Open {SHOP.hours}</div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5">
              <MessageCircle className="mt-0.5 h-5 w-5 text-emerald-500 shrink-0" />
              <div>
                <div className="font-semibold">WhatsApp</div>
                <a
                  href={wa("Hi Online Mobiles! I'd like more information.")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground font-medium"
                >
                  {SHOP.phone}
                </a>
                <div className="mt-2">
                  <a
                    href={wa("Hi Online Mobiles! I'd like more information.")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5">
              <Mail className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <div className="font-semibold">Email</div>
                <a href={`mailto:${SHOP.email}`} className="text-sm text-muted-foreground hover:text-foreground break-all">
                  {SHOP.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5">
              <Clock className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <div className="font-semibold">Shop Hours</div>
                <div className="text-sm text-muted-foreground">{SHOP.hours}</div>
              </div>
            </div>

            {/* Map — Charminar Hyderabad */}
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
              <iframe
                title="Online Mobiles — Near Charminar Hyderabad"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.4530%2C17.3580%2C78.4730%2C17.3680&layer=mapnik&marker=17.3620%2C78.4630"
                className="h-[240px] w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-10 text-center h-full">
                <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                <div className="mt-4 font-display text-xl font-bold">Message sent!</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your email has been prepared. We'll get back to you as soon as possible.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href={`tel:${SHOP.phone}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition">
                    <Phone className="h-4 w-4 text-amber-500" /> {SHOP.phone}
                  </a>
                  <a href={wa("Hi! I just sent a message via your website.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft space-y-4">
                <div className="font-display font-bold text-xl">Send us a message</div>
                <p className="text-sm text-muted-foreground">We usually reply within a few minutes on WhatsApp. For email responses allow up to 24 hrs.</p>

                <label className="block">
                  <div className={lbl}>Your name *</div>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} placeholder="Full name" />
                </label>

                <label className="block">
                  <div className={lbl}>Phone number *</div>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inp} placeholder="+91 72073 26250" />
                </label>

                <label className="block">
                  <div className={lbl}>Your email (optional)</div>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inp} placeholder="you@email.com" />
                </label>

                <label className="block">
                  <div className={lbl}>Message *</div>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={inp} placeholder="Tell us what you need..." />
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "⏳ Sending Email to Store Owner..." : "📩 Send Message"}
                </button>

                <div className="text-center text-xs text-muted-foreground pt-1">
                  Or reach us directly: <a href={`tel:${SHOP.phone}`} className="font-medium hover:underline">{SHOP.phone}</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm resize-none";
const lbl = "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1";
