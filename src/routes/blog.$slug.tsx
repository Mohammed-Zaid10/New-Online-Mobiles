import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BadgeCheck, Battery, BookOpen, Calendar, Camera, Check, ChevronDown, ChevronRight,
  Clock, Cpu, ShieldCheck, Smartphone, Sparkles, Star, Tag, Wrench, X, Zap, Share2, HelpCircle,
  TrendingUp, Award, Layers
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP, inr, wa } from "@/lib/shop";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Blog — Online Mobiles" }] };
    const p = loaderData.post;
    return {
      meta: [
        { title: p.metaTitle },
        { name: "description", content: p.metaDescription },
        { name: "keywords", content: p.keywords.join(", ") },
        { property: "og:title", content: p.metaTitle },
        { property: "og:description", content: p.metaDescription },
        { property: "og:image", content: p.coverImage },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `${SHOP.siteUrl}/blog/${p.slug}` }],
    };
  },
  component: BlogPostDetail,
});

function BlogPostDetail() {
  const { post } = Route.useLoaderData();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-24 text-white font-sans"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(8,8,8,0.3), rgba(8,8,8,0.5)), url('/backgrounds/blog-bg.png')",
      }}
    >
      {/* Article Hero Banner */}
      <div className="relative border-b border-white/10 bg-slate-950/80 pt-8 pb-12 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.category },
            ]}
          />

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {post.publishedAt}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-4xl">
              {post.subtitle}
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <img src={post.author.avatar} alt={post.author.name} className="h-11 w-11 rounded-full object-contain bg-black shadow-md" />
              <div>
                <div className="font-semibold text-sm text-white">{post.author.name}</div>
                <div className="text-xs text-zinc-400">{post.author.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/15 shadow-2xl mb-12">
          <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
        </div>

        {/* Executive Summary Box */}
        <div className="rounded-3xl border border-amber-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4 mb-12">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
            <Sparkles className="h-4 w-4" /> Executive Summary
          </div>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
            In 2026 the smartphone market offers a dizzying array of choices. Flagship phones now pack cutting-edge chips (e.g. Apple’s A18 or A19 Bionic, Qualcomm’s Snapdragon 8 Gen 4, Google’s Tensor G5), ultra-sharp displays (120–144Hz OLED, 1500–2600 nit HDR), multi-camera arrays (100–200MP sensors, 5× periscopes, LiDAR), and powerful AI features (on-device ML, generative AI assistants). Mid-range and budget phones have also improved (high-refresh OLEDs, 5G, 5000mAh batteries).
          </p>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            This guide breaks down the key factors when choosing a phone: <strong>performance, display, camera, battery/charging, software/AI, build quality, connectivity, storage, pricing tiers, trade-in/repair, accessories</strong>, and a final <strong>buying checklist</strong>. We provide comparison tables, a 6–12 month purchase timeline, FAQs, and CTAs tailored to Online Mobiles.
          </p>
        </div>

        {/* Quick Table of Contents */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 backdrop-blur-md mb-12">
          <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" /> Table of Contents
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-zinc-300">
            <a href="#performance" className="hover:text-amber-400 transition">1. Performance</a>
            <a href="#display" className="hover:text-amber-400 transition">2. Display</a>
            <a href="#camera" className="hover:text-amber-400 transition">3. Camera System</a>
            <a href="#battery" className="hover:text-amber-400 transition">4. Battery & Charging</a>
            <a href="#software" className="hover:text-amber-400 transition">5. Software & AI</a>
            <a href="#build" className="hover:text-amber-400 transition">6. Build & Durability</a>
            <a href="#connectivity" className="hover:text-amber-400 transition">7. Connectivity</a>
            <a href="#storage" className="hover:text-amber-400 transition">8. Storage & SIM</a>
            <a href="#pricetiers" className="hover:text-amber-400 transition">9. Price Tiers</a>
            <a href="#recommendations" className="hover:text-amber-400 transition">10. Top 8 Phones</a>
            <a href="#tradein" className="hover:text-amber-400 transition">11. Trade-In & Repairs</a>
            <a href="#accessories" className="hover:text-amber-400 transition">12. Essential Accessories</a>
            <a href="#checklist" className="hover:text-amber-400 transition">13. Buying Checklist</a>
            <a href="#timeline" className="hover:text-amber-400 transition">14. Buying Timeline</a>
            <a href="#faq" className="hover:text-amber-400 transition">15. Frequently Asked FAQs</a>
          </div>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-16 text-zinc-200">
          {/* Section 1: Performance */}
          <section id="performance" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">1. Performance & Processors</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              Modern smartphones use very powerful processors. Flagship Android phones typically run Qualcomm’s <strong>Snapdragon 8 Gen 4</strong> (or Gen 3) or Samsung’s Exynos 2400 series; top iPhones use Apple’s <strong>A18 / A18 Pro chip</strong>. For example, benchmarks show the Snapdragon 8 Gen 3 scoring ~7500 in Geekbench 6 (multi-core) and ~2.14 million in AnTuTu, outpacing Apple’s A17 Pro chip. The latest A18 Pro has a 6-core CPU and 16-core Neural Engine. Google’s Tensor G4 (in Pixel 9) is optimized for on-device AI but trades some raw speed.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="font-bold text-amber-400 text-sm">Benchmark Scores</div>
                <p className="text-xs text-zinc-400 mt-1">High-end phones exceed 9000+ multi-core Geekbench. Enables 4K/8K video editing and 120fps gaming.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="font-bold text-amber-400 text-sm">AI / NPU Capability</div>
                <p className="text-xs text-zinc-400 mt-1">Apple A18 features a 16-core Neural Engine. Google Tensor G4 & Snapdragon Hexagon run LLMs on-device.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="font-bold text-amber-400 text-sm">Thermal Cooling</div>
                <p className="text-xs text-zinc-400 mt-1">Vapor chambers & graphene sheets maintain top speed under heavy gaming without thermal throttling.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Display */}
          <section id="display" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">2. Display Technology</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              The display is your window to content. In 2026 nearly all high-end phones use <strong>OLED panels</strong> with high refresh rates (120–144 Hz) and HDR. Flagship displays often reach <strong>1500–2600 nits peak brightness</strong> for outdoor daylight visibility. For example, Samsung’s Galaxy S25 Ultra has a 6.9-inch QHD+ (3120×1440) Dynamic AMOLED 2X panel at 120Hz (peak 2600 nits). The iPhone 16 Pro Max uses a 6.9-inch OLED with ProMotion (adaptive 1–120Hz) up to 2000 nits.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 list-disc list-inside">
              <li><strong>Size & Resolution:</strong> Flagships (6.7"-7.2" QHD+), Midrange (6.4"-6.7" FHD+ 1080p), Budget (6.1"-6.5" FHD/HD).</li>
              <li><strong>Refresh Rate:</strong> Aim for 90-120Hz for smooth scrolling. LTPO panels adapt down to 1Hz to conserve battery.</li>
              <li><strong>HDR & Contrast:</strong> HDR10+ and Dolby Vision support on OLEDs yield true blacks and infinite contrast ratios.</li>
            </ul>
          </section>

          {/* Section 3: Camera */}
          <section id="camera" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Camera className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">3. Camera Systems & Sensor Specs</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              Cameras remain a primary selling point. Multi-lens setups handle everything from ultra-wide landscapes to telephoto zooms. Flagships use massive 1/1.3" to 1" main sensors: Galaxy S25 Ultra features a 200MP sensor, while iPhone 16 Pro Max packs a 48MP Fusion sensor with quad-pixel binning.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-2">
                <div className="font-bold text-white text-sm">Optical Zoom & Periscopes</div>
                <p className="text-xs text-zinc-400">5x periscope lenses (120mm equivalent on iPhone 16 Pro Max, dual 3x/5x on S25 Ultra) capture distant subjects without digital degradation.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-2">
                <div className="font-bold text-white text-sm">Computational Photography & AI</div>
                <p className="text-xs text-zinc-400">Apple Photonic Engine, Google Night Sight & Gemini AI, and Samsung AI engine enhance dynamic range, night portraits, and unwanted object erasure.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Battery & Charging */}
          <section id="battery" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Battery className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">4. Battery Life & Fast Charging</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              Flagship smartphones carry 4500–5000mAh batteries. Midrange powerhouses like OnePlus Nord 4 and Vivo X200 Pro boast up to 5500–6000mAh. Wired charging ranges from 25W–45W (Samsung & Apple) up to 100W on Android. Wireless charging supports Qi2 and MagSafe at 15W–25W.
            </p>
          </section>

          {/* Section 5: Software & AI */}
          <section id="software" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">5. Software, OS Updates & AI Features</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              Apple’s <strong>iOS 18</strong> brings Apple Intelligence generative tools to iPhone. Google Pixel 9 and flagship Androids run <strong>Android 15/16</strong> with built-in Gemini Live assistant. Flagships now pledge <strong>5 to 7 years of major OS upgrades and security patches</strong>, making long-term ownership far more viable.
            </p>
          </section>

          {/* Section 6: Price Tiers Table */}
          <section id="pricetiers" className="space-y-6 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">6. Smartphone Price Tiers Comparison</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/15 bg-slate-950/80 backdrop-blur-md">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 border-b border-white/10 text-amber-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Tier</th>
                    <th className="p-3.5">Typical Price</th>
                    <th className="p-3.5">Key Features & Specs</th>
                    <th className="p-3.5">Target Audience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-zinc-300">
                  <tr className="hover:bg-white/5">
                    <td className="p-3.5 font-bold text-white">Flagship</td>
                    <td className="p-3.5 font-semibold text-amber-400">₹75,000 – ₹1,50,000+</td>
                    <td className="p-3.5">Snapdragon 8 Gen 4 / A18 Pro, 120-144Hz QHD+ OLED, 50-200MP + 5x periscope, Titanium/IP68, 5-7yr updates.</td>
                    <td className="p-3.5">Power users, photographers, enthusiasts wanting zero compromise.</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-3.5 font-bold text-white">Midrange</td>
                    <td className="p-3.5 font-semibold text-amber-400">₹25,000 – ₹55,000</td>
                    <td className="p-3.5">Snapdragon 7+ Gen 3 / Exynos 1480, 120Hz FHD+ OLED, 50MP OIS, 5000-6000mAh + 67-100W charging.</td>
                    <td className="p-3.5">Best value for money. Handles gaming, everyday apps & great photos.</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="p-3.5 font-bold text-white">Budget</td>
                    <td className="p-3.5 font-semibold text-amber-400">Under ₹20,000</td>
                    <td className="p-3.5">MediaTek Dimensity / Snapdragon 6 series, 90-120Hz LCD/OLED, 50MP camera, 5000mAh battery.</td>
                    <td className="p-3.5">First-time smartphone buyers, students, or basic everyday tasks.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Top 8 Recommended Phones */}
          <section id="recommendations" className="space-y-6 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">7. Top 8 Recommended Phones (2024–2026)</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-slate-900/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">iPhone 16 Pro Max</span>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs text-amber-300 font-bold">Flagship Winner</span>
                </div>
                <p className="text-xs text-zinc-300">A18 Pro chip, 48MP Fusion camera + 5x telephoto, titanium frame, 120Hz ProMotion display, Apple Intelligence.</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-amber-400 font-bold">{inr(144900)}</span>
                  <Link to="/mobiles" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">View in Store <ArrowRight className="h-3 w-3"/></Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-slate-900/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">Samsung Galaxy S25 Ultra</span>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs text-amber-300 font-bold">Camera King</span>
                </div>
                <p className="text-xs text-zinc-300">200MP camera + dual 3x/5x telephoto periscope, S-Pen included, 6.9" 2600 nit AMOLED, Galaxy AI suite.</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-amber-400 font-bold">{inr(129999)}</span>
                  <Link to="/mobiles" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">View in Store <ArrowRight className="h-3 w-3"/></Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-slate-900/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">Google Pixel 9 Pro</span>
                  <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs text-blue-300 font-bold">Best AI & Clean Android</span>
                </div>
                <p className="text-xs text-zinc-300">Gemini Live assistant, 7-year OS upgrades, industry-leading computational night photos, Super Res Zoom.</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-amber-400 font-bold">{inr(109999)}</span>
                  <Link to="/mobiles" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">View in Store <ArrowRight className="h-3 w-3"/></Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-slate-900/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">OnePlus Nord 4</span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-300 font-bold">Best Midrange Value</span>
                </div>
                <p className="text-xs text-zinc-300">Slim metal unibody build, 120Hz AMOLED, 5500mAh battery with 100W ultra-fast charging (0 to 100% in 28 mins).</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-amber-400 font-bold">{inr(32999)}</span>
                  <Link to="/mobiles" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">View in Store <ArrowRight className="h-3 w-3"/></Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Trade-In & Repairability */}
          <section id="tradein" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Wrench className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">8. Trade-In Values & Repairability</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              Trading in your old phone can offset 50–70% of your new device cost. iPhones retain value longest, followed by Samsung Ultra series. Factor in screen replacement costs when buying: OLED screen repairs cost ₹8,000–₹25,000, while battery swaps range from ₹1,500–₹4,500.
            </p>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-amber-300 text-sm">Want to trade in your old phone?</div>
                <p className="text-xs text-zinc-300 mt-0.5">Use our instant AI Trade-In Calculator to get your device health score and resale quote.</p>
              </div>
              <Link to="/trade-in" className="rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition whitespace-nowrap">
                Calculate Resale Value
              </Link>
            </div>
          </section>

          {/* Section 9: Buying Checklist */}
          <section id="checklist" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Check className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">9. 10-Point Smartphone Buying Checklist</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                "1. Set Your Budget (Include taxes, charger, case & screen guard)",
                "2. Pick Your Ecosystem (iOS for iMessage/FaceTime, Android for customization & Google AI)",
                "3. Rank Key Priorities (Camera vs Battery vs Gaming vs Display size)",
                "4. Check Processor & RAM (Aim for min 8GB RAM for long-term AI smoothness)",
                "5. Verify Screen Brightness & Refresh (120Hz OLED, 1500+ nits peak for outdoor view)",
                "6. Check Camera Optical Stabilization (OIS main sensor & min 3x/5x telephoto)",
                "7. Confirm Carrier 5G Bands (Ensure Sub-6GHz and VoLTE support)",
                "8. Inspect Charging Speed (30W-100W fast wired charging)",
                "9. Check Software Update Guarantee (Look for 4 to 7 years OS pledges)",
                "10. Buy from Authorized Retailers (Online Mobiles offers written shop warranty)",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-slate-900/60 p-3.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 10: Buying Timeline */}
          <section id="timeline" className="space-y-4 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <Calendar className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">10. 6–12 Month Purchase Timeline</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="border-l-2 border-amber-400 pl-3 space-y-1">
                  <div className="font-bold text-amber-400">Current (Mid 2026)</div>
                  <p className="text-zinc-400">S25 Ultra, iPhone 16 Pro & Pixel 9 are mature and getting discounts. Best time for trade-ins.</p>
                </div>
                <div className="border-l-2 border-blue-400 pl-3 space-y-1">
                  <div className="font-bold text-blue-400">Fall 2026</div>
                  <p className="text-zinc-400">Apple expected to announce iPhone 17 series in Sept/Oct. Pixel 10 launch around Aug 2026.</p>
                </div>
                <div className="border-l-2 border-emerald-400 pl-3 space-y-1">
                  <div className="font-bold text-emerald-400">Early 2027</div>
                  <p className="text-zinc-400">Samsung Galaxy S26 Ultra expected in Jan 2027. Holiday deals run through Nov-Dec.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 11: FAQ Accordion */}
          <section id="faq" className="space-y-6 scroll-mt-24 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions (FAQ)</h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "What should I look for first when buying a new phone?",
                  a: "Determine your top priority: camera, battery life, performance, or budget. Check specs like processor, RAM, optical image stabilization, and display refresh rate before deciding.",
                },
                {
                  q: "Is it worth buying a flagship phone or can a midrange phone suffice?",
                  a: "Midrange phones (₹25,000–₹45,000) now deliver 85% of flagship features including 120Hz OLEDs, 5000mAh batteries, and great cameras. Flagships are worth it if you need 5x optical zoom, 8K recording, or maximum AI performance.",
                },
                {
                  q: "How important are camera megapixels?",
                  a: "Sensor size and image processing software matter far more than sheer megapixel count. A 50MP sensor with OIS and large light pixels routinely outperforms an unoptimized 108MP sensor.",
                },
                {
                  q: "How long will new phones receive software updates?",
                  a: "Flagships from Google, Samsung, and Apple now offer 5 to 7 years of major OS and security updates. Midrange models typically offer 3 to 4 years.",
                },
                {
                  q: "What is the trade-in process at Online Mobiles?",
                  a: "You can use our online Trade-In Calculator for an instant evaluation quote, bring or send your old device, and receive instant credit towards your new phone or cash payout.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/80 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-white hover:text-amber-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-amber-400 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 border-t border-white/5 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 rounded-3xl border border-white/15 bg-slate-900/90 p-8 text-center space-y-6 backdrop-blur-xl">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Ready to Find Your Next Smartphone?</h3>
          <p className="text-sm text-zinc-300 max-w-2xl mx-auto">
            Explore our curated catalog of brand new flagship phones, certified pre-owned devices, or let our AI Phone Finder recommend the exact match for your needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/mobiles"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg"
            >
              Explore Mobiles <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/phone-finder"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-800 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              <Sparkles className="h-4 w-4 text-amber-400" /> AI Phone Finder
            </Link>
            <Link
              to="/trade-in"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-800 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              Trade-In Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
