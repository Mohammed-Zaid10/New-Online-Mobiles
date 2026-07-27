export const SHOP = {
  name: "Online Mobiles",
  phone: "+91 72073 26250",
  whatsapp: "917207326250",
  email: "businessmohdzaid76770@gmail.com",
  instagram: "https://www.instagram.com/shakeelahmedonline",
  instagramHandle: "shakeelahmedonline",
  address: "100-100/2, Near Charminar, Hyderabad",
  hours: "Mon – Sun, 10:00 – 21:00",
  siteUrl: "https://online-mobiles.lovable.app",
};

export const wa = (msg: string) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
