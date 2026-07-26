export type Offer = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  color: string;
  perks: string[];
};

export const offers: Offer[] = [
  { slug: "today", title: "Today's Deal", tagline: "Flash 24-hour price drops", description: "Extra ₹1,500 off on select smartphones + free premium case + free tempered glass fitting.", cta: "Shop Today's Deals", color: "from-orange-400/20 to-red-500/20", perks: ["Extra ₹1,500 off", "Free case worth ₹1,299", "Free tempered glass"] },
  { slug: "festival", title: "Festival Sale", tagline: "Diwali & Eid special", description: "Up to ₹8,000 instant discount, no-cost EMI on 6 & 9 months, festive gift hampers on flagships.", cta: "See Festival Prices", color: "from-amber-400/25 to-rose-500/20", perks: ["Up to ₹8,000 off", "No-cost 9m EMI", "Festive gift hamper"] },
  { slug: "student", title: "Student Discount", tagline: "Bring your ID card", description: "Additional 5% off on iPhones and MacBooks for students. Extra 10% off on AirPods with any iPhone.", cta: "Claim Student Offer", color: "from-blue-400/20 to-indigo-500/20", perks: ["5% off Apple line", "10% off AirPods bundle", "Free education kit"] },
  { slug: "exchange", title: "Exchange Bonus", tagline: "Get more for your old phone", description: "Guaranteed ₹2,000 exchange bonus over calculator value + free doorstep pickup.", cta: "Value My Phone", color: "from-emerald-400/20 to-teal-500/20", perks: ["₹2,000 bonus", "Doorstep pickup", "Instant credit"] },
  { slug: "emi", title: "Zero-Cost EMI", tagline: "3, 6, 9 & 12 month plans", description: "No down payment, no processing fee. Available on HDFC, ICICI, SBI, Axis and Bajaj Finserv.", cta: "Check EMI Plans", color: "from-violet-400/20 to-fuchsia-500/20", perks: ["0% interest", "6 major banks", "Bajaj Finserv card"] },
  { slug: "cashback", title: "Bank Cashback", tagline: "Up to ₹6,000 back", description: "Instant bank cashback on select credit and debit cards. Stack with festive discounts.", cta: "See Bank Offers", color: "from-pink-400/20 to-rose-500/20", perks: ["₹6,000 max cashback", "Credit + Debit", "Stackable"] },
];

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);
