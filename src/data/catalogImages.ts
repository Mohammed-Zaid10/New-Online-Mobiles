// Real catalog photography extracted from the Online Mobiles PDF catalogs
// and served from the Lovable CDN. Pointers live in src/assets/catalog/.

type Pointer = { url: string };

const mods = import.meta.glob("../assets/catalog/*.asset.json", { eager: true }) as Record<
  string,
  Pointer | { default: Pointer }
>;

const BASE_HOST = "https://id-preview-27f3a78d--f27092da-c492-4639-901d-06963332790e.lovable.app";

const urlOf: Record<string, string> = {};
for (const [path, mod] of Object.entries(mods)) {
  const name = path.split("/").pop()!.replace(/\.png\.asset\.json$/, "");
  const p = (mod as { default?: Pointer }).default ?? (mod as Pointer);
  if (p?.url) {
    urlOf[name] = p.url.startsWith("/") ? `${BASE_HOST}${p.url}` : p.url;
  }
}

const numSuffix = (k: string) => Number(k.match(/-(\d+)$/)?.[1] ?? 0);

/** All images whose file name is `${prefix}-<n>.png`, ordered numerically. */
function group(prefix: string): string[] {
  return Object.keys(urlOf)
    .filter((k) => k.startsWith(`${prefix}-`) && /-\d+$/.test(k.slice(prefix.length)))
    .sort((a, b) => numSuffix(a) - numSuffix(b))
    .map((k) => urlOf[k]);
}

/** Single product shot for a phone, e.g. `apple-iphone-15`. */
export const phoneImage = (key: string): string | undefined => urlOf[`phone-${key}`];

/** Every real photo we have for an accessory category slug. */
export const accessoryImages = (categorySlug: string): string[] => group(`acc-${categorySlug}`);
