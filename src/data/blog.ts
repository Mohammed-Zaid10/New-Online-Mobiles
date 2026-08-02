export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  summary: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ultimate-smartphone-buying-guide-2026",
    title: "The Ultimate Smartphone Buying Guide (2026): How to Choose the Perfect Phone for Your Needs",
    subtitle: "Everything you need to know about performance, display, camera sensors, battery life, AI features, and price tiers before making your next purchase.",
    metaTitle: "Ultimate 2026 Smartphone Buying Guide | Online Mobiles",
    metaDescription: "Discover how to choose the perfect smartphone in 2026. Our comprehensive guide covers performance, camera, battery, software, build, connectivity, price tiers, and more. Find the best phones at Online Mobiles.",
    keywords: [
      "smartphone buying guide 2026",
      "best phones 2026",
      "Android vs iPhone",
      "flagship vs budget phones",
      "how to choose smartphone",
      "performance specs",
      "camera features",
      "battery life",
      "trade-in values",
      "mobile repair",
      "Online Mobiles"
    ],
    category: "Buying Guides",
    author: {
      name: "Online Mobiles Tech Team",
      role: "Smartphone Specialists & Hardware Analysts",
      avatar: "/logo.png",
    },
    publishedAt: "August 2026",
    readTime: "12 min read",
    coverImage: "/blog-buying-guide-2026.jpg",
    featured: true,
    summary: "In 2026 the smartphone market offers a dizzying array of choices. Flagship phones now pack cutting-edge chips (Apple A18/A19 Bionic, Snapdragon 8 Gen 4, Tensor G5), 120-144Hz OLED displays up to 2600 nits, multi-camera 200MP arrays, and on-device AI. This comprehensive guide breaks down performance, cameras, battery, software, trade-ins, and a 6-12 month buying timeline.",
  },
  {
    id: "2",
    slug: "iphone-vs-android-2026-comparison",
    title: "iOS 18 vs Android 15: Which Ecosystem Wins in 2026?",
    subtitle: "A deep dive into software longevity, Apple Intelligence vs Google Gemini, customizability, hardware flexibility, and total cost of ownership.",
    metaTitle: "iOS 18 vs Android 15 Ecosystem Guide | Online Mobiles",
    metaDescription: "Comparing iOS 18 and Android 15 in 2026. Compare AI capabilities, software support longevity, app ecosystems, and device selection.",
    keywords: ["iOS vs Android 2026", "Apple Intelligence vs Gemini", "iPhone vs Samsung"],
    category: "Ecosystems",
    author: {
      name: "Online Mobiles Tech Team",
      role: "Software & Mobile OS Specialist",
      avatar: "/logo.png",
    },
    publishedAt: "July 2026",
    readTime: "8 min read",
    coverImage: "/blog-ios-vs-android.jpg",
    summary: "Choosing between iOS and Android in 2026 comes down to ecosystem lock-in, AI integrations (Apple Intelligence vs Gemini Live), update promises, and resale value retention.",
  },
  {
    id: "3",
    slug: "how-to-maximize-trade-in-value",
    title: "5 Secrets to Getting Maximum Cash for Your Old Phone",
    subtitle: "Learn how battery health maintenance, screen care, original accessories, and timing your trade-in can boost your device resale value by up to 35%.",
    metaTitle: "Maximize Your Phone Trade-In Value | Online Mobiles",
    metaDescription: "Tips to get the highest resale and trade-in value for your used iPhone, Samsung, or OnePlus smartphone.",
    keywords: ["phone trade-in tips", "maximize resale value", "used phone value"],
    category: "Trade-In & Savings",
    author: {
      name: "Online Mobiles Tech Team",
      role: "Trade-In & Evaluation Manager",
      avatar: "/logo.png",
    },
    publishedAt: "July 2026",
    readTime: "6 min read",
    coverImage: "/blog-trade-in-secrets.jpg",
    summary: "Trading in your phone is the smartest way to upgrade. Learn how physical care, timing right before new launches, and keeping original accessories can net you hundreds more.",
  },
];
