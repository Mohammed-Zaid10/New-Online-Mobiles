import { accessoryImages } from "./catalogImages";

export type Accessory = {
  id: string;
  category: string; // slug
  name: string;
  brand: string;
  price: number;
  mrp?: number;
  description: string;
  image: string;
  images: string[];
  inStock: boolean;
};

export const accessoryCategories = [
  { slug: "cases", name: "Phone Cases" },
  { slug: "tempered-glass", name: "Tempered Glass" },
  { slug: "chargers", name: "Chargers" },
  { slug: "fast-chargers", name: "Fast Chargers" },
  { slug: "type-c-cables", name: "Type-C Cables" },
  { slug: "lightning-cables", name: "Lightning Cables" },
  { slug: "earbuds", name: "Earbuds" },
  { slug: "neckbands", name: "Neckbands" },
  { slug: "speakers", name: "Bluetooth Speakers" },
  { slug: "smart-watches", name: "Smart Watches" },
  { slug: "power-banks", name: "Power Banks" },
  { slug: "memory-cards", name: "Memory Cards" },
  { slug: "otg", name: "OTG Adapters" },
  { slug: "camera-lens", name: "Camera Lens Protectors" },
  { slug: "selfie-sticks", name: "Selfie Sticks" },
  { slug: "tripods", name: "Tripods" },
  { slug: "holders", name: "Mobile Holders" },
  { slug: "car-chargers", name: "Car Chargers" },
  { slug: "ring-holders", name: "Ring Holders" },
  { slug: "cooling-fans", name: "Cooling Fans" },
];

const IMGS: Record<string, string[]> = {
  cases: [
    "https://images.unsplash.com/photo-1541877590-a1885d1cf9d5?w=800&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
  ],
  "tempered-glass": ["https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80"],
  chargers: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80"],
  "fast-chargers": ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80"],
  "type-c-cables": ["https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80"],
  "lightning-cables": ["https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80"],
  earbuds: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80", "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80"],
  neckbands: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"],
  speakers: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"],
  "smart-watches": ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80", "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&q=80"],
  "power-banks": ["https://images.unsplash.com/photo-1609592806955-d0ed7bf12ba0?w=800&q=80"],
  "memory-cards": ["https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&q=80"],
  otg: ["https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80"],
  "camera-lens": ["https://images.unsplash.com/photo-1606986601547-30ec0d5c8b64?w=800&q=80"],
  "selfie-sticks": ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80"],
  tripods: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"],
  holders: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80"],
  "car-chargers": ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80"],
  "ring-holders": ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80"],
  "cooling-fans": ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80"],
};

const pick = (cat: string, i: number) => IMGS[cat][i % IMGS[cat].length];

const items: Omit<Accessory, "id" | "image" | "images">[] = [
  { category: "cases", name: "Silicone Case for iPhone 15", brand: "Apple", price: 4499, mrp: 4900, description: "Genuine Apple silicone case with soft microfiber lining.", inStock: true },
  { category: "cases", name: "Rugged Armor Case", brand: "Spigen", price: 999, mrp: 1499, description: "Military-grade drop protection with matte finish.", inStock: true },
  { category: "cases", name: "Clear Case with MagSafe", brand: "Ringke", price: 1299, description: "Crystal clear, yellowing-resistant polycarbonate.", inStock: true },
  { category: "cases", name: "Leather Wallet Case", brand: "Nillkin", price: 1899, description: "Premium leather with card slot & stand.", inStock: true },
  { category: "tempered-glass", name: "9H Tempered Glass Pack of 2", brand: "Amozo", price: 249, mrp: 499, description: "Edge-to-edge protection, oleophobic coating.", inStock: true },
  { category: "tempered-glass", name: "Privacy Anti-Spy Glass", brand: "Belkin", price: 899, description: "Blocks side viewing angles.", inStock: true },
  { category: "chargers", name: "20W USB-C Power Adapter", brand: "Apple", price: 1499, mrp: 1900, description: "Original Apple 20W fast charger.", inStock: true },
  { category: "chargers", name: "10W Adaptive Charger", brand: "Samsung", price: 799, description: "Original Samsung wall charger.", inStock: true },
  { category: "fast-chargers", name: "45W Super Fast Charger", brand: "Samsung", price: 2499, description: "45W PD PPS charger with cable.", inStock: true },
  { category: "fast-chargers", name: "80W SUPERVOOC Charger", brand: "OnePlus", price: 2299, description: "Original OnePlus 80W adapter.", inStock: true },
  { category: "fast-chargers", name: "67W GaN Charger", brand: "Xiaomi", price: 2199, description: "Compact GaN travel charger.", inStock: true },
  { category: "type-c-cables", name: "USB-C to USB-C Braided Cable 1m", brand: "Anker", price: 799, mrp: 1299, description: "100W PD, kevlar braided.", inStock: true },
  { category: "type-c-cables", name: "USB-C to USB-C 60W Cable 2m", brand: "Portronics", price: 449, description: "Tangle-free premium cable.", inStock: true },
  { category: "lightning-cables", name: "Lightning to USB-C 1m MFi", brand: "Apple", price: 1900, description: "Original Apple MFi certified.", inStock: true },
  { category: "lightning-cables", name: "Lightning Braided Cable 1.5m", brand: "Boat", price: 349, description: "MFi certified, 3A output.", inStock: true },
  { category: "earbuds", name: "AirPods Pro (2nd gen)", brand: "Apple", price: 24900, description: "Active noise cancellation, MagSafe case.", inStock: true },
  { category: "earbuds", name: "Galaxy Buds3 Pro", brand: "Samsung", price: 21999, description: "AI translation, ANC, 24-bit sound.", inStock: true },
  { category: "earbuds", name: "Nothing Ear (2)", brand: "Nothing", price: 8999, description: "Hi-Res LDAC, ANC, transparent design.", inStock: true },
  { category: "earbuds", name: "Boat Airdopes 141", brand: "Boat", price: 1299, mrp: 2990, description: "42h playback, ENx tech.", inStock: true },
  { category: "neckbands", name: "Rockerz 245 Pro", brand: "Boat", price: 999, description: "40h playtime, ASAP charge.", inStock: true },
  { category: "neckbands", name: "OnePlus Bullets Wireless Z2", brand: "OnePlus", price: 1799, description: "30h battery, IP55.", inStock: true },
  { category: "speakers", name: "SoundLink Flex", brand: "Bose", price: 15900, description: "PositionIQ, IP67 waterproof.", inStock: true },
  { category: "speakers", name: "JBL Flip 6", brand: "JBL", price: 8999, description: "Bold JBL Original Pro Sound.", inStock: true },
  { category: "speakers", name: "Mi Portable Speaker", brand: "Xiaomi", price: 1799, description: "16W stereo, 13h battery.", inStock: true },
  { category: "smart-watches", name: "Apple Watch Series 10", brand: "Apple", price: 46900, description: "Wider display, thinner design.", inStock: true },
  { category: "smart-watches", name: "Galaxy Watch7", brand: "Samsung", price: 32999, description: "Body composition, Wear OS 5.", inStock: true },
  { category: "smart-watches", name: "Noise ColorFit Pro 5", brand: "Noise", price: 3499, description: "1.85\" AMOLED, BT calling.", inStock: true },
  { category: "power-banks", name: "20000mAh 22.5W Power Bank", brand: "Mi", price: 1999, description: "Dual output, PD & QC.", inStock: true },
  { category: "power-banks", name: "MagGo 5000mAh MagSafe", brand: "Anker", price: 3499, description: "Wireless magnetic charging.", inStock: true },
  { category: "memory-cards", name: "128GB microSDXC EVO Plus", brand: "Samsung", price: 999, description: "U3, A2, up to 130 MB/s.", inStock: true },
  { category: "memory-cards", name: "256GB Ultra microSDXC", brand: "SanDisk", price: 2199, description: "A1, 150 MB/s.", inStock: true },
  { category: "otg", name: "USB-C to USB-A OTG Adapter", brand: "Portronics", price: 249, description: "Plug & play USB drive support.", inStock: true },
  { category: "otg", name: "Lightning to USB Camera Adapter", brand: "Apple", price: 2900, description: "Original Apple accessory.", inStock: true },
  { category: "camera-lens", name: "iPhone 15 Pro Lens Protector", brand: "Ringke", price: 799, description: "Individual lens metal ring.", inStock: true },
  { category: "camera-lens", name: "Galaxy S24 Ultra Lens Guard", brand: "Whitestone", price: 999, description: "Sapphire coated glass.", inStock: true },
  { category: "selfie-sticks", name: "Bluetooth Selfie Stick Tripod", brand: "Portronics", price: 799, description: "Extendable to 68 cm.", inStock: true },
  { category: "tripods", name: "Gorilla Flexible Tripod", brand: "Digitek", price: 599, description: "Wraps around anything.", inStock: true },
  { category: "tripods", name: "5ft Aluminum Tripod", brand: "Manfrotto", price: 3499, description: "For DSLR & phone shoots.", inStock: true },
  { category: "holders", name: "Aluminum Desk Phone Stand", brand: "Lamicall", price: 799, description: "Adjustable angles.", inStock: true },
  { category: "car-chargers", name: "38W Dual Port Car Charger", brand: "Anker", price: 999, description: "PD + QC dual output.", inStock: true },
  { category: "car-chargers", name: "MagSafe Car Vent Mount", brand: "Belkin", price: 4999, description: "Magnetic car mount.", inStock: true },
  { category: "ring-holders", name: "MagSafe Ring Holder", brand: "Ugreen", price: 499, description: "360° rotation grip.", inStock: true },
  { category: "cooling-fans", name: "Semi-Conductor Gaming Cooler", brand: "Black Shark", price: 2499, description: "Peltier cooling for gaming.", inStock: true },
];

const seen: Record<string, number> = {};

export const accessories: Accessory[] = items.map((it, i) => {
  const n = (seen[it.category] = (seen[it.category] ?? -1) + 1);
  const real = accessoryImages(it.category);
  // Give each product in a category its own real photo, rotating when we have fewer
  // photos than products; the rest of the category's shots become the gallery.
  const gallery = real.length
    ? [real[n % real.length], ...real.filter((_, k) => k !== n % real.length)]
    : [pick(it.category, i)];
  return { ...it, id: `acc-${i + 1}`, image: gallery[0], images: gallery };
});

export const byCategory = (slug: string) => accessories.filter((a) => a.category === slug);
export const getCategory = (slug: string) => accessoryCategories.find((c) => c.slug === slug);
export const getAccessory = (category: string, id: string) =>
  accessories.find((a) => a.id === id && a.category === category);
