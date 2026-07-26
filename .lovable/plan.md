
# Online Mobiles — Full Multi-Page Build

This is a large scope. I'll build it as a fully functional demo site with realistic seed data (no backend). Confirm before I proceed, or tell me to trim scope.

## Route structure (TanStack Router)

```
src/routes/
  __root.tsx            Shared header/footer, dark mode, floating WA/call
  index.tsx             Home (hero, featured, categories, offers, testimonials)
  mobiles.tsx           New mobiles layout (filters sidebar + Outlet)
  mobiles.index.tsx     Catalog grid: brand/price/storage filters + search
  mobiles.$brand.tsx    Brand landing: models list
  mobiles.$brand.$model.tsx  Product detail: gallery, variants, specs, EMI, WA, similar
  used.tsx              Second-hand catalog with condition filters
  used.$id.tsx          Used product detail with battery health, IMEI, box checklist
  accessories.tsx       Accessory categories + filters
  accessories.$category.tsx  Category listing
  repair.tsx            Repair hub: 12 categories
  repair.$service.tsx   Per-service: supported brands, price, time, warranty, book CTA
  software.tsx          Software services (15 items) with pricing
  offers.tsx            Today/Festival/Student/Exchange/EMI/Cashback
  compare.tsx           Two phone selectors → spec diff table
  trade-in.tsx          Brand/model/condition/battery/storage → estimated value
  book-repair.tsx       Full booking form (client-side, toast confirm)
  track.tsx             Repair ID + phone → status timeline stepper
  about.tsx
  contact.tsx
  faq.tsx
```

## Data (seeded, client-side)

- `src/data/brands.ts` — 15 brands (Apple, Samsung, Vivo, Oppo, Xiaomi, OnePlus, Realme, Motorola, Google Pixel, Nothing, Honor, Tecno, Infinix, iQOO, Poco).
- `src/data/mobiles.ts` — ~60 models across brands (Apple line 13/13 mini/13 Pro/13 Pro Max/14/15/16 + Samsung/Xiaomi/OnePlus/etc). Each: id, brand, model, price, storage variants, color variants, specs object, availability, EMI, warranty, images[].
- `src/data/used.ts` — ~20 used phones with battery %, condition grade, box/bill/charger flags, IMEI verified, warranty.
- `src/data/accessories.ts` — 20 categories, 3–6 items each.
- `src/data/repair.ts` — 12 repair services, brand support matrix, price ranges, ETA, warranty.
- `src/data/software.ts` — 15 software services with price/time.
- `src/data/offers.ts` — 6 offer types.
- `src/lib/tradeIn.ts` — pricing formula (base × condition × battery × storage multiplier).
- `src/lib/trackDemo.ts` — deterministic stage from repair ID hash.

## Images

Realistic product photography via Unsplash/official-style CDN URLs referenced by string; no AI generation. Where a specific model image isn't reliably free, I use a curated Unsplash smartphone photo tagged by brand. Each product carries 3 image URLs for the gallery. Accessories similarly.

## Shared components

`src/components/` — SiteHeader, SiteFooter, FloatingActions, ProductCard, UsedCard, AccessoryCard, FilterSidebar, Breadcrumbs, PriceTag, SpecTable, BookingForm, RepairTracker, TradeInCalculator, CompareTable, Rating, SectionHeading.

## SEO

Every route sets its own `head()` with unique title, description, og:title/description, og:type. Dynamic product/used routes derive metadata from loader data (loaders return seeded objects synchronously). Breadcrumbs on catalog/detail pages.

## Design

Keeps current warm cream + dark brown palette, Poppins/Inter, glass nav, soft shadows, scroll-reveal. No neon/glow. Fully responsive, mobile-first.

## Out of scope (confirm if needed)

- No real backend, payments, auth, or DB (Lovable Cloud not enabled). Forms show success toasts; trade-in & tracker are pure client-side calculators over seeded data.
- Reviews are seeded, not user-submitted.
- Compare limited to 2 phones side-by-side.

Reply "go" and I'll build it. This will take one long turn.
