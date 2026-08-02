import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Calendar, Clock, Search, Sparkles, Tag, User } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog";
import { PageHeader } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SHOP } from "@/lib/shop";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Blog & Smartphone Guides — ${SHOP.name}` },
      { name: "description", content: "Expert smartphone buying guides, ecosystem comparisons, trade-in tips, repair advice and technical deep-dives." },
      { property: "og:title", content: `Blog & Smartphone Guides — ${SHOP.name}` },
      { property: "og:url", content: `${SHOP.siteUrl}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SHOP.siteUrl}/blog` }],
  }),
  component: BlogIndex,
});

const CATEGORIES = ["All", "Buying Guides", "Ecosystems", "Trade-In & Savings"];

function BlogIndex() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      post.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed pb-20 text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(8,8,8,0.25), rgba(8,8,8,0.45)), url('/backgrounds/blog-bg.png')",
      }}
    >
      <PageHeader
        eyebrow="Online Mobiles Knowledge Hub"
        title="Tech Insights & Buying Guides"
        subtitle="Expert analysis, comprehensive smartphone guides, trade-in strategies, and technical breakdowns."
      />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Breadcrumbs items={[{ label: "Blog & Guides" }]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-12">
        {/* Featured Hero Article */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950/80 shadow-2xl backdrop-blur-xl transition hover:border-amber-500/40">
          <div className="grid lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Featured Guide 2026
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-zinc-400" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="hover:text-amber-400 transition">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                {featuredPost.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="h-9 w-9 rounded-full object-contain bg-black shadow-md" />
                  <div>
                    <div className="text-xs font-semibold text-white">{featuredPost.author.name}</div>
                    <div className="text-[11px] text-zinc-400">{featuredPost.publishedAt}</div>
                  </div>
                </div>

                <Link
                  to="/blog/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition"
                >
                  Read Full Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-black">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-transparent" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search guides & specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-slate-950/80 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-lg transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 border border-white/20 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition leading-snug">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 line-clamp-3 text-xs text-zinc-400 leading-relaxed font-sans">
                  {post.summary}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="h-6 w-6 rounded-full object-contain bg-black" />
                    <span className="text-[11px] font-medium text-zinc-300">{post.author.name}</span>
                  </div>

                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
