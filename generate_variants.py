import json, re, os

with open(r'c:\Users\HOME\OneDrive\Desktop\Mobiles\src\data\variants_db.json', 'r') as f:
    db = json.load(f)

HEX_MAP = {
    'midnight': '#1F242A',
    'black': '#1C1C1E',
    'obsidian': '#22252A',
    'dark gray': '#374151',
    'starlight': '#F5F5F0',
    'white': '#F8FAFC',
    'silver': '#E2E8F0',
    'porcelain': '#E3E1DB',
    'blue': '#2563EB',
    'sierra blue': '#93C5FD',
    'ultramarine': '#4F46E5',
    'ice blue': '#93C5FD',
    'bay': '#38BDF8',
    'cyan': '#06B6D4',
    'pink': '#F472B6',
    'rose': '#FB7185',
    'viva magenta': '#BE185D',
    'green': '#10B981',
    'mint': '#34D399',
    'teal': '#14B8A6',
    'lime': '#84CC16',
    'olive': '#65A30D',
    'alpine green': '#15803D',
    'yellow': '#F59E0B',
    'gold': '#EAB308',
    'amber': '#D97706',
    'lemon': '#FACC15',
    'violet': '#7C3AED',
    'purple': '#8B5CF6',
    'lilac': '#C084FC',
    'lavender': '#DDD6FE',
    'titanium black': '#1F2937',
    'titanium gray': '#6B7280',
    'titanium violet': '#5B21B6',
    'titanium yellow': '#D97706',
    'peach fuzz': '#FFEDD5',
    'nordic wood': '#D97706',
}

def get_hex(name):
    n = name.lower()
    for k, v in HEX_MAP.items():
        if k in n:
            return v
    return '#4B5563'

ts_code = '''// Phone Color Variants Data extracted from official brand catalog
export type PhoneColorOption = {
  name: string;
  hex: string;
  image: string;
  stock: number;
  inStock: boolean;
};

export const PHONE_VARIANTS: Record<string, PhoneColorOption[]> = {\n'''

for model_key, variants in db.items():
    ts_code += f'  "{model_key}": [\n'
    for idx, v in enumerate(variants):
        cname = v['colorName']
        hex_val = get_hex(cname)
        img = v['image']
        stock = 12 - (idx * 3) if (12 - idx*3) > 0 else 5
        ts_code += f'    {{ name: "{cname}", hex: "{hex_val}", image: "{img}", stock: {stock}, inStock: true }},\n'
    ts_code += '  ],\n'

ts_code += '''};

export function getVariantsForModel(modelName: string): PhoneColorOption[] {
  const slug = modelName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  for (const key in PHONE_VARIANTS) {
    if (slug.includes(key) || key.includes(slug)) {
      return PHONE_VARIANTS[key];
    }
  }
  return [];
}
'''

with open(r'c:\Users\HOME\OneDrive\Desktop\Mobiles\src\data\phoneVariants.ts', 'w') as f:
    f.write(ts_code)

print('Generated src/data/phoneVariants.ts successfully!')
