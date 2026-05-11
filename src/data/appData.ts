import type {
  FAQItem,
  HeroBenefitCard,
  PricingPlan,
  TestimonialPost,
  TradingPartner,
  WinSlide,
} from "../types";

export const sectionIds = [
  "#overview",
  "#curriculum",
  "#community-wins",
  "#testimonials",
  "#pricing",
];

export const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Community Wins", href: "#community-wins" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export const faqs: FAQItem[] = [
  {
    question: "Is this suitable for beginners?",
    answer:
      "Yes. The lessons start with foundations and then move into practical chart reading, setups, and risk management.",
  },
  {
    question: "How is access shared after payment?",
    answer:
      "After you submit payment proof, our team manually verifies the details and shares access through your WhatsApp contact.",
  },
  {
    question: "Do you provide trade signals?",
    answer:
      "The community includes setup based trade callouts and market updates, but every learner is encouraged to understand risk before taking any trade.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can contact support on WhatsApp if you want to upgrade your plan after joining.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can contact support on WhatsApp if you want to upgrade your plan after joining.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can contact support on WhatsApp if you want to upgrade your plan after joining.",
  },
  {
    question: "Which markets are covered in the courses?",
    answer:
      "The plans cover markets such as Pakistan Stocks, Forex Trading, US Stocks, and VSA depending on the membership you select.",
  },
  {
    question: "Is community access included?",
    answer:
      "Yes. Each plan includes private Discord community access for the duration listed on the selected membership plan.",
  },
  {
    question: "Are live sessions included?",
    answer:
      "Yes. Members get weekly live sessions where market context, trade ideas, and learning topics are discussed.",
  },
  {
    question: "What payment methods can I use?",
    answer:
      "You can pay through Bank Transfer, JazzCash, Easypaisa, or Binance, then upload your payment screenshot on checkout.",
  },
];

export const heroBenefitCards: HeroBenefitCard[] = [
  {
    title: "Trading Community on Discord",
    text: "Join a vibrant community of like-minded traders where you can share strategies, get support, and learn in a collaborative environment.",
    highlight: false,
  },
  {
    title: "Real-time Trade Callouts",
    text: "Receive instant trade alerts and actionable insights during live market hours, helping you stay on top of every opportunity.",
    highlight: true,
  },
  {
    title: "Live Market Analysis & Session",
    text: "Participate in live market analysis sessions where we break down charts, trends, and setups in real-time for practical learning.",
    highlight: false,
  },
  {
    title: "Repeatable System - Setup",
    text: "Learn a fixed, repeatable trading system that you can apply daily, providing consistency and confidence in your trading decisions.",
    highlight: false,
  },
];

export const proofTabs = [
  {
    label: "My Trading System & Setup",
    videoTitle: "My Trading System & Setup",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Trading Community Overview",
    videoTitle: "Trading Community Overview",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Live Trade Analysis & Trading",
    videoTitle: "Live Trade Analysis & Trading",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "Real Trade Recap Analysis",
    videoTitle: "Real Trade Recap Analysis",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
  },
];

export const tradingPartners: TradingPartner[] = [
  {
    name: "Exness",
    mark: "EX",
    logo: "/logos/exness-logo.png",
    description: "Global multi-asset broker for active traders.",
  },
  {
    name: "IC Market",
    mark: "IC",
    logo: "/logos/ic-market.png",
    description: "Forex, indices, commodities, and CFD market access.",
  },
  {
    name: "Ripster",
    mark: "RP",
    logo: "/logos/Ripster-logo.jpg",
    description: "Market education, trend tools, and trading insights.",
  },
  {
    name: "PMEX",
    mark: "PX",
    logo: "/logos/pmex-logo.svg",
    description: "Pakistan Mercantile Exchange market access.",
  },
  {
    name: "Munir Khanani",
    mark: "MK",
    logo: "/logos/logo_munirkhanani.png",
    description: "Pakistan market brokerage and trading services.",
  },
  {
    name: "Market Watch",
    mark: "MW",
    logo: "/logos/market-watch.png",
    description: "Financial news, data, and market insights.",
  },
  {
    name: "Tenet Group",
    mark: "TG",
    logo: "/logos/tenet-trade.jpg",
    description: "Earnings calendar, expectations, and market reactions.",
  },
  {
    name: "Interective Brocker",
    mark: "IB",
    logo: "/logos/interective-brocker.png",
    description: "Breaking market news, analysis, and trading ideas.",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Foundation Plan",
    // Update plan prices here.
    price: { usd: 40, pkr: 11000 },
    periodLabel: "month",
    duration: "1 month",
    description:
      "For beginners who want access to the basics of trading and focused community support.",
    // Update courses included in this plan here.
    courses: ["Price Action Trading Course - Basic to Advanced"],
    // Update services included in this plan here.
    services: [
      "Monthly access to lectures",
      "Discord community access with limited interaction",
      "Weekly live session recordings only",
      "Daily and weekly market updates",
      "Trade US Stocks, Futures, ETFs, Forex, and Crypto",
    ],
    paymentInstructions: [
      "Pay the Foundation Plan amount using any listed payment method.",
      "Keep your transaction receipt or screenshot ready.",
      "Submit your details on WhatsApp for manual verification.",
    ],
    features: [
      "Access to Price Action trading courses from basic to advanced",
      "Monthly access to lectures",
      "Discord community access with limited interaction",
      "Weekly live sessions - recording access only, no live session access",
      "Market updates with daily and weekly insights",
      "Not a blind buy and sell signal service",
      "Trade US Stocks, Futures, ETFs, Forex, and Crypto",
    ],
    discountText: "MONTHLY",
    cta: "Join Foundation Plan",
    highlighted: false,
  },
  {
    name: "Pro Trader Plan",
    // Update plan prices here.
    price: { usd: 250, pkr: 68750 },
    originalPrice: { usd: 480, pkr: 132000 },
    periodLabel: "year",
    duration: "12 months",
    description:
      "Ideal for advanced learners who want complete access to courses, insights, and priority support.",
    // Update courses included in this plan here.
    courses: [
      "The Trade School Premium Trading Course",
      "VSA - Volume Spread Analysis",
      "Fundamental Analysis",
      "Investing 1on1",
      "Trading with AI",
      "News Trading",
    ],
    // Update services included in this plan here.
    services: [
      "Everything in the Foundation Plan and Growth Plan",
      "Lifetime access to recorded lectures of all courses",
      "Long-term investment suggestions and swing trade tracking",
      "Market analysis and updates with AI-driven insights",
      "Automatic enrollment in future courses and exclusive content",
      "Trade US Stocks, Futures, ETFs, Forex, and Crypto",
      "Breaking news",
      "Trading charts",
      "Priority support",
    ],
    paymentInstructions: [
      "Pay the Pro Trader Plan amount using any listed payment method.",
      "Keep your transaction receipt or screenshot ready.",
      "Submit your details on WhatsApp for manual verification.",
    ],
    features: [
      "All benefits from the Foundation Plan and Growth Plan",
      "Access to The Trade School Premium Trading Course - VSA Volume Spread Analysis",
      "Lifetime access to recorded lectures of all courses",
      "Long-term investment suggestions plus swing trade tracking",
      "Market analysis and updates with AI-driven insights",
      "Automatic enrollment in future courses and exclusive content: Fundamental Analysis, Investing 1on1, Trading with AI, and News Trading",
      "Trade US Stocks, Futures, ETFs, Forex, and Crypto",
      "Breaking news",
      "Trading charts",
      "Priority support",
    ],
    discountText: "48% DISCOUNT",
    cta: "Join Pro Trader Plan",
    highlighted: true,
  },
  {
    name: "Growth Plan",
    // Update plan prices here.
    price: { usd: 96, pkr: 26400 },
    originalPrice: { usd: 120, pkr: 33000 },
    periodLabel: "quarter",
    duration: "3 months",
    description:
      "For traders who want to build on the basics and access more advanced strategies consistently.",
    // Update courses included in this plan here.
    courses: ["EMA Clouds", "Price Action", "Advanced Trading Strategies"],
    // Update services included in this plan here.
    services: [
      "Lifetime access to recorded lectures",
      "Discord community access with more interaction and trade examples",
      "Weekly live sessions with advanced strategies and trade callouts",
      "Market analysis and updates",
      "Access to Trade Tracker sheet",
      "Trade US Stocks, Futures, ETFs, Forex, and Crypto",
      "Breaking news",
      "Trading charts",
    ],
    paymentInstructions: [
      "Pay the Growth Plan amount using any listed payment method.",
      "Keep your transaction receipt or screenshot ready.",
      "Submit your details on WhatsApp for manual verification.",
    ],
    features: [
      "Access to advanced trading strategies and courses: EMA Clouds and Price Action",
      "Lifetime access to recorded lectures",
      "Discord community access with more interaction and trade examples",
      "Weekly live sessions with advanced strategies and trade callouts",
      "Market analysis and updates with access to Trade Tracker sheet",
      "Trade US Stocks, Futures, ETFs, Forex, and Crypto",
      "Breaking news",
      "Trading charts",
    ],
    discountText: "20% DISCOUNT",
    cta: "Join Growth Plan",
    highlighted: false,
  },
];

export const communityWinItems: WinSlide[] = [
  { image: "/wins/win-1.png", label: "Community win 1" },
  { image: "/wins/win-2.png", label: "Community win 2" },
  { image: "/wins/win-3.png", label: "Community win 3" },
  { image: "/wins/win-4.jpg", label: "Community win 4" },
  { image: "/wins/win-5.jpg", label: "Community win 5" },
  { image: "/wins/win-6.jpg", label: "Community win 6" },
  { image: "/wins/win-7.jpg", label: "Community win 7" },
  { image: "/wins/win-8.jpg", label: "Community win 8" },
  { image: "/wins/win-9.jpg", label: "Community win 9" },
  { image: "/wins/win-10.jpg", label: "Community win 10" },
  { image: "/wins/win-11.jpg", label: "Community win 11" },
  { image: "/wins/win-12.jpg", label: "Community win 12" },
  { image: "/wins/win-13.jpg", label: "Community win 13" },
  { image: "/wins/win-14.jpg", label: "Community win 14" },
];

export const curriculumModules = [
  {
    title: "Module 1: Trading Foundations",
    lessons: 8,
    content:
      "Learn market basics, chart structure, terminology, and how to build a strong trading mindset before taking live setups.",
  },
  {
    title: "Module 2: Technical Analysis",
    lessons: 12,
    content:
      "Understand support and resistance, trend structure, momentum, price action, and how to read charts with clarity.",
  },
  {
    title: "Module 3: Strategy and Execution",
    lessons: 10,
    content:
      "Discover repeatable setups, trade planning, entry timing, stop placement, and disciplined execution rules.",
  },
  {
    title: "Module 4: Risk Management",
    lessons: 6,
    content:
      "Protect capital with position sizing, risk control frameworks, drawdown management, and emotional discipline.",
  },
  {
    title: "Module 5: Live Market Application",
    lessons: 9,
    content:
      "Apply what you learn using real market examples, review sessions, and guided trade breakdowns.",
  },
];

export const testimonialPosts: TestimonialPost[] = [
  {
    image: "/testimonial/testi-1.png",
    accent: "#d8c18d",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-2.png",
    accent: "#6965ff",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-3.png",
    accent: "#ffcc4d",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-4.png",
    accent: "#35d399",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-5.png",
    accent: "#89e4ff",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-6.png",
    accent: "#ff8f70",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-7.jpg",
    accent: "#b391ff",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-8.jpg",
    accent: "#f2df7d",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-10.jpg",
    accent: "#79d2ff",
    kind: "thin",
  },
  {
    image: "/testimonial/testi-12.jpg",
    accent: "#ffb86b",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-15.jpg",
    accent: "#35d399",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-16.jpg",
    accent: "#89e4ff",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-17.jpg",
    accent: "#ff8f70",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-18.jpg",
    accent: "#b391ff",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-18 (1).jpg",
    accent: "#f2df7d",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-19.jpg",
    accent: "#79d2ff",
    kind: "thick",
  },
  {
    image: "/testimonial/testi-20.jpg",
    accent: "#ffb86b",
    kind: "thick",
  },
];
