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

export const usedPhones: UsedPhone[] = [
  { id: "u1", brand: "apple", model: "iPhone 13", price: 39999, originalPrice: 69900, storage: "128GB", color: "Sierra Blue / Midnight", batteryHealth: 92, condition: "Superb", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-iphone-13.png", age: "8 months old" },
  { id: "u2", brand: "apple", model: "iPhone 12", price: 32999, originalPrice: 65900, storage: "64GB", color: "White / Starlight", batteryHealth: 88, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-iphone-12.png", age: "1.5 years old" },
  { id: "u3", brand: "apple", model: "iPhone 11", price: 22999, originalPrice: 49900, storage: "64GB", color: "White", batteryHealth: 85, condition: "Good", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-iphone-11.png", age: "2 years old" },
  { id: "u4", brand: "apple", model: "iPhone 13 Pro", price: 62999, originalPrice: 119900, storage: "256GB", color: "Graphite", batteryHealth: 90, condition: "Superb", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-iphone-13-pro.png", age: "1 year old" },
  { id: "u5", brand: "samsung", model: "Galaxy S23", price: 44999, originalPrice: 79999, storage: "256GB", color: "Lime Green", batteryHealth: 91, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-galaxy-s23.png", age: "10 months old" },
  { id: "u6", brand: "samsung", model: "Galaxy S22 Ultra", price: 42999, originalPrice: 109999, storage: "256GB", color: "Phantom Black", batteryHealth: 87, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-galaxy-s22-ultra.png", age: "1.5 years old" },
  { id: "u7", brand: "samsung", model: "Galaxy A54", price: 24999, originalPrice: 38999, storage: "128GB", color: "Awesome Violet", batteryHealth: 94, condition: "Superb", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-galaxy-a54.png", age: "6 months old" },
  { id: "u8", brand: "oneplus", model: "OnePlus 11", price: 38999, originalPrice: 61999, storage: "256GB", color: "Titan Black", batteryHealth: 89, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-oneplus-11.png", age: "1 year old" },
  { id: "u9", brand: "oneplus", model: "Nord CE 3", price: 16999, originalPrice: 26999, storage: "128GB", color: "Aqua Surge", batteryHealth: 92, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-oneplus-nord-ce3.png", age: "10 months old" },
  { id: "u10", brand: "vivo", model: "V27 Pro", price: 22999, originalPrice: 37999, storage: "128GB", color: "Magic Blue", batteryHealth: 90, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-vivo-v27-pro.png", age: "1 year old" },
  { id: "u11", brand: "oppo", model: "Reno 10 Pro", price: 24999, originalPrice: 39999, storage: "256GB", color: "Ice Blue", batteryHealth: 91, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-oppo-reno-10-pro.png", age: "8 months old" },
  { id: "u12", brand: "xiaomi", model: "Xiaomi 12 Pro", price: 27999, originalPrice: 62999, storage: "256GB", color: "Matte Purple / Gray", batteryHealth: 84, condition: "Good", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-xiaomi-12-pro.png", age: "2 years old" },
  { id: "u13", brand: "xiaomi", model: "Redmi Note 12 Pro", price: 12999, originalPrice: 24999, storage: "128GB", color: "Glacier White", batteryHealth: 93, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-redmi-note-12-pro.png", age: "6 months old" },
  { id: "u14", brand: "google", model: "Pixel 7", price: 32999, originalPrice: 59999, storage: "128GB", color: "Snow White", batteryHealth: 88, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-pixel-7.png", age: "1 year old" },
  { id: "u15", brand: "google", model: "Pixel 6a", price: 18999, originalPrice: 43999, storage: "128GB", color: "Charcoal", batteryHealth: 90, condition: "Excellent", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-pixel-6a.png", age: "1.5 years old" },
  { id: "u16", brand: "realme", model: "Realme GT Neo 3", price: 17999, originalPrice: 36999, storage: "128GB", color: "Sprint White", batteryHealth: 88, condition: "Good", hasBill: true, hasBox: true, hasCharger: true, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-realme-gt-neo-3.png", age: "1.5 years old" },
  { id: "u17", brand: "motorola", model: "Edge 40", price: 21999, originalPrice: 34999, storage: "256GB", color: "Nebula Green", batteryHealth: 92, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: true, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-moto-edge-40.png", age: "10 months old" },
  { id: "u18", brand: "nothing", model: "Phone (1)", price: 19999, originalPrice: 34999, storage: "128GB", color: "Black Glyph", batteryHealth: 87, condition: "Good", hasBill: false, hasBox: true, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-nothing-phone-1.png", age: "1.5 years old" },
  { id: "u19", brand: "apple", model: "iPhone SE", price: 19999, originalPrice: 43900, storage: "64GB", color: "Midnight", batteryHealth: 89, condition: "Excellent", hasBill: true, hasBox: true, hasCharger: false, warranty: "6 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-iphone-se.png", age: "1 year old" },
  { id: "u20", brand: "samsung", model: "Galaxy Note 20", price: 24999, originalPrice: 77999, storage: "256GB", color: "Mystic Bronze", batteryHealth: 82, condition: "Good", hasBill: false, hasBox: false, hasCharger: false, warranty: "3 months shop warranty", imeiVerified: true, technicianTested: true, image: "/used/used-galaxy-note-20.png", age: "3 years old" },
];

export const getUsed = (id: string) => usedPhones.find((u) => u.id === id);
