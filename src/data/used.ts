import { phoneImage } from "./catalogImages";

export type UsedPhone = {
  id: string;
  brand: string;
  model: string;
  price: number;
  originalPrice: number;
  storage: string;
  color: string;
  batteryHealth: number; // %
  condition: "Superb" | "Excellent" | "Good" | "Fair";
  hasBill: boolean;
  hasBox: boolean;
  hasCharger: boolean;
  warranty: string;
  imeiVerified: boolean;
  technicianTested: boolean;
  image: string;
  age: string;
};

const img = (u: string) => `https://images.unsplash.com/${u}?w=1000&q=80`;

export const usedPhones: UsedPhone[] = [
  { id: "u1", brand: "apple", model: "iPhone 13", price: 39999, originalPrice: 69900, storage: "128GB", color: "Midnight", batteryHealth: 92, condition: "Superb", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1592286927505-1def25115558"), age: "8 months old" },
  { id: "u2", brand: "apple", model: "iPhone 12", price: 32999, originalPrice: 65900, storage: "64GB", color: "Blue", batteryHealth: 88, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1592286927505-1def25115558"), age: "1.5 years old" },
  { id: "u3", brand: "apple", model: "iPhone 11", price: 22999, originalPrice: 49900, storage: "64GB", color: "White", batteryHealth: 85, condition: "Good", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1592286927505-1def25115558"), age: "2 years old" },
  { id: "u4", brand: "apple", model: "iPhone 13 Pro", price: 62999, originalPrice: 119900, storage: "256GB", color: "Graphite", batteryHealth: 90, condition: "Superb", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1695048132832-c4efa0c34d84"), age: "1 year old" },
  { id: "u5", brand: "samsung", model: "Galaxy S23", price: 44999, originalPrice: 79999, storage: "256GB", color: "Phantom Black", batteryHealth: 91, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1610945415295-d9bbf067e59c"), age: "10 months old" },
  { id: "u6", brand: "samsung", model: "Galaxy S22 Ultra", price: 42999, originalPrice: 109999, storage: "256GB", color: "Green", batteryHealth: 87, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1610945415295-d9bbf067e59c"), age: "1.5 years old" },
  { id: "u7", brand: "samsung", model: "Galaxy A54", price: 24999, originalPrice: 38999, storage: "128GB", color: "Awesome Lime", batteryHealth: 94, condition: "Superb", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1610945415295-d9bbf067e59c"), age: "6 months old" },
  { id: "u8", brand: "oneplus", model: "OnePlus 11", price: 38999, originalPrice: 61999, storage: "256GB", color: "Titan Black", batteryHealth: 89, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1598327105666-5b89351aff97"), age: "1 year old" },
  { id: "u9", brand: "oneplus", model: "Nord CE 3", price: 16999, originalPrice: 26999, storage: "128GB", color: "Aqua Surge", batteryHealth: 92, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1598327105666-5b89351aff97"), age: "10 months old" },
  { id: "u10", brand: "vivo", model: "V27 Pro", price: 22999, originalPrice: 37999, storage: "128GB", color: "Magic Blue", batteryHealth: 90, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1585060544812-6b45742d762f"), age: "1 year old" },
  { id: "u11", brand: "oppo", model: "Reno 10 Pro", price: 24999, originalPrice: 39999, storage: "256GB", color: "Silvery Grey", batteryHealth: 91, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1585060544812-6b45742d762f"), age: "8 months old" },
  { id: "u12", brand: "xiaomi", model: "Xiaomi 12 Pro", price: 27999, originalPrice: 62999, storage: "256GB", color: "Blue", batteryHealth: 84, condition: "Good", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1585060544812-6b45742d762f"), age: "2 years old" },
  { id: "u13", brand: "xiaomi", model: "Redmi Note 12 Pro", price: 12999, originalPrice: 24999, storage: "128GB", color: "Onyx Black", batteryHealth: 93, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1585060544812-6b45742d762f"), age: "6 months old" },
  { id: "u14", brand: "google", model: "Pixel 7", price: 32999, originalPrice: 59999, storage: "128GB", color: "Obsidian", batteryHealth: 88, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1697898000541-1531f37e59f9"), age: "1 year old" },
  { id: "u15", brand: "google", model: "Pixel 6a", price: 18999, originalPrice: 43999, storage: "128GB", color: "Chalk", batteryHealth: 90, condition: "Excellent", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1697898000541-1531f37e59f9"), age: "1.5 years old" },
  { id: "u16", brand: "realme", model: "Realme GT Neo 3", price: 17999, originalPrice: 36999, storage: "128GB", color: "Nitro Blue", batteryHealth: 88, condition: "Good", hasBill: true, hasBox: true, hasCharger: true, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1585060544812-6b45742d762f"), age: "1.5 years old" },
  { id: "u17", brand: "motorola", model: "Edge 40", price: 21999, originalPrice: 34999, storage: "256GB", color: "Eclipse Black", batteryHealth: 92, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1585060544812-6b45742d762f"), age: "10 months old" },
  { id: "u18", brand: "nothing", model: "Phone (1)", price: 19999, originalPrice: 34999, storage: "128GB", color: "White", batteryHealth: 87, condition: "Good", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1691480221542-90e26a3f56d5"), age: "1.5 years old" },
  { id: "u19", brand: "apple", model: "iPhone SE (2022)", price: 19999, originalPrice: 43900, storage: "64GB", color: "Midnight", batteryHealth: 89, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1592286927505-1def25115558"), age: "1 year old" },
  { id: "u20", brand: "samsung", model: "Galaxy Note 20", price: 24999, originalPrice: 77999, storage: "256GB", color: "Mystic Bronze", batteryHealth: 82, condition: "Good", hasBill: false, hasBox: false, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: img("photo-1610945415295-d9bbf067e59c"), age: "3 years old" },
];

// Swap in real catalog photography (exact model where we have it, else a brand-matched shot).
const MODEL_PHOTO: Record<string, string> = {
  "iPhone 13": "apple-iphone-13",
  "iPhone 13 Pro": "apple-iphone-13-pro",
};
const BRAND_PHOTO: Record<string, string> = {
  apple: "apple-iphone-13-mini",
  samsung: "samsung-galaxy-s24",
  oneplus: "oneplus-12",
  vivo: "vivo-v30-pro",
  oppo: "oppo-reno-12-pro",
  xiaomi: "xiaomi-redmi-note-13-pro",
  google: "google-pixel-8a",
  realme: "realme-gt-6",
  motorola: "motorola-edge-50-ultra",
  nothing: "nothing-phone-2",
};
for (const u of usedPhones) {
  const url = phoneImage(MODEL_PHOTO[u.model] ?? BRAND_PHOTO[u.brand] ?? "");
  if (url) u.image = url;
}

export const getUsed = (id: string) => usedPhones.find((u) => u.id === id);

