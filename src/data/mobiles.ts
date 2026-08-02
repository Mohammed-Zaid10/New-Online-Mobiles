import { phoneImage } from "./catalogImages";

export type Mobile = {
  id: string;
  brand: string; // slug
  model: string;
  slug: string;
  price: number; // INR
  mrp?: number;
  storage: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  inStock: boolean;
  emiFrom: number;
  warranty: string;
  rating: number;
  reviews: number;
  specs: {
    display: string;
    processor: string;
    ram: string;
    camera: string;
    battery: string;
    os: string;
    network: string;
    weight: string;
  };
  highlights: string[];
};

// Realistic product photography (Unsplash — smartphone stock).
const IMG = {
  iphone: [
    "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80",
    "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1200&q=80",
    "https://images.unsplash.com/photo-1580910051073-3014dbcfb617?w=1200&q=80",
  ],
  iphonePro: [
    "https://images.unsplash.com/photo-1695048132832-c4efa0c34d84?w=1200&q=80",
    "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=1200&q=80",
    "https://images.unsplash.com/photo-1697898000541-1531f37e59f9?w=1200&q=80",
  ],
  samsung: [
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80",
    "https://images.unsplash.com/photo-1580910051073-3014dbcfb617?w=1200&q=80",
    "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1200&q=80",
  ],
  android: [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&q=80",
    "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=1200&q=80",
  ],
  pixel: [
    "https://images.unsplash.com/photo-1697898000541-1531f37e59f9?w=1200&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&q=80",
  ],
  nothing: [
    "https://images.unsplash.com/photo-1691480221542-90e26a3f56d5?w=1200&q=80",
    "https://images.unsplash.com/photo-1667238811009-d3d5ff9dfb2c?w=1200&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80",
  ],
};

const applePalette = [
  { name: "Midnight", hex: "#1F2937" },
  { name: "Starlight", hex: "#E5DED1" },
  { name: "Silver", hex: "#D9D9D9" },
  { name: "Blue", hex: "#3B5F8A" },
];
const proPalette = [
  { name: "Graphite", hex: "#3A3A3C" },
  { name: "Gold", hex: "#C8A97E" },
  { name: "Deep Purple", hex: "#5B4B7F" },
  { name: "Natural Titanium", hex: "#B5A38E" },
];
const androidPalette = [
  { name: "Phantom Black", hex: "#111111" },
  { name: "Cream", hex: "#F0E7D2" },
  { name: "Green", hex: "#3D6B4B" },
  { name: "Blue", hex: "#3454A6" },
];

const applePro = (ram: string) => ({
  display: "6.7\" Super Retina XDR OLED, 120Hz",
  processor: "Apple A-series Bionic",
  ram,
  camera: "48MP + 12MP + 12MP Triple",
  battery: "4422 mAh, MagSafe wireless",
  os: "iOS 17 (upgradable)",
  network: "5G, Wi-Fi 6E, Bluetooth 5.3",
  weight: "221 g",
});
const appleStd = (ram: string) => ({
  display: "6.1\" Super Retina XDR OLED",
  processor: "Apple A-series Bionic",
  ram,
  camera: "12MP + 12MP Dual",
  battery: "3279 mAh, USB-C / Lightning",
  os: "iOS 17 (upgradable)",
  network: "5G, Wi-Fi 6, Bluetooth 5.3",
  weight: "173 g",
});
const androidSpec = (proc: string, ram: string, disp: string) => ({
  display: disp,
  processor: proc,
  ram,
  camera: "50MP + 12MP + 10MP Triple",
  battery: "5000 mAh, 67W fast charging",
  os: "Android 14, 4 years updates",
  network: "5G, Wi-Fi 6, Bluetooth 5.3",
  weight: "195 g",
});

const mk = (m: Omit<Mobile, "slug" | "id" | "rating" | "reviews">): Mobile => {
  // Deterministic seed from brand+model string so SSR matches client (no Math.random)
  const seed = (m.brand + m.model).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rating = parseFloat((4.4 + (seed % 10) / 20).toFixed(1));
  const reviews = 40 + (seed % 400);
  return {
    id: `${m.brand}-${m.model.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    slug: m.model.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    rating,
    reviews,
    ...m,
  };
};

const rawMobiles: Mobile[] = [
  // Apple
  mk({ brand: "apple", model: "iPhone 13 Mini", price: 49999, mrp: 59900, storage: ["128GB", "256GB"], colors: applePalette, images: IMG.iphone, inStock: true, emiFrom: 2199, warranty: "1 Year Apple India", specs: { ...appleStd("4GB"), display: "5.4\" Super Retina XDR OLED", weight: "141 g" }, highlights: ["A15 Bionic", "Compact 5.4″ OLED", "Ceramic Shield"] }),
  mk({ brand: "apple", model: "iPhone 13", price: 54999, mrp: 69900, storage: ["128GB", "256GB", "512GB"], colors: applePalette, images: IMG.iphone, inStock: true, emiFrom: 2499, warranty: "1 Year Apple India", specs: appleStd("4GB"), highlights: ["A15 Bionic", "Cinematic mode", "Ceramic Shield"] }),
  mk({ brand: "apple", model: "iPhone 13 Pro", price: 89999, mrp: 119900, storage: ["128GB", "256GB", "512GB", "1TB"], colors: proPalette, images: IMG.iphonePro, inStock: true, emiFrom: 3999, warranty: "1 Year Apple India", specs: applePro("6GB"), highlights: ["ProMotion 120Hz", "Pro camera system", "ProRAW"] }),
  mk({ brand: "apple", model: "iPhone 13 Pro Max", price: 109999, mrp: 129900, storage: ["128GB", "256GB", "512GB", "1TB"], colors: proPalette, images: IMG.iphonePro, inStock: true, emiFrom: 4899, warranty: "1 Year Apple India", specs: applePro("6GB"), highlights: ["6.7″ ProMotion", "Longest battery", "ProRes video"] }),
  mk({ brand: "apple", model: "iPhone 14", price: 62999, mrp: 79900, storage: ["128GB", "256GB", "512GB"], colors: applePalette, images: IMG.iphone, inStock: true, emiFrom: 2799, warranty: "1 Year Apple India", specs: appleStd("6GB"), highlights: ["Crash Detection", "Improved cameras", "A15 Bionic"] }),
  mk({ brand: "apple", model: "iPhone 15", price: 69999, mrp: 79900, storage: ["128GB", "256GB", "512GB"], colors: [{ name: "Pink", hex: "#F1C7C4" }, { name: "Yellow", hex: "#E8DEB5" }, { name: "Green", hex: "#C7D4C4" }, { name: "Blue", hex: "#BFCFE0" }, { name: "Black", hex: "#1F2937" }], images: IMG.iphone, inStock: true, emiFrom: 3099, warranty: "1 Year Apple India", specs: { ...appleStd("6GB"), processor: "Apple A16 Bionic" }, highlights: ["Dynamic Island", "USB-C", "48MP main"] }),
  mk({ brand: "apple", model: "iPhone 16", price: 79999, mrp: 89900, storage: ["128GB", "256GB", "512GB"], colors: applePalette, images: IMG.iphonePro, inStock: true, emiFrom: 3499, warranty: "1 Year Apple India", specs: { ...appleStd("8GB"), processor: "Apple A18" }, highlights: ["Apple Intelligence ready", "A18 chip", "Camera Control"] }),

  // Samsung
  mk({ brand: "samsung", model: "Galaxy S24 Ultra", price: 129999, mrp: 139999, storage: ["256GB", "512GB", "1TB"], colors: androidPalette, images: IMG.samsung, inStock: true, emiFrom: 5799, warranty: "1 Year Samsung India", specs: androidSpec("Snapdragon 8 Gen 3", "12GB", "6.8\" QHD+ Dynamic AMOLED 120Hz"), highlights: ["S Pen", "200MP camera", "Titanium frame"] }),
  mk({ brand: "samsung", model: "Galaxy S24", price: 74999, mrp: 84999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.samsung, inStock: true, emiFrom: 3349, warranty: "1 Year Samsung India", specs: androidSpec("Exynos 2400", "8GB", "6.2\" FHD+ AMOLED 120Hz"), highlights: ["AI photo edit", "Ultra bright display"] }),
  mk({ brand: "samsung", model: "Galaxy A55", price: 39999, mrp: 45999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.samsung, inStock: true, emiFrom: 1799, warranty: "1 Year Samsung India", specs: androidSpec("Exynos 1480", "8GB", "6.6\" FHD+ Super AMOLED"), highlights: ["Metal frame", "IP67", "5 years updates"] }),
  mk({ brand: "samsung", model: "Galaxy M35", price: 18999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.samsung, inStock: true, emiFrom: 899, warranty: "1 Year Samsung India", specs: androidSpec("Exynos 1380", "6GB", "6.6\" FHD+ Super AMOLED 120Hz"), highlights: ["6000 mAh", "50MP OIS", "120Hz sAMOLED"] }),

  // Vivo
  mk({ brand: "vivo", model: "X100 Pro", price: 89999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 3999, warranty: "1 Year Vivo India", specs: androidSpec("Dimensity 9300", "16GB", "6.78\" AMOLED LTPO 120Hz"), highlights: ["Zeiss optics", "1\" main sensor", "100W charging"] }),
  mk({ brand: "vivo", model: "V30 Pro", price: 46999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 2099, warranty: "1 Year Vivo India", specs: androidSpec("Dimensity 8200", "12GB", "6.78\" AMOLED 120Hz"), highlights: ["Zeiss portrait", "Aura Light", "80W charging"] }),
  mk({ brand: "vivo", model: "Y200 5G", price: 22999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1049, warranty: "1 Year Vivo India", specs: androidSpec("Snapdragon 4 Gen 2", "8GB", "6.67\" AMOLED"), highlights: ["Aura Light", "44W charging"] }),

  // Oppo
  mk({ brand: "oppo", model: "Reno 12 Pro", price: 42999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1899, warranty: "1 Year Oppo India", specs: androidSpec("Dimensity 7300 Energy", "12GB", "6.7\" AMOLED 120Hz"), highlights: ["50MP telephoto", "AI Portrait", "80W SUPERVOOC"] }),
  mk({ brand: "oppo", model: "F27 Pro+", price: 27999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1249, warranty: "1 Year Oppo India", specs: androidSpec("Dimensity 7050", "8GB", "6.7\" AMOLED"), highlights: ["IP69 rated", "5000 mAh", "45W charging"] }),

  // Xiaomi
  mk({ brand: "xiaomi", model: "Xiaomi 14", price: 69999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 3099, warranty: "1 Year Xiaomi India", specs: androidSpec("Snapdragon 8 Gen 3", "12GB", "6.36\" LTPO AMOLED 120Hz"), highlights: ["Leica optics", "90W wired", "IP68"] }),
  mk({ brand: "xiaomi", model: "Redmi Note 13 Pro+", price: 31999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1429, warranty: "1 Year Xiaomi India", specs: androidSpec("Dimensity 7200 Ultra", "8GB", "6.67\" AMOLED 120Hz"), highlights: ["200MP OIS", "120W HyperCharge", "IP68"] }),
  mk({ brand: "xiaomi", model: "Redmi 13C 5G", price: 10499, storage: ["64GB", "128GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 499, warranty: "1 Year Xiaomi India", specs: androidSpec("Dimensity 6100+", "4GB", "6.74\" HD+ 90Hz"), highlights: ["Budget 5G", "50MP camera"] }),

  // OnePlus
  mk({ brand: "oneplus", model: "OnePlus 12", price: 64999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 2899, warranty: "1 Year OnePlus", specs: androidSpec("Snapdragon 8 Gen 3", "12GB", "6.82\" LTPO AMOLED 120Hz"), highlights: ["Hasselblad", "100W SUPERVOOC", "50W wireless"] }),
  mk({ brand: "oneplus", model: "OnePlus Nord 4", price: 29999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1349, warranty: "1 Year OnePlus", specs: androidSpec("Snapdragon 7+ Gen 3", "8GB", "6.74\" AMOLED 120Hz"), highlights: ["Metal unibody", "100W charging"] }),

  // Realme
  mk({ brand: "realme", model: "Realme GT 6", price: 40999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1849, warranty: "1 Year Realme India", specs: androidSpec("Snapdragon 8s Gen 3", "12GB", "6.78\" AMOLED 120Hz"), highlights: ["120W charging", "6000 nits peak"] }),
  mk({ brand: "realme", model: "Realme Narzo 70 Pro", price: 19999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 899, warranty: "1 Year Realme India", specs: androidSpec("Dimensity 7050", "8GB", "6.67\" AMOLED 120Hz"), highlights: ["Sony IMX890", "IP65"] }),

  // Motorola
  mk({ brand: "motorola", model: "Edge 50 Ultra", price: 59999, storage: ["512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 2699, warranty: "1 Year Motorola India", specs: androidSpec("Snapdragon 8s Gen 3", "12GB", "6.7\" pOLED 144Hz"), highlights: ["Wood/leather back", "125W TurboPower"] }),
  mk({ brand: "motorola", model: "Moto G84 5G", price: 17999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 799, warranty: "1 Year Motorola India", specs: androidSpec("Snapdragon 695", "8GB", "6.55\" pOLED 120Hz"), highlights: ["Stock Android", "Vegan leather"] }),

  // Google
  mk({ brand: "google", model: "Pixel 8 Pro", price: 106999, storage: ["128GB", "256GB", "512GB"], colors: androidPalette, images: IMG.pixel, inStock: true, emiFrom: 4799, warranty: "1 Year Google India", specs: androidSpec("Google Tensor G3", "12GB", "6.7\" LTPO OLED 120Hz"), highlights: ["Magic Editor AI", "7 years updates", "Temperature sensor"] }),
  mk({ brand: "google", model: "Pixel 8a", price: 52999, storage: ["128GB", "256GB"], colors: androidPalette, images: IMG.pixel, inStock: true, emiFrom: 2399, warranty: "1 Year Google India", specs: androidSpec("Google Tensor G3", "8GB", "6.1\" OLED 120Hz"), highlights: ["Best-in-class camera", "7 years updates"] }),

  // Nothing
  mk({ brand: "nothing", model: "Phone (2)", price: 44999, storage: ["256GB", "512GB"], colors: [{ name: "White", hex: "#F2F2F2" }, { name: "Dark Grey", hex: "#3A3A3C" }], images: IMG.nothing, inStock: true, emiFrom: 2029, warranty: "1 Year Nothing India", specs: androidSpec("Snapdragon 8+ Gen 1", "12GB", "6.7\" LTPO OLED 120Hz"), highlights: ["Glyph Interface", "Transparent design"] }),
  mk({ brand: "nothing", model: "Phone (2a)", price: 23999, storage: ["128GB", "256GB"], colors: [{ name: "White", hex: "#F2F2F2" }, { name: "Milk", hex: "#EDE9DF" }, { name: "Black", hex: "#1F2937" }], images: IMG.nothing, inStock: true, emiFrom: 1099, warranty: "1 Year Nothing India", specs: androidSpec("Dimensity 7200 Pro", "8GB", "6.7\" AMOLED 120Hz"), highlights: ["Glyph Interface", "45W charging"] }),

  // Honor
  mk({ brand: "honor", model: "Honor 200 Pro", price: 57999, storage: ["256GB", "512GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 2599, warranty: "1 Year Honor India", specs: androidSpec("Snapdragon 8s Gen 3", "12GB", "6.78\" AMOLED 120Hz"), highlights: ["Harcourt portrait", "100W charging"] }),

  // Tecno
  mk({ brand: "tecno", model: "Camon 30 Pro 5G", price: 24999, storage: ["256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1129, warranty: "1 Year Tecno India", specs: androidSpec("Dimensity 8200 Ultra", "8GB", "6.78\" AMOLED 120Hz"), highlights: ["50MP portrait", "70W charging"] }),

  // Infinix
  mk({ brand: "infinix", model: "Note 40 Pro+ 5G", price: 22999, storage: ["256GB"], colors: androidPalette, images: IMG.android, inStock: true, emiFrom: 1049, warranty: "1 Year Infinix India", specs: androidSpec("Dimensity 7020", "12GB", "6.78\" AMOLED 120Hz"), highlights: ["100W wired", "20W wireless"] }),
];

// Real catalog photography, keyed by model name.
const PHONE_KEY: Record<string, string> = {
  "iPhone 13 Mini": "apple-iphone-13-mini",
  "iPhone 13": "apple-iphone-13",
  "iPhone 13 Pro": "apple-iphone-13-pro",
  "iPhone 13 Pro Max": "apple-iphone-13-pro-max",
  "iPhone 14": "apple-iphone-14",
  "iPhone 15": "apple-iphone-15",
  "iPhone 16": "apple-iphone-16",
  "Galaxy S24 Ultra": "samsung-galaxy-s24-ultra",
  "Galaxy S24": "samsung-galaxy-s24",
  "Galaxy A55": "samsung-galaxy-a55",
  "Galaxy M35": "samsung-galaxy-m35",
  "X100 Pro": "vivo-x100-pro",
  "V30 Pro": "vivo-v30-pro",
  "Y200 5G": "vivo-y200",
  "Reno 12 Pro": "oppo-reno-12-pro",
  "F27 Pro+": "oppo-f27-pro-plus",
  "Xiaomi 14": "xiaomi-14",
  "Redmi Note 13 Pro+": "xiaomi-redmi-note-13-pro",
  "Redmi 13C 5G": "xiaomi-redmi-13c",
  "OnePlus 12": "oneplus-12",
  "OnePlus Nord 4": "oneplus-nord-4",
  "Realme GT 6": "realme-gt-6",
  "Realme Narzo 70 Pro": "realme-narzo-70-pro",
  "Edge 50 Ultra": "motorola-edge-50-ultra",
  "Moto G84 5G": "motorola-moto-g84",
  "Pixel 8 Pro": "google-pixel-8-pro",
  "Pixel 8a": "google-pixel-8a",
  "Phone (2)": "nothing-phone-2",
  "Phone (2a)": "nothing-phone-2a",
  "Honor 200 Pro": "honor-200-pro",
  "Camon 30 Pro 5G": "tecno-camon-30-pro",
  "Note 40 Pro+ 5G": "infinix-note-40-pro-plus",
};

import { getVariantsForModel } from "./phoneVariants";

export const mobiles: Mobile[] = rawMobiles.map((m) => {
  const vars = getVariantsForModel(m.model);
  if (vars && vars.length > 0) {
    return {
      ...m,
      images: vars.map((v) => v.image),
    };
  }
  return m;
});

export const getMobile = (brand: string, slug: string) =>
  mobiles.find((m) => m.brand === brand && m.slug === slug);

export const brandMobiles = (brand: string) => mobiles.filter((m) => m.brand === brand);

