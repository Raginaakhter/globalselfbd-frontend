import type { SiteData } from "@/lib/site-types";
import type { Product } from "@/lib/catalog";
import type { OrderData, OrderSummaryData } from "@/lib/order-types";

// Master Mock Store Data for 100% Backend-Free Operation

export const MOCK_SITE_DATA: SiteData = {
  settings: {
    siteName: "Global Shelf BD",
    tagline: "Your Trusted Global E-Commerce Store in Bangladesh",
    email: "support@globalshelfbd.com",
    phone: "+880 1712-345678",
    whatsapp: "8801712345678",
    address: "House 42, Road 11, Banani, Dhaka-1213, Bangladesh",
    socials: [
      { label: "Facebook", url: "https://facebook.com" },
      { label: "Instagram", url: "https://instagram.com" },
      { label: "WhatsApp", url: "https://wa.me/8801712345678" },
    ],
    topBarText: "🎉 Free Shipping inside Dhaka on orders over ৳2,500! 100% Authentic Imported Products.",
    complaintTitle: "Customer Care & Complaints",
    complaintNote: "For any issue or complaint, call or WhatsApp us at +880 1712-345678 or email support@globalshelfbd.com",
    freeShippingThreshold: 2500,
    shippingInsideDhaka: 80,
    shippingOutsideDhaka: 130,
  },
  categories: [
    { slug: "vitamins", name: "Vitamins & Supplements", bn: "ভিটামিন ও সাপ্লিমেন্ট", emoji: "💊", tint: "bg-amber-50 text-amber-700" },
    { slug: "skincare", name: "Skincare & Beauty", bn: "স্কিন কেয়ার ও বিউটি", emoji: "✨", tint: "bg-rose-50 text-rose-700" },
    { slug: "baby-care", name: "Baby & Child", bn: "বেবি ও চাইল্ড কেয়ার", emoji: "👶", tint: "bg-sky-50 text-sky-700" },
    { slug: "grocery", name: "Grocery & Foods", bn: "গ্রোসারি ও ফুড", emoji: "🛒", tint: "bg-emerald-50 text-emerald-700" },
    { slug: "personal-care", name: "Personal Care", bn: "পার্সোনাল কেয়ার", emoji: "🧴", tint: "bg-purple-50 text-purple-700" },
    { slug: "organic", name: "Organic & Healthy", bn: "অর্গানিক ও অর্গানিক ফুড", emoji: "🌿", tint: "bg-green-50 text-green-700" },
  ],
  heroSlides: [
    {
      eyebrow: "100% AUTHENTIC IMPORTED PRODUCTS",
      title: "Global Bestsellers, Delivered to Your Door",
      bn: "ইউকে ও ইউএসএ থেকে সংগৃহীত অরিজিনাল পণ্য সরাসরি আপনার ঠিকানায়",
      body: "Discover authentic UK & US imported skincare, health supplements, baby foods, and gourmet groceries at genuine prices.",
      cta: "Shop All Products",
      href: "/shop",
      gradient: "from-navy-900 via-brand-900 to-navy-800",
      emojis: ["💊", "✨", "👶", "🌿"],
      image: "/banners/hero-global-bestsellers.jpg",
    },
    {
      eyebrow: "EXCLUSIVE DISCOUNT",
      title: "Daily Skincare & Essentials Collection",
      bn: "সেরা সব ব্র্যান্ডের স্কিন কেয়ার প্রোডাক্টসের ওপর আকর্ষণীয় ছাড়",
      body: "Gentle cleansers, hydrating serums & sunscreens from CeraVe, The Ordinary, and La Roche-Posay.",
      cta: "Explore Skincare",
      href: "/shop?category=skincare",
      gradient: "from-rose-900 via-brand-800 to-navy-900",
      emojis: ["✨", "🧴", "💧"],
    },
    {
      eyebrow: "BABY & CHILD CARE",
      title: "Pure Care for Your Little Ones",
      bn: "আপনার সোনামণির জন্য সম্পূর্ণ নিরাপদ ও প্রিমিয়াম ফুড ও কেয়ার প্রোডাক্টস",
      body: "Trusted imported formulas, baby cereals, organic snacks, and gentle bath products.",
      cta: "Shop Baby Essentials",
      href: "/shop?category=baby-care",
      gradient: "from-sky-900 via-blue-900 to-navy-900",
      emojis: ["👶", "🍼", "🧸"],
    },
  ],
  sideBanners: [
    {
      title: "Multivitamins Deal",
      body: "Up to 25% off UK imported daily vitamins & calcium supplements",
      emoji: "💊",
      gradient: "bg-amber-50 border-amber-200 text-amber-900",
      text: "Shop Vitamins",
      href: "/shop?category=vitamins",
    },
    {
      title: "Hydration Special",
      body: "Hyaluronic Acid & Vitamin C serums for glowing skin",
      emoji: "✨",
      gradient: "bg-rose-50 border-rose-200 text-rose-900",
      text: "Shop Glow",
      href: "/shop?category=skincare",
    },
  ],
  trustBadges: [
    { title: "100% Authentic", body: "Directly imported from UK & USA official sources", emoji: "🛡️" },
    { title: "Fast Delivery", body: "1–2 days inside Dhaka, 2–4 days nationwide", emoji: "🚀" },
    { title: "Cash on Delivery", body: "Pay conveniently upon receiving your order", emoji: "💵" },
    { title: "Easy Returns", body: "7-day hassle free replacement guarantee", emoji: "🔄" },
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ],
  footerColumns: [
    {
      title: "Categories",
      links: [
        { label: "Vitamins & Supplements", href: "/shop?category=vitamins" },
        { label: "Skincare & Beauty", href: "/shop?category=skincare" },
        { label: "Baby & Child Care", href: "/shop?category=baby-care" },
        { label: "Grocery & Foods", href: "/shop?category=grocery" },
        { label: "Personal Care", href: "/shop?category=personal-care" },
      ],
    },
    {
      title: "Customer Support",
      links: [
        { label: "Track Your Order", href: "/track-order" },
        { label: "Contact Us", href: "/contact" },
        { label: "About Us", href: "/about" },
        { label: "Shipping Policy", href: "/shipping-policy" },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Refund & Return Policy", href: "/refund-policy" },
      ],
    },
  ],
  promoBanner: {
    badge: "SUPER SAVINGS WEEK",
    title: "Imported Authentic Healthcare & Beauty Essentials",
    highlight: "GET EXTRA 15% OFF",
    body: "Use coupon code GLOBAL15 at checkout or order directly with cash on delivery.",
    bn: "প্রিমিয়াম অরিজিনাল প্রোডাক্টের ওপর বিশেষ ছাড়",
    cta: "Shop Collection Now",
    href: "/shop?sort=discount",
  },
  brands: ["Centrum", "CeraVe", "The Ordinary", "Aptamil", "Nestle", "Neutrogena", "Nivea", "Olay", "Seven Seas"],
  stats: [
    { value: "15,000+", label: "Delivered Orders" },
    { value: "100%", label: "Authentic Products" },
    { value: "4.9 ★", label: "Customer Rating" },
    { value: "24/7", label: "WhatsApp Support" },
  ],
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Centrum Multivitamin Adults (100 Tablets)",
    brand: "Centrum",
    category: "vitamins",
    size: "100 Tablets",
    price: 2450,
    rrp: 2950,
    emoji: "💊",
    tint: "bg-amber-100/60 text-amber-800",
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 142,
    stock: 45,
    description: "Centrum Multivitamin for Adults provides key essential micronutrients to support energy, immunity, metabolism, and overall well-being. Directly imported from UK.",
    highlights: ["Complete A to Z Multivitamin Formula", "Supports Daily Energy & Immunity", "100% UK Imported Original Product"],
  },
  {
    id: "prod-2",
    name: "CeraVe Hydrating Facial Cleanser (236ml)",
    brand: "CeraVe",
    category: "skincare",
    size: "236 ml",
    price: 1850,
    rrp: 2200,
    emoji: "🧼",
    tint: "bg-sky-100/60 text-sky-800",
    badge: "POPULAR",
    rating: 4.8,
    reviews: 98,
    stock: 28,
    description: "Developed with dermatologists, CeraVe Hydrating Cleanser removes dirt and oil while maintaining the protective skin barrier with 3 essential ceramides and hyaluronic acid.",
    highlights: ["Non-foaming hydrating formula", "Contains 3 Essential Ceramides", "Fragrance free & non-comedogenic"],
  },
  {
    id: "prod-3",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    category: "skincare",
    size: "30 ml",
    price: 1250,
    rrp: 1550,
    emoji: "✨",
    tint: "bg-rose-100/60 text-rose-800",
    badge: "SALE",
    rating: 4.7,
    reviews: 215,
    stock: 60,
    description: "A high-strength vitamin and mineral formula that targets blemish-prone skin, reduces pore appearance, and balances visible sebum activity.",
    highlights: ["Reduces blemishes & oiliness", "Smoothes skin texture", "Original Canada / UK Import"],
  },
  {
    id: "prod-4",
    name: "Aptamil Gold+ Stage 1 Infant Formula (900g)",
    brand: "Aptamil",
    category: "baby-care",
    size: "900 g",
    price: 3650,
    rrp: 4100,
    emoji: "🍼",
    tint: "bg-blue-100/60 text-blue-800",
    badge: "IMPORT",
    rating: 4.9,
    reviews: 84,
    stock: 18,
    description: "Premium nutritionally complete milk formula designed for infants from birth up to 6 months, enriched with essential DHA and prebiotics.",
    highlights: ["Complete infant nutrition", "Supports cognitive & immune growth", "Authentic Australian / UK Import"],
  },
  {
    id: "prod-5",
    name: "Seven Seas Cod Liver Oil + Vitamin D (120 Capsules)",
    brand: "Seven Seas",
    category: "vitamins",
    size: "120 Capsules",
    price: 1950,
    rrp: 2400,
    emoji: "🐟",
    tint: "bg-emerald-100/60 text-emerald-800",
    badge: "NEW",
    rating: 4.8,
    reviews: 53,
    stock: 32,
    description: "Rich source of Omega-3 Fatty Acids (EPA & DHA) and essential Vitamins A & D to support heart, brain, vision and joint health.",
    highlights: ["High potency Omega-3 & Vitamin D", "Supports joint and heart health", "Trusted UK brand"],
  },
  {
    id: "prod-6",
    name: "Neutrogena Hydro Boost Water Gel (50g)",
    brand: "Neutrogena",
    category: "skincare",
    size: "50 g",
    price: 1650,
    rrp: 1950,
    emoji: "💧",
    tint: "bg-cyan-100/60 text-cyan-800",
    badge: "HOT",
    rating: 4.7,
    reviews: 110,
    stock: 22,
    description: "Oil-free water gel formula instantly quenches dry skin and keeps it smooth, supple and hydrated all day with Hyaluronic Acid.",
    highlights: ["Intense 72h hydration", "Lightweight gel texture", "Dermatologist tested"],
  },
  {
    id: "prod-7",
    name: "Nivea Soft Refreshingly Soft Moisturizing Cream (300ml)",
    brand: "Nivea",
    category: "personal-care",
    size: "300 ml",
    price: 950,
    rrp: 1150,
    emoji: "🧴",
    tint: "bg-indigo-100/60 text-indigo-800",
    badge: undefined,
    rating: 4.6,
    reviews: 77,
    stock: 50,
    description: "An all-purpose moisturizing cream enriched with Vitamin E and Jojoba Oil for quick absorption and silky soft skin.",
    highlights: ["Fast absorbing & non-greasy", "With Jojoba Oil & Vitamin E", "For face, body & hands"],
  },
  {
    id: "prod-8",
    name: "Organic Raw Wildflower Honey (500g)",
    brand: "Organic Choice",
    category: "organic",
    size: "500 g",
    price: 1150,
    rrp: 1400,
    emoji: "🍯",
    tint: "bg-yellow-100/60 text-yellow-800",
    badge: "100% PURE",
    rating: 4.9,
    reviews: 165,
    stock: 40,
    description: "Unfiltered, unheated pure raw honey harvested from wild blossoms. Rich in natural enzymes, antioxidants and immunity boosters.",
    highlights: ["100% Pure & Unfiltered", "Natural Immunity Booster", "No added sugar or chemicals"],
  },
  {
    id: "prod-9",
    name: "Olay Regenerist Micro-Sculpting Cream (50g)",
    brand: "Olay",
    category: "skincare",
    size: "50 g",
    price: 2850,
    rrp: 3400,
    emoji: "👑",
    tint: "bg-rose-100/60 text-rose-800",
    badge: "TOP RATED",
    rating: 4.9,
    reviews: 92,
    stock: 15,
    description: "Advanced anti-aging face moisturizer formulated with Amino-Peptides and Niacinamide to firm skin and visibly reduce fine lines.",
    highlights: ["Advanced anti-aging formula", "Noticeably firmer skin in 4 weeks", "USA Original Import"],
  },
  {
    id: "prod-10",
    name: "Nestle Cerelac Wheat & Mixed Fruits (400g)",
    brand: "Nestle",
    category: "baby-care",
    size: "400 g",
    price: 780,
    rrp: 900,
    emoji: "🥣",
    tint: "bg-amber-100/60 text-amber-800",
    badge: undefined,
    rating: 4.8,
    reviews: 64,
    stock: 75,
    description: "Nutritious infant cereal with milk powder, wheat flour and mixed fruit puree, packed with Iron, Zinc, Vitamin A & C.",
    highlights: ["Rich in Iron & Bifidus BL", "Easy to digest complementary food", "For babies 8+ months"],
  },
  {
    id: "prod-11",
    name: "Nature's Bounty Hair, Skin & Nails Gummies (80 Gummies)",
    brand: "Nature's Bounty",
    category: "vitamins",
    size: "80 Gummies",
    price: 2150,
    rrp: 2600,
    emoji: "🍓",
    tint: "bg-red-100/60 text-red-800",
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 180,
    stock: 35,
    description: "Delicious strawberry flavored gummies packed with Biotin, Vitamin C and Vitamin E to support glowing skin, shiny hair, and strong nails.",
    highlights: ["2,500 mcg Biotin per serving", "Supports healthy hair & nails", "Delicious strawberry flavor"],
  },
  {
    id: "prod-12",
    name: "Dettol Anti-Bacterial Body Wash Fresh (500ml)",
    brand: "Dettol",
    category: "personal-care",
    size: "500 ml",
    price: 650,
    rrp: 800,
    emoji: "🚿",
    tint: "bg-green-100/60 text-green-800",
    badge: undefined,
    rating: 4.7,
    reviews: 89,
    stock: 90,
    description: "Provides trusted Dettol 100% better germ protection with refreshing citrus fragrance that leaves skin healthy and energized.",
    highlights: ["100% better germ protection", "pH balanced formula", "Long lasting freshness"],
  },
  {
    id: "prod-13",
    name: "COSRX Advanced Snail 96 Mucin Power Essence (100ml)",
    brand: "COSRX",
    category: "skincare",
    size: "100 ml",
    price: 1550,
    rrp: 1850,
    emoji: "🐌",
    tint: "bg-amber-100/60 text-amber-800",
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 310,
    stock: 55,
    description: "Lightweight essence that absorbs quickly to give skin a natural glow from the inside. Formulated with 96.3% Snail Secretion Filtrate.",
    highlights: ["Fades dark spots & repairs skin", "96.3% Snail Mucin filtrate", "Authentic Korea import"],
  },
  {
    id: "prod-14",
    name: "Vitabiotics Osteocare Original Calcium (30 Tablets)",
    brand: "Vitabiotics",
    category: "vitamins",
    size: "30 Tablets",
    price: 1150,
    rrp: 1400,
    emoji: "🦴",
    tint: "bg-blue-100/60 text-blue-800",
    badge: "UK IMPORT",
    rating: 4.8,
    reviews: 78,
    stock: 40,
    description: "UK's No.1 bone health formula providing calcium, magnesium, vitamin D3 and zinc to maintain strong bones and teeth.",
    highlights: ["UK No.1 Calcium supplement", "Supports strong bones & teeth", "With Vitamin D3 & Magnesium"],
  },
  {
    id: "prod-15",
    name: "Aveeno Baby Daily Moisture Lotion (227g)",
    brand: "Aveeno",
    category: "baby-care",
    size: "227 g",
    price: 1450,
    rrp: 1750,
    emoji: "🧴",
    tint: "bg-emerald-100/60 text-emerald-800",
    badge: "GENTLE",
    rating: 4.9,
    reviews: 145,
    stock: 25,
    description: "Nourishes and moisturizes baby's delicate skin for a full 24 hours with natural Oatmeal formula. Pediatrician recommended.",
    highlights: ["Natural colloidal oatmeal formula", "Fragrance-free & hypoallergenic", "24 hour moisture protection"],
  },
  {
    id: "prod-16",
    name: "L'Oreal Paris Elvive Extraordinary Oil (100ml)",
    brand: "L'Oreal",
    category: "personal-care",
    size: "100 ml",
    price: 1350,
    rrp: 1650,
    emoji: "✨",
    tint: "bg-yellow-100/60 text-yellow-800",
    badge: undefined,
    rating: 4.7,
    reviews: 112,
    stock: 30,
    description: "Luxurious hair treatment serum infused with 6 precious flower oils. Leaves hair feeling soft, shiny, and weightless.",
    highlights: ["Infused with 6 flower oils", "Tames frizz and adds brilliant shine", "Non-greasy hair serum"],
  },
  {
    id: "prod-17",
    name: "Kirkland Signature Vitamin C 1000mg (500 Tablets)",
    brand: "Kirkland",
    category: "vitamins",
    size: "500 Tablets",
    price: 3450,
    rrp: 4200,
    emoji: "🍊",
    tint: "bg-orange-100/60 text-orange-800",
    badge: "MEGA PACK",
    rating: 4.9,
    reviews: 260,
    stock: 20,
    description: "High potency Vitamin C with Rose Hips to support immune system function and antioxidant activity. Authentic USA import.",
    highlights: ["1000mg High Potency Vitamin C", "500 Tablets mega value pack", "USA Kirkland Signature import"],
  },
  {
    id: "prod-18",
    name: "La Roche-Posay Anthelios UVMune 400 SPF50+ (50ml)",
    brand: "La Roche-Posay",
    category: "skincare",
    size: "50 ml",
    price: 2650,
    rrp: 3100,
    emoji: "☀️",
    tint: "bg-sky-100/60 text-sky-800",
    badge: "DERMA CHOICE",
    rating: 4.9,
    reviews: 195,
    stock: 16,
    description: "Ultimate sun protection against ultra-long UVA rays. Lightweight fluid texture, invisible finish, non-greasy and water resistant.",
    highlights: ["Mexoryl 400 filter against ultra-long UVA", "SPF 50+ Broad Spectrum", "Dermatologist recommended sunscreen"],
  },
  {
    id: "prod-19",
    name: "Organic Extra Virgin Cold Pressed Coconut Oil (500ml)",
    brand: "Organic Choice",
    category: "organic",
    size: "500 ml",
    price: 890,
    rrp: 1100,
    emoji: "🥥",
    tint: "bg-teal-100/60 text-teal-800",
    badge: "100% ORGANIC",
    rating: 4.8,
    reviews: 104,
    stock: 50,
    description: "100% Pure cold pressed unrefined virgin coconut oil. Ideal for cooking, skin moisturizing and deep hair conditioning.",
    highlights: ["Raw cold-pressed extraction", "Multipurpose: cooking, hair & skin", "No preservatives or chemicals"],
  },
  {
    id: "prod-20",
    name: "Gerber Organic Puffs Banana Grain Snack (42g)",
    brand: "Gerber",
    category: "baby-care",
    size: "42 g",
    price: 680,
    rrp: 820,
    emoji: "🍌",
    tint: "bg-amber-100/60 text-amber-800",
    badge: "BABY FAVORITE",
    rating: 4.8,
    reviews: 88,
    stock: 65,
    description: "Melt-in-your-mouth organic puffed grain snacks baked with real banana. Perfect for crawling babies learning to self-feed.",
    highlights: ["USDA Organic Certified", "Melts quickly in baby's mouth", "Non-GMO & zero artificial flavors"],
  },
];

// Initial mock orders in memory
let MOCK_ORDERS_STORE: OrderData[] = [
  {
    id: "GS-982145",
    status: "confirmed",
    customerName: "Tanvir Hasan",
    customerPhone: "01712345678",
    customerEmail: "user@globalshelfbd.com",
    address: "House 12, Road 5, Dhanmondi",
    area: "Dhanmondi, Dhaka",
    zone: "dhaka",
    note: "Please call before arrival",
    payment: "cod",
    subtotal: 4300,
    shipping: 80,
    total: 4380,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    statusHistory: [
      { status: "pending", note: "Order placed", createdAt: new Date(Date.now() - 86400000).toISOString() },
      { status: "confirmed", note: "Order confirmed", createdAt: new Date(Date.now() - 80000000).toISOString() },
    ],
    items: [
      { id: "prod-1", name: "Centrum Multivitamin Adults (100 Tablets)", emoji: "💊", size: "100 Tablets", price: 2450, qty: 1, lineTotal: 2450 },
      { id: "prod-2", name: "CeraVe Hydrating Facial Cleanser (236ml)", emoji: "🧼", size: "236 ml", price: 1850, qty: 1, lineTotal: 1850 },
    ],
  },
  {
    id: "GS-663190",
    status: "delivered",
    customerName: "Sharmin Sultana",
    customerPhone: "01898765432",
    customerEmail: "sharmin@example.com",
    address: "Flat 4B, Sector 3, Uttara",
    area: "Uttara, Dhaka",
    zone: "dhaka",
    note: "",
    payment: "cod",
    subtotal: 3650,
    shipping: 0,
    total: 3650,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    statusHistory: [
      { status: "pending", note: "Order placed", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
      { status: "confirmed", note: "Order confirmed", createdAt: new Date(Date.now() - 2.5 * 86400000).toISOString() },
      { status: "delivered", note: "Delivered to customer", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    ],
    items: [
      { id: "prod-4", name: "Aptamil Gold+ Stage 1 Infant Formula (900g)", emoji: "🍼", size: "900 g", price: 3650, qty: 1, lineTotal: 3650 },
    ],
  },
];

// In-Memory User session state for backend-free auth
let CURRENT_USER: {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  provider: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
} | null = null;

let WISHLIST_IDS = new Set<string>(["prod-1", "prod-3"]);

export function getMockSiteData(): SiteData {
  return MOCK_SITE_DATA;
}

export function getMockProducts(params?: { q?: string; category?: string; sort?: string; limit?: number }) {
  let list = [...MOCK_PRODUCTS];

  if (params?.category) {
    list = list.filter((p) => p.category === params.category);
  }

  if (params?.q) {
    const query = params.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  if (params?.sort) {
    switch (params.sort) {
      case "discount":
        list.sort((a, b) => {
          const discA = a.rrp ? a.rrp - a.price : 0;
          const discB = b.rrp ? b.rrp - b.price : 0;
          return discB - discA;
        });
        break;
      case "new":
        list.reverse();
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popular":
      default:
        list.sort((a, b) => b.reviews - a.reviews);
        break;
    }
  }

  const total = list.length;
  if (params?.limit) {
    list = list.slice(0, params.limit);
  }

  return { products: list, total };
}

export function getMockFeaturedProducts() {
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.badge === "BEST SELLER" || p.rating >= 4.8).slice(0, 8);
  const topDeals = MOCK_PRODUCTS.filter((p) => p.rrp && p.rrp > p.price).slice(0, 8);
  const newArrivals = MOCK_PRODUCTS.slice(8, 16);
  return { bestSellers, topDeals, newArrivals };
}

export function getMockProductById(id: string) {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!product) return null;

  const related = MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  return { product, related };
}

export function calculateMockCart(items: { id: string; qty: number }[], zone: "dhaka" | "outside" = "dhaka") {
  const lines = items
    .map((it) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === it.id);
      if (!product) return null;
      const qty = Math.min(Math.max(it.qty, 1), 10);
      const lineTotal = product.price * qty;
      return {
        product: {
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          size: product.size,
          price: product.price,
          rrp: product.rrp,
          emoji: product.emoji,
          tint: product.tint,
          image: product.image,
          badge: product.badge,
          rating: product.rating,
          reviews: product.reviews,
          stock: product.stock,
        },
        qty,
        lineTotal,
      };
    })
    .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];

  const subtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);
  const threshold = MOCK_SITE_DATA.settings.freeShippingThreshold;
  const rawShipping = zone === "outside" ? MOCK_SITE_DATA.settings.shippingOutsideDhaka : MOCK_SITE_DATA.settings.shippingInsideDhaka;
  const shipping = subtotal >= threshold ? 0 : rawShipping;
  const total = subtotal + shipping;

  return { lines, subtotal, shipping, total };
}

export function createMockOrder(payload: {
  items: { id: string; qty: number }[];
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    area: string;
    zone: "dhaka" | "outside";
    note?: string;
  };
}) {
  const { lines, subtotal, shipping, total } = calculateMockCart(payload.items, payload.customer.zone);
  const orderId = `GS-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toISOString();

  const order: OrderData = {
    id: orderId,
    status: "confirmed",
    customerName: payload.customer.name,
    customerPhone: payload.customer.phone,
    customerEmail: payload.customer.email.toLowerCase(),
    address: payload.customer.address,
    area: payload.customer.area,
    zone: payload.customer.zone,
    note: payload.customer.note ?? "",
    payment: "cod",
    subtotal,
    shipping,
    total,
    createdAt: now,
    updatedAt: now,
    statusHistory: [
      { status: "pending", note: "Order placed by customer", createdAt: now },
      { status: "confirmed", note: "Order confirmed automatically via Cash on Delivery", createdAt: now },
    ],
    items: lines.map((l) => ({
      id: l.product.id,
      name: l.product.name,
      emoji: l.product.emoji,
      size: l.product.size,
      price: l.product.price,
      qty: l.qty,
      lineTotal: l.lineTotal,
    })),
  };

  MOCK_ORDERS_STORE.unshift(order);
  return order;
}

export function getMockOrderById(id: string, email?: string) {
  const found = MOCK_ORDERS_STORE.find((o) => o.id === id);
  if (!found) return null;
  if (email && found.customerEmail.toLowerCase() !== email.toLowerCase()) {
    return null;
  }
  return found;
}

export function getMockOrdersForUser(email?: string) {
  if (!email) return MOCK_ORDERS_STORE.slice(0, 5).map(orderToSummary);
  const userOrders = MOCK_ORDERS_STORE.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
  return userOrders.map(orderToSummary);
}

function orderToSummary(o: OrderData): OrderSummaryData {
  return {
    id: o.id,
    status: o.status,
    customerName: o.customerName,
    customerEmail: o.customerEmail,
    total: o.total,
    createdAt: o.createdAt,
    firstItemName: o.items[0]?.name ?? "Product",
    firstItemEmoji: o.items[0]?.emoji ?? "📦",
    itemCount: o.items.length,
  };
}

export function handleMockLogin(email: string) {
  const isEmailAdmin = email.toLowerCase().includes("admin");
  CURRENT_USER = {
    id: "usr-" + Date.now(),
    name: isEmailAdmin ? "Admin User" : email.split("@")[0],
    email: email.toLowerCase(),
    provider: "local",
    role: isEmailAdmin ? "admin" : "user",
    emailVerified: true,
    createdAt: new Date().toISOString(),
  };
  return { user: CURRENT_USER, accessToken: "mock-jwt-access-token" };
}

export function getMockCurrentUser() {
  return CURRENT_USER;
}

export function updateMockUserProfile(name?: string, avatar?: string) {
  if (CURRENT_USER) {
    if (name) CURRENT_USER.name = name;
    if (avatar !== undefined) CURRENT_USER.avatar = avatar;
  }
  return CURRENT_USER;
}

export function getMockWishlist() {
  const products = MOCK_PRODUCTS.filter((p) => WISHLIST_IDS.has(p.id));
  return { productIds: Array.from(WISHLIST_IDS), products };
}

export function toggleMockWishlist(productId: string) {
  const exists = WISHLIST_IDS.has(productId);
  if (exists) {
    WISHLIST_IDS.delete(productId);
  } else {
    WISHLIST_IDS.add(productId);
  }
  return { wishlisted: !exists, productIds: Array.from(WISHLIST_IDS) };
}
