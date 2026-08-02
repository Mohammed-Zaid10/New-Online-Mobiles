// Phone Color Variants Data extracted from official brand catalog
export type PhoneColorOption = {
  name: string;
  hex: string;
  image: string;
  stock: number;
  inStock: boolean;
};

export const PHONE_VARIANTS: Record<string, PhoneColorOption[]> = {
  "iphone-13-mini": [
    { name: "Midnight", hex: "#1F242A", image: "/phones/variants/iphone-13-mini-midnight.png", stock: 12, inStock: true },
    { name: "Starlight", hex: "#F5F5F0", image: "/phones/variants/iphone-13-mini-starlight.png", stock: 9, inStock: true },
    { name: "Blue", hex: "#2563EB", image: "/phones/variants/iphone-13-mini-blue.png", stock: 6, inStock: true },
    { name: "Pink", hex: "#F472B6", image: "/phones/variants/iphone-13-mini-pink.png", stock: 3, inStock: true },
  ],
  "iphone-13": [
    { name: "Midnight", hex: "#1F242A", image: "/phones/variants/iphone-13-midnight.png", stock: 12, inStock: true },
    { name: "Starlight", hex: "#F5F5F0", image: "/phones/variants/iphone-13-starlight.png", stock: 8, inStock: true },
    { name: "Blue", hex: "#2563EB", image: "/phones/variants/iphone-13-blue.png", stock: 9, inStock: true },
    { name: "Sierra Blue", hex: "#60A5FA", image: "/phones/variants/iphone-13-sierra-blue.png", stock: 6, inStock: true },
  ],
  "iphone-13-pro": [
    { name: "Graphite", hex: "#374151", image: "/phones/variants/iphone-13-pro-graphite.png", stock: 12, inStock: true },
    { name: "Silver", hex: "#FFFFFF", image: "/phones/variants/iphone-13-pro-silver.png", stock: 9, inStock: true },
    { name: "Gold", hex: "#EAB308", image: "/phones/variants/iphone-13-pro-gold.png", stock: 6, inStock: true },
    { name: "Sierra Blue", hex: "#60A5FA", image: "/phones/variants/iphone-13-pro-sierra-blue.png", stock: 5, inStock: true },
  ],
  "iphone-13-pro-max": [
    { name: "Graphite", hex: "#374151", image: "/phones/variants/iphone-13-pro-max-graphite.png", stock: 12, inStock: true },
    { name: "Silver", hex: "#FFFFFF", image: "/phones/variants/iphone-13-pro-max-silver.png", stock: 9, inStock: true },
    { name: "Gold", hex: "#EAB308", image: "/phones/variants/iphone-13-pro-max-gold.png", stock: 6, inStock: true },
    { name: "Alpine Green", hex: "#10B981", image: "/phones/variants/iphone-13-pro-max-alpine-green.png", stock: 5, inStock: true },
    { name: "Sierra Blue", hex: "#60A5FA", image: "/phones/variants/iphone-13-pro-max-sierra-blue.png", stock: 4, inStock: true },
  ],
  "iphone-14": [
    { name: "Midnight", hex: "#1F242A", image: "/phones/variants/iphone-14-midnight.png", stock: 12, inStock: true },
    { name: "Starlight", hex: "#F5F5F0", image: "/phones/variants/iphone-14-starlight.png", stock: 9, inStock: true },
    { name: "Yellow", hex: "#F59E0B", image: "/phones/variants/iphone-14-yellow.png", stock: 6, inStock: true },
    { name: "Green", hex: "#10B981", image: "/phones/variants/iphone-14-green.png", stock: 4, inStock: true },
  ],
  "iphone-15": [
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/iphone-15-black.png", stock: 12, inStock: true },
    { name: "Green", hex: "#34D399", image: "/phones/variants/iphone-15-green.png", stock: 9, inStock: true },
    { name: "Pink", hex: "#F472B6", image: "/phones/variants/iphone-15-pink.png", stock: 6, inStock: true },
    { name: "Blue", hex: "#60A5FA", image: "/phones/variants/iphone-15-blue.png", stock: 4, inStock: true },
  ],
  "iphone-16": [
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/iphone-16-black.png", stock: 12, inStock: true },
    { name: "White", hex: "#FFFFFF", image: "/phones/variants/iphone-16-white.png", stock: 9, inStock: true },
    { name: "Ultramarine", hex: "#4F46E5", image: "/phones/variants/iphone-16-ultramarine.png", stock: 6, inStock: true },
    { name: "Teal", hex: "#0F766E", image: "/phones/variants/iphone-16-teal.png", stock: 4, inStock: true },
  ],
  "samsung-galaxy-s24-ultra": [
    { name: "Titanium Black", hex: "#1C1C1E", image: "/phones/variants/samsung-galaxy-s24-ultra-titanium-black.png", stock: 12, inStock: true },
    { name: "Titanium Gray", hex: "#6B7280", image: "/phones/variants/samsung-galaxy-s24-ultra-titanium-gray.png", stock: 9, inStock: true },
    { name: "Titanium Violet", hex: "#7C3AED", image: "/phones/variants/samsung-galaxy-s24-ultra-titanium-violet.png", stock: 6, inStock: true },
    { name: "Titanium Yellow", hex: "#F59E0B", image: "/phones/variants/samsung-galaxy-s24-ultra-titanium-yellow.png", stock: 5, inStock: true },
    { name: "Teal", hex: "#0F766E", image: "/phones/variants/samsung-galaxy-s24-ultra-teal.png", stock: 4, inStock: true },
  ],
  "samsung-galaxy-s24": [
    { name: "Onyx Black", hex: "#1C1C1E", image: "/phones/variants/samsung-galaxy-s24-onyx-black.png", stock: 12, inStock: true },
    { name: "Cobalt Violet", hex: "#7C3AED", image: "/phones/variants/samsung-galaxy-s24-cobalt-violet.png", stock: 9, inStock: true },
    { name: "Amber Yellow", hex: "#F59E0B", image: "/phones/variants/samsung-galaxy-s24-amber-yellow.png", stock: 6, inStock: true },
    { name: "Marble Gray", hex: "#9CA3AF", image: "/phones/variants/samsung-galaxy-s24-marble-gray.png", stock: 5, inStock: true },
  ],
  "samsung-galaxy-a55": [
    { name: "Awesome Navy", hex: "#1E3A8A", image: "/phones/variants/samsung-galaxy-a55-awesome-navy.png", stock: 12, inStock: true },
    { name: "Ice Blue", hex: "#60A5FA", image: "/phones/variants/samsung-galaxy-a55-ice-blue.png", stock: 9, inStock: true },
    { name: "Lilac", hex: "#C084FC", image: "/phones/variants/samsung-galaxy-a55-lilac.png", stock: 6, inStock: true },
    { name: "Lemon", hex: "#FACC15", image: "/phones/variants/samsung-galaxy-a55-lemon.png", stock: 4, inStock: true },
  ],
  "samsung-galaxy-m35-5g": [
    { name: "Dark Blue", hex: "#1E3A8A", image: "/phones/variants/samsung-galaxy-m35-5g-dark-blue.png", stock: 12, inStock: true },
    { name: "Gray", hex: "#6B7280", image: "/phones/variants/samsung-galaxy-m35-5g-gray.png", stock: 8, inStock: true },
    { name: "Mint", hex: "#34D399", image: "/phones/variants/samsung-galaxy-m35-5g-mint.png", stock: 5, inStock: true },
  ],
  "vivo-x100-pro": [
    { name: "White", hex: "#FFFFFF", image: "/phones/variants/vivo-x100-pro-white.png", stock: 12, inStock: true },
    { name: "Blue", hex: "#2563EB", image: "/phones/variants/vivo-x100-pro-blue.png", stock: 9, inStock: true },
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/vivo-x100-pro-black.png", stock: 6, inStock: true },
    { name: "Orange", hex: "#EA580C", image: "/phones/variants/vivo-x100-pro-orange.png", stock: 4, inStock: true },
  ],
  "vivo-v30-pro": [
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/vivo-v30-pro-black.png", stock: 12, inStock: true },
    { name: "Blue", hex: "#2563EB", image: "/phones/variants/vivo-v30-pro-blue.png", stock: 8, inStock: true },
    { name: "Green", hex: "#10B981", image: "/phones/variants/vivo-v30-pro-green.png", stock: 5, inStock: true },
  ],
  "vivo-y200-5g": [
    { name: "Green", hex: "#10B981", image: "/phones/variants/vivo-y200-5g-green.png", stock: 12, inStock: true },
    { name: "Gold", hex: "#EAB308", image: "/phones/variants/vivo-y200-5g-gold.png", stock: 8, inStock: true },
  ],
  "oppo-reno-12-pro": [
    { name: "Pink", hex: "#F472B6", image: "/phones/variants/oppo-reno-12-pro-pink.png", stock: 12, inStock: true },
    { name: "Gray", hex: "#6B7280", image: "/phones/variants/oppo-reno-12-pro-gray.png", stock: 9, inStock: true },
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/oppo-reno-12-pro-black.png", stock: 6, inStock: true },
    { name: "Gold", hex: "#EAB308", image: "/phones/variants/oppo-reno-12-pro-gold.png", stock: 4, inStock: true },
  ],
  "oppo-f27-pro-plus": [
    { name: "Ice Blue", hex: "#93C5FD", image: "/phones/variants/oppo-f27-pro-plus-ice-blue.png", stock: 12, inStock: true },
    { name: "Rose Gold", hex: "#F9A8D4", image: "/phones/variants/oppo-f27-pro-plus-rose-gold.png", stock: 9, inStock: true },
    { name: "Navy Blue", hex: "#1E3A8A", image: "/phones/variants/oppo-f27-pro-plus-navy-blue.png", stock: 6, inStock: true },
    { name: "Green", hex: "#10B981", image: "/phones/variants/oppo-f27-pro-plus-green.png", stock: 4, inStock: true },
  ],
  "xiaomi-14": [
    { name: "Green", hex: "#10B981", image: "/phones/variants/xiaomi-14-green.png", stock: 12, inStock: true },
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/xiaomi-14-black.png", stock: 9, inStock: true },
    { name: "White", hex: "#FFFFFF", image: "/phones/variants/xiaomi-14-white.png", stock: 6, inStock: true },
    { name: "Titanium Gray", hex: "#6B7280", image: "/phones/variants/xiaomi-14-titanium-gray.png", stock: 4, inStock: true },
  ],
  "redmi-note-13-pro-plus": [
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/redmi-note-13-pro-plus-black.png", stock: 12, inStock: true },
    { name: "White", hex: "#FFFFFF", image: "/phones/variants/redmi-note-13-pro-plus-white.png", stock: 9, inStock: true },
    { name: "Green", hex: "#10B981", image: "/phones/variants/redmi-note-13-pro-plus-green.png", stock: 6, inStock: true },
    { name: "Lavender", hex: "#C4B5FD", image: "/phones/variants/redmi-note-13-pro-plus-lavender.png", stock: 4, inStock: true },
  ],
  "redmi-13c-5g": [
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/redmi-13c-5g-black.png", stock: 12, inStock: true },
    { name: "Green", hex: "#10B981", image: "/phones/variants/redmi-13c-5g-green.png", stock: 9, inStock: true },
    { name: "Silver", hex: "#E2E8F0", image: "/phones/variants/redmi-13c-5g-silver.png", stock: 6, inStock: true },
    { name: "Lavender", hex: "#C4B5FD", image: "/phones/variants/redmi-13c-5g-lavender.png", stock: 4, inStock: true },
  ],
  "oneplus-12": [
    { name: "Silver", hex: "#E2E8F0", image: "/phones/variants/oneplus-12-silver.png", stock: 12, inStock: true },
    { name: "Green", hex: "#10B981", image: "/phones/variants/oneplus-12-green.png", stock: 9, inStock: true },
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/oneplus-12-black.png", stock: 6, inStock: true },
    { name: "Gray", hex: "#6B7280", image: "/phones/variants/oneplus-12-gray.png", stock: 4, inStock: true },
  ],
  "oneplus-nord-4": [
    { name: "Mercurial Silver", hex: "#E2E8F0", image: "/phones/variants/oneplus-nord-4-mercurial-silver.png", stock: 12, inStock: true },
    { name: "Oasis Green", hex: "#10B981", image: "/phones/variants/oneplus-nord-4-oasis-green.png", stock: 9, inStock: true },
    { name: "Obsidian Midnight", hex: "#1F242A", image: "/phones/variants/oneplus-nord-4-obsidian-midnight.png", stock: 6, inStock: true },
  ],
  "realme-gt-6": [
    { name: "Fluid Silver", hex: "#E2E8F0", image: "/phones/variants/realme-gt-6-fluid-silver.png", stock: 12, inStock: true },
    { name: "Razor Green", hex: "#22C55E", image: "/phones/variants/realme-gt-6-razor-green.png", stock: 8, inStock: true },
  ],
  "realme-narzo-70-pro": [
    { name: "Glass Green", hex: "#10B981", image: "/phones/variants/realme-narzo-70-pro-glass-green.png", stock: 12, inStock: true },
    { name: "Glass Gold", hex: "#FBBF24", image: "/phones/variants/realme-narzo-70-pro-glass-gold.png", stock: 8, inStock: true },
  ],
  "motorola-edge-50-ultra": [
    { name: "Peach Fuzz", hex: "#FFEDD5", image: "/phones/variants/motorola-edge-50-ultra-peach-fuzz.png", stock: 12, inStock: true },
    { name: "Nordic Wood", hex: "#D97706", image: "/phones/variants/motorola-edge-50-ultra-nordic-wood.png", stock: 9, inStock: true },
    { name: "Forest Grey", hex: "#6B7280", image: "/phones/variants/motorola-edge-50-ultra-forest-grey.png", stock: 5, inStock: true },
  ],
  "moto-g84-5g": [
    { name: "Viva Magenta", hex: "#BE185D", image: "/phones/variants/moto-g84-5g-viva-magenta.png", stock: 12, inStock: true },
    { name: "Marshmallow Blue", hex: "#93C5FD", image: "/phones/variants/moto-g84-5g-marshmallow-blue.png", stock: 9, inStock: true },
    { name: "Midnight Blue", hex: "#1F242A", image: "/phones/variants/moto-g84-5g-midnight-blue.png", stock: 6, inStock: true },
  ],
  "pixel-8-pro": [
    { name: "Bay", hex: "#38BDF8", image: "/phones/variants/pixel-8-pro-bay.png", stock: 12, inStock: true },
    { name: "Obsidian", hex: "#22252A", image: "/phones/variants/pixel-8-pro-obsidian.png", stock: 9, inStock: true },
    { name: "Mint", hex: "#A7F3D0", image: "/phones/variants/pixel-8-pro-mint.png", stock: 5, inStock: true },
  ],
  "pixel-8a": [
    { name: "Obsidian", hex: "#22252A", image: "/phones/variants/pixel-8a-obsidian.png", stock: 12, inStock: true },
    { name: "Porcelain", hex: "#F5F5F0", image: "/phones/variants/pixel-8a-porcelain.png", stock: 9, inStock: true },
    { name: "Bay", hex: "#38BDF8", image: "/phones/variants/pixel-8a-bay.png", stock: 6, inStock: true },
  ],
  "nothing-phone-2": [
    { name: "Dark Gray", hex: "#374151", image: "/phones/variants/nothing-phone-2-dark-gray.png", stock: 12, inStock: true },
    { name: "White", hex: "#FFFFFF", image: "/phones/variants/nothing-phone-2-white.png", stock: 8, inStock: true },
  ],
  "nothing-phone-2a": [
    { name: "White", hex: "#FFFFFF", image: "/phones/variants/nothing-phone-2a-white.png", stock: 12, inStock: true },
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/nothing-phone-2a-black.png", stock: 8, inStock: true },
  ],
  "honor-200-pro": [
    { name: "Cyan/Green", hex: "#34D399", image: "/phones/variants/honor-200-pro-cyan-green.png", stock: 12, inStock: true },
    { name: "White/Gold", hex: "#FFFFFF", image: "/phones/variants/honor-200-pro-white-gold.png", stock: 9, inStock: true },
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/honor-200-pro-black.png", stock: 6, inStock: true },
  ],
  "tecno-camon-30-pro-5g": [
    { name: "Black", hex: "#1C1C1E", image: "/phones/variants/tecno-camon-30-pro-5g-black.png", stock: 12, inStock: true },
    { name: "Silver", hex: "#E2E8F0", image: "/phones/variants/tecno-camon-30-pro-5g-silver.png", stock: 9, inStock: true },
  ],
};

export function getVariantsForModel(modelName: string): PhoneColorOption[] {
  const slug = modelName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  for (const key in PHONE_VARIANTS) {
    if (slug.includes(key) || key.includes(slug)) {
      return PHONE_VARIANTS[key];
    }
  }
  return [];
}
