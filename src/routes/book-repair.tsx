import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { brands } from "@/data/brands";
import { repairServices } from "@/data/repair";
import { SHOP, wa } from "@/lib/shop";

export const Route = createFileRoute("/book-repair")({
  head: () => ({
    meta: [
      { title: "Book a Repair — Online Mobiles" },
      { name: "description", content: "Book your mobile repair online. Choose brand, model, issue, date and time. Home pickup available." },
      { property: "og:url", content: `${SHOP.siteUrl}/book-repair` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/book-repair` }],
  }),
  component: BookRepair,
});

function BookRepair() {
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", brand: "apple", model: "", issue: "screen",
    date: "", time: "10:00", pickup: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const id = `OM-${Math.floor(Math.random() * 900000 + 100000)}`;

    const msg = `Repair Booking ${id}
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Device: ${form.brand.toUpperCase()} ${form.model}
Issue: ${form.issue}
Date: ${form.date} at ${form.time}
Pickup: ${form.pickup ? "Yes – Doorstep Pickup" : "No – Walk-in"}`;

    // 1. Direct background server-to-email dispatch via FormSubmit API
    try {
      await fetch(`https://formsubmit.co/ajax/${SHOP.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🛠️ New Repair Booking ${id} – ${form.name} (${form.phone})`,
          _captcha: "false",
          booking_id: id,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          device: `${form.brand} ${form.model}`,
          issue: form.issue,
          date_and_time: `${form.date} at ${form.time}`,
          doorstep_pickup: form.pickup ? "Yes" : "No",
          full_details: msg,
        }),
      });
    } catch {
      // Fallback silently if network is offline
    }

    // 2. Open WhatsApp for instant response
    window.open(wa(msg), "_blank");

    setSubmitting(false);
    setDone(id);
  };

  if (done) {
    return (
      <>
        <PageHeader eyebrow="Booked ✅" title="You're all set!" />
        <div className="mx-auto max-w-xl px-4 py-10 md:px-6 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
          <div className="mt-4 text-sm text-muted-foreground">Your Repair Booking ID</div>
          <div className="font-display text-3xl font-extrabold tracking-tight">{done}</div>
          <p className="mt-4 text-sm text-muted-foreground">
            Your booking has been sent to us via <strong>Email</strong> and <strong>WhatsApp</strong>. We'll confirm within minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SHOP.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
            >
              <Phone className="h-4 w-4" /> Call us: {SHOP.phone}
            </a>
            <a
              href={wa(`Hi, my repair booking ID is ${done}. Can you confirm?`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            📍 {SHOP.address} &nbsp;·&nbsp; ✉️ {SHOP.email}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Repair" title="Book a repair" subtitle="Fill in the details below. We'll confirm on WhatsApp & Email within minutes." />
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Book Repair" }]} />
      </div>
      <form onSubmit={onSubmit} className="mx-auto grid max-w-3xl gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft sm:grid-cols-2 md:px-6 mb-16">
        <F label="Full name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} placeholder="Your full name" /></F>
        <F label="Phone number"><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inp} placeholder="+91 72073 26250" /></F>
        <F label="Your email (optional)" ><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inp} placeholder="you@email.com" /></F>
        <F label="Brand">
          <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={inp}>
            {brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
        </F>
        <F label="Model"><input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className={inp} placeholder="e.g. iPhone 13 Pro" /></F>
        <F label="Issue">
          <select value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} className={inp}>
            {repairServices.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
          </select>
        </F>
        <F label="Preferred date"><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inp} /></F>
        <F label="Preferred time">
          <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inp}>
            {["10:00","11:00","12:00","13:00","15:00","16:00","17:00","18:00","19:00"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </F>
        <label className="sm:col-span-2 flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.checked })} />
          I need <strong>doorstep pickup</strong> (available within Hyderabad)
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "⏳ Sending Email & Opening WhatsApp..." : "📩 Submit Booking — Direct Email & WhatsApp"}
        </button>
        <p className="sm:col-span-2 text-center text-xs text-muted-foreground">
          By submitting you agree to be contacted at the number/email provided. &nbsp;·&nbsp; ✉️ {SHOP.email} &nbsp;·&nbsp; 📞 {SHOP.phone}
        </p>
      </form>
    </>
  );
}
const inp = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm";
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</div>{children}</label>;
}
