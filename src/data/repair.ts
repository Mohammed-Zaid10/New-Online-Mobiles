export type RepairService = {
  slug: string;
  name: string;
  short: string;
  description: string;
  priceRange: string;
  time: string;
  warranty: string;
  brands: string[];
  icon: string; // lucide icon name
};

export const repairServices: RepairService[] = [
  { slug: "screen", name: "Screen Repair", short: "Cracked or dead display", description: "OEM-grade OLED/LCD panel replacement using calibrated tooling for touch and True Tone accuracy.", priceRange: "₹1,499 – ₹24,999", time: "30 – 90 min", warranty: "6 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Motorola", "Google", "Nothing"], icon: "Smartphone" },
  { slug: "battery", name: "Battery Replacement", short: "Fast drain, swelling", description: "Genuine cells with health >95%. Free health diagnostic and calibration included.", priceRange: "₹1,199 – ₹8,999", time: "30 – 60 min", warranty: "6 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Motorola", "Google", "Honor"], icon: "Battery" },
  { slug: "charging-port", name: "Charging Port Repair", short: "Loose or no charging", description: "Micro-soldering of USB-C / Lightning connectors and flex cable replacement.", priceRange: "₹899 – ₹3,999", time: "45 – 90 min", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Motorola"], icon: "Zap" },
  { slug: "camera", name: "Camera Repair", short: "Blurry lens, black screen", description: "Front, rear and telephoto module replacement including lens glass polishing.", priceRange: "₹999 – ₹14,999", time: "45 – 120 min", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Motorola", "Google", "Nothing"], icon: "Camera" },
  { slug: "speaker", name: "Speaker Repair", short: "Muffled or silent audio", description: "Ear-piece and loud-speaker replacement with grill cleaning and audio calibration.", priceRange: "₹599 – ₹2,999", time: "30 – 60 min", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Motorola"], icon: "Volume2" },
  { slug: "microphone", name: "Microphone Repair", short: "Callers can't hear you", description: "Bottom, top and rear noise-cancelling mic array replacement.", priceRange: "₹499 – ₹2,499", time: "30 – 60 min", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi"], icon: "Mic" },
  { slug: "water-damage", name: "Water Damage Recovery", short: "Liquid contact / no boot", description: "Ultrasonic PCB cleaning, corrosion removal, component-level board rework.", priceRange: "₹1,999 – ₹18,999", time: "24 – 72 hrs", warranty: "1 month", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Google"], icon: "Droplet" },
  { slug: "motherboard", name: "Motherboard Repair", short: "Dead board, no display", description: "Advanced chip-level rework, PMIC / CPU reballing on hot-air BGA station.", priceRange: "₹3,999 – ₹34,999", time: "48 – 96 hrs", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Xiaomi", "Google"], icon: "Cpu" },
  { slug: "face-id", name: "Face ID Repair", short: "iPhone Face ID not working", description: "TrueDepth camera assembly diagnosis and dot projector replacement.", priceRange: "₹4,999 – ₹19,999", time: "60 – 180 min", warranty: "3 months", brands: ["Apple"], icon: "ScanFace" },
  { slug: "back-glass", name: "Back Glass Replacement", short: "Cracked rear panel", description: "Laser-assisted removal of shattered glass with precise adhesive re-seating.", priceRange: "₹1,499 – ₹9,999", time: "60 – 120 min", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Xiaomi"], icon: "Layers" },
  { slug: "sim-tray", name: "SIM Tray Repair", short: "Tray or reader damaged", description: "SIM slot micro-soldering and tray replacement.", priceRange: "₹399 – ₹1,499", time: "20 – 45 min", warranty: "3 months", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi"], icon: "Sim" },
  { slug: "software", name: "Software Repair", short: "Boot loops, hangs, updates", description: "iOS restore, Android flash, ROM install, malware removal and full backup.", priceRange: "₹299 – ₹2,499", time: "30 – 120 min", warranty: "15 days", brands: ["Apple", "Samsung", "Vivo", "Oppo", "OnePlus", "Realme", "Xiaomi", "Motorola", "Google"], icon: "Settings" },
];

export const getRepair = (slug: string) => repairServices.find((r) => r.slug === slug);
